export default class Storage {
  static get = (key) => {
    const item = localStorage.getItem(key)
    return item !== 'null' && item !== 'undefined' ? JSON.parse(item) : null
  }

  static set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static remove = (key) => {
    localStorage.removeItem(key)
  }

  static clear = () => {
    localStorage.clear()
  }
}
