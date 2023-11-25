import { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "../redux/slices/authSlice";

export default function Login() {
   const user = useSelector((state) => state.auth.userData);
   const dispatch = useDispatch();

   const [userData, setUserData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const { name, email, password } = userData;

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleLogin = async () => {
      dispatch(login({ email, password }));
   };
   const handleSignup = async () => {
      dispatch(signup({ email, password, name }));
   };

   return (
      <>
         <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <div className="form-group">
               <label htmlFor="name">Name</label>
               <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Enter you name"
                  value={userData.name}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter you email"
                  value={userData.email}
                  onChange={handleChange}
               />
            </div>
            <div className="form-group">
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter you password"
                  value={userData.password}
                  onChange={handleChange}
               />
            </div>
            <div className="form-btns">
               <button onClick={handleLogin}>Login</button>
               <button onClick={handleSignup}>Sign Up</button>
            </div>
         </form>
      </>
   );
}
