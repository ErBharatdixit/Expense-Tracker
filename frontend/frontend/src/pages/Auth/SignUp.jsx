import React,{useState} from 'react'
import Authlayout from '../../components/layout/Authlayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { Link } from 'react-router-dom';
import { validateEmail } from ".././../utils/helper";
export default function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[error,setError] = useState(null);

  const Navigate = useNavigate();
  const handleSignUp = async(e)=>{
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      setError("please Enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("please enter your valid email address... ")
      return;
    }

    if(!password){
      setError("Please enter a your valid password....")
    }

    setError("");

    // SignUp Api call

  }
  return (
    <Authlayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>

        <p className='text-xs text-slate-700 mt-[5px] mb-6'>join us today by entering your details below.</p>

    
    <form onSubmit={handleSignUp}>
   
          <ProfilePhotoSelector image = {profilePic} setImage={setProfilePic}/>



      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
        value={fullName}
        onChange={({target}) => setFullName(target.value)} 
        label = "Full Name"
        placeholder="Bharat Dixit"
        type="text"
        />

         <Input value={email} onChange={({target}) => setEmail(target.value)}
                 label = "Email Address"
                 placeholder="bharat@gmail.com"
                 type="text"/>
        
        
                 <div className='col-span-2'>

                   <Input value={password} onChange={({ target }) => setPassword(target.value)}
                              label="password"
                              placeholder="Min 8 Characters"
                              type="password" />

                 </div>

      </div>
       {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
      
                  <button type="submit" className='btn-primary'>
                    SIGN UP
                  </button>
      
                  <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}
                  <Link className="font-medium text-primary underline" to="/login">LogIn
                  </Link>
                </p>
                  

    </form>

      </div>



    </Authlayout>
  )
}
