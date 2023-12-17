import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import Loader from "../components/Loader";
import { FaTrashAlt, MdModeEditOutline } from "../icons";

const SingleResume = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { resumes } = useSelector((state) => state.resumes);
  console.log("resume", resume);

  useEffect(() => {
    const resumeId = params.id;
    const fetchResume = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/${resumeId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch resume with ID ${resumeId}`);
        }
        const data = await res.json();
        setResume(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleRemove = (resumeId) => {
    fetch(`/api/${resumeId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedResumes = resumes.filter((item) => item.id !== resumeId);
        navigate("/");
        setResume(updatedResumes);
        setShowDeleteConfirmation(false);
      })
      .catch((error) => {
        console.error(
          `Error deleting resume with ID ${resumeId}:`,
          error.message
        );
      });
  };

  return (
    <div className="p-3 md:p-16">
      <BackButton />
      <div>
        {resume && loading ? (
          <Loader />
        ) : (
          Object.keys(resume).length > 0 && (
            <div className="flex flex-col max-w-4xl py-8  mx-auto justify-center items-center">
              <div className="border w-full p-3 md:px-10 md:py-8 bg-slate-500">
                <h1 className="text-4xl">{resume.profile.name} </h1>
                <div className="border-b p-3">
                  <p className="text-sm">{resume.profile.phone} </p>
                  <p className="text-sm">{resume.profile.email} </p>
                  <p className="text-sm">{resume.profile.location} </p>
                  {resume.profile.website && <p>{resume.profile.website}</p>}
                </div>
              </div>
              <div className="bg-gray-100 p-3 md:px-10 md:py-8 text-black w-full">
                <div>
                  <h1 className="text-2xl">About Me </h1>
                  <div className="border my-2"></div>
                  <p>{resume.aboutMe} </p>
                </div>
                <br />
                <div>
                  <h1 className="text-2xl">Education </h1>
                  <div className="border my-2"></div>

                  {resume.academics.map((acad, index) => (
                    <div key={index} className="">
                      <div className="flex justify-between items-center">
                        <div>
                          <span>{index + 1}. </span> {acad.title}
                          {acad.description && (
                            <p className="text-sm"> {acad.description} </p>
                          )}
                        </div>
                        <div className="flex gap-4">
                          <p className="text-xs md:text-sm">
                            {acad.startDate} - {acad.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <br />

                <div>
                  <h1 className="text-2xl">Experience</h1>
                  <div className="border my-2"></div>

                  {resume.experiences &&
                    //   !resume.experiences.title === "fresher" &&
                    resume.experiences.map((exp, index) => (
                      <div key={index} className="">
                        <div className="flex justify-between items-center">
                          <div>
                            <span>{index + 1}. </span> {exp.title}
                            {exp.description && (
                              <p className="text-sm"> {exp.description} </p>
                            )}
                          </div>
                          <div className="flex gap-4">
                            <p className="text-xs md:text-sm">
                              {exp.startDate} - {exp.endDate}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <br />
                <div>
                  <h1 className="text-2xl">Projects</h1>
                  <div className="border my-2"></div>
                  {resume.projects &&
                    resume.projects.map((pro, index) => (
                      <div key={index} className="">
                        <div className="flex justify-between">
                          <div>
                            <span>{index + 1}. </span> {pro.title}
                            <p className="text-sm">{pro.url} </p>
                            {pro.description && (
                              <p className="text-sm"> {pro.description} </p>
                            )}
                          </div>
                          <div className="flex gap-4">
                            <p className="text-xs md:text-sm">
                              {pro.startDate} - {pro.endDate}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <br />
                <div>
                  <h1 className="text-2xl">Skills</h1>
                  <div className="border my-2"></div>
                  <ul>
                    {resume.skills &&
                      resume.skills.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex gap-4">
        <Link to={`/update/${resume.id}`}>
          <button className="bg-tertiary p-3 rounded-lg flex gap-2 items-center">
            Update <MdModeEditOutline className="" />{" "}
          </button>
        </Link>
        <button
          className="bg-tertiary p-3 rounded-lg flex gap-2 items-center"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Delete <FaTrashAlt className="text-sm" />
        </button>
      </div>
      <>
        <DeleteConfirmationModal
          isOpen={showDeleteConfirmation}
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={() => handleRemove(resume.id)}
        />
      </>
    </div>
  );
};

export default SingleResume;
