import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import List from '@material-ui/core/List'
import { Action, Dispatch, bindActionCreators } from 'redux'

import './styles.scss'
import PokemonItem from '../PokemonItem'
import { IPokemonListItem } from '../../types'
import { getPokemonsAction } from '../../actions'
import { IRootState } from '../../reducers'
import { connect } from 'react-redux'

interface IHocProps {
  pokemonsList: IRootState['pokemonsList']
  getPokemons: () => void
}

const PokemonsList: React.FC<IHocProps> = ({ getPokemons, pokemonsList }) => {
  const [filteredPokemons, setFilteredPokemons] = React.useState<
    IPokemonListItem[]
  >([])
  const [search, setSearch] = React.useState<string>('')

  React.useEffect(() => {
    getPokemons()
  }, [getPokemons])

  React.useEffect(() => {
    if (search.length > 0) {
      const pattern = new RegExp(search, 'i')
      const newFilteredPokemons = pokemonsList.filter(pokemon =>
        pattern.test(pokemon.name)
      )
      setFilteredPokemons(newFilteredPokemons)
    } else {
      setFilteredPokemons(pokemonsList)
    }
  }, [search, pokemonsList])

  return (
    <div className="pokemons-list">
      <div className="poke-search">
        <TextField
          fullWidth
          label="Search"
          placeholder="e.g. Moltres"
          value={search}
          onChange={event => {
            const trimmedSearch = event.target.value.trim()
            setSearch(trimmedSearch)
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

const mapStateToProps = ({ pokemonsList }: IRootState) => ({
  pokemonsList
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      getPokemons: getPokemonsAction
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonsList)
