// Libs
import * as Redis from 'ioredis'
import RedisGetter from '@/lib/redisGetter'
import RedisSetter from '@/lib/redisSetter'

let _instance = null
class RedisSock {
  constructor (address) {
    const ctx = this._ctx = new Redis(address)
    this.Getter = new RedisGetter(ctx)
    this.Setter = new RedisSetter(ctx)
  }

  static getInstance (address) {
    if (!_instance) {
      _instance = new RedisSock()
    }
    return _instance
  }
}

export default RedisSock.getInstance
