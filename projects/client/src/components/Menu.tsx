import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sourceSelection, targetSelection } from '../actions';


const Menu = () => {
    const source = useSelector((state: any) => state.generalReducer.source);
    const target = useSelector((state: any) => state.generalReducer.target);
    const dispatch = useDispatch();

//SEND source AND target TO BACKEND
    const handleSourceSelector = (event) => {
        event.preventDefault();
        const input = event.target.value;
        dispatch(sourceSelection(input));
    }

    const handleTargetSelector = (event) => {
        event.preventDefault();
        const input = event.target.value;
        dispatch(targetSelection(input));
    }
    
    return (
        <div className="blurdiv2">
            <div className="settingsMenu">
                <h1>MENU</h1>
                <h2>{source} ➡ {target}</h2>
                
                <form className="languageSelections">
                    <select onChange={handleSourceSelector} className="languageSelectionsFrom">
                        <option value="fr">French</option>
                        <option value="en">English</option>
                        <option value="it">Italian</option>
                        <option value="ru">Russian</option>
                        <option value="es">Spanish</option>
                    </select>
                    <h2>➡</h2>
                    <select onChange={handleTargetSelector} className="languageSelectionsTo">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="it">Italian</option>
                        <option value="ru">Russian</option>
                        <option value="es">Spanish</option>
                    </select>
                </form>

            </div>
        </div>
    )
}

export default Menu;