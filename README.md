
# Neoskop Updated Pattern Lab with Gulp

## Table of Contents

1. [Gulp-Integration](#gulp-integration)
2. [Start development with Gulp](#gulp-start)
3. [Handling paths in Gulp](#gulp-path-handling)
4. [Gulp-Releasing](#gulp-releasing)
7. [Todos](#todos)
8. [About Pattern Lab](#gulp-integration)
9. [Demo](#gulp-start)
10. [Getting Started](#getting-started)
11. [Working with Patterns](#working-with-patterns)
12. [Creating & Working With Dynamic Data for a Pattern](#working-with-data)
13. [Using Pattern Lab's Advanced Features](#advanced-features)


<a name="gulp-integration">Gulp-Integration</a>
-----------


Patternlab doesn't take over the asset-handling, that is really good. We can handle it. Because of this we decide to use [Gulpjs](http://gulpjs.com/) as a streaming build system, which will handle the assets. It's super fast and easy to configurate.

* Sass-Compiling (Libsass)
* Server (Gulp-Connect)
* Livereload
* Minify (Javascript, CSS and images)
* Releasing / Deployment
  * Bump up the version
  * Tagging
  * Push files and tags to endpoint
  * Push files via rsync to a server


<a name="gulp-start">Start development</a>
-----------

After you cloned the project, you must follow some simple steps before you can start with development. Follow this short instruction:

```
// Install gulp
sudo npm install gulp -g

// Install dependencies
npm install

// Start server
gulp serve

// Open project in your browser
http://localhost:8080
```

<a name="gulp-path-handling">Path-Handling</a>
-----------

Extracting the paths from the streams were important for us. You can customize it without to have the bunch of tasks around it.

```
// Contain all base folders for each type of asset
var basePaths;

// Contain files
var appFiles;
```

You find a variable called ```production```. This is for cut the workflow into two sections - one for ongoing development-process and the other one for releasing / minifing stuff.

In the tasks where you need minifing you must set the variable to true, otherwise set it to false.

<a name="gulp-releasing">Releasing / Deployment with Gulp</a>
-----------

Versioning is important in your styleguide, specially when you talk with your co-workers about it.

After you finished a version, then you must release it. The good point is, that all files will publish to your remote repository at github, bitbucket or whatever is your endpoint. This is not all: It will deploy all files in `public` to a server, which you defin in the gulpfile.

* Bump up the number in your json's (default: package.json & bower.json)
* Create tag
* Push all with tags to endpoint (Github, Bitbucket, etc.)
* Deploy files to a server

```
// x.x.1
gulp release --type patch

// x.1.x
gulp release --type minor

// 1.x.x
gulp release --type major
```

<a name="todos">Todos</a>
-----------

* Integration of Browsersync

<a name="about">About Pattern Lab</a>
-----------

- [Pattern Lab Website](http://patternlab.io/)
- [About Pattern Lab](http://patternlab.io/about.html)
- [Documentation](http://patternlab.io/docs/index.html)
- [Demo](http://demo.patternlab.io/)

The PHP version of Pattern Lab is, at its core, a static site generator. It combines platform-agnostic assets, like the [Mustache](http://mustache.github.io/)-based patterns and the JavaScript-based viewer, with a PHP-based "builder" that transforms and dynamically builds the Pattern Lab site. By making it a static site generator, Pattern Lab strongly separates patterns, data, and presentation from build logic.

<a name="demo">Demo</a>
-----------

You can play with a demo of the front-end of Pattern Lab at [demo.patternlab.io](http://demo.patternlab.io).

<a name="getting-started">Getting started</a>
-----------

* [Requirements](http://patternlab.io/docs/requirements.html)
* [Installing the PHP Version of Pattern Lab](http://patternlab.io/docs/installation.html)
* [Upgrading the PHP Version of Pattern Lab](http://patternlab.io/docs/upgrading.html)
* [Generating the Pattern Lab Website for the First Time](http://patternlab.io/docs/first-run.html)
* [Editing the Pattern Lab Website Source Files](http://patternlab.io/docs/editing-source-files.html)
* [Using the Command-line Options](http://patternlab.io/docs/command-line.html)
* [Command Prompt on Windows](http://patternlab.io/docs/command-prompt-windows.html)

<a name="working-with-patterns">Working with Patterns</a>
-----------

Patterns are the core element of Pattern Lab. Understanding how they work is the key to getting the most out of the system. Patterns use [Mustache](http://mustache.github.io/) so please read [Mustache's docs](http://mustache.github.io/mustache.5.html) as well.

* [How Patterns Are Organized](http://patternlab.io/docs/pattern-organization.html)
* [Adding New Patterns](http://patternlab.io/docs/pattern-add-new.html)
* [Reorganizing Patterns](http://patternlab.io/docs/pattern-reorganizing.html)
* [Including One Pattern Within Another via Partials](http://patternlab.io/docs/pattern-including.html)
* [Managing Assets for a Pattern: JavaScript, images, CSS, etc.](http://patternlab.io/docs/pattern-managing-assets.html)
* [Modifying the Pattern Header and Footer](http://patternlab.io/docs/pattern-header-footer.html)
* [Using Pseudo-Patterns](http://patternlab.io/docs/pattern-pseudo-patterns.html)
* [Using Pattern Parameters](http://patternlab.io/docs/pattern-parameters.html)
* [Using Pattern State](http://patternlab.io/docs/pattern-states.html)
* ["Hiding" Patterns in the Navigation](http://patternlab.io/docs/pattern-hiding.html)
* [Adding Annotations](http://patternlab.io/docs/pattern-adding-annotations.html)
* [Viewing Patterns on a Mobile Device](http://patternlab.io/docs/pattern-mobile-view.html)

<a name="working-with-data">Creating & Working With Dynamic Data for a Pattern</a>
-----------

The PHP version of Pattern Lab utilizes Mustache as the template language for patterns. In addition to allowing for the [inclusion of one pattern within another](http://patternlab.io/docs/pattern-including.html) it also gives pattern developers the ability to include variables. This means that attributes like image sources can be centralized in one file for easy modification across one or more patterns. The PHP version of Pattern Lab uses a JSON file, `source/_data/data.json`, to centralize many of these attributes.

* [Introduction to JSON & Mustache Variables](http://patternlab.io/docs/data-json-mustache.html)
* [Overriding the Central `data.json` Values with Pattern-specific Values](http://patternlab.io/docs/data-pattern-specific.html)
* [Linking to Patterns with Pattern Lab's Default `link` Variable](http://patternlab.io/docs/data-link-variable.html)
* [Creating Lists with Pattern Lab's Default `listItems` Variable](http://patternlab.io/docs/data-listitems.html)

<a name="advanced-features">Using Pattern Lab's Advanced Features</a>
-----------

By default, the Pattern Lab assets can be manually generated and the Pattern Lab site manually refreshed but who wants to waste time doing that? Here are some ways that Pattern Lab can make your development workflow a little smoother:

* [Watching for Changes and Auto-Regenerating Patterns](http://patternlab.io/docs/advanced-auto-regenerate.html)
* [Auto-Reloading the Browser Window When Changes Are Made](http://patternlab.io/docs/advanced-reload-browser.html)
* [Multi-browser & Multi-device Testing with Page Follow](http://patternlab.io/docs/advanced-page-follow.html)
* [Keyboard Shortcuts](http://patternlab.io/docs/advanced-keyboard-shortcuts.html)
* [Special Pattern Lab-specific Query String Variables ](http://patternlab.io/docs/pattern-linking.html)
* [Preventing the Cleaning of public/](http://patternlab.io/docs/advanced-clean-public.html)
* [Generating CSS](http://patternlab.io/docs/advanced-generating-css.html)
* [Modifying the Pattern Lab Nav](http://patternlab.io/docs/advanced-pattern-lab-nav.html)
* [Editing the config.ini Options](http://patternlab.io/docs/advanced-config-options.html)
* [Integration with Compass](http://patternlab.io/docs/advanced-integration-with-compass.html)
