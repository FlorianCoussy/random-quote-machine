"use strict";

const camperbotGistURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&related=freecodecamp&text=';
const tumblrURLs = [
  'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=',
  '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
];
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
  currentQuote = getRandomQuote();
  console.log('Got a new quote: ', currentQuote);

  $('#tweet-quote').attr(
    'href',
    `${twitterURL + encodeURIComponent(`"${currentQuote.quote}" - ${currentQuote.author}`)}`
  );

  $('#tumblr-quote').attr(
    'href',
    `${tumblrURLs[0] + encodeURIComponent(currentQuote.author) + '&content=' + encodeURIComponent(currentQuote.quote) + tumblrURLs[1]}`
  );
};

$(document).ready(() => {
  fetchQuotes()
    .then(() => getQuote());

  $('#new-quote').on('click', getQuote);
});
