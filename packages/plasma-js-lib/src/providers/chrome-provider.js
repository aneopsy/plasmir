const BaseProvider = require('./base-provider')

/**
 * Provides native communication for apps running in Chrome.
 */
class ChromeProvider extends BaseProvider {
  constructor (options = {}) {
    super(options)
  }

  get name () {
    return 'chrome'
  }

  async handle (method, params) {
    chrome.runtime.sendMessage(this.options.extensionId, {
      jsonrpc: '2.0',
      method: method,
      params: params
    })
  }
}

module.exports = ChromeProvider
