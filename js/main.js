jQuery(document).ready(function($) {
  var LH = function(){

    var update_count = function(length){
      $('.word-left').html(25-length);
      $('.word-count').html(length);
    };

    var get_query = function(){
      var query = '';
      $('.letters-pool .letter-box input').each(function(){
        query += $(this).val();
      });
      return query;
    };

    var init = function(){
      // jrumble effect init
      $('.letters-pool .letter-box input').jrumble().jrumble({
        speed: 0
      });
    };

    return{
      init:init,
      get_query:get_query,
      update_count:update_count
    };
  }();

  LH.init();

  $('.letters-pool .letter-box input').mouseenter(function(){
    $(this).trigger('startRumble');
    $(this).select();
  }).mouseleave(function(){
    var temp = $(this);
    setTimeout(function() {
      temp.trigger('stopRumble');
    }, 420);
  }).keypress(function(){
    var temp = $(this);
    setTimeout(function() {
      temp.trigger('stopRumble');
    }, 420);
    $(this).next().select().trigger('startRumble');
  });

  LH.update_count($('.result-box .letter-box span').length);

});