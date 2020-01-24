import { IRootState } from './reducers'
import { IPokemonItem, IPokemonListItem, TPokemonSearch } from './types'
import { API_URL_BASE } from './constants'

export const types = {
  SET_LOADING_ON: 'SET_LOADING_ON',
  SET_LOADING_OFF: 'SET_LOADING_OFF',
  SET_SELECTED_POKEMON: 'SET_SELECTED_POKEMON',
  SET_POKEMONS_LIST: 'SET_POKEMONS_LIST',
  SET_POKEMON_SEARCH: 'SET_POKEMON_SEARCH',
  CLEAR_POKEMON_SEARCH: 'CLEAR_POKEMON_SEARCH'
}

interface IPokemonsRes {
  results: IPokemonListItem[]
}

export const setLoadingOnAction = () => ({
  type: types.SET_LOADING_ON
})

export const setLoadingOffAction = () => ({
  type: types.SET_LOADING_OFF
})

export const setPokemonListAction = (pokemons: IPokemonListItem[]) => ({
  type: types.SET_POKEMONS_LIST,
  payload: pokemons
})

export const setSelectedPokemonAction = (pokemon: IPokemonItem | null) => ({
  type: types.SET_SELECTED_POKEMON,
  payload: pokemon
})

export const setPokemonSearchAction = (pokemonSearch: TPokemonSearch) => ({
  type: types.SET_POKEMON_SEARCH,
  payload: pokemonSearch
})

export const clearPokemonSearchAction = () => ({
  type: types.CLEAR_POKEMON_SEARCH
})

export const getPokemonsAction = () => (
  dispatch: (a: any) => void,
  getState: () => IRootState
) => {
  if (!getState().loading) {
    dispatch(setLoadingOnAction())

    fetch(`${API_URL_BASE}/pokemon/?offset=0&limit=1000`)
      .then(res => res.json())
      .then((res: IPokemonsRes) => {
        if (res && res.results) {
          dispatch(setPokemonListAction(res.results))
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setLoadingOffAction())
      })
  }
}

export type TGetPokemonAction = (url: string) => void
export const getPokemonAction: TGetPokemonAction = url => (
  dispatch: (a: any) => void,
  getState: () => IRootState
) => {
  if (!getState().loading) {
    dispatch(setLoadingOnAction())

    fetch(url)
      .then(res => res.json())
      .then((res: IPokemonItem) => {
        if (res && res.id) {
          dispatch(setSelectedPokemonAction(res))
        }
      })
      .catch(console.error)
      .finally(() => {
        setTimeout(() => {
          dispatch(setLoadingOffAction())
        }, 500)
      })
  }
}
