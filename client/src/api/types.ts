export interface IPushPullClient {
  push: (blob: Uint8Array) => Promise<void>
  pull: () => Promise<Uint8Array>
}
