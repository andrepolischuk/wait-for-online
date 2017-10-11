const onlineSupported = window.navigator && typeof window.navigator.onLine !== 'undefined'

export default function waitForOnline (timeout = Infinity) {
  if (!onlineSupported || window.navigator.onLine) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    let wait

    function resolveOnline () {
      unregister()
      resolve()
    }

    function unregister () {
      clearTimeout(wait)
      window.removeEventListener('online', resolveOnline)
    }

    window.addEventListener('online', resolveOnline)

    if (timeout !== Infinity) {
      wait = setTimeout(() => {
        if (!window.navigator.onLine) {
          unregister()
          reject(new Error('You are offline'))
        }
      }, timeout)
    }
  })
}
