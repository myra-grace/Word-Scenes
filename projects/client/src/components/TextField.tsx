import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';


interface Props {
  word: string;
  translations: string[];
  sentences: string[];
  translatedSentences: string;
}

const TextField: React.FC<Props> = (props) => {
  const [word, setWord] = useState<string | null | undefined>();
  const [translations, setTranslations] = useState<string[] | null | undefined>();
  const [sentences, setSentences] = useState<string[] | null | undefined>();
  const [translatedSentences, setTranslatedSentences] = useState<string | null | undefined>();
  const [count, setCount] = useState<number | null>(0);

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
    <div className="txtdiv">
      <h1>{word.toUpperCase()}</h1>
      <h2 className="translations">{"( " + translations.join(", ") + " )"}</h2>
      <div className="sentencesContainer">
        <div className="sentencesInnerContainer">
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
    </div>
  );
};

export default TextField;
