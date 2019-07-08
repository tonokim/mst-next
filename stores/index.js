import { types, applySnapshot } from 'mobx-state-tree'
import { User } from './user'
import { App } from './app'

let store = null

const Store = types
  .model("Store",{
    user: types.optional(User, {
      name: 'test3',
      lastUpdate: Date.now()
    }),
    app: types.optional(App, {
      name: 'testapp'
    }),
  })
  .actions(self => {
    let timer
    function start () {
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data
        // pass off to another action instead
        self.update()
      }, 1000)
    }

    function update () {
      self.lastUpdate = Date.now()
      self.light = false
    }

    function stop () {
      clearInterval(timer)
    }

    return { start, stop, update }
  })

export function initializeStore (isServer, snapshot = null) {
  if (isServer) {
    store = Store.create({user: { lastUpdate: Date.now() }})
  }
  if (store === null) {
    store = Store.create({user: { lastUpdate: Date.now() }})
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}
