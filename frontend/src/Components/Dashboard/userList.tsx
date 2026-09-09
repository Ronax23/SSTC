import {useState, useEffect } from 'react'
import LoaderError from '../../assets/Reusable/LoaderError';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function userList() {

    const [isPressed, setIsPressed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [duser,setUser]=useState<any>({});
    const [data,setData]=useState<any>([]);
    const [page,setPage]=useState(1);
    const [total,setTotal]=useState(0);
    const [loading,setLoading]=useState(true);
    const [search,setSearch]=useState<string>('');
    const [searchUser, setSearchUser] = useState<string>('');

    const delUser=async(id:string)=>{
        axios.delete(`http://localhost:8000/userlist/${id}`).then((res)=>{
            userData();
            toast.success(res.data.message);
        }).catch((err)=>{
            toast.error(err.message || "An error occurred while deleting the user."); 
        }).finally(()=>{
            setShowModal(false);
            setUser({});
        })
    }



   const userData = async () => {
    setLoading(true);
    
    const searchParam = search ? `/search?query=${encodeURIComponent(searchUser)}&` : '?';
    
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/userlist${searchParam}page=${page}`
      );
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const result = await res.json();
      setTotal(result.total);
      setData(result.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to load users. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

    useEffect(()=>{
        userData()
    },[page])

    if(loading){
        return <div><LoaderError loading={true}/></div>
    }

  return (
    <>
    <Toaster/>
    <div className="tablesdat">
      <div className="row justify-content-end">
          <div className="col-12"><h1>User List</h1></div>
            <div className="col-lg-4 col-md-6 position-relative mb-3">
                    <input type="text" className="form-control" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)} />
                    <i className="bi bi-search position-absolute top-0 end-0 border-0 p-2 me-2"  onClick={()=>{userData(); setSearchUser(search)}}
                    
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
      </div>
            <table className="table">
        <thead>
            <tr>
                <th>S.No</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">BloodGroup</th>
                <th scope="col">Age</th>
                <th>Action</th>
            </tr>
    </thead>
    <tbody>
       {data.map((user: any,i:number) => (
            <tr>
                <td>{i+1+(page-1)*10}</td>
                <td><img src={user.image} alt="" style={{width:"50px"}} /></td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.bloodGroup}</td>
                <td>{user.age}</td>
                <td><div className="dropdown">
  <button
    className="btn btn-sm btn-light"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >⋮</button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item"> View</button></li>
<li>  <Link className="dropdown-item" to={`/dashboard/editUser/${user._id}`}> Edit</Link></li>
<li><button className="dropdown-item text-danger" onClick={() => {
      setUser(user._id);
      setShowModal(true);
    }}> Delete</button></li>
  </ul></div></td> </tr>
        ))}
    </tbody>
</table>
    </div>
    <div className="pagination">
      
  <ul className="pagination">
    <li className={`page-item ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page>1?page - 1:1)}> <span className='page-link' aria-hidden="true">&laquo;</span></li>
    <li className="page-item"><span className="page-link active">{page}</span></li>
    <li className={`page-item ${page >= total ? 'disabled' : ''}`} onClick={() => setPage(Math.min(page + 1, total))}><span className='page-link' aria-hidden="true">&raquo;</span></li>
  </ul>

    </div>

{showModal && <div className="modal" style={{display:"block"}} onClick={() => setShowModal(false)}>
  <div className="modal-dialog">
    <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
      <div className="modal-header">
        <h5 className="modal-title">Delete User</h5>
        <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete this user?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
        <button type="button" className="btn btn-primary" onClick={() => delUser(duser)}>Delete User</button>
      </div>
    </div>
  </div>
</div>
}

    </>

  )
}

export default userList