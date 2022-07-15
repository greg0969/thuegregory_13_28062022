import { useSelector, useDispatch, useStore } from "react-redux";
import { getProfile, updateProfile } from "../utils/apiFetch/ApiFetch";
import Accounts from "../components/Accounts"
import Erreur from "../pages/Erreur"
import { useEffect, useRef, useState } from "react";
import { saveProfile } from "../features/userReducer";

function Profile() {

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const firstName = useRef();
  const lastName = useRef();

  async function getProfileData() {
    try {
        const response = await getProfile();
        setData(response)
    }
    catch (error) {
        console.log(error);
        
    }   
  }
  getProfileData();

  async function updateProfileData() {
    try{
      
        const response = await updateProfile(firstName.current.value, lastName.current.value);
        dispatch(saveProfile(response));
        setUpdateMode(false);
      
    }catch(error){
      console.log(error);
    }
  }


  return data ? (
    <main className="main bg-dark">
      {updateMode ? (
        <div className="header">
          <h1>Welcome back</h1>
          <div className="editor">
            <input
            type="text"
            placeholder={data.firstName}
            className="firstNameInput"
            ref={firstName}
            />
            <input
            type="text"
            placeholder={data.lastName}
            className="lastNameInput"
            ref={lastName}
            />
          </div>
          <div className="editor">
            <button className="editor-button" onClick={updateProfileData}>Save</button>
            <button className="editor-button" onClick={()=>setUpdateMode(false)}>Cancel</button>
          </div>
        </div>
      ):(
        <div className="header">
          <h1>Welcome back
          <br/>
          {data.firstName + " " + data.lastName} 
          </h1>
          <button className="edit-button" onClick={()=>setUpdateMode(true)}>Edit Name</button>
        </div>
      )}
      <h2 className="sr-only">Accounts</h2>
      <Accounts />
    </main>
  ):(
    <Erreur />
  )
}
export default Profile;