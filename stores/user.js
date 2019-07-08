import { types, getParent } from 'mobx-state-tree'

export const User = types.model("User", {
  name: 'test3',
  age: 1,
  lastUpdate: types.Date,
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
    self.light = true
  }

  function stop () {
    clearInterval(timer)
  }

  
  function setName(name){
    self.name += name + 1
  }

  function addAge(number){
    self.age += 1
  }


  return {
    setName,
    addAge,
    start,
    stop,
    update
  }
})