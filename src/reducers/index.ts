import { combineReducers } from 'redux'

import loading, { TLoadingState } from './loadingReducer'
import pokemonSearch, { TPokemonSearchState } from './pokemonSearchReducer'
import pokemonsList, { TPokemonsListState } from './pokemonsListReducer'
import selectedPokemon, {
  TSelectedPokemonState
} from './selectedPokemonReducer'
import connectedToParent, {
  TConnectedToParentState
} from './connectedToParentReducer'

export interface IRootState {
  loading: TLoadingState
  pokemonsList: TPokemonsListState
  selectedPokemon: TSelectedPokemonState
  pokemonSearch: TPokemonSearchState
  connectedToParent: TConnectedToParentState
}

export default combineReducers<IRootState>({
  loading,
  pokemonsList,
  selectedPokemon,
  pokemonSearch,
  connectedToParent
})
