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
          display: 'flex',
        }}
      >
        <img
          src={profilePic}
          alt={`Bryce Dooley`}
          style={{
            marginRight: rhythm(0.5),
            // marginLeft: 'auto',
            width: rhythm(2),
            height: rhythm(2),
            // display: 'block',
            borderRadius: 100,
          }}
        />
        <p
          style={
            {
              // textAlign: 'center'
              // ...scale(-.15),
            }
          }
        >
          A blog by <strong>Bryce Dooley</strong> &mdash; a Software Engineer,
          Dad, Husband, and Productivity Nerd &mdash; based out of Boston, MA.
          {/* <a>Subscribe</a> if you like JavaScript, React, Node, or Puppies. */}
          {/* A blog by <strong>Bryce Dooley</strong> &mdash; a full stack developer
          trying to get the most done in the shortest amount of time &mdash;{' '}
          <a>follow me</a> as I learn things. */}
        </p>
      </div>
    )
  }
}

export default Bio
