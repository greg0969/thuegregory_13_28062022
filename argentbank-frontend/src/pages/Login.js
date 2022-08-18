import { useNavigate } from "react-router-dom";
import { logIn, getToken, userInfo } from "../features/userSlice";
import { getLogin, getProfile } from "../utils/apiFetch/ApiFetch";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Login() {

    const dispatch = useDispatch();

    const [errorState, setErrorState] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormeData => ({
            ...prevFormeData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const navigate = useNavigate();
    let username = formData.username;
    let password = formData.password;
    
    /* I recover the token from the service and I change the state with the getToken action */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const token = await getLogin(username, password)
           
            dispatch(getToken(token))

            const profil = await getProfile(token) // I recover the profil, if the status is 200 so loggedIn => true with logIn action and navigate to the profile page
            localStorage.setItem("localProfil", profil)
            if (profil.status === 200) {
                dispatch(logIn())
                dispatch(userInfo(profil.body))
                navigate("/profile", { state: { profil: profil.body } });
            }

            
            
        }
        catch (error) {
            setErrorState(true)
        }

    }

    return (
        <main className="main bg-dark login">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name='username'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            name='rememberMe'
                            onChange={handleChange}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {errorState && <div><p className="errorMessage">Email ou mot de passe invalide</p></div>}
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;