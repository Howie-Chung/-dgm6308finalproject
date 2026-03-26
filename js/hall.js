import { setPage, setQuizSetIndex, loadPage } from "./navigation.js";
import { loadAndStart } from "./quiz.js";
import "./result.js";

loadPage();

const links = document.querySelectorAll(".questions-item a");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => {
    e.preventDefault();
    setQuizSetIndex(i);
    loadAndStart();
    setPage(2);
  });
}

document.getElementById("enter-btn").addEventListener("click", (e) => {
  e.preventDefault();
  setPage(1);
});

document.getElementById("hall-back-btn").addEventListener("click", (e) => {
  e.preventDefault();
  setPage(0);
});