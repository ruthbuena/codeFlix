import React from 'react';
import Logo from './Logo.js';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// var Input = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="Input">
// 				<input
// 					id={this.props.id}
// 					autoComplete="false"
// 					required
// 					type={this.props.type}
// 					placeholder={this.props.placeholder}
// 				/>
// 				<label htmlFor={this.props.id}></label>
// 			</div>
// 		);
// 	}
// });
//
// var Modal = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="Modal">
// 				<form
// 					onSubmit={this.props.onSubmit}
// 					className="ModalForm">
// 					<Input
// 						id="name"
// 						type="text"
// 						placeholder="Jack-Edward Oliver" />
// 					<Input
// 						id="username"
// 						type="email"
// 						placeholder="mrjackolai@gmail.com" />
// 					<Input
// 						id="password"
// 						type="password"
// 						placeholder="password" />
// 					<button>
// 						Log in <i className="fa fa-fw fa-chevron-right"></i>
// 					</button>
// 				</form>
// 			</div>
// 		);
// 	}
// });

// Container
var App = React.createClass({
  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function() {
    return {searchTerm:"", searchUrl:""};
  },
  handleKeyUp :function(e){
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      var searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=" + this.apiKey;
      this.setState({searchUrl:searchUrl});
    }
  },

  handleChange : function(e){
      this.setState({searchTerm : e.target.value});
  },
  render: function() {
  //   var child;
	//
  // 		if(this.state.mounted) {
  // 			child = (<Modal onSubmit={this.handleSubmit} />);
  // 		}
	//
  // 		return(
  // 			<div className="App">
  // 				<ReactCSSTransitionGroup
  // 					transitionName="example"
  // 					transitionEnterTimeout={500}
  // 					transitionLeaveTimeout={300}>
  // 						{child}
  // 				</ReactCSSTransitionGroup>
  // 			</div>
  // 		);

    return (
      <div>
        <header className="Header">
          <Logo />
          <Navigation />
          <div id="search" className="Search">
            <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} type="search" placeholder="Search for a title..." value={this.state.searchTerm}/>
          </div>
          <UserProfile />
        </header>
        <Hero />
        <TitleList title="Search Results" url={this.state.searchUrl} />
        <TitleList title="Top TV picks for User" url='discover/tv?sort_by=popularity.desc&page=1' />
        <TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1' />
        <TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1' />
        <TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' />
        <TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' />
      </div>
    );
  }
});


// Navigation
var Navigation = React.createClass({
  render: function() {
    return (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>Browse</li>
            <li>My list</li>
            <li>Top picks</li>
            <li>Recent</li>
          </ul>
        </nav>
      </div>
    );
  }
});

// User Profile
var UserProfile = React.createClass({
  render: function() {
    return (
      <div className="UserProfile">
        <div className="User">
          <div className="name">Jack Oliver</div>
          <div className="image"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/profile/profile-512_1.jpg" alt="profile" /></div>
        </div>
      </div>
    );
  }
});


// Hero //


var Hero = React.createClass({
  render: function() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)'}}>
        <div className="content">
          <img className="logo" src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fslamdata.com%2Fwp-content%2Fuploads%2F2017%2F03%2Ftrilogy.png&imgrefurl=https%3A%2F%2Fslamdata.com%2Fthe-team%2Fcustomers%2F&docid=paASsYmrTYJyOM&tbnid=IkFVO1WPv1ScoM%3A&vet=10ahUKEwiqo93sh9rWAhXl64MKHfJ6DtQQMwgtKAYwBg..i&w=400&h=180&bih=711&biw=1440&q=trilogy%20education%20services&ved=0ahUKEwiqo93sh9rWAhXl64MKHfJ6DtQQMwgtKAYwBg&iact=mrc&uact=8" alt="narcos background" />
          <h2>Season 2 now available</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
          <div className="button-wrapper">
            <HeroButton primary={true} text="Watch now" />
            <HeroButton primary={false} text="+ My list" />
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
})

// Hero Button
var HeroButton = React.createClass({
  render: function() {
    return (
      <a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
    );
  }
})


// Title List Container

var TitleList = React.createClass({

  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function() {
    return {data: [], mounted: false};
  },
  loadContent: function() {
    var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;
    fetch(requestUrl).then((response)=>{
        return response.json();
    }).then((data)=>{
        this.setState({data : data});
    }).catch((err)=>{
        console.log("There has been an error");
    });
  },
  componentWillReceiveProps : function(nextProps){
    if(nextProps.url !== this.props.url && nextProps.url !== ''){
      this.setState({mounted:true,url:nextProps.url},()=>{
        this.loadContent();
      });

    }
  },
  componentDidMount: function() {
    if(this.props.url !== ''){
      this.loadContent();
      this.setState({mounted:true});
    }

  },
  render: function() {
    var titles ='';
    if(this.state.data.results) {
      titles = this.state.data.results.map(function(title, i) {
        if(i < 5) {
          var name = '';
          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if(!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <Item key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
          );

        }else{
          return (<div key={title.id}></div>);
        }
      });

    }

    return (
      <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">
            {titles}
          </div>
        </div>
      </div>
    );
  }
});

// Title List Item
var Item = React.createClass({
  render: function() {
    return (
      <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
          <ListToggle />
        </div>
      </div>
    );
  }
});

// ListToggle
var ListToggle = React.createClass({
  getInitialState: function() {
    return({ toggled: false })
  },
  handleClick: function() {
    if(this.state.toggled === true) {
      this.setState({ toggled: false });
    } else {
      this.setState({ toggled: true });
    }

  },
  render: function() {
    return (
      <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
        <div>
          <i className="fa fa-fw fa-plus"></i>
          <i className="fa fa-fw fa-check"></i>
        </div>
      </div>
    );
  }
});


export default App;
