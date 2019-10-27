import { Reducer } from 'redux'

import { types } from '../actions'

export type TLoadingState = boolean

const INITIAL_STATE: TLoadingState = false

const loadingReducer: Reducer<TLoadingState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case types.SET_LOADING_ON:
      return true
    case types.SET_LOADING_OFF:
      return false
    default:
      return state
  }
}

export default loadingReducer
