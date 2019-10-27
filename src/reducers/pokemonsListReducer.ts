import { Reducer } from 'redux'

import { types } from '../actions'
import { IPokemonListItem } from '../types'

export type TPokemonsListState = IPokemonListItem[]
const INITIAL_STATE: TPokemonsListState = []

const pokemonsListReducer: Reducer<TPokemonsListState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case types.SET_POKEMONS_LIST:
      return action.payload
    default:
      return state
  }
}

export default pokemonsListReducer
