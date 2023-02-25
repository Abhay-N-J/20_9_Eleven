import React from "react";
import './productadd.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";


class ProductAdd extends React.Component {
    
        render() {
            return (
                <MDBContainer className="my-5 gradient-form">
  
                <MDBRow>
            
                  <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5">
            
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Add Product</h4>
                      </div>
            
                      <form className="shadow-lg rounded p-3 mb-5" >
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Name' name="name" type='text'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Quantity' name="quantity" type='number'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Price' name="price" type='number'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Image Link' name="im_link" type='text'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Description' name="desc" type='text'/>
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                          {/* <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</MDBBtn> */}
                            <Button className="mb-4 w-25 gradient-custom-2" type='submit'> Submit </Button>
                            <br/>
                          </div>
                      </form>
            
                    </div>
            
                  </MDBCol>
            
                </MDBRow>
            
              </MDBContainer>
        );
        }
    }

export default ProductAdd;