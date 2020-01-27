import { CONTAINER_APP_URL } from './App'
import { IRootState } from './reducers'

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

    window.parent.postMessage(data, CONTAINER_APP_URL)
  }

  next(action)
}

export default CommunicationToParentMiddleware
