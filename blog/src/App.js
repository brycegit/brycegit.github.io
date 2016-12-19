import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Nav from './Nav'
import BlogListing from './BlogListing'
import Landing from './Landing'
import Footer from './Footer'

var App = React.createClass({
  getInitialState(){
    return {data : null, page: "posts", category: "All", blogPost: null}
  },
  componentWillMount(){
    if(self.fetch){
      fetch('data.json')
        .then(response => {
          if(response.ok){
          response.json()
            .then(json => {
              this.setState({data : json});
            })
          }else{
            console.log('Network response was not ok.');
          }
        })
        .catch(error => console.log(`Fetch error: ${error}`));
    }else{
      // TO DO: add xhttp req
    }
  },
  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  },
  displayHome(event){
    this.setState({page : "posts", blogPost: null, category: "All"});
  },
  changePage(event){
    if(event.target.textContent != "posts"){
      this.setState({page : event.target.textContent, category: "All", blogPost: null});
    }else{
      this.setState({page : event.target.textContent, category: "All", blogPost: null});
    }
  },
  displayCategory(event){
    this.setState({category: event.target.textContent, page: "posts", blogPost: null});
  },
  displayPost(event){
    let postCategory = this.state.data.posts.reduce((acc, curr) => {
      curr.title == event.target.name ? acc = curr.category : null;
      return acc;
    }, null);
    this.setState({blogPost: event.target.name, page: "posts", category: postCategory});
  },
  render(){
    var links = [];
    var posts = [];
    var categories = [];
    var currentPost = "";
    var content = "";
    for(var page in this.state.data){
      links.push(page);
      if(page == "posts"){
        this.state.data[page].map(post => {
            this.state.category == "All" ? posts.push(post) : post.category == this.state.category ? posts.push(post) : null;
            if(this.state.blogPost == post.title) currentPost = post;
            if(categories.indexOf(post.category) == -1) {
                categories.push(post.category);
            }
          }
        )
      }else{
        if(this.state.page == page)
          content = this.state.data[page].content;
      }
    }
    if(this.state.page == "posts" && this.state.blogPost == null){
      return (
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory} logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <BlogListing category={this.state.category} click={this.displayPost} posts={posts}/>
        <Footer/>
        </div>
      )
    }else if(this.state.blogPost){
      return (
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory}logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <Landing title={this.state.blogPost} content={currentPost.content}>
        <a className="button" onClick={this.displayHome}>View All Posts</a>
        </Landing>
        <Footer/>
        </div>
      )
    }else{
      return(
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory} logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <Landing title={this.state.page} content={content}/>
        <Footer/>
        </div>
      )
    }
  }
});

export default App;
