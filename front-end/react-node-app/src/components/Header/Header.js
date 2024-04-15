import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import useHistory from 'react-router-dom';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  // const history = useHistory();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.replace('/');
  };

  // Check if token exists
  if (!token) {
    return (
      <Navbar className='custom-navbar' variant='dark'>
        <Container>
          <Nav className="me-auto">
          <Nav.Link className='link' href="/"> LogIn </Nav.Link>
          <Nav.Link className='link' href="/Registration">Registration</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar className='custom-navbar' variant='dark'>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/AllProduct"> Products </Nav.Link>
            <Nav.Link href="/AddProduct"> AddProduct </Nav.Link>
            <Nav.Link href="/AllCategory"> Categories </Nav.Link>
            <Nav.Link href="/AddCategory"> AddCategory </Nav.Link>
            <Nav>
              <Nav.Link onClick={handleLogout}>LogOut</Nav.Link>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
