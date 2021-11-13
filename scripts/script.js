"use strict";

const camperbotGistURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
];
let quotes;
let currentQuote;

const fetchQuotes = () => {
  return $.ajax({
    headers: {
      Accept: 'application/json',
    },
    url: camperbotGistURL,
    success: (jsonQuotes) => {
      if (typeof jsonQuotes === 'string') {
        quotes = JSON.parse(jsonQuotes).quotes;
        console.log('Quotes has been fetched:', quotes);
      }
    },
  });
};

const getRandomQuote = () => {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const getQuote = () => {
  console.log('Getting a new quote...');
  currentQuote = getRandomQuote();

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&related=freecodecamp&text=' +
    encodeURIComponent('"' + currentQuote.quote + '" - ' + currentQuote.author)
  );

  console.log(currentQuote);
};

$(document).ready(() => {
  fetchQuotes()
    .then(() => getQuote());

  $('#new-quote').on('click', getQuote);
});
