import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CarsFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [pickUp, setPickUp] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [maxMembers, setMaxMembers] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/cars/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setPickUp(data.pickUp);
            setDropOff(data.dropOff);
            setMaxMembers(data.maxMembers);
            setPrice(data.price);
        })
    }, [id]);

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
        )
    }

    async function saveCar(ev) {
        ev.preventDefault();
        const carDate = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            pickUp, dropOff, maxMembers, price,
        }
        if (id) {
            //update
            await axios.put('/cars', {
                id,
                ...carDate
            });
            setRedirect(true);
        } else {
            //new car
            await axios.post('/cars', carDate);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/cars'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={saveCar}>
                {preInput('title', 'Title for your car, should be short and catchy as in advertisement')}
                <input type="text"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    placeholder="title, for example: My lovely car" />

                {preInput('Address', 'Address to this car')}
                <input type="text"
                    value={address}
                    onChange={ev => setAddress(ev.target.value)}
                    placeholder="address" />

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'description of the car')}
                <textarea value={description}
                    onChange={ev => setDescription(ev.target.value)} />

                {preInput('Perks', 'select all your perks of you car')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4">
                    <Perks selected={perks}
                        onChange={setPerks} />
                </div>

                {preInput('Extra info', 'Cars we have to offer')}
                <textarea value={extraInfo}
                    onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check pickup & dropoff', 'Add pickup & dropoff, Members allowed in a car')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Pick up time</h3>
                        <input type="text"
                            value={pickUp}
                            onChange={ev => setPickUp(ev.target.value)}
                            placeholder="14" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Drop off time</h3>
                        <input type="text"
                            value={dropOff}
                            onChange={ev => setDropOff(ev.target.value)}
                            placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number"
                            value={maxMembers}
                            onChange={ev => setMaxMembers(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per day</h3>
                        <input type="number"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
        );
}