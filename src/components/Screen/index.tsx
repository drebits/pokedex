import classNames from 'classnames'
import * as R from 'ramda'
import * as React from 'react'
import { Cancel } from '@material-ui/icons'
import { Dispatch, Action, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './styles.scss'
import { IRootState } from '../../reducers'
import {
  setSelectedPokemonAction,
  clearPokemonSearchAction
} from '../../actions'

interface IHocProps {
  selectedPokemon: IRootState['selectedPokemon']
  clearSelectedPokemon: () => void
  clearPokemonSearch: () => void
}

export const Screen: React.FC<IHocProps> = ({
  clearSelectedPokemon,
  clearPokemonSearch,
  selectedPokemon
}) => {
  const frontPic = R.pathOr('', ['sprites', 'front_default'], selectedPokemon)
  const backPic = R.pathOr('', ['sprites', 'back_default'], selectedPokemon)

  return (
    <div className="screen">
      <div
        className={classNames('display', {
          on: !!selectedPokemon
        })}
      >
        <div>
          {!!selectedPokemon && !!frontPic && (
            <img alt="pokemon" src={frontPic} />
          )}
          {!!selectedPokemon && !!backPic && (
            <img alt="pokemon" src={backPic} />
          )}
        </div>
      </div>
      <div className="clean-container">
        {!!selectedPokemon && (
          <button
            type="button"
            className="clean-button"
            onClick={() => [clearSelectedPokemon(), clearPokemonSearch()]}
          >
            <Cancel />
          </button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ selectedPokemon }: IRootState) => ({
  selectedPokemon
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      clearSelectedPokemon: () => setSelectedPokemonAction(null),
      clearPokemonSearch: clearPokemonSearchAction
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
