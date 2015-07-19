// global that the preview references
var input;

(function ($) {
  var key, quizType;

  // initialize tabletop library
  function init(url) {
    Tabletop.init({
      key: url,
      callback: readData,
      simpleSheet: true
    });
  }

  function readData(data, tabletop) {
  	input = [];
  	for ( var i = 0; i < data.length; i++ ) {
  		input[i] = findUrlinObject( data[i] );
  	}
  	embed(input);
  }

  function findUrlinObject ( data ) {
  	$.each( data, function( key, value ){
  		if ( key == 'correct' || key == 'incorrect' ) {
  			data[key] = converttoHex( data[key] );
  		}
  	} );
  	return data;
  }

  function converttoHex ( string ) {
  	var hex, i;
  	var result = "";
  	for ( i = 0; i < string.length; i++ ) {
  		hex = string.charCodeAt( i ).toString( 16 );
  		result += ( "000" + hex ).slice( -4 );
  	}
  	return result;
  }

  function showPreview() {
    $('.quiz-container').empty();

    if (quizType == 'quiz') {
      QuizGenerator_quiz();
		} else {
      QuizGenerator_flowchart();
		}

    pageScroll('.embed');
  }

  function changeTemplate() {

  	if (quizType == 'quiz') {
      $('#quiz-template').attr('href', 'https://drive.google.com/previewtemplate?id=0AlMgrVuuAI0MdGl6NngwMGYtX3RHQjlic0xzNnBjUGc&mode=public').addClass('template');
      $('#example-spreadsheet').val('https://docs.google.com/spreadsheet/pub?key=0AlMgrVuuAI0MdGl6NngwMGYtX3RHQjlic0xzNnBjUGc&output=html');
    } else {
      $('#quiz-template').attr('href', 'https://drive.google.com/previewtemplate?id=0AlMgrVuuAI0MdE9ZNVhnYmk0TUdidGhiZTgwT0F6MGc&mode=public').addClass('template');
      $('#example-spreadsheet').val('https://docs.google.com/spreadsheet/pub?key=0ArcRX35HpjojdGlSR012UjVDZkpIM19ObVY5TE03U2c&output=html');
    }
  }

  function embed(input) {
    var html = "&lt;div class='quiz-container'></div>&lt;script type='text/javascript'>window.jQuery || document.write('&lt;script src=\"//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js\">&lt;&#92;/script>');&lt;/script>";
      html += "&lt;script type='text/javascript'>var input = " + JSON.stringify(input) + "; $(function(){ QuizGenerator_" + quizType + "() }); &lt;/script>";

    $("#embedcode").html(html);
    showPreview();
  }

  function buildquiz(){
    var url = $('#url').val();
    init(url);
  }

  function pageScroll(target) {
    $('html, body').animate({
       scrollTop: $(target).offset().top - 30
    }, 1000);
  }

  $(document).ready(function() {

    $('.chart-type span').on('click', function(e) {
      $('input:radio[name=quiz-type]:checked').prop('checked', false);
      $('.chart-type span').removeClass('checked');
      $(e.target).closest('span').addClass('checked').find('input').prop('checked', true);

      quizType = $('input:radio[name=quiz-type]:checked').val();
      changeTemplate();
    });

    $('#show-instructions').on('click', function() {
      $('#instructions').slideDown();
      return false;
    });

    $('#help').on('click', function() {
      $('.quiz-help').slideDown();
      return false;
    });

    $('#build').on('click', function() {
      buildquiz();
    });

  })
})(jQuery);