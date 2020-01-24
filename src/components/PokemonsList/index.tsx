import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import List from '@material-ui/core/List'
import { Action, Dispatch, bindActionCreators } from 'redux'

import './styles.scss'
import PokemonItem from '../PokemonItem'
import { IPokemonListItem, TPokemonSearch } from '../../types'
import { getPokemonsAction, setPokemonSearchAction } from '../../actions'
import { IRootState } from '../../reducers'
import { connect } from 'react-redux'

interface IHocProps {
  pokemonSearch: TPokemonSearch
  pokemonsList: IRootState['pokemonsList']
  getPokemons: () => void
  setPokemonSearch: (search: TPokemonSearch) => void
}

const PokemonsList: React.FC<IHocProps> = ({
  getPokemons,
  pokemonsList,
  pokemonSearch,
  setPokemonSearch
}) => {
  const [filteredPokemons, setFilteredPokemons] = React.useState<
    IPokemonListItem[]
  >([])

  React.useEffect(() => {
    getPokemons()
  }, [getPokemons])

  React.useEffect(() => {
    if (pokemonSearch.length > 0) {
      const pattern = new RegExp(pokemonSearch, 'i')
      const newFilteredPokemons = pokemonsList.filter(pokemon =>
        pattern.test(pokemon.name)
      )
      setFilteredPokemons(newFilteredPokemons)
    } else {
      setFilteredPokemons(pokemonsList)
    }
  }, [pokemonSearch, pokemonsList])

  return (
    <div className="pokemons-list">
      <div className="poke-search">
        <TextField
          fullWidth
          label="Search"
          placeholder="e.g. Moltres"
          value={pokemonSearch}
          onChange={event => {
            const trimmedSearch = event.target.value.trim()
            setPokemonSearch(trimmedSearch)
          }}
        />
      </div>
      <div className="list-wrapper">
        <List className="poke-list">
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                itemSize={50}
                itemCount={filteredPokemons.length}
                itemData={filteredPokemons}
                height={height}
                width={width}
              >
                {PokemonItem}
              </FixedSizeList>
            )}
          </AutoSizer>
        </List>
      </div>
    </div>
  )
}

const mapStateToProps = ({ pokemonsList, pokemonSearch }: IRootState) => ({
  pokemonsList,
  pokemonSearch
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      getPokemons: getPokemonsAction,
      setPokemonSearch: setPokemonSearchAction
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList)
