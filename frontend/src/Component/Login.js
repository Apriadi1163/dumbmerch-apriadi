import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import CssLogin from "./Login.module.css"
import { API } from "../config/api"

function Login(){
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    const [form, setForm] = useState({
        email:"",
        password:"",
    })

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            // if(form.email === "apriadi@gmail.com"){
            //     navigate("/homepage")
            // }else{
            //     navigate("/product")
            // }
            // console.log(form)
            const config = {
                // method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const body = JSON.stringify(form);

            const response = await API.post("/login", body, config);

            console.log(response.data.data.token)
            console.log(response)

            if (response?.status == 200) {
                // Send data to useContext
                dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data,
                });
        
                // Status check
                if (response.data.status == 'admin') {
                navigate("/product");
                } else {
                navigate("/homepage");
                }
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className={CssLogin.layer} >
            <Container className={CssLogin.container}>
                <Row>
                    <Col md="6">
                        <Form >
                        <div className={CssLogin.info}>Login</div>
                            <Form.Group className={CssLogin.form}>
                                <Form.Control 
                                    onChange={handleChange} 
                                    value={email} 
                                    name="email" 
                                    size="sm" 
                                    type="email" 
                                    placeholder="Email" />
                            </Form.Group>

                            <Form.Group className={CssLogin.form}>
                                <Form.Control 
                                    onChange={handleChange} 
                                    value={password} 
                                    name="password" 
                                    size="sm" 
                                    type="password" 
                                    placeholder="Password" />
                            </Form.Group>

                            <Button variant="danger" className={CssLogin.btnlogin} onClick={handleSubmit} >Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;