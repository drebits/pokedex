import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { Action, Dispatch, bindActionCreators } from 'redux'
import { pathOr } from 'ramda'

import './app.scss'
import PokemonsList from './components/PokemonsList'
import Screen from './components/Screen'
import FakeButtons from './components/FakeButtons'
import Loader from './components/Loader'
import PokemonData from './components/PokemonData'
import { IRootState } from './reducers'
import {
  setConnectedToParentOnAction,
  setSelectedPokemonAction,
  clearPokemonSearchAction
} from './actions'
import { messageService, CONTAINER_APP_URL } from './messageService'

interface IHocProps {
  loading: IRootState['loading']
  connectedToParent: IRootState['connectedToParent']
  setConnectedToParentOn: () => void
  clearSelectedPokemon: () => void
  clearPokemonSearch: () => void
}

class App extends React.Component<IHocProps> {
  public componentDidMount() {
    window.addEventListener('message', this.receiveMessage)
    messageService.send('hello-parent')
  }

  public componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage)
  }

  public render() {
    const { loading } = this.props

    return (
      <Container maxWidth="md" className="pokedex">
        {loading && <Loader />}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FakeButtons />
            <Screen />
            <PokemonData />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PokemonsList />
          </Grid>
        </Grid>
      </Container>
    )
  }

  private receiveMessage = (event: MessageEvent) => {
    const {
      connectedToParent,
      setConnectedToParentOn,
      clearPokemonSearch,
      clearSelectedPokemon
    } = this.props

    if (
      connectedToParent &&
      event.origin === CONTAINER_APP_URL &&
      pathOr<string>('', ['_dataType'], event.data) === 'data-to-children'
    ) {
      const actionType = pathOr<string>('', ['type'], event.data)

      if (actionType === 'CLEAR_POKEMON') {
        clearSelectedPokemon()
        clearPokemonSearch()
      }
    } else if (
      !connectedToParent &&
      event.origin === CONTAINER_APP_URL &&
      event.data === 'hello-children'
    ) {
      setConnectedToParentOn()
    }
  }
}

const mapStateToProps = ({ loading, connectedToParent }: IRootState) => ({
  loading,
  connectedToParent
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      setConnectedToParentOn: setConnectedToParentOnAction,
      clearSelectedPokemon: () => setSelectedPokemonAction(null),
      clearPokemonSearch: clearPokemonSearchAction
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(App)
