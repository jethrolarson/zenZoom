$(function() {
  $.fn.zenZoom = function() {
    var $zoom = $('<div id="zoom"></div>').appendTo(document.body),
        $self = this;
    $self.bind("click.zoomIn", function() {
      var $that = $(this);
      if ($zoom.is(":visible")) {
        zoomOut();
        return false;
      }
      $("body").removeClass('zoomOn');
      var $img = $(this).children("img");
      $zoom
        .css({
          "top": $img.offset().top,
          "left": $img.offset().left
        }).data("img", $img)
        .height($img.height())
        .width($img.width());
      $that.addClass("loading");
      $("<img src='" + this.href + "' style='display:none' />").load(function() {
        $zoom.show();
        var $t = $(this),
            ww = $(window).width() - 24,
            wh = $(window).height() - 38,
            w=$t.width(),h=$t.height();
        if(h>wh){
          h = wh;
          $t.height(wh);
        }
        if(w>ww){
          w = ww;
          $t.width(w);
        }
        w = $t.width();
        h = $t.height();
        $zoom.css("opacity",.4).animate({
          width: w,
          height: h,
          left: $(window).scrollLeft() + (ww / 2) - (w / 2),
          top: $(window).scrollTop() + (wh / 2) - (h / 2) +12
        },
        300,
        function() {
          $t.fadeIn(300);
          $zoom.css("opacity",1)
        });
        $that.removeClass("loading");
        $("body").addClass('zoomOn');
      }).bind("error", function() {
        $that.removeClass("loading").removeClass("zoom").addClass("noZoom").unbind("click.zoomIn");
      }).appendTo($zoom.empty());
      return false;
    });
    function zoomOut() {
      var $img = $zoom.data("img");
      $("body").removeClass('zoomOn');
      $zoom.css("opacity",.4).children("img").hide().end().animate({
        height: $img.height(),
        width: $img.width(),
        left: $img.offset().left,
        top: $img.offset().top
      }, 300, function() {
        $zoom.hide();
      });
    }
    $("body").click(function() {
      if ($zoom.is(":visible")) {
        zoomOut();
        return false;
      }
    }).keypress(function(e) {
      if ($zoom.is(":visible") && e.keyCode == 27) {
        zoomOut();
        return false;
      }
    });
  };
  $(".zoom").zenZoom();
});