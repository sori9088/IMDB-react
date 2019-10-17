import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';

class LoadMore extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          items: [],
          visible: 20,
          error: false
        };
    
        this.loadMore = this.loadMore.bind(this);
      }

      loadMore = () => {
        console.log('ggg')
        this.setState((prev) => {
          return {visible: prev.visible + 10};
        });
      }


      render() {

        return (
            <div class="container">
                <div class="d-flex justify-content-center">
                         <Button id="load-more-btn" variant="danger" type="button" onClick={this.loadMore}>
                            Load More
                        </Button>
                     </div>
             </div>
    )

      }
    
}
export default LoadMore;