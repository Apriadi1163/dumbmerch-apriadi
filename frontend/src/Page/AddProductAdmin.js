import NavbarAdmin from "../Navbar/NavbarAdmin";
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import { API } from "../config/api";

function AddProductAdmin(){
    const navigate = useNavigate();
    

    const [category, setCategory] = useState([]); //store category data
    const [categoryId, setCategoryId] = useState([]); //save selected category id
    const [preview, setPreview] = useState(null); //for image preview
    const [form, setForm] = useState({
        image: "",
        name: "",
        desc: "",
        price: "",
        qty: "",
    });

    // let { data: category, refetch } = useQuery("categoryCache", async() => {
    //     const response = await API.get("/category");
    //     return response.data.data;
    // })

    const getCategories = async () => {
        try{
            const response = await API.get("/category");
            setCategory(response.data.data);
        }catch(error){
            console.log(error)
        }
    }
    
    const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;

        if(checked == true){
            setCategoryId([...categoryId, parseInt(id)]);
        }else{
            let newCategoryId = categoryId.filter((categoryIdItem) => {
                return categoryIdItem != id;
            });
            setCategoryId(newCategoryId);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file"){
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();

            const formData = new FormData();
            formData.set("image", form?.image[0], form?.image[0]?.name);
            formData.set("name", form.name);
            formData.set("desc", form.desc);
            formData.set("price", form.price);
            formData.set("qty", form.qty);
            formData.set("categoryId", categoryId);

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            }

            const response = await API.post("/product", formData, config)
            // console.log(response.data)
            navigate("/product");
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getCategories();
    },[])
     return(  
        <>
            <div >
            <NavbarAdmin />
            <form onSubmit={handleSubmit} >
                <div>
                    <div>
                    {preview && (
                        <div>
                        <img
                            src={preview}
                            style={{
                            marginLeft: "1.5em",
                            maxWidth: "150px",
                            maxHeight: "150px",
                            objectFit: "cover",
                            }}
                            alt="preview"
                        />
                        </div>
                    )}

                    <div>
                        <label
                        for="upload"
                        className="label-file-add-product"
                        style={{
                            backgroundColor: "red",
                            marginLeft: "2em",
                            borderRadius: "2em",
                            height: "2em",
                            color: "black",
                        }}
                        >
                        Upload file
                        <input
                            type="file"
                            id="upload"
                            name="image"
                            hidden
                            onChange={handleChange}
                        />
                        </label>
                    </div>
                    <div
                        class="form-floating mb-3"
                        className="part-table"
                        style={{ marginRight: "2em", marginLeft: "2em" }}
                    >
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                        >
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Product Name"
                        />
                        </Form.Group>
                    </div>
                    <div
                        class="form-floating my-3"
                        style={{ marginRight: "2em", marginLeft: "2em" }}
                    >
                        <textarea
                        class="form-control"
                        style={{ resize: "none", height: "100px" }}
                        onChange={handleChange}
                        placeholder="Description"
                        id="floatingTextarea"
                        name="desc"
                        ></textarea>
                        <label for="floatingTextarea">Description</label>
                    </div>
                    <div
                        class="form-floating mb-2"
                        style={{ marginRight: "2em", marginLeft: "2em" }}
                    >
                        <Form.Group
                        className="mb-2"
                        controlId="exampleForm.ControlInput1"
                        >
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            onChange={handleChange}
                            placeholder="Price (Rp.)"
                        />
                        </Form.Group>
                    </div>

                    <div
                        class="form-floating mb-2"
                        style={{ marginRight: "2em", marginLeft: "2em" }}
                    >
                        <Form.Group
                        className="mb-2"
                        controlId="exampleForm.ControlInput1"
                        >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="qty"
                            onChange={handleChange}
                            placeholder="Quantity"
                        />
                        </Form.Group>
                    </div>
                    <div className="card-form-input mt-4 px-2 py-1 pb-2" style={{marginLeft: "1.5em"}}>
                        <div
                        className="text-secondary mb-1"
                        style={{ fontSize: '15px' }}
                        >
                        Category
                        </div>
                        {category?.map((item, index) => (
                        <label className="checkbox-inline me-4" key={index} style={{color:"white"}}>
                            <input
                            type="checkbox"
                            value={item.id}
                            onClick={handleChangeCategoryId}
                            
                            />{' '}
                            {item.name}
                        </label>
                        ))}
                    </div>

                    <div
                        class="d-grid gap-2"
                        style={{
                        marginRight: "2em",
                        marginLeft: "2em",
                        marginTop: "2em",
                        }}
                    >
                        <button class="btn btn-success"   >
                        Button
                        </button>
                    </div>
                    </div>
                </div>
            </form>
            </div>
        </>
            
        
    )
}

export default AddProductAdmin;