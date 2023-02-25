import './App.css';
import Navbar from './components/NavBar/Navbar';
import LoginForm from './components/Login/login';
function App() {
  return (
    <div className="App">  
      <Navbar></Navbar>
      <LoginForm></LoginForm>
    </div>
  );
}

export default App;
