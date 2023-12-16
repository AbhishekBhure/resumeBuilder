import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResumeFailure,
  fetchResumeStart,
  fetchResumeSuccess,
} from "./redux/resume/resumeSlice";

export default function DemoComponent() {
  const dispatch = useDispatch();
  const { resumes, loading, error } = useSelector((state) => state.resumes);
  const [data, setData] = useState([]);
  // Loading initial data from the server
  useEffect(function () {
    dispatch(fetchResumeStart());
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchResumeSuccess(data));
        setData(data);
      })
      .catch((error) => dispatch(fetchResumeFailure(error)));
  }, []);

  // Adding new data to the server using a POST request
  function addName(evt) {
    evt.preventDefault();
    if (evt.key === "Enter" && evt.target.value !== "") {
      const name = evt.target.value;
      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.length + 1, name }),
      })
        .then((res) => res.json())
        .then((newData) => setData([...data, newData]))
        .finally(() => {
          evt.target.value = "";
        });
    }
  }

  // Deleting data from the server using a DELETE request
  function deleteName(evt) {
    const id = evt.target.getAttribute("data-id");
    fetch(`/api/${id}`, {
      method: "DELETE",
    }).then(() => {
      const newData = data.filter((item) => item.id !== parseInt(id));
      setData(newData);
    });
  }
  return (
    <div className="demo-component">
      <input type="text" onKeyUp={addName} className="demo-input" />
      <ul className="demo-user-list">
        {resumes &&
          resumes.map((item) => (
            <li
              key={item.id}
              className="demo-list-item"
              // style={{ color: item.name.toLowerCase() }}
            >
              {item.profile ? (
                <div>
                  <span>{item.profile.name}</span>
                  <p>{item.profile.currentDesignation} </p>
                  <p>
                    {item.academics.map((acad) => (
                      <span>{acad.title} </span>
                    ))}
                  </p>
                </div>
              ) : (
                <span>No profile name available</span>
              )}
              <button onClick={deleteName} data-id={item.id}>
                X
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
