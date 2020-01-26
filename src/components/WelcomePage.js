import React from 'react'
import logo from './logo.svg'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

function WelcomePage(props) {

    if (!props.stillLoading) {
        return (
            <div className="welcomePage">
                <img src={logo} className="App-logo" alt="logo" />
                <div>A TRIVIA GAME</div>
                <button
                    className="startButton"
                    onClick={() => props.onClickStartGame()}
                >
                    GET STARTED
                </button>

                <div>Difficulty:</div>

                <DropdownButton 
                    className="settingsDropdown"
                    size="lg"
                    id="dropdown_difficulty"
                    title={props.currentDifficulty}
                >
                    <Dropdown.Item onClick={() => props.changeDifficulty('Any')} >Any</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.changeDifficulty('Easy')} >Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.changeDifficulty('Medium')} >Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.changeDifficulty('Hard')} >Hard</Dropdown.Item>
                </DropdownButton>

                <div>Category:</div>

                <DropdownButton 
                    className="settingsDropdown"
                    size="lg"
                    id="dropdown_category"
                    title={props.currentCategory}
                >
                    <Dropdown.Item onClick={() => props.changeDifficulty('Any')} >Any</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.changeDifficulty('Easy')} >Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.changeDifficulty('Medium')} >Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.changeDifficulty('Hard')} >Hard</Dropdown.Item>
                </DropdownButton>

            </div>
        );  
    }
    else {
        return (
            <div className="welcomePage">
                <img src={logo} className="App-logo" alt="logo" />
                <div>A TRIVIA GAME</div>
                <button
                    className="startButton"
                    onClick={() => props.onClickStartGame()}
                >
                    GET STARTED
                </button>
                <div>Questions are still loading, please wait and try again.</div>
            </div>
        );
    }
}


export default WelcomePage;