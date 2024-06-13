import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function LendingTrash() {
    const [trashedLendings, setTrashedLendings] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('lendings/trash')
        .then(res => {
            setTrashedLendings(res.data.data);
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            } else {
                setError('Terjadi kesalahan saat memuat daftar lending.');
            }
        });
    }, [navigate]);

    const restoreLending = (id) => {
        instance.put(`lendings/restore/${id}`)
        .then(() => {
            setTrashedLendings(trashedLendings.filter(lending => lending.id !== id));
            setSuccess('Lending berhasil dipulihkan.');
            setTimeout(() => {
                setSuccess('');
            }, 2000);
        })
        .catch(() => {
            setError('Gagal memulihkan lending.');
        });
    };

    const deleteLendingPermanently = (id) => {
        instance.delete(`lendings/permanent/${id}`)
        .then(() => {
            setTrashedLendings(trashedLendings.filter(lending => lending.id !== id));
            setSuccess('Lending berhasil dihapus permanen.');
            setTimeout(() => {
                setSuccess('');
            }, 2000);
        })
        .catch(() => {
            setError('Gagal menghapus lending secara permanen.');
        });
    };

    return (
        <Case>
            <div className="block w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h5 className="text-3xl font-medium text-gray-900 dark:text-white">Trash Lending</h5>
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

                    {error && (
                        <div role="alert" className="mb-4">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Date_Time</th>
                                    <th scope="col" className="px-6 py-4">Stuff_id</th>
                                    <th scope="col" className="px-6 py-4">User_id</th>
                                    <th scope="col" className="px-6 py-4">Notes</th>
                                    <th scope="col" className="px-6 py-4">Total Stuff</th>
                                    <th scope="col" className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {trashedLendings.map((lending, index) => (
                                    <tr key={lending.id} className="border-b dark:border-neutral-500">
                                        <td className="text-white px-6 py-4">{index + 1}</td>
                                        <td className="text-white px-6 py-4">{lending.name}</td>
                                        <td className="text-white px-6 py-4">{lending.date_time}</td>
                                        <td className="text-white px-6 py-4">{lending.stuff_id}</td>
                                        <td className="text-white px-6 py-4">{lending.user_id}</td>
                                        <td className="text-white px-6 py-4">{lending.notes}</td>
                                        <td className="text-white px-6 py-4">{lending.total_stuff}</td>
                                        <td className="whitespace-nowrap px-6 py-4 flex space-x-2">
                                            <button onClick={() => restoreLending(lending.id)} type="button" className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-white flex items-center">
                                                <FontAwesomeIcon icon={faTrashRestore} className="mr-1" /> Restore
                                            </button>
                                            <button onClick={() => deleteLendingPermanently(lending.id)} type="button" className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-white flex items-center">
                                                <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Hapus Permanen
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
