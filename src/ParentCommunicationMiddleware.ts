import { IRootState } from './reducers'
import { messageService } from './messageService'

type TCommunicationToParentMiddleware = (store: any) => void

const CommunicationToParentMiddleware: TCommunicationToParentMiddleware = (
  store: any
) => (next: any) => (action: any) => {
  const _previousState: IRootState = store.getState()

  if (_previousState && _previousState.connectedToParent) {
    const data = {
      ...action,
      _dataType: 'data-to-parent',
      _previousState
    }

    messageService.send(data)
  }

  next(action)
}

export default CommunicationToParentMiddleware
