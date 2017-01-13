import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Nav from './Nav';
import BlogListing from './BlogListing';
import Landing from './Landing';
import Footer from './Footer';
import Global404 from './Global404';
//TO DO - set up routing; recreate static components with const; use {...obj} if possible; configure sass properly; import json properly(axios); use map within interpolation where possible (vs adding items to variable and usng variable) & don't use index as key; refactor nav in app so there aren't 3 versions; serverside rendering; refactor clicks to use prop syntax; add pushState
var App = React.createClass({
  getInitialState(){
    return {data : null, page: "posts", category: "All", blogPost: null}
  },
  componentDidMount(){
    if(self.fetch){
      fetch('/data.json')
        .then(response => {
          if(response.ok){
          response.json()
            .then(json => {
              this.setState({data : json});
              root.classList.remove('hide');
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

    //404 redirect
    if (this.state.data != null) {
      if(this.props.params.category){
        var doesCatExists = this.state.data.posts.reduce((acc, curr) => {
          curr.category === this.props.params.category ? acc = true : null;
          return acc;
        }, false);
        if(doesCatExists === false){
          // this.state.page = '404';
          return <Global404/>;
        }
      }
    }
    if (this.state.data != null) {
      if(this.props.params.postTitle){
        var doesCatExists = this.state.data.posts.reduce((acc, curr) => {
          curr.title === this.props.params.postTitle ? acc = true : null;
          return acc;
        }, false);
        if(doesCatExists === false){
          return <Global404/>;
        }
      }
    }

    //sets page via url
    this.props.route.page ? this.state.page = this.props.route.page : null;

    //sets category via url
    this.props.route.category ? this.state.category = this.props.route.category : null;

    // sets cat via url
    this.props.params.category ? this.state.category = this.props.params.category : null;

    // sets post via url
    this.props.params.postTitle ? this.state.blogPost = this.props.params.postTitle : null;

    for(var page in this.state.data){
      links.push(page);
      if(page == "posts"){
        this.state.data[page].map(post => {
            if(this.state.category == "All"){
              posts.push(post);
              this.state.blogPost = null;
            }else{
              post.category == this.state.category ? posts.push(post) : null;
            }
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
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory} links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <BlogListing category={this.state.category} click={this.displayPost} posts={posts}/>
        <Footer/>
        </div>
      )

    }else if(this.state.blogPost){
      return (
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory} links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <Landing title={this.state.blogPost} content={currentPost.content}>
        <Link to={"/posts"} className="button" onClick={this.displayHome}>View All Posts</Link>
        </Landing>
        <Footer/>
        </div>
      )
    }else{
      return(
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory} links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <Landing title={this.state.page} content={content}/>
        <Footer/>
        </div>
      )
    }
  }
});

export default App;
