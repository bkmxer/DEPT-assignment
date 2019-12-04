const LAP_ACTIVE = 'form__item--lap-active'
const INPUT_QUERY = 'input, textarea, select'
const FILE = 'file'
const SELECT = 'SELECT'

class LabelAsPlaceholder {
  constructor(element) {
    this.formItem = element
    this.input = this.formItem.querySelector(INPUT_QUERY)

    if (this.formItem) {
      this.toggleLabelClass()
      this.bindEvents()
    }
  }

  bindEvents() {
    this.input.addEventListener('change', () => this.toggleLabelClass())

    if (this.input.type !== FILE && this.input.tagName !== SELECT) {
      this.input.addEventListener('input', () => this.toggleLabelClass(true))
      this.input.addEventListener('focus', () => this.toggleLabelClass(true))
      this.input.addEventListener('focusout', () => this.toggleLabelClass())
    }
  }

  toggleLabelClass(forceAnimateLabel) {
    const action = forceAnimateLabel || this.input.value ? 'add' : 'remove'
    this.formItem.classList[action](LAP_ACTIVE)
  }
}

export default LabelAsPlaceholder
