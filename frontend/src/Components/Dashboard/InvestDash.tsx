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
    const data={
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Inventory Sales (₹)",
                data: [43200, 71500, 28900, 84100, 56300, 61000],
                backgroundColor: [
                    "rgba(45, 120, 180, 0.4)",
                    "rgba(190, 65, 30, 0.4)",
                    "rgba(80, 155, 70, 0.4)",
                    "rgba(210, 140, 10, 0.4)",
                    "rgba(110, 40, 195, 0.4)",
                    "rgba(30, 185, 160, 0.4)"
                ],
                borderColor: [
                    "rgba(45, 120, 180, 1)",
                    "rgba(190, 65, 30, 1)",
                    "rgba(80, 155, 70, 1)",
                    "rgba(210, 140, 10, 1)",
                    "rgba(110, 40, 195, 1)",
                    "rgba(30, 185, 160, 1)"
                ]
            }
        ]
    }
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
            <DounetView labels={data.labels} datasets={data.datasets} />
        </div>
        <div className="col-lg-3">
            <DounetView labels={data.labels} datasets={data.datasets} />
        </div>
    </div>
   </div>

   </>
  )
}

export default InvestDash