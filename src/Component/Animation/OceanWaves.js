import React from 'react'
import Wave from 'react-wavify'

const OceanWaves = ({paused,fill,options}) => (
  <Wave fill={fill}
        paused={paused}
        style={{ display: 'flex' }}

        options={{ height:50,
          amplitude: 80,
          speed: 0.15,
          points: 3}}
        
  />
)

export default OceanWaves;