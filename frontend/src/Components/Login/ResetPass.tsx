import {useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Password from './Password';




function ResetPass() {

    
    const [isRotating, setRotation] = useState(0);
    const [regen,setRegen]= useState("")
    const [step, setStep] = useState<number>(1);
    const navigateDashboard=useNavigate();
    const { register, formState: { errors },trigger,getValues } = useForm({
        mode: "onChange"
      });
      const variants = {
  enter: { x: 100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }
};
const randomgen=()=>{
        const randomchar ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let capcha="";
for(let i=0;i<6;i++)
{
    capcha+=randomchar.charAt(Math.floor(Math.random()*randomchar.length));
}
setRotation(prev => prev + 360);
setRegen(capcha)
    }
useEffect(() => {
    randomgen();
}, [])

      const getUser = async () => {
        const isValid =await trigger("email");
        const verifyCap = getValues("capcha");
        if (!isValid) return;
        const data={email:getValues("email")};
       if(verifyCap===regen)
       {
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
       else{
        toast.error("Wrong Capcha")
       }
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
        <section className="row vh-100 pt-5">
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
                    <div className="capcha my-2 position-relative">
                    <span className="me-4 ">{regen}</span>
                    <motion.i
                    animate={{ rotate: isRotating}}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    style={{cursor:"pointer"}}
                    className="bi bi-arrow-clockwise position-absolute right-0" onClick={randomgen}></motion.i>
                    <input className='my-3 form-control' type="text" {...register("capcha",{required:true,validate:{match: (value) => value === regen}})} />
                    {errors.capcha?.type==="required" &&  <p className='text-light'>Enter Capcha To Proceed</p>}
                    {errors.capcha?.type==="match" &&  <p className='text-light'>Wrong Captcha</p>}

                    </div>
                    
                    <button onClick={getUser} className='btn btn-primary'>Get User</button>
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
                        <input type="text" className="form-control my-3" {...register("otp",{required:true})} />
                        <button className='btn btn-primary' onClick={verifyOtp} >Verify OTP</button>

                        {errors.otp && <span className='ms-3 text-light'>This field is required</span>}
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
                    <Password register={register} errors={errors} />
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