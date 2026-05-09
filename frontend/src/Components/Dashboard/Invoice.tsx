import axios from 'axios';
import React from 'react'

function Invoice() {
    const invocePost = async (e:any)=>{
        axios.post('http://localhost:3000/invoice',FormData,{withCredentials:true}).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const [taxType,setTaxType] = React.useState("local");
    const [field,addField] = React.useState([{ id: crypto.randomUUID() }]);
    const addInv=()=>{
        addField([...field,{ id: crypto.randomUUID() }]);
    }
    const deleteInv=(ind:any)=>{
        const updatedFields = field.filter(( i) => i.id !== ind);
        addField(updatedFields);
    }
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <form action="">
                     <div className="row">
                           <div className="col-12">
                            <label htmlFor="">Invoice Type</label>
                            <input type="radio" /> <label htmlFor="">Invoice Inventory Sales</label>
                            <input type="radio" /> <label htmlFor="">Invoice Custom Sales</label>
                            <input type="text" placeholder='Invoice Number' />
                            <input type="date" placeholder='Invoice Date' />

                        </div>
                       <div className=" p-2" style={{ height: '65vh', overflowY: 'scroll'   }}>
                         {field.map((item:any)=>(
                            <div className="row mt-3" key={item.id}>
                        <div className="col-lg-2 col-md-2">
                            <input type="text" className='w-100' placeholder='Product Name' />
                        </div>
                        <div className="col-1">
                            <input type="text" placeholder='HSN Code' />
                        </div>
                        
                        <div className="col-1">
                            <input type="text" placeholder='qty' />
                        </div>
                        <div className="col-1">
                            <input type="text" placeholder='Price' />
                        </div>
                        <div className="col-4">
                            <input type="text" placeholder='Total' />
                        </div>
                        <div className="col-1">
                            {item.id === field[field.length - 1].id ? (
                                <i className="btn btn-primary" onClick={addInv}>Add</i>
                            ) : (
                                <i className="btn btn-danger" onClick={()=>deleteInv(item.id)}> Delete</i>
                            )}
                        </div>
                        </div>))}
                       </div>
                       <div className="part col-lg-4 col-md-4 col-12 justify-content-end gap-2">
                        <p>Total = ₹{}</p>
                        {taxType == "local" ? (
                            <>
                            <p>CGST {}% = ₹{}</p>
                            <p>SGST {}% = ₹{}</p>
                            </>
                        ) : (
                           <p>IGST {}% = ₹{}</p>
                        )}
                        <p>Grand Total = ₹{}</p>
                        <label htmlFor="">Payment Mode</label>
                        <div className="pay d-flex gap-2">
                            
                            <button>UPI</button>
                            <button>Cash</button>
                            <button>Card</button>
                            <button>Online</button>
                            <button>Cheque</button>
                            <button>Credit</button>
                        </div>
                       </div>
                     </div>
                        </form>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Invoice