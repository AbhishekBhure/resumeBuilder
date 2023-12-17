import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResumeFailure,
  fetchResumeStart,
  fetchResumeSuccess,
} from "./redux/resume/resumeSlice";
import { Link } from "react-router-dom";

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
    <div className="demo-component p-5 md:px-20 md:py-10">
      {/* <input type="text" onKeyUp={addName} className="demo-input" /> */}
      <h1 className="text-5xl">Resumes :</h1>
      <ul className="demo-user-list flex px-6 py-9 gap-5 flex-wrap justify-center">
        {resumes &&
          resumes.length > 0 &&
          resumes.map((item) => (
            <Link to={`/resume/${item.id}`}>
              <li
                key={item.id}
                className="demo-list-item  p-3 shadow-card bg-tertiary rounded-[20px] w-[250px]"
                // style={{ color: item.name.toLowerCase() }}
              >
                {item.profile ? (
                  <div>
                    <span className="text-2xl">{item.profile.name}</span>
                    <p className="text-sm">
                      {item.profile.currentDesignation}{" "}
                    </p>
                    <p>
                      {item.academics.map((acad) => (
                        <span className="text-xs flex flex-col">
                          {acad.title}
                        </span>
                      ))}
                    </p>
                    <p>
                      {item.experiences &&
                        item.experiences.map((exp) => (
                          <span className="text-xs flex flex-col">
                            {exp.title}
                          </span>
                        ))}
                    </p>
                    <p>
                      {item.projects &&
                        item.projects.map((pro) => (
                          <span className="text-xs flex flex-col">
                            {pro.title}
                          </span>
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
            </Link>
          ))}
      </ul>
    </div>
  );
}
