import { DownCircleFilled, DeleteOutlined, PlusOutlined, EditFilled, CalendarOutlined,SwapRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Card, Input, Select, Modal, DatePicker, } from 'antd';
const { Search, TextArea } = Input;
import moment from 'moment';
const {RangePicker} = DatePicker;
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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

const Edit = ({id, ele}) =>{
   
   const [adminToken, setAdminToken] = useState('')

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [title, setTitle] = useState(ele.title);
    const [description, setDescription] = useState(ele.description);
    const [importance, setImportance] = useState(ele.importance);
    const [dateRange, setDateRange] = useState([dayjs(ele.starting_date, 'DD-MM-YYYY'), dayjs(ele.ending_date, 'DD-MM-YYYY')]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [projects, setProjects] = useState([]);


    useEffect(() =>{
      const tokenObj = JSON.parse(localStorage.getItem('admin'));
      const token = tokenObj.token;

      setAdminToken(token);
      console.log(token)
    }, [])

    const navigate = useNavigate();
    const showEdit = ({ele}) =>{
        setIsEditOpen(true)
      }

      const handleCancel = () => {
        setIsEditOpen(false)
      };

      const handleOk = async() => {
        setIsEditOpen(false);

      
        const sendProject = await fetch(`https://tni-server.vercel.app/projects/${ele._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            title: title,
            description, 
            starting_date: dateRange[0].format('DD-MM-YYYY'),
            ending_date: dateRange[1].format('DD-MM-YYYY'),
            importance: importance
         })
          
        })
         location.replace('/');
  

      };

      const handleValidity = (dates) =>{
        console.log(dates);
        setDateRange(dates);
      }

      const handleImportance = (e) =>{
        console.log(e);
        setImportance(e);
      }

      const handleEdit = () =>{
        setIsEditOpen(true)
      }
      
    return(
        <>
        <EditFilled style={{marginRight: '10px'}} onClick={handleEdit}/>
          <Modal title="Edit Project" open={isEditOpen} onOk={handleOk} onCancel={handleCancel}>
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

            <RangePicker value={dateRange} format="DD/MM/YYYY" onChange={handleValidity}  />
           
            <Select
              onChange={handleImportance}
              
              defaultValue="important"
              style={{  width: 120 }}
              
              options={options} />

           </Modal>
        </>
    )
}

export default Edit