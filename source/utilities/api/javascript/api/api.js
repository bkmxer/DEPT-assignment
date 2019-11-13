/**
 * @shelf-version: 1.0.0
 */

import Environment from '@utilities/environment'
import axios from 'axios'

const endpointBase = window.EnvironmentSettings.endpoint

class API {
  /**
   * Set an anti forgery token to make AJAX requests to the backend
   * @param {string} name
   * @param {string} value
   */
  setAntiForgeryToken(name, value) {
    this.antiForgeryToken = {}
    this.antiForgeryToken = { name, value }
  }

  get(path, data = {}, json, options = {}) {
    let config = {
      url: getEndpoint(path, json, 'get'),
      params: data,
      method: getMethod('GET', json),
    }

    config = { ...config, ...options }

    return axios(config)
  }

  post(path, data = {}, json, options = {}) {
    let config = {
      url: getEndpoint(path, json, 'post'),
      data,
      method: getMethod('POST', json),
    }

    if (this.antiForgeryToken) {
      config.headers = {}
      config.headers[this.antiForgeryToken.name] = this.antiForgeryToken.value
    }

    config = { ...config, ...options }

    return axios(config)
  }

  put(path, data = {}, json, options = {}) {
    let config = {
      url: getEndpoint(path, json, 'put'),
      data,
      method: getMethod('PUT', json),
    }

    config = { ...config, ...options }

    return axios(config)
  }

  delete(path, data = {}, json, options = {}) {
    let config = {
      url: getEndpoint(path, json, 'delete'),
      data,
      method: getMethod('DELETE', json),
    }

    config = { ...config, ...options }

    return axios(config)
  }
}

/**
 * Get the endpoint. If we require json we will return a json file.
 * @param {string} path
 * @param {string|boolean} json
 * @param {string} method
 */
function getEndpoint(path, json, method) {
  if (path.substr(0, 2) === '//' || path.substr(0, 4) === 'http' || path.substr(0, 1) === '?') {
    return path
  }

  if (json === true || (json === 'local' && Environment.isLocal)) {
    return endpointBase + path + `--${method}.json`
  } else {
    return endpointBase + path
  }
}

/**
 * Will transform the method to GET if we require static json file
 * @param {string} method Given method to check for transformation
 * @param {string|boolean} json To check if we need to transform the method
 */
function getMethod(method, json) {
  return json === true || (json === 'local' && Environment.isLocal) ? 'GET' : method
}

export default new API()
