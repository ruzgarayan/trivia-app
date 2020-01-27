import React from 'react'

function EndPage(props) {
    return (

        <div className="endPage">

            <div>
                You have finished the game with a total of {props.score} points.
            </div>

            <button 
                className="generalButton" 
                onClick={() => props.playAgain()}
            >
                Play Again
            </button>
        
        </div>

    );
}


export default EndPage;