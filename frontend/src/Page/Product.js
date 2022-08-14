// import DataProduct from "../Data/DataProduct"
import { Container, Row, Table, Button } from "react-bootstrap"
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import ShowMoreText from "react-show-more-text"
import { useQuery, useMutation } from "react-query"
import DeleteData from "../modal/DeleteData"
import { API } from "../config/api"


function Product(){
  const navigate = useNavigate();
  // const [modalShow, setModalShow] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function navigationToAdd() {
    navigate("/addproduct");
  }

  function gotoEdit(id){
    navigate("/editproduct/" + id)
  }

  let { data: product, refetch } = useQuery("productCache", async() => {
    const response = await API.get("/product");
    return response.data.data;
    // console.log(response.data);
  });
  
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);
    return(
        <div>
            <NavbarAdmin />
            
            <div>
                <h3 style={{marginTop:"1.5em", marginLeft:"3.9em", color:"white"}}>List Product</h3>
            </div>
            
              <Button
                onClick={navigationToAdd}
                variant="dark"
                style={{ width: "10%", paddingBottom: "20px 16px", marginLeft: "80em" }}
                className="btn-sm btn-success me-2"
              >
                Add Product
              </Button>{" "}
  
            <div className="container mb-2">
            <input
              className="fs-5 p-2 text-dark fw-bold rounded w-25 text-center "
              type="text"
              placeholder="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <Container>
                <Row>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th className='mx-4'>No</th>
                      <th>Image</th>
                      <th>Product name</th>
                      <th>Product Desc</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {product?.filter((val) => {
                    if(searchTerm === ""){
                      return val;
                    }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                      return val;
                    }
                  }).map((val, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                      <img
                          src={val.image}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                          }}
                          alt={val.name}
                        />
                      </td>
                      <td>{val.name}</td>
                      <td>
                        {/* <ShowMoreText
                        lines={1}
                        more="show"
                        less="hide"
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        expanded={false}
                        width={20}
                        > */}
                        {val.desc}
                        {/* </ShowMoreText> */}
                      </td>
                      <td>{val.price}</td>
                      <td>{val.qty}</td>
                      <td>
                        <Button variant="success" className='me-4' onClick={() => {gotoEdit(val.id)}} style={{width: "135px"}} >  Edit  </Button>{' '}
                        <Button variant="danger" onClick={() => {handleDelete(val.id)}} style={{width: "135px"}}>Delete</Button>
                        
                        
                      </td>
                    
                    </tr>
                    ))}
                  </tbody>
                </Table>
                </Row>
            </Container>
            <DeleteData
              setConfirmDelete={setConfirmDelete}
              show={show}
              handleClose={handleClose}
            />
        </div>
    )
}


export default Product;