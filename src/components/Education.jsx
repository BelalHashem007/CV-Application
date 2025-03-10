import { useState } from "react";
import "../styles/education.css";
import { Label } from "./Personal.jsx";

export default function Education() {
  const initialEducations = [
    {
      id: 0,
      universityName: "Zagazig University",
      city: "Zagazig",
      date: "September 2020 - June 2025",
      degree: "Bachelor Electrical Engineering(Computer & Systems Engineering)",
      finalYearProject: "Flights website and app",
    },
  ];
  const [educations, setEducations] = useState(initialEducations);
  const [tempEducations, setTempEducations] = useState(initialEducations);
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState(1);

  function editHandler() {
    setTempEducations(educations);
    setIsEdit(true);
  }

  return (
    <>
      <div className="education">
        <h2>Education</h2>
        <hr />
        <ul style={{ display: isEdit ? "none" : "block" }}>
          {educations.map((education) => (
            <li key={education.id}>
              {education.universityName && <h3>{education.universityName}</h3>}
              {education.city && <p className="city">, {education.city}</p>}
              {education.degree && <p>{education.degree}</p>}
              {education.finalYearProject && (
                <p>Final year project: {education.finalYearProject}</p>
              )}
              {education.date && <p className="date">{education.date}</p>}
            </li>
          ))}
          <button className="edit" onClick={editHandler}>
          Edit
        </button>
        </ul>
      </div>
      {isEdit && (
        <EditEducation
          tempEducations={tempEducations}
          setEducations={setEducations}
          setTempEducations={setTempEducations}
          setIsEdit={setIsEdit}
          index={index}
          setIndex={setIndex}
        />
      )}
    </>
  );
}

function EditEducation({
  tempEducations,
  setEducations,
  setTempEducations,
  setIsEdit,
  index,
  setIndex,
}) {
  function cancelHandler() {
    setIsEdit(false);
  }
  function confirmHandler() {
    setEducations(tempEducations);
    setIsEdit(false);
  }
  function removeHandler(id) {
    setTempEducations(tempEducations.filter((edu) => edu.id !== id));
  }
  function addHandler() {
    const newEdu = {
      id: index,
      universityName: "",
      city: "",
      date: "",
      degree: "",
      finalYearProject: "",
    };
    setIndex(index + 1);
    setTempEducations([...tempEducations, newEdu]);
  }

  return (
    <ul className="edit-education">
      {tempEducations.map((tempEducation) => (
        <li key={tempEducation.id} className="new-education">
          <div
            className="remove"
            onClick={() => removeHandler(tempEducation.id)}
          >
            X
          </div>
          <Label
            label="University Name"
            value={tempEducation.universityName}
            onChange={(e) =>
              setTempEducations((prevEducations) =>
                prevEducations.map((edu) =>
                  edu.id == tempEducation.id
                    ? { ...edu, universityName: e.target.value }
                    : edu
                )
              )
            }
          />
          <Label
            label="City"
            value={tempEducation.city}
            onChange={(e) =>
              setTempEducations((prevEducations) =>
                prevEducations.map((edu) =>
                  edu.id == tempEducation.id
                    ? { ...edu, city: e.target.value }
                    : edu
                )
              )
            }
          />
          <Label
            label="Date"
            value={tempEducation.date}
            onChange={(e) =>
              setTempEducations((prevEducations) =>
                prevEducations.map((edu) =>
                  edu.id == tempEducation.id
                    ? { ...edu, date: e.target.value }
                    : edu
                )
              )
            }
          />
          <Label
            label="Degree"
            value={tempEducation.degree}
            onChange={(e) =>
              setTempEducations((prevEducations) =>
                prevEducations.map((edu) =>
                  edu.id == tempEducation.id
                    ? { ...edu, degree: e.target.value }
                    : edu
                )
              )
            }
          />
          <Label
            label="Final Year Project"
            value={tempEducation.finalYearProject}
            onChange={(e) =>
              setTempEducations((prevEducations) =>
                prevEducations.map((edu) =>
                  edu.id == tempEducation.id
                    ? { ...edu, finalYearProject: e.target.value }
                    : edu
                )
              )
            }
          />
        </li>
      ))}
      <div className="buttons">
        <button className="cancel" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="add" onClick={addHandler}>
          Add Education
        </button>
        <button className="confirm" onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </ul>
  );
}
