import axios from 'axios';
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form'

interface Invoice {
id?:String,
Date:Date,

}

function Invoice() {
    const {id}=useParams()
    const edit=Boolean(id)

    const { register, handleSubmit, reset, error } = useForm();

    const invoiceGet=async()=>{
        axios.get('${import.meta.env.VITE_API}/invoice/${id}',{withCredentials:true}).then((res)=>{
            reset(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        if(edit){
            invoiceGet();
        }
    },[id,edit])

    const invocePost = async (e:any)=>{
        axios[edit?'put':'post']('${import.meta.env.VITE_API}/invoice/${edit? edit/${id}:"add"}',FormData,{withCredentials:true}).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const [taxType,setTaxType] = useState("local");
    const [field,addField] = useState([{ id: crypto.randomUUID() }]);
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
                    <form onSubmit={handleSubmit(invocePost)}>
                     <div className="row">
                           <div className="col-12">
                            <label htmlFor="">Invoice Type</label>
                            <input type="radio" /> <label htmlFor="">Invoice Inventory Sales</label>
                            <input type="radio" /> <label htmlFor="">Invoice Custom Sales</label>
                            <input type="text" placeholder='Invoice Number' />
                            <input type="date" placeholder='Invoice Date' />

                        </div>
                       <div className=" p-2" style={{ height: '65vh', overflowY: 'scroll', overflowX: 'hidden' }}>
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
                            
                            <button className='btn'>UPI</button>
                            <button className='btn'>Cash</button>
                            <button className='btn'>Card</button>
                            <button className='btn'>Online</button>
                            <button className='btn'>Cheque</button>
                            <button className='btn'>Credit</button>
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