import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Services from "../Services";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function GuideServiceFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [services, setSevices] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [maxTravelers, setMaxTravelers] = useState(1); 
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/guideService/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setCity(data.city);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setSevices(data.services);
      setExtraInfo(data.extraInfo);
      setMaxTravelers(data.maxTravelers);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveService(event) {
    event.preventDefault();
    const serviceData = {
      title,
      city,
      addedPhotos,
      description,
      services,
      extraInfo,
      maxTravelers,
      price,
    };
    if (id) {
      // update
      await axios.put("/guideService", { id, ...serviceData });
      setRedirect(true);
    } else {
      // new service
      await axios.post("/guideService", serviceData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/guideService"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveService}>
        {/* Title */}
        {preInput("Title", "Title for you service...")}
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="title, for exemple: I can offer you the better experience..."
        />

        {/* City */}
        {preInput("City", "Your city...")}
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="city"
        />

        {/* Photos */}
        {preInput("Photos", "More = better")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {/* Description */}
        {preInput("Description", "Description of the service")}
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        {/* Services */}
        {preInput("Services", "Select all services")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Services selected={services} onChange={setSevices} />
        </div>

        {/* Extra info */}
        {preInput("Extra info", "Other rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(event) => setExtraInfo(event.target.value)}
        />

        {/* Max number of travelers */}
        {preInput(
          "Max travelers",
          "To ensure a good service, provide the maximum number of travelers"
        )}
        <div>
          {/* <h3 className="mt-2 -mb-1">Max number of travelers</h3> */}
          <input
            type="number"
            value={maxTravelers}
            onChange={(event) => setMaxTravelers(event.target.value)}
          />
        </div>

        {/* Price of service */}
        {preInput(
          "Price",
          "Set a price for your service"
        )}
        <div>
          {/* <h3 className="mt-2 -mb-1">Price</h3> */}
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
