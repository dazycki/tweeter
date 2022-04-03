$(document).ready(function() {

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  const $tweets = $('#tweets-container');
  $tweets.empty();
  for(const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweets.prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
  
  const $tweet = $('<article class="tweet">').append(`
  <header>
    <span>
      <img src="${tweet.user.avatars}" class="avatar">
      <h4 class="name">${tweet.user.name}</h4>
    </span>
    <h4 class="handle">${tweet.user.handle}</h4>
  </header>
  <p>${tweet.content.text}</p>
  <hr>
  <footer>
    <h6>${tweet.created_at}</h6>
    <span>
      <i class="fa-solid fa-flag tweetIcon"></i>
      <i class="fa-solid fa-retweet tweetIcon"></i>
      <i class="fa-solid fa-heart tweetIcon"></i>
    </span>
  </footer>`);

  return $tweet;
}

renderTweets(data);

const $form = $('#newTweetForm');
  
    $form.on('submit', function(event){
      event.preventDefault();
      const serializedData = $(event.target).serialize();
    
      $.post('/tweets', serializedData, response => {
        console.log(response)
        renderTweets();
      })
  
    })

});
