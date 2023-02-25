import {Component} from "react";
import CardItem from "./CardItem";
import { Badge, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
// import PropTypes from 'prop-types'

const Axios = axios.create({
    baseURL: `http://localhost:4100`
  })


class CardContainer extends Component
{
    constructor()
    {
        super()
        this.state = {
            isLoaded : false,
            items: [],
            error:false,
            message:'',
            latitude:'',
            longitude:''
        }
    }
    

    apiCall = async () => {
        this.setState({
            isLoaded: false
        })
        const body = Axios.get('/products/' + this.state.latitude + '/' + this.state.longitude);
        return body;
    }

    async componentDidMount()
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setState({
                    latitude: latitude,
                    longitude: longitude
                },async () => {
                    let body = await this.apiCall();
                    this.setState({
                        isLoaded: true,
                        items:body?.data,
                        error:body?.succes,
                        message:body?.message
                    }) 
                })
            });
        }
        
        // console.log(body);
        
    }

    // prevPage = async () => {
    //     let body = await this.apiCall(-1);
    //     this.setState({
    //         page:this.state.page - 1,
    //         isLoaded: true,
    //         items:body?.data?.body?.articles,
    //     }) 
    //     // console.log(body.data.articles);
    // }

    // nextPage = async () => {
    //     let body = await this.apiCall(+1);
    //     this.setState({
    //         page:this.state.page + 1,
    //         isLoaded: true,
    //         items:body?.data?.body?.articles,
    //     })
    //     // console.log(body.data.articles);
    // }

    render()
    {
        if(this.state.error === false) {
            return this.state.error
        }
        return(
            <div className="container pt-5">
                <h1>
                    {/* <div hidden={this.state.totalPages !== 0}>
                        <Badge>Country is wrong</Badge> 
                    </div> */}
                    
                </h1>
                <br/>
                <div className="row d-flex justify-content-around wrapper">
                {this.state.isLoaded ? this.state.items.map((ele) => {
                        return Number(ele.qty) > 0 ? (
                            <div className="col-md-4" key = {ele.name} style = {{ paddingBottom: '40px'}}>
                                <CardItem 
                                    image = {ele.image_link}
                                    name = {ele.name}
                                    description = {ele.description}
                                    price = {ele.price}
                                /> 
                            </div>
                        ) : ""
                    }) : <div className="d-flex justify-content-around">
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                Loading...
                            </Button>
                    </div>
                    }
                </div>
                {/* <div className = 'd-flex justify-content-around '>
                    <Button disabled = {this.state.page <= 1} variant="dark" onClick={this.prevPage}>&larr; Previous</Button> 
                    <Button disabled = {this.state.page >= this.state.totalPages } variant="dark" onClick={this.nextPage}>Next &rarr;</Button> 
                </div> */}
            </div>
        )
    }
}

export default CardContainer