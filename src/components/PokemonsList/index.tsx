import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

import './styles.scss'

const URL_BASE = 'https://pokeapi.co/api/v2'

interface IPokemon {
  name: string
  url: string
}

interface IData {
  results: IPokemon[]
}

const PokemonsList: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<IPokemon[]>([])
  const [filteredPokemons, setFilteredPokemons] = React.useState<IPokemon[]>([])
  const [search, setSearch] = React.useState<string>('')

  React.useEffect(() => {
    fetch(`${URL_BASE}/pokemon/?offset=0&limit=1000`)
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
      <div className="search-container">
        <TextField
          fullWidth
          label="Buscar"
          placeholder="Ej: Pikachu"
          value={search}
          onChange={e => {
            const s = e.target.value.trim()
            setSearch(s)
          }}
        />
      </div>
      <div className="list">
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              itemSize={40}
              itemCount={filteredPokemons.length}
              itemData={filteredPokemons}
              height={height}
              width={width}
            >
              {PokemonItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

interface IPokemonItemProps {
  data: IPokemon[]
  index: number
  style: React.CSSProperties
}

const PokemonItem: React.FC<IPokemonItemProps> = ({
  data: pokemonsList,
  index,
  style
}) => {
  const pokemon = pokemonsList[index]

  return <div style={style}>{pokemon.name}</div>
}

export default PokemonsList
