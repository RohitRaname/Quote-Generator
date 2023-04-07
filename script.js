const quoteTextEl = document.querySelector(".quote__text");
const quoteBtn = document.querySelector(".quote__btn-next");
const quoteContainer = document.querySelector(".quote__container");
const loaderEl = document.querySelector(".loader");
const authorTextEl = document.querySelector(".quote__author");
const twitterBtn = document.querySelector(".quote__btn-twitter-icon");
let count = 0;
// keep naming simple and describing what function does

function spinner() {
  // handle container and spinner

  quoteContainer.classList.toggle("hide");
  loaderEl.classList.toggle("hide");
  loaderEl.classList.toggle("spin");
}

function randomQuoteGenerator(arr) {
  const num = Math.floor(Math.random(arr.length) * arr.length);
  return arr[num];
}

// Get quote from API
async function setQuotes() {
  const apiUrl = "https://type.fit/api/quotes";

  try {
    spinner();

    // spinner use before loading next quote

    const res = await fetch(apiUrl);
    const arr = await res.json();
    const quote = randomQuoteGenerator(arr);

    if (quote.text.length > 100) {
      quoteTextEl.classList.remove("quote__long");
      quoteTextEl.classList.add("quote__small");
    }

    if (!quote.author) quote.author = "Unknown";

    quoteTextEl.textContent = quote.text;
    authorTextEl.textContent = quote.author;
    spinner();

    // Doing an error to check to check if error is working
    throw new Error("Opps!");
  } catch (err) {
    count++;
    if (count > 3) alert("Not Today BUT RIGHTNOW");
    console.error(err);
  }
}

function tweetQuote() {
  // Blank let us open tab in new window
  window.open("https://twitter.com/explore", "_blank");
}

quoteBtn.addEventListener("click", setQuotes);
twitterBtn.addEventListener("click", tweetQuote);
