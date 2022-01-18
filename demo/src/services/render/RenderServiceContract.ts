export abstract class RenderServiceContract {
  abstract renderApplication(options: {
    router: any
  }): Promise<void>

  abstract dispose(): Promise<void>

  abstract getApp(): any
}
