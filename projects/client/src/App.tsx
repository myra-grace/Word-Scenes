import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import TextField from './components/TextField';
import DrawField from './components/DrawField';
import { getDefaultNormalizer } from '@testing-library/react';


function App() {
  const [start, setStart] = useState<boolean | null | undefined>(false);
  const [word, setWord] = useState<string | null | undefined>();
  const [translations, setTranslations] = useState<string[] | null | undefined>();
  const [sentences, setSentences] = useState<string[] | null | undefined>();
  const [translatedSentences, setTranslatedSentences] = useState<string | null | undefined>();

  const source = useSelector(state => state.generalReducer.source);
  const target = useSelector(state => state.generalReducer.target);
  const words = useSelector(state => state.generalReducer.words);
  const illustrations = useSelector(state => state.generalReducer.illustrations);

  const handleStart = () => {
    setStart(true);
    
  }
  
  // SEND FIRST source AND FIRST target TO BACKEND
  const sendBack = async() => {
    const api_url = `/${source}/${target}`;
    const response = await fetch(api_url);
    const data = await response.json();
    // if (data.word === undefined || 
    //   data.translations === undefined || 
    //   data.sentences === undefined ||
    //   data.translatedSentences === undefined) return
    setWord(data.word);
    setTranslations(data.translations);
    setSentences(data.sentences);
    setTranslatedSentences(data.translatedSentences);
  }

  
  // useEffect(() => {
  //   console.log('word: ', word);
  //   console.log('translations: ', translations);
  //   console.log('sentences: ', sentences);
  //   console.log('translatedSentences: ', translatedSentences);
  // }, [word, translations, sentences, translatedSentences])

  useEffect(() => {
    sendBack();
  }, [source, target]);

  return (
    <div className="App">
      {start ? null :
      <div className="blurDivOne">
        <button className="startButton" style={{width: "90px"}} onClick={handleStart}>START</button>
      </div>
      }
      <TextField word={word} translations={translations} sentences={sentences} translatedSentences={translatedSentences} />
      <DrawField handleChange={e => {
        console.log("ON CHANGE");
      }}/>
    </div>
  );
}

export default App;
