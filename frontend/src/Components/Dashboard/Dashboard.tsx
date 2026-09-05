import { useLayoutEffect, useState } from 'react';
import { sidebar } from '../../assets/Dynamic Routes/Dashboard_routes';
import { Link, Outlet} from 'react-router-dom';
import AuthRole from './AuthRole';

function Dashboard() {
  const [collapse, setCollapse] = useState(true);
  const { role } = AuthRole();
  const [sidebarWidth,setSidebarWidth] = useState("260px");


   const handleResize = () => {
      const width = window.innerWidth;
      if (width < 450) {
        setSidebarWidth(collapse ?'90px':'100%');
      } else if (width < 992) {
        setSidebarWidth(collapse ?'70px':'260px');
      } else {
        setSidebarWidth(collapse ? '70px' : '260px');
      }
      
    };
  useLayoutEffect(() => {
  handleResize(); 
 window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [collapse]);


 return (
    <div className="container-fluid g-0">
      <div className="d-flex vh-100 position-relative">
        <div className="p-3 text-white sidebar" 
            onMouseEnter={() => setCollapse(false)}
            onMouseLeave={() => setCollapse(true)}
            style={{ 
            width: sidebarWidth,
            position: sidebarWidth === '100%' ? 'absolute' : 'relative',
            zIndex: 1050,
            height: '100vh',
             "--sidebar": sidebarWidth } as React.CSSProperties}>
          <i  onClick={() => setCollapse(!collapse)}
            
          style={{backdropFilter:'blur(10px)'}} className={`bi ${collapse ? 'bi-list' : 'bi-x-lg'} sidebar-button rounded my-5 p-2`}></i>
               
          <ul className="list-unstyled d-flex flex-column align-items-start my-3">
            {sidebar.map((item, index) =>{
                const allowedItem=item.links.filter((link) => link.role.includes(String(role||"admin")));
                if(allowedItem.length===0) return null;
                const dropdownCheck=allowedItem.length>1;
                const collapseId=`collapse-${index}`;
             return(
              <li className='my-2 w-100' key={index}>
                  {!dropdownCheck ? (
                    <Link 
                      to={allowedItem[0].to} 
                      className={`text-decoration-none d-flex align-items-center gap-3 p-2 rounded text-white ${location.pathname.endsWith(allowedItem[0].to) ? 'bg-primary' : 'opacity-75'}`}
                    >
                      <span className="fs-5 text-center" style={{ width: '24px' }}>
                        {allowedItem[0].icon || item.icon}
                      </span>
                      {!collapse && <span>{allowedItem[0].name}</span>}
                    </Link>

                  ) : (
              <>
              <button className="btn btn-toggle text-light align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="true">
          <div className="d-flex align-items-center gap-3">
                          <span className="fs-5 text-center" style={{ width: '24px' }}>{item.icon}</span>
                          {!collapse && <span>{item.title}<i className="bi bi-chevron-down small opacity-50 ms-2"></i></span>}
                        </div>
                                </button>
        <div className="collapse " id={collapseId}>
          <ul className="btn-toggle-nav list-unstyled fw-normal  pb-1 small">
            {allowedItem.map((subItem, subIndex) => (
              <li key={subIndex}>
                <Link
                  to={subItem.to}
                  className={`text-decoration-none text-light d-flex align-items-center gap-3 p-2 rounded ${location.pathname.endsWith(subItem.to) ? 'bg-primary' : 'opacity-75'}`}
                >
                  <span className="fs-5 text-center" style={{ width: '24px' }}>
                    {subItem.icon || item.icon}
                  </span>
                  {!collapse && <span>{subItem.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </>
              )
            }
            </li>)})}
          </ul>
        </div>
      
        

        <div className="flex-grow-1 bg-light p-4">
          <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;