
# Form elements

## Table of contents
1. [What does it do](#what-does-it-do)
2. [Install](#install)
3. [How to use](#how-to-use)
4. [Dependencies](#dependencies)
5. [Developers](#developers)


## What does it do
* Render form elements

## Install

### File input
Import module for file input
```javascript
import { CustomFile } from '@components/form-elements';

moduleInit.sync('[js-hook-input-file]', CustomFile);
```

### Label as placeholder
Import module for label as placeholder
```javascript
import { LabelAsPlaceholder } from '@components/form-elements';

moduleInit.sync('[js-hook-lap]', LabelAsPlaceholder);
```

### Autocomplete
Import module for autocomplete
```javascript
import { Autocomplete } from '@components/form-elements';

moduleInit.sync('[js-hook-autocomplete]', Autocomplete);
```

```htmlmixed
{% import 'form-elements.html' as form %}
```

### Input type number sanitization
Sanitize all input type number fields from anything other than numeric values
```javascript
import { NumberInput } from '@components/form-elements';

moduleInit.sync('input[type="number"]', NumberInput);
```

Or call it asynchronously
```javascript
moduleInit.async('input[type="number"]', () =>
  import(/* webpackChunkName: "js/NumberInput" */ '@components/form-elements/input-number'),
);
```

### Emoji killer
(Optionally) remove all emoji's from an input field
```javascript
import EmojiKiller from "@form-elements/element/emoji-killer";
```

<br>

Call EmojiKiller() and pass a single DOM element, array of elements or NodeList. Spreading the elements is not required.
```javascript
Examples:

this.elements = [...document.querySelectorAll('.input-class')];
EmojiKiller(this.elements);

or

this.elements = document.getElementsByTagName('input');
EmojiKiller(this.elements);

or

const element = document.querySelector('input[type="password"]');
EmojiKiller(element);
```

## How to use
There are multiple macros available

### Form
See the [form](/components/form-elements/template/form-elements/form.html) macro for all available options.
```htmlmixed
{% call form.form() %}
    
    HTML HERE

{% endcall %}
```

### Fieldset
See the [fieldset](/components/form-elements/template/form-elements/fieldset.html) macro for all available options.
```htmlmixed
{% call form.fieldset({
    legend: 'Test form data'
}) %}

    HTML HERE

{% endcall %}
```

### Input
See the [input](/components/form-elements/template/form-elements/input.html) macro for all available options.
```htmlmixed
{{ form.input({
    name: 'input-text',
    id: 'input-text',
    label: 'Input',
    placeholder: 'Input'
}) }}
```

### Input - file upload
See the [file](/components/form-elements/template/form-elements/file.html) macro for all available options.
```htmlmixed
{{ form.file({
    name: 'input-file',
    id: 'input-file',
    label: 'Input - file',
    multiple: 'files selected'
}) }}
```

### Radio
See the [radio](/components/form-elements/template/form-elements/radio.html) macro for all available options.
```htmlmixed
{{ form.radio({
    name: 'radio-1',
    options: [
        {
            label: 'One',
            value: 'one-1',
            id: 'radio-1-1'
        },
        {
            label: 'Two',
            value: 'two-1',
            id: 'radio-1-2'
        },
        {
            label: 'Three',
            value: 'three-1',
            id: 'radio-1-2'
        }
    ]
}) }}
```

### Checkbox
See the [checkbox](/components/form-elements/template/form-elements/checkbox.html) macro for all available options.
```htmlmixed
{{ form.checkbox({
    name: 'checkbox 1',
    options: [
        {
            label: 'One',
            value: 'one-2',
            id: 'checkbox-1-1'
        },
        {
            label: 'Two',
            value: 'two-2',
            id: 'checkbox-1-2'
        },
        {
            label: 'Three',
            value: 'three-2',
            id: 'checkbox-1-3'
        }
    ]
}) }}
```

### Select
See the [select](/components/form-elements/template/form-elements/select.html) macro for all available options.
```htmlmixed
{{ form.select({
    name: 'Select',
    id: 'select-1',
    label: 'Select One',
    options: [
        {
            label: 'Please choose an option',
            default: true
        },
        {
            label: 'One',
            value: 'one'
        },
        {
            label: 'Two',
            value: 'two'
        },
        {
            label: 'Three',
            value: 'three'
        }
    ]
}) }}
```

### Textarea
See the [input](/components/form-elements/template/form-elements/textarea.html) macro for all available options.
```htmlmixed
{{ form.textarea({
    name: 'textarea-text',
    id: 'textarea-text',
    label: 'Textarea',
    placeholder: 'Textarea'
}) }}
```


### Label as placeholder
Works on input, file and textarea

```htmlmixed
{{ form.input({
    labelAsPlaceholder: true,
    name: 'input-text',
    id: 'input-text',
    label: 'Input'
}) }}
```


### Autocomplete
See the [autocomplete](/components/form-elements/template/form-elements/autocomplete.html) macro for all available options.

#### With API endpoint
HTML:
```htmlmixed
{{ form.autocomplete({
    name: 'query',
    label: 'Autocomplete',
    hook: 'form-autocomplete',
    attr: 'data-api="https://jsonplaceholder.typicode.com/users" autocomplete="off"',
    placeholder: 'Autocomplete'
}) }}
```

API response:
```json
[
  { "id":"1", "name":"Dylan Vens" },
  { "id":"2", "name":"Anne van den Hoogen" },
  { "id":"3", "name":"Matt van Voorst", "keywords": "Sexy man, with, amazing hair" }
]
```

#### No API endpoint
Add data-list="autocomplete-list" to the attributes 
If no API call after each keypress is wanted, an inline json can be used. HTML:
```htmlmixed

{{ form.autocomplete({
    name: 'query',
    label: 'Autocomplete',
    hook: 'form-autocomplete',
    attr: 'data-list="autocomplete-list" autocomplete="off"',
    placeholder: 'Autocomplete'
}) }}

<script id="autocomplete-list">
    [
        {
            "id": 1,
            "name": "name 1",
            "keywords:", "foo, bar"
        },
        {
            "id": 2,
            "name": "name 2",
            "keywords:", "foo, bar"
        }
    ]
</script>
```

## Dependencies
* [RAF](https://www.npmjs.com/package/raf)
* [Raf throttle utility](/utilities/raf-throttle/)
* [Events utility](/utilities/events/)
* [API utility](/utilities/api/)

## Developers
* [Adrian Klingen](mailto:adrian.klingen@deptagency.com)
* [Anne van den Hoogen](mailto:anne.vandenhoogen@deptagency.com)
* [Frank van der Hammen](mailto:frank.vanderhammen@deptagency.com)
