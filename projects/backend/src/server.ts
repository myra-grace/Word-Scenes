import express, { request } from "express";
import rp from "request-promise";

require('dotenv').config();

const PORT = 4000;
const bodyParser = require('body-parser');

let input = 'chat';
//-------------------------------------

// const availableLangs = async(req, res) => {
//     console.log('LANGUAGES?');
//     const api_url = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/supportedLanguages`;
//     const response = await rp(api_url, { headers: {
//         'x-rapidapi-key': process.env.RAPID_API_KEY
//     }});
    
//     let unpack = JSON.parse(response)
//     console.log('unpack: ', unpack);
// }

// grab a random word (another API)
// if no match, do it again

const apiWordPinger = async(req, res) => {
    let source = req.params.source;
    let target = req.params.target;
    const api_url = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${source}&target=${target}&input=${input}`;
    const response = await rp(api_url, { headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY
    }});
    
    let unpack = JSON.parse(response).outputs[0].output.matches;
    let word = unpack[0].source.lemma;
    let translations = [];
    let sentences = [];
    let translatedSentences = [];
    
    unpack.forEach(arr => {
        let word = '';
        arr.targets.forEach(item => {
            word = item.lemma
            if (translations.indexOf(word) === -1) {
                translations.push(word);
            }
        })
    });

    unpack.forEach(arr => {
        let sentence = '';
        let translated = '';
        arr.targets.forEach(item => {
            item.expressions.forEach(expression => {
                sentence = expression.source;
                translated = expression.target;
                sentences.push(sentence);
                translatedSentences.push(translated);
            })
        })
    })

    res.send({word: word, translations: translations, sentences: sentences, translatedSentences: translatedSentences});
}

express()
.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})
    // .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

// GET SETTINGS FROM FRONT END
.get(`/:source/:target`, apiWordPinger)
// .get(`/`, availableLangs)

.listen(PORT, (error) => {
    if (error) {
        console.log('error: ', error);
    } else {
        console.log(`Listening on port ${PORT}!`);
    }
});
