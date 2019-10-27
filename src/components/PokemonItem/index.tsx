import * as React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Action, Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './styles.scss'
import { IPokemonListItem } from '../../types'
import { getPokemonAction, TGetPokemonAction } from '../../actions'

interface IHocProps {
  getPokemon: TGetPokemonAction
}

export interface IPokemonItemProps {
  data: IPokemonListItem[]
  index: number
  style: React.CSSProperties
}

export const PokemonItem: React.FC<IPokemonItemProps & IHocProps> = ({
  data: pokemonsList,
  index,
  style,
  getPokemon
}) => {
  const pokemon = pokemonsList[index]

  return (
    <ListItem
      button
      divider
      style={style}
      onClick={() => getPokemon(pokemon.url)}
    >
      <ListItemText primary={pokemon.name} className="poke-capitalize" />
    </ListItem>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      getPokemon: getPokemonAction
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(PokemonItem)
