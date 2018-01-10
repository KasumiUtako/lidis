export class redisGetter {
  constructor (ctx) {
    this._ctx = ctx
  }

  getV (type, key) {
    this.getValue(type, key)
  }

  getValue (type, key) {
    return this[this._getFnName(type)](key)
  }

  getLimit (type, key, star, end) {
    return this[this._getFnName(type)](key, star, end)
  }

  _capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  _getFnName (type) {
    return `_get${this._capitalize(type)}Value`
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

  _getZsetValue (key, star = 0, end = -1) {
    return this._ctx.zrange(key, star, end, 'WITHSCORES')
  }

  _getListValue (key, star = 0, end = -1) {
    return this._ctx.lrange(key, star, end)
  }
}

export default redisGetter
