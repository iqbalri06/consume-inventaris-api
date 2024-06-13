import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.log('Token tidak ditemukan di local storage');
            navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            return;
        }

        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                setIsLogin(true);
                setAuthUser(res.data.data);
                if (location.pathname === '/login') {
                    navigate('/profile');
                }
            })
            .catch(err => {
                setIsLogin(false);
                if (err.response && err.response.status === 401 && location.pathname !== '/login') {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login'));
                }
            });
    }, [navigate]);

    return (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3 shadow-lg">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        className="text-lg font-bold text-white uppercase tracking-wider"
                        to="/"
                    >
                        INVENTARIS APP
                    </Link>
                    {!isLogin && <Link to="/login" className="ml-4 text-sm text-white hover:text-gray-300">Login</Link>}
                    
                    {isLogin && authUser ? (
                        <div className="flex items-center ml-4 space-x-4">
                            {authUser.role === 'admin' && (
                                <>
                                    <Link to="/stuff" className="text-sm text-white hover:text-gray-300">Stuff</Link>
                                    <Link to="/inbound" className="text-sm text-white hover:text-gray-300">Inbound</Link>
                                    <Link to="/lending" className="text-sm text-white hover:text-gray-300">Lending</Link>
                                    <Link to="/user" className="text-sm text-white hover:text-gray-300">User</Link>
                                </>
                            )}
                            {authUser.role === 'staff' && (
                                <Link to="/lending" className="text-sm text-white hover:text-gray-300">Lending</Link>
                            )}
                        </div>
                    ) : null}
                </div>
                
                {isLogin && <Link to="/profile" className="text-sm text-white hover:text-gray-300">Profile</Link>}
            </div>
        </div>
    );
}
