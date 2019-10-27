
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Header from './components/Header';
import { Button, Spinner } from 'react-bootstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Modal from 'react-modal';
import YouTube from '@u-wave/react-youtube';


const customStyles = {
    overlay: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: "fixed",
      backgroundColor: "rgba(0, 0, 0, 0.75)"
    },
    content: {
      top: "10%",
      left: "10%",
      right: "10%",
      width: "80%",
      bottom: "10%",
      height: "80%",
      outline: "none",
      padding: "20px",
      overflow: "auto",
      background: "#000",
      borderRadius: "4px",
      position: "absolute",
      border: "1px solid #ccc",
      WebkitOverflowScrolling: "touch"
    }
}


class App extends React.Component {

  constructor(props) { //React.Component 를 상속한 컴포넌트의 생성자를 구현할때, 
    super(props); // 다른 구문에 앞서 super(props)를 호출해야함

    this.state = {
      hasError: false,
      movies: [],
      genres: [],
      allMovies: [],
      pageNumber: 1,
      allGenres: [],
      query:'',
      ratingVal: { min: 0, max: 10 },
      trailers: null,
      key: null,
      isOpen : false,
      disabled : false
    }
    this.upcomingMovies = this.upcomingMovies.bind(this);
  }

  onChanngequery=(value)=>{
    this.setState({query: value})
  }

  getData = async () => {
    let { pageNumber } = this.state;
    const api = process.env.REACT_APP_API;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api}&language=en-US&page=${pageNumber}`
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      const movies = data.results;
      const newMovies = this.state.movies.concat(movies);

      const response = await fetch(
              `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}`
            );
      const { genres } = await response.json();
      this.setState({ genres });

      

      this.setState({ //받은 데이터를 state에 넣어준다.
        movies: newMovies,
        allMovies: newMovies,
        pageNumber: pageNumber + 1
      })

      this.renderGenre(newMovies, genres);
    }
    else {
      alert('Error : 404');
    }

  }


   renderGenre = (movies, genres) => {
    let genre = movies.map((item) => item.genre_ids)

    let filteredG = genre.map(item => {
      let yy = item.map(num => {
        let ff = genres.find(g => g.id == num)
        return ff.name
      })
      return yy
    })
    this.setState({ allGenres: filteredG });

  }




  componentDidMount() { // 이 안에서 다른 JavaScript 프레임워크를 연동
    this.getData() // 이 클래스 안에있는 getLocation()을 호출
  }

  searchData = async (e) => {
    e.preventDefault()
    if(this.state.query === ''){
      this.setState({ movies : this.state.allMovies})
      return
    }

    const filteredMovies = this.state.movies.filter(movie =>{
      if(movie.title.toLowerCase().includes(this.state.query.toLowerCase())) return true
      return false
    })
    
    this.setState({
      movies : filteredMovies,
      pageNumber : 1})
 
  }



  onRatingSliderChange = (val) => {
    const newMovies = this.state.allMovies.filter(movie => {
      const isAboveMinimumRating = movie.vote_average >= val.min
      const isBelowMaximumRating = movie.vote_average <= val.max
      return isAboveMinimumRating && isBelowMaximumRating
    })

    this.setState({
      movies : newMovies,
      ratingVal : val 
  });

  }

  upcomingMovies = async () => {

    await this.setState({ 
      movies : [],
      allMovies : [],
      pageNumber : 1})

    let { pageNumber } = this.state;

    const api = process.env.REACT_APP_API;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api}&language=en-US&page=${pageNumber}`
    const response = await fetch(url);
    const data = await response.json();
    let movies = data.results;
    const newMovies = movies;

    const response1 = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}`
    );
  const { genres } = await response1.json();
  this.setState({ genres });


      this.setState({ //받은 데이터를 state에 넣어준다.
        movies: newMovies,
        allMovies : newMovies,
        pageNumber: pageNumber + 1,
        disabled : true
      });
      this.renderGenre(movies, genres);
  }

  getVideo = async (id) => {
    const api = process.env.REACT_APP_API;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api}&language=en-US`
    );
    const data = await response.json();
    const items = data.results;
    const trailerkey = items[Math.floor(Math.random()*items.length)];
    this.setState({ key: trailerkey.key })
  }

  
  openModal = async (id) => {
    if(!this.state.isOpen) {
      await this.getVideo(id)
    }

    this.setState({ isOpen: !this.state.isOpen })

  }


  render() {

    return (
      <div className="App container-fluid">
           <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.openModal}
            style={customStyles}
            contentLabel="Example Modal"
            id="modal"
          >
            <YouTube
            video={this.state.key}
            autoplay
            width = '100%'
            height = '100%'
            />
          </Modal>

        <nav>
          <Navbar 
          searchData={this.searchData}
          onChanngequery={this.onChanngequery}
          upcomingMovies={this.upcomingMovies}
          />
        </nav>
        <header>
          <Header />
        </header>
        <div className="range container-fluid">
        <InputRange
        maxValue={10}
        minValue={0}
        value={this.state.ratingVal}
        onChange={value => this.onRatingSliderChange(value)} />
        Rating
      </div>
        
        {this.state.movies.length > 0 && <Main
          movies={this.state.movies}
          genres={this.state.genres}
          allMovies={this.state.allMovies}
          allGenres={this.state.allGenres}
          getVideo={this.getVideo}
          trailerkey={this.state.trailerkey}
          openModal={this.openModal}
          isOpen={this.state.isOpen}
        />}
        <Button class="d-flex justify-content-center" id="load-more-btn" variant="danger" type="button" onClick={() => this.getData()} disabled={this.state.disabled}>
          Load More
        </Button>
      </div>
    )
  }
}
export default App;