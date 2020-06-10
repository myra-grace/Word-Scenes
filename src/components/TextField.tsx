import React, { useState, useRef } from 'react';

interface Person {
    firstName: string;
    lastName: string;
}

interface Props {
    text: string;
    ok?: boolean;
    i?: number;
    fn?: (bob: string) => string;
    person?: Person;
}

const TextField: React.FC<Props> = () => {
    const [word, setWord] = useState<string | null | undefined>("Word");
    const [wordTranslated, setWordTranslated] = useState<string | null | undefined>("Word Translated");
    const [exampeText, setExampleText] = useState<string | null | undefined>("Example");
    const [translatedText, setTranslatedText] = useState<string | null | undefined>("Translated Example");

    return (
        <div style={{textAlign: "center"}}>
            <h1>{word}</h1>
            <h2>{wordTranslated}</h2>
            <h3>{exampeText}</h3>
            <p>{translatedText}</p>
        </div>
    )
}

export default TextField;