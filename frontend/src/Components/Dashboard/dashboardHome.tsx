import axios from 'axios';
import {useState,useEffect} from 'react'
import LoaderError from '../../assets/Reusable/LoaderError';

function dashboardHome() {
    const [data,setData]=useState<any>([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get("http://localhost:8000/dashboard").then((res)=>{
            setData(res.data);
            console.log(res.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    if(loading){
        return <div><LoaderError loading={true}/></div>
    }
  return (
    <>
    <div className="container-fluid">
        <div className="row">
            {data.map((item:any,index:number)=>(
                <div className="col-lg-3" key={index}>
                    <div className="card my-3">
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.count}</p>
                        </div>
                    </div>
                </div>
            ))}

           
        </div>
    </div>
    
    </>
  )
}

export default dashboardHome