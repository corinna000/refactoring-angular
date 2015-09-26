# Refactoring AngularJS Controllers

September 26, 2015

This project introduces SlamOff, a poetry exploration application.

SlamOff is representative of the type of application that is written to meet a deadline. 

The controller is overloaded with responsibilities and all the HTML is crammed in to one view file (main.html).

Over the course of multiple refactorings (see the git tags), SlamOff will have responsibilities moved out of `MainController` and `main.html` into separate services and directives.
