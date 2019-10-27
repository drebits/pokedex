import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import './styles.scss'

const Loader = () => (
  <div className="loader">
    <div className="content">
      <CircularProgress />
      <div className="text">{'Loading...'}</div>
    </div>
  </div>
)

export default Loader
