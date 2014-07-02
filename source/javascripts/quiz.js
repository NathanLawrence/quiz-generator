(function ($) {
  // make sure to attach json object 'var input' with quiz data
  //variables
  var answer,
      qnumber,
      score = 0,
      currentQuestion = 0;

  // social media icons
  var facebook = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M8.5 3.7h1.4v1.6h-1c-.2 0-.4.1-.4.4v.9h1.4l-.1 1.7h-1.3v4.5h-1.9v-4.5h-.9v-1.7h.9v-1c0-.7.4-1.9 1.9-1.9z' class='shape-2'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px; margin-left: 15px;''>Facebook</tspan></text></foreignObject></svg>";
  var twitter = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M4 4.8c1 1.2 2.5 2 4.2 2.1l-.1-.4c0-1.1.9-2 2-2 .6 0 1.1.3 1.5.6.5-.1.9-.3 1.3-.5-.2.4-.5.8-.9 1.1l1.2-.3c-.3.4-.6.8-1 1.1v.3c0 2.7-2 5.8-5.8 5.8-1.1 0-2.2-.3-3.1-.9h.5c.9 0 1.8-.3 2.5-.9-.9 0-1.6-.6-1.9-1.4h.4c.2 0 .4 0 .5-.1-.9-.2-1.6-1-1.6-2 .3.2.6.2.9.3-.6-.5-.9-1.1-.9-1.8 0-.4.1-.7.3-1z' class='shape-2'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px;''>Twitter</tspan></text></foreignObject></svg>";
  var google = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M8.6 4.3l.6-.4c.1-.1.1-.1.1-.2s-.1-.1-.2-.1h-2.7c-.3 0-.6.1-.9.2-1 .3-1.6 1.1-1.6 2 0 1.2.9 2.1 2.2 2.1-.1 0-.1.1-.1.2 0 .2 0 .4.1.5-1.1 0-2.2.6-2.6 1.4-.1.2-.2.4-.2.7 0 .2.1.4.2.6.3.5.8.8 1.5 1 .4.1.8.1 1.2.1.4 0 .7 0 1.1-.1 1-.3 1.7-1.1 1.7-2 0-.8-.2-1.3-1-1.8-.3-.2-.6-.6-.6-.7 0-.2 0-.3.4-.6.5-.4.8-1 .8-1.5s-.2-1-.4-1.3h.2c.1 0 .1 0 .2-.1zm-3.3 1.3c-.1-.4 0-.8.3-1.1.1-.2.3-.2.5-.2.6 0 1.1.7 1.2 1.4.1.4 0 .8-.3 1.1-.1.2-.3.3-.5.3-.6 0-1.1-.7-1.2-1.5zm2.6 4.6v.2c0 .8-.6 1.2-1.7 1.2-.9 0-1.5-.5-1.5-1.2 0-.6.8-1.2 1.7-1.2.2 0 .4 0 .6.1l.2.1c.4.4.7.5.7.8z' class='shape-2'></path><path fill='#fff' d='M13.3 7.8c0 .1-.1.2-.2.2h-1.5v1.5c0 .1-.1.2-.2.2h-.4c-.1 0-.2-.1-.2-.2v-1.5h-1.6c-.1 0-.2-.1-.2-.2v-.4c0-.1.1-.2.2-.2h1.5v-1.5c0-.1.1-.2.2-.2h.4c.1 0 .2.1.2.2v1.5h1.5c.1 0 .2.1.2.2v.4z' class='shape-3'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px;''>Google+</tspan></text></foreignObject></svg>";
  
  // attach quiz and vertical-specific stylesheets
  var addCSS = function () {
    $('head').append('<link rel="stylesheet" href="http://assets.sbnation.com.s3.amazonaws.com/features/quiz-generator/quiz.css" type="text/css" />');
    // $('head').append('<link rel="stylesheet" href="stylesheets/quiz.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="' + pubStylesheet + '" type="text/css" />');
    buildQuiz();
  }

  // write questions and answers on html
  var buildQuiz = function () {
    qnumber = currentQuestion + 1;
    $(".quiz-container").html("<div class='progress'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div><div class='question'>" + input[currentQuestion].question + "</div>" +
      "<ol class='answers'><li id='option-a'>" + input[currentQuestion].a + "</li>" +
      "<li id='option-b'>" + input[currentQuestion].b + "</li>" +
      "<li id='option-c'>" + input[currentQuestion].c + "</li>" +
      "<li id='option-d'>" + input[currentQuestion].d + "</li></ol>" +
      "<button class='qq-button hint'>Need a hint?</button>" +
      "<button class='qq-button submit'>Submit answer</button>" +
      "<div class='answer'></div>");
    selectAnswer();
    $('.hint').on('click', showHint);
    $('.submit').on('click', checkAnswer);
  }

  // shows (1) out of (3) questinos
  var displayProgress = function () {
    $('.progress').html("<div class='progress'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div>");
  }

  // style changes when user selects answers
  var selectAnswer = function () {
    $("li").click(function() {
      $(".selected").removeClass("selected");
      $(this).addClass("selected");
      $(".submit").addClass("submit-highlight").fadeIn();
    });
  }

  // show hint
  var showHint = function () {
    $(".answer").html(input[currentQuestion].hint);
  }

  // check answer by comparing selected html and correct answer from input
  var checkAnswer = function () {
    if ($(".selected").length > 0) {
      answer = $(".selected").html();
      if (answer == input[currentQuestion].answer) {
        score++;
        displayProgress();

        $(".answer").html("<p>Correct!</p><p>" + input[currentQuestion].correct + "</p>");

      } else {
        $(".answer").html("<p>Sorry!</p><p> " + input[currentQuestion].incorrect + "&nbsp;The correct answer is " + input[currentQuestion].answer + ".</p>");
      }
      if (currentQuestion != (input.length-1)) {
        $(".answer").append("<button class='qq-button next'>Next</button>");
        $('.next').on('click', nextQuestion);
      } else {
        $(".answer").append("<button class='qq-button check-score'>See Final Score</button>");
        $('.check-score').on('click', finalScore);
      }
    }
  }

  // increment question count and built new questino and answers
  var nextQuestion = function () {
    currentQuestion++;
    buildQuiz();
  }

  // display final score card and social media sharing
  var link = document.URL
  var finalScore = function () {
    $(".quiz-container").html("<div class='scorecard'><p>You correctly answered</p><p>" + score + "&nbsp;out of&nbsp;" + input.length + "</p><div id='social-media'><ul><li><a href='http://www.facebook.com/sharer.php?u=" + link + "' target='_blank'>" + facebook + "</a></li><li><a href='http://twitter.com/home?status=I scored " + score + "/" + input.length + " on this quiz " + link + " via @voxproduct' target='_blank'>" + twitter   + "</a></li><li><a href='https://plus.google.com/share?url=" + link + "' target='_blank'>" + google + "</a></li></ul></div><p>Challenge your friends!</p></div>");
  }

  addCSS();
  window.onload = function () {
    buildQuiz();
  }
})(jQuery);