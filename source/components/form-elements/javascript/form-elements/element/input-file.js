const FILE_LABEL_HOOK = '[js-hook-file-label]'

class CustomFile {
  constructor(element) {
    this.element = element
    this.label = {}
    this.label.element = this.element.parentNode.querySelector(FILE_LABEL_HOOK)
    this.label.text = this.label.element.innerHTML

    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener('change', () => this.handleChange())
  }

  handleChange() {
    let label = false
    let count = 0

    if (this.element.files && this.element.files.length > 1) {
      label = (this.element.getAttribute('data-multiple-label') || '').replace(
        '{count}',
        this.element.files.length,
      )
    } else if (typeof this.element.value !== `undefined`) {
      count += 1
      label = this.element.value.split('\\').pop()
    }

    if (label) {
      this.label.element.innerHTML = label
    } else if (count > 0) {
      this.label.element.innerHTML = this.label.text
    }
  }
}

export default CustomFile
