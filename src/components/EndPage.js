import React from 'react'
import { Button } from 'semantic-ui-react'
import Lottie from 'react-lottie'

import * as incorrectAnswerAnimation1 from './incorrectAnswerAnimations/sad_face.json'
import * as incorrectAnswerAnimation2 from './incorrectAnswerAnimations/wrong_answer.json'
import * as incorrectAnswerAnimation3 from './incorrectAnswerAnimations/wrong_answer2.json'

import * as timesUpAnimation1 from './timeIsUpAnimations/times_up.json'

import * as wonTheGameAnimation1 from './wonTheGameAnimations/medal.json'
import * as wonTheGameAnimation2 from './wonTheGameAnimations/medal2.json'
import * as wonTheGameAnimation3 from './wonTheGameAnimations/trophy.json'

function EndPage(props) {

    const timesUpAnimations = [timesUpAnimation1];
    const incorrectAnswerAnimations = [incorrectAnswerAnimation1, incorrectAnswerAnimation2, incorrectAnswerAnimation3];
    const wonTheGameUpAnimations = [wonTheGameAnimation1, wonTheGameAnimation2, wonTheGameAnimation3];
    var randomAnimation;

    //Choose a random animation according to the way that the game finished.
    if (props.wonTheGame)
        randomAnimation = wonTheGameUpAnimations[Math.floor(Math.random() * wonTheGameUpAnimations.length)];
    else if (props.isTimeOver)
        randomAnimation = timesUpAnimations[Math.floor(Math.random() * timesUpAnimations.length)];
    else
        randomAnimation = incorrectAnswerAnimations[Math.floor(Math.random() * incorrectAnswerAnimations.length)];

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

            <br></br>

            {props.wonTheGame ? (
                <div className="big-font-size">
                    Congratulations! You have answered all the questions correct and won a total of {props.score} points.
                </div>
            ) : (props.isTimeOver ? (
                <div className="big-font-size">
                    You have run out of time!
                </div>)
                :
                (<div className="big-font-size">
                    Your answer is wrong!
                </div>
                ))}

            <br></br>

            {props.wonTheGame ? '' : (
                <div className="big-font-size">
                    You have answered {props.currentQuestionIndex} questions correctly and finished the game with a total of {props.score} points.
                </div>
            )}
            
            <br></br>

            <Button
                onClick={() => props.playAgain()}
                size="massive"
            >
                Play Again
                </Button>

        </div>
    );
}


export default EndPage;