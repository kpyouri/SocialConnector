import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const currentUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(currentUser);


  }

componentWillReceiveProps(nextProps){
  if (nextProps.auth.isAuthenticated){
    this.props.history.push('/dashboard');
  }
  if (nextProps.errors){
    this.setState({errors: nextProps.errors});
  }
} 



  render() {
    const {errors} = this.state;

    return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email} )} placeholder="Email Address" name="email"
                value={this.state.email} 
                onChange={this.onChange}/>
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password} )} placeholder="Password" name="password"
                value = {this.state.password}
                onChange={this.onChange} />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);
