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


class SignupFormRetail extends React.Component {
    
        render() {
            return (
                <MDBContainer className="my-5 gradient-form">
  
                <MDBRow>
            
                  <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5">
            
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">News Website</h4>
                      </div>
            
                      <form className="shadow-lg rounded p-3 mb-5" >
                          <div className="d-flex justify-content-center">
                            <p>Please sign up to create an account</p>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='User Name' name="user" type='text'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Name' name="name" type='text'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Email address' name="email" type='email'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Location' name="location" type='text'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput label='Password' method='post' wrapperClass='mb-4 w-75' name="passwd"  required type='password'/>
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                          {/* <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</MDBBtn> */}
                            <Button className="mb-4 w-25 gradient-custom-2" type='submit'> Submit </Button>
                            <br/>
                          </div>
                      </form>
            
                      
            
                      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                        <pre className="mb-0">Don't have an account?  </pre>
                        <Button className='mb-4 w-25 gradient-custom-2' color='danger' >
                          Sign Up
                        </Button>
                      </div>
            
                    </div>
            
                  </MDBCol>
            
                  <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4">Signup to Duffers</h4>
                        <p className="small mb-0"></p>
                      </div>
            
                    </div>
            
                  </MDBCol>
            
                </MDBRow>
            
              </MDBContainer>
        );
        }
    }

export default SignupFormRetail;