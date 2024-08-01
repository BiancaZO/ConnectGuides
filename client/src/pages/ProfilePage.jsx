import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import GuideServicePage from "./GuideServicePage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  let {subpage} =  useParams();
  if (subpage === undefined) {
    subpage = 'account';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
 
  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }
    
  if (redirect) {
    return <Navigate to={redirect} />
  }
   
  return (
    <div>
      <AccountNav />
      <div className="max-w-md mx-auto mt-8 p-4 bg-blue shadow-lg rounded-3xl">
        <div className="bg-white shadow p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          
            <div className="py-4 px-6 flex-shrink-0">
              <img
                src="/assets/profile.png"
                alt="profile picture"
                className="w-24 h-24 rounded-full border-4 border-blue-400"
              />
            </div>
            <div className="py-4 px-6 sm:border-l sm:border-blue-200 sm:ml-6">
              <h1 className="text-3xl font-bold text-blue-700 mb-4">Profile</h1>
              <p className="text-lg text-gray-800 mb-2">
                Welcome, <span className="font-semibold text-blue-800">{user.name}</span>!
              </p>
              <p className="text-lg text-gray-800 mb-2">
                Email: <span className="font-semibold text-blue-800">{user.email}</span>
              </p>
              <p className="text-lg text-gray-800 mb-2">
                Phone: <span className="font-semibold text-blue-800">{user.phone}</span>
              </p>
              <p className="text-lg text-gray-800">
                Address: <span className="font-semibold text-blue-800">{user.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
  
     
      {subpage === 'account' && (
        <div className="text-center max-w-xl mx-auto mt-6">
          <p className="text-lg text-gray-800 mb-4">
            Logged in as <span className="font-semibold">{user.name}</span> ({user.email})
          </p>
          <button onClick={logout} className="primary mt-4 px-6 py-2 hover: bg-blueDark transition duration-300 ">
            Logout
          </button>
        </div>
      )}
  
      
      {subpage === 'guideService' && (
        <GuideServicePage />
      )}
    </div>
  );
}