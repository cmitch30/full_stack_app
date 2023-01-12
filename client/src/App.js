import React from "react";
import { Route, Routes } from "react-router-dom";

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
const PrivateRouteWithContext = withContext(PrivateRoutes)

const App = () => {
  return (
    <React.Fragment>
      <HeaderWithContext />

      <Routes>
        <Route
          path="courses/create"
          element={
            <PrivateRouteWithContext>
              <CreateCourseWithContext />
            </PrivateRouteWithContext>
          }
        />

        <Route
          path="courses/:id/update"
          element={
            <PrivateRouteWithContext>
              <UpdateCourseWithContext />
            </PrivateRouteWithContext>
          }
        />

        <Route path="/" element={<CoursesWithContext />} />
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
        <Route path="courses/:id" element={<CourseDetailWithContext />} />
      </Routes>
    </React.Fragment>
  );
};


export default App;
