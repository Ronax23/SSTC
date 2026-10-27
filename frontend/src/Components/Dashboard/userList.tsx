import {useState, useEffect } from 'react'
import LoaderError from '../../assets/Reusable/LoaderError';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ListTab from '../../assets/Reusable/ListTab';


 const ex: any[] = [
  {
    id:'dnajdnajkdnwjn2jnjn2j2',
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.sharma@example.com",
    mob: "+919810123456",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Delhi",
    firmName: "Sharma Traders & Co.",
    GST: "07AAAAA0000A1Z5",
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOJ4IZbkwwyJD4dq7MObC7x1gpYN0xVkTOV_X9T9ZCMQ&s=10'
  },
  {
    firstName: "Priya",
    lastName: "Verma",
    email: "priya.verma@example.com",
    mob: "+919876543210",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Haryana",
    firmName: null,
    GST: null
  },
  {
    firstName: "Rohan",
    lastName: "Mehta",
    email: "rohan.mehta@example.com",
    mob: "+919820011223",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Maharashtra",
    firmName: "Apex Technologies",
    GST: "27BBBBB1111B1Z2"
  },
  {
    firstName: "Ananya",
    lastName: "Iyer",
    email: "ananya.iyer@example.com",
    mob: "+919444012345",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Tamil Nadu",
    firmName: null,
    GST: null
  },
  {
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@example.com",
    mob: "+919830098765",
    gender: "Male",
    role: "Admin",
    profileType: "Business",
    state: "West Bengal",
    firmName: "Singh Logistics",
    GST: "19CCCCC2222C1Z9"
  },
  {
    firstName: "Neha",
    lastName: "Patel",
    email: "neha.patel@example.com",
    mob: "+919909054321",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Gujarat",
    firmName: null,
    GST: null
  },
  {
    firstName: "Siddharth",
    lastName: "Rao",
    email: "siddharth.rao@example.com",
    mob: "+919845011223",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Karnataka",
    firmName: "Rao Precision",
    GST: "29DDDDD3333D1Z6"
  },
  {
    firstName: "Kavya",
    lastName: "Reddy",
    email: "kavya.reddy@example.com",
    mob: "+919700123456",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Telangana",
    firmName: null,
    GST: null
  },
  {
    firstName: "Amit",
    lastName: "Kumar",
    email: "amit.kumar@example.com",
    mob: "+919818099887",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Uttar Pradesh",
    firmName: "Kumar Hardware",
    GST: "09EEEEE4444E1Z3"
  },
  {
    firstName: "Pooja",
    lastName: "Joshi",
    email: "pooja.joshi@example.com",
    mob: "+919822033445",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Maharashtra",
    firmName: null,
    GST: null
  },
   {
    id:'dnajdnajkdnwjn2jnjn2j2',
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.sharma@example.com",
    mob: "+919810123456",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Delhi",
    firmName: "Sharma Traders & Co.",
    GST: "07AAAAA0000A1Z5",
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOJ4IZbkwwyJD4dq7MObC7x1gpYN0xVkTOV_X9T9ZCMQ&s=10'
  },
  {
    firstName: "Priya",
    lastName: "Verma",
    email: "priya.verma@example.com",
    mob: "+919876543210",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Haryana",
    firmName: null,
    GST: null
  },
  {
    firstName: "Rohan",
    lastName: "Mehta",
    email: "rohan.mehta@example.com",
    mob: "+919820011223",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Maharashtra",
    firmName: "Apex Technologies",
    GST: "27BBBBB1111B1Z2"
  },
  {
    firstName: "Ananya",
    lastName: "Iyer",
    email: "ananya.iyer@example.com",
    mob: "+919444012345",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Tamil Nadu",
    firmName: null,
    GST: null
  },
  {
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@example.com",
    mob: "+919830098765",
    gender: "Male",
    role: "Admin",
    profileType: "Business",
    state: "West Bengal",
    firmName: "Singh Logistics",
    GST: "19CCCCC2222C1Z9"
  },
  {
    firstName: "Neha",
    lastName: "Patel",
    email: "neha.patel@example.com",
    mob: "+919909054321",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Gujarat",
    firmName: null,
    GST: null
  },
  {
    firstName: "Siddharth",
    lastName: "Rao",
    email: "siddharth.rao@example.com",
    mob: "+919845011223",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Karnataka",
    firmName: "Rao Precision",
    GST: "29DDDDD3333D1Z6"
  },
  {
    firstName: "Kavya",
    lastName: "Reddy",
    email: "kavya.reddy@example.com",
    mob: "+919700123456",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Telangana",
    firmName: null,
    GST: null
  },
  {
    firstName: "Amit",
    lastName: "Kumar",
    email: "amit.kumar@example.com",
    mob: "+919818099887",
    gender: "Male",
    role: "Customer",
    profileType: "Business",
    state: "Uttar Pradesh",
    firmName: "Kumar Hardware",
    GST: "09EEEEE4444E1Z3"
  },
  {
    firstName: "Pooja",
    lastName: "Joshi",
    email: "pooja.joshi@example.com",
    mob: "+919822033445",
    gender: "Female",
    role: "Customer",
    profileType: "Individual",
    state: "Maharashtra",
    firmName: null,
    GST: null
  }
];

