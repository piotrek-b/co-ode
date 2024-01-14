import { IPushPullClient } from "./types"

export class WsClient implements IPushPullClient {
  push(val: Uint8Array) {
    return Promise.resolve()
  }
  pull() { return Promise.resolve([] as unknown as Uint8Array) }
}