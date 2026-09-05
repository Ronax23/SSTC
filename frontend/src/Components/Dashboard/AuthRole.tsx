import { useState,useEffect } from 'react'
import axois from 'axios';
function AuthRole() {
const [role, setUser] = useState<String>("all");
  const [loading, setLoading] = useState<Boolean>(true);

  const roles=()=>{
    axois.get('/api/user/role').then((res) => {
        setUser(res.data.role);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
       roles();
  }, []);

  return { role, loading };
}

export default AuthRole