import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";

export default function SearchResultsPage() {
    const [guideService, setGuideService] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            axios.get(`/search?query=${query}`).then((response) => {
                setGuideService(response.data);
            });
        }
    }, [query]);

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {guideService.length > 0 &&
                guideService.map((service) => (
                    <Link to={'/singleGuideService/' + service._id} key={service._id}>
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {service.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000" + service.photos?.[0]} />
                            )}
                        </div>
                        <h2 className="font-bold">{service.ownerName}</h2>
                        <h2 className="font-bold text-sm">{service.city}</h2>
                        <h3 className="text-sm truncate text-gray-500">{service.title}</h3>
                        <div className="mt-2">
                            <span className="font-bold">${service.price}</span>
                        </div>
                    </Link>
                ))}
        </div>
    );
}
