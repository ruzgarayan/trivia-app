import React from 'react'
import { Button } from 'semantic-ui-react'

function EndPage(props) {
    
    if (props.wonTheGame)
    {
        return (

            <div className="text-align-center">
                
                <div className="big-font-size">   
                    Congratulations! You have answered all the questions correct and won a total of {props.score} points.
                </div>
    
                <Button 
                    onClick={() => props.playAgain()}
                    size="massive"
                >
                    Play Again
                </Button>
            
            </div>
    
        );
    }
    else
    {
        return (

            <div className="text-align-center">

                {props.isTimeOver ? (
                <div className="big-font-size">     
                    You have run out of time!
                </div>)
                : 
                (<div className="big-font-size">     
                    Your answer is wrong!
                </div>
                )}
                
                <br></br>

                <div className="big-font-size">    
                    You have answered {props.currentQuestionIndex} questions correctly and finished the game with a total of {props.score} points.
                </div>

                <Button
                    onClick={() => props.playAgain()}
                    size="massive"
                >
                    Play Again
                </Button>
            
            </div>

        );
    }
}


export default EndPage;