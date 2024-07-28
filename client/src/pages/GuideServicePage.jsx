import { useParams, Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import GudeServiceImg from "../GuideServiceImg";

export default function GuideServicePage() {
  const [guideService, setGuideService] = useState([]);

  useEffect(() => {
    axios.get("/user-guideService").then(({ data }) => {
      setGuideService(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/guideService/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new service
        </Link>
      </div>
      <div className="mt-4">
        {guideService.length > 0 &&
          guideService.map((service) => (
            <Link
              key={service._id}
              to={"/account/guideService/" + service._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-gray-300 shrink-0"> 
                {/* grow property removed from className */}

                {/* {console.log(service.photos[0])} */}
                <GudeServiceImg service={service} />
                {/* {service.photos.length > 0 && (
                  <img
                    className="object-cover"
                    src={"http://localhost:4000" + service.photos[0]}
                    alt={service.title}
                  />
                )} */}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{service.title}</h2>
                <p className="text-sm mt-2">{service.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

// PREVIOUS CODE - FROM JUL 20 - COMMENTED BELOW (Rafael - Jul 22)
// export default function GuideServicePage(){

//     const {action} = useParams();
//     const [title,setTitle] = useState('');
//     const [city,setCity] = useState('');
//     const [addedPhotos, setAddedPhotos] = useState([]);
//     const [photoLink, setPhotoLink] = useState('');
//     const [description, setDescription] = useState('');
//     const [services, setSevices] = useState(''); //antigo Perks --DELETAR COMMENTS
//     //const[extraInfo, setExtraInfo] = useState('');
//     //const[checkIn, setCheckIn] = useState('');
//     //const[checkOut, setCheckout] = useState('');
//     function inputHeader(text){
//         return(
//             <h2 className="text-2xl mt-4">{text}</h2>
//         );
//     }
//     function inputDescription(text){
//         return(
//             <p className="text-gray-500 text-sm">Title for your service</p>
//         );
//     }
//     function preInput(header, description){
//         return(
//             <>
//             {inputHeader(header)}
//             {inputDescription(description)}
//             </>

//         );
//     }
//     async function addPhotoByLink(ev){
//         ev.preventDefault();
//         const {data:filename} = await axios.post('/upload-by-link' , {link: photoLink});
//         setAddedPhotos(prev =>{
//             return [...prev, filename]
//         });
//         setPhotoLink('');
//     }

//     function uploadPhoto(ev) {
//         const files = ev.target.files;
//         const data = new FormData();
//         for (let i = 0; i < files.length; i++){
//             data.append('photos' , files[i]);
//         }
//         axios.post('/upload' , data , {
//             headers: {'Content-type':'multipart/form-data'}
//         }).then(response => {
//             const {data:filenames} = response;
//             setAddedPhotos(prev =>{
//                 return [...prev, ...filenames]
//             });

//         }).catch(error => {
//             console.error("Error uploading photos:", error);
//             alert("Error uploading photos. Please try again.");
//         });
//     }

//     return(
//         <div>
//             {action !== 'new' && (
//             <div className="text-center">
//                 <Link className="inline-flex gap-1 bg-primary text white py-2 px-4 rounded-full" to={'/account/guideService/new'}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                     </svg>

//                 Add new service
//                 </Link>
//             </div>
//             )}
//             {action === 'new' &&(
//                 <div>
//                     <form>
//                         {preInput('Title', 'Title for your service.')}
//                         <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for exemplo : I can offer you the better experience..."/>

//                         {preInput('City', 'Describe your city')}
//                         <input type="text" value={city} onChange={ev =>setCity(ev.target.value)} placeholder="city"/>

//                         {preInput('Photos','more = better') }
//                         <div className="flex gap-2">
//                             <input value={photoLink}
//                             onChange={ev => setPhotoLink(ev.target.value)}
//                             type="text" placeholder={"Add using a link .....jpg"}/>
//                             <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add photo</button>
//                         </div>

//                             <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid- cols-6">
//                             {addedPhotos.length > 0 && addedPhotos.map((link , index) => (
//                                 <div key={index} className="h-32 flex">
//                                     <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/upload/${link}`} alt=""/>
//                                 </div>
//                             )) }
//                             <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
//                             <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
//                             </svg>
//                                 Upload
//                             </label>
//                         </div>

//                         {preInput('Description','Description of your services') }
//                         <textarea value={description} onChange={ev => setDescription(ev.target.description)} /> {/*ele colocou um textarea no index.css mas ja existe outro criado*/}
//                         {preInput('Services','Select all services') }
//                         <div>
//                              <Services selected={services} onChange={setSevices}/>
//                         </div>

//                     </form>
//                 </div>
//             )}

//         </div>
//     );

// }
