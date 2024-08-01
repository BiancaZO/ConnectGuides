
import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({singleGuideService}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckout] = useState('');
    const [numberOfTravelers, setNumberOfTravelers] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisService() {
        const price = numberOfNights === 0 ? singleGuideService.price : numberOfNights * singleGuideService.price;
        
        try {
            const response = await axios.post('/bookings', {
                checkIn, 
                checkOut, 
                numberOfTravelers, 
                name, 
                phone, 
                singleGuideService: singleGuideService._id,
                price,
            });
    
            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
            console.error('Error booking the service:', error);
        }
    }
    
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (

        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${singleGuideService.price} / per day
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>From:</label>
                        <input type="date" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>To:</label>
                        <input type="date" 
                            value={checkOut} 
                            onChange={ev => setCheckout(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of travelers:</label>
                    <input type="number" 
                        value={numberOfTravelers} 
                        onChange={ev => setNumberOfTravelers(ev.target.value)} />
                </div>
                {numberOfNights > -1 && (
                    <div className="py-3 px-4 border-t">
                    <label>Your full name:</label>
                    <input type="text" 
                        value={name} 
                        onChange={ev => setName(ev.target.value)} />
                    <label>Phone number:</label>
                    <input type="tel" 
                        value={phone} 
                        onChange={ev => setPhone(ev.target.value)} />
                </div>
                )}
            </div>
            <button onClick={bookThisService} className="primary mt-4">
                Book this service
                {numberOfNights > -1 && (
                    <span> ${( 1 + numberOfNights) * singleGuideService.price}</span>
                )}
            </button>
        </div>
    );
}