
# Validator

## Table of contents
1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)


## What does it do
* Creates a reusable form validation mechanism

## Install
```javascript

import { isValidEmail, isValidName, visuallyEmphasize } from '@utilities/validator';

```

## How to use
### Import cached DOM elements in Javascript.
```javascript

// Checks if input value is a valid email
isValidEmail(element.value)

// Checks the input of the firstname or secondname field accross the regex pattern
isValidName(element.value)

// Visually emphasize if the input element state
visuallyEmphasize(element, (requiredAndEmpty || invalidEmail || invalidName) ? 'invalid' : 'valid')
```

## Dependencies
This package doesn't have any dependencies.

## Developers
* [Anton Ilchuk](mailto:ilchuk.anton@gmail.com)
