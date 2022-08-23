import React, { useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../config/api"
import CssRegister from "./Register.module.css"

function Register(){
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { name, email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
        // console.log(form)
    }

    const handleSubmit = useMutation(async(e) => {
        try{
            e.preventDefault();
            // console.log(form)

            const config = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
            }

            const body = JSON.stringify(form);

            const response = await API.post("/register", body, config);

            console.log(response)

            //Notification
            if (response.status == 200){
                const alert = (
                    <div className='alert alert-success py-2 fw-bold' role='alert'>
                        Register Success
                    </div>
                )

                setMessage(alert)
                setForm({
                    name: "",
                    email: "",
                    password: "",
                })
            } else{
                const alert = (
                    <div className='alert alert-danger py-2 fw-bold' role='alert'>
                        Email telah ada
                    </div>
                )
                setMessage(alert)
            }
            
        }catch(error){
            console.log(error)
            const alert = (
                <div className='alert alert-danger py-2 fw-bold' role='alert'>
                    Server Error
                </div>
            )
            setMessage(alert)
        }
        

    });

    
    return(
        <div className={CssRegister.layer}>
            <Container className={CssRegister.container}>
                <Col md="6">
                    <Form onSubmit={(e) => handleSubmit.mutate(e)} >
                        <div className={CssRegister.info}>Register</div>
                        {message && message}
                        <Form.Group className={CssRegister.form}>
                            <Form.Control 
                                onChange={handleChange}
                                value={name}
                                name="name"
                                size="sm"
                                type="text"
                                placeholder="Name" />
                        </Form.Group>

                        <Form.Group className={CssRegister.form}>
                            <Form.Control 
                                onChange={handleChange}
                                value={email}
                                name="email"
                                size="sm"
                                type="email"
                                placeholder="Email" />
                        </Form.Group>

                        <Form.Group className={CssRegister.form}>
                            <Form.Control 
                                onChange={handleChange}
                                value={password}
                                name="password"
                                size="sm"
                                type="password"
                                placeholder="Password" />
                        </Form.Group>

                        <Button variant="denger" type="submit" className={CssRegister.btnregister} >Register</Button>

                    </Form>
                </Col>
            </Container>
        </div>
    )
}

export default Register;