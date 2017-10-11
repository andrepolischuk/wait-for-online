import test from 'ava'
import waitForOnline from './index'

class Online {
  constructor () {
    this.online = true

    Object.defineProperty(
      window.navigator.constructor.prototype,
      'onLine',
      {
        get: () => {
          return this.online
        }
      }
    )
  }

  on () {
    this.online = true
    window.dispatchEvent(new window.Event('online'))
  }

  off () {
    this.online = false
    window.dispatchEvent(new window.Event('offline'))
  }
}

const online = new Online()

test.serial('should pass if online', async t => {
  online.on()
  await t.notThrows(waitForOnline())
})

test.serial('should pass when online will changed', async t => {
  online.off()

  setTimeout(() => {
    online.on()
  }, 500)

  await Promise.all([
    t.notThrows(waitForOnline()),
    t.notThrows(waitForOnline(1000))
  ])
})

test.serial('should throw after timeout', async t => {
  online.off()
  const error = await t.throws(waitForOnline(1000))
  t.is(error.message, 'You are offline')
})
