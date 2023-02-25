import './App.css';
import Navbar from './components/NavBar/Navbar';
import {BrowserRouter,Route,Link,Switch,Routes} from 'react-router-dom';
import ContactUs from './components/contactus/contact';
import CardContainer from './components/Product_consumer/CardContainer';
import LoginForm from './components/Login/login';
import SignupFormRetail from './components/Signup/signup_retail';
import SignupFormUser from './components/Signup/signup_user';
import LoginRetail from './components/Login/login_retail';



const logOut = () => {

}

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
        {/* <Route path="/" exact element={<Homescreen/>} /> */}
        {/* <Route path="/cart" exact element={<Cartscreen/>} /> */}
        {/* <Route path="/signup" exact element={<SignupForm/>} /> */}
        <Route path="/login" exact element={<LoginForm/>} />
        <Route path="/contact" exact element={<ContactUs/>} />
        <Route path="/cards" exact element={<CardContainer/>} />
        {/* <Route path="/logout" exact element={<Logout/>} /> */}
        {/* <Route path="/contact" exact element={<ContactUs/>} /> */}
       {/* <Route path="/order" exact element={<OrderForm/>} /> 
        <Route path="/pay/:amt" exact element={<Pay/>} />
        <Route path="/contact/thank-you" exact element={<ThankYou/>} /> */}
        {/* </Routes> */}
      {/* </BrowserRouter> */}
      {/* <ContactUs></ContactUs> */}
      {/* <LoginRetail></LoginRetail> */}
      {/* <Card></Card> */}
        </Routes>
    </BrowserRouter>
  </div>

  );
}

export default App;