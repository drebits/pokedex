import { combineReducers } from 'redux'

import loading, { TLoadingState } from './loadingReducer'
import pokemonSearch, { TPokemonSearchState } from './pokemonSearchReducer'
import pokemonsList, { TPokemonsListState } from './pokemonsListReducer'
import selectedPokemon, {
  TSelectedPokemonState
} from './selectedPokemonReducer'

export interface IRootState {
  loading: TLoadingState
  pokemonsList: TPokemonsListState
  selectedPokemon: TSelectedPokemonState
  pokemonSearch: TPokemonSearchState
}

export default combineReducers<IRootState>({
  loading,
  pokemonsList,
  selectedPokemon,
  pokemonSearch
})
