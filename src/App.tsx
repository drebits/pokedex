import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import './app.scss'
import PokemonsList from './components/PokemonsList'
import Screen from './components/Screen'

const App: React.FC = () => (
  <Container maxWidth="md" className="pokedex">
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <div className="buttons-container">
          <span className="button main" />
          <span className="button red" />
          <span className="button yellow" />
          <span className="button green" />
        </div>
        <Screen />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PokemonsList />
      </Grid>
    </Grid>
  </Container>
)

export default App
