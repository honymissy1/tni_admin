import { DownCircleFilled, AudioOutlined, DeleteOutlined, PlusOutlined, EditFilled, CalendarOutlined,SwapRightOutlined } from '@ant-design/icons';
import { Space, Card, Input, Select, Modal, DatePicker } from 'antd';
import { useState, useEffect, useContext } from 'react';
 
const {RangePicker} = DatePicker;
const {TextArea, Search} = Input
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import {Admin} from '../context/admin'
import Delete from './delete';
import Edit from './edit';

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


// Select Options 

const options = [
  {
    value: 'important',
    label: 'Important',
  },

  {
      value: 'medium',
      label: 'Medium'
  },

  {
      value: 'high',
      label: 'High'
  }
]

const ProjectList = () =>{

  const {admin} = useContext(Admin)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('important');
  const [dateRange, setDateRange] = useState([]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() =>{

      const server = async () =>{
        try{
          const fetchProjects = await fetch(`https://tni-server.vercel.app/projects`)
          const result = await fetchProjects.json();
          setProjects(result);
      
        }catch(err){
          console.log(err)
        }
      }
      
      server();
    }, [])
    
    const showModal = () => {
      setIsModalOpen(true);
    };


      
      const handleOk = async() => {
        setIsModalOpen(false);

        try{
          const sendProject = await fetch(`https://tni-server.vercel.app/projects/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${admin.token}` 
            },
            body: JSON.stringify({
               title: title,
               description, 
               starting_date: dateRange[0].format('DD-MM-YYYY'),
               ending_date: dateRange[1].format('DD-MM-YYYY'),
               importance: importance
            })
          })
          const result = await sendProject.json()
          console.log(result);
          location.replace('/');
        }catch(err){
          console.log(err);
          console.log(result)

        }
        // location.reload();
        

      };


      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const handleValidity = (dates) =>{
        setDateRange(dates);
      }

      const handleImportance = (e) =>{
        console.log(e);
        setImportance(e);
      }

      const onSearch = async (value) => {
        try{
          const sendProject = await fetch(`https://tni-server.vercel.app/projects?search=${value}`)
          const result = await sendProject.json();
          setProjects(result)
        }catch(err){
          console.log('Nothing was found');
        }
      };

    return(
          <>
            <Space direction="vertical" style={{width: '100%'}}>
              <Search
                placeholder="Search Project"
                allowClear
                enterButton="Search"
                size="large"
                className="search"
                onSearch={onSearch}
              />
          
            </Space>
             <div className="new" onClick={showModal}>
            <Card  style={{background: '#1677FF'}} className='new-flex'>
              <div>
                <b><PlusOutlined /></b><br />
                <b>New Project</b>
              </div>
              
            </Card>
           </div>

          {
            projects.length < 1 && (
              <div style={{maxWidth: '400px',minWidth:'200px', flex: 1, textAlign: 'center', alignSelf: 'center'}}>
               <b><DownCircleFilled style={{fontSize: '25px', margin: "30px"}} /></b>
               <h1>No Project yet</h1>
               <p>Add a new Project to get Started.</p>
              </div>
             )
          }
           

           <Modal title="Create New Project" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            showCount={true}
            maxLength={400}
            style={{
              height: 100,
              resize: 'none',
              margin: '10px 0px 20px 0px'
            }}
            placeholder="Description"
          />

            <RangePicker format="DD/MM/YYYY" onChange={handleValidity}  />
           
            <Select
              onChange={handleImportance}
              
              defaultValue="important"
              style={{  width: 120 }}
              
              options={options} />

        </Modal>

       {
         projects.map((ele, index) =>(
          <Card
            key={index}
            size="large"
            title={<b style={{color: 'green', fontWeight: 700}}>{ ele.title }</b>}
            extra={<div><Edit ele={ele} /> <Delete id={ele._id} full={ele} /></div>}
            className="project-item"
            style={{
              minWidth: '250px',
              width: 'max-content',
              maxWidth: '200px',
              height: '220px',
              position: 'relative'
            }}
        >
          <p style={{fontSize: '15px'}}>Duration</p>
          <p style={{marginBottom: '10px'}}><i><CalendarOutlined /></i> {ele.starting_date} <SwapRightOutlined /> {ele.ending_date}</p>
          
          <p className='line-clamp'>{ele.description}</p>
          <p style={{position: 'absolute', bottom: '0px', right: '0px', padding: '5px'}}>Posted: { dayjs(ele.createAt).fromNow()}</p>
          </Card>
        ))
       }

  </>
    )

}

export default ProjectList