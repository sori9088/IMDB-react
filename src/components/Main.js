import React from 'react'
import { Card , Spinner, Button  } from 'react-bootstrap';
import Moment from 'react-moment';
import { MDBMask, MDBView } from "mdbreact";

class Main extends React.Component {

    constructor(props) { //React.Component 를 상속한 컴포넌트의 생성자를 구현할때, 
        super(props); // 다른 구문에 앞서 super(props)를 호출해야함
        this.state = {
          movies: [],
          genres : [],
          allMovies :[],
          loading: true,
          hasError: false,
          pageNumber: 1
        }
      }

      getData = async () => {
        const { pageNumber } = this.state;
        const api = process.env.REACT_APP_API;
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api}&sort_by=popularity.desc&language=en-US&primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-12-01&page=${pageNumber}`
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok){
        const movies = data.results;
        const newMovies = this.state.movies.concat(movies);
        
        this.setState({ //받은 데이터를 state에 넣어준다.
        movies: newMovies,
        allMovies: newMovies,
        pageNumber: pageNumber + 1
         })
            console.log(data)
            console.log(pageNumber)
        }
        else{
          alert('Error : 404');
        }
      }

  
      componentDidMount() { // 이 안에서 다른 JavaScript 프레임워크를 연동
        this.getMovies() // 이 클래스 안에있는 getLocation()을 호출
        this.getGenres();
      }
    
      getMovies = () => { //함수 정의
        this.getData(); //이 클래스 안에있는 getData를 호출

      }

      async getGenres() {
        const api = process.env.REACT_APP_API;
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}`
        );
        const { genres } = await response.json();
        this.setState({ genres });
      }
    
      // onClick={() => onClickMovie(item.id)}

      render() {
        if (!this.state.movies)
        return <div className="App App-header" style={{ color: 'white'}}>
         <Spinner animation="border" variant="danger" />
          <h3>loading...</h3>
        </div>
    return ( 
      <div className="App App-header container-fluid">
            <div className="d-flex flex-wrap main justify-content-center">{this.state.movies && this.state.movies.map((item) => 
            <Card className="bg-dark text-white">
            <MDBView hover zoom>
            <img src={`https://image.tmdb.org/t/p/w400/${item.backdrop_path}`} className="img-fluid" alt="Card image" />
            <MDBMask className="d-flex" overlay="black-strong">
            <Card.ImgOverlay className="text-center scroll">
              <Card.Title><h3>{item.title}</h3></Card.Title>
              <Card.Subtitle className="text-muted text-grey"><Moment fromNow>{item.release_date}</Moment></Card.Subtitle>
              <Card.Text style={{fontSize: 15}}>
                  <div className="overview">
                  {item.overview}
                  </div>
              </Card.Text>
              </Card.ImgOverlay>
              </MDBMask>
            </MDBView>  
            {/* <div><Badge variant="danger">{this.state.genres && this.state.genres.map((genre)=>{
              == genre.name})}</Badge>
              </div> */}
          </Card>
          )}
       </div>
            <Button class="d-flex justify-content-center" id="load-more-btn" variant="danger" type="button" onClick={this.getMovies}>
              Load More
            </Button>
    </div>
    )
}
}
export default Main;