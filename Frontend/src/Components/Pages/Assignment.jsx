import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const AssignmentSection = () => {
  const [assignData, setAssignData] = useState(null);
  const [ChangeUI, setChangeUI] = useState();
  const [MakeAssign, setMakeAssign] = useState(false);
  const role = localStorage.getItem("role");

  if (role === "Student") {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-assignment`, {
            withCredentials: true,
          });
          setAssignData(response.data.assignment);
        } catch (error) {
          console.error("Error fetching assignments:", error);
        }
      };

      fetchData();
    }, [ChangeUI]);
  } else {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-assignment`, {
            withCredentials: true,
          });
          setAssignData(response.data.assignment);
        } catch (error) {
          console.error("Error fetching assignments:", error);
        }
      };

      fetchData();
    }, [ChangeUI]);
  }

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    subject: "",
    deadline: "",
    className: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/add-assignment`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Assignment created successfully!");
        setMakeAssign(false);
      } else {
        toast.error(response.data.message || "Failed to create Assignment.");
      }
    } catch (error) {
      console.error("Error creating Assignment:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Server error occurred.");
      } else {
        toast.error("Failed to connect to the server.");
      }
    }
  };

  const deleteAssignment = async ({ id }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/delete-assignment/${id}`, { withCredentials: true });
      toast.success(response.data.message);
      setChangeUI(id);
    } catch (error) {
      toast.error("Failed to connect to the server.");
      console.log(error);
    }
  }

  return (
    <>
      <Toaster />
      {!MakeAssign ? (
        <div className="p-6 bg-blue-50 min-h-screen mt-0 md:mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Assignments</h2>
            {role !== "Student" && (
              <div className="text-blue-600 text-5xl mb-4 hover:text-blue-800 hover:scale-110 transition-all duration-300 cursor-pointer" onClick={() => setMakeAssign(true)}><IoIosCreate /></div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignData ? (
              assignData.map((assignment, i) => (
                <div
                  key={i}
                  className="p-4 bg-white shadow-md rounded-lg border border-blue-200 hover:bg-gray-200 duration-300"
                >
                  {role !== "Student" && (
                    <div className="flex justify-end text-red-500 text-2xl">
                      <MdDelete
                        className="hover:bg-red-200 rounded-full"
                        onClick={() => deleteAssignment({ id: assignment._id })}
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-blue-800">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {assignment.desc}
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-2">
                    Subject: <span className="text-blue-700">{assignment.subject}</span>
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Loading assignments...</p>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-6 bg-blue-100 mt-0 md:mt-24 mb-4 text-blue-950 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Assignment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-lg font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="desc" className="block text-lg font-medium">
                Description
              </label>
              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label htmlFor="subject" className="block text-lg font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-lg font-medium">
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="className" className="block text-lg font-medium">
                Class
              </label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              >
                <option value="">Select Class</option>
                <option value="Five">Five</option>
                <option value="Six">Six</option>
                <option value="Seven">Seven</option>
                <option value="Eight">Eight</option>
                <option value="Nine">Nine</option>
                <option value="Ten">Ten</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Give Assignment
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AssignmentSection;
