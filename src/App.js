  
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Header from './components/Header';
import LoadMore from "./components/LoadMore";
import { Carousel } from 'react-bootstrap';


// - total
// - genre
// 4. footer
// -pagination
// 5. 


class App extends React.Component {

  
  Update = (event) => {
    window.location.reload(false);
  }

  
  render() {
    

    return (
      <div className="App container-fluid">
        <nav>
          <Navbar />
        </nav>
        <header>
          <Header />
        </header>
        <div className="App App-header container-fluid">
            <Main alt="First slide" />
          </div>
          <LoadMore />
        </div>
      
        )
    }
  }
export default App;