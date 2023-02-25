import React from "react";
import './signup_retail.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";


class SignupFormUser extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      location: {
        latitude: 0,
        longitude: 0
      },
      address: ''
    };

  }

  updateUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  updateAddress = (event) => {
    this.setState({ address: event.target.value });
  }

  updateEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  getLocation = (event) => {
    // use geolocation api to get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        this.setState({
          location: {
            latitude: latitude,
            longitude: longitude
          }
        })
      })
    }
    else {
      console.log("Geolocation is not supported by this browser.");
    }
  }



  updatePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    this.getLocation(event);
    event.preventDefault();
    console.log(this.state);
    // send data to backend
    const signedupUser = {
      username: this.state.username,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password,
      location: this.state.location
    }
    axios.post("http://localhost:4100/signup", signedupUser)
      .then(response => {

        // alert("User registered");
        window.location = "/login";
      })
      .catch(error => {
        // alert (error);
        alert("Username taken!! Please try again!");
      })
  }



  render() {
    return (
      <MDBContainer className="my-5 gradient-form">

        <MDBRow>

          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

              <div className="text-center">
                <h4 className="mt-1 mb-5 pb-1">Signup</h4>
              </div>

              <form className="shadow-lg rounded p-3 mb-5" >
                <div className="d-flex justify-content-center">
                  <p>Please sign up to create an account</p>
                </div>
                <div className="d-flex justify-content-center">
                  <MDBInput wrapperClass='mb-4 w-75' label='User Name' name="user" onChange = {this.updateUsername} type='text' />
                </div>
                <div className="d-flex justify-content-center">
                  <MDBInput wrapperClass='mb-4 w-75' label='Email address' name="email" onChange={this.updateEmail} type='email' />
                </div>
                <div className="d-flex justify-content-center">
                  <MDBInput label='Password' method='post' wrapperClass='mb-4 w-75' name="passwd" onChange={this.updatePassword} required type='password' />
                </div>
                <div className="d-flex justify-content-center">
                  <MDBInput wrapperClass='mb-4 w-75' label='Address' name="address" onChange={this.updateAddress} type='text' />
                </div>
                <div className="text-center pt-1 mb-5 pb-1">
                  {/* <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</MDBBtn> */}
                  <Button className="mb-4 w-25 gradient-custom-2" type='submit'> Submit </Button>
                  <br />
                </div>
              </form>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <pre className="mb-0">Already have an account</pre>
                <Link to={'/login'} className='mb-4 w-25 gradient-custom-2' color='danger' >
                  Sign in
                </Link>
              </div>

            </div>

          </MDBCol>

          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">Welcome to Duffers</h4>
                <p className="small mb-0"></p>
              </div>

            </div>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
    );
  }
}

export default SignupFormUser;