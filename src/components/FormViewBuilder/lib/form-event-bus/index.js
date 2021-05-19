
class EventBus {
  constructor() {
    this._events = {}
  }

  emit(type, ...args) {
    if (this._events[type]) {
      this._events[type].forEach(fn => fn.call(this, ...args))
      // TODO 加入异步考虑
      // TODO 加入break考虑
    }
  }

  on(type, callback) {
    if (!this._events[type]) { // 不存在该type的回调队列
      this._events[type] = [callback]
    } else {
      this._events[type].push(callback)
    }
  }

  once(type, callback) {
    const wrap = (...args) => {
      callback(...args)
      this.rm(type, wrap)
    }
    wrap.realCallback = callback
    if (!this._events[type]) { // 不存在该type的回调队列
      this._events[type] = [wrap]
    } else {
      this._events[type].push(wrap)
    }
  }

  rm(type, callback) {
    if (this._events[type]) {
    // 过滤掉当前传入的要移除的 callback
      this._events[type] = this._events[type].filter(fn => {
        return fn !== callback && fn !== callback.realCallback
      })
    }
  }

  rmAll(type) {
    if (type) {
      this._events[type] = []
    } else {
      this._events = Object.create(null)
    }
  }
}

export default EventBus
