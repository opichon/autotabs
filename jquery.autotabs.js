(function($) {
  var methods = {
    init: function(options) {
      var $this = $(this);
      var options = $.extend({
          tab_pane_selector: "div",
          tab_label_selector: "h3",
          tabs_class: "autotabs",
          tabs_selector: "",
          active_class: "current",
          active_tab: null,
          cookie_name: "active_tab",
          force_refresh: false,
          tab_orphans: false          // display a tab even for a single orphan child element
        }, 
        options);

      var ul = '<ul class="' + options.tabs_class  + '">';
      var active_tab = (options.active_tab == null ? $.cookie(options.cookie_name) : options.active_tab) || 0;

      return $this.each(function() {
        var children = $this.children(options.tab_pane_selector);

        switch (children.length) {
          case 0 : 
            return;

          case 1 :
            if (!options.tab_orphans) {
              children.show();
              return;
            }

          default :
            children.each(function(index) {
              ul += '<li' + (index == active_tab ? ' class="current"' : '') + '>' +
                    '<a href="' + ($(this).attr('rel') ? $(this).attr('rel') : '#' + this.id) + '" rel="' + $(this).attr('id') + '">' + 
                    ($(this).attr('title') ? $(this).attr('title') : $(options.tab_label_selector, $(this)).get(0).innerHTML) + 
                    '</a></li>'; 
            });
        }

        ul +- '</ul>';

        var tabs = (options.tabs_selector != '') ? $(options.tabs_selector) : $this;
        if (!tabs) { tabs = $this; }
        tabs.prepend(ul);
        
        $('ul.' + options.tabs_class + ' li > a').click(function() {
          var link = $(this);
          link.parent().addClass(options.active_class).siblings('li').removeClass(options.active_class);
          $(options.tab_pane_selector + '.' + options.active_class, $this).slideUp('fast').removeClass(options.active_class);
          $this.children(options.tab_pane_selector).each(function(index) { 
            if (link.attr('rel') == this.id) {
              // in IE link.attr('href') return 'http://paymenow/...#tab1'; in Mozilla, Chrome link.attr('href') return '#tab1'.
              if (link.attr('href').substr(link.attr('href').length - this.id.length - 1, 1) != '#') {
                if ($(this).html() == '' || options.force_refresh) {
                  $(this).empty();
                  var fn = (options.success && options.success[this.id]) ? options.success[this.id] : null;
                  $(this).load(link.attr('href'), fn);
                }
              }
              $(this).addClass(options.active_class).slideDown('fast)');
              $.cookie(options.cookie_name, index); 
            }
          });
          return false;
        });

        $this.children(options.tab_pane_selector).each(function(index) { 
          if (index == active_tab) {
            if ($(this).attr('rel')) { 
              var fn = (options.success && options.success[this.id]) ? options.success[this.id] : null;
              $(this).load($(this).attr('rel'), fn);
            }
            $(this).addClass(options.active_class).slideDown('fast');
            $.cookie(options.cookie_name, index);
          }
          else { $(this).slideUp('fast').removeClass(options.active_class); }
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
