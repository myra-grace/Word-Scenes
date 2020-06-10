import express from 'express';
import request from 'request';


const PORT = 4000;
const app = express();

//be able to change these from frontend
let source = 'fr';
let target = 'en';
let input = 'hello';
//-------------------------------------

// grab a random word (another API)
// if no match, do it again

app.get('/', (req, res) => {
    request(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${source}&target=${target}&input=${input}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let parsed = JSON.parse(body);
            // let data = parsed[];
            res.send({parsed});
        }
    }
    )
})

app.listen(PORT, (error) => {
    if (error) {
        console.log('error: ', error);
    } else {
        console.log(`Listening on port ${PORT}!`);
    }
});