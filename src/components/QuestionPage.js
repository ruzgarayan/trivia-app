import React from 'react'
import InfoBar from './InfoBar'

class QuestionPage extends React.Component
{
    constructor(props) {
        super(props);
        this.props = props;

        let constructAnswers = [];
        let correctAnswerIndex = Math.floor(Math.random() * 4);
        let j = 0;
        for (let i = 0; i < 4; i++)
        {
            if (i == correctAnswerIndex)
                constructAnswers.push(this.props.currentQuestion.correct_answer);
            else
                constructAnswers.push(this.props.currentQuestion.incorrect_answers[j++]);
        }

        this.state = {
            answers: constructAnswers
        }
    }

    render() {
        return (
            
            <div className="questionPage">

                <InfoBar 
                    currentQuestionIndex={this.props.currentQuestionIndex}
                    score={this.props.score}
                    remainingTime={this.props.remainingTime} 
                />

                <div>
                    {this.props.currentQuestion.question}
                </div>

                <button 
                    className="answerButton" 
                    onClick={() => this.props.answerQuestion(this.state.answers[0])}
                >
                    {this.state.answers[0]}
                </button>

                <button 
                    className="answerButton" 
                    onClick={() => this.props.answerQuestion(this.state.answers[1])}
                >
                    {this.state.answers[1]}
                </button>

                <button 
                    className="answerButton" 
                    onClick={() => this.props.answerQuestion(this.state.answers[2])}
                >
                    {this.state.answers[2]}
                </button>

                <button 
                    className="answerButton" 
                    onClick={() => this.props.answerQuestion(this.state.answers[3])}
                >
                    {this.state.answers[3]}
                </button>

            </div>
        );
    }
}



export default QuestionPage;