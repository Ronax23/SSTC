import { Doughnut } from 'react-chartjs-2';
import type { BarGraphProps } from '../Loading/Types';

function DounetView({labels,datasets}: BarGraphProps) {
    const data={
        labels:labels,
        datasets:datasets.map((item:any)=>({
            label:item.label,
            data:item.data,
            backgroundColor:item.backgroundColor||['rgba(9, 8, 6, 0.2)','rgba(196, 80, 51, 0.2)'],
            borderColor:item.borderColor||['rgb(143, 192, 75)','rgba(75, 79, 192, 0.2)'],
        }))
    }
  return (
    <>
    <Doughnut data={data}/>
    </>
  )
}

export default DounetView