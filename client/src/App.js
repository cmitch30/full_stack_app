import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Courses from "./components/Courses";
import Header from "./components/Header";
import withContext from "./Context";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoutes from "./PrivateRoute";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);

const App = () => {
  return (
    <Router>
      <header>
        <HeaderWithContext />
      </header>
      <main>
        {
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/courses/create"
                element={<CreateCourseWithContext />}
              />
              <Route
                path="/courses/:id/update"
                element={<UpdateCourseWithContext />}
              />
            </Route>
            <Route path="/" element={<CoursesWithContext />} />
            <Route path="/courses/:id" element={<CourseDetailWithContext />} />
            <Route path="/signin" element={<UserSignInWithContext />} />
            <Route path="/signup" element={<UserSignUpWithContext />} />
            <Route path="/signout" element={<UserSignOutWithContext />} />
          </Routes>
        }
      </main>
    </Router>
  );
};

export default App;
