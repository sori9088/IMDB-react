import React from 'react'
import { Card, Spinner, Badge } from 'react-bootstrap';
import Moment from 'react-moment';
import { MDBMask, MDBView, MDBCloseIcon } from "mdbreact";
import Modal from 'react-modal';
import YouTube from 'react-youtube';


const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 1,

  },
  content: {
    width: '60vw',
    height: '40vw',
    margin: 'auto',
    outline: "none",
    padding: "20px",
    overflow: "auto",
    background: "#333",
    borderRadius: "4px",
    border: "1px solid #ccc",
  }
}

const opts = {
  height: '600vw',
  width: '800vw',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};



class Main extends React.Component {

  constructor(props) { //React.Component 를 상속한 컴포넌트의 생성자를 구현할때, 
    super(props); // 다른 구문에 앞서 super(props)를 호출해야함
    this.state = {
      movies: props.movies,
      genres: props.genres,
      allMovies: props.allMovies,
      isOpen: false,
      trailers: [],
      allGenres: props.allGenres,
      loading: true,
      hasError: false,
    }
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    console.log('ggg')
    this.setState({ isOpen: true })
  }


  getVideo = async (id) => {
    const api = process.env.REACT_APP_API;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api}&language=en-US`
    );
    const { trailers } = await response.json();
    this.setState({ trailers });
    console.log(trailers)
  }




  render() {
    if (!this.props.movies)
      return <div className="App App-header" style={{ color: 'white' }}>
        <Spinner animation="border" variant="danger" />
        <h3>loading...</h3>
      </div>
    return (
      <div className="App App-header container-fluid">



        <Modal
          isOpen={this.state.isOpen}
          style={customStyles}
          contentLabel="Example Modal"
          id="modal"
        >
          <MDBCloseIcon onClick={() => this.setState({ isOpen: false })} />
          <YouTube
            videoId="4CbLXeGSDxg"
            opts={opts}
          />
        </Modal>



        <div className="d-flex flex-wrap main justify-content-center">{this.props.movies && this.props.movies.map((item, i) =>
          <Card className="bg-dark text-white">
            <MDBView hover zoom>
              <img src={`https://image.tmdb.org/t/p/w400/${item.backdrop_path}`} className="img-fluid" alt="This movie doesn't have images" />

              <MDBMask className="d-flex" overlay="black-strong" onClick={this.openModal}>
                <Card.ImgOverlay className="text-center scroll">
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
          </Card>
        )}
        </div>
      </div>
    )
  }
}


export default Main;