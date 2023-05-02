import { DownCircleFilled, DeleteOutlined, PlusOutlined, EditFilled, CalendarOutlined,SwapRightOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';


const Delete = ({id, full}) =>{
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [adminToken, setAdminToken] = useState('')

    useEffect(() =>{
      const tokenObj = JSON.parse(localStorage.getItem('admin'));
      const token = tokenObj.token;

      setAdminToken(token);
      console.log(token)
    }, [])


    const showDelete = () =>{
        setIsDeleteOpen(true)
      }

      const handleCancel = () => {
        setIsDeleteOpen(false)
      };

      const handleOk = async() => {
        setIsDeleteOpen(false);

        console.log(full)

        const sendProject = await fetch(`https://tni-server.vercel.app/projects/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${adminToken}`
          },
          
        })
        location.replace('/');
        console.log(sendProject)

      };

      
    return(
        <> 
          <DeleteOutlined style={{color: 'red'}} onClick={showDelete} />

          <Modal open={isDeleteOpen} onOk={handleOk} onCancel={handleCancel}>
              <h3 style={{color: 'red'}}>Sure you want to Delete Project ?</h3>
           </Modal>
        </>
    )
}

export default Delete