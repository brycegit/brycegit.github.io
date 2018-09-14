import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm, scale } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          marginBottom: rhythm(2.5),
          display: 'flex'
        }}
      >
        <img
          src={profilePic}
          alt={`Bryce Dooley`}
          style={{
            marginRight: rhythm(.5),
            // marginLeft: 'auto',
            width: rhythm(2),
            height: rhythm(2),
            // display: 'block',
            borderRadius: 100
          }}
        />
        <p
          style={{
            // textAlign: 'center'
            // ...scale(-.15),
          }}
        >
          A blog by <strong>Bryce Dooley</strong> &mdash;  
          a Software Engineer, Dad, Husband, and Professional Power Napper
          &mdash; based out of Boston, MA.
        </p>
      </div>
    )
  }
}

export default Bio
