import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import List from '@material-ui/core/List'

import './styles.scss'
import PokemonItem from '../PokemonItem'
import { IPokemonListItem } from '../../types'
import { API_URL_BASE } from '../../constants'

interface IData {
  results: IPokemonListItem[]
}

const PokemonsList: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<IPokemonListItem[]>([])
  const [filteredPokemons, setFilteredPokemons] = React.useState<
    IPokemonListItem[]
  >([])
  const [search, setSearch] = React.useState<string>('')

  React.useEffect(() => {
    fetch(`${API_URL_BASE}/pokemon/?offset=0&limit=1000`)
      .then(res => res.json())
      .then((data: IData) => {
        if (data && data.results) {
          setPokemons(data.results)
          setFilteredPokemons(data.results)
        }
      })
      .catch(console.error)
  }, [])

  React.useEffect(() => {
    if (search.length > 0) {
      const pattern = new RegExp(search, 'i')
      const newFilteredPokemons = pokemons.filter(pokemon =>
        pattern.test(pokemon.name)
      )
      setFilteredPokemons(newFilteredPokemons)
    } else {
      setFilteredPokemons(pokemons)
    }
  }, [search, pokemons])

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

export default PokemonsList
