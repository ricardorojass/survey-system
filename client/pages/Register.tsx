import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import authService from '../services/auth'
import { User } from '../types'

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach((val: string[] )=> val.length > 0 && (valid = false));
  return valid;
};

interface State {
  name?: string,
  email?: string,
  password?: string,
  errors: any
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

class Register extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {
        name: '',
        email: '',
        password: '',
      }
    }
    this.goToLogin = this.goToLogin.bind(this)
  }

  render() {
    const { errors } = this.state
    return (
      <div className="auth-page">
        <div className="flex items-center justify-center w-1/3">
          <div className="w-4/5">
            <form onSubmit={this.register}>
              <h1 className="text-2xl">Sign up</h1>
              <p className="text-sm pb-3">or <a className="text-blue-500 cursor-pointer" onClick={ this.goToLogin }>sign in to your account</a></p>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.updateField}/>
                  {errors.name.length > 0 &&
                    <small className='text-red-700'>{errors.name}</small>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={this.updateField}/>
                  {errors.email.length > 0 &&
                    <small className='text-red-700'>{errors.email}</small>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.updateField} />
                  {errors.password.length > 0 &&
                    <small className='text-red-700'>{errors.password}</small>}
              </div>

              <div className="form-actions">
                <button className="btn btn-primary btn-block" type="submit">Sign up</button>
              </div>
            </form>

          </div>

        </div>
        <div className="w-2/3 landing-pattern"></div>
      </div>
    )
  }

  updateField = (event: InputEvent) => {
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'name':
        errors.name =
          value.length < 5
            ? 'Full Name must be at least 5 characters long!'
            : ''
        break
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!'
        break
      case 'password':
        errors.password =
          value.length < 6
            ? 'Password must be at least 6 characters long!'
            : ''
        break
      default:
        break
    }
    this.setState({ errors, [name]: value })
  }


  register = async (e) => {
    e.preventDefault()
    if (validateForm(this.state.errors)) {
      try {
        const { name, email, password } = this.state

        const data: User = { name, email, password }
        await authService.signup(data)
        // Todo: it needs to handle validation error with response.name === 'ModelValidation'
        this.props.history.push('/surveys')
      } catch (e) {
        if (e.response && e.response.status === 400) {
          const {data} = e.response.data.response
          let errors = this.state.errors
          errors.email = data.email[0].message
          errors.name = data.name[0].message
          this.setState({ errors })
        }

      }
    } else {
      console.log('Invalid form');
    }
  }

  goToLogin(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
}

export default withRouter(Register)