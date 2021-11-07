
import {Container, NavDropdown,Navbar, Nav, NavItem} from 'react-bootstrap';


import React, { Component } from 'react';


export class MyNav extends Component {
    state = {

      
      };

      hideSLogan(){

      }

      render() {
        return (<div>
<Navbar bg="light" expand="lg">

    <Navbar.Brand href="/"><div className='title'> Na<b>nft</b>ucket </div></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Map</Nav.Link>
        <Nav.Link href="howto">How to</Nav.Link>
        <Nav.Link href="about">About</Nav.Link>
        <Nav.Link ></Nav.Link>
        
      </Nav>
      
    </Navbar.Collapse>
    
 
</Navbar>
<br/><div class='bg-light' style={{top:'-60px',position:'relative',marginBottom:'-50px'}}>You'll never own it in reality, so own it in the metaverse.</div>
</div>
        )}
    }
export default MyNav;