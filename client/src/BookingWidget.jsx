export default function BookingWidget({singleGuideService}) {
    return(
    <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
                Price: ${singleGuideService.price} / per day
        </div>
        <div className="border rounded-2xl mt-4">
            <div className="flex">
                <div className="py-3 px-4 ">
                    <label>Check-in: </label>
                    <input type="date"></input>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Check-out: </label>
                    <input type="date"></input>
                </div>
            </div>
            <div>
                <div className="py-3 px-4 border-t">
                    <label>Number of travelers: </label>
                    <input type="number" value={1}></input>
                </div>

            </div>
           
        </div>                   
        <button className="primary mt-4">Book this Guide</button>
    </div>
    );
}