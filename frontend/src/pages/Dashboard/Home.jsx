import React, { useEffect,useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

export default function Home() {

  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading,setLoading]   = useState(false);
  const fetchDashboardData = async()=>{
    if(loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if(response.data){
        setDashboardData(response.data);
      }
      
    } catch (error) {
      console.log("Something went wrong.. Please try again.",error)
      
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchDashboardData();
     return ()=>{

     }
  })
  return (
    
      <DashboardLayout activeMenu="Dashboard">
        <div className='my-5 mx-auto'></div>
      </DashboardLayout>
    
  )
}
