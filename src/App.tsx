import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from './components/TextField';
import DrawField from './components/DrawField';

function App() {
  return (
    <div className="App">
      <TextField text="text"/>
      <DrawField handleChange={e => {
        console.log("ON CHANGE");
      }}/>
    </div>
  );
}

export default App;
