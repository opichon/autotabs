(function($) {
  $.fn.autotabs = function(method) {
    var options,
        active_tab_index;
    
    var methods = {
      init: function(params) {
        var $this = $(this);
        options = $.extend({},
          this.autotabs.defaults, 
          params);

        var ul = '<ul class="' + options.tabs_class  + '">';
        active_tab_index = (options.active_tab == null ? $.cookie(options.cookie_name) : options.active_tab) || 0;

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
                ul += '<li' + (index == active_tab_index ? ' class="' + options.active_class + '"' : '') + '>' +
                      '<a href="' + ($(this).attr('rel') ? $(this).attr('rel') : '#' + this.id) + '" rel="' + $(this).attr('id') + '">' + 
                      ($(this).attr('title') ? $(this).attr('title') : $(options.tab_label_selector, $(this)).get(0).innerHTML) + 
                      '</a></li>'; 
              });
          }

          ul += '</ul>';

          var tabs = (options.tabs_selector != '') ? $(options.tabs_selector) : $this;
          if (!tabs) { tabs = $this; }
          tabs.prepend(ul);
 
          
          $('ul.' + options.tabs_class + ' li > a').click(function() {
            var link = $(this);
            link.parent().addClass(options.active_class).siblings('li').removeClass(options.active_class);
            $(options.tab_pane_selector + '.' + options.active_class, $this).slideUp('fast').removeClass(options.active_class);
            
            $this.children(options.tab_pane_selector).each(function(index) { 
              if (link.attr('rel') == this.id) {
                try {
                helpers.load(this);
                }
                catch (e) { alert(e); }
              }
            }); 
            return false;
          });
 
          $this.children(options.tab_pane_selector).each(function(index, elt) { 
            if (index == active_tab_index) { helpers.load(elt); }
            else { $(elt).slideUp('fast').removeClass(options.active_class); } 
          }); 
        }); 
      }
    };
    
    var helpers = {
      load: function(pane) {
        var success = helpers.getSuccess(pane.id);
        if (url = $(pane).attr('rel')) {
          if ($(pane).html() == '' || options.force_refresh) {
            $(pane).empty();
            var fn = (options.success && options.success[pane.id]) ? options.success[pane.id] : null;
            $(pane).load(url, success);
          }
        }
        else {
          if (success && $.isFunction(success)) { success.call(pane); }
          $(pane).addClass(options.active_class).slideDown('fast)');
          if ($.cookie) {
            $.cookie(options.cookie_name, active_tab_index, { path: options.cookie_path });  
          }
        }
      },
      
      getSuccess: function(id) {
        if (!options.success) { return null; }
        if ($.isArray(options.success)) {
          return options.success[id];
        }
        
        return options.success;
      }
    };

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
  };
  
  $.fn.autotabs.defaults = {
      tab_pane_selector: "div",
      tab_label_selector: "h3",
      tabs_class: "autotabs",
      tabs_selector: "",
      active_class: "current",
      active_tab: null,
      cookie_name: "active_tab",
      cookie_path: '/',
      force_refresh: false,
      tab_orphans: false          // display a tab even for a single orphan child element      
  };
})(jQuery);
