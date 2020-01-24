import { Reducer } from 'redux'

import { types } from '../actions'
import { TPokemonSearch } from '../types'

export type TPokemonSearchState = TPokemonSearch

const INITIAL_STATE: TPokemonSearchState = ''

const pokemonSearchReducer: Reducer<TPokemonSearchState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case types.SET_POKEMON_SEARCH:
      return action.payload
    case types.CLEAR_POKEMON_SEARCH:
      return INITIAL_STATE
    default:
      return state
  }
}

export default pokemonSearchReducer
