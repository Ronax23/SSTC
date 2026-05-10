import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { BarGraphProps } from '../Loading/Types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarGraph({ labels, datasets }: BarGraphProps) {
    const data={
        labels: labels,
       datasets:datasets.map((item)=>({ 
        label:item.label,
        data:item.data,
        backgroundColor:item.backgroundColor||['rgba(171, 75, 192, 0.2)','rgba(81, 75, 192, 0.2)'],
        borderColor:item.borderColor||['rgb(97, 75, 192)','rgba(192, 75, 184, 0.2)'],
        borderWidth:1,
        borderRadius:5
       }))  
        
    }
  return (
    <>
    <Bar data={data} redraw={true} />
    </>
  )
}

export default BarGraph