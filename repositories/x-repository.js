const DbService = require('../services/db-service') 

class XRepository {
  #dbService

  constructor(handlerInput) {
    this.#dbService = new DbService(handlerInput)
  }

  async get() {
    const { x } = await this.#dbService.get()
    return x
  }
  
  async set(x) {
    db = await this.#dbService.get()
    db.x = x
    await this.#dbService.save()
  }

  async delete() {
    db = await this.#dbService.get()
    delete db.x
    await this.#dbService.save()
  }

  async add(item) {
    const { x } = await this.#dbService.get()
    x.push(item)
    await this.#dbService.save()
  }

  async remove(item) {
    const { x } = await this.#dbService.get()
    const i = x.indexOf(item)
    if (i !== -1) x.splice(i, 1)
    await this.#dbService.save()
  }
}

module.exports = XRepository