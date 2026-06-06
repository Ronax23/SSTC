import { Doughnut } from 'react-chartjs-2';
import type { BarGraphProps } from '../Loading/Types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
function DounetView(props: BarGraphProps) {
    const data={
        labels:props.labels,
        datasets:props.datasets.map((item:any)=>({
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