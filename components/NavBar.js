/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#003049' }}>
      <Container>
        <Link passHref href="/">
          <Navbar.Brand style={{ color: '#d8e2dc' }}>RARE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/users">
              <Nav.Link style={{ color: '#d8e2dc', marginLeft: '20px' }}>All Users</Nav.Link>
            </Link>
            <Link passHref href="/posts/allPosts">
              <Nav.Link style={{ color: '#d8e2dc', marginLeft: '20px' }}>All Posts</Nav.Link>
            </Link>
            <Link passHref href="/posts/myPosts">
              <Nav.Link style={{ color: '#d8e2dc', marginLeft: '20px' }}>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link style={{ color: '#d8e2dc', marginLeft: '20px' }}>Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link style={{ color: '#d8e2dc', marginRight: '350px', marginLeft: '20px' }}>Tag Manager</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
