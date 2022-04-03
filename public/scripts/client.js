$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    const $tweets = $('#tweets-container');
    $tweets.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweets.prepend($tweet);
    }
  };

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

  const $form = $('#newTweetForm');
  
  $form.on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(event.target).serialize();
    
    $.post('/tweets', serializedData, response => {
      console.log(response);
      renderTweets();
    });
  
  });

  const loadTweets = (url, method, cb) => {
    $.ajax({ url, method})
      .then(data => {
        cb(data);
      })
      .catch(err => {
        console.log('Error:', err);
      })
  };

  loadTweets("/tweets", "GET", renderTweets);
});
