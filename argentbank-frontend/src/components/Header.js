import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/argentBankLogo.png"
import { logOut } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

/**
* This function create the header component and manage the infos shown based on the user's info recovered from the database.
*/
function Header() {

  let loggedIn = useSelector((state) => state.user.loggedIn)
  let user = useSelector((state) => state.user.currentUser)
  let dispatch = useDispatch()

  return (
    <header className="header">
        <nav className="main-nav navbar navbar-expand-lg navbar-light d-flex justify-content-between">
            <Link to="/"> <img className="main-nav-logo-image header-logo" src={logo} alt="Logo Argent Bank" /> </Link>
            <div className="header-links">
              {
                loggedIn ?
                (
                  <div className="main-nav-links">
                    <Link className="main-nav-item" to="/profile"><i className="fa fa-user-circle"></i>{user.firstName}</Link>
                    <Link className="main-nav-item" to="/" onClick={dispatch(logOut)}><i className="fa fa-sign-out"></i> Sign out </Link>
                  </div>
                )
                :
                (
                  <Link className="main-nav-item" to="/login"> <span className="header-signin d-flex align-items-center "> Sign In </span> </Link>
                )
              }
            </div>
        </nav>
    </header>
  );
}

export default Header;
