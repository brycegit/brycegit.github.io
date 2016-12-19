import React from 'react';

var BlogListing = React.createClass({
  propTypes: {
    posts: React.PropTypes.array
  },
  render(){
    var posts = this.props.posts.map((item, i) => {
      var postClass = "box-50";
      var rowClass = "row";
      this.props.posts.length % 2 != 0 && i == this.props.posts.length - 1 ? postClass = "box-100" :  null;
      return (
        <div key={i} className={postClass}>
          <h2>{item.title}</h2>
          <div dangerouslySetInnerHTML={ {__html: item.teaser} }></div>
          <a name={item.title} onClick={this.props.click} className="button">Read Post</a>
        </div>
      )
      });
    return (
      <div className="row">
        <h1>{this.props.category} Posts</h1>
        {posts}
      </div>
    )
  }
});

export default BlogListing
