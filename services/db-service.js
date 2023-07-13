export default class DbService {
  #manager
  #attributes

  constructor(handlerInput) {
    this.#manager = handlerInput.attributesManager
    this.#attributes
  }

  async get() {
    const attributes = (await this.#manager.getPersistentAttributes()) || {}
    // Init
    return this.#attributes = attributes
  }

  async clear() {
    await this.save({})
  }

  async save(attributes) {
    this.#manager.setPersistentAttributes(attributes && this.#attributes)
    await this.#manager.savePersistentAttributes()
  }
}