/**
 * Checks the input of the email field accross the regex pattern
 * https://gist.github.com/tmazur/3965625
 * @param {*} emailAddress
 */
function isValidEmail(emailAddress) {
  var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
  return emailPattern.test(emailAddress)
}

/**
 * Checks the input of the firstname or secondname field accross the regex pattern
 * @param {*} name
 */
function isValidName(name) {
  var namePattern = new RegExp(/^[a-zA-Z]+$/i)
  return namePattern.test(name)
}

/**
 * Visually emphasize if the input element state
 * @param {*} element
 * @param {*} state
 */
function visuallyEmphasize(element, state) {
  const classBasis = 'input__input--'
  if (!notEmpty(element) || !notEmpty(state)) { //guard clause
    return false
  }

  element.classList.remove('input__input--invalid', 'input__input--valid') // remove the prev visual state emphasizing classes
  element.classList.add(classBasis + state)
}

/**
 * Checks the input of the firstname or secondname field accross the regex pattern
 * @param {*} value
 */
function notEmpty(value) {
  return (value !== undefined && typeof value !== "undefined")
}

export { isValidEmail, isValidName, visuallyEmphasize }
