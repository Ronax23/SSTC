import React from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const {register,handleSubmit,watch, formState:{errors}}=useForm();
      const password = watch("password");
  const nav=useNavigate();
  // var jst=localStorage.setItem("name","hello");

  

  const registerform = (formdata)=>{
    console.log(formdata);
    axios.post("http://localhost:8000/adduser",formdata)
    .then((response)=>{
      if(response.data.status===200){
        toast.success(response.data.message);
         setTimeout(() => {
      nav("/login");
    }, 2000);
      }
      else{
        toast.error(response.data.message);
      }
    })
    .catch((error)=>{
      toast.error("An error occurred during registration.");
    })
   
    
}

  return (
    


    <div className='register-form  d-flex justify-content-center align-items-center vh-100'>  
    <form className="col-6 mx-auto mt-5" onSubmit={handleSubmit(registerform)}>

              <div className="row ">
                <div className="col-md-6 mb-4">
                <Toaster />
                  <div data-mdb-input-init className="form-outline">
                    <label className="form-label">First Name</label>
                    <input type="text" id="firstName" className="form-control form-control-lg" {...register("firstName", { required: true })} />
                   
                    {errors.firstName && <span className='text-danger'>This field is required</span>}
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div data-mdb-input-init className="form-outline">
                    <label className="form-label">Last Name</label>
                    <input type="text" id="lastName" className="form-control form-control-lg" {...register("lastName",{required: true})} />
                    {errors.lastName && <span className='text-danger'>This field is required</span>}
                  </div>
                <div data-mdb-input-init className="form-outline">
                    <label className="form-label">Username</label>
                    <input type="text" id="username" className="form-control form-control-lg" {...register("uname",{required: true})} />
                    {errors.uname && <span className='text-danger'>This field is required</span>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4 d-flex align-items-center">
                  <label className="form-label">Date of Birth</label>
                  <div data-mdb-input-init className="form-outline datepicker w-100">
                    <input type="date" className="form-control form-control-lg" id="birthdayDate" {...register("dob", { required: "Date is required" })} />
                    {errors.dob && <span className='text-danger'>Date is required</span>}
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <h6 className="mb-2 pb-1">Gender: </h6>
                  <label className="form-check-label">Female</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="femaleGender"
                      value="female" 
                      {...register("gender", { required: "Please select a gender" })} />
                    
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio"  id="maleGender"
                      value="male"
                      {...register("gender", { required: "Please select a gender" })} />
                    <label className="form-check-label">Male</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="otherGender"
                      value="other"
                      {...register("gender", { required: "Please select a gender" })} />
                    <label className="form-check-label">Other</label>
                  </div>
                {errors.gender && <p className="text-danger">Please select a gender</p>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4 pb-2">

                  <div data-mdb-input-init className="form-outline">
                    <label className="form-label">Email</label>
                    <input type="email" id="emailAddress" className="form-control form-control-lg" {...register("email",{required:true})} />
                    
                  {errors.email && <span className='text-danger'>Enter Email Number</span>}
                  </div>

                </div>
                <div className="col-md-6 mb-4 pb-2">

                  <div data-mdb-input-init className="form-outline">
                    <label className="form-label">Phone Number</label>
                    <input type="number" id="phoneNumber" className="form-control form-control-lg" {...register("mob",{required:true,maxLength:10,minLength:10})} />
                    
                    {errors.mob?.type==="required" && <span className='text-danger'>Enter Mobile Number</span>}
                    {errors.mob?.type==="minLength" && <span className='text-danger'>Min 10 Digit</span>}
                    {errors.mob?.type==="maxLength" && <span className='text-danger'>Max 10 Digit</span>}
                  </div>

                </div>
                <div className="form-group col-md-6 my-4">
    <label >Password</label>
   <input type="password" className="form-control" {...register("password",{required:true, minLength:8,maxLength:20})}/>
    {errors.password?.type==="required" && <p className='text-danger'> password is required</p>}
    {errors.password?.type==="minLength" && <p className='text-success'> Min 8 Character</p>}
    {errors.password?.type==="maxLength" && <p className='text-danger'> Not More Than 20 Character</p>}
  </div>
  <div className="form-group col-md-6 my-4">
    <label >Confirm Password</label>
   <input type="password" className="form-control" {...register("confirmPass",{required:true, validate: (value) => value === password})}/>
    {errors.confirmPass?.type==="required" && <p className='text-danger'>Please confirm your password</p>}
    {errors.confirmPass?.type==="validate" && <p className='text-danger'>Passwords do not match</p>}
  </div>
  
              </div>

              <div className="row">
                <div className="col-12">
                   <label className="form-label select-label">Choose option</label>
                  <select className="select form-control-lg" {...register("role", { required:true})}>
                    <option value="Admin" disabled>Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Accounts">Accounts</option>
                  </select>
                 {errors.role?.type==="required" && <p className='text-danger'>Please select a role</p>}

                </div>
              </div>

              <div className="mt-4 pt-2">
                <input data-mdb-ripple-init className="btn btn-primary btn-lg" type="submit" value="Submit" />
              </div>

            </form></div>
  )
}
