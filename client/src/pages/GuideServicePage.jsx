import { useParams , Link } from "react-router-dom";
import Services from "../Services";
import { useState } from "react";
import axios from "axios";

export default function GuideServicePage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [services, setSevices] = useState(''); //antigo Perks --DELETAR COMMENTS
    const [extraInfo, setExtraInfo] = useState('');
    const [maxTravelers, setMaxTravelers] = useState(1); //antigo maxGuests --DELETAR COMMENTS
    // const[checkIn, setCheckIn] = useState('');
    // const[checkOut, setCheckout] = useState('');



    // TRYING TO USE MULTER TO HANDLE BACKSLASHES - CHATGPT
    // async function addPhotoByLink(event) {
    //     event.preventDefault();
    //     const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
    //     setAddedPhotos(prev => [...prev, filename]);
    //     setPhotoLink('');
    // }
    // TRYING TO USE MULTER TO HANDLE BACKSLASHES - CHATGPT



    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addPhotoByLink(event) {
        event.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    // function uploadPhoto(event) {
    //     const files = event.target.files;
    //     const data = new FormData();
    //     for (const file of files) {
    //         data.set('photos', file);
    //     }

        
    //     axios.post('/upload', data, {
    //         headers: {'Content-type':'multipart/form-data'}
    //     }).then(response => {
    //         const {data: filename} = response;
    //         setAddedPhotos(prev => {
    //             return [...prev, filename];
    //         });
    //     })

    // }


    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++){
            data.append('photos' , files[i]);
        }      
        axios.post('/upload' , data , {
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            setAddedPhotos(prev =>{
                return [...prev, ...filenames]
            });

        }).catch(error => {
            console.error("Error uploading photos:", error);
            alert("Error uploading photos. Please try again.");
        });
    }


    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/guideService/new'}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                     </svg>
                Add new service
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                    <form>

                        {/* Title */}
                        {preInput('Title', 'Title for you service...')}
                        <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder="title, for exemple: I can offer you the better experience..." />

                        {/* City */}
                        {preInput('City', 'Your city...')}
                        <input type="text" value={city} onChange={event => setCity(event.target.value)} placeholder="city"/>

                        {/* Photos */}
                        {preInput('Photos', 'More = better')}

                        <div className="flex gap-2">
                            <input type="text" value={photoLink} 
                                    onChange={event => setPhotoLink(event.target.value)} 
                                    placeholder={'Add using a link ...jpg'} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>


                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                <div key={index} className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000${link}`} alt="" />
                                </div>
                            ))}
                            <label className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                </svg>
                                Upload
                            </label>
                        </div> 

                        {/* Description */}
                        {preInput('Description', 'Description of the service')}
                        <textarea value={description} onChange={event => setDescription(event.target.value)} />

                        {/* Services */}
                        {preInput('Services', 'Select all services')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Services selected={services} onChange={setSevices} />
                        </div>

                        {/* Extra info */}
                        {preInput('Extra info', 'Other rules, etc')}
                        <textarea value={extraInfo} onChange={event => setExtraInfo(event.target.value)} />

                        {/* Max number of travelers */}
                        {preInput('Max travelers', 'To ensure a good service, provide the maximum number of travelers')}
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of travelers</h3>
                            <input type="number" value={maxTravelers} onChange={event => setMaxTravelers(event.target.value)} />
                        </div>

                        <button className="primary my-4">Save</button>

                    </form>
                </div>
            )}
        </div>
    )

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