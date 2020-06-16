import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import TextField from './components/TextField';
import DrawField from './components/DrawField';


function App() {
  const [start, setStart] = useState<boolean | null | undefined>(false);
  const [source, setSource] = useState<string | null | undefined>('fr');
  const [target, setTarget] = useState<string | null | undefined>('en');

  const handleStart = () => {
    setStart(true);
  }
  
  // interface ServerResponse {
  //   data: ServerData
  // }

  // interface ServerData {
  //   word: string;
  //   translation?: string;
  //   sentence?: string;
  //   Tsentence?: string;
  // }

  //SEND source AND target TO BACKEND
  const sendBack = async() => {
    const api_url = `/${source}/${target}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log('json: ', json);
  }

  useEffect(() => {
    console.log("UES EFFECT")
    sendBack();
  }, []);

  // MAKE MENU COMPONENT
  return (
    <div className="App">
      {start ? null :
      <div className="blurDivOne">
        <button className="startButton" style={{width: "90px"}} onClick={handleStart}>START</button>
      </div>
      }
      <TextField text="text"/>
      <DrawField handleChange={e => {
        console.log("ON CHANGE");
      }}/>
    </div>
  );
}

export default App;
