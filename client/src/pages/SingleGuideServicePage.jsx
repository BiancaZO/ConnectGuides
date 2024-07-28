import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function SingleGuideServicePage(){
    const {id} = useParams();
    const[singleGuideService, setSingleGuideService] = useState(null);
    const[showAllPhotos, setShowAllPhotos] = useState(false)
    useEffect(()=> {
        if(!id) {
            return;
        }
        axios.get(`/guideService/${id}`).then(response => {
            setSingleGuideService(response.data);

        })
    }, [id]);

    if(!singleGuideService) return '';
    if(showAllPhotos){
        return(
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                <div>
                    <h2 className="text-3xl mr-48">Photos of {singleGuideService.title}</h2>
                    <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>                            
                        Close photos
                        </button>
                    </div>
                    {singleGuideService?.photos?.length > 0 && singleGuideService.photos.map(photo => (
                        <div>
                            <img src={'http://localhost:4000' + photo}></img>

                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{singleGuideService.title}</h1>
            <a className="flex gap-1 my-3 my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + singleGuideService.city}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {singleGuideService.city}            
            </a>
           <div className="relative"> 
           <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {singleGuideService.photos?.[0] && (
                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000' + singleGuideService.photos[0]}/>
                        </div>
                        
                    )}
                </div>
                <div className="grid">
                    {singleGuideService.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)}className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000' + singleGuideService.photos[1]}/>
                    )}
                    <div className="overflow-hidden">
                        {singleGuideService.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)}className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000' + singleGuideService.photos[2]}/>
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
                Show more photos
                </button>
           </div>
         
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                    <h2 className="font-semibold text 2xl">Description</h2>
                    {singleGuideService.description}
                </div>
                Check-in: {singleGuideService.checkIn}<br />
                Check-out: {singleGuideService.checkOut}<br />
                Max number of Travelers: {singleGuideService.maxTravelers}
                              
                </div>

                <div>
                <BookingWidget singleGuideService={singleGuideService}  />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
                <h2 className="font-semibold text 2xl">Extra Info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{singleGuideService.extraInfo}</div>
            </div>
        </div>
    )

}