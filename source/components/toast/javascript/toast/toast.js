import { body, html } from '@utilities/dom-elements'
import Events from '@utilities/events'

const TOAST_HOOK = '[js-hook-toast]'
const TOAST_CLOSE_HOOK = '[js-hook-button-toast-close]'
const TOAST_VISIBLE_CLASS = 'toast--is-showing'
const TOAST_HTML_CLASS = 'is--toast-open'

class Toast {
  constructor() {
    this.registeredToasts = {}
    this.scrollElement = document.scrollingElement || html
    this.scrollTop = 0

    const toasts = [...document.querySelectorAll(TOAST_HOOK)]
    toasts.forEach(toast => this.setupToastsRegistry(toast))

    this.bindEvents()
  }

  /**
   * Bind event based on custom hook
   * @param {Object[]} data
   * @param {string} data[].id
   */
  customBind(data) {
    const toasts = [...document.querySelectorAll(data.hook)]

    // Loop trough all found toasts based on hook
    toasts.forEach(toast => this.setupToastsRegistry(toast))
  }

  /**
   * Setup an object per found toast
   * @param {HTMLElement} el Single toast
   */
  setupToastsRegistry(el) {
    if (el._toastIsInitialised) return

    const id = el.getAttribute('id')
    const closeBtn = [...el.querySelectorAll(TOAST_CLOSE_HOOK)]

    const toast = {
      el,
      id,
      closeBtn
    }

    this.registeredToasts[`toast-${id}`] = toast

    this.bindToastEvents(toast)
    el._toastIsInitialised = true
  }

  /**
   * Bind all general events
   */
  bindEvents() {
    Events.$on('toast::close', (event, data) => this.closeToast(data))
    Events.$on('toast::open', (event, data) => this.openToast(data))

    Events.$on('toast::bind', (event, data) => this.customBind(data))
  }

  /**
   * Bind all toast specific events
   * @param {string} id Toast id
   * @param {HTMLElement} closeBtn Button to close toast
   */
  bindToastEvents({ el, id, closeBtn }) {
    Events.$on(`toast[${id}]::close`, () => this.closeToast({ id }))
    Events.$on(`toast[${id}]::open`, () => this.openToast({ id }))

    closeBtn.forEach(el =>
      el.addEventListener('click', () => {
        Events.$trigger('toast::close', { data: { id } })
        Events.$trigger(`toast[${id}]::close`, { data: { id } })
      }),
    )

    // Close on ESCAPE_KEY
    document.addEventListener('keyup', event => {
      if (event.keyCode === 27) {
        Events.$trigger('toast::close')
        Events.$trigger(`toast[${id}]::close`, { data: { id } })
      }
    })
  }

  /**
   * Open toast by given id
   * @param {Object[]} data
   * @param {string} data[].id
   * possible types: info, warning, error, success
   */
  openToast(data) {
    const closingTimeOut = 7000
    const toast = this.registeredToasts[`toast-${data.id}`]
    const toasttype = data.type ? data.type : 'info'
    const toastlabel = data.label ? data.label : 'Information'

    if (!toast || toast.el.toastIsOpen) return

    // Add a custom test to the toast body
    toast.el.querySelector('.toast__content').innerHTML = toastlabel

    // Add toast open class to html element if noBodyClass is false
    html.classList.add(TOAST_HTML_CLASS)

    // Add tabindex and add visible class
    toast.el.classList.remove('toast--warning', 'toast--error', 'toast--success')
    toast.el.classList.add(`toast--${toasttype}`)
    toast.el.tabIndex = 0
    toast.el.classList.add(TOAST_VISIBLE_CLASS)
    toast.el.toastIsOpen = true

    setTimeout(() => Events.$trigger('toast::close', { data: data }), closingTimeOut)
  }

  /**
   * Close toast by id, if none gives it will close all
   * @param {Object[]} data
   * @param {string} data[].id
   */
  closeToast(data) {
    // If no ID is given we will close all toasts
    if (!data || !data.id) {
      for (const toastIndex of Object.keys(this.registeredToasts)) {
        this.closeToast({ id: this.registeredToasts[toastIndex].id })
      }
      return
    }

    // Get current toast from all known toasts
    const toast = this.registeredToasts[`toast-${data.id}`]

    // If there is no toast do nothing
    if (!toast || !toast.el.toastIsOpen) return

    html.classList.remove(TOAST_HTML_CLASS)

    // Remove tabindex and remove visible class
    toast.el.tabIndex = -1
    toast.el.classList.remove(TOAST_VISIBLE_CLASS)
    toast.el.toastIsOpen = false
  }
}

export default new Toast()
