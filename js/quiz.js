import { setPage, getQuizSetIndex, setQuizResult } from "./navigation.js";
import { getPrefix } from "./questions.js";
import { loadResult } from "./result.js";

class QuizGame {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    // Wyzant Tutor
    // Tracks answer the user clicked. Null means nothing selected yet.
    // Learned from tutoring session with Tsun Ming Y. via Wyzant
    // https://www.wyzant.com/match/tutor/89574039
    this.selectedAnswer = null;
    this.userAnswers = [];
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  // AI and Wyzant Tutor
  // Checks the user's answer against the correct answer.
  // Updates the score if correct.
  // Saves this question's data into userAnswers for the result page review.
  // Moves to the next question.
  // https://claude.ai/chat/02b4f1fd-4c5b-4866-ad12-91650dad787c
  // Learned from tutoring session with Tsun Ming Y. via Wyzant
  // https://www.wyzant.com/match/tutor/89574039
  confirmAnswer() {
    const q = this.getCurrentQuestion();
    const isCorrect = this.selectedAnswer === q.correct;
    this.score = isCorrect ? this.score + 1 : this.score;
    this.userAnswers.push({
      question: q.question,
      image: q.image,
      selected: this.selectedAnswer,
      correct: q.correct,
      answers: q.answers,
    });

    this.currentIndex++;
  }

  isFinished() {
    return this.currentIndex >= this.questions.length;
  }
}

const titleEl = document.getElementById("quiz-title");
const counterEl = document.getElementById("question-counter");
const imageEl = document.getElementById("question-image");
const questionEl = document.getElementById("question-text");
const answerBtns = document.querySelectorAll(".answer-btn");
const confirmBtn = document.getElementById("confirm-btn");

function renderQuestion(game) {
  // Wyzant Tutor
  // Clear the highlight from the previously selected answer and reset all four buttons back to their unselected state.
  // Learned from tutoring session with Tsun Ming Y. via Wyzant
  // https://www.wyzant.com/match/tutor/89574039
  const options = document.querySelectorAll(".answer-btn");
  options.forEach((o) => o.classList.remove("active"));
  const q = game.getCurrentQuestion();
  const total = game.questions.length;
  const current = game.currentIndex + 1;
  titleEl.textContent = game.starttitle;
  counterEl.textContent = current + " / " + total;
  imageEl.src = q.image;
  questionEl.textContent = q.question;

  answerBtns.forEach((btn, i) => {
    btn.textContent = `${getPrefix(i)}. ${q.answers[i]}`;
  });
}

function goToNextQuestion() {
  if (game.isFinished()) {
    setQuizResult({
      score: game.score,
      total: game.questions.length,
      userAnswers: game.userAnswers,
    });

    setPage(3);
    loadResult();
  } else {
    renderQuestion(game);
  }
}

// Website and AI and Tutor
// How to use active with JS
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_active_element2
// https://claude.ai/share/cb14658a-0cdd-47f8-9c49-41621139fbda
// Learned from tutoring session with Tsun Ming Y. via Wyzant
// https://www.wyzant.com/match/tutor/89574039
const options = document.querySelectorAll(".answer-btn");
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function (e) {
    e.preventDefault();
    const current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
    game.selectedAnswer = i;
  });
}

// Wyzant Tutor
// Fetch the question data and start the game.
// Learned from tutoring session with Tsun Ming Y. via Wyzant
// https://www.wyzant.com/match/tutor/89574039
async function loadAndStart() {
  try {
    const resp = await fetch("js/questions.json");
    const data = await resp.json();
    const setIndex = getQuizSetIndex();
    const selectedSet = data[setIndex];
    game = new QuizGame(selectedSet.questions);
    game.starttitle = selectedSet.title;
    renderQuestion(game);
  } catch (err) {
    console.log("Not find JSON.");
  }
}

confirmBtn.addEventListener("click", () => {
  if (game.selectedAnswer === null) return;
  game.confirmAnswer();
  goToNextQuestion();
});

let game;

export { loadAndStart };