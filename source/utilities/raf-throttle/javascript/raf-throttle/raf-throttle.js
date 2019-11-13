import raf from 'raf'

class RafThrottle {
  constructor() {
    this.namespaces = {}
    this.timeoutList = {}
    this.runningList = {}
  }

  /**
   * Public function to set the assigned binds
   * @param {Array[]} binds
   * @param {Object[]} bind
   * @param {HTMLElement} bind[].element Element we are binding to ie. document or window
   * @param {string} bind[].event Event type we are binding ie. scroll
   * @param {string} bind[].namespace Namepace of the event
   * @param {Function} bind[].fn Function we want to execute
   */
  set(binds) {
    this._addEvents(binds)
  }

  /**
   * Public function to remove an assigned bind
   * @param {Array[]} binds
   * @param {Object[]} bind
   * @param {HTMLElement} bind[].element Element to unbind ie. document or window
   * @param {string} bind[].event Event type we are binding ie. scroll
   * @param {string} bind[].namespace Namepace of the event
   */
  remove(binds) {
    if (binds) {
      this._removeEvents(binds)
    }
  }

  /*
   * Private methods
   */

  /**
   * Loop over binds and bind them
   * @param {Array[]} binds
   * @param {Object[]} bind
   * @param {HTMLElement} bind[].element Element we are binding to ie. document or window
   * @param {string} bind[].event Event type we are binding ie. scroll
   * @param {string} bind[].namespace Namepace of the event
   * @param {Function} bind[].fn Function we want to execute
   * @param {Number} [bind[].delay] Amount of delay
   */
  _addEvents(binds) {
    binds.forEach(bind => {
      const eventOptions = {
        element: bind.element,
        event: bind.event,
        namespace: generateNamespace(bind.event, bind.namespace),
        callback: event => this._trigger(bind, event),
        eventOptions: { passive: true },
        delay: bind.delay,
      }

      this.timeoutList[eventOptions.namespace] = null
      this.runningList[eventOptions.namespace] = false

      this._addThrottledEvent(eventOptions)
    })
  }

  /**
   * Loop over binds and remove them
   * @param {Array[]} binds
   * @param {Object[]} bind
   * @param {HTMLElement} bind[].element Element to unbind ie. document or window
   * @param {string} bind[].event Event type we are binding ie. scroll
   * @param {string} bind[].namespace Namepace of the event
   */
  _removeEvents(binds) {
    binds.forEach(bind => {
      const eventOptions = {
        element: bind.element,
        event: bind.event,
        namespace: generateNamespace(bind.event, bind.namespace),
      }

      this._removeThrottledEvent(eventOptions)
    })
  }

  /**
   * Append requestAnimationFrame before firing event
   * @param {Object[]} bind
   * @param {HTMLElement} bind[].element Element we are binding to ie. document or window
   * @param {string} bind[].event Event type we are binding ie. scroll
   * @param {string} bind[].namespace Namepace of the event
   * @param {Function} bind[].fn Function we want to execute
   * @param {Number} [bind[].delay] Amount of delay
   * @param {Event} event Event object
   */
  _trigger(bind, event) {
    const eventNamespace = generateNamespace(bind.event, bind.namespace)

    if (bind.delay) {
      if (this.timeoutList[eventNamespace]) {
        this.runningList[eventNamespace] = false
        clearTimeout(this.timeoutList[eventNamespace])
      }

      this.timeoutList[eventNamespace] = setTimeout(
        () => this.createRafInstance(bind, event, eventNamespace),
        bind.delay,
      )
    } else {
      this.createRafInstance(bind, event, eventNamespace)
    }
  }

  /**
   *
   * @param {Object[]} bind
   * @param {HTMLElement} bind[].element Element we are binding to ie. document or window
   * @param {string} bind[].event Event type we are binding ie. scroll
   * @param {string} bind[].namespace Namepace of the event
   * @param {Function} bind[].fn Function we want to execute
   * @param {Event} event Event object
   * @param {Number} [bind[].delay] Amount of delay
   * @param {Event} event Event object
   * @param eventNamespace {string} - Name of event space
   */
  createRafInstance(bind, event, eventNamespace) {
    if (this.runningList[eventNamespace]) return

    raf(() => {
      bind.fn(event)
      this.runningList[eventNamespace] = false
    })

    this.runningList[eventNamespace] = true
  }

  /**
   * Bind a namespaced eventlistener to given element
   * @param {Object[]} options
   * @param {HTMLElement} options[].element
   * @param {string} options[].event Event type we are binding ie. scroll
   * @param {string} options[].namespace Namepace of the event
   * @callback {Function} options.[]callback
   * @param {object} [options[].eventOptions] Give options to your event
   */
  _addThrottledEvent(options) {
    const { element, event, namespace, callback } = options
    let { eventOptions } = options

    this.namespaces[namespace] = callback
    eventOptions = eventOptions || false

    element.addEventListener(event, callback, eventOptions)
  }

  /**
   * Remove a namespaced eventlistener to given element
   * @param {object[]} options
   * @param {HTMLElement} options[].element
   * @param {string} options[].event Event type we are removing ie. scroll
   * @param {string} options[].namespace Namepace of the event we are removing
   */
  _removeThrottledEvent(options) {
    const { element, event, namespace } = options
    if (this.namespaces[namespace]) {
      element.removeEventListener(event, this.namespaces[namespace])
      delete this.namespaces[namespace]
    }
  }
}

/**
 * Merges the event and the namespace together
 * @param {string} eventName
 * @param {string} namespace
 */
function generateNamespace(eventName, namespace) {
  return `${eventName}.${namespace}`
}

export default new RafThrottle()
