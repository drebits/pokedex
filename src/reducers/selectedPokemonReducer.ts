import { Reducer } from 'redux'

import { types } from '../actions'
import { IPokemonItem } from '../types'

export type TSelectedPokemonState = IPokemonItem | null

const INITIAL_STATE: TSelectedPokemonState = null

const selectedPokemonReducer: Reducer<TSelectedPokemonState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case types.SET_SELECTED_POKEMON:
      return action.payload
    default:
      return state
  }
}

export default selectedPokemonReducer
