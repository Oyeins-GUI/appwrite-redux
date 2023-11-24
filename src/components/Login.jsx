import { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todoSlice";
import { loginSync } from "../features/authSlice";

export default function Login() {
   const user = useSelector((state) => state.user);
   const todo = useSelector((state) => state.todo);
   const dispatch = useDispatch();

   const [userData, setUserData] = useState({
      name: "",
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
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
               <button onClick={() => dispatch(loginSync())}>Login</button>
               <button>Sign Up</button>
            </div>
         </form>
         <br />
         <br />
         <div className="App">
            <button onClick={() => dispatch(fetchTodos())}>Click</button>
            <br />
            {todo?.isLoading && <b>Loading...</b>}
            {todo?.data?.map((i) => {
               return <li key={i.id}>{i.title}</li>;
            })}
         </div>
      </>
   );
}
