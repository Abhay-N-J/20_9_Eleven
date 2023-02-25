import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import fetch from 'node-fetch';
import Loading from "../Assets/Eclipse-1s-200px.gif";
import NotImage from "../Assets/images.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Styles from '../Login/snackbar.module.css'
import { Component, createRef, PureComponent } from 'react'
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import {Cookies} from 'js-cookie'
// import { getToken } from '../Login/useToken'
// import { Modal } from 'react-bootstrap';


const Axios = axios.create({
  baseURL: `http://localhost:4100`
})
export class CardItem extends Component {

  constructor() 
  {
    super();
    this.state = { 
      time: 0,
      open : false,
    }
    this.snackbarRef = createRef();
  }

  _showSnackbarHandler = (message) => {
    this.snackbarRef.current.openSnackBar(message);
  }

//   componentDidMount() {
//     setInterval(() => {
//       if(this.state.time <= 10) {
//         this.setState({
//           time: this.state.time + 1
//         }) 
//       }
//     }, 1000)
//   }
  
  openModal = () => {
    this.setState({
     open:true
    })
  }

  closeModal = () => {
    this.setState({
      open:false
    })
  }
  
  add = e => {
    let cart = Cookies.get('cart');
    const name = this.props.name;
    if(!cart) {
        const obj = [{'name': name, 'qty': 1}]
        Cookies.set('cart',obj, {expires: 2})
    }
    else {
        for(var i = 0; i < cart.length(); i++) {
            if(cart[i].name === name) {
                cart[i].qty++; 
                return Cookies.set('cart', cart, {expires: 2})
            }
        }
        cart.push({'name': name, 'qty': 1})
        Cookies.set('cart', cart, {expires: 2})
    }
  }

  minus = e => {
    let cart = Cookies.get('cart');
    const name = this.props.name;
    if(!cart) {
        return;
    }
    else {
        for(var i = 0; i < cart.length(); i++) {
            if(cart[i].name === name) {
                cart[i].qty += Number(cart[i].qty) > 0 ? 1 : 0; 
                return Cookies.set('cart', cart, {expires: 2})
            }
        }
    }
  }
//   save = async e => {
//     e.stopPropagation()
//     let {name, image, description} = this.props;
//     // console.log(getToken());
//     // const body = {
//     //   user:getToken().userid,
//     //   title:title,
//     //   url_image:url_image,
//     //   url:url,
//     //   description:description,
//     //   content:content
//     // }
//     // console.log(body);
//     const response = await Axios.post('/save', body, { 
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }      
//     })
//     console.log(response);
//     this._showSnackbarHandler(response.data.error ? response.data.error : response.data.message)

//   }

  cart = e => {
    const cart = Cookies.get('cart')
    for(var i = 0; i < cart.length(); i++) {
        if(cart[i].name === this.props.name) { 
            return cart[i].qty;
        }
    }
  }

  render() {
    let {image, description, name } = this.props;
    // console.log(title);
    return (
          <>
            <Snackbar ref = {this.snackbarRef} />
            <Card className = 'card aling-items-center' onClick={this.openModal}>
              {/* <Card.Img variant="top" src= {url_image} alt = 'Image Not Available' height = '250px'/> */}
              <LazyLoadImage src = {image} width = '330px' height = '250px' alt='Image Not Available'  style={{"marginTop":"10px","borderRadius":"10px",marginLeft:"10px"}}
                        placeholderSrc={ this.state.time <= 10 ? Loading : NotImage } />
              <Card.Body>
                    <Card.Title >{name}</Card.Title>
                    <Card.Text >
                      {description ? description.slice(0,80)+"...":""}
                    </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item >{description }</ListGroup.Item>
                <ListGroup.Item>
                  <div className='row'>
                    {/* <div className='col'>
                      <Button variant="primary" href = {url} target = "_blank" onClick={e => e.stopPropagation()}>Read Full News</Button>
                    </div> */}
                    <div className='col-2'>
                      <Button title='Add to cart' onClick={this.add}>+</Button>
                    </div>
                    <div className='col-2'>
                        {this.cart()}
                    </div>
                    <div className='col-2'>
                      <Button title='Remove from cart' onClick={this.minus}>-</Button>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Modal
              show={this.state.open}
              onHide={this.closeModal}
              keyboard={true} 
              size='lg'
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {name ? name : ""}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                      <ListGroup>
                        <ListGroup.Item>Description: {description ? description : ""}</ListGroup.Item>
                        {/* <ListGroup.Item>Content: {content ? content : ""}</ListGroup.Item> */}
                      </ListGroup>
                {/* <h4>Centered Modal</h4> */}
                {/* <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                  dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                  consectetur ac, vestibulum at eros.
                </p> */}
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="primary" href = {url} target = "_blank">Read Full News</Button> */}
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
         </>
        );    

  }
}

export default CardItem;

class Snackbar extends PureComponent {
  message = ''

  state = {
    isActive: false,
  }

  openSnackBar = (message = 'Something went wrong...') => {
    this.message = message;
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 3000);
    });
  }

  render() {
    const { isActive } = this.state;
    return (
      <div className = {isActive ? [Styles.snackbar, Styles.show].join(" ") : Styles.snackbar}>
        {this.message}
      </div>
    )
  }
}