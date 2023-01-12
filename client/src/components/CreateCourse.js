import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCourse = ({context}) => {

  //set state for course
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()


const handleChange = (e) => {
  e.preventDefault()
if (e.target.name === 'courseTitle') {
  setTitle(e.target.value)
} else if (e.target.name === 'courseDescription') {
  setDescription(e.target.value)
} else if (e.target.name === 'estimatedTime') {
  setEstimatedTime(e.target.value)
} else if (e.target.name === 'materialsNeeded') {
  setMaterialsNeeded(e.target.value)
} else {
  return
}
};


  const handleSubmit = async(e) => {
    e.preventDefault()

    const body = {
      userId: context.authenticatedUser.id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    };

    await context.data.createCourse( body, 
      context.authenticatedUser.emailAddress,
      context.authenticatedUser.password
    )
    .then((errors) => {
      if (errors.length) {
        setErrors(errors)
      } else {
        navigate('/')
      }
    })
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
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
        <form onSubmit={handleSubmit}>
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
                By {context.authenticatedUser.firstName}{" "}
                {context.authenticatedUser.lastName}{" "}
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
            Create Course
          </button>
          <Link className="button button-secondary" to="/">
            {" "}
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
}

export default CreateCourse