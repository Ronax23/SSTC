import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Nav_Route } from '../Dynamic Routes/Nav_routes.ts'
import type { NavType } from '../Loading/Types.ts';

function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [drop,setdrop]=useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
   <nav className={`navbar navbar-expand-lg ${scrolled ? 'nav-bgs' : 'bg-body-transparent'}`}>
  <section className={`container-fluid p-3  `}>
    <Link className="navbar-brand text-light" to="/"><img src="../Logos/SSTC.svg" alt="SSTC Logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <section className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
       {Nav_Route.map((item:NavType, index:number) => (
         item.Dropdown ? (
            <li className="nav-item dropdown p-2" key={index}
              onMouseEnter={()=>setdrop(index)}
          onMouseLeave={()=>setdrop(null)}>
          <Link className={`nav-link dropdown-toggle  ${drop==index?"show":""} `} to={item.links} role="button"  aria-expanded="false"
        
          >
            {item.Name}
          </Link>
          <ul className={`dropdown-menu ${drop===index?"show":""}`}>
            {item.Dropdown.map((subItem: any) => (
              <li key={subItem.id}>
                <Link className="dropdown-item" to={subItem.links}>{subItem.Name}</Link>
              </li>
            ))}
          </ul>
        </li>) : (
             <li className="nav-item p-2" key={index}>
          <Link className="nav-link active" aria-current="page" to={item.links}>{item.Name}</Link>
        </li>
        )
       ))}
      </ul>
    </section>
  </section>
</nav>
  )
}

export default Nav
