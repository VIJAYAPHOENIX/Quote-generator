const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// loading anmation
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// loading function
function complete() {
    if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
    }
    
}
let apiquotes = [];
// to generate a new quote
function newquote() {
    loading();
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];
    // if author is null then it is replaced with 'unknown' word
    if(!quote.author) {
         authorText.textcontent = 'Uknown';
    } else{
        authorText.textContent=quote.author;
    }
        //if the is long then
    if(quote.text>70){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

// get quote from API
async function getquotes() {
    loading();
     const apiurl = 'https://type.fit/api/quotes';
    try{
     const response = await fetch(apiurl);
     apiquotes = await response.json();
     newquote();
    }    catch(error){
    // catch error here
}
} 
// tweet quote
function tweetQuote() {
    const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterurl,'_blank');
}
// Event Listener
newQuoteBtn.addEventListener('click',newquote);
twitterBtn.addEventListener('click',tweetQuote);
// on load
getquotes();