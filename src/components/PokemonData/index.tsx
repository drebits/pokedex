import * as R from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'

import './styles.scss'
import { IRootState } from '../../reducers'
import { IPokemonItem } from '../../types'

interface IHocProps {
  selectedPokemon: IPokemonItem | null
}

const PokemonData: React.FC<IHocProps> = ({ selectedPokemon }) => {
  if (!selectedPokemon) {
    return null
  }

  const name = R.pathOr('', ['name'], selectedPokemon)
  const types = R.pathOr<IPokemonItem['types']>([], ['types'], selectedPokemon)
  const stats = R.pathOr<IPokemonItem['stats']>([], ['stats'], selectedPokemon)
  const experience = R.pathOr<string>('', ['base_experience'], selectedPokemon)

  return (
    <div className="pokemon-data">
      <div className="data-item">
        {'Name'}: <span className="value">{name}</span>
      </div>
      <div className="data-item">
        {'Experience'}: <span className="value">{experience}</span>
      </div>
      {types.map((type, typeIndex) => (
        <div className="data-item" key={`type-${typeIndex}`}>
          {`Type ${typeIndex + 1}`}:{' '}
          <span className="value">{R.pathOr('', ['type', 'name'], type)}</span>
        </div>
      ))}
      {stats.map((stat, statIndex) => (
        <div className="data-item" key={`stat-${statIndex}`}>
          {R.pathOr('', ['stat', 'name'], stat)}:
          <span className="value">{R.pathOr('', ['base_stat'], stat)}</span>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = ({ selectedPokemon }: IRootState) => ({
  selectedPokemon
})

export default connect(mapStateToProps)(PokemonData)
