import React from 'react'
import { Button } from 'semantic-ui-react'

function InfoBar(props) {
    return (
        <div className="infoBar">
            <div className="infoBarPiece">
                <div className="normal-font-size">
                    Question {props.currentQuestionIndex + 1} / {props.numberOfQuestions}
                </div>
            </div>
            
            <div className="infoBarPiece">
                <div className="normal-font-size">
                    {props.score} 
                    <br></br>
                    Points
                </div>
            </div>
            
            <div className="infoBarPiece">
                <div className="normal-font-size">
                    Remaining Time: {props.remainingTime}
                </div>
                    <br></br>   
                    {props.isJokerUsed ? '' : (
                    <Button 
                        onClick={() => props.useJokerForThisQuestion()}
                    >
                        Use Joker
                    </Button>
                )}
            </div>
        </div>
    );
}


export default InfoBar;