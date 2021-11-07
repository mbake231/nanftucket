
import logo from './logo.svg';
import './App.css';
import GoogleApiWrapper from './Map.js';
import Map from './Map.js';
import Details from './Details.js';
import About from './About.jsx';
import MyNav from './MyNav.jsx'
import { Route,Switch,Link } from "react-router-dom";

require('dotenv').config();
function App() {
  return (
    <div className="App">
   
      <MyNav></MyNav>
      
      <Switch>
      <Route path="/" exact component={Map} />
      <Route path="/ack/*" exact component={Details} />
      <Route path="/about" exact component={About} />
        </Switch>
    </div>
  );
}

export default App;
