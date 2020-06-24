import express, { request } from "express";
import rp from "request-promise";

require("dotenv").config();

const PORT = 4000;
const bodyParser = require("body-parser");
//-------------------------------------

const apiRandomWordPinger = async () => {
  let input = "";
  let options = {
    method: "GET",
    url: "https://random-words2.p.rapidapi.com/words",
    qs: { limit: "10", lang: "fr" },
    headers: {
      "x-rapidapi-host": "random-words2.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  await rp(options, function (error, response, body) {
    if (error) throw new Error(error);

    let unpack = JSON.parse(body);
    let words = unpack.words;
    for (const word of words) {
        if (word.includes(' ')) {
            continue
        } else {
            input = word;
        }
    }
  });
  return input;
};

const apiWordPinger = async (req, res) => {
    let run = true;
    while(run) { 
        let input = await apiRandomWordPinger();
        // let input = `${encodeURI(ping)}`; FIX?
        console.log('input: ', input);
        try {
            let source = req.params.source;
            let target = req.params.target;
            const api_url = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${source}&target=${target}&input=${input}`;
            const response = await rp(api_url, {
            headers: {
                "x-rapidapi-key": process.env.RAPID_API_KEY,
            },
            });

            let unpack = JSON.parse(response).outputs[0].output.matches;
            if (unpack !== undefined) {
                run = false; 
            }
            let word = unpack[0].source.lemma;
            let translations = [];
            let sentences = [];
            let translatedSentences = [];

            unpack.forEach((obj: { targets: { lemma: string }[] }) => {
            let word = "";
            obj.targets.forEach((item) => {
                word = item.lemma;
                if (translations.indexOf(word) === -1) {
                translations.push(word);
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

            res.send({
            word: word,
            translations: translations,
            sentences: sentences,
            translatedSentences: translatedSentences,
            });
            return false; 
        } catch (error) {
            console.log('error', error);
        }
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
  // .use(morgan('tiny'))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // GET SETTINGS FROM FRONT END
  .get(`/:source/:target`, apiWordPinger)

  .listen(PORT, (error) => {
    if (error) {
      console.log("error: ", error);
    } else {
      console.log(`Listening on port ${PORT}!`);
    }
  });
