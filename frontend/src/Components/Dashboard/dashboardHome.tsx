import axios from 'axios';
import {useState,useEffect} from 'react'
import LoaderError from '../../assets/Reusable/LoaderError';
import BarGraph from '../../assets/Reusable/BarGraph';
import DounetView from '../../assets/Reusable/DounetView';
function dashboardHome() {
    const [data,setData]=useState<any>([]);
    const [loading,setLoading]=useState(true);

    // useEffect(()=>{
    //     axios.get("http://localhost:8000/dashboard",
           
    //     ).then((res)=>{
    //         setData(res.data);
    //         console.log(res.data);
    //         setLoading(false);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // },[])
    
    // if(loading){return <LoaderError loading={true}/>}

  return (
    <>
    <div className="container-fluid">
        <div className="row">
            {/* {data.map((item:any,index:number)=>(
                <div className="col-lg-3" key={index}>
                    <div className="card my-3">
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.count}</p>
                        </div>
                    </div>
                </div>
            ))} */}
<div className="row">
  <div className="col-lg-4 col-md-6 col-12">
    <DounetView labels={['Label 1', 'Label 2']} datasets={[{ label: 'Dataset 1', data: [10, 20] }]} />
  </div>
    <div className="col-lg-4 col-md-6 col-12">
    <BarGraph labels={['Label 1', 'Label 2']} datasets={[{ label: 'Dataset 1', data: [10, 20] }]} />
  </div>
</div>
           
        </div>
    </div>
    
    </>
  )
}

export default dashboardHome