import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accounts from '../components/Accounts';
import { setUser, updateInfo } from "../features/userSlice";
import { getProfile, updateProfile} from "../utils/apiFetch/ApiFetch";

function Profile () {

    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
    });

    const [editMode, setEditMode] = useState(false);

    let dispatch = useDispatch();
    let token = useSelector((state) => state.user.token);
    
    useEffect(() => {
        const getUserProfile = async () => {
            await dispatch(getProfile(token))
            .then(data => {
                dispatch(setUser(data))
            })
            .catch(err => console.log("error", err))
        }
        getUserProfile();
    }, [dispatch, token]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputData(prevInputData => ({
            ...prevInputData,
            [name]: value
        }))
    }

    function handleSubmit (e) {
        e.preventDefault();
        updateProfile(inputData.firstName, inputData.lastName, token)
        dispatch(getProfile(token))
        .then(data => dispatch(updateInfo(data)))
        .catch(err => console.log("error", err))
        setEditMode(false);
    }

    let user = useSelector((state) => state.user.currentUser);

    return (
        <main className="main bg-dark">
            <div className="profile-header">
                <h1>
                Welcome back
                <br />
                {user ? user.firstName : "John"} {user ? user.lastName : "Doe"}
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
