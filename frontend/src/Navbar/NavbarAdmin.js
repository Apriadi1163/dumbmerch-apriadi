import { Container, Navbar, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import Frame from "../assets/Frame.png"

function NavbarAdmin(){
    const navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    // function logout (){
    //     navigate("/")
    // }
    const logout = () => {
        // navigate("/")
        dispatch({
            type: "LOGOUT",
          });
    }
    function gotoCategory(){
        navigate("/category")
    }

    function gotoProduct(){
        navigate("/product")
    }

    function gotoComplain(){
        navigate("/complainadmin")
    }

    function gotoPic(){
        navigate("/product")
    }
    return(
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand onClick={gotoPic}>
                    <img
                        alt=""
                        src={Frame}
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />{" "}
                </Navbar.Brand>
                <Nav className="me-auto; justify-content-end">
                    <Nav.Link onClick={gotoComplain} style={{color:"white"}}>Complain</Nav.Link>
                    <Nav.Link onClick={gotoCategory} style={{color:"white"}}>Category</Nav.Link>
                    <Nav.Link onClick={gotoProduct} style={{color:"white"}}>Product</Nav.Link>
                    <Nav.Link onClick={logout} style={{color:"white"}}>Log Out</Nav.Link>
                </Nav>

            </Container>
        </Navbar>

    )
}

export default NavbarAdmin;