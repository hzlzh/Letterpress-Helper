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
          $result.html('<span class="blue">' + words[0].split('').join('</span><span>') + '</span>');
          for (index in words){
            $all.append('<li>'+words[index]+'</li>')
          }
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
          $.ajaxSettings.async = false;
          $.getJSON(API + query.toLowerCase() + '/' + length + '?jsoncallback=?', function(data) {
            if(data != '') {
              update_result($result, data)
              update_count(data[0].length)
            } else update_result($result, 'NULL:(')
          }, 'json');
        };

      var init = function() {
          // jrumble effect init
          $obj.jrumble().jrumble({
            speed: 0
          });
        };

      return {
        init: init,
        get_query: get_query,
        get_words: get_words
      };
    }();

  LH.init();

  $('#tool-bar input[type="submit"]').bind('click', function(e) {
    e.preventDefault();
    LH.get_words(API, LH.get_query(), $('#word-count').val());
  });

  $('.letters-pool .letter-box input, .count-board input').mouseenter(function() {
    $(this).trigger('startRumble');
    $(this).select();
  }).mouseleave(function() {
    var temp = $(this);
    setTimeout(function() {
      temp.trigger('stopRumble');
    }, 420);
  }).keypress(function() {
    var temp = $(this);
    setTimeout(function() {
      temp.trigger('stopRumble');
    }, 420);
    $(this).next().select().trigger('startRumble');
  });

});