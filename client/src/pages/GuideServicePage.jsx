import { useParams, Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import GuideServiceImg from "../GuideServiceImg";

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
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl m-2"
            >
              <div className="flex w-32 h-32 bg-gray-300 shrink-0"> 

                {/* {console.log(service.photos[0])} */}
                <GuideServiceImg service={service} />
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