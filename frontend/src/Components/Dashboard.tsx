import {useState} from 'react'
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const [collapse, setCollapse] = useState(true)
  const sidebar=
  [    {name:"Dashboardhome",icon:"🏠"} ,
    {name:"UserList",icon:"👥"} ,
    {name:"Invoice",icon:"📊"} ,
    {name:"Settings",icon:"⚙️"}
  ]
  const sidebarWidth = collapse ? "60px" : "260px";

  return (
    <div className="container-fluid g-0">
      <div className="d-flex vh-100">
        <div className="bg-success p-3 text-white sidebar" 
          style={{ "--sidebar": sidebarWidth}}>
          <i  onClick={() => setCollapse(!collapse)} style={{backdropFilter:'blur(10px)'}} className={`bi ${collapse ? 'bi-list' : 'bi-x-lg'} bg-danger rounded my-5 p-2`}></i>
               
          <ul className="list-unstyled d-flex flex-column align-items-start my-3">
            {sidebar.map((item, index) => (
              <li className='my-2 text-decoration-none text-light' key={index}>
                <Link to={item.name.toLowerCase()}>
                  {item.icon} {!collapse && item.name}
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