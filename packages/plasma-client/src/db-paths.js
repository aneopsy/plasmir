const os = require('os')

const BASE_DB_PATHS = {
  linux: `${os.homedir()}/.local/share/io.plasma.group/`,
  darwin: `${os.homedir()}/Library/Application Support/io.plasma.group/`,
  win32: '%APPDATA%\\io.plasma.group\\',
}
const BASE_DB_PATH = BASE_DB_PATHS[os.platform()]

module.exports = {
  BASE_DB_PATH,
}
