import NavbarAdmin from "../Navbar/NavbarAdmin";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useMutation } from "react-query"
import { Button } from "react-bootstrap"
import { API } from "../config/api"

function AddCategoryAdmin(){
    const navigate= useNavigate();

    const [category, setCategory] = useState();
    const handleChange = (e) => {
        setCategory(e.target.value);
    }

    const handleSubmit = useMutation(async (e) => {
        try{
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                  },
            };

            const body = JSON.stringify({ name: category});

            const response = await API.post("/category", body, config);
            console.log(response)

            navigate("/category");
        }catch(error){
            console.log(error);
        }
    });
    return(
        <div className="bg-black" style={{ height: "100vh" }}>
            <NavbarAdmin />
            <div style={{ width: "3em"}}>
            <h4 className="edit-category-label" style={{ width: "10em", marginLeft:"2em", marginTop:"2em", color: "white" }}>
                Add Category
            </h4>
            </div>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="mt-5 form">
                    <div d-grid gap-2 mt-5>
                        <input
                            name="category"
                            placeholder="category"
                            value={category}
                            onChange={handleChange}
                            className="edit-place"
                            style={{marginLeft:"2em", width:"80.5em", paddingLeft: "1.5em"}}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-5 " >
                        <Button variant="success" type="submit" style={{marginLeft: "2em", marginRight:"2em"}}>
                        Save
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddCategoryAdmin;