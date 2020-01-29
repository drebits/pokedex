import { BehaviorSubject } from 'rxjs'

export const CONTAINER_APP_URL = 'http://localhost:3001'

export type TMessage = any

export const subscriber = new BehaviorSubject<TMessage>({})

export const messageService = {
  send: function(message: TMessage) {
    const isAppInsideIFrame: boolean =
      window.location !== window.parent.location

    if (isAppInsideIFrame) {
      window.parent.postMessage(message, CONTAINER_APP_URL)
    }

    subscriber.next(message)
  }
}
