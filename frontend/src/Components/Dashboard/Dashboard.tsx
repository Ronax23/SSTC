import {useState} from 'react'
import { sidebar } from '../../assets/Dynamic Routes/Dashboard_routes';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const [collapse, setCollapse] = useState(true)

  const sidebarWidth = collapse ? "60px" : "260px";

  return (
    <div className="container-fluid g-0">
      <div className="d-flex vh-100">
        <div className="bg-success p-3 text-white sidebar" 
          style={{ "--sidebar": sidebarWidth} as React.CSSProperties}>
          <i  onClick={() => setCollapse(!collapse)} style={{backdropFilter:'blur(10px)'}} className={`bi ${collapse ? 'bi-list' : 'bi-x-lg'} bg-danger rounded my-5 p-2`}></i>
               
          <ul className="list-unstyled d-flex flex-column align-items-start my-3">
            {sidebar.map((item, index) => (
              <li className='my-2 text-decoration-none text-light' key={index}>
                <Link to={item.to} className="text-decoration-none">
                  {item.icon}  {!collapse && <span className="text-white">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-grow-1 bg-light p-4">
          <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard