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

             </div>
    )

      }
    
}
export default LoadMore;