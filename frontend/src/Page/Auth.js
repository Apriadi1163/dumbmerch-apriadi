import { useState } from "react";
// import { useNavigate } from "react-router-dom"
import Dumbmerch from "../assets/DumbMerch.png"
import { Container, Row, Col } from "react-bootstrap"
import Login from "../Component/Login";
import Register from "../Component/Register";
import cssModule from "./Auth.module.css"

function Auth(){
    // const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const changeLogin = () => {
        setIsRegister(false);
    }

    const changeRegister = () => {
        setIsRegister(true);
    }

    return(
        <div className={cssModule.Layer} >
            <Container className={cssModule.Container}>
                <Row>
                    <Col md="12" >
                        <img 
                            src={Dumbmerch}
                            alt=""
                            className={cssModule.img} 
                            style={{width: "264px", height:"264px"}}
                        />
                        <div className={cssModule.anouncement} >Easy, Fast and Reliable</div>
                        <p>
                            Go shopping for merchandise, just go to dumb merch <br />{" "}
                            shopping. the biggest merchandise in <b>Indonesia</b>
                        </p>
                        <div>
                            <button onClick={changeLogin} className={cssModule.btnlogin} style={{width:"135px"}} >Login</button>
                            <button onClick={changeRegister} className={cssModule.btnregister} style={{width:"135px"}} >Register</button>
                        </div>
                    </Col>
                </Row>
                <Col md="6" >{isRegister ? <Register /> : <Login />}</Col>
            </Container>
        </div>
    )
}

export default Auth;