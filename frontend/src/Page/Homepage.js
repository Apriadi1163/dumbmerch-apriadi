import NavabarUser from "../Navbar/NavbarUser"
import { Container, Row, Col, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
// import DataHomePage from "../../src/Data/DataHomePage"
import CssHomepage from "./Homepage.module.css"
import { API } from "../config/api"
import { useQuery } from "react-query"

function Homepage(){

    let { data: product} = useQuery("productsCache", async () => {
        const response = await API.get("/product");
        return response.data.data;
    })
    // console.log(product)
    return(
            <div>
                <NavabarUser />
                <div>
                    <h3 className={CssHomepage.title} >Product</h3>
                </div>
                <Container className={CssHomepage.container}>
                    <Row >
                        {product?.map((data, index) => (
                        <Col md={3} key={index} >
                        <Link  to={`/detailproduct/` + data.id} style={{ textDecoration: "none", color:"white" }}>
                        <Card style={{ width: '23rem', textDecoration: 'none'}} className="bg-black me-2" key={index}>
                            <Card.Img variant="top" src={data.image} className="img-fluid " style={{ width: '250px', height: '300px' }} />
                            <Card.Body>
                                <Card.Title className={CssHomepage.name}>{data.name}</Card.Title>
                                <Card.Text className={CssHomepage.description}>Harga: {data.price}</Card.Text>
                                <Card.Text className={CssHomepage.description}>Stock: {data.qty}</Card.Text>
                            </Card.Body>
                        </Card>
                        
                        </Link>
                        </Col>
                        ))}
                    </Row>
                </Container>
            </div>
    )
}

export default Homepage; 