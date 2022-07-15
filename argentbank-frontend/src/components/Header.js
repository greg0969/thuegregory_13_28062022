import logo from "../assets/argentBankLogo.png"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteToken, resetProfile, saveProfile } from "../features/userReducer";
import { getProfile } from "../utils/apiFetch/ApiFetch";

/**
* This function create the header component and manage the infos shown based on the user's info recovered from the database.
*/
function Header() {

    const token = useSelector((state) => state.token);
    const userDatas = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [isLogged, setIsLogged] = useState(false);
    console.log(token)
    
    useEffect(() => {
        async function getUserDatas() {
            const response = await getProfile();
            dispatch(saveProfile(response));
        }
        if (token){
            getUserDatas();
            setIsLogged(true);
        }
    }, [dispatch, token]);

    /**
    * This function delete the token when a user disconnect him.
    */

    function logOut(){
        dispatch(deleteToken());
        dispatch(resetProfile());
        setIsLogged(false);
    }

    return(
        <header>
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              alt="Argent Bank Logo"
              src={logo}
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          {isLogged ? (
            <div className="nav-right">
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle"></i>
                {userDatas.firstName}
              </Link>
              <Link className="main-nav-item" to="/" onClick={logOut}>
                <i className="fa fa-sign-out"></i>
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="nav-right">
              <Link className="main-nav-item" to="/login">
                <i className="fa fa-user-circle"></i>
                Sign In
              </Link>
            </div>
          )}
        </nav>
      </header>
    );
}

export default Header;
