import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification } from 'antd';
import { useEffect, useContext, useState } from 'react';
import Image from '../assets/login.svg'
import Logo from '../assets/logo.png';
import {Admin} from '../context/admin';
import {useNavigate} from 'react-router-dom';

const Login = () =>{
  const admin = useContext(Admin);
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async() => {
    
    try{
      const login = await fetch(`https://tni-server.vercel.app/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const result = await login.json();
      if(login.ok){
        console.log(result)
        localStorage.setItem('admin', JSON.stringify({name: result.name, token: result.token}))
        admin.logged({name: result.name, token: result.token})
        navigate('/')
      }else{
        console.log(result.message)
        localStorage.removeItem('admin')
        notification.error({
          message: 'Error',
          description: result.message,
        });
        admin.logged(null)

      }


    }catch(err){
      console.log(err);
    }

  }
    return(
        <>
        <div className="login-container">
          <img src={Logo} alt="" style={{position: 'absolute', width: '100px', top: '0px', left: '10px' }} />
          <div className="login-div">
            <div className="left">
              <img src={Image} alt="Good" />
            </div>
            <div className="form">
              <h1 style={{textAlign: 'center', color: 'white'}}>Admin Login</h1>

              <Form style={{
                marginTop: '30px',
            
                margin: '0px auto',
                display: 'flex',
                flexDirection:'column',
                alignItems: 'center',
                padding: '30px'
              }}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} size="large" placeholder="Username" prefix={<UserOutlined />} />
                <Input.Password  value={password} onChange={(e) => setPassword(e.target.value)} style={{margin: '10px 0px'}} size="large" placeholder="input password" />
                <Button onClick={handleSubmit} style={{alignSelf: 'flex-start'}} type="primary">Login</Button>

              </Form>
            </div>
          </div>

        </div>
        </>
    )
}

export default Login