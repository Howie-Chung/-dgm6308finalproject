import { getPrefix } from "./questions.js";
import { setPage, getQuizResult, resetQuizResult } from "./navigation.js";

const scoreEl = document.getElementById("score-display");
const reviewEl = document.getElementById("answer-review");
const playAgainBtn = document.getElementById("play-again-btn");
const backBtn = document.getElementById("back-btn");

export function loadResult() {
  try {
    const result = getQuizResult();
    if (!result) {
      scoreEl.textContent = "No result found.";
      return;
    }
    renderScore(result);
    renderReview(result.userAnswers);
  } catch (err) {
    scoreEl.textContent = "Something went wrong.";
    console.error(err);
  }
}

function renderScore(result) {
  scoreEl.textContent = `${result.score} / ${result.total}`;
}

function renderReview(userAnswers) {
  userAnswers.forEach((item, i) => {
    // Tutor
    // Create the game result page dynamically using JavaScript DOM manipulation.
    // Learned from tutoring session with Tsun Ming Y. via Wyzant
    // https://www.wyzant.com/match/tutor/89574039
    const block = document.createElement("div");
    block.className = "panel q-panel";

    const img = document.createElement("img");
    img.src = item.image ? item.image : "images/questions-item-01.jpg";

    const textBox = document.createElement("div");
    textBox.className = "question-text";
    textBox.innerHTML = `<h4>Q${i + 1}. ${item.question}</h4>`;
    const hr = document.createElement("hr");
    const answerGroup = document.createElement("div");
    answerGroup.className = "player-answre-group";

    item.answers.forEach((qtext, num) => {
      const ansEl = document.createElement("div");
      const isCorrect = num === item.correct;
      const isSelected = num === item.selected;

      if (isCorrect) {
        ansEl.className = "player-answre-item correct";
      } else if (isSelected) {
        ansEl.className = "player-answre-item wrong";
      } else {
        ansEl.className = "player-answre-item";
      }

      const prefix = getPrefix(num);
      ansEl.textContent = `${prefix}. ${qtext}`;

      if (isSelected && !isCorrect) {
        const tag = document.createElement("span");
        tag.textContent = "Your answer";
        ansEl.appendChild(tag);
      }

      if (isCorrect) {
        const tag = document.createElement("span");
        tag.textContent = isSelected
          ? "(Your answer is correct!)"
          : "(Correct answer)";
        ansEl.appendChild(tag);
      }

      answerGroup.appendChild(ansEl);
    });

    block.appendChild(img);
    block.appendChild(textBox);
    block.appendChild(hr);
    block.appendChild(answerGroup);
    reviewEl.appendChild(block);
  });
}

playAgainBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetQuizResult();
  setPage(1);
});

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setPage(1);
});