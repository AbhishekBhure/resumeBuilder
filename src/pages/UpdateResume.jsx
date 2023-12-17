import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import AddItemBtn from "../components/AddItemBtn";
import Loader from "../components/Loader";

const UpdateResume = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialState = {
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  };
  const initialProjects = {
    title: "",
    startDate: "",
    endDate: "",
    url: "",
    description: "",
  };
  const initialSkill = { name: "", rating: 0 };
  const [formData, setFormData] = useState({
    profile: {
      name: "",
      currentDesignation: "",
      location: "",
      email: "",
      phone: "",
      website: "",
    },
    aboutMe: "",
    academics: [initialState],
    experiences: [initialState],
    projects: [initialProjects],
    skills: [initialSkill],
  });

  console.log(formData);

  useEffect(() => {
    const resumeId = params.id;
    const fetchResume = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/${resumeId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch the data");
        }
        const data = await res.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleChange = (section, index, field, value) => {
    setFormData((prevData) => {
      if (Array.isArray(prevData[section])) {
        return {
          ...prevData,
          [section]: prevData[section].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          ),
        };
      } else if (typeof prevData[section] === "object") {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: value,
          },
        };
      } else {
        // For non-array and non-object fields
        return {
          ...prevData,
          [section]: value,
        };
      }
    });
  };

  const handleAddItem = (section) => {
    let newItem;
    switch (section) {
      case "academics":
        newItem = initialState;
        break;
      case "experiences":
        newItem = initialState;
        break;
      case "projects":
        newItem = initialProjects;
        break;
      case "skills":
        newItem = initialSkill;
        break;
      default:
        newItem = {};
    }

    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newItem],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter out empty objects before submitting
    const filteredData = {
      ...formData,
      academics: formData.academics.filter(
        (academic) => academic.title || academic.year || academic.description
      ),
      experiences: formData.experiences.filter(
        (experience) =>
          experience.title || experience.year || experience.description
      ),
      projects: formData.projects.filter(
        (project) =>
          project.title ||
          project.startDate ||
          project.endDate ||
          project.url ||
          project.description
      ),
      skills: formData.skills.filter((skill) => skill.name || skill.rating > 0),
    };
    try {
      setLoading(true);

      const res = await fetch(`/api/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });
      if (res.ok) {
        const newResume = await res.json();
        setFormData(newResume);
        setLoading(false);
        navigate(`/resume/${params.id}`);
      } else {
        setLoading(false);
        console.log("Error while updating");
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 md:p-16">
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        Object.keys(formData).length > 0 && (
          <div>
            <h1 className="text-center text-5xl md:text-7xl">Update Resume</h1>
            <form onSubmit={handleSubmit} className=" p-6">
              <div className="flex  flex-col  gap-9">
                {/* Profile Section */}
                <div className="flex flex-col gap-4 mx-auto">
                  <h1 className="text-4xl">Profile</h1>
                  <InputField
                    label="Name"
                    type="text"
                    value={formData.profile.name}
                    onChange={(value) =>
                      handleChange("profile", null, "name", value)
                    }
                  />
                  <InputField
                    label="Curren Designation"
                    type="text"
                    value={formData.profile.currentDesignation}
                    onChange={(value) =>
                      handleChange("profile", null, "currentDesignation", value)
                    }
                  />
                  <InputField
                    label="Location"
                    type="text"
                    value={formData.profile.location}
                    onChange={(value) =>
                      handleChange("profile", null, "location", value)
                    }
                  />
                  <InputField
                    label="Email"
                    type="email"
                    required
                    value={formData.profile.email}
                    onChange={(value) =>
                      handleChange("profile", null, "email", value)
                    }
                  />
                  <InputField
                    label="Phone No."
                    type="tel"
                    value={formData.profile.phone}
                    onChange={(value) =>
                      handleChange("profile", null, "phone", value)
                    }
                  />
                  {/* Profile section end */}
                  {/* About Me Section */}
                  <TextArea
                    label="About Me"
                    value={formData.aboutMe}
                    onChange={(value) =>
                      handleChange("aboutMe", null, "aboutMe", value)
                    }
                  />
                  {/* About Me Section end */}
                </div>
                <div className="flex  justify-center flex-col md:flex-row gap-8">
                  {/* Academics Section */}
                  <div className="">
                    <h1 className="text-4xl">Academics</h1>
                    {formData.academics.map((academic, index) => (
                      <div key={index} className="flex flex-col gap-4 my-3">
                        <InputField
                          label="Title"
                          type="text"
                          value={academic.title || ""}
                          onChange={(value) =>
                            handleChange("academics", index, "title", value)
                          }
                        />
                        <InputField
                          label="Start Date"
                          type="date"
                          value={academic.startDate || ""}
                          onChange={(value) =>
                            handleChange("academics", index, "startDate", value)
                          }
                        />
                        <InputField
                          label="End Date"
                          type="date"
                          value={academic.endDate || ""}
                          onChange={(value) =>
                            handleChange("academics", index, "endDate", value)
                          }
                        />
                        <TextArea
                          label="Description"
                          value={academic.description || ""}
                          onChange={(value) =>
                            handleChange(
                              "academics",
                              index,
                              "description",
                              value
                            )
                          }
                        />
                      </div>
                    ))}
                    <AddItemBtn
                      label="Add Academics"
                      onClick={() => handleAddItem("academics")}
                    />
                  </div>
                  {/* Academics Section end */}

                  {/* Add Expreience Section */}
                  <div className="">
                    <h1 className="text-4xl">Experience</h1>
                    {formData.experiences.map((experience, index) => (
                      <div key={index} className="flex flex-col gap-4 my-3">
                        <InputField
                          label="Title"
                          type="text"
                          value={experience.title || ""}
                          onChange={(value) =>
                            handleChange("experiences", index, "title", value)
                          }
                        />
                        <InputField
                          label="Start Date"
                          type="date"
                          value={experience.startDate || ""}
                          onChange={(value) =>
                            handleChange(
                              "experiences",
                              index,
                              "startDate",
                              value
                            )
                          }
                        />
                        <InputField
                          label="End Date"
                          type="date"
                          value={experience.endDate || ""}
                          onChange={(value) =>
                            handleChange("experiences", index, "endDate", value)
                          }
                        />
                        <TextArea
                          label="Description"
                          value={experience.description || ""}
                          onChange={(value) =>
                            handleChange(
                              "experiences",
                              index,
                              "description",
                              value
                            )
                          }
                        />
                      </div>
                    ))}
                    <AddItemBtn
                      label="Add Experience"
                      onClick={() => handleAddItem("experiences")}
                    />
                    {/* Add Expreience Section end */}
                  </div>
                  {/* Add Expreience Section end */}
                </div>

                <div className="flex flex-col md:flex-row py-6 md:py-0  justify-center gap-8">
                  {/* Add Projects Section */}
                  <div>
                    <h1 className="text-4xl">Projects</h1>
                    {formData.projects.map((project, index) => (
                      <div key={index} className="flex flex-col gap-4 my-3">
                        <InputField
                          label="Title"
                          type="text"
                          value={project.title || ""}
                          onChange={(value) =>
                            handleChange("projects", index, "title", value)
                          }
                        />
                        <InputField
                          label="Start Date"
                          type="date"
                          value={project.startDate || ""}
                          onChange={(value) =>
                            handleChange("projects", index, "startDate", value)
                          }
                        />
                        <InputField
                          label="End Date"
                          type="date"
                          value={project.endDate || ""}
                          onChange={(value) =>
                            handleChange("projects", index, "endDate", value)
                          }
                        />
                        <InputField
                          label="URL"
                          type="text"
                          value={project.url || ""}
                          onChange={(value) =>
                            handleChange("projects", index, "url", value)
                          }
                        />
                        <TextArea
                          label="Description"
                          value={project.description || ""}
                          onChange={(value) =>
                            handleChange(
                              "projects",
                              index,
                              "description",
                              value
                            )
                          }
                        />
                      </div>
                    ))}
                    <AddItemBtn
                      label="Add Project"
                      onClick={() => handleAddItem("projects")}
                    />
                  </div>
                  {/* Add Projects Section end*/}
                  {/* Add skils section */}
                  <div>
                    <h1 className="text-4xl">Skills</h1>
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex flex-col gap-4 my-3">
                        <InputField
                          label="Skill Name"
                          type="text"
                          value={skill.name || ""}
                          onChange={(value) =>
                            handleChange("skills", index, "name", value)
                          }
                        />
                        <InputField
                          label="Rating"
                          type="number"
                          min="0"
                          max="5"
                          value={skill.rating || ""}
                          onChange={(value) =>
                            handleChange("skills", index, "rating", value)
                          }
                        />
                      </div>
                    ))}
                    <AddItemBtn
                      label="Add Skill"
                      onClick={() => handleAddItem("skills")}
                    />
                  </div>
                  {/* Add skils section end */}
                </div>
              </div>
              <button
                type="submit"
                className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500"
              >
                Update Resume
              </button>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default UpdateResume;
