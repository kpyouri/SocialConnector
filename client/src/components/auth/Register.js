import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '', 
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

    //this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    }


    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


  render() {
    return (
<div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <Link className="nav-link" to="/register">Sign Up</Link>
          <p className="lead text-center">Create your DevConnector account</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Name" name="name"
              value={this.state.name} 
              onChange={this.onChange.bind(this)} 
               />
               
            </div>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email"
              value={this.state.email} 
              onChange={this.onChange.bind(this)}  />
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" 
              value={this.state.password}
              onChange={this.onChange.bind(this)}  />
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2"
              value={this.state.password2}
              onChange={this.onChange.bind(this)}   />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

export default Register;