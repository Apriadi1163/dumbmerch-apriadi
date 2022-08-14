import Auth from './Page/Auth';
import Homepage from './Page/Homepage';
import Detailproduct from './Page/Detailproduct';
import Profile from './Page/Profile';
import Category from './Page/Category';
import Product from './Page/Product';
import EditProduct from './Page/EditProduct';
import { Routes, Route, useNavigate } from "react-router-dom"
import EditCategory from './Page/EditCategory';
import ComplainAdmin from './Page/ComplainAdmin';
import ComplainUser from './Page/ComplainUser';
import AddProductAdmin from './Page/AddProductAdmin';
import AddCategoryAdmin from './Page/AddCategoryAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setAuthToken, API } from "./config/api"
import { UserContext } from "./context/userContext"
import { useContext, useEffect } from 'react';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  // console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/product");
        // history.push("/complain-admin");
      } else if (state.user.status == "customer") {
        navigate("/homepage");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/homepage" element={<Homepage/>} />
        <Route path="/detailproduct/:id" element={<Detailproduct/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/editproduct/:id" element={<EditProduct/>} />
        <Route path="/editcategory/:id" element={<EditCategory/>} />
        <Route path="/complainadmin" element={<ComplainAdmin/>} />
        <Route path="/complainuser" element={<ComplainUser/>} />
        <Route path="/addproduct" element={<AddProductAdmin/>} />
        <Route path="/addcategory" element={<AddCategoryAdmin />} />
      </Routes>
   
  );
}

export default App;
