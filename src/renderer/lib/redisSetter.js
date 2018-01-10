export class RedisSetter {
  constructor (ctx) {
    this._ctx = ctx
  }

  setValue (type, ...rest) {
    this[this._getFnName(type)].apply(this, rest)
  }

  _capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  _getFnName (type) {
    return `_set${this._capitalize(type)}Value`
  }

  _setStringValue (key, value = 'New Members') {
    this._ctx.set(key, value)
  }

  _setHashValue (key, field = 0, value = 'New Members') {
    this._ctx.hset(key, field, value)
  }

  _setSetValue (key, value = 'New Members') {
    this._ctx.sadd(key, value)
  }

  _setZsetValue (key, score = 0, member = 'New Member') {
    this._ctx.zadd(key, score, member)
  }

  _setListValue (key, value = 'New Member', mode) {
    mode === 'x' ? this._ctx.lpushx(key, value) : this._ctx.lpush(key, value)
  }
}

export default RedisSetter
