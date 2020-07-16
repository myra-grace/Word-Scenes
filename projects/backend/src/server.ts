import express, { request } from "express";
import rp from "request-promise";
import { maxHeaderSize } from "http";

require("dotenv").config();

const PORT = 4000;
const bodyParser = require("body-parser");
//-------------------------------------

const apiRandomWordPinger = async ():Promise<string[]> => {
  let output: string[] = [];

  let options = {
    method: "GET",
    url: "https://random-word-api.herokuapp.com/word?number=10",
  };

  await rp(options, function (error, response, body) {
    if (error) throw new Error(error);
    output = JSON.parse(body)
  })

  console.log('output: ', typeof output);
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
  let wasSuccessful = false
  let wordsArray:string[] = await apiRandomWordPinger();
  console.log('*********', wordsArray);
  
  let source = req.params.source;
  let target = req.params.target;

  console.log('wordsArray: ', typeof wordsArray);

  if (source !== 'en') {
    for (const wrd of wordsArray) {
      try {
        let wordPackage = await apiWordPinger('en', source, wrd);
        if (wordPackage !== undefined) {
          let wholePackage = await apiWordPinger(source, target, wordPackage.word);
          if (wholePackage.word !== undefined && wholePackage.translations.length !== 0 && wholePackage.sentences.length !== 0 && wholePackage.translatedSentences.length !== 0) {
              console.log('wholePackage: ', wholePackage);
              res.send(wholePackage);
              wasSuccessful = true
              break
          } 
        } else {
          console.log('no word matched');
        }
      } catch (error) {
        console.log('error', error);
      }     
    }
  } else {
    try {
      for (const wrd of wordsArray) {
        let wholePackage = await apiWordPinger(source, target, wrd);
        if (wholePackage.word !== undefined && wholePackage.translations.length !== 0 && wholePackage.sentences.length !== 0 && wholePackage.translatedSentences.length !== 0) {
          res.send(wholePackage);
          wasSuccessful = true
          break
        }
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  if (!wasSuccessful) {
    res.status(404).send('no match');
  }
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
