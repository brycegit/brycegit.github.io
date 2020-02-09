import React from 'react'
import Link from 'gatsby-link'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import letter from './letter.svg'
import './styles.css'

import { rhythm } from '../utils/typography'

const blogTitle = `Bryce Dooley`
const subTitle = 'A blog about software engineering & web development.'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        //   <h1
        //     style={{
        //       ...scale(1.5),
        //       marginBottom: rhythm(1.5),
        //       marginTop: 0,
        //       textAlign: 'center'
        //     }}
        //   >
        //     <Link
        //       style={{
        //         boxShadow: 'none',
        //         textDecoration: 'none',
        //         color: 'inherit',
        //       }}
        //       to={'/'}
        //     >
        //       {blogTitle}
        //     </Link>
        //   </h1>
        <img
          src={letter}
          alt={`B`}
          style={{
            width: rhythm(3),
            height: rhythm(3),
            marginRight: 'auto',
            marginLeft: 'auto',
            display: 'block',
            marginBottom: '2.67rem',
          }}
        />
      )
    } else {
      header = (
        <p
          style={{
            // fontFamily: 'Montserrat, sans-serif',
            // ...scale(.65),
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            <img
              src={letter}
              alt={`B`}
              style={{
                width: rhythm(2),
                height: rhythm(2),
              }}
            />
          </Link>
        </p>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children()}
      </div>
    )
  }
}

export default Template