function userList() {

    const [showModal, setShowModal] = useState(false);
    const [duser,setUser]=useState<any>({});
    const [data,setData]=useState<any>([]);
    const [page,setPage]=useState(1);
    const [total,setTotal]=useState(0);
    const [loading,setLoading]=useState(true);
    const [search,setSearch]=useState<string>('');

    const delUser=async(id:string)=>{
        axios.delete(`${import.meta.env.VITE_API}user/delete/${id}`).then((res)=>{
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
    
    const searchParam = search ? `/search?query=${encodeURIComponent(search)}&` : '?';
    
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}userlist${searchParam}page=${page}`
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

    if(loading)return <div><LoaderError loading={true}/></div>
  return (
    <>
    <Toaster/>
    <ListTab title="User List" data={data} columns={Object.keys(ex[0])} setSearch={setSearch} />
    
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















// <div className="tablesdat">
//       <div className="row justify-content-end">
//           <div className="col-12"><h1>User List</h1></div>
//             <div className="col-lg-4 col-md-6 position-relative mb-3">
//                     <input type="text" className="form-control" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)} />
//                     <i className="bi bi-search position-absolute top-0 end-0 border-0 p-2 me-2"  onClick={()=>{userData(); setSearchUser(search)}}
                    
//                     style={{ 
//     cursor: 'pointer',
//     borderRadius: '50%', // Ensures the background blur is circular
//     transition: 'background-color 0.15s ease, backdrop-filter 0.15s ease, transform 0.1s ease',    
//     backgroundColor: isPressed ? 'rgba(255, 255, 255, 0.2)' : 'transparent', 
//     backdropFilter: isPressed ? 'blur(8px)' : 'none',
//     transform: isPressed ? 'scale(0.92)' : 'scale(1)',     // Slight push-down feel
//   }}
// onMouseDown={() => setIsPressed(true)}
//   onMouseUp={() => setIsPressed(false)}
//   onMouseLeave={() => setIsPressed(false)}
//   onTouchStart={() => setIsPressed(true)}
//   onTouchEnd={() => setIsPressed(false)}
                    
//                     />
//                 </div>
//       </div>
//             <table className="table">
//         <thead>
//             <tr>
//                 <th>S.No</th>
//                 <th scope="col">Image</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Gender</th>
//                 <th scope="col">BloodGroup</th>
//                 <th scope="col">Age</th>
//                 <th>Action</th>
//             </tr>
//     </thead>
//     <tbody>
//        {data.map((user: any,i:number) => (
//             <tr>
//                 <td>{i+1+(page-1)*10}</td>
//                 <td><img src={user.image} alt="" style={{width:"50px"}} /></td>
//                 <td>{user.firstName} {user.lastName}</td>
//                 <td>{user.gender}</td>
//                 <td>{user.bloodGroup}</td>
//                 <td>{user.age}</td>
//                 <td><div className="dropdown">
//   <button
//     className="btn btn-sm btn-light"
//     data-bs-toggle="dropdown"
//     aria-expanded="false"
//   >⋮</button>
//   <ul className="dropdown-menu">
//     <li><button className="dropdown-item"> View</button></li>
// <li>  <Link className="dropdown-item" to={`/dashboard/editUser/${user._id}`}> Edit</Link></li>
// <li><button className="dropdown-item text-danger" onClick={() => {
//       setUser(user._id);
//       setShowModal(true);
//     }}> Delete</button></li>
//   </ul></div></td> </tr>
//         ))}
//     </tbody>
// </table>
//     </div>