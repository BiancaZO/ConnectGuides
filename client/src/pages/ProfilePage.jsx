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
    subpage = 'profile';
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

  // const {subpage} =  useParams();
    
  if (redirect) {
    return <Navigate to={redirect} />
  }
   
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-xl mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'guideService' &&(
         <GuideServicePage />
      )}
      </div>
      );
}

// //arquivo criado porem nao encontrei no git dele

// //parte relacionada com GuidePage.jsx 
// {subpage === 'guidesServices' &&(
//     <GuideServicePage/>
// )}
// //dentro da function linkClasses alterar let cl6sses:
// /* let classes ='inline-flex gap-1 py-2 px-6 rounded-ful';
//    if(type === subpage){
//    } else {
//     classes += 'bg-gray-200';
// }



// //My accomodations
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
// </svg>
