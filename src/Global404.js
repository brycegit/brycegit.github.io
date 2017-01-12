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
        </div>
      </div>
    )
  }
});

export default Global404
