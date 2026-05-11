import {useEffect,useState} from 'react';
import BarGraph from '../../assets/Reusable/BarGraph';
import DounetView from '../../assets/Reusable/DounetView';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';


interface Investment {
    id: number;
    title: string;
    current: number;
    investedAmount: number;
}

function InvestDash() {
    const [investment,setInvestment]=useState<Investment[]>([]);

    const investdat=()=>{
        axios.get('/api/investment')
        .then(res=>{
            setInvestment(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            toast.error(err.message);
        })
    }
    useEffect(()=>{
        investdat();
    },[])
  return (
   <>
   <Toaster />
   <div className="container-fluid">
    <div className="row">
       {investment.map((item)=>(
         <div className="col-lg-4 col-md-6 col-12" key={item.id}>
            <div className="card bg-info">
                <div className="card-body">
                    <p>{item.title}</p>
                    <h2>{item.current}</h2>
                    <h3>{item.investedAmount}</h3>
                </div>
            </div>
        </div>))}
        <div className="col-lg-6">
            <BarGraph labels={['January', 'February', 'March', 'April', 'May']} datasets={[{label:'Investment Growth',data:[10,20,30,40,50]}]} />
        </div>
        <div className="col-lg-3">
            <DounetView data={investment} />
        </div>
        <div className="col-lg-3">
            <DounetView data={investment} />
        </div>
    </div>
   </div>

   </>
  )
}

export default InvestDash