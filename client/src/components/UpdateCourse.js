import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  useEffect(() => {
    context.data.getCourse(id)
      .then((res) => {
        setCourse(res);
        setTitle(res.title);
        setDescription(res.description);
        setCourse(res.estimatedTime);
        setMaterialsNeeded(res.materialsNeeded);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const handleUpdate = async (e) => {
    e.preventDafault();
    //set course object
    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    await context.data
      .updateCourse(
        id,
        body,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "courseTitle") {
      setTitle(e.target.value);
    } else if (e.target.name === "courseDescription") {
      setDescription(e.target.value);
    } else if (e.target.name === "estimatedTime") {
      setEstimatedTime(e.target.value);
    } else if (e.target.name === "materialsNeeded") {
      setMaterialsNeeded(e.target.value);
    } else {
      return;
    }
  };

  
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleUpdate}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={handleChange}
              />

              <p>
                By {course.firstName} {course.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button className="button button-secondary" onChange={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse