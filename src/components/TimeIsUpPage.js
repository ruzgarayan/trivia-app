import React from 'react'

function TimeIsUpPage(props) {
    return (

        <div className="timeIsUpPage">
            <div>
                You have run out of time.
            </div>

            <div>
                You have a total of {props.score} points.
            </div>

            <button 
                className="generalButton" 
                onClick={() => props.nextQuestion()}
            >
                Next Question
            </button>
        
        </div>

    );
}


export default TimeIsUpPage;