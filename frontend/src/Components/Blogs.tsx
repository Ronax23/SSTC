import {useState, useEffect} from 'react'
import axios from 'axios';
import HeaderReusable from '../assets/Reusable/HeaderReusable';
import type{Blog,Paginate } from '../assets/Loading/Types';

function Blogs() {
    const [blogs,setBlogs]=useState<Blog[]>([]);
    const [page,setPage]=<Paginate>useState(1);
    const getBlogs=()=>{
        axios.get(`${import.meta.env.VITE_API}/blogs?page=${page}`).then((res)=>{
            setBlogs(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getBlogs();
    },[])
  return (
    <>
    <HeaderReusable title="Blogs" image="" />
    <section className="container">
        <section className="row">
            {blogs.map((blog)=>(
                    <section key={blog.id} className="col-lg-4 col-md-6 col-12">
                        <div className="card my-3">
                            <div className="card-img-top">
                                <img src={blog.image} alt={blog.title} className='' />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.content}</p>
                            </div>
                        </div>
                    </section>
                ))}
                </section>
                <div className="pagination">
      
  <ul className="pagination">
    <li className="page-item" onClick={() => setPage(page>1?page - 1:1)}> <span className='page-link' aria-hidden="true">&laquo;</span></li>
    <li className="page-item"><span className="page-link active">{page}</span></li>
    <li className="page-item" onClick={() => setPage(Math.min(page + 1, total))}><span className='page-link' aria-hidden="true">&raquo;</span></li>
  </ul>

    </div>
    </section>
    </>
  )
}

export default Blogs