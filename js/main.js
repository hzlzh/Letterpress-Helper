jQuery(document).ready(function($) {

  var API = 'http://dict.zlz.im/api/index/';

  var LH = function() {
      var $obj = $('.letters-pool .letter-box input');
      $result = $('.result .letter-box');
      $all = $('.all-box ul');
      var update_count = function(length) {
          $('#word-left').html(25 - length);
          $('#word-count').html(length);
        };

      var update_result = function($result, words) {
        if(typeof(show_4000)!="undefined")
          clearInterval(show_4000);

        var show_word = function(){
          $('#down-count').html(4);
          var random_key = parseInt(Math.random() * words.length);
          var result_query = ".all-box li[data-group='" + words.length + "'] span";
          $result.html('<span class="blue">' + $($(result_query)[random_key]).html().split('').join('</span><span>') + '</span>');
        };

        for (index in words){
          $all.prepend('<li data-group="'+words.length+'"><span>'+words[index]+'</span></li>')
        }
        show_word();

        show_4000 = setInterval(function(){
          show_word();
        },4000);
        
        show_100 = setInterval(function(){
          $('#down-count').html(parseFloat($('#down-count').html()-0.1).toFixed(1));
        },100);
        };
      var clear_box = function() {
        $('.letter-box input').val('');
      };
      var get_query = function() {
          var query = '';
          $obj.each(function() {
            query += $(this).val();
          });
          return query;
        };

      var get_words = function(API, query, length) {
          var words = '';
          $.getJSON(API + query.toLowerCase() + '/' + length + '?jsoncallback=?', function(data) {
            if(data != '') {
              update_result($result, data)
              update_count(data[0].length)
            } else update_result($result, ["NULL:("])
          }, 'json');
        };

      var init = function() {
          // jrumble effect init
          $obj.jrumble().jrumble({
            speed: 0
          });
          $('#word-count').tooltip({placement:'right'}).tooltip('show');
          $('#first-letter').tooltip({placement:'left'}).tooltip('show');
          $('#submit-button').tooltip({placement:'bottom'}).tooltip('show');
          $('#readme').tooltip({placement:'top'});
          
          ANSW.Trigger.showLogoIfEnabled("AnswerTips_anim_105x25.gif","");
        };

      return {
        init: init,
        get_query: get_query,
        clear_box: clear_box,
        get_words: get_words
      };
    }();

  LH.init();

  $('#tool-bar input[type="submit"]').bind('click', function(e) {
    e.preventDefault();
    LH.get_words(API, LH.get_query(), $('#word-count').val());
  });

  $('#clear-box').bind('click',function(e){
    e.preventDefault();
    LH.clear_box();
  });

  $('.letters-pool .letter-box input, .count-board input').mouseenter(function() {
    $(this).trigger('startRumble');
    $(this).focus();
  }).mouseleave(function() {
    var temp = $(this);
    setTimeout(function() {
      temp.trigger('stopRumble');
    }, 420);
  }).keyup(function() {
    var temp = $(this);
    setTimeout(function() {
      temp.trigger('stopRumble');
    }, 420);
    $(this).next().select().trigger('startRumble');
  });

});