import express, { request } from "express";
import rp from "request-promise";

require('dotenv').config();

const PORT = 4000;
const bodyParser = require('body-parser');

let input = 'quand';
//-------------------------------------

// grab a random word (another API)
// if no match, do it again

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
.get(`/:source/:target`, async(req, res) => {
    const source = req.params.source;
    const target = req.params.target;
    const api_url = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${source}&target=${target}&input=${input}`;
    const response = await rp(api_url, { headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY
    }});
    // const json = await response.json();
    // console.log('json: ', json);
    res.json({ stuff: JSON.parse(response) });
})

.listen(PORT, (error) => {
    if (error) {
        console.log('error: ', error);
    } else {
        console.log(`Listening on port ${PORT}!`);
    }
});
