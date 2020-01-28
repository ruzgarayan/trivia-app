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
      currentPage: 'WelcomePage', //to determine which page should be currently rendered
      questionData: null, //this holds the data from question api
      currentQuestionIndex: 0, //index of the question that user is currently answering 
      scoreFromLastQuestion: 0, 
      score: 0,
      remainingTime: TIME_PER_QUESTION,
      gameTimer: null, //a timer to count the seconds for remaining time
      loadTimer: null, //a timer to check if data is loaded
      isLoading: false, //true when the question are still being loaded from the api
      isJokerUsed: false, 
      isTimeOver: false,
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
            currentQuestion={this.state.questionData.results[this.state.currentQuestionIndex]}
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
            scoreFromLastQuestion={this.state.scoreFromLastQuestion}
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
            currentQuestionIndex={this.state.currentQuestionIndex}
            wonTheGame={this.state.currentQuestionIndex == NUMBER_OF_QUESTIONS}
            isTimeOver={this.state.isTimeOver}
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
  
  //Starts the loading questions process.
  loadQuestions() {
    this.fetchQuestions();
    this.setState({ isLoading: true });
    this.state.loadTimer = setInterval(function(this_app)
    { 
      if (this_app.state.questionData != null)
      {
        this_app.startGame();
        clearInterval(this_app.state.loadTimer);
      }
    }
    , 100, this);
  }

  //returns the api determined by the chosen settings.
  getApiURL()
  {
    const apiBase = 'https://opentdb.com/api.php?';
    const amount = 'amount=' + NUMBER_OF_QUESTIONS;
    const questionType = '&type=multiple';

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
      

    let url = apiBase + amount + category + difficulty + questionType;
    return url;
  }

  //Fetchs the questions from the api
  fetchQuestions() {
    let url = this.getApiURL();

    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(questionData => this.setState({ questionData }));
  }

  startGame() {
    //If there aren't enough questions with the specified settings, don't start the game and prompt the user to change the settings.
    if (this.state.questionData.results.length < NUMBER_OF_QUESTIONS)
    {
      alert("Not enough questions on the database with given difficulty and category, please change the settings.");
      this.setState({isLoading: false});
    }
    else
    {
      //Correct the question data before starting.
      this.fixQuestionData();
      this.setState({
        currentPage: 'QuestionPage',
        isLoading: false,
        remainingTime: TIME_PER_QUESTION
      });
      //Set up a timer of 1 second interval to control the remaining time.
      this.state.gameTimer = setInterval(this.timerForGame, 1000, this);
    }
  }

  //resets the properties to play the game again.
  playAgain() {
    clearInterval(this.state.gameTimer);
    this.setState({
      currentPage: 'WelcomePage',
      questionData: null,
      currentQuestionIndex: 0,
      scoreFromLastQuestion: 0,
      score: 0,
      remainingTime: TIME_PER_QUESTION,
      gameTimer: null,
      loadTimer: null,
      isLoading: false,
      isJokerUsed: false,
      isTimeOver: false,
    });
  }

  //The data from the opentdb.com api comes in a form such that double quotation marks(") are
  //written as &quot; and single ones(') are written as &039;
  //This function replaces them with the correct ones.
  //There are some other characters that doesn't show up as they should,
  //but I couldn't find a way to fix them all at once. So I just fix " and ' which are the most common ones.
  fixQuestionData() {
    let modifiedQuestionData = this.state.questionData;
    for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
      let question = modifiedQuestionData.results[i].question;
      let correct_answer = modifiedQuestionData.results[i].correct_answer;
      let incorrect_answer1 = modifiedQuestionData.results[i].incorrect_answers[0];
      let incorrect_answer2 = modifiedQuestionData.results[i].incorrect_answers[1];
      let incorrect_answer3 = modifiedQuestionData.results[i].incorrect_answers[2];

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

      modifiedQuestionData.results[i].question = question;
      modifiedQuestionData.results[i].correct_answer = correct_answer;
      modifiedQuestionData.results[i].incorrect_answers[0] = incorrect_answer1;
      modifiedQuestionData.results[i].incorrect_answers[1] = incorrect_answer2;
      modifiedQuestionData.results[i].incorrect_answers[2] = incorrect_answer3;
    }
    this.setState({ questionData: modifiedQuestionData });
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

  useJoker() {
    this.setState({isJokerUsed: true});
  }

  answerQuestion(answer) {
    const POINTS_PER_SECOND = 10; //The amount of points gained for each remaining second.

    if (answer === this.state.questionData.results[this.state.currentQuestionIndex].correct_answer) {
      let scoresGained = this.state.remainingTime * POINTS_PER_SECOND;
      this.setState({
        scoreFromLastQuestion: scoresGained,
        score: (this.state.score + scoresGained),
        currentPage: 'CorrectAnswerPage'
      });
    }
    else {
      this.setState({ currentPage: 'EndPage' });
    }
    //stop the game timer 
    clearInterval(this.state.gameTimer);
  }

  nextQuestion(answer) {
    this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 });
    //If there aren't any other questions, go to the end page.
    if (this.state.currentQuestionIndex + 1 == NUMBER_OF_QUESTIONS)
      this.setState({ currentPage: 'EndPage' });
    else
    {
      this.setState({
        currentPage: 'QuestionPage',
        remainingTime: TIME_PER_QUESTION
      });
      //start the timer again for the  next question.
      this.state.gameTimer = setInterval(this.timerForGame, 1000, this);
    }
  }

  timerForGame(this_app) {
    this_app.setState({ remainingTime: this_app.state.remainingTime - 1 });
    if (this_app.state.remainingTime <= 0) {
      //When time is over, direct the user to the end page 
      //and let the game know that the time was over by changing the isTimeOver property.
      this_app.setState({
         currentPage: 'EndPage',
         isTimeOver: true
        });
      clearInterval(this_app.state.gameTimer); 
    }
  }

}

export default App;
