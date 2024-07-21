import { useParams } from "react-router-dom";
import Services from "../Services";
import { useState } from "react";

export default function GuiaServicePage(){
    const {action} = useParams();
    const (title,setTitle) = useState{''};
    const (city,setCity) = useState('');

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
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your service</p>
                        <imput type="text" placeholder="title, for exemplo : my lovely my apt"/>
                        <h2 className="text-2xl mt-4">City</h2>
                        <p className="text-gray-500 text-sm">Describe your city</p>
                        <imput type="text" placeholder="city"/>  
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">more = better</p>
                        <div className="flex gap-2">
                            <imput type="text" placeholder={"Add using a link .....jpg"}/>
                            <button className="bg-gray-200 px-4 rounded-2xl">Add photo</button>
                        </div>
                            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid- cols-6"> 
                            <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                            </svg>
                                Upload
                            </button>
                        </div>
                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">Description of the services</p>
                        <textarea /> {/*ele colocou um textarea no index.css mas ja existe outro criado*/}
                        <h2 className="text-2xl mt-4">Services</h2>
                        <p  className="text-gray-500 text-sm">Select all services</p>
                        <Services selected={services} onChange={setServices()}/>

                    </form>
                </div>
            )}
           
        </div>
    );
}