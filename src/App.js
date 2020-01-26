import React from 'react';
import './App.css';
import WelcomePage from './components/WelcomePage'
import QuestionPage from './components/QuestionPage'
import CorrectAnswerPage from './components/CorrectAnswerPage';
import IncorrectAnswerPage from './components/IncorrectAnswerPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'WelcomePage',
      json: null,
      currentQuestionIndex: 0,
      score: 0,
      remainingTime: 10,
      gameTimer: null,
      loadTimer: null,
      settings: {
        number_of_questions: 10,
        difficulty: 'Any',
        category: 'Any'
      }
    }
  }

  fetchQuestions(url) {
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ json }));
  }

  render() {
    if (this.state.currentPage === 'WelcomePage') {
      return (
        <div className="main">
          <WelcomePage 
            currentDifficulty={this.state.settings.difficulty}
            currentCategory={this.state.settings.category}
            stillLoading={false}
            onClickStartGame={() => this.loadQuestions()}
            changeDifficulty={(difficulty) => this.changeDifficulty(difficulty)}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'LoadingPage') {
      return (
        <div className="main">
          <WelcomePage 
            stillLoading={true}
            onClickStartGame={() => this.loadQuestions()}
            changeDifficulty={(difficulty) => this.changeDifficulty(difficulty)}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'QuestionPage') {
      return (
        <div className="main">
          <QuestionPage
            currentQuestion={this.state.json.results[this.state.currentQuestionIndex]}
            currentQuestionIndex={this.state.currentQuestionIndex}
            score={this.state.score}
            remainingTime={this.state.remainingTime}
            answerQuestion={(answer) => this.answerQuestion(answer)}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'CorrectAnswerPage') {
      return (
        <div className="main">
          <CorrectAnswerPage
            score={this.state.score}
            nextQuestion={() => this.nextQuestion()}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'IncorrectAnswerPage') {
      return (
        <div className="main">
          <IncorrectAnswerPage
            score={this.state.score}
            nextQuestion={() => this.nextQuestion()}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'EndPage') {
      return (
        <div className="main">
          Oyun bitti.
        </div>
      );
    }
    else {
      return (
        <div className="main">
        </div>
      );
    }
  }

  loadQuestions() {
    this.fetchQuestions('https://opentdb.com/api.php?amount=10&type=multiple');
    this.setState({ currentPage: 'LoadingPage' });
    this.state.loadTimer = setInterval(function(this_)
    { 
      if (this_.state.json != null)
      {
        this_.startGame();
        clearInterval(this_.state.loadTimer);
      }
    }
    , 100, this);
  }

  startGame() {
    this.fixJson();
    this.setState({
      currentPage: 'QuestionPage',
      remainingTime: 15
    });
    this.state.gameTimer = setInterval(this.timerForGame, 1000, this);
  }

  fixJson() {
    let modifiedJson = this.state.json;
    for (let i = 0; i < 10; i++) {
      let question = modifiedJson.results[i].question;
      let correct_answer = modifiedJson.results[i].correct_answer;
      let incorrect_answer1 = modifiedJson.results[i].incorrect_answers[0];
      let incorrect_answer2 = modifiedJson.results[i].incorrect_answers[1];
      let incorrect_answer3 = modifiedJson.results[i].incorrect_answers[2];

      question = question.replace(/&quot;/g, '"');
      correct_answer = correct_answer.replace(/&quot;/g, '"');
      incorrect_answer1 = incorrect_answer1.replace(/&quot;/g, '"');
      incorrect_answer2 = incorrect_answer2.replace(/&quot;/g, '"');
      incorrect_answer3 = incorrect_answer3.replace(/&quot;/g, '"');

      question = question.replace(/&#039;/g, '\'');
      correct_answer = correct_answer.replace(/&#039;/g, '\'');
      incorrect_answer1 = incorrect_answer1.replace(/&#039;/g, '\'');
      incorrect_answer2 = incorrect_answer2.replace(/&#039;/g, '\'');
      incorrect_answer3 = incorrect_answer3.replace(/&#039;/g, '\'');

      modifiedJson.results[i].question = question;
      modifiedJson.results[i].correct_answer = correct_answer;
      modifiedJson.results[i].incorrect_answers[0] = incorrect_answer1;
      modifiedJson.results[i].incorrect_answers[1] = incorrect_answer2;
      modifiedJson.results[i].incorrect_answers[2] = incorrect_answer3;
    }
    this.setState({ json: modifiedJson });
  }

  changeDifficulty(newDifficulty) {
    let newSettings = this.state.settings;
    newSettings.difficulty = newDifficulty;
    this.setState({settings: newSettings});
  }

  answerQuestion(answer) {
    console.log(answer === this.state.json.results[this.state.currentQuestionIndex].correct_answer);
    let newQuestionIndex = this.state.currentQuestionIndex + 1;
    this.setState({ currentQuestionIndex: newQuestionIndex });
    if (answer === this.state.json.results[this.state.currentQuestionIndex].correct_answer) {
      let newScore = this.state.score + 100;
      this.setState({
        score: newScore,
        currentPage: 'CorrectAnswerPage'
      });
    }
    else {
      this.setState({ currentPage: 'IncorrectAnswerPage' });
    }
  }

  nextQuestion(answer) {
    if (this.state.settings.number_of_questions == this.state.currentQuestionIndex)
      this.setState({ currentPage: 'EndPage' });
    else
      this.setState({
        currentPage: 'QuestionPage',
        remainingTime: 15
      });
  }

  timerForGame(this_) {
    let newRemainingTime = this_.state.remainingTime - 1;
    this_.setState({ remainingTime: newRemainingTime });
    if (this_.state.remainingTime <= 0) {
      this_.setState({ currentPage: 'TimeIsUpPage' });
    }
    console.log(newRemainingTime);
  }

}

export default App;
