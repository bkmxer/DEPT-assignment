# Set tabindex of children

## Table of contents

1. [What does it do](#findings)

## Findings on template translation

- Sets the tabindex of all tabbable children

## #1

18n (internationalization)
For static i18n was chosen gulp-i18n-localize. It allows you to generate all translations during project building.

Short example:
In directory locales create en and de folder
In settings.js define your locales and default lang:
```javascript
{
  locales : ['en', 'de'],
  defaultLang : 'en'
}
```
Then create content.json in en and de directories
Add some content to both content.json:
```javascript
locales/en/content.json

{
  "title": "Hello World!",
  "description" : "Let's create!"
}
locales/de/content.json

{
  "title": "Hallo Welt!",
  "description" : "Lass uns erschaffen!"
}
```

Then add conent to your html:
```htmlmixed
<html>
  <head> </head>
  <body>
    <h1> @{conent.title} </h1>
    <p> @{conent.description} </p>
  </body>
<html>
```
When project will assembled gulp-i18n-localize will generate 2-lang versions:

dist/index.html
```htmlmixed
<html>
  <head> </head>
  <body>
    <h1> Hello World! </h1>
    <p> Let's create! </p>
  </body>
<html>
```
and dist/de/index.html

```htmlmixed
<html>
  <head> </head>
  <body>
    <h1> Hallo Welt! </h1>
    <p> Lass uns erschaffen! </p>
  </body>
<html>
```
In settings.js your can define delimeters for interpolation. By default delimeters is @{ } for compatibility with Handlebars.

Full documentation you can find at gulp-i18n-localize repository.
https://github.com/sergey-pimenov/web-static-template#i18n-internationalization

## #2

https://github.com/filaraujo/gulp-i18n-localize

## #3

Polyglot js nunjucks

## #4

https://medium.com/best-of-i18n/the-best-javascript-i18n-libraries-657f9fd2124a

## #5

https://www.npmjs.com/package/i18next

## #6
Using as a Filter
https://github.com/SamyPesse/nunjucks-i18n

## #7

https://github.com/mozilla/nunjucks/issues/109
