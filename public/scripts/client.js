// loops through array of tweets and render HTML article for each
const renderTweets = function(tweets) {
  const $tweets = $('#tweets-container');
  $tweets.empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweets.prepend($tweet);
  }
};

// creates HTML article for each tweet
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
    <h6>${timeago.format(tweet.created_at)}</h6>
    <span>
      <i class="fa-solid fa-flag tweetIcon"></i>
      <i class="fa-solid fa-retweet tweetIcon"></i>
      <i class="fa-solid fa-heart tweetIcon"></i>
    </span>
  </footer>`);
  return $tweet;
};

// loads tweets from db
const loadTweets = (url, method, cb) => {
  $.ajax({ url, method})
    .then(data => {
      cb(data);
    })
    .catch(err => {
      console.log('Error:', err);
    });
};


$(document).ready(function() {

  // once page has loaded fetch and display tweets
  loadTweets("/tweets", "GET", renderTweets);

  // logic to handle new tweet form submissions
  const $form = $("#newTweetForm");
  $form.on("submit", function(event) {
    event.preventDefault();
    const characterLength = $("#tweet-text").val().length;
    if (characterLength > 140) {
      alert("Error: this tweet is too long, please limit it to 140 characters.");
      return;
    } else if (characterLength === 0) {
      alert("Error: this tweet is too short, please enter at least 1 character.");
      return;
    } else {
      const serializedData = $(this).serialize();
      $.post("/tweets", serializedData, () => {
        loadTweets("/tweets", "GET", renderTweets); // reloads tweets to reflect new entry
        $("#tweet-text").val(""); // resets textarea
        $(".counter").val("140"); // resets character
      });
    }
    
  });

});
