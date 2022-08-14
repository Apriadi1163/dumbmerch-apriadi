import NavbarUser from "../Navbar/NavbarUser"
import { Container, Row, Col } from "react-bootstrap"
// import Picdetailproduct from "../assets/Picdetailproduct.png"
import CssDetail from "./Detailproduct.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../config/api"
import { useState, useEffect } from "react"

function Detailproduct(){
    const navigate = useNavigate();

    let { id } = useParams();

    const [product, setProduct] = useState([]);
    const getProduct = async () => {
        try {
          const response = await API.get("/product/" + id);
          // Store product data to useState variabel
          setProduct(response.data.data);
          console.log(response.data.data);
          //console.log(response);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getProduct(id);
    }, []);
    
    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-ZFKbpuATFTKqgdiE";
      
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
      
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
    }, []);

    const handleBuy = async () => {
        try{
            const data = {
                idProduct: product.id,
                idSeller: product.user.id,
                price: product.price,
            };


            const body = JSON.stringify(data);

            const config = {
                // method: "POST",
                headers: {
                Authorization: "Basic " + localStorage.token,
                "Content-type": "application/json",
                },
            };

            const response = await API.post("/transaction", body, config);
            console.log("Response Transaction: ", response.data.payment.token);

            const token = response.data.payment.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });

            // navigate("/profile");
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={CssDetail.layer}>
            <NavbarUser />
            <Container>
                <Row md="12">
                    <Col md="5">
                        <img src={product?.image} alt="" className={CssDetail.image}/>
                    </Col>
                    <Col md="6" className={CssDetail.description}>
                        <h1 className={CssDetail.title}>{product?.name}</h1>
                        <h4 className={CssDetail.description}>Stock: {product?.qty}</h4>
                        <p>{product?.desc}</p>
                            
                            
                        <h5 className={CssDetail.price}>Rp {product?.price}</h5>
                        <button className={CssDetail.btnbuy} type="submit" onClick={handleBuy} >Buy</button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Detailproduct;