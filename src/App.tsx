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

const App: React.FC<IHocProps> = ({ loading }) => (
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

const mapStateToProps = ({ loading }: IRootState) => ({
  loading
})

export default connect(mapStateToProps)(App)
