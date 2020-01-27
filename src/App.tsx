import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { Action, Dispatch, bindActionCreators } from 'redux'

import './app.scss'
import PokemonsList from './components/PokemonsList'
import Screen from './components/Screen'
import FakeButtons from './components/FakeButtons'
import Loader from './components/Loader'
import PokemonData from './components/PokemonData'
import { IRootState } from './reducers'
import { setConnectedToParentOnAction } from './actions'

interface IHocProps {
  loading: IRootState['loading']
  connectedToParent: IRootState['connectedToParent']
  setConnectedToParentOn: () => void
}

export const CONTAINER_APP_URL = 'http://localhost:3001'

class App extends React.Component<IHocProps> {
  public componentDidMount() {
    const isAppInsideIFrame: boolean =
      window.location !== window.parent.location

    if (isAppInsideIFrame) {
      window.addEventListener('message', this.receiveMessage)
      window.parent.postMessage('hello-parent', CONTAINER_APP_URL)
    }
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
    const { connectedToParent, setConnectedToParentOn } = this.props

    if (
      !connectedToParent &&
      event.origin === CONTAINER_APP_URL &&
      event.data === 'hello-children'
    ) {
      if (event.source) {
        // @ts-ignore
        event.source.postMessage('hello-parent', event.origin)
      }
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
      setConnectedToParentOn: setConnectedToParentOnAction
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(App)
