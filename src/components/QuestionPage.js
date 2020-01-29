import React from 'react'
import InfoBar from './InfoBar'
import { Button } from 'semantic-ui-react'

class QuestionPage extends React.Component
{
    constructor(props) {
        super(props);

        let constructAnswers = [];

        //Choose the index that the correct question will be placed (0-3 inclusive).
        let correctAnswerIndex = Math.floor(Math.random() * 4);

        //Put the answers in an array according to the chosen index above.
        let j = 0;
        for (let i = 0; i < 4; i++)
        {
            if (i === correctAnswerIndex)
                constructAnswers.push(this.props.currentQuestion.correct_answer);
            else
                constructAnswers.push(this.props.currentQuestion.incorrect_answers[j++]);
        }

        this.state = {
            answers: constructAnswers,
            correctAnswer: correctAnswerIndex,
            answersToShow: [true, true, true, true]
        }
    }
    
    useJokerForThisQuestion()
    {
        let randomNumber = Math.floor(Math.random() * 3); // (0-3 inclusive number)
        var chosenIncorrectAnswer; //This represent the index of the incorrect answer that will be shown with the correct one.
        if (randomNumber < this.state.correctAnswer)
            chosenIncorrectAnswer = randomNumber;
        else
            chosenIncorrectAnswer = randomNumber + 1;

        //Set the state so that only the correct answer and chosen incorrect answer will be shown while rendering.
        let newAnswersToShow = this.state.answersToShow;
        for (let i = 0; i < 4; i++)
        {
            if (i !== chosenIncorrectAnswer && i !== this.state.correctAnswer)
                newAnswersToShow[i] = false;
        }
        this.setState({answersToShow: newAnswersToShow});

        //Also call the parent method so that the game knows the joker is used(It can be used only once).
        this.props.useJoker();
    }

    render() {
        return (

            <div className="text-align-center">

                <InfoBar 
                    currentQuestionIndex={this.props.currentQuestionIndex}
                    numberOfQuestions={this.props.numberOfQuestions}
                    score={this.props.score}
                    remainingTime={this.props.remainingTime}
                    isJokerUsed={this.props.isJokerUsed}
                    useJokerForThisQuestion={() => this.useJokerForThisQuestion()} 
                />

                <div className ="down-50-margin"> 
                    <h2>{this.props.currentQuestion.question}</h2>
                </div>

                <div className ="up-down-50-margin">
                    <Button 
                        fluid={true} size="massive" 
                        negative={!this.state.answersToShow[0]}
                        disabled={!this.state.answersToShow[0]}
                        onClick={() => this.props.answerQuestion(this.state.answers[0])}
                    >
                        {this.state.answers[0]}
                    </Button>
                </div>

                <div className ="up-down-50-margin">
                    <Button 
                        fluid ={true} size="massive" 
                        negative={!this.state.answersToShow[1]}
                        disabled={!this.state.answersToShow[1]}
                        onClick={() => this.props.answerQuestion(this.state.answers[1])}
                    >
                        {this.state.answers[1]}
                    </Button>
                </div>

                <div className ="up-down-50-margin">
                    <Button 
                        fluid ={true} size="massive"
                        negative={!this.state.answersToShow[2]}
                        disabled={!this.state.answersToShow[2]}
                        onClick={() => this.props.answerQuestion(this.state.answers[2])}
                    >
                        {this.state.answers[2]}
                    </Button>
                </div>

                <div className ="up-down-50-margin">
                    <Button 
                        fluid ={true} size="massive"
                        negative={!this.state.answersToShow[3]}
                        disabled={!this.state.answersToShow[3]}
                        onClick={() => this.props.answerQuestion(this.state.answers[3])}
                    >
                        {this.state.answers[3]}
                    </Button>
                </div>

            </div>
        );
    }
}



export default QuestionPage;