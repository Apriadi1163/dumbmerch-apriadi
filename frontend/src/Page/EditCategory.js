import NavbarAdmin from "../Navbar/NavbarAdmin";
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { API } from "../config/api"
import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

function EditCategory(){
    const navigate= useNavigate();
    function gotoCategory(){
        navigate("/category")
    }
    let { id } = useParams();
    const [category, setCategory] = useState({name: ""});

    useQuery("categoryCache", async () => {
        const response = await API.get("/category/" + id);
        setCategory({name: response.data.data.name});
    });

    const handleChange = (e) => {
        setCategory({
            ...category,
            name: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try{
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const body = JSON.stringify(category);

            const response = await API.patch("/category/" + id, body, config)

            navigate("/category")
        }catch(error){
            console.log(error);
        }
    });
    return(
      <div style={{backgroundColor:"black", height:"100vh"}}>
        <NavbarAdmin  />
        <Container className="py-5">
          <Row>
            <Col xs="12">
              <div className="text-header-category mb-4">Edit Category</div>
            </Col>
            <Col xs="12">
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <input
                  onChange={handleChange}
                  value={category.name}
                  placeholder="category"
                  className="input-edit-category mt-4"
                  style={{width: "69.5em"}}
                />
                <div className="d-grid gap-2 mt-4">
                  <Button type="submit" variant="success" size="md">
                    Save
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default EditCategory;