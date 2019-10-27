import React from 'react'
import { Card, Spinner, Badge } from 'react-bootstrap';
import Moment from 'react-moment';
import { MDBMask, MDBView, MDBCloseIcon } from "mdbreact";


class Main extends React.Component {

  constructor(props) { //React.Component 를 상속한 컴포넌트의 생성자를 구현할때, 
    super(props); // 다른 구문에 앞서 super(props)를 호출해야함
    this.state = {
      loading: true,
      movies: props.movies,
      genres: props.genres,
      allMovies: props.allMovies,
      isOpen: props.isOpen,
      allGenres: props.allGenres,
      openModal: props.openModal
    }

  }



  render() {
    if (!this.props.movies) return <div className="App App-header" style={{ color: 'white' }}>
      <Spinner
        animation="border"
        variant="danger" />
      <h3>loading...</h3>
    </div>

    return  (
      <> 
         <div className="App App-header container-fluid">
         <div className="d-flex flex-wrap main justify-content-center">
          {this.props.movies && this.props.movies.map((item, i) => { 
            return ( 
              <>


              <Card className="bg-dark text-white">
                <MDBView hover zoom>
                  <img src={`https://image.tmdb.org/t/p/w400/${item.backdrop_path}`} className="img-fluid" alt={item.title}  />
  
                  <MDBMask className="d-flex" overlay="black-strong" >
                    <Card.ImgOverlay className="text-center scroll" onClick={()=> this.state.openModal(item.id)}>
                      <Card.Title><h3>{item.title}</h3></Card.Title>
                      <Card.Text><Badge variant="danger" style={{ fontSize: 13 }}>{this.props.allGenres && this.props.allGenres[i]}</Badge>
                      </Card.Text>
                      <Card.Subtitle className="text-muted text-grey"><Moment fromNow>{item.release_date}</Moment></Card.Subtitle>
                      <Card.Text style={{ fontSize: 15 }}>
                        <div className="overview">
                          {item.overview} 
                        </div>
                      </Card.Text>
                    </Card.ImgOverlay>
                  </MDBMask>
                </MDBView>
                <Card.Header className="d-flex justify-content-end align-content-center"><h4 style={{color:'red'}}>★ </h4><h5> {item.vote_average}</h5></Card.Header>
              </Card>
           </>
)
    })}
    </div>
     </div>
          </>   
       )
 }
}
export default Main;