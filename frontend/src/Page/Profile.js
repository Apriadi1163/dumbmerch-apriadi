import { Container, Row, Col } from "react-bootstrap"
// import Picprofile from "../assets/Picprofile.png"
import NavbarUser from "../Navbar/NavbarUser"
// import DataHomePage from "../Data/DataHomePage"
import CssProfile from "./Profile.module.css"
import Frame from "../assets/Frame.png"
// import ImageBlank from "../assets/blank-profile.png"
import PictureApriadi from "../assets/blank-profile.png"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { UserContext } from "../context/userContext"
import { API } from "../config/api"

function Profile(){
    const [state] = useContext(UserContext);
    const [transactions, setTransaction] = useState([]);

    let { data: profile } = useQuery("profileCache", async() => {
        const response = await API.get("/profile");
        return response.data.data
        // console.log(response.data)
    })

    // let { data: transaction } = useQuery("transactionCache", async() => {
    //     const response = await API.get("/transaction");
    //     return response.data.data;
    //     console.log(response.data.data);
    // })
    
    const getTransactions = async () => {
        const response = await API.get("/transaction");
        setTransaction(response.data.data);
    }

    // console.log(setTransaction)

    console.log(transactions);
    // console.log(transactions.seller)
    useEffect(() => {
        getTransactions();
    },[])
    return(
        <div >
            <NavbarUser />
            <Container className="mt-5">
                <Row className={CssProfile.container}>
                    <div>
                        <h3 style={{color:"red"}}>My Profile</h3>
                    </div>
                    <Col md="12">
                        <Row>
                            <Col md="4">
                                <img src={profile?.image ? profile.image : PictureApriadi} alt="" />
                            </Col>
                            <Col md="4">
                                <div style={{color:"red"}}>Name</div>
                                <p style={{color:"white"}}>{state.user.name}</p>

                                <div style={{color:"red"}}>Email</div>
                                <p style={{color:"white"}}>{state.user.email}</p>

                                <div style={{color:"red"}}>Phone</div>
                                <p style={{color:"white"}}>{profile?.phone ? profile?.phone : '-'}</p> 

                                <div style={{color:"red"}}>Gender</div>
                                <p style={{color:"white"}}>{profile?.gender ? profile?.gender : '-'}</p> 

                                <div style={{color:"red"}}>Address</div>
                                <p style={{color:"white"}}>{profile?.address ? profile?.address : '-'}</p>                          
                            </Col>
                            <Col md="4">
                                <div>
                                    <h5 style={{color:"red"}}>My Transaction</h5>
                                </div>
                                {transactions.length != 0 ? (
                                    <>
                                        {transactions.map((item, index) => (
                                        <div style={{ background: "#303030" }} className="p-2 mb-1" key={index}>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <img
                                                        src={item.product.image}
                                                        alt=""
                                                        style={{
                                                                height: "100px",
                                                                width: "80px",
                                                                // objectFit: "cover",
                                                            }}
                                                        />
                                                </Col>
                                                    <Col>
                                                        <div style={{
                                                            fontSize: "18px",
                                                            color: "#F74D4D",
                                                            fontWeight: "500",
                                                            lineHeight: "19px",
                                                        }}>{item.product.name}</div>
                                                            
                                                        <div style={{
                                                            fontSize: "14px",
                                                            color: "blue",
                                                            fontWeight: "300",
                                                            color:"blue",
                                                        }}>{item.price} </div>
                                                        
                                                            
                                                    </Col>
                                                    <Col>
                                                        {/* <img 
                                                            src={Frame}
                                                            alt=""
                                                        /> */}
                                                        <div className={`status-transaction-${item.status} rounded-md p-2 font-bold text-center text-white basis-1/4`}>
                                                            {item.status}
                                                        </div>
                                                    </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="no-data-transaction">No transaction</div>
                                )}
                                   
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile;