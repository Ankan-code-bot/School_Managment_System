import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const AddResult = () => {
  const [results, setResults] = useState([]);

  const tableHeadings = [
    "Bengali",
    "English",
    "Mathematics",
    "History",
    "Geography",
    "Physics",
    "Biology",
    "Total",
  ];

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-result`, {
          withCredentials: true,
        });
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
        alert("Failed to fetch results. Please try again.");
      }
    };

    fetchResults();
  }, []);


  const [formData, setFormData] = useState({
    studentId: "",
    Bengali: "",
    English: "",
    Mathematics: "",
    History: "",
    Geography: "",
    Physics: "",
    Biology: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/post-result`,
        formData,
        { withCredentials: true }
      );
      toast.success("Result added successfully!");

      setFormData({
        studentId: "",
        Bengali: "",
        English: "",
        Mathematics: "",
        History: "",
        Geography: "",
        Physics: "",
        Biology: "",
      });
    } catch (error) {
      console.error("Error adding result:", error);
    }
  };

  const role = localStorage.getItem("role");

  return (
    <>
      <Toaster />
      {role !== "Student" ? (
        <div
          className="min-h-screen bg-cover bg-center flex items-center bg-[url(https://wallpaperaccess.com/full/284466.jpg)] md:mt-[8vh] justify-center"

        >
          <div className="bg-inherit bg-opacity-30 rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
            <h2 className="md:text-3xl text-xl font-bold text-center mb-6 text-white">
              🌟Upload Student Marks🌟
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="studentId" className="block md:text-xl font-medium text-blue-900 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-blue-400 text-blue-600 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Student ID"
                />
              </div>

              {[
                "Bengali",
                "English",
                "Mathematics",
                "History",
                "Geography",
                "Physics",
                "Biology",
              ].map((subject, index) => (
                <div key={index}>
                  <label
                    htmlFor={subject.toLowerCase()}
                    className="block text-blue-950 font-medium md:text-2xl mb-1"
                  >
                    {subject}
                  </label>
                  <input
                    type="number"
                    id={subject.toLowerCase()}
                    name={subject}
                    value={formData[subject]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-blue-400 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter marks for ${subject}`}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 rounded-lg text-lg font-semibold text-white mt-4 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>) : (
        <div className="min-h-screen bg-gray-100 py-10 px-4 md:mt-16">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">📋 Student Results</h2>

          <div className="overflow-x-auto">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={index}
                  className="mb-8 border border-blue-800 rounded-lg bg-white shadow-md p-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {tableHeadings.map((heading, i) => (
                      <React.Fragment key={i}>
                        <div className="font-bold text-blue-700">{heading}</div>
                        <div className="text-gray-700">{result[heading.toLowerCase()] || "-"}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </div>
        </div>
      )
      }
    </>
  );
};

export default AddResult;
