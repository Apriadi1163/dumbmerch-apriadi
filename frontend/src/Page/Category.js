import React, { useState, useEffect } from "react"
import NavbarAdmin from "../Navbar/NavbarAdmin"
import { Container, Row, Table, Button } from "react-bootstrap"
// import DataCategory from "../Data/DataCategory"
import { useNavigate } from "react-router-dom"
import { API } from "../config/api"
import { useQuery, useMutation } from "react-query"
import DeleteData from "../modal/DeleteData"

function Category(){
  const navigate = useNavigate();
  const gotoEditCategory = (id) => {
    navigate("/editcategory/" + id)
  }
  function navigationAdd() {
    navigate("/addcategory");
  }
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  let { data: category, refetch } =  useQuery("categoryCache", async () => {
    const response = await API.get("/category");
    return response.data.data;
  });

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  }

  console.log("apriadi");

  const deleteById = useMutation(async(id) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      await API.delete(`/category/${id}`, config);
      refetch();
    }catch(error){
      console.log(error);
    }
  });

  useEffect(() => {
    if(confirmDelete){
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  },[confirmDelete])

    return(
        <div style={{backgroundColor:"black", height:"100vh"}}>
            <NavbarAdmin />
            <div>
                <h3 style={{color:"white", marginTop:"2em", marginLeft:"3.9em", marginBottom:"1em"}}>List Category</h3>
            </div>
            <Button
              onClick={navigationAdd}
              variant="dark"
              style={{ width: "135px", marginLeft: "65em", marginBottom: "0.5em" }}
            >
              Add category
            </Button>{" "}
            <Container>
                <Row>
                <Table striped bordered hover variant="dark"  >
                  <thead>
                    <tr>
                      <th className='mx-4'>No</th>
                      <th>Category Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {category?.map((data, index) => (
                    <tr key={index}>
                      <td width="10%" className="align-middle">{index + 1}</td>
                      <td width="60%" className="align-middle">{data.name}</td>
                      <td width="30%">
                        <Button variant="success" className='me-4' onClick={() => {gotoEditCategory(data.id)}} style={{width: "135px"}} >  Edit  </Button>{' '}
                        <Button className='btn-category' variant="danger" onClick={() => {handleDelete(data.id)}} style={{width: "135px"}}>Delete</Button>
                        
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



export default Category;