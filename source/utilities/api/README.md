
# API utility

## Table of contents
1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)


## What does it do
* Create a small wrapper around Axios which is exposed as an API utility.
* Provides JSON fallback for local testing

## Install
Import module
```javascript
import API from '@utilities/api';
```

## How to use
### Configure your environments
To make sure this utility works correctly, make sure you've set your environments with the Environment util.

### Optionally configure the util
You can override the default endpoints for each environment like so:
```javascript
    API.setEndpointBase('local', 'http://www.testdomain.test.tamtam.nl/api/');
```

You can set an anti forgery token if required by the API, which will be used during POST requests.
```javascript
    API.setAntiForgeryToken('tokenName', 'tokenValue');
```


### Default usage
You can use GET, POST, PUT, DELETE methods.

```javascript
API.get('whatever-you-want/', {
    props: 'with-data',
    passedAs: 'data-object'
})
    .then( response => successHandler(response) )
    .catch( response => errorHandler(response) );
```

### Use JSON fallback, locally or everywhere
If you wish, you can use a JSON fallback. The root path is configured as endpoint json, which
defaults to '/assets/json-api'. In there it will search for an exact path corresponding to the request
you are doing. So in the example underneath, it will look for `/assets/api-json/your-path/foo-bar`.
After that path, it appends a 'modifier' with the current method and than .json. E.g.: `/assets/api-json/your-path/foo-bar--delete.json`.
this is done since locally you can not use a DELETE request on a JSON file.


#### Use it
```javascript
// Pass third property 'true' to use JSON everywhere.
API.get('your-path/foo-bar', {
    data: 'object'
}, true)
    .then()
    .catch();

// Pass as third property 'local' to use JSON local only. No other environments allowed.
API.get('your-path/foo-bar', {
    data: 'object'
}, 'local')
    .then()
    .catch();
```

## Dependencies
* Axios

## Developers
* [Adrian Klingen](mailto:adrian.klingen@deptagency.com)
