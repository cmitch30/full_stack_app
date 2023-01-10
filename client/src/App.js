import React, { useState, useEffect } from "react";


function App() {
 const [course, setCourse] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/api/courses")
  .then((res) => res.json())
  .then((data) => setCourse(data));
})
  return (
    <div>
    {course.map((course) => {
    return (
    <ul>
      <li>{course.title}</li>
    </ul>
    )
    })}
    </div>
  );
}

export default App;
