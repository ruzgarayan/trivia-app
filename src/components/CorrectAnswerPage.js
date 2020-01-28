import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from './tick.json'

import { Button } from 'semantic-ui-react'

function CorrectAnswerPage(props) {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (

        <div className="text-align-center">

            <Lottie options={defaultOptions}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false}
            />

            <div className="big-font-size">
                Correct!
            </div>

            <div className="big-font-size">
                You have earned {props.scoreFromLastQuestion} points
                <br></br>
                Total : {props.score} points
            </div>

            <Button
                onClick={() => props.nextQuestion()}
            >
                Next Question
            </Button>

        </div>

    );
}


export default CorrectAnswerPage;