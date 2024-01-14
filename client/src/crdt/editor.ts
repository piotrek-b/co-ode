import { Model } from "json-joy/es2020/json-crdt"
import { IPushPullClient } from "../api/types"

export class EditorCRDT {
  #model: Model
  #client: IPushPullClient

  constructor(defaultValue: string, client: IPushPullClient) {
    this.#client = client
    this.#model = Model.withLogicalClock()
    this.#model.api.root({
      text: defaultValue
    })
  }

  push(text: string, offset: number) {
    this.#model.api.str(['text']).ins(offset, text)
    const blob = this.#model.toBinary();
    return this.#client.push(blob)
  }

  async pull() {
    const blob = await this.#client.pull()
    const fork = Model.fromBinary(blob);
    const patch = fork.api.flush()
    this.#model.applyPatch(patch)
  }
}