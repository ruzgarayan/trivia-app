import React from 'react';
import './App.css';
import WelcomePage from './components/WelcomePage'
import QuestionPage from './components/QuestionPage'
import CorrectAnswerPage from './components/CorrectAnswerPage';
import EndPage from './components/EndPage';

const TIME_PER_QUESTION = 15;
const NUMBER_OF_QUESTIONS = 10;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: 'WelcomePage',
      json: null,
      currentQuestionIndex: 0,
      score: 0,
      remainingTime: TIME_PER_QUESTION,
      gameTimer: null,
      loadTimer: null,
      isLoading: false,
      isJokerUsed: false,
      settings: {
        difficulty: 'Any',
        category: 0
      }
    }
  }

  render() {
    if (this.state.currentPage === 'WelcomePage') {
      return (
        <div className="ui container">
          <WelcomePage 
            currentDifficulty={this.state.settings.difficulty}
            currentCategory={this.state.settings.category}
            isLoading={this.state.isLoading}
            onClickStartGame={() => this.loadQuestions()}
            changeDifficulty={(difficulty) => this.changeDifficulty(difficulty)}
            changeCategory={(category) => this.changeCategory(category)}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'QuestionPage') {
      return (
        <div className="ui container">
          <QuestionPage
            currentQuestion={this.state.json.results[this.state.currentQuestionIndex]}
            currentQuestionIndex={this.state.currentQuestionIndex}
            numberOfQuestions={NUMBER_OF_QUESTIONS}
            score={this.state.score}
            isJokerUsed={this.state.isJokerUsed}
            remainingTime={this.state.remainingTime}
            answerQuestion={(answer) => this.answerQuestion(answer)}
            useJoker={() => this.useJoker()}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'CorrectAnswerPage') {
      return (
        <div className="ui container">
          <CorrectAnswerPage
            score={this.state.score}
            nextQuestion={() => this.nextQuestion()}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'EndPage') {
      return (
        <div className="ui container">
          <EndPage
            score={this.state.score}

            playAgain={() => this.playAgain()}
          />
        </div>
      );
    }
    else {
      return (
        <div className="ui container">
          Error.
        </div>
      );
    }
  }

  fetchQuestions() {
    const apiBase = 'https://opentdb.com/api.php?';
    const amount = 'amount=' + NUMBER_OF_QUESTIONS;

    var category;
    if (this.state.settings.category == 0)
      category = '';
    else
      category = '&category=' + this.state.settings.category;  

    var difficulty;
    if (this.state.settings.difficulty === 'Any')
      difficulty = '';
    else
      difficulty = '&difficulty=' + this.state.settings.difficulty.toLowerCase();
      
    const questionType = '&type=multiple';

    let url = apiBase + amount + category + difficulty + questionType;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ json }));
  }

  loadQuestions() {
    this.fetchQuestions();
    this.setState({ isLoading: true });
    this.state.loadTimer = setInterval(function(this_app)
    { 
      if (this_app.state.json != null)
      {
        this_app.startGame();
        clearInterval(this_app.state.loadTimer);
      }
    }
    , 100, this);
  }

  startGame() {
    if (this.state.json.results.length < NUMBER_OF_QUESTIONS)
    {
      alert("Not enough questions on the database with given difficulty and category, please change the settings.");
      this.setState({isLoading: true});
    }
    else
    {
      this.fixJson();
      this.setState({
        currentPage: 'QuestionPage',
        isLoading: false,
        remainingTime: TIME_PER_QUESTION
      });
      this.state.gameTimer = setInterval(this.timerForGame, 1000, this);
    }
  }

  playAgain() {
    this.setState({
      currentPage: 'WelcomePage',
      json: null,
      currentQuestionIndex: 0,
      score: 0,
      remainingTime: TIME_PER_QUESTION,
      gameTimer: null,
      loadTimer: null,
      isJokerUsed: false,
      isLoading: false
    });
  }

  fixJson() {
    let modifiedJson = this.state.json;
    for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
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

  changeCategory(newCategory) {
    let newSettings = this.state.settings;
    newSettings.category = newCategory;
    this.setState({settings: newSettings});
  }

  answerQuestion(answer) {
    if (answer === this.state.json.results[this.state.currentQuestionIndex].correct_answer) {
      let newScore = this.state.score + 100;
      this.setState({
        score: newScore,
        currentPage: 'CorrectAnswerPage'
      });
    }
    else {
      this.setState({ currentPage: 'EndPage' });
    }
    clearInterval(this.state.gameTimer);
  }

  nextQuestion(answer) {
    let newQuestionIndex = this.state.currentQuestionIndex + 1;
    this.setState({ currentQuestionIndex: newQuestionIndex });
    if (newQuestionIndex == NUMBER_OF_QUESTIONS)
      this.setState({ currentPage: 'EndPage' });
    else
    {
      this.setState({
        currentPage: 'QuestionPage',
        remainingTime: 15
      });
      this.state.gameTimer = setInterval(this.timerForGame, 1000, this);
    }
  }

  useJoker() {
    this.setState({isJokerUsed: true});
  }

  timerForGame(this_app) {
    let newRemainingTime = this_app.state.remainingTime - 1;
    this_app.setState({ remainingTime: newRemainingTime });
    if (this_app.state.remainingTime <= 0) {
      this_app.setState({ currentPage: 'EndPage' });
      clearInterval(this_app.state.gameTimer); 
    }
  }

}

export default App;
