import React from 'react'

function CorrectAnswerPage(props) {
    return (
        
        <div className="answerPage">

            <div>
                Correct!
            </div>

            <div>
                You have earned 100 points 
                <br></br>
                Total : {props.score} points
            </div>

            <button 
                className="nextQuestionButton" 
                onClick={() => props.nextQuestion()}
            >
                Next Question
            </button>

        </div>
        
    );
}


export default CorrectAnswerPage;