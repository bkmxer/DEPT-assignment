/**
 * Cleanse input type="number" fields from anything other than numerals.
 */
class NumberInput {
  constructor(element) {
    this.element = element
    this.bindEvents()
  }

  /**
   * Catch non-numeric values and prevent them
   * @param event - keypress event
   */
  static preventNonNumericValue(event) {
    const EventKey = event.key
    const EventKeyCode = event.keyCode

    const IsNumberModern = /^[0-9]$/i.test(EventKey) || false
    const IsNumberLegacy = (EventKeyCode >= 47 && EventKeyCode <= 58) || false // Fallback for browsers that don't support event.key. Range is numeric keys.

    if (!IsNumberModern && !IsNumberLegacy) event.preventDefault()
  }

  /**
   * Catches paste event, strips non-numeric values and sets the value of the input field.
   * Triggers change event programmatically
   * @param event - paste event
   */
  stripNonNumericValue(event) {
    event.preventDefault()

    let pastedText

    if (event.clipboardData && event.clipboardData.getData) {
      // Standards Compliant FIRST!
      pastedText = event.clipboardData.getData('text/plain')
    } else if (window.clipboardData && window.clipboardData.getData) {
      // IE
      pastedText = window.clipboardData.getData('Text')
    }

    this.element.value = pastedText.replace(/\D/, '')

    const changeEvent = new Event('change')
    this.element.dispatchEvent(changeEvent)
  }

  /**
   * Bind all events
   */
  bindEvents() {
    this.element.addEventListener('keypress', event => NumberInput.preventNonNumericValue(event))

    this.element.addEventListener('paste', event => this.stripNonNumericValue(event))
  }
}

export default NumberInput
