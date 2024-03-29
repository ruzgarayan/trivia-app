import React from 'react'
import logo from './logos/logo.svg'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'semantic-ui-react'

function WelcomePage(props) {

    //These are the categories from "opentdb.com" and their corresponding ids.
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
        //Create dropdown items for each category so that they show the category's name on the screen
        //and invoke parent's function "changeCategory" with the category id.
        for (let categoryIndex of categories)
        {
          output.push(<Dropdown.Item key={categoryIndex} onClick={() => props.changeCategory(categoryIndex)} >{categoryMap.get(categoryIndex)}</Dropdown.Item>);
        }
        return output;
    }

    return (
        <div className="text-align-center">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="big-font-size">A TRIVIA GAME</div>
            <div className="up-down-50-margin">
                <Button
                    size="massive"
                    onClick={() => props.onClickStartGame()}
                    loading={props.isLoading ? true : false} 
                >
                    GET STARTED
                </Button>
            </div>

            <div className="big-font-size">Difficulty:</div>

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

            <div className="big-font-size">Category:</div>
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