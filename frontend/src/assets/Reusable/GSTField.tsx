import  { useState,useEffect } from 'react'

function GSTField({register, errors, watch, setValue, userType, edit, unregister}:any) {
const formValues = watch();
    const [gst, setGst] = useState(Boolean(formValues?.GST || formValues?.firmName));   
         const address = watch("address"),state = watch("state");
    const [isSameAddress,setIsSameAddress   ] = useState(false)
     useEffect(() => {
if(!gst){
          unregister(['firmName', 'firmAddress', 'firmState', 'GST']);
       setIsSameAddress(false);
    }}, [gst,unregister]);
    useEffect(() => {
        if (isSameAddress) {
            setValue('firmAddress', address);
            setValue('firmState', state);
        }
    }, [isSameAddress,address,state, setValue]);

  return (
    <>
          <section className="mb-3">
                                    <label htmlFor="type" className="form-label text-Capitalize">{userType.toUpperCase()} TYPE</label>
                                    <input type="radio" className="form-check-input mx-2" id="type" value="gst" checked={gst} onChange={()=>setGst(true)}/>
                                    <label htmlFor="type" className="form-check-label">GST</label>
                                    <input type="radio" className="form-check-input mx-2" id="type" value="user" checked={!gst} onChange={()=>setGst(false)}/>
                                    <label htmlFor="type" className="form-check-label">Normal</label>
                                </section>

                               {gst && (
                                <>
                                 <section className="row">
                                    <section className="col-lg-4 col-md-4 col-12">
                                        <label htmlFor="state" className="form-label">Firm Name</label>
                                        <input type="text" className="form-control" id="state" placeholder='Enter State' {...register('firmName', { required: true })} disabled={ !gst} />
                                        {gst && errors.firmName && <p className="text-danger">Firm Name is required</p>}
                                    </section>
                                    <section className="col-lg-4 col-md-4 col-12">
                                        <section className="mb-3">
                                            <label htmlFor="gst" className="form-label">Enter GSTIN</label>
                                            <input type="text" disabled={!gst || edit} className="form-control" id="gst" placeholder='Enter GSTIN' {...register("GST", {
                                                minLength: 12,maxLength: 13, required: gst})} />
                                            {gst && errors.GST?.type === "required" && <p className="text-danger">GSTIN is required</p>}
                                            {gst && (errors.GST?.type === "minLength" || errors.GST?.type === "maxLength") && <p className="text-danger">GSTIN must be 12-13 characters</p>}
                                        </section>
                                    </section>
                                    <section className="col-lg-4 col-md-4 col-12">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" className="form-control" id="state" placeholder='Enter State' {...register('firmState', { required: !isSameAddress })} disabled={isSameAddress || !gst} />
                                        {gst && !isSameAddress && errors.firmState && <p className="text-danger">Firm State is required</p>}
                                    </section>
                                </section>


                                <section className="mb-3">
                                    <label htmlFor="address" className="form-label">Firm Address</label>
                                    <textarea className="form-control" id="address" placeholder='Enter Firm Address' rows={3} {...register('firmAddress', { required: !isSameAddress })}
                                        disabled={isSameAddress || !gst}></textarea>
                                        {gst && !isSameAddress && errors.firmAddress && <p className="text-danger">Firm Address is required</p>}

                                    <input type="checkbox" className="form-check-input mt-2" id="firmAddressSame" checked={isSameAddress} onChange={(e) => setIsSameAddress(e.target.checked)} />
                                    <label htmlFor="firmAddressSame" className='ms-2 mt-2' >Same As Above</label>
                                </section>
                                </>
                               )}
        </>
  )
}

export default GSTField