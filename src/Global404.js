import React from 'react';

var Global404 = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.string
  },
  render(){
    return(
      <div className="row">
        <div className="box-100">
          <h1>404 Page Not Found</h1>
          <h2>Redirecting to home...</h2>
        </div>
        <meta httpEquiv="refresh" content="0;URL='/'"></meta>
      </div>
    )
  }
});

export default Global404
