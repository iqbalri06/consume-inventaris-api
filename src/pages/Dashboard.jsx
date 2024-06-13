import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import Inbound from "./Inbound/Index";

export default function Dashboard() {

    const [stuffs, setStuffs] = useState([]);
    const [users, setUsers] = useState([]);
    const [inbounds, setInbounds] = useState([]);
    const [checkProses, setCheckProses] = useState(false);
    const [landingGrouped, setLandingGrouped] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getDataStuffs();
        getDataUsers();
        getDataLendings();
        getDataInbounds();
    }, [checkProses]);

    function getDataStuffs() {
        axios.get('http://localhost:8000/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }

    function getDataUsers(){
        axios.get('http://localhost:8000/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            if(err.response.status === 401){
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }

    function getDataInbounds(){
        axios.get('http://localhost:8000/inbound', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setInbounds(res.data.data);
        })
        .catch(err => {
            if(err.response.status === 401){
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }
    
    function getDataLendings(){
        axios.get('http://localhost:8000/lendings', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            const data = res.data.data;

            const groupedData = {};
            data.forEach((entry) => {
                const date = new Date(entry.date_time);
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                if(!groupedData[formattedDate]){
                    groupedData[formattedDate] = [];
                }
                groupedData[formattedDate].push(entry);
            });

            const processedData = Object.keys(groupedData).map((date) => ({
                date,   
                totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
            }));    

            setLandingGrouped(processedData);
            setCheckProses(true);
        })
        .catch(err => {
            if (err.response.status === 401){
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }

    return (
        <Case>
             <div className="bg-gray-650 flex flex-wrap justify-center m-10">
                <div className="p-4 w-full md:w-1/2">
                    <div className="flex rounded-lg border border-white h-full bg-gradient-to-r from-yellow-400 to-red-500 p-8 flex-col shadow-lg hover:bg-yellow-500 transition duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white text-lg font-medium">Data Stuff</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white text-lg font-medium">{stuffs.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-full md:w-1/2">
                    <div className="flex rounded-lg border border-white h-full bg-gradient-to-r from-yellow-400 to-red-500 p-8 flex-col shadow-lg hover:bg-yellow-500 transition duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white text-lg font-medium">Data User</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white text-lg font-medium">{users.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-full md:w-1/2">
                    <div className="flex rounded-lg border border-white h-full bg-gradient-to-r from-yellow-400 to-red-500 p-8 flex-col shadow-lg hover:bg-yellow-500 transition duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white text-lg font-medium">Data Inbound</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white text-lg font-medium">{inbounds.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-full md:w-1/2">
                    <div className="flex rounded-lg border border-white h-full bg-gradient-to-r from-yellow-400 to-red-500 p-8 flex-col shadow-lg hover:bg-yellow-500 transition duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white text-lg font-medium">Data Lending</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white text-lg font-medium">{landingGrouped.length}</h1>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-full">
                    <div className="rounded-lg border border-white bg-gradient-to-r from-yellow-400 to-red-500 p-8 shadow-lg hover:bg-yellow-500 transition duration-300">
                        <h2 className="text-white text-lg font-medium mb-3">Grafik Peminjaman</h2>
                        <div className="w-full">
                            <BarChart
                                width={500}
                                height={300}
                                data={landingGrouped}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalStuff" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        </Case>
    );
}
