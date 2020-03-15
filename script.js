"use strict";

window.addEventListener("DOMContentLoaded", init);

let json = 0;
let jsonData;
let movies = [];

const Movie = {
  title: "",
  year: "",
  lenght: "",
  writers: "",
  poster: ""
};

function init() {
  console.log("init");
  start();
}

function start() {
  console.log("start");
  loadJson();
  loadPics();
  loadInfo();
}

async function loadJson() {
  let response = await fetch("potterfilms.json");
  jsonData = await response.json();
  makeObjects();
}

async function loadPics() {
  let response = await fetch("assets/timeline.svg");
  let timeline = await response.text();
  document.querySelector(".timeline").innerHTML = timeline;
  fetchData();
}

async function loadInfo() {
  let response = await fetch("assets/info.svg");
  let info = await response.text();
  document.querySelector(".info").innerHTML = info;
  fetchData();
}

function makeObjects() {
  console.log("makeObjects");
  jsonData.forEach(jsonMovie => {
    const movieObject = Object.create(Movie);
    let title = jsonMovie.title;
    let year = jsonMovie.year;
    let lenght = jsonMovie.length;
    let writers = jsonMovie.writers;
    let poster = jsonMovie.poster;

    movieObject.title = title;
    movieObject.year = year;
    movieObject.length = lenght;
    movieObject.writers = writers;
    movieObject.poster = poster;

    movies.push(movieObject);
  });
  fetchData();
}

function fetchData() {
  console.log("fetchData");
  document.querySelector(".info").classList.add("hidden");
  document.querySelectorAll(".dot").forEach(dot => {
    dot.style.fill = "white";
    dot.addEventListener("click", displayMovie);
  });
}

function displayMovie() {
  console.log("displayMovie");
  document.querySelector(".info").classList.remove("hidden");
  document.querySelectorAll(".dot").forEach(dot => {
    dot.style.stroke = "black";
    dot.style.fill = "white";
  });

  movies.forEach(movie => {
    console.log(movie);
    if (this.dataset.year == movie.year) {
      document.querySelector(".title").textContent = movie.title.original;
      document.querySelector(".dk").textContent = movie.title.danish;
      document.querySelector(".year").textContent = movie.year;
      document.querySelector(".length").textContent = movie.length;
      document.querySelector(".director").textContent = movie.writers.novel;
      document.querySelector(".screenplay").textContent = movie.writers.screenplay;
      document.querySelector("#poster").href.baseVal = `images/${movie.poster}`;
      document.querySelector(".info").style.top = `2vh`;
      document.querySelector(".info").style.left = `25vw`;
    }
  });
  this.style.stroke = "black";
  this.style.fill = "black";
}
