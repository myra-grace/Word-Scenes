import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import TextField from './components/TextField';
import DrawField from './components/DrawField';


function App() {
  const [start, setStart] = useState<boolean | null | undefined>(false);
  
  // interface ServerResponse {
  //   data: ServerData
  // }

  // interface ServerData {
  //   word: string;
  //   translation?: string;
  //   sentence?: string;
  //   Tsentence?: string;
  // }

  // class Pingres {
  //   word: string;
  //   translation?: string;
  //   sentence?: string;
  //   Tsentence?: string;
  //   constructor() {
  //     // super();
  //     this.word = 'word',
  //     this.translation = 'translation',
  //     this.sentence = 'sentence',
  //     this.Tsentence = 'Tsentence'
  //   }
  // }



  const handleStart = () => {
    // axios.get("/").then(response => {
    //   this.word = response.data,
    //   this.translation = response.data,
    //   this.sentence = response.data,
    //   this.Tsentence = response.data
    // })
    setStart(true);
  }


  // useEffect(() => {
  //   fetch('')
  //   .then((res) => res.json())
  //   .then((json) => {
  //     console.log('json: ', json);
  //   })
  //   .catch((error) => {
  //     console.log('error: ', error);
  //   });
  // }, []);

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
