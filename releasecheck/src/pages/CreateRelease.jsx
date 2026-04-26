import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function CreateRelease() {
  const today = new Date().toISOString().split('T')[0];
  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  const API = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/releases`, {
        name,
        date,
        additional_info: info
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error creating release");
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <div className="mx-auto text-center pt-5">
        <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
          ReleaseCheck
        </h2>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          Your all in one release checklist tool
        </p>
      </div>
      <div className="mt-10 pb-1">
        <div className="relative overflow-hidden bg-white shadow-sm rounded-xl border border-gray-400 mx-6">
          <div className="p-4 my-2 flex items-center justify-between space-x-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link to="/">
                    <a href="#" className="text-gray-500 inline-flex items-center text-md font-medium text-body hover:text-fg-brand">
                      All Releases
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" /></svg>
                    <a href="#" className="inline-flex items-center text-gray-500 underline text-md font-medium text-body hover:text-fg-brand">Create Release</a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <hr className="text-gray-300" />

          <div className="overflow-x-auto mx-4 mt-2">
            <div className="flex gap-3">
              <div className="mb-5">
                <label for="release" className="block mb-2.5 text-sm font-medium text-heading">Release</label>
                <input value={name}
                  onChange={(e) => setName(e.target.value)} type="text" id="release" className=" border border-default-medium border-gray-500 text-heading text-sm block w-60 px-3 py-2.5 rounded" placeholder="Versin 0.0.1" required />
              </div>
              <div className="mb-5">
                <label htmlFor="release" className="block mb-2.5 text-sm font-medium text-gray-900">
                  Date
                </label>
                <input
                  id="release"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-60 ps-10 pe-3 py-2.5 border border-gray-500 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <div className="mb-5">
                <label for="message" className="block mb-2.5 text-sm font-medium text-heading">Addional info</label>
                <textarea id="message" rows="5" value={info}
                  onChange={(e) => setInfo(e.target.value)} className="border border-default-medium border-gray-500 text-heading text-sm rounded block w-140 p-3.5" placeholder="Please Add any other important notes for the release"></textarea>
              </div>
              <div className="flex py-5 items-end">
                <button onClick={handleSubmit} className="h-11 flex gap-2 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                  <span>Save</span>
                  <svg xmlns="http://w3.org" className="w-5 h-5 mt-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}