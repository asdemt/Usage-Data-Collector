$(document).ready(function () {

  $('select').on('change', function(){
    var $this = $(this),
        $value = $this.val();

    alert($value);

  });

  $("input").bind( //"click", function(e) {
    "blur focus focusin focusout load resize scroll unload click " +
    "dblclick mousedown mouseup mousemove mouseover mouseout mouseenter " +
    "mouseleave change select submit keydown keypress keyup error", function(e) {

      $.ajax({
        url: "http://localhost:3000/posts.json",
        type: "POST",
        data: {
          event_type: e.type,
          target: e.target.id,
          count: "1",
          host: e.target.ownerDocument.referrer,
          widget: e.target.ownerDocument.title,
          post:{event_type: e.type, target: e.target.id, count: "1", host: e.target.ownerDocument.referrer, widget: e.target.ownerDocument.title}
        },
        dataType: "json"
    });
  });
});
