import {useState} from 'react'


function Password({ register, errors }: { register: any, errors: any }) {
        
        const [passwordView, setPasswordview] = useState<"password"|"text">("password");
  return (
    <>
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
                        {errors.password?.type === "required" && <span className='text-light'>This field is required</span>}
                    </section>
    </>
  )
}

export default Password