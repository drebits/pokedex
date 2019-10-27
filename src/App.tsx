import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import './app.scss'
import PokemonsList from './components/PokemonsList'
import Screen from './components/Screen'
import FakeButtons from './components/FakeButtons'

const App: React.FC = () => (
  <Container maxWidth="md" className="pokedex">
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FakeButtons />
        <Screen />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PokemonsList />
      </Grid>
    </Grid>
  </Container>
)

export default App
