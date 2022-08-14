import {Navbar, Container, Nav } from "react-bootstrap"
import Frame from "../assets/Frame.png"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"

function NavbarUser(){
    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    const logout = () => {
        // navigate("/")
        dispatch({
            type: "LOGOUT",
          });
    }
    function gotoProfile(){
        navigate("/profile")
    }

    function gotoComplain(){
        navigate("/complainuser")
    }

    function gotoHomepage(){
        navigate("/homepage")
    }
    return(
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand onClick={gotoHomepage}>
                    <img
                        alt=""
                        src={Frame}
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />{" "}
                </Navbar.Brand>
                <Nav className="me-auto; justify-content-end" >
                    <Nav.Link onClick={gotoComplain} style={{color:"white"}}>Complain</Nav.Link>
                    <Nav.Link onClick={gotoProfile} style={{color:"white"}}>Profile</Nav.Link>
                    <Nav.Link onClick={logout} style={{color:"white"}}>Log Out</Nav.Link>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default NavbarUser;