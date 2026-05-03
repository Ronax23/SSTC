import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function AddUser() {
    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({
        mode: "onBlur"
    })
    const isSameAddress = watch("isSameAddress");
    const gst = watch('userType') === 'gst';

    useEffect(() => {
        if (isSameAddress) {
            setValue('firmAddress', watch("address"));
            setValue('firmState', watch("state"));
        }
    }, [isSameAddress, watch("address"), watch("state"), setValue]);

    return (
        <>
            <section className="modal " tabIndex={-1}>
                <section className="modal-dialog ">
                    <section className="modal-content">
                        <section className="modal-header">
                            <h5 className="modal-title">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </section>
                        <section className="modal-body">
                            <form action="">
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



                                <section className="mb-3">
                                    <label htmlFor="type" className="form-label">User Type</label>
                                    <input type="radio" className="form-check-input mx-2" id="type" value="gst"{...register('userType')} />
                                    <label htmlFor="type" className="form-check-label">GST</label>
                                    <input type="radio" className="form-check-input mx-2" id="type" value="user"{...register('userType')} />
                                    <label htmlFor="type" className="form-check-label">Normal</label>
                                    {errors.userType && <p className="text-danger">User Type is required</p>}
                                </section>

                                <section className="row">
                                    <section className="col-lg-6 col-md-6 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="gst" className="form-label">Enter GSTIN</label>
                                            <input type="text" disabled={!gst} className="form-control" id="gst" placeholder='Enter GSTIN' {...register("gstin", {
                                                minLength: 12,
                                                maxLength: 13, required: gst
                                            })} />
                                            {gst && errors.gstin?.type === "required" && <p className="text-danger">GSTIN is required</p>}
                                            {gst && errors.gstin?.type === "minLength" || errors.gstin?.type === "maxLength" && <p className="text-danger">GSTIN must be 12-13 characters</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-6 col-md-6 col-12">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" className="form-control" id="state" placeholder='Enter State' {...register('firmState', { required: !isSameAddress })} disabled={isSameAddress || !gst} />
                                    </section>
                                </section>


                                <section className="mb-3">
                                    <label htmlFor="address" className="form-label">Firm Address</label>
                                    <textarea className="form-control" id="address" placeholder='Enter Firm Address' rows={3} {...register('firmAddress', { required: !isSameAddress })}
                                        disabled={isSameAddress || !gst}></textarea>

                                    <input type="checkbox" className="form-check-input mt-2" id="firmAddressSame" {...register('isSameAddress')} disabled={!gst} />
                                    <label htmlFor="firmAddressSame" className='ms-2 mt-2' >Same As Above</label>
                                </section>
                            </form>
                        </section>
                        <section className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Add User</button>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}

export default AddUser