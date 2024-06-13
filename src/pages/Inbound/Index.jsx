import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Inbound() {
    const [inbound, setInbound] = useState([]);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('inbound')
            .then(res => {
                setInbound(res.data.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
                } else {
                    setError({ message: 'Terjadi kesalahan saat memuat daftar barang.' });
                }
            });
    }, [navigate]);

    const deleteInbound = (id) => {
        instance.delete(`inbound/destroy/${id}`)
            .then(() => {
                setInbound(inbound.filter(item => item.id !== id));
                setSuccess('Barang berhasil dihapus.');
                setTimeout(() => {
                    setSuccess('');
                }, 2000);
            })
            .catch(err => {
                setError(err.response.data);
            });
    };

    const UrlImage = "http://localhost:8000/upload-images/";

    return (
        <div className="bg-white min-h-screen">
            <Case>
                <div className="block w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h5 className="text-3xl font-medium text-white">Inbound</h5>
                            <Link to="/inbound/create">
                                <button className="px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg flex items-center">
                                    <small className="text-white">Tambah</small>
                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                                </button>
                            </Link>
                        </div>

                        {success && (
                            <div role="alert" className="mb-4">
                                <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                                    Berhasil!
                                </div>
                                <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                                    {success}
                                </div>
                            </div>
                        )}

                        {Object.keys(error).length > 0 && (
                            <div role="alert" className="mb-4">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-white">
                                    <ul>
                                        {error.message}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500 text-xs text-white uppercase bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">No</th>
                                        <th scope="col" className="px-6 py-4">stuff_id</th>
                                        <th scope="col" className="px-6 py-4">total</th>
                                        <th scope="col" className="px-6 py-4">date</th>
                                        <th scope="col" className="px-6 py-4">proff_file</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inbound.map((item, index) => (
                                        <tr key={item.id} className={`border-b dark:border-neutral-500 ${index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'}`}>
                                            <td className="whitespace-nowrap px-6 py-4 text-white">{index + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-white">{item.stuff_id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-white">{item.total}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-white">{item.date}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <img src={UrlImage + item.proff_file} alt="" className="w-16 h-auto object-cover" />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 flex space-x-2">
                        
                                                <button onClick={() => deleteInbound(item.id)} type="button" className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-white">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                               
                               </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    </div>
);
}
