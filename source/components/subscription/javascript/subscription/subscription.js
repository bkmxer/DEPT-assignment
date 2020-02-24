import { isValidEmail, isValidName, visuallyEmphasize } from '@utilities/validator';
import Events from '@utilities/events'
import Api from '@utilities/api'

const API_URL = 'http://jsonplaceholder.typicode.com/posts' // Shoutout to typicode.com

const FORM_HOOK = '[js-hook-newsletter-subscription-form]'
const INPUT_HOOK = '[js-hook-newsletter-subscription-form-input]'

const SUCCESS_MESSAGE_HOOK = '[js-hook-newsletter-message-success]'
const ERROR_MESSAGE_HOOK = '[js-hook-newsletter-message-error]'

const SUBMIT_BUTTON_HOOK = '[js-hook-newsletter-subscription-cta]'
const CLOSE_BUTTON_HOOK = '[js-hook-newsletter-button-close]'
const CLOSE_MESSAGE_BUTTON_HOOK = '[js-hook-newsletter-button-close-message]'

const NEWSLETTER_FORM_SENT_CLASS = 'newsletter__form--sending'
const OPEN_CLASS = 'newsletter--active'
const MESSAGE_CLASS = 'newsletter__message--active'

class Subscription {
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

    this._bindEvents()
  }

  /**
   * Bind events
   */
  _bindEvents() {
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
      Events.$trigger('focustrap::deactivate')
      delete this.message.state
    }
  }

  /**
   * Runs form validation and sets button state accordingly
   */
  _testForm() {
    if (invalidElements(this.inputs)) {
      this.button.submit.setAttribute('disabled', true)
    } else {
      this.button.submit.removeAttribute('disabled')
    }
  }

  /**
   * method to submit a form
   */
  _submitForm(event) {
    event.preventDefault()
    if (!invalidElements(this.inputs)) { // in case validation gives no errors -> send a form
      this._closeMessage()

      this.form.classList.add(NEWSLETTER_FORM_SENT_CLASS)

      Api.post(API_URL, { //Send ajax request
        data: generateFormData(this.form),
      }).then(
        response => {
          this.form.classList.remove(NEWSLETTER_FORM_SENT_CLASS)
          if (this._fakeFaultBehavior(response)) {
            this._setMessageState('error')
          } else {
            this._setMessageState('success')
            this.form.reset();
            Events.$trigger('modal::close')
            Events.$trigger('toast::open', { data: { id: 'toast-example', type: 'success', label: 'Bedankt voor uw aanmelding!' } })
          }
        },
      ).catch();

      // Events.$trigger('modal::close')
      // Events.$trigger('toast::open', { data: { id: 'toast-example', type: 'success', label: 'Bedankt voor uw aanmelding!' } })
    }
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
      Events.$trigger('focustrap::activate', {
        data: { element: this.message[state] },
      })
    }
  }

  /**
   * Faking the faulty scenario
   * @param {Object} response State to set the message to. Either success or error.
   */
  _fakeFaultBehavior(response) {
    let lowRegisterString = response.data.data.toLowerCase()
    return lowRegisterString.indexOf('dept') < 0;
  }
}

/**
 * Constructing a JSON using FormData interface
 * @param {HTMLFormElement} form The form element
 * @returns {Object}
 */
function generateFormData(form) {
  let formData = new FormData(form);
  return JSON.stringify(Object.fromEntries(formData));
}

/**
 * Validate form elements.
 * @param {HTMLInputElement[]} elements All form elements to be validated
 * @returns {Boolean} Indicator if the form is invalid
 */
function invalidElements(elements) {
  let faulty = false

  var arrElements = Array.from(elements)

  for (let element of arrElements) {
    const type = element.getAttribute('type')
    const name = element.getAttribute('name')

    const requiredAndEmpty = element.required && element.value === ''
    const invalidEmail = type === 'email' && !isValidEmail(element.value)
    const invalidName = type === 'text' && name.indexOf('name') > -1 && !isValidName(element.value)

    visuallyEmphasize(element, (requiredAndEmpty || invalidEmail || invalidName) ? 'invalid' : 'valid')

    if (requiredAndEmpty || invalidEmail || invalidName) faulty = true
  }

  return faulty
}

export default Subscription