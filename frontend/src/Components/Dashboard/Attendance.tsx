import {useLayoutEffect, useState} from 'react'
interface Attendance {
    date:string;
    checkin_time:string;
    checkout_time:string;
    break_duration?:string;
}
function Attendance() {
  const [status, setStatus] = useState<String>('Not Checked In');
  const [time, setTime] = useState<String>(new Date().toLocaleTimeString());
   useLayoutEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-12">
             <div className="row mb-5">
                   <div className="col-lg-4">
                    <h2>Total Days</h2>
                </div>
                <div className="col-lg-4">
                    <h2>Holidays</h2>
                </div>
                <div className="col-lg-4">
                    <h2>Present Days</h2>
                </div>
             </div>
            </div>
            <div className="col-12">
                <h2>Attendance</h2>
                <h5>{new Date().toLocaleDateString()}</h5>
                <h6>Time: {time}</h6>
                <p> <span className={`badge 
                    ${status === 'Checked In' ? 'bg-success' :
                status === 'On Break' ? 'bg-warning text-dark' :
                status === 'Checked Out' ? 'bg-secondary' : 'bg-danger'}`}>Status: {status} </span></p>
                {status === 'Not Checked In' && (
                    <button className="btn btn-success" onClick={() => setStatus('Checked In')}>Check In</button>
                )}
                {status === 'Checked In' && (
                    <>
                        <button className="btn btn-warning mx-2" onClick={() => setStatus('On Break')}>On Break</button>
                        <button className="btn btn-danger" onClick={() => setStatus('Checked Out')}>Check Out</button>
                    </>
                )}
            </div>
            <div className="col-12">
               <table className="table">
                    <thead>
                        <th>Summary</th>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Check In Time</th>
                            <th scope="col">Check Out Time</th>
                            <th scope="col">Break Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{new Date().toLocaleDateString()}</td>
                            <td>{new Date().toLocaleTimeString()}</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Attendance