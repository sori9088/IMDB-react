import React, { useState , useEffect } from 'react'
import logo from '../logo.png';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap';

export default function Navbarr() {

  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    console.log('hii',window.scrollY)
    if(window.scrollY === 0) {
        setScrolling(false);
    } else if (window.scrollY > 800) {
        setScrolling(true);
    }
}

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [])
  

  console.log(scrolling)
    return (
        <div>    
<Navbar collapseOnSelect expand="lg" variant="dark"  fixed="top" style={{ backgroundColor: scrolling ? "black": "transparent"}}>
  <Navbar.Brand href="#home"><img src={logo} className="logo" /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">HOME</Nav.Link>
      <Nav.Link href="#pricing">LATEST</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-danger">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        </div>
    )
}
