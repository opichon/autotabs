(function( $ ) {
	$.fn.autotabs = function( method ) {
		var options,
			active_tab_index,
			processing = false;

		var methods = {
			init: function( params ) {

				options = $.extend(
					true,
					{},
					this.autotabs.defaults,
					params
				);

				return this.each(function() {
					var $this = $( this) ;

					var children = $this.children( options.tab_pane_selector );

					if ( children.length === 0) {
						return;
					}
					else if (children.length == 1 && !options.tab_orphans ) {
						children.show();
						return;
					}

					var ul = '<ul class="' + options.tabs_class  + ( options.vertical ? ' vertical' : '' ) + '">';

					active_tab_index = ( options.active_tab === null ?
						( $.cookie ? $.cookie( options.cookie_name ) : 0 ) :
						options.active_tab ) || 0;

					active_tab_index = Math.min( children.length - 1, active_tab_index );

					children.each(function( index, element ) {
						if ( element.id === "" ) {
							var id = options.tab_pane_id && $.isFunction( options.tab_pane_id ) ?
								options.tab_pane_id( index, element) :
								"___" + ( index + 1 );
								$( element ).attr( "id", id );
						}

						ul += helpers.generate_tab( index, element );
					});

					ul += "</ul>";

					var tabs = ( options.tabs_selector !== "" ) ? $( options.tabs_selector ) : $this;

					if ( !tabs ) { tabs = $this; }

					$( "." + options.tabs_class, tabs ).remove();

					tabs.prepend( ul );

					$( "li > a", tabs.children().first() ).click(function() {
						if ( processing ) {
							return false;
						}

						var link = $( this );

						if ( $( this ).parent().hasClass( options.active_class ) && !options.force_refresh ) {
							return false;
						}

						processing = true;

						helpers.showLoadingIcon( options );

						link.parent().addClass( options.active_class ).siblings("li").removeClass( options.active_class );

						$this.children( options.tab_pane_selector ).each(function() {
							$( this ).slideUp( 'fast' ).removeClass( options.active_class );
						});

						$this.children( options.tab_pane_selector ).each(function( index, e ) {
							if ( link.attr( "rel" ) == $( this ).attr( "id" ) ) {
								try {
									helpers.load( this );
									if ( $.cookie ) {
										$.cookie( options.cookie_name, index, { path: options.cookie_path } );
									}
								} catch ( ex ) {}
							}
						});

						return false;
					});

					helpers.showLoadingIcon( options );
					$this.children( options.tab_pane_selector ).each(function( index, elt ) {
						if ( index == active_tab_index ) {
							helpers.load( elt );
						} else {
							$( elt ).slideUp( "fast" ).removeClass( options.active_class );
						}
					});
				});
			}
		};

		var helpers = {
			generate_tab: function( index, element ) {
				var id = options.tab_id && $.isFunction( options.tab_id ) ? options.tab_id( element.id ) : element.id;
				var cls = options.tab_class;

				if ( $( element ).data( "tab-class" ) ) {
					cls += " " + ( $( element ).data( "tab-class" ) );
				}

				cls += index == active_tab_index ? " " + options.active_class : "";

				var label = $( element ).attr( "title" ) ||
					( $( options.tab_label_selector, $( element ) ).length ?
					$( options.tab_label_selector, $( element ) ).get( 0 ).innerHTML :
						options.tab_label && $.isFunction( options.tab_label ) ? options.tab_label( index, element ) : "Tab " + ( index + 1 ));

				var link = '<a href="' + ( $( element ).attr( "rel" ) || "#" + element.id ) + '" rel="' + element.id + '"><span>' + label + '</span></a>';
				return '<li class="' + cls + '" id="' + id + '">' + link + '</li>';
			},

			load: function( pane ) {
				var success = helpers.getSuccess( pane.id );
				if ( ( url = $( pane  ).attr( "rel" ) ) && ($.trim( $( pane ).html())  === "" || options.force_refresh ) ) {
					$( pane ).empty();
					$.ajax({
						url: url,
						error: function() { location.reload( true ); },
						success: function( data ) {
							$( pane ).html( data );
							$( pane ).slideDown( "fast" ).addClass( options.active_class );
							processing = false;
							helpers.hideLoadingIcon( options );
							if ( success && $.isFunction( success ) ) {
								success.call( pane );
							}
						}
					});
				}
				else {
					$( pane ).slideDown( "fast" ).addClass( options.active_class );
					processing = false;
					helpers.hideLoadingIcon( options );
					if ( success && $.isFunction( success ) ) {
						success.call( pane );
					}
				}
			},

			getSuccess: function( id ) {
				if ( !options.success ) {
					return null;
				}

				if ( $.isFunction( options.success ) ) {
					return options.success;
				}

				return options.success[ id ];
			},

			showLoadingIcon: function( options ) {
				if ( !options.loading_icon ) {
					return;
				}

				$( options.loading_icon ).show();
			},

			hideLoadingIcon: function( options ) {
				if ( !options.loading_icon ) {
					return;
				}

				$( options.loading_icon ).hide();
			}
		};

		// Method calling logic
		if ( methods[ method ] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === "object" || !method)  {
			return methods.init.apply( this, arguments );
		} else {
			$.error( "Method " +  method + " does not exist in jQuery.autotab" );
		}
	};

	$.fn.autotabs.defaults = {
		tab_pane_selector: "div, section, .tab-pane",
		tab_label_selector: "h1, h2, h3, h4",
		tabs_class: "autotabs",
		tab_class: "autotab",
		tabs_selector: "",
		active_class: "current",
		active_tab: null,
		cookie_name: "active_tab",
		cookie_path: "/",
		force_refresh: false,
		tab_orphans: false,          // display a tab even for a single orphan child element
		loading_icon: "#loading",
		tab_id: function( id ) { return "__" + id; },
		tab_label: function( index, element ) { return "Tab " + ( index + 1 ); },
		tab_pane_id: function( index, element ) { return "___" + ( index + 1 ); },
		vertical: false
	};
} )( jQuery );