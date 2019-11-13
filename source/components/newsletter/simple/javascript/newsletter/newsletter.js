import Api from '@utilities/api'
import Events from '@utilities/events'
import { isValidEmail } from '@utilities/validation'

const API_URL = '/api/test/'

const FORM_HOOK = '[js-hook-newsletter-form]'
const INPUT_HOOK = '[js-hook-newsletter-input]'

const SUCCESS_MESSAGE_HOOK = '[js-hook-newsletter-message-success]'
const ERROR_MESSAGE_HOOK = '[js-hook-newsletter-message-error]'

const SUBMIT_BUTTON_HOOK = '[js-hook-newsletter-submit]'
const CLOSE_BUTTON_HOOK = '[js-hook-newsletter-button-close]'
const CLOSE_MESSAGE_BUTTON_HOOK = '[js-hook-newsletter-button-close-message]'

const OPEN_CLASS = 'newsletter--is-open'
const MESSAGE_CLASS = 'newsletter__message--is-open'

class Newsletter {
  constructor(element) {
    this.newsletter = element

    this.form = this.newsletter.querySelector(FORM_HOOK)
    this.inputs = this.newsletter.querySelectorAll(INPUT_HOOK)

    this.message = {}
    this.message.success = this.newsletter.querySelector(SUCCESS_MESSAGE_HOOK)
    this.message.error = this.newsletter.querySelector(ERROR_MESSAGE_HOOK)

    this.button = {}
    this.button.submit = this.newsletter.querySelector(SUBMIT_BUTTON_HOOK)
    this.button.close = this.newsletter.querySelector(CLOSE_BUTTON_HOOK)
    this.button.closeMessage = this.newsletter.querySelectorAll(CLOSE_MESSAGE_BUTTON_HOOK)

    if (!this.newsletter) {
      return
    }

    this.bindEvents()
  }

  /**
   * Bind events
   */
  bindEvents() {
    Array.from(this.inputs).forEach(input => {
      input.addEventListener('focus', () => this._open())
      input.addEventListener('keypress', () => this._testForm())
      input.addEventListener('keyup', () => this._testForm())
    })

    Array.from(this.button.closeMessage).forEach(button => {
      button.addEventListener('click', () => this._closeMessage())
    })

    this.button.close.addEventListener('click', () => this._close())
    this.form.addEventListener('submit', event => this._submitForm(event))
  }

  /**
   * Set open state
   */
  _open() {
    this.newsletter.classList.add(OPEN_CLASS)
  }

  /**
   * Set close state
   */
  _close() {
    this.newsletter.classList.remove(OPEN_CLASS)
  }

  /**
   * Closes the message according to current message state.
   */
  _closeMessage() {
    if (this.message.state && this.message[this.message.state]) {
      this.message[this.message.state].classList.remove(MESSAGE_CLASS)
      this.message[this.message.state].setAttribute('aria-hidden', true)
      Events.$triggger('focustrap::deactivate')
      delete this.message.state
    }
  }

  /**
   * Runs form validation and sets button state accordingly
   */
  _testForm() {
    if (validateElements(this.inputs)) {
      this.button.submit.setAttribute('disabled', true)
    } else {
      this.button.submit.removeAttribute('disabled')
    }
  }

  /**
   * Runs form validation and submits form
   */
  _submitForm(event) {
    event.preventDefault()
    if (!validateElements(this.inputs)) {
      this._sendForm()
    }
  }

  /**
   * Sends ajax request to given API_URL
   */
  _sendForm() {
    this._closeMessage()

    Api.post(API_URL, {
      data: generateFormDataJson(this.form),
    }).then(() => this._setMessageState('success'), () => this._setMessageState('error'))
  }

  /**
   * Shows the correct message.
   * @param {String} state State to set the message to. Either success or error.
   */
  _setMessageState(state) {
    if (this.message[state]) {
      this.message.state = state
      this.message[state].classList.add(MESSAGE_CLASS)
      this.message[state].setAttribute('aria-hidden', false)
      Events.$triggger('focustrap::activate', { data: { element: this.message[state] } })
    }
  }
}

/**
 * Validate form elements.
 * @param {NodeList} elements All form elements that should be validated
 * @returns {Number} Number of errors
 */
function validateElements(elements) {
  let errors = 0

  Array.from(elements).forEach(element => {
    const type = element.getAttribute('type')

    if (element.required && element.value === '') {
      errors++
    }

    if (type === 'email' && !isValidEmail(element.value)) {
      errors++
    }
  })

  return errors
}

/**
 * Convert the form fields to JSON.
 * @param {HTMLElement} form The form element
 * @returns {Object}
 */
function generateFormDataJson(form) {
  return [].reduce.call(
    form.elements,
    (data, element) => (element.name ? ((data[element.name] = element.value), data) : data),
    {},
  )
}

export default Newsletter
