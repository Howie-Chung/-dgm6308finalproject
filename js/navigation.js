const pages = [
  { id: "enter-page" },
  { id: "hall-page" },
  { id: "quiz-page" },
  { id: "result-page" },
];

let pageIndex = 0;

function setPage(index) {
  pageIndex = index;
  loadPage();
}

function loadPage() {
  for (let i = 0; i < pages.length; i++) {
    const isCurrentPage = i === pageIndex;
    if (isCurrentPage) {
      document.getElementById(pages[i].id).style.display = "block";
    } else {
      document.getElementById(pages[i].id).style.display = "none";
    }
  }
}

let quizSetIndex = 0;

function setQuizSetIndex(index) {
  quizSetIndex = index;
}

function getQuizSetIndex() {
  return quizSetIndex;
}

let quizResult = null;

function setQuizResult(result) {
  quizResult = result;
}

function getQuizResult() {
  return quizResult;
}

function resetQuizResult() {
  quizResult = null;
}

export {
  setPage,
  loadPage,
  setQuizSetIndex,
  getQuizSetIndex,
  setQuizResult,
  getQuizResult,
  resetQuizResult,
};