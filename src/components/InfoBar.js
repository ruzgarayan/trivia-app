import React from 'react'

function InfoBar(props) {
    return (
        <div className="infoBar">
            <div className="infoBarPiece">
                Question {props.currentQuestionIndex + 1} / 10
            </div>
            <div className="infoBarPiece">
                {props.score} 
                <br></br>
                Points
            </div>
            <div className="infoBarPiece">
                Remaining Time: {props.remainingTime}
            </div>
        </div>
    );
}


export default InfoBar;