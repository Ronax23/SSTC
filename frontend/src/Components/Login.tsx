import {useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiLoc } from '../assets/Constants/apis_loc';


function Login() {
    const navigateDashboard=useNavigate();
    const [passwordView, setPasswordview] = useState<string>("password");
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
      });
     const loginhandle = (data:string) => {
          axios.post(`${apiLoc}login`,data).then((res)=>{
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
                        <input type={passwordView} id="password" className='my-3 form-control'
                        {...register("password", { required: true})}
                        placeholder='Enter your password' />
                         <i 
                                            className={`btn btn-outline-secondary ${passwordView === "password" ? "bi bi-eye" : "bi bi-eye-slash"}`}
                                            onMouseDown={() => setPasswordview("text")}
                                            onMouseUp={() => setPasswordview("password")}
                                            onTouchStart={() => setPasswordview("text")} // Mobile support
                                            onTouchEnd={() => setPasswordview("password")}   // Mobile support
                                            style={{ userSelect: 'none' }}
                                        >
                                        </i>
                        {errors.password?.type === "required" && <span className='text-danger'>This field is required</span>}
                    </section>
                    <button type='submit' className='btn btn-primary'>Login</button>
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