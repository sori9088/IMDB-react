
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Header from './components/Header';
import { Button } from 'react-bootstrap';



// - total
// - genre
// 4. footer
// -pagination
// 5. 


class App extends React.Component {
  constructor(props) { //React.Component 를 상속한 컴포넌트의 생성자를 구현할때, 
    super(props); // 다른 구문에 앞서 super(props)를 호출해야함
    this.state = {
      movies: [],
      genres: [],
      allMovies: [],
      pageNumber: 1,
      allGenres: [],
      query:''
    }
  }
  onChanngequery=(value)=>{
    this.setState({query: value})
  }

  getData = async () => {
    const { pageNumber } = this.state;
    const api = process.env.REACT_APP_API;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api}&language=en-US&page=${pageNumber}`
    const response = await fetch(url);
    const data = await response.json();
    console.log('hansol la', response.ok)
    if (response.ok) {
      const movies = data.results;
      const newMovies = this.state.movies.concat(movies);

      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}`
      );
      const { genres } = await response.json();
      this.setState({ genres });
      this.renderGenre(newMovies, genres);

      this.setState({ //받은 데이터를 state에 넣어준다.
        movies: newMovies,
        allMovies: newMovies,
        pageNumber: pageNumber + 1
      })

    }
    else {
      alert('Error : 404');
    }
    console.log('app.js', this.state.movies)

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
    console.log("filteredG", filteredG);
    this.setState({ allGenres: filteredG });

  }



  componentDidMount() { // 이 안에서 다른 JavaScript 프레임워크를 연동
    this.getData() // 이 클래스 안에있는 getLocation()을 호출
  }
  searchData = (e) => {
    e.preventDefault()
    
    //useState 선언해주고 입력한 쿼리값을 새로운 키우ㅓ드 변수에 입력 (set)
    //api search 엔드포인터 새로 받고 

    //로이방식
    //쿼리값으 ㄹ키워드에 넣어주고
    //filter 
    console.log('asjhfkjashdfshakfdkf')
  }



  render() {
    console.log('eleek', this.state.query)
    return (
      <div className="App container-fluid">

        <nav>
          <Navbar 
          searchData={this.searchData}
          onChanngequery={this.onChanngequery}
          />
        </nav>
        <header>
          <Header />
        </header>
        {this.state.movies.length > 0 && <Main
          movies={this.state.movies}
          genres={this.state.genres}
          allMovies={this.state.allMovies}
          allGenres={this.state.allGenres}

        />}
        <Button class="d-flex justify-content-center" id="load-more-btn" variant="danger" type="button" onClick={() => this.getData()}>
          Load More
        </Button>
      </div>
    )
  }
}
export default App;