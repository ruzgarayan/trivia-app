import React from 'react'

function IncorrectAnswerPage(props) {
    return (

        <div className="answerPage">

            <div>
                Not correct this time.
            </div>

            <div>
                You have a total of {props.score} points.
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


export default IncorrectAnswerPage;