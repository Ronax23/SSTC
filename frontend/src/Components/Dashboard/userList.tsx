import {useState, useEffect } from 'react'
import LoaderError from '../../assets/Reusable/LoaderError';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { set } from 'react-hook-form';

function userList() {

    const [showModal, setShowModal] = useState(false);
    const [duser,setUser]=useState<any>({});
    const [data,setData]=useState<any>([]);
    const [page,setPage]=useState(1);
    const [total,setTotal]=useState(0);
    const [loading,setLoading]=useState(true);

    const delUser=async(id:string)=>{
        axios.delete(`http://localhost:8000/userlist/${id}`).then((res)=>{
            userData();
            toast.success("User Deleted Successfully");
            setShowModal(false);
            setUser({});
        }).catch((err)=>{
            setShowModal(false);
            setUser({});
            toast.error("Error Deleting User"); 
        })
    }



    const userData= async()=>{
        setLoading(true);
        await fetch(`http://localhost:8000/userlist?page=${page}`).then((res)=>{
            return res.json();
        }).then((data)=>{
            setTotal(data.total);
            setData(data.data);
            setTotal(data.total);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        })

    }

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
                <td><button onClick={() =>{setUser(user._id); setShowModal(true);}}>Delete</button></td>
            </tr>
        ))}
    </tbody>
</table>
    </div>
    <div className="pagination">
      
  <ul className="pagination">
    <li className="page-item" onClick={() => setPage(page>1?page - 1:1)}> <span className='page-link' aria-hidden="true">&laquo;</span></li>
    <li className="page-item"><span className="page-link active">{page}</span></li>
    <li className="page-item" onClick={() => setPage(Math.min(page + 1, total))}><span className='page-link' aria-hidden="true">&raquo;</span></li>
  </ul>

    </div>

{showModal && <div className="modal" style={{display:"block"}} onClick={(e) => setShowModal(false)}>
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