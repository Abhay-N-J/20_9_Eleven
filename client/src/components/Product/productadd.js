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
import axios from "axios";

const Axios = axios.create({
  baseURL: 'http://localhost:4100'
})
class ProductAdd extends React.Component {
    
        constructor() {
          super();
          this.state({
            name:'',
            qty:'',
            price:'',
            image:'',
            description:''
          })
        }
        onChange = e => {
          if(e.target.name === 'name')
            this.setState({name:e.target.value})
          else if(e.target.name === 'quantity')
            this.setState({qty:e.target.value})
          else if(e.target.name === 'price')
            this.setState({price:e.target.value})
          else if(e.target.name === 'im_link')
            this.setState({image:e.target.value})
          else 
            this.setState({description:e.target.value})

        }

        onSubmit = e => {
          Axios.put('/retailer/add-item', 
            { name:this.state.name,
              qty:this.state.qty,
              price:this.state.price,
              image:this.state.image,
              shop_id:sessionStorage.getItem('id'),
              shop_name:sessionStorage.getItem('shop_name'),
              description:this.state.description })
            window.location = '/retail/card'
        }

        render() {
            return (
                <MDBContainer className="my-5 gradient-form">
  
                <MDBRow>
            
                  <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5">
            
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Add Product</h4>
                      </div>
            
                      <form className="shadow-lg rounded p-3 mb-5" onSubmit={this.onSubmit} >
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Name' onChange={this.onChange} name="name" type='text'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Quantity' onChange={this.onChange} name="quantity" type='number'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Price' onChange={this.onChange} name="price" type='number'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Image Link' onChange={this.onChange} name="im_link" type='text'/>
                          </div>
                          <div className="d-flex justify-content-center">
                            <MDBInput wrapperClass='mb-4 w-75' label='Description' onChange={this.onChange} name="desc" type='text'/>
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