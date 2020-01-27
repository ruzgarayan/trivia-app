import React from 'react'
import logo from './logo.svg'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

function WelcomePage(props) {

    const categoryMap = new Map([
        [0, 'Any'],
        [9, 'General Knowledge'],  [10, 'Entertainment: Books'], [11, 'Entertainment: Film'],
        [12, 'Entertainment: Music'], [13, 'Entertainment: Musicals & Theatres'], [14, 'Entertainment: Television'],
        [15,'Entertainment: Video Games'], [16, 'Entertainment: Board Games'], [17, 'Science & Nature'],
        [18, 'Science: Computers'], [19, 'Science: Mathematics'], [20, 'Mythology'],
        [21, 'Sports'], [22, 'Geography'], [23, 'History'],
        [24, 'Politics'], [25, 'Art'], [26, 'Celebrities'],
        [27, 'Animals'], [28, 'Vehicles'], [29, 'Entertainment: Comics'],
        [30, 'Science: Gadgets'], [31, 'Entertainment: Japanese Anime & Manga'], [32, 'Entertainment: Cartoon & Animations']
      ]);

    function createCategories()
    {
        let categories = categoryMap.keys();
        let output = [];
        for (let categoryIndex of categories)
        {
          output.push(<Dropdown.Item key={categoryIndex} onClick={() => props.changeCategory(categoryIndex)} >{categoryMap.get(categoryIndex)}</Dropdown.Item>);
        }
        return output;
    }

    return (
        <div className="welcomePage">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>A TRIVIA GAME</h1>
            <button
                className="generalButton"
                onClick={() => props.onClickStartGame()}
            >
                GET STARTED
                </button>

            <h3>Difficulty:</h3>

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

            <h3>Category:</h3>
            <DropdownButton
                className="settingsDropdown"
                size="lg"
                id="dropdown_category"
                title={categoryMap.get(props.currentCategory)}
            >
                {createCategories()}
            </DropdownButton>

        </div>
    );
}


export default WelcomePage;