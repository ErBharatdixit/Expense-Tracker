import React, { useContext, useState } from 'react'
import Authlayout from '../../components/layout/Authlayout'
import {useNavigate} from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { Link } from 'react-router-dom';
import { validateEmail } from ".././../utils/helper";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

export default function Login() {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  // handle log in form 
  const handleLogin = async(e)=>{
    e.preventDefault();
    if (!validateEmail(email)){
      setError("please enter a valid email address... ");
      return;
    }

    if(!password){
      setError("Please enter a your valid password....");
      return;
    }
    setError(" ")

    //Login API Call  
        // try {
        //   const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        //     email,
        //     password,
        //   });
        //   const {token,user} = response.data;

        //   if(token){
        //     localStorage.setItem("token",token);
        //     navigate("/dashboard");
        //   }
          
        // } catch (error) {

        //   if(error.response && error.response.data.message){
        //     setError(error.response.data.message);
        //   }else{
        //     setError("Something went wrong. Please try again.")
        //   }
          
        // }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        // Handle unauthorized errors and general errors distinctly.  
        if (status === 401) {
          setError(data.message); // Show specific error messages  
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    }  





  }

    
  return (
    <Authlayout>
      <div className=' lg:w-[to-70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'> Welcome Back</h3>

        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in.. </p>

        <form onSubmit={handleLogin}>
         <Input value={email} onChange={({target}) => setEmail(target.value)}
         label = "Email Address"
         placeholder="bharat@gmail.com"
         type="text"/>


          <Input value={password} onChange={({ target }) => setPassword(target.value)}
            label="password"
            placeholder="Min 8 Characters"
            type="password" />

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type="submit" className='btn-primary'>
              LOGIN
            </button>

            <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">SignUp
            </Link>
          </p>
            

        </form>





      </div>
    </Authlayout>
  )
}
