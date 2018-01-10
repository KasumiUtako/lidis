export class redisGetter {
  constructor (ctx) {
    this._ctx = ctx
  }

  getV (type, key) {
    this.getValue(type, key)
  }

  getValue (type, key) {
    return this[`_get${this._capitalize(type)}Value`](key)
  }

  _capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  _getStringValue (key) {
    return this._ctx.get(key)
  }

  _getHashValue (key) {
    return this._ctx.hgetall(key)
  }

  _getSetValue (key) {
    return this._ctx.smembers(key)
  }

  _getZsetValue (key) {
    return this._ctx.zrange(key, 0, -1, 'WITHSCORES')
  }

  _getListValue (key) {
    return this._ctx.lrange(key, 0, -1)
  }
}

export default redisGetter
