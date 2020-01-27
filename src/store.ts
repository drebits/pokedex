import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import CommunicationToParentMiddleware from './ParentCommunicationMiddleware'

const store = createStore(
  rootReducer,
  // @ts-ignore
  composeWithDevTools(applyMiddleware(thunk, CommunicationToParentMiddleware))
)

export default store
