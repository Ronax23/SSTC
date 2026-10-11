function EmployeeFields({register, errors}:any) {
        const roles=["customer","manager","cashier","sales-man","helper","accounts","engineer","back-office","security","cleaner","worker"]
  return (
       <>
                                     <div className=" col-12 form-group">
                              <div className="row">  <div className="col-lg-5 col-12">
                                    <label htmlFor="">Employee Type</label>
                                    <select className="form-select mt-2" {...register('empType', { required: true })}>
                                        {roles.map(role => (
                                            <option key={role} value={role}>
                                                {role.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.empType && <p className="text-danger">Employee Type is required</p>}
                                </div>
                                <div className="col-lg-5 col-12">
                                    <label htmlFor="">Salary</label>
                                    <input type="number" className="form-control" id="salary" placeholder='Enter Salary' {...register('salary', { required: true, min: 9999 })} />
                                    {errors.salary?.type==="required" && <p className="text-danger">Salary is required</p>}
                                    {errors.salary?.type === "min" && <p className="text-danger">Salary must be greater than 9999</p>}
                                </div>
                                <div className="col-lg-2 mt-2">
                                    <label htmlFor="overtimeCheck" className='ms-2 mt-4 me-3' >Over Time</label>
                                 <input type="checkbox"className="form-check-input mt-4" id="overtimeCheck"  {...register('overtime')}/>                                  
                                </div>
                                </div>
                                </div>
                                    </>
  )
}

export default EmployeeFields