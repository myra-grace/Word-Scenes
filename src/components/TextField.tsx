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
    const [text, setText] = useState<string | null | undefined>("Definition");

    return (
        <div style={{textAlign: "center"}}>
            <h1>{word}</h1>
            <p>{text}</p>
        </div>
    )
}

export default TextField;