(function($) {
  var methods = {
    init: function(options) {
      var $this = $(this);
      var options = $.extend({
          tab_pane_selector: "div",
          tab_label_selector: "h3",
          tabs_class: "autotabs",
          active_class: "current",
          active_tab: 0,
          cookie_name: "active_tab"
        }, 
        options);

      var ul = '<ul class="' + options['tabs_class']  + '">';
      var active_tab = $.cookie(options['cookie_name']) || options['active_tab'];

      return $this.each(function() {
        if ($this.children(options['tab_pane_selector']).length <= 1) { return; }
        
        $this.children(options['tab_pane_selector']).each(function(index) {
          ul += '<li' + (index == active_tab ? ' class="current"' : '') + '>' +
                '<a href="#' + this.id + '">' + 
                $(options['tab_label_selector'], $(this)).get(0).innerHTML + 
                '</a></li>'; 
        });
        ul +- '</ul>';

        $this.prepend(ul);
        
        $('ul.' + options['tabs_class'] + ' li > a').click(function() {
          var link = $(this);
          link.parent().addClass(options['active_class']).siblings('li').removeClass(options['active_class']);
          $(options['tab_pane_selector'] + '.' + options['active_class'], $this).slideUp('fast').removeClass(options['active_class']);
          $this.children(options['tab_pane_selector']).each(function(index) { 
            if (link.attr('href') == '#' + this.id) {
              $(this).addClass(options['active_class']).slideDown('fast)');
              $.cookie(options['cookie_name'], index); 
            }
          });
          return false;
        });

        $this.children(options['tab_pane_selector']).each(function(index) { 
          if (index == active_tab) {
            $(this).addClass(options['active_class']).slideDown('fast');
          }
          else { $(this).slideUp('fast').removeClass(options['active_class']); }
        });      
      });
    }
  };

  $.fn.autotabs = function(method) {
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } 
    else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } 
    else {
      $.error('Method ' +  method + ' does not exist on jQuery.editInline');
    }
  
    return this.each(function() {
      $(this).tabs();
    });
  };
})(jQuery);
