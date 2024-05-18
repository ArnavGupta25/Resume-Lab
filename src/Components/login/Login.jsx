import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ResumeContext from '../../Context/ResumeContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons
import './login.css'

const Login = (props) => {
    const { themeData, setThemeData, signup, setSignup, setSignedin, setUser } = useContext(ResumeContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = (signup ? 'Register' : 'Login') + ' | Resume Lab';
    }, [signup]);

    function handleSubmit(e) {
        e.preventDefault();
        if (signup) {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.displayName = name;
                    setSignedin(true);
                    setLoading(false);
                    setThemeData({ ...themeData, personalData: { ...themeData.personalData, name: name, email: email } });
                    setUser({ uid: user.uid, name: name, email: email, data_length: 0 });
                    const db = getDatabase();
                    set(ref(db, 'users/' + user.uid), {
                        name: name,
                        email: email,
                        Data: [],
                    });
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage);
                    setLoading(false);
                    alert(errorMessage);
                });
        } else {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser({ uid: user.uid, name: user.displayName, email: user.email, data_length: 0 });
                    setThemeData({ ...themeData, personalData: { name: user.displayName, email: user.email } });
                    const db = getDatabase();
                    get(ref(db, 'users/' + user.uid)).then((snapshot) => {
                        if (snapshot.exists()) {
                            setUser({ ...user, data_length: snapshot.val().Data ? snapshot.val().Data.length : 0 });
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                    setSignedin(true);
                    setLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage);
                    setLoading(false);
                    alert(errorMessage);
                });
        }
        navigate('/');
    }

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    data_length: 0
                });
                setThemeData({
                    ...themeData,
                    personalData: { name: user.displayName, email: user.email }
                });
                const db = getDatabase();
                get(ref(db, 'users/' + user.uid))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setUser({ ...user, data_length: snapshot.val().Data.length });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                setSignedin(true);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
                setLoading(false);
                alert(errorMessage);
                return;
            });
        navigate('/');
    };

    const handleForgotPassword = () => {
        const email = prompt('Enter your email address');
        if (email !== null) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Password reset email sent');
                })
                .catch((error) => {
                    console.error(error);
                    alert('An error occurred. Please try again');
                });
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="row w-100">
                <div className="col-md-6 offset-md-3">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">{signup ? 'Register' : 'Login'}</h2>
                        <form onSubmit={handleSubmit}>
                            {signup && (
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                            )}
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group position-relative">
                                <label>Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>{signup ? 'Register' : 'Login'}</button>
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            {!signup && (
                                <div className="text-center">
                                    <p>
                                        Don't have an account?{' '}
                                        <Link to="/register" onClick={(e) => {
                                            e.preventDefault();
                                            setSignup(true);
                                        }}>Register</Link>
                                    </p>
                                    <p>
                                        <Link to="/forgot-password" onClick={(e) => {
                                            e.preventDefault();
                                            handleForgotPassword();
                                        }}>Forgot Password?</Link>
                                    </p>
                                </div>
                            )}
                            {signup && (
                                <div className="text-center">
                                    <p>
                                        Already have an account?{' '}
                                        <Link to="/login" onClick={(e) => {
                                            e.preventDefault();
                                            setSignup(false);
                                        }}>Login</Link>
                                    </p>
                                </div>
                            )}
                        </form>
                        <div className="text-center mt-4">
                            <button onClick={handleGoogleSignIn} className="btn btn-danger btn-block d-flex align-items-center justify-content-center">
                                <FcGoogle className="mr-2" size={24} />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
