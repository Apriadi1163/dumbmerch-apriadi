import NavbarAdmin from "../Navbar/NavbarAdmin";
import { useNavigate, useParams } from "react-router-dom"
import React, { useState, useEffect,  } from "react";
import { Form } from "react-bootstrap"
import CheckBox from "../form/CheckBox"
import { API } from "../config/api"
import { useQuery, useMutation } from "react-query"
import { Container } from "react-bootstrap"

function EditProduct(){
    const navigate = useNavigate();
    const { id } = useParams();
    // function gotoProduct(){
    //     navigate("/product")
    // }
    
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [preview, setPreview] = useState(null);
    const [product, setProduct] = useState({});
    const [form, setForm] = useState({
        image: "",
        name: "",
        desc: "",
        price: "",
        qty: "",
    });

    useQuery("productCache", async() => {
        const response = await API.get("/product/" + id)
        setPreview(response.data.data.image);
        setForm({
            ...form,
            name: response.data.data.name,
            desc: response.data.data.desc,
            price: response.data.data.price,
            qty: response.data.data.qty,
        });
        setProduct(response.data.data);
    });

    useQuery("categoryCache", async () => {
        const response = await API.get("/category");
        setCategory(response.data.data);
    });

    const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;
    
        if (checked) {
          // Save category id if checked
          setCategoryId([...categoryId, parseInt(id)]);
        } else {
          // Delete category id from variable if unchecked
          let newCategoryId = categoryId.filter((categoryIdItem) => {
            return categoryIdItem != id;
          });
          setCategoryId(newCategoryId);
        }
    };

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });
    
        // Create image url for preview
        if (e.target.type === 'file') {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          // Configuration
          const config = {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          };
    
          // Store data with FormData as object
          const formData = new FormData();
          if (form.image) {
            formData.set('image', form?.image[0], form?.image[0]?.name);
          }
          formData.set('name', form.name);
          formData.set('desc', form.desc);
          formData.set('price', form.price);
          formData.set('qty', form.qty);
          formData.set('categoryId', categoryId);
    
          // Insert product data
          const response = await API.patch(
            '/product/' + product.id,
            formData,
            config
          );
          console.log(response.data);
    
          navigate('/product');
        } catch (error) {
          console.log(error);
        }
    });

    useEffect(() => {
        const newCategoryId = product?.category?.map((item) => {
            return item.id;
          });
      
          setCategoryId(newCategoryId);
    }, [product])
    return(
        <div style={{backgroundColor:"black", height:"100%"}}>
        
            <NavbarAdmin />
            <div>
                <h3 style={{color:"white", marginLeft:"1.1em"}}>Edit Product</h3>
            </div>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
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
                            value={form.name}
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
                        value={form.desc}
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
                            value={form.price}
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
                            value={form.qty}
                            onChange={handleChange}
                            placeholder="Quantity"
                        />
                        </Form.Group>
                    </div>
                    
                    <div className="card-form-input mt-4 px-2 py-1 pb-2">
                        <div
                        className="text-secondary mb-1"
                        style={{ fontSize: '15px' }}
                        >
                        Category
                        </div>
                            {product &&
                            category?.map((item, index) => (
                                <label key={index} className="checkbox-inline me-4">
                                <CheckBox
                                    categoryId={categoryId}
                                    value={item?.id}
                                    handleChangeCategoryId={handleChangeCategoryId}
                                />
                                <span className="ms-2">{item?.name}</span>
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
    )
}

export default EditProduct;