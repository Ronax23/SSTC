import { Footer_route } from '../Dynamic Routes/Footer_routes.ts'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
     <footer>
        <section className='container'>
            <section className='row'>

            {Footer_route.map((item)=>(
                <section className='col-lg-3 col-md-6 col-sm-12'>
                    <h5 className='footer-heads'>{item.title}</h5>
                    <ul className='list-unstyled'>
                        {item.links.map((link,i)=>(

                            <li key={i} className='footerLink'>
                                {link.External?(<a className=' text-decoration-none text-muted' href={link.links}>{link.Name}</a>):
                                (link.links?<Link to={link.links} className=' text-decoration-none text-muted'>{link.Name}</Link>:<span className='text-muted'>{link.Name}</span>)}
                            </li>

                        ))}
                    </ul>
                </section>
            ))} 
            <section className='col-12 text-center py-3'>
            © {new Date().getFullYear()} Ronax. All rights reserved.
            </section>
        </section>
        </section>
    </footer>
  )
}
