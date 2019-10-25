import * as React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import './styles.scss'
import { IPokemonListItem } from '../../types'

export interface IPokemonItemProps {
  data: IPokemonListItem[]
  index: number
  style: React.CSSProperties
}

export const PokemonItem: React.FC<IPokemonItemProps> = ({
  data: pokemonsList,
  index,
  style
}) => {
  const pokemon = pokemonsList[index]

  return (
    <ListItem button divider style={style}>
      <ListItemText primary={pokemon.name} className="poke-capitalize" />
    </ListItem>
  )
}

export default PokemonItem
