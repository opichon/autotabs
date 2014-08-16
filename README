jquery.autotabs.js - A jquery plugin that automatically generates navigable tabs based on the markup in the page.
========

jquery.autotabs.js automatically generates tabs based on the markup in your DOM element to which it is applied.

A tab is created for each child element in the designated element. Which children are used to generate tabs can be customized.

A set of navigable tabs is added to the page. The location of the tabs is cusotmizable.

Each tab can contain either static or dynamic content.

See demo/docs in docs/index.html.

Requirements
------------

* jQuery >= 1.9.1

If you want autotabs to remember the state of you tabs, you also need the jquery.cookie plugin:

* jquery.cookie.js: >= 1.4

Installation
------------

### Installation via bower

Add the following lines to your bower.json configuration:

```` json
  "dependencies": {
    "autotabs": "~2.0",
  }
````

### Download

Or download from:

* http://plugins.jquery.com/autotabs/
* https://github.com/opichon/autotabs

Setup
-----

### javascripts

````html
    <script src="../dist/js/jquery.js"></script>
    <script src="../dist/js/jquery.cookie.js"></script>    <!-- optional -->
    <script src="../dist/js/jquery.autotabs.min.js"></script>
````

### stylesheets

````html
    <link rel="stylesheet" type="text/css" href="../dist/css/jquery.autotabs.min.css" />
````

For vertical tabs, include the custom stylesheet provided:

````
    <link rel="stylesheet" type="text/css" href="../dist/css/jquery.autotabs.vertical.min.css" />
````

Add the following logic to your page or to a plugin included to your page:

````javascript
$( "#mytabs" ).autotabs(/* { options } */));
````

Markup options
--------------

The tabs settings can be configured directly inside the markup. The following attributes are supported:

### data-autotabs-label

The tab label.

### data-autotabs-url

The remote url for the tab content.

### title

The tab label.

This attribute is deprecated in favour of the ````data-autotabs-label```` attribute and may be removed in future releases.

### rel (deprecated)

The remote url for the tab content.

This attribute is deprecated in favour of the ````data-autotabs-url```` attribute and may be removed in future releases.

How-to
------

### Load a tab pane's content dynamically via ajax

Simply set the ````data-autotabs-url```` attribute of the tab pane to the url of the page holding the content.

### Style tabs via bootstrap

To style the tabs with the bootstrap stylesheet, use the following options:

````json
tabs_class: "nav nav-tabs",
tab_class: null,
active_class: "active"
````

To style the tabs as pills:

````json
tabs_class: "nav nav-pills",
tab_class: null,
active_class: "active"
````

Plugin options
--------------

### tab_pane_selector

Defines the selector for identifying tab panes.

Default value: ````div, section, .tab-pane````

### tab_label_selector

Defines the selector for identifying the label/title of the tab from an element of the tab pane.

Default value: ````h1, h2, h3, h4````

### tabs_class

The CSS class to set on the generated tabs element.

Default value: ````autotabs````

### tab_class

The CSS class ot set on each generated tab element

Default value: ````autotab````

### tabs_selector

The selector for identifying the element in which the generated tabs should be appended.

Default value: none

### active_class

The CSS class to add to the tab currently selected.

Default value: ````current````

### active_tab

The index of the tab to set as active when the plugin loads.

Default value: ````null````

### cookie_name

The name of the cookie in which to store the state of the tabs. This option requires the jquery.cookie.js plugin.

Default value: ````active_tab````

### cookie_path

The path to set on the cookie. This option requires the jquery.cookie.js plugin.

Default value: ````/````

### force_refresh

Forces each tab to be refreshed when clicked.

Default value: ````false````

### tab_orphans:

Whether to treat an single (orphan) tab-pane as a tab or not.

Default value: ````false````

### loading_icon

The selector for the element containing the loading icon.

Default value: ````#loading````

### tab_id

A function responsible for generating a tab id if not suplied in the markup.

Default value:

````javascript
function( id ) { return "__" + id; }
````

### tab_label

A function responsible for generating each tab's label ifnot supplied in the markup.

Default value:

````javascript
function( index ) { return "Tab " + ( index + 1 ); },
````

###	tab_pane_id

A function responsible for generating the id of each tab pane if not supplied in the markup.

Default value:

````javascript
function( index ) { return "___" + ( index + 1 ); },
````

### vertical

Whether the tabs are vertically aligned.

Default value: false

### success

Defines the callbacks to apply when a tab is clicked. This option can be

* a function, in which case it is applied to all tabs
* an object, where the property is the id of a tab, and the value the function to act as callback for that tab.

All functions are applied to the tab pane element. ````this```` therefore refers to the tab pane element.
