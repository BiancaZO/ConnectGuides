import { useParams } from "react-router-dom";

export default function GuiaServicePage(){
    const {action} = useParams();



    const[addedPhotos, setAddedPhotos] = useState([]);
    const[photoLink, setPhotoLink] = useState('');
    const[description, setDescription] = useState('');
    const[services, setSevices] = useState(''); //antigo Perks --DELETAR COMMENTS
    //const[extraInfo, setExtraInfo] = useState('');
    //const[checkIn, setCheckIn] = useState('');
    //const[checkOut, setCheckout] = useState('');
    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>

        );
    }
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">Title for your service</p>
        );
    }
    function preInput(header, description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}            
            </>

        );
    }
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link' , {link: photoLink});
        setAddedPhotos(prev =>{
            return [...prev, filename]
        });
        setPhotoLink('');
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.lenght; i++){
            data.append('photos' , files[i]);
        }      
        axios.post('/upload' , data , {
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            setAddedPhotos(prev =>{
                return [...prev, ...filenames]
            });
        })
    }

    return(
        <div>
            {action !== 'new' && (
            <div className="text-center">
                <link className="inline-flex gap-1 bg-primary text white py-2 px-4 rounded-full" to={'/account/GuideServices/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                Add new service
                </link>
            </div>
            )}
            {action === 'new' &&(
                <div>
                    <form>
                        {preInput('Title', 'Title for your service.')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for exemplo : I can offer you the better experience..."/>

                        {preInput('City', 'Describe your city')}
                        <input type="text" value={city} onChange={ev =>setCity(ev.target.value)} placeholder="city"/>  

                        {preInput('Photos','more = better') }
                        <div className="flex gap-2">
                            <input value={photoLink} 
                            onChange={ev => setPhotoLink(ev.target.value)} 
                            type="text" placeholder={"Add using a link .....jpg"}/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add photo</button>
                        </div>
                    
                            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid- cols-6"> 
                            {addedPhotos.lenght > 0 && addedPhotos.map(link => (
                                <div className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover"src="{'http://localhost:4000/uploads/}" alt=""></img>
                                </div>
                            )) }
                            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                            </svg>
                                Upload
                            </label>
                        </div>

                        {preInput('Description','Description of your services') }
                        <textarea value={description} onChange={ev => setDescription(ev.target.description)} /> {/*ele colocou um textarea no index.css mas ja existe outro criado*/}
                        {preInput('Services','Select all services') }
                        <div>
                             <Services selected={services} onChange={setSevices}/>   
                        </div>
                                           

                    </form>
                </div>
            )}
           
        </div>
    );
}