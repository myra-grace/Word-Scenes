import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { wordAdded } from '../actions';


interface Props {
  word;
  translations;
  sentences;
  translatedSentences: string;
}

const TextField: React.FC<Props> = (props) => {
  const [word, setWord] = useState<string | null | undefined>();
  const [translations, setTranslations] = useState<string[] | null | undefined>();
  const [sentences, setSentences] = useState<string[] | null | undefined>();
  const [translatedSentences, setTranslatedSentences] = useState<string | null | undefined>();
  const [count, setCount] = useState<number | null>(0);
  const dispatch = useDispatch();

  const source = useSelector(state => state.generalReducer.source);
  const target = useSelector(state => state.generalReducer.target);
  const words = useSelector(state => state.generalReducer.words);

  useEffect(() => {
    if (
      props.word === undefined &&
      props.translations === undefined &&
      props.sentences === undefined &&
      props.translatedSentences === undefined
    )
      return;
    setWord(props.word);
    setTranslations(props.translations);
    setSentences(props.sentences);
    setTranslatedSentences(props.translatedSentences);
  }, [props]);

  const minusCount = () => {
    if (count === 0) {
      setCount(sentences.length -1);
    } else {
      setCount(count - 1);
    }
  };

  const plusCount = () => {
    if (count === sentences.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
    
  };

  if (
    !word ||
    !translations ||
    !translations.length ||
    !sentences ||
    !sentences.length ||
    !translatedSentences ||
    !setTranslatedSentences.length
  ) {
    return null;
  }

  return (
    <div className="txtdiv" style={{ textAlign: "center" }}>
      <h1>{word.toUpperCase()}</h1>
      <h2 className="translations">{"( " + translations.join(", ") + " )"}</h2>
      <div className="sentencesContainer">
        <button className="backButton" onClick={minusCount}>
          ◀
        </button>
        <div className="sentences">
          <h3>{sentences[count]}</h3>
          <p>( {translatedSentences[count]} )</p>
        </div>
        <button className="nextButton" onClick={plusCount}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default TextField;
