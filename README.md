# expanded-ngHandsonTableDirective
expanded version of: http://handsontable.com/ - A custom json structure Editor (supporting arrays, plain objects and simple values as a custom input structure)

## How to use it
The Directive is located in js/view.js.

```<div handsonfull-Directive data="items" header="headertitles" hiddenfields="hiddenfields"></div>```

```data``` represents the json structure

```header``` are custom header titles for the initial table

```hiddenfields``` is a structure which is located in data/hiddenFields.json. It should set any attribute to display true | false

The repo contains a whole AngularJS example. You only have to start it on a (local) Webserver

## Working example
[Online Demo](http://cebra-webdesign.at/cebradev/handson/#/handsonFull)
