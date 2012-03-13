(function($) {
  $.fn.autotabs = function(method) {
    var options,
        active_tab_index,
        processing = false;
    
    var methods = {
      init: function(params) {
        var $this = $(this);
        options = $.extend({},
          this.autotabs.defaults, 
          params);

        var ul = '<ul class="' + options.tabs_class  + '">';
        active_tab_index = (options.active_tab == null ? 
                             ($.cookie ? $.cookie(options.cookie_name) : 0) : 
                             options.active_tab) || 0;

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
              children.each(function(index, element) {
                ul += helpers.tab(index, element);
              });
          }

          ul += '</ul>';

          var tabs = (options.tabs_selector != '') ? $(options.tabs_selector) : $this;
          if (!tabs) { tabs = $this; }
          tabs.prepend(ul);
 
          $('ul.' + options.tabs_class + ' li > a').click(function() {
            if (processing) { return false; }
            helpers.showLoadingIcon(options);
            processing = true;
            if (options.loading_icon) 
            var link = $(this);
            
            link.parent().addClass(options.active_class).siblings('li').removeClass(options.active_class);
            $this.children(options.tab_pane_selector).each(function() {
              $(this).slideUp('fast').removeClass(options.active_class);
            });
            
            $this.children(options.tab_pane_selector).each(function(index) { 
              if (link.attr('rel') == this.id) {
                try {
                  helpers.load(this);
                  if ($.cookie) {
                    $.cookie(options.cookie_name, index, { path: options.cookie_path });  
                  }

                }
                catch (e) { console.log(e); }
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
      generate_tab: function(index, element) {
        var tab = '<li' + (index == active_tab_index ? ' class="' + options.active_class + '"' : '') + 
                  (options.tab_id && $.isFunction(options.tab_id) ? ' id="' + options.tab_id(element.id) + '">' : '>') +
                  '<a href="' + ($(element).attr('rel') || '#' + element.id) + '" rel="' + $(element).attr('id') + '">' + 
                  ($(element).attr('title') || $(options.tab_label_selector, $(element)).get(0).innerHTML) + 
                  '</a></li>';
        return tab;
      },
        
      load: function(pane) {
        var success = helpers.getSuccess(pane.id);
        if ((url = $(pane).attr('rel')) && ($(pane).html().trim() == '' || options.force_refresh)) {
          $(pane).empty();
          $(pane).load(url, function() {
            $(pane).slideDown('fast').addClass(options.active_class);
            if (success && $.isFunction(success)) {
              success.call(pane);
            };
            processing = false;
            helpers.hideLoadingIcon(options);
          });
        }
        else {
          $(pane).slideDown('fast').addClass(options.active_class);
          if (success && $.isFunction(success)) { success.call(pane); }
          processing = false;
          helpers.hideLoadingIcon(options);
        }
      },
      
      getSuccess: function(id) {
        if (!options.success) { return null; }
        if ($.isFunction(options.success)) {
          return options.success;
        }
          
        return options.success[id];
      },
      
      showLoadingIcon: function(options) {
        if (!options.loading_icon) { return; }
        $(options.loading_icon).show();
      }, 
      
      hideLoadingIcon: function(options) {
        if (!options.loading_icon) { return; }
        $(options.loading_icon).hide();
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
      $.error('Method ' +  method + ' does not exist in jQuery.autotabs');
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
      tab_orphans: false,          // display a tab even for a single orphan child element
      loading_icon: '#loading'
  };
})(jQuery);
