import RafThrottle from '@utilities/raf-throttle'
import Events from '@utilities/events'
import Api from '@utilities/api'

const HOOK_AUTOCOMPLETE = 'js-hook-autocomplete'
const HOOK_INPUT_LIST = '[js-hook-autocomplete-list]'
const INPUT_VALUE_ID = 'data-value-id'
const INPUT_ACTIVE_CLASS = 'autocomplete__element--is-active'
const ITEM_ACTIVE_CLASS = 'autocomplete__list-item--is-active'

class Autocomplete {
  constructor(element) {
    this.element = element
    this.list = this.element.querySelector(HOOK_INPUT_LIST)
    this.type = this.element.getAttribute(HOOK_AUTOCOMPLETE)
    this.input = document.querySelector(`[js-hook-${this.type}]`)

    if (!this.list || !this.input) return

    this.apiUrl = this.input.getAttribute('data-api')
    this.listID = this.input.getAttribute('data-list')
    this.listData = this.listID ? this.getListData() : null

    this.bindEvents()
  }

  bindEvents() {
    this.input.addEventListener('focusout', () => this.closeList())

    this.input.addEventListener('keydown', event => this.tryToSubmit(event))

    RafThrottle.set([
      {
        element: this.input,
        event: 'keyup',
        namespace: `autocomplete-key-up-${this.type}`,
        fn: event => this.keyUp(event),
        delay: 200,
      },
    ])
  }

  setFocus() {
    Events.$trigger('autocomplete::focusin')
  }

  removeFocus() {
    Events.$trigger('autocomplete::focusout')
  }

  tryToSubmit(event) {
    if (event.which === 13 && this.element.classList.contains(INPUT_ACTIVE_CLASS)) {
      event.preventDefault()
      this.closeList()
    }
  }

  keyUp(event) {
    const key = window.event ? event.keyCode : event.which

    switch (key) {
      // Arrow down
      case 40:
        this.setListItem('next')
        break

      // Arrow up
      case 38:
        this.setListItem('prev')
        break

      // Escape
      case 27:
        this.closeList()
        break

      // Enter
      case 13:
        break

      default:
        this.getList(event)
        break
    }
  }

  closeList() {
    this.removeFocus()

    this.element.classList.remove(INPUT_ACTIVE_CLASS)

    if (this.input.getAttribute(INPUT_VALUE_ID) === '')
      this.input.setAttribute(INPUT_VALUE_ID, this.input.value)

    Events.$trigger('autocomplete::selected', {
      type: this.type,
      name: this.input.name,
      value: this.input.value,
      valueId: this.input.getAttribute(INPUT_VALUE_ID),
    })
  }

  showList() {
    this.element.classList.add(INPUT_ACTIVE_CLASS)
  }

  setListItem(direction) {
    let totalItems = this.list.childElementCount

    if (totalItems === 0) return

    const currentItem = this.list.querySelector(`.${ITEM_ACTIVE_CLASS}`)
    const currentIndex = Array.prototype.indexOf.call(this.list.children, currentItem)
    const nextIndex = currentIndex + 1 === totalItems ? totalItems - 1 : currentIndex + 1
    const prevIndex = currentIndex - 1 <= 0 ? 0 : currentIndex - 1

    if (currentItem) currentItem.classList.remove(ITEM_ACTIVE_CLASS)

    if (direction === 'next') {
      this.list.children[nextIndex].classList.add(ITEM_ACTIVE_CLASS)
      this.updateField(this.list.children[nextIndex])
    } else {
      this.list.children[prevIndex].classList.add(ITEM_ACTIVE_CLASS)
      this.updateField(this.list.children[prevIndex])
    }
  }

  getListData() {
    const listDataTag = document.getElementById(this.listID)
    return listDataTag ? JSON.parse(listDataTag.innerHTML) : undefined
  }

  filterLocalList(value) {
    const values = value.trim().split(' ')

    const data = this.listData.filter(item => {
      return values.some(value => {
        return (
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.keywords.toLowerCase().includes(value.toLowerCase())
        )
      })
    })

    this.createList(data, value)
  }

  getList(event) {
    const target = event.target
    const value = target.value

    this.input.setAttribute(INPUT_VALUE_ID, '')

    if (this.listData) {
      this.filterLocalList(value)
    } else {
      Api.get(`${this.apiUrl}?query=${value}`).then(response =>
        this.createList(response.data, value),
      )
    }
  }

  updateList(items, value) {
    if (items && value !== '') {
      this.list.innerHTML = items
      this.list.scrollTop = 0

      this.showList()
      this.setFocus()
      this.bindElementListeners()
    } else {
      this.closeList()
    }
  }

  createList(data, value) {
    const list = data
      ? data
          .map(
            item =>
              `<li class="autocomplete__list-item" data-id="${item.id}" data-value="${item.name}" data-keywords="${item.keywords}">${item.name}</li>`,
          )
          .join('')
      : false

    this.updateList(list, value)
  }

  updateField(element) {
    this.input.setAttribute(INPUT_VALUE_ID, element.getAttribute('data-id'))
    this.input.value = element.getAttribute('data-value')
  }

  bindElementListeners() {
    const elements = [...this.list.querySelectorAll('li')]

    elements.map(element => {
      element.addEventListener('mouseover', event => {
        event.currentTarget.classList.add(ITEM_ACTIVE_CLASS)
        this.updateField(event.currentTarget)
      })

      element.addEventListener('mouseout', () => {
        elements.map(item => {
          item.classList.remove(ITEM_ACTIVE_CLASS)
        })
      })
    })
  }
}

export default Autocomplete
