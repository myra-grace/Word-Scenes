import React, { useState, useEffect, useRef } from "react";

interface Props {
  word;
  translations;
  sentences;
  translatedSentences: string;
}

const TextField: React.FC<Props> = (props) => {
  console.log("props TEXTFIELD: ", props);
  const [word, setWord] = useState<string | null | undefined>();
  const [translations, setTranslations] = useState<any | null | undefined>();
  const [sentences, setSentences] = useState<any | null | undefined>();
  const [translatedSentences, setTranslatedSentences] = useState<
    any | null | undefined
  >();
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
    if (count === 0) return;
    setCount(count - 1);
  };

  const plusCount = () => {
    if (count === translatedSentences.length - 1) return;
    setCount(count + 1);
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
