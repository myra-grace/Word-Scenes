import React, { useEffect, useState } from 'react';

const Menu = () => {
    const [source, setSource] = useState<string | null | undefined>('fr');
    const [target, setTarget] = useState<string | null | undefined>('en');

//fetching initial settings
    fetch('/:source/:target')
    .then(response => response.json())
    .then(data => console.log(data));

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
  }, [source, target]);

    const handleSourceSelector = () => {
        let tar = target
        setSource(tar);
    }

    const handleTargetSelector = () => {
        let src = source
        setTarget(src);
    }
    
    return (
        <div className="blurDivTwo">
            <div className="settingsMenu">
                <h1>MENU</h1>
                <div>
                    <h2>{source} ➡ {target}</h2>
                    <button className = "switchButton" onClick={() => {handleSourceSelector(); handleTargetSelector()}}> 🔄 </button>
                </div>
                
                {/* <form className="languageSelectionsFrom" style={{display: "flex", flexDirection: "column"}}>
                    <ul>
                        <li>fr</li>
                    </ul>
                </form>
                <form className="languageSelectionsTo" style={{display: "flex", flexDirection: "column"}}>
                    <ul>

                    </ul>
                </form> */}
                </div>
        </div>
    )
}

export default Menu;