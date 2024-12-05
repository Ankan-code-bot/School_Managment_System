import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosCreate } from "react-icons/io";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [formValues, setFormValues] = useState({ title: "", description: "" });
  const [ShowNotifications, setShowNotifications] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-notifications`, {
          withCredentials: true,
        });
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to load notifications");
      }
    };
    fetchNotifications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/give-new-notification`,
        formValues,
        { withCredentials: true }
      );
      toast.success(response.data.message);

      const newNotification = {
        ...formValues,
        time: "Just now",
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setFormValues({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Toaster />
      {role !== "Student" ? (
        <div>
          {!ShowNotifications ? <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
              <h1 className="text-2xl font-bold text-blue-700 mb-6">Create Notification</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-blue-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    placeholder="Enter notification title"
                    className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-blue-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-blue-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    placeholder="Enter notification description"
                    className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-blue-900"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setShowNotifications(true)}
                >
                  Create Notification
                </button>
              </form>
            </div>
          </div> :
            <div className="min-h-screen bg-[url(https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2022/01/good-nature-homepage-hero_2-scaled.jpg)] bg-cover bg-center p-4 md:p-14 mt-0">
              <div className="text-blue-600 text-5xl mt-4 " onClick={() => setShowNotifications(false)}><IoIosCreate /></div>
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:mt-8">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Notifications</h1>
                {notifications.length > 0 ? (
                  <ul className="space-y-4">
                    {notifications.map((notification) => (
                      <li
                        key={notification._id}
                        className="p-4 bg-blue-100 rounded-lg shadow-sm hover:bg-blue-200 transition-colors"
                      >
                        <h2 className="text-lg font-semibold text-blue-900">{notification.title}</h2>
                        <p className="text-sm text-blue-700">{notification.desc}</p>
                        <p className="text-xs text-blue-500 mt-1">{notification.time}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-blue-700 text-sm">No Notifications</p>
                )}
              </div>
            </div>
          }

        </div>
      ) : (
        <div className="min-h-screen bg-[url(https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2022/01/good-nature-homepage-hero_2-scaled.jpg)] bg-cover bg-center p-4 md:p-16 mt-0 md:mt-10">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-6">Notifications</h1>
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li
                    key={notification._id}
                    className="p-4 bg-blue-100 rounded-lg shadow-sm hover:bg-blue-200 transition-colors"
                  >
                    <h2 className="text-lg font-semibold text-blue-900">{notification.title}</h2>
                    <p className="text-sm text-blue-700">{notification.desc}</p>
                    <p className="text-xs text-blue-500 mt-1">{notification.time}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-blue-700 text-sm">No Notifications</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
