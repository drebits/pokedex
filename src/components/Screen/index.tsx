import * as React from 'react'
import { Cancel } from '@material-ui/icons'
import { Dispatch, Action, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './styles.scss'
import { IRootState } from '../../reducers'
import { setSelectedPokemonAction } from '../../actions'

interface IHocProps {
  selectedPokemon: IRootState['selectedPokemon']
  clearSelectedPokemon: () => void
}

export const Screen: React.FC<IHocProps> = ({
  clearSelectedPokemon,
  selectedPokemon
}) => (
  <div className="screen">
    <div className="display"></div>
    <div className="clean-container">
      {!!selectedPokemon && (
        <button
          type="button"
          className="clean-button"
          onClick={clearSelectedPokemon}
        >
          <Cancel />
        </button>
      )}
    </div>
  </div>
)

const mapStateToProps = ({ selectedPokemon }: IRootState) => ({
  selectedPokemon
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      clearSelectedPokemon: () => setSelectedPokemonAction(null)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen)
