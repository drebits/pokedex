import { Reducer } from 'redux'

import { types } from '../actions'

export type TConnectedToParentState = boolean

const INITIAL_STATE: TConnectedToParentState = false

const connectedToParentReducer: Reducer<TConnectedToParentState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case types.SET_CONNECTED_TO_PARENT_ON:
      return true
    case types.SET_CONNECTED_TO_PARENT_OFF:
      return false
    default:
      return state
  }
}

export default connectedToParentReducer
