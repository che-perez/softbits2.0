import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';

import Auth from './modules/Auth';

import Nav from './components/Nav';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Controller from './components/Controller';


class App extends Component {
	constructor() {
		super();
		this.state = {
			auth: Auth.isUserAuthenticated(),
			kiosk: {},
			
		};
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
	}
	
	handleLoginSubmit(e, data) {
		e.preventDefault();
		fetch('/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => res.json())
		.then(res => {
			Auth.authenticateToken(res.token);
			this.setState({
				auth: Auth.isUserAuthenticated(),
			});
		}).catch(err => {
			console.log(err);
		})
	}
	
	handleRegisterSubmit(e, data) {
		e.preventDefault();
		fetch('/users', {
			method: 'POST',
			body: JSON.stringify({
				user: data,
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => res.json())
		 .then(res => {
			 Auth.authenticateToken(res.token);
			 this.setState({
				 auth: Auth.isUserAuthenticated(),
			 });
		 }).catch(err => {
			 console.log(err);
		 })
		
	}
	
	
  render() {
    return (
	    <Router>
      <div className="App">
      <h1>softBits</h1>
      <Nav />
      <Route exact path="/register" render={() => (this.state.auth) 
	      ? <Redirect to="/profile" />
	      	: <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit} /> } />
	  <Route exact path="/login" render={() => (this.state.auth)
		  ? <Redirect to="/profile" />
		  : <LoginForm handleLoginSubmit={this.handleLoginSubmit} /> } />
	  <Route exact path="/profile" render={() => (this.state.auth)
		  ? <Controller currentPage="profile" />
		  : <Redirect to="/login" /> } />
	  <Route exact path="/kiosks/:id" render={props => 
	  				(<Controller currentPage="kiosk" 
	  					currentId={props.match.params.id} />)} />
	  <Route exact path="/new" 
	  		render={() => (<Controller currentPage="new" />)} />
	  <Route exact path="/kiosks/:id/edit"
              render={props => (<Controller
                currentPage="edit" currentId={props.match.params.id} />)}
            />
	  
      </div>
      </Router>
    );
  }
}

export default App;
