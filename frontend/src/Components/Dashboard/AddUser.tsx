import axios from 'axios';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, {Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import LoaderError from '../../assets/Reusable/LoaderError';
import GSTField from '../../assets/Reusable/GSTField';
import Password from '../Login/Password';
import EmployeeFields from '../../assets/Reusable/EmployeeFields';
interface Users{
    userType: 'employee' | 'admin'|'supplier'|'customer',
    main?: boolean;
}
function AddUser({userType, main=false}:Users) {
    const { register, handleSubmit, formState: { errors }, watch, setValue,reset,unregister } = useForm({
        mode: "onBlur",shouldUnregister: true
    })
    const navigate=useNavigate();
const closerModal = () => {
  if (main) {
    navigate(-1);
  } else {
    navigate('/dashboard/userList');
  }
};   
    const [loading, setloading] = useState(false);
    const {id}=useParams()
    const edit=Boolean(id)

    const pan=()=>{
        return<>
        <div className="col-lg-3">
            <label htmlFor="pan" className="form-label">PAN Number</label>
            <input type="text" className="form-control" id="pan" placeholder='Enter PAN Number' {...register('PAN', { required: true,minLength: 10,maxLength: 10 })} />
            {errors.PAN?.type==='required' && <p className="text-danger">PAN Number is required</p>}
            {(errors.PAN?.type === 'minLength' &&errors.PAN?.type === 'maxLength') && <p className="text-danger">PAN Number must be 10 characters</p>}
        </div>
        </>
    }

    let profileType:string,role:string;

    const fetchdat=()=>{
        setloading(true)
        axios.get(`${import.meta.env.VITE_API_URL}/getUser/${id}`).then(res => {
           if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
            reset(res.data);
          } else {
            toast.error('Invalid user data received');
            closerModal();
            console.error('Unexpected response:', res.data);
          }
        }).catch(() => toast.error("Failed to fetch user data")).finally(() => setloading(false))
    }

    const submitData = (data: any) => {
            if(userType=='employee'){
        profileType="employee"
        role=data.empType
    }
    else if(userType=='admin'){
        profileType="admin"
        role = "admin";
    }
    else if(userType=='supplier')
    {        
        profileType="supplier"
        role = "supplier";
    }
   else{
    profileType="customer"
    role = "customer";
   }
        const finaldat={...data,role,profileType}
        console.log(finaldat)
        setloading(true)
        axios[edit? "put":"post"](`${import.meta.env.VITE_API}users/${edit ? `update/${id}` : 'add'}`, finaldat)
            .then(res => {

                    if(res.data.status===201){
                    toast.success(res.data.message || "User added successfully");
}
else{
                    toast.error(res.data.message || "Failed to add user");
}
           })
            .catch(err => {
                toast.error(`Failed to add user ${err.message || ''}`);
            }).finally(() => setloading(false))
    }
    useEffect(() => {
       if (edit && id) fetchdat();
    }, [id,edit])
   
    return (
        <>
        <Toaster position="top-right" />
            <section className="modal " tabIndex={-1}>
                <section className="modal-dialog ">
                    <section className="modal-content">
                        <section className="modal-header">
                            <h5 className="modal-title">{`${edit? "Edit" : "Add"} ${userType}`}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={closerModal} aria-label="Close"></button>
                        </section>
                        {loading && <LoaderError loading={true} />}
                        <form style={{display: loading ? 'none' : 'block'}} onSubmit={handleSubmit(submitData)}>
                        <section className="modal-body">                            
                                <section className="row">
                                    <section className="col-lg-4 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input type="text" disabled={edit} className="form-control" id="firstName" placeholder='Enter First Name'{...register('firstName', { required: true })} />
                                            {errors.firstName && <p className="text-danger">First Name is required</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-4 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input type="text" disabled={edit} className="form-control" id="lastName" placeholder='Enter Last Name'{...register('lastName', { required: true })} />
                                            {errors.lastName && <p className="text-danger">Last Name is required</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-2 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="age" className="form-label">Date Of Birth</label>
                                            <input type="date" disabled={edit} className="form-control" id="age" placeholder='Enter DOB'{...register('dob', { required: true })} />
                                            {errors.dob && <p className="text-danger">DOB Required</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-2 col-md-6 col-12">

                                        <section className="mb-3">
                                            <label htmlFor="gender" className="form-label">Gender</label>
                                            <select className="form-select" id="gender"{...register('gender', { required: true })}>
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.gender && <p className="text-danger">Gender is required</p>}
                                        </section>
                                    </section>
                                </section>
                                <section className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea className="form-control" id="address" placeholder='Enter Address' rows={3} {...register('address', { required: true })}></textarea>
                                    {errors.address && <p className="text-danger">Address is required</p>}
                                </section>
                                <section className="row">
                                    <section className="col-lg-2 col-md-6 col-12">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" className="form-control" id="state" placeholder='Enter State' {...register('state', { required: true })} />
                                        {errors.state && <p className="text-danger">State is required</p>}
                                    </section>
                                    <section className="col-lg-3 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                            <input type="text" className="form-control" id="mobile" placeholder='Enter Mobile Number'{...register('mob', { required: true,maxLength:10,minLength:10 })} />
                                            {errors.mobile && <p className="text-danger">Mobile Number is required</p>}
                                            {(errors.mob?.type === "maxLength" || errors.mob?.type === "minLength") && (<p className="text-danger small mt-1">Mobile number must be exactly 10 digits</p>)}                                        
                                            </section>
                                    </section>
                                    <section className="col-lg-4 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" disabled={edit} className="form-control" id="email" placeholder='Enter Email'{...register('email', { required: true })} />
                                            {errors.email && <p className="text-danger">Email is required</p>}
                                        </section>
                                    </section>
                                     {userType ==='admin' && pan()}
                                </section>
                                {userType !== 'employee' && <GSTField register={register} errors={errors} watch={watch} setValue={setValue} reset={reset} userType={userType} edit={edit} unregister={unregister} />}
                                {userType === 'employee' && <EmployeeFields register={register} errors={errors} />}
                              {main &&  <Password  register={register} errors={errors} />  }                          
                        </section>
                        <section className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closerModal}>Close</button>
                            <button type="submit" className="btn btn-primary text-Capitalize" disabled={loading}>{edit ? "Update" : "Add"} {userType}</button>
                        </section>
                         </form>
                    </section>
                </section>
            </section>
        </>
    )
}

export default AddUser