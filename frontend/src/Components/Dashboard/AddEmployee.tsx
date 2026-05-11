import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AddEmployee() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitData = (data: any) => {
        axios.post(`${import.meta.env.VITE_API}addemployee`, data,{withCredentials:true}).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error(err.message || "An error occurred while adding the employee.");
        })}


  return (
    <>
        <Toaster position="top-right" />
            <section className="modal " tabIndex={-1}>
                <section className="modal-dialog ">
                    <section className="modal-content">
                        <section className="modal-header">
                            <h5 className="modal-title">Add Employee</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </section>
                        <section className="modal-body">
                            <form onSubmit={handleSubmit(submitData)}>
                                <section className="row">
                                    <section className="col-lg-4 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input type="text" className="form-control" id="firstName" placeholder='Enter First Name'{...register('fName', { required: true })} />
                                            {errors.fName && <p className="text-danger">First Name is required</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-4 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" placeholder='Enter Last Name'{...register('lName', { required: true })} />
                                            {errors.lName && <p className="text-danger">Last Name is required</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-2 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="age" className="form-label">Date Of Birth</label>
                                            <input type="date" className="form-control" id="age" placeholder='Enter DOB'{...register('dob', { required: true })} />
                                            {errors.dob && <p className="text-danger">DOB Required</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-2 col-md-6 col-12">

                                        <section className="mb-3">
                                            <label htmlFor="gender" className="form-label">Gender</label>
                                            <select className="form-select" id="gender"{...register('gender', { required: true })}>
                                                <option value="">Select Gender</option>
                                                <option value=" male">Male</option>
                                                <option value=" female">Female</option>
                                                <option value=" other">Other</option>
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
                                    <section className="col-lg-4 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                            <input type="text" className="form-control" id="mobile" placeholder='Enter Mobile Number'{...register('mobile', { required: true })} />
                                            {errors.mobile && <p className="text-danger">Mobile Number is required</p>}
                                        </section>

                                    </section>
                                    <section className="col-lg-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder='Enter Email'{...register('email', { required: true })} />
                                            {errors.email && <p className="text-danger">Email is required</p>}
                                        </section>
                                    </section>
                                </section>
                                <div className="col-lg-6 col-12 form-group">
                                <div className="">
                                    <label htmlFor="">Employee Type</label>
                                    <select className="form-select" {...register('empType', { required: true })}>
                                        <option value="manager">Manager</option>
                                        <option value="cashier">Cashier</option>
                                        <option value="sales-men">Sales Man</option>
                                        <option value="helper">Helper</option>
                                        <option value="accounts">Accountant</option>
                                        <option value="engineer">Engineer</option>
                                        <option value="worker">Worker</option>
                                        <option value="operator">Operator</option>
                                    </select>
                                    {errors.empType && <p className="text-danger">Employee Type is required</p>}
                                </div>
                                <div className="">
                                    <label htmlFor="">Salary</label>
                                    <input type="number" className="form-control" id="salary" placeholder='Enter Salary' {...register('salary', { required: true })} />
                                    {errors.salary && <p className="text-danger">Salary is required</p>}
                                </div>
                                </div>

                            </form>
                        </section>
                        <section className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Add Employee</button>
                        </section>
                    </section>
                </section>
            </section>
        </>
  )
}

export default AddEmployee