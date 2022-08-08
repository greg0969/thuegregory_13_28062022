import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import Accounts from '../components/Accounts';
import { updateInfo } from "../features/userSlice";
import { updateProfile} from "../utils/apiFetch/ApiFetch";

function Profile () {

    const location = useLocation();
    const [inputData, setInputData] = useState({ firstName: location.state.profil.firstName, lastName: location.state.profil.lastName,});
    
    const [editMode, setEditMode] = useState(false);

    let dispatch = useDispatch();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputData(prevInputData => ({
            ...prevInputData,
            [name]: value
        }))
    }

    function handleSubmit (e) {
        e.preventDefault();
        updateProfile(inputData.firstName, inputData.lastName)
        .then(data => dispatch(updateInfo(data)))
        .catch(err => console.log("error", err))
        setEditMode(false);
    }

    return (
        <main className="main bg-dark">
            <div className="profile-header">
                <h1>
                Welcome back 
                <br />
                {inputData.firstName} {inputData.lastName}
                </h1>

                { editMode ?
                    <div className='change-data'>
                        <div className='change-data-input'>
                            <input 
                            type="text" 
                            id="firstName" 
                            name='firstName'
                            value={inputData.firstName}
                            placeholder="First Name"
                            onChange={handleChange}
                            />
                            <input 
                            type="text" 
                            id="lastName" 
                            name='lastName'
                            value={inputData.lastName}
                            placeholder= "Last Name"
                            onChange={handleChange}
                            />
                        </div>
                        <div className='change-data-button'>
                            <button className='edit-button' onClick={handleSubmit}>Save</button>
                            <button className='edit-button' onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    </div>
                :
                    <button className="edit-button" onClick={() => setEditMode(true)}>
                    Edit Name
                    </button>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Accounts />
      </main>
    );
}

export default Profile;
