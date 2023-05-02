import { UserOutlined } from '@ant-design/icons';
import Image from '../assets/logo.png'
import { useContext, useEffect, useState } from 'react';
import { Admin } from '../context/admin';
const Nav = () => {
  const admin = useContext(Admin);
  const [admins, setAdmin] = useState('')
  useEffect(() =>{
  const admin = localStorage.getItem('admin');
  setAdmin(JSON.parse(admin).name)
  }, [])
    return (
      <>
       <nav>
         <div className="logo">
            <img src={Image} alt="TNI Logo" />
         </div>

         <div className="user">
            <p>{admins}</p>
            <i><UserOutlined /></i>
         </div>
       </nav>
      </>
    )
  }
  
  export default Nav