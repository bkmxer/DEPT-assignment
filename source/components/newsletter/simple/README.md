
# Simple newsletter component

## Table of contents
1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)

![Newsletter Demo](./_demo/newsletter-simple.gif)

## What does it do
* Simple newsletter subscribes that sends Ajax request to chosen newsletter platform.

## Install

Import module
```javascript
import moduleInit from '@utilities/module-init';
import Newsletter from '@components/newsletter';
moduleInit('[js-hook-newsletter]', Newsletter);
```

## How to use

Add newsletter template to page

```htmlmixed
{% include "newsletter.html" %}
```

## Dependencies
* [Events utility](/utilities/events/)
* [API utility](/utilities/api/)
* [Validation utility](/utilities/validation/)

## Developers
* [Adrian Klingen](mailto:adrian.klingen@deptagency.com)
