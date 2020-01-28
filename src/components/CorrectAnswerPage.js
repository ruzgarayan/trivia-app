import React from 'react'
import Lottie from 'react-lottie'
import * as correctAnswerAnimation1 from './correctAnswerAnimations/tick.json'
import * as correctAnswerAnimation2 from './correctAnswerAnimations/tick2.json'
import * as correctAnswerAnimation3 from './correctAnswerAnimations/tick3.json'
import * as correctAnswerAnimation4 from './correctAnswerAnimations/tick4.json'
import * as correctAnswerAnimation5 from './correctAnswerAnimations/tick5.json'
import * as correctAnswerAnimation6 from './correctAnswerAnimations/thumbs_up.json'

import { Button } from 'semantic-ui-react'

function CorrectAnswerPage(props) {
    const animations = [correctAnswerAnimation1, correctAnswerAnimation2, correctAnswerAnimation3, correctAnswerAnimation4, correctAnswerAnimation5, correctAnswerAnimation6];
    //choose one random animation from the above array.
    let randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    const defaultOptions =
    {
        loop: false,
        autoplay: true,
        animationData: randomAnimation.default,
        rendererSettings:
        {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (

        <div className="text-align-center">

            <Lottie options={defaultOptions}
                height={"30%"}
                width={"30%"}
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