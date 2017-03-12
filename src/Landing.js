import React from 'react';

var Landing = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.string
  },
  render(){
    return(
      <div className="row">
        <div className="box-100">
          <h1>{this.props.title}</h1>
          <div className="content" dangerouslySetInnerHTML={ {__html: this.props.content} }></div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

export default Landing
