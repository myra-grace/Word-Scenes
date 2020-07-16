import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import TextField from './components/TextField';
import DrawField from './components/DrawField';
import Menu from './components/Menu';
import { submit } from './actions';



function App() {
  const [counter, setCounter] = useState<number>(0);
  const [blur, setBlur] = useState<boolean | null | undefined>(true);
  const [word, setWord] = useState<string | null | undefined>('LOADING');
  const [translations, setTranslations] = useState<string[] | null | undefined>(['????', '????', '????']);
  const [sentences, setSentences] = useState<string[] | null | undefined>(['????', '????', '????']);
  const [translatedSentences, setTranslatedSentences] = useState<string | null | undefined>('????');
  const [testing, setTesting] = useState<boolean | null | undefined>(false);
  const [toggle, setToggle] = useState<boolean | null | undefined>(false);
  const [clear, setClear] = useState<boolean | null | undefined>(false);
  const [done, setDone] = useState<boolean | null | undefined>(false);
  const [input, setInput] = useState<string | null | undefined>();
  const [urlGuess, setUrlGuess] = useState<object | null | undefined> ({});
  const [switchMe, setSwitchMe] = useState<boolean | null | undefined>(false);
  const [noMatch, setNoMatch] = useState<boolean | null | undefined>(false)
  const [tryAgain, setTryAgain] = useState<boolean | null | undefined>(false)
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();


  const source = useSelector(state => state.generalReducer.source);
  const target = useSelector(state => state.generalReducer.target);
  const illustrations = useSelector(state => state.generalReducer.illustrations);
  const submitted = useSelector(state => state.generalReducer.submitions);

  let finalWidth = 0;
  let windowW = window.innerWidth - 50;
  let windowH = window.innerHeight - 200;
  if (windowW > windowH) {
    finalWidth = windowH
  } else {
    finalWidth = windowW
  }
  
  const sendBack = async() => {
    const api_url = `/${source}/${target}`;
    try {
      const response = await fetch(api_url);
      if (response.status < 300) {
        const data = await response.json();
        setWord(data.word);
        setTranslations(data.translations);
        setSentences(data.sentences);
        setTranslatedSentences(data.translatedSentences);
        setBlur(false);
        setCounter(counter + 1);
      } else {
        setNoMatch(true);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const testUser = (choice) => {
    if (illustrations === []) return
    setBlur(false);
    let wrd = Object.keys(choice).toString();
    console.log('wrd: ', wrd);
    let questionmarks = [];
    
    for (let i = 0; i < wrd.length; i++) {
      questionmarks.push('?')
    }

    let hint = questionmarks.join('');
    
    setWord(hint);
    setTranslations(null);
    setSentences(null);
    setTranslatedSentences(null);
    setCounter(0);
  }

  useEffect(() => {
    setUrlGuess({});
    setBlur(true)
    setTesting(false);
    setDone(false);
    if (counter >= 6) {
      setTesting(true);
      let choice = illustrations[Math.floor(Math.random() * illustrations.length)]
      setUrlGuess(choice);
      testUser(choice);
    } else {
      sendBack();
    }
  }, [source, target, submitted, switchMe]);

  const handleToggle = () => {
    const container = settingsButtonRef.current;
    container.classList.toggle("change");
    setToggle(!toggle);
  }

  const handleInput = (event) => {
    event.preventDefault();
    if (illustrations === []) return
    let wrd = Object.keys(urlGuess).toString();
    const userTyped = event.target.value;
    if (userTyped.length >= wrd.length + 1) {
        return
    } else {
        setInput(userTyped);
    }
  }

  const handleCheckGuess = (event) => {
    event.preventDefault()
    if (illustrations === []) return
    let userInput = input.toLowerCase();
    let wrd = Object.keys(urlGuess).toString();
    if (userInput === wrd) {
      setClear(!clear);
      setInput(null);
      setSwitchMe(!switchMe);
    }
  }

  const reload = () => {
    sendBack();
    setNoMatch(false);
  }

  return (
    <div className="App">
      {!toggle ? null :
        <Menu />
      }
      {!blur ? null :
      <div className="blurDivOne">
        <span></span>
        <span></span>
        <span></span>
      </div>
      }
      {!noMatch ? null : 
      <div className='centreme'>
        <button className='reload' onClick={reload}><h1>Reload</h1></button>
      </div>
      }
      <TextField word={word} translations={translations} sentences={sentences} translatedSentences={translatedSentences} />
      <DrawField word={word} clear={clear} done={done} urlGuess={urlGuess}/>
      {testing ? 
      <form className='guessform'>
        <input className='guessinput' type='text' placeholder={word} value={input} style={{width: finalWidth - 40}} onChange={handleInput}></input>
        <button className='checkguess' onClick={handleCheckGuess}>▶</button>
      </form> :
      <div style={{display: "flex", flexDirection: "row", width: finalWidth, justifyContent: "space-between"}}>
        <button className="clearButton"
          onClick={() => {
            setClear(!clear);
          }}
        >
          Clear
        </button>
        <button ref={settingsButtonRef} className="settingsButton" onClick={handleToggle}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        <button className="doneButton"
          onClick={() => {
            setDone(true);
          }}
        >
          Done
        </button>
      </div>
      }
    </div>
  );
}

export default App;
