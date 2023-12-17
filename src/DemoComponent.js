import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, MdModeEditOutline } from "./icons";
import {
  fetchResumeFailure,
  fetchResumeStart,
  fetchResumeSuccess,
} from "./redux/resume/resumeSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

export default function DemoComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(false);
  const { resumes, loading, error } = useSelector((state) => state.resumes);
  const [data, setData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  console.log(data);

  // Loading initial data from the server
  useEffect(function () {
    dispatch(fetchResumeStart());
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchResumeSuccess(data));
        setData(data);
      })
      .catch((error) => {
        dispatch(fetchResumeFailure(error));
      });
  }, []);

  const handleRemove = (resumeId) => {
    setDataLoading(true);
    fetch(`/api/${resumeId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Fetch the updated data
        return fetch("/api");
      })
      .then((res) => res.json())
      .then((updatedData) => {
        dispatch(fetchResumeSuccess(updatedData));
        setData(updatedData);
        navigate("/");
        setDataLoading(false);
        setShowDeleteConfirmation(false);
      })
      .catch((error) => {
        console.error(
          `Error deleting resume with ID ${resumeId}:`,
          error.message
        );
        setDataLoading(false);
      });
  };

  return (
    <div className="demo-component p-5 md:px-20 md:py-10">
      <h1 className="text-4xl  md:text-5xl">Resumes :</h1>
      <ul className="demo-user-list flex px-6 py-9 gap-5 flex-wrap justify-center">
        {resumes && loading ? (
          <Loader />
        ) : (
          resumes.length > 0 &&
          resumes.map((item) => (
            <li
              key={item.id}
              className="demo-list-item  p-3 shadow-card bg-tertiary rounded-[20px] w-[300px]  "
            >
              <Link to={`/resume/${item.id}`}>
                {item.profile ? (
                  <div className="w-full flex flex-col gap-2  p-3 ">
                    <span className="text-2xl">{item.profile.name}</span>
                    <p className="text-sm">{item.profile.currentDesignation}</p>
                    <div>
                      {item.academics.map((acad, index) => (
                        <span key={index} className="text-xs flex flex-col">
                          {acad.title}
                        </span>
                      ))}
                    </div>
                    <p>
                      {item.experiences &&
                        item.experiences.map((exp, index) => (
                          <span key={index} className="text-xs flex flex-col">
                            {exp.title}
                          </span>
                        ))}
                    </p>
                    <p>
                      {item.projects &&
                        item.projects.map((pro, index) => (
                          <span key={index} className="text-xs flex flex-col">
                            {pro.title}
                          </span>
                        ))}
                    </p>
                  </div>
                ) : (
                  <span>No profile name available</span>
                )}
              </Link>
              <div className="flex gap-3 items-center mt-3">
                <Link to={`/update/${item.id}`}>
                  <button>
                    <MdModeEditOutline />
                  </button>
                </Link>
                <button onClick={() => setShowDeleteConfirmation(true)}>
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <>
        <DeleteConfirmationModal
          isOpen={showDeleteConfirmation}
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={() => handleRemove(data[0].id)}
        />
      </>
    </div>
  );
}
