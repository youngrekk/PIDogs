// import { Provider } from "react-redux";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import Navbar from "./components/navbar/NavBar";
import LandingPage from './components/landingpage/LandingPage.jsx';
import Home from "./components/home/Home.jsx"
import CreateDog from "./components/createdog/CreateDog.jsx"


import { DogDetail } from "./components/dogdetail/DogDetail";

function App() {

  // const [currentPage, setCurrentPage] = useState(1);
  // const [dogsPerPage, setDogsPerPage] = useState(8);
  // const paginar = (pageNumber) => setCurrentPage(pageNumber);

  // const perros = useSelector(state =>state.allDogs)
  
  return (
    <Router>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Navbar}/>
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/new-dog" component={CreateDog}/>
      <Route exact path="/home/:dogId" component={DogDetail}/>
    </Router>

  );
}

export default App;
