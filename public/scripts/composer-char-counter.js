$(document).ready(function() {
  
  $('textarea').on('input', function() {
    const maxLen = 140;
    const characters = $(this).val().length;
    $(this).nextAll(".counter").text(maxLen - characters);
    if (maxLen - characters < 0) {
      $(this).nextAll(".counter").css("color", "red");
    } else {
      $(this).nextAll(".counter").css("color", "#545149");
    }
  });
  
});