import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ car }) {
    const [pickUp, setPickUp] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [numberOfMembers, setNumberOfMembers] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user){
            setName(user.name);
        }
    }, [user]);

    let numberOfDays = 0;
    if (pickUp && dropOff) {
        numberOfDays = differenceInCalendarDays(new Date(dropOff), new Date(pickUp));
    }

    async function bookthiscar() {
        const response = await axios.post('/bookings', {
            pickUp,dropOff,numberOfMembers,name,phone,
            car:car._id,
            price:numberOfDays * car.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }
    
    if (redirect) {
        return <Navigate to={redirect} />
    }
    
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${car.price} / per day
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Pick up:</label>
                        <input type="date"
                            value={pickUp}
                            onChange={ev => setPickUp(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Drop off:</label>
                        <input type="date"
                            value={dropOff}
                            onChange={ev => setDropOff(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of members:</label>
                    <input type="number"
                        value={numberOfMembers}
                        onChange={ev => setNumberOfMembers(ev.target.value)} />
                </div>
                {numberOfDays > 0 && (
                    <div className="py-3 px-4 border-t">
                    <label>Your full name:</label>
                    <input type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <label>Phone Number:</label>
                    <input type="tel"
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)} />
                </div>
                )}
            </div>
            <button onClick={bookthiscar} className="primary mt-4">
                Book this now
                {pickUp && dropOff && (
                    <span> ${numberOfDays * car.price}</span>
                )}
                </button>
        </div>
    );
}