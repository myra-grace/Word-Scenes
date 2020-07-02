import express, { request } from "express";
import rp from "request-promise";

require("dotenv").config();

const PORT = 4000;
const bodyParser = require("body-parser");
//-------------------------------------

const apiRandomWordPinger = async (source: string) => {
  let output = "chat"; //FOR TESTING
  // let output = "";
  // let options = {
  //   method: "GET",
  //   url: "https://random-words2.p.rapidapi.com/words",
  //   qs: { limit: "10", lang: source },
  //   headers: {
  //     "x-rapidapi-host": "random-words2.p.rapidapi.com",
  //     "x-rapidapi-key": process.env.RAPID_API_KEY,
  //   },
  // };

  // await rp(options, function (error, response, body) {
  //   if (error) throw new Error(error);

  //   let unpack = JSON.parse(body);
  //   let words = unpack.words;
  //   for (const word of words) {
  //       if (word.includes(' ')) {
  //           continue
  //       } else {
  //           output = word;
  //       }
  //   }
  // });
  
  return output;
};

const apiWordPinger = async (source: string, target: string, input: string) => {
    let word = '';
    let translations = [];
    let sentences = [];
    let translatedSentences = [];

    const api_url = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${source}&target=${target}&input=${input}`;
    const response = await rp(api_url, {
    headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
    });

    let unpack = JSON.parse(response).outputs[0].output.matches;
    if (unpack === undefined) {
      return undefined 
    } else {
        word = unpack[0].source.lemma;

      unpack.forEach((obj: { targets: { lemma: string }[] }) => {
      let translation = "";
      obj.targets.forEach((item) => {
        translation = item.lemma;
          if (translations.indexOf(translation) === -1) {
          translations.push(translation);
          }
      });
      });

      unpack.forEach((arr:{targets:{expressions:{source: string, target: string}[]}[]}) => {
      let sentence = "";
      let translated = "";
      arr.targets.forEach((item) => {
          item.expressions.forEach((expression) => {
          sentence = expression.source;
          translated = expression.target;
          sentences.push(sentence);
          translatedSentences.push(translated);
          });
      });
      });
    }

    return {word, translations, sentences, translatedSentences}
};

const sourceTargetCleaner = async (req, res) => {
  let run4wordCount = 0;
  let runCount = 6;
  let word = "";
  
  let source = req.params.source;
  console.log('source: ', source);
  let target = req.params.target;
  console.log('target: ', target);

  if (source !== 'fr') {
    while (run4wordCount <= 5) {
      try {
        let preWord = await apiRandomWordPinger('fr');
        let wordPackage = await apiWordPinger('fr', source, preWord);
        if (wordPackage !== undefined) {
          word = wordPackage.word;
          run4wordCount = 6
          runCount = 0;
        } else {
          run4wordCount += 1;
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  } else {
    word = await apiRandomWordPinger(source);
    runCount = 0;
  }

  while(runCount <= 5) {
    try {
      let wholePackage = await apiWordPinger(source, target, word);
      if (wholePackage !== undefined) {
        res.send(wholePackage);
        runCount = 6;
      } else {
        run4wordCount = 0;
        runCount = 6;
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  return
};

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  // .use(morgan('tiny'))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // GET SETTINGS FROM FRONT END
  .get(`/:source/:target`, sourceTargetCleaner)

  .listen(PORT, (error) => {
    if (error) {
      console.log("error: ", error);
    } else {
      console.log(`Listening on port ${PORT}!`);
    }
  });
