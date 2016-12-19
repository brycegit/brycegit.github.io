import React from 'react';

var Nav = React.createClass({
  propTypes: {
    logo: React.PropTypes.string,
    links: React.PropTypes.array,
    categories: React.PropTypes.array,
    page: React.PropTypes.string,
    category: React.PropTypes.string
  },
  render(){
    var title = this.props.logo;
    var links = this.props.links.map((link, i) => {
      return <li key={i}><a onClick={this.props.pageClick} className={this.props.page == link ? "nav_links-active" : null}>{link}</a></li>
    });
    var categories = this.props.categories.map((cat, i) => {
      if(this.props.categories.indexOf(cat) == this.props.categories.length - 1){
        return <a key={i}><span onClick={this.props.categoryClick} className={this.props.category == cat ? "cat_links-active" : null}>{cat}</span></a>
      }else{
        return <a key={i}><span onClick={this.props.categoryClick} className={this.props.category == cat ? "cat_links-active" : null}>{cat}</span>, </a>
      }
    });
    if (categories.length > 0) {
      categories.unshift("[ ");
      categories.push(" ]");
    }
    return (
      <nav className="row">
            <div className="nav_logo"><div className={"hero_h1"}><a onClick={this.props.home}> {title} : </a></div><span className="nav_sublogo"><p>{categories}</p></span></div>
          <div className="nav_links">
            <ul>
              {links}
            </ul>
          </div>

      </nav>
    )
  }
});

export default Nav
