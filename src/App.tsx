import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'

import './app.scss'
import PokemonsList from './components/PokemonsList'
import Screen from './components/Screen'
import FakeButtons from './components/FakeButtons'
import Loader from './components/Loader'
import PokemonData from './components/PokemonData'
import { IRootState } from './reducers'

interface IHocProps {
  loading: IRootState['loading']
}

interface IAppState {
  connectedToParent: boolean
}

const CONTAINER_APP_URL = 'http://localhost:3001'

class App extends React.Component<IHocProps, IAppState> {
  constructor(props: IHocProps) {
    super(props)

    this.state = {
      connectedToParent: false
    }
  }

  public componentDidMount() {
    const parentWindow = window.parent
    window.addEventListener('message', this.receiveMessage)

    parentWindow.postMessage('hello-parent', CONTAINER_APP_URL)
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
    const { connectedToParent } = this.state

    if (
      !connectedToParent &&
      event.origin === CONTAINER_APP_URL &&
      event.data === 'hello-children'
    ) {
      if (event.source) {
        // @ts-ignore
        event.source.postMessage('hello-parent', event.origin)
      }
      this.setState({ connectedToParent: true })
    }
  }
}

const mapStateToProps = ({ loading }: IRootState) => ({
  loading
})

export default connect(mapStateToProps)(App)
