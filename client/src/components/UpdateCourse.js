import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateCourse({ context }) {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [materialsNeeded, setMaterialsNeeded] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  /*
    on page load get course details
    if no data is returned, send user to /notfound
    if 500 is returned, send user to /error
    else if the course owner is the authenticated set the course states
    else send user to /forbidden
  */
  useEffect(() => {
    context.data.getCourse(id).then((data) => {
      if (data === null) {
        navigate("/notfound");
      } else if (data === 500) {
        navigate("/error");
      } else {
        if (data.userId === context.authenticatedUser.id) {
          setCourse(data);
          setTitle(data.title);
          setDescription(data.description);
          setEstimatedTime(data.estimatedTime);
          setMaterialsNeeded(data.materialsNeeded);
          setIsLoading(false);
        } else {
          navigate("/forbidden");
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    on form submit, send a put request to api
    if an array is returned, display errors
    if 500 is returned, send user to /error
    else send user to /
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userId: context.authenticatedUser?.id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    context.data
      .updateCourse(id, body, {
        emailAddress: context.authenticatedUser?.emailAddress,
        password: context.authenticatedUser?.password,
      })
      .then((res) => {
        console.log(res);
        if (res.length) {
          setErrors(res);
        } else if (res === 500) {
          navigate("/errors");
        } else {
          navigate("/");
        }
      });
  };

  return !isLoading ? (
    <>
      <div className="wrap">
        <h2>Update Course</h2>
        {errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue={course.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                htmlFor="courseDescription"
                name="courseDescription"
                defaultValue={course.description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue={course.estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                defaultValue={course.materialsNeeded}
                onChange={(e) => setMaterialsNeeded(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <Link to={`/`} className="button button-secondary">
            Cancel
          </Link>
        </form>
      </div>
    </>
  ) : null;
}
