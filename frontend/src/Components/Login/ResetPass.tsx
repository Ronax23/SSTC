import {useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';




function ResetPass() {
    const [step, setStep] = useState<number>(1);
    const navigateDashboard=useNavigate();
    const [passwordView, setPasswordview] = useState<string>("password");
    const { register, formState: { errors },trigger,getValues } = useForm({
        mode: "onBlur"
      });
      const variants = {
  enter: { x: 100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }
};

      const getUser = () => {
        const isValid = trigger("email");
        if (!isValid) return;
        const data={email:getValues("email")};
        axios.post(`${import.meta.env.VITE_API}check-user`,data).then((res)=>{
            if(res.data.userExists){
                toast.success(res.data.message);
                setStep(2);
             }
             else{
                toast.error(res.data.message);
             }
            }).catch(()=>{
                toast.error("An error occurred while checking the user.");
            })
     }
     const verifyOtp = () => {
        const isValid = trigger("otp");
        if (!isValid) return;
        const data={email:getValues("email"),otp:getValues("otp")};
        axios.post(`${import.meta.env.VITE_API}verify-otp`,data).then((res)=>{
            if(res.data.otpValid){
                toast.success(res.data.message);
                setStep(3);
             }
             else{
                toast.error(res.data.message);
             }
            }).catch(()=>{
                toast.error("An error occurred while verifying the OTP.");
            })
     }

     const resetPassword = () => {
        const isValid = trigger("password");
        if (!isValid) return;
        const data={email:getValues("email"),password:getValues("password"),otp:getValues("otp")};
          axios.patch("http://localhost:8000/reset-password",data).then((res)=>{
            if(res.data.login){
                toast.success(res.data.message);
                setTimeout(()=>{
                    navigateDashboard("/login");
                },2000)
             }
             else{
                toast.error(res.data.message);
             }
            }).catch((err)=>{
                toast.error(err.message || "An error occurred during password reset.");
            })
     }
     
  return (
   <>
   <section id="login">
    <Toaster />

    <section className="container">
        <section className="row">
            <section className="mt-3 col-lg-6 col-md-6 col-12">
                <h2>Reset Password</h2>
                {step===1 && <motion.div
                key="step1"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
                >
                    
                    <section className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" className='my-3 form-control' placeholder='Enter your E-Mail or Mobile Number'
                        {...register("email", { required: true })}
                        />
                        {errors.email && <span className='text-danger'>This field is required</span>}
                    </section>
                    
                    <button type='submit' onClick={getUser} className='btn btn-primary'>Get User</button>
                </motion.div>}

                {step===2 && 
                    <motion.section
                    key="step2"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
                    className="form-group">
                        <label htmlFor="">Enter OTP</label>
                        <input type="text" {...register("otp",{required:true})} />
                        {errors.otp && <span className='text-danger'>This field is required</span>}
                         <button className='btn btn-primary' onClick={verifyOtp} >Verify OTP</button>
                   </motion.section>

                }
               

                {step===3 &&
                 <motion.div
                  key="step3"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
                 >
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
                    <button onClick={resetPassword} className='btn btn-primary'>Reset Password</button>
                    </motion.div>
                    }
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

export default ResetPass