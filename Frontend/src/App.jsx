import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Pages/Login";
import { SignUp } from "./Components/Pages/SignUp";
import { Profile } from "./Components/Pages/Profile";
import { Layout } from "./Components/Layout/Layout";
import { useSelector } from "react-redux";
import NotFoundPage from "./Components/Pages/404";
import { Logout } from "./Components/Pages/Logout";
import { EditProfile } from "./Components/Pages/EditProfile";
import { ChangePass } from "./Components/Pages/ChangePass";
import { Notifications } from "./Components/Pages/Notifications";
import AssignmentSection from "./Components/Pages/Assignment";
import ClassesPage from "./Components/Pages/Classes";
import Aifriend from "./Components/Pages/Aifriend";
import AttendancePage from "./Components/Pages/Attendance";
import { DeleteProfile } from "./Components/Pages/DeleteProfile";
import AddResult from "./Components/Pages/Result";
import { DeleteUser } from "./Components/Pages/BlockUser";

const App = () => {
  const LogIn = useSelector((state) => state.auth.isLogged);

  console.log(LogIn);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/layout" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="assignment" element={<AssignmentSection />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="change-pass" element={<ChangePass />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="friend" element={<Aifriend />} />
          <Route path="attendance" element={<ClassesPage />} />
          <Route path="block" element={<DeleteUser />} />
          <Route path="attendance/attendance/:className" element={<AttendancePage />} />
          <Route path="result" element={<AddResult />} />
        </Route>

        <Route path="/layout/logout" element={<Logout />} />
        <Route path="/layout/delete" element={<DeleteProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
