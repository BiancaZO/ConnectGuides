import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import GuideServiceGallery from "../GuideServiceGallery";
import AddressLink from "../AddressLink";

export default function SingleGuideServicePage() {
  const { id } = useParams();
  const [singleGuideService, setSingleGuideService] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/guideService/${id}`).then((response) => {
      setSingleGuideService(response.data);
    });
  }, [id]);

  if (!singleGuideService) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{singleGuideService.title}</h1>
      
      <AddressLink>{singleGuideService.city}</AddressLink>

      <GuideServiceGallery singleGuideService={singleGuideService} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text 2xl">Description</h2>
            {singleGuideService.description}
          </div>

          Max number of Travelers: {singleGuideService.maxTravelers}
        </div>

        <div>
          <BookingWidget singleGuideService={singleGuideService} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text 2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {singleGuideService.extraInfo}
        </div>
      </div>
    </div>
  );
}
