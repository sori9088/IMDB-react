import React from 'react'
import { Card , Spinner, Carousel } from 'react-bootstrap';
import Moment from 'react-moment';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";

class Main extends React.Component {

    constructor(props) { //React.Component 를 상속한 컴포넌트의 생성자를 구현할때, 
        super(props); // 다른 구문에 앞서 super(props)를 호출해야함
        console.log(props)
        this.state = {
          movies: props.data, //초기값 설정
          loading: true,
          hasError: false,
        }
      }

      getData = async () => {
        const today =  new Date();
        const api = process.env.REACT_APP_API;
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api}&sort_by=popularity.desc&language=en-US&primary_release_date.gte=2019-07-15&primary_release_date.lte=2019-12-01&page=1`
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok){
        this.setState({ //받은 데이터를 state에 넣어준다.
          movies: data // weather : null <-- data
         })
            console.log(data)
        }
        else{
          alert('Error : 404');
        }
      }

  
      componentDidMount() { // 이 안에서 다른 JavaScript 프레임워크를 연동
        this.getMovies() // 이 클래스 안에있는 getLocation()을 호출
      }
    
      getMovies = () => { //함수 정의
        this.getData(); //이 클래스 안에있는 getData를 호출
      }

    
      // onClick={() => onClickMovie(item.id)}

      render() {
        // let bytes = this.state.movies.results.map((item)=> item.overview);

        if (!this.state.movies)
        return <div className="App App-header" style={{ color: 'white'}}>
         <Spinner animation="border" variant="danger" />
          <h3>loading...</h3>
        </div>
    return (
            <div className="d-flex flex-wrap main justify-content-center">{this.state.movies && this.state.movies.results.map((item) => 
            <Card className="bg-dark text-white">
            <MDBView hover={true} zoom={true}>
            <img src={`https://image.tmdb.org/t/p/w400/${item.backdrop_path}`} className="img-fluid" alt="Card image" />
            <MDBMask className="d-flex" overlay="black-strong">
            <Card.ImgOverlay className="text-center">
              <Card.Title><h3>{item.title}</h3></Card.Title>
              <Card.Text className="text-grey" style={{fontSize : 20}}><Moment fromNow>{item.release_date}</Moment></Card.Text>
              <Card.Text style={{fontSize: 15}}>
                  <div className="overview">
                  {item.overview}
                  </div>
              </Card.Text>
              </Card.ImgOverlay>
              </MDBMask>
            </MDBView>  
          </Card>
          )}</div>
    )
}
}
export default Main;