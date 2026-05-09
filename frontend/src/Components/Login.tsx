import {useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import type {login} from '../assets/Loading/Types';



function Login() {
    const navigateDashboard=useNavigate();
    const [passwordView, setPasswordview] = useState<"password"|"text">("password");
    const { register, handleSubmit, formState: { errors } } = useForm<login>({
        mode: "onBlur"
      });
     const loginhandle = (data:login) => {
        console.log(import.meta.env.VITE_API)
          axios.post(`${import.meta.env.VITE_API}login`,data).then((res)=>{
            if(res.data.login){
                toast.success(res.data.message);
                setTimeout(()=>{
                    navigateDashboard("/dashboard");
                },2000)
             }
             else{
                toast.error(res.data.message);
             }
            }).catch(()=>{
                toast.error("An error occurred during login.");
            })
     }
     
  return (
   <>
   <section id="login">
    <Toaster />

    <section className="container">
        <section className="row">
            <section className="mt-3 col-lg-6 col-md-6 col-12">
                <form onSubmit={handleSubmit(loginhandle)}>
                    <h2>Login</h2>
                    <section className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className='my-3 form-control' placeholder='Enter your email'
                        {...register("email", { required: true, pattern: /@/ })}
                        />
                        {errors.email?.type === "required" && <span className='text-danger'>This field is required</span>}
                        {errors.email?.type === "pattern" && <span className='text-danger'>Please enter a valid email</span>}
                    </section>
                    <section className="form-group">
                        <label htmlFor="password">Password</label>
                   <div className="position-relative">
                         <input type={passwordView} id="password" className='my-3 form-control'
                        {...register("password", { required: true})}
                        placeholder='Enter your password' />
                         <i 
                                            className={`btn btn-outline-secondary position-absolute top-0 end-0 border-0   ${passwordView === "password" ? "bi bi-eye" : "bi bi-eye-slash"}`}
                                            onMouseDown={() => setPasswordview("text")}
                                            onMouseUp={() => setPasswordview("password")}
                                            onTouchStart={() => setPasswordview("text")} // Mobile support
                                            onTouchEnd={() => setPasswordview("password")}   // Mobile support
                                            style={{ userSelect: 'none' }}
                                        >
                                        </i>
                   </div>
                        {errors.password?.type === "required" && <span className='text-danger'>This field is required</span>}
                    </section>
                    <section className="d-flex justify-content-between align-items-center">
                        <button type="submit" className='btn btn-primary'>Login</button>
                        <span>Don't have an account? <Link className="ms-2 btn btn-info text-light" to="/register">Register</Link></span>
                    </section>
                </form>
            </section>
            <section className="mt-3 col-lg-6 col-md-6 col-12">
                <img src="../Backgrounds/login.jpg" alt="loginPage" />
            </section>
        </section>
    </section>
   </section>
   
   </>
  )
}

export default Login