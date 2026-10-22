import axios from 'axios';
import {useEffect,useRef,useState} from 'react'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast/headless';
import { Outlet,Link } from 'react-router-dom';
import LoaderError from '../../assets/Reusable/LoaderError';
interface Blog{
  id:string;
    title:string;
    content:string;
    img:string;
    tags:string[];
    duration:string;
}
  const snapTime=new Date();
function BlogList() {
  const scrollref=useRef<HTMLDivElement>(null);;
    const [isPressed, setIsPressed] = useState(false);
    const [blogs,setBlogs]=useState<Blog[]>([]);
    const [page,setPage]=useState<number>(1);
    const [blogname,setBlogname]=useState<string>('');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  let topBlogId = blogs.length > 0 ? blogs[0].id : null;
  //   useEffect(() => {
  //   loadingRef.current = loading;
  // }, [loading]);
   useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setSearch(blogname);
    }, 500); // Adjust the delay as needed
    return () => clearTimeout(debounceSearch);
  }, [blogname]);
   useEffect(() => {
    if (search) {
      setBlogs([]); // Clear current blogs for new search
      setPage(1); // Reset to first page for new search
    hasMoreRef.current = true;
    }
  }, [search]);
  const getBlogs=()=>{
        if (loadingRef.current || !hasMoreRef.current) return;
            loadingRef.current = true; // Lock instantly
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API}blogs`,{
    params: {
      ...(search ? { title: search } : {}), // Send 'title' instead of 'query'
      page: page,
      before: snapTime
    },withCredentials:true}).then((res)=>{
        setBlogs((prev) => (page === 1 ? res.data.blog || [] : [...prev, ...res.data.blog || []]));
                hasMoreRef.current = res.data.blog && res.data.blog.length > 0;

        console.log(`${import.meta.env.VITE_API}blogs${search?`/search?title=${search}`:''}?page=${page}&before=${snapTime}`)
    }).catch((err)=>{
      toast.error(err.response?.data?.message || "Error fetching blogs");
    }).finally(() => {
        loadingRef.current = false; // Unlock
        setLoading(false);
      });
  }
  useEffect(()=>{
    getBlogs();
  },[page,search])
useEffect(() => {
   let element=scrollref.current;
   if(!element) return;
    const handleScroll = () => {
      if (element.scrollTop + element.clientHeight >= element.scrollHeight - 100 && !loadingRef.current&& hasMoreRef.current) {
        setPage((prev) => prev + 1); // Trigger next page
      }
    };
    element.addEventListener('scroll', handleScroll,{passive:true});
    return () => element.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
    <div className="container">
      <Toaster />
        <div className="row justify-content-end">
            <div className="col-12"><h1>Blog List</h1></div>
            <div className="col-lg-4 col-md-6 position-relative">
                    <input type="text" className="form-control" placeholder="Search..." onChange={(e)=>setBlogname(e.target.value)} />
                    <i className="bi bi-search position-absolute top-0 end-0 border-0 p-2 me-2"  onClick={()=>{setSearch(blogname)}}
                    
                    style={{ 
    cursor: 'pointer',
    borderRadius: '50%', // Ensures the background blur is circular
    transition: 'background-color 0.15s ease, backdrop-filter 0.15s ease, transform 0.1s ease',    
    backgroundColor: isPressed ? 'rgba(255, 255, 255, 0.2)' : 'transparent', 
    backdropFilter: isPressed ? 'blur(8px)' : 'none',
    transform: isPressed ? 'scale(0.92)' : 'scale(1)',     // Slight push-down feel
  }}
onMouseDown={() => setIsPressed(true)}
  onMouseUp={() => setIsPressed(false)}
  onMouseLeave={() => setIsPressed(false)}
  onTouchStart={() => setIsPressed(true)}
  onTouchEnd={() => setIsPressed(false)}
                    
                    />
                </div>
            <div className="row ">
                
                <div ref={scrollref} className="col-lg-4 col-md-5 col-12" style={{maxHeight:'80vh',overflowY:'auto'}}>
{blogs.map((blog:Blog,index:number)=>(
            <div className="col-12 my-5" key={index} >
                <Link className="row vh-80" to={`/dashboard/viewBlogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="col-4">
                        <img src={blog.img} alt="" className="img-fluid" />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title text-center">{blog.title}</h5>
                            <p className="card-text">{blog.content.substring(0, 50)}...</p>
                        </div>
                    </div>
                </Link>
                </div>))}
                {loading && <LoaderError loading={true} />}
                </div>
                <div className="col-lg-8 col-lg-7 col-12">
                <Outlet context={{topBlogId}} />
                </div>
            </div>
    </div>
    </div>
    </>
  )
}

export default BlogList