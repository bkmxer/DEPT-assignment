# Cookies component

## Table of contents

1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)

## What does it do

- Show the info/warning/erros/success helper "toast" label

## Install

Import module

```javascript
moduleInit.async('[js-hook-toast]', () =>
  import(/* webpackChunkName: 'Toast' */ '@components/toast'),
)
```

## How to use

### Default toast

```javascript
Events.$trigger('toast::open', { data: { id: 'toast-example', type: 'info', label: 'Bedankt voor uw aanmelding!' } })
```

### Success toast
```javascript
Events.$trigger('toast::open', { data: { id: 'toast-example', type: 'success', label: 'Bedankt voor uw aanmelding!' } })
```

### Warning toast
```javascript
Events.$trigger('toast::open', { data: { id: 'toast-example', type: 'warning', label: 'Bedankt voor uw aanmelding!' } })
```

### Error toast
```javascript
Events.$trigger('toast::open', { data: { id: 'toast-example', type: 'error', label: 'Bedankt voor uw aanmelding!' } })
```

## Dependencies

- [html, body selectors](@utilities/dom-elements)
- [Events utility](/utilities/events/)

## Developers

- [Anton Ilchuk](mailto:ilchuk.anton@gmail.com)