import React from 'react'
import { Button } from 'semantic-ui-react'

function InfoBar(props) {
    return (
        <div className="infoBar">
            <div className="infoBarPiece">
                Question {props.currentQuestionIndex + 1} / {props.numberOfQuestions}
            </div>
            <div className="infoBarPiece">
                {props.score} 
                <br></br>
                Points
            </div>
            <div className="infoBarPiece">
                Remaining Time: {props.remainingTime}
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