import {  PlusOutlined, EditFilled, CalendarOutlined,SwapRightOutlined } from '@ant-design/icons';
import { Card, Input, Button, Modal, DatePicker } from 'antd';
import { useState } from 'react';
import ProjectList from './projectList';
// import SearchComp from './search';


function Projects() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
     <div className='projects'>
       {/* <SearchComp /> */}
       
       <div className="projects-list">
      
       <ProjectList />
    
       </div>

     </div>

 
     </>
  )
}

export default Projects
