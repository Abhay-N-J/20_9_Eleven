import './App.css';
import Navbar from './components/NavBar/Navbar';
import { Component } from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Routes} from 'react-router-dom';
import ContactUs from './components/contactus/contact';
import CardContainer from './components/Product_consumer/CardContainer';
import Login from './components/Login/login';
import SignupFormRetail from './components/Signup/signup_retail';
import SignupFormUser from './components/Signup/signup_user';
import LoginRetail from './components/Login/login_retail';
import Home from './components/Home'

export class App extends Component {
  constructor() {
    super();
      this.state = {
          token:sessionStorage.getToken('token'),
      }
    // console.log(getToken());
  }

  setToken = userToken => {
    sessionStorage.setItem('token',userToken.token)
    sessionStorage.setItem('id',userToken.id)
  }

  handleToken = userToken => {
    this.setToken(userToken);
    this.setState({
      token:this.sessionStorage.getItem('token')
    })
  }

  logOut = () => {
    sessionStorage.clear()
    this.setState({
      token:false
    })
  }


  render() {
    if(!this.state.token) {
      return (
          <Router>
            <Navbar logOut = {this.logOut} />
            <Routes>
              <Route exact path = '/' element = {<Home/>} />
              <Route exact path = '/retail/signup' element = {<SignupFormRetail/>} />
              <Route exact path = '/signup' element = {<SignupFormUser/>} />
              {['cards','login'].map(path => <Route key={path} path={path} element={<Login setToken = {this.handleToken}/>} ></Route>)}
              {/* <Route path = '/(login|head|collection|sources|login|everythin|memes)/' element = {<Login setToken = {this.handleToken}/> } /> */}
            </Routes>
          </Router>
      )

    }
    if(this.state.token === 1) 
      return (
        <Router>
              <Navbar logOut = {this.logOut} />
              {/* <div style={{marginTop:'40px'}}>

              <SideBar/>
              </div> */}
        {/* <StyledLink to='/'>Home</StyledLink>
        <StyledLink to='/Comp'>Component</StyledLink> */}
              <Routes>
                    <Route exact path = '/retail/signup' element = {<SignupFormRetail/>} />
                    <Route exact path = '/' element = {<Home/>} />
                    <Route exact path = '/signup' element = {<SignupFormUser/>} />
                    <Route exact path = '/login' element = {<Login setToken = {this.handleToken}/>} />
                    <Route exact path = '/retail/login' element = {<LoginRetail setToken = {this.handleToken}/>} />
                    <Route exact path = '/contact' element = {<ContactUs/>} />
                    <Route exact path = '/cards' element = {<CardContainer/>} />
                    {/* <Route exact path = '/everything' element = {<NewsContainer key = {this.state.query} type='everything' q = {this.state.query} onQuery = {this.onQuery} />} />
                    <Route exact path = '/head' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'general' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/business' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'business' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/tech' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'technology' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/entertainment' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'entertainment' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/sports' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'sports' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/health' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'health' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/sci' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'science' onQuery = {this.onQuery} />} /> */}
              </Routes> 
        </Router>
      )
      else 
          return (
            <Router>
                <Navbar logOut = {this.logOut} />
                {/* <div style={{marginTop:'40px'}}>

                <SideBar/>
                </div> */}
          {/* <StyledLink to='/'>Home</StyledLink>
          <StyledLink to='/Comp'>Component</StyledLink> */}
                <Routes>
                      <Route exact path = '/retail/signup' element = {<SignupFormRetail/>} />
                      <Route exact path = '/' element = {<Home/>} />
                      <Route exact path = '/signup' element = {<SignupFormUser/>} />
                      <Route exact path = '/retail/login' element = {<LoginRetail setToken = {this.handleToken}/>} />
                      <Route exact path = '/login' element = {<Login setToken = {this.handleToken}/>} />
                      <Route exact path = '/contact' element = {<ContactUs/>} />
                      <Route exact path = '/cards' element = {<CardContainer/>} />
                </Routes> 
          </Router>
          )
      
  }
}