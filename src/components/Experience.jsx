import { useState } from "react";
import "../styles/experience.css";
import { Label } from "./Personal.jsx";
const initialExperience = [
  {
    id: 0,
    companyName: "SkyTravel Solutions",
    positionTitle: "Junior Web Developer",
    dates: "June 2022 – Present",
    mainResponsibilities: [
      {
        id: crypto.randomUUID(),
        text: "Designed and developed responsive front-end interfaces for a flight booking system using HTML, CSS, and JavaScript.",
      },
      {
        id: crypto.randomUUID(),
        text: "Integrated APIs for real-time flight data, payment gateways, and customer authentication.",
      },
      {
        id: crypto.randomUUID(),
        text: "Worked closely with UX/UI designers to enhance user experience and navigation.",
      },
      {
        id: crypto.randomUUID(),
        text: "Conducted testing and debugging to ensure smooth performance across web and mobile platforms.",
      },
      {
        id: crypto.randomUUID(),
        text: "Assisted in backend development using Node.js and MySQL for booking and customer management.",
      },
    ],
  },
  {
    id: 1,
    companyName: "AeroBook Technologies",
    positionTitle: "Mobile App Developer Intern",
    dates: "January 2021 – May 2022",
    mainResponsibilities: [
      {
        id: crypto.randomUUID(),
        text: "Developed and maintained a cross-platform mobile application for flight ticket reservations using Flutter and Firebase.",
      },
      {
        id: crypto.randomUUID(),
        text: "Implemented user-friendly features such as flight search, seat selection, and booking history tracking.",
      },
      {
        id: crypto.randomUUID(),
        text: "Optimized app performance and security by applying best coding practices.",
      },
      {
        id: crypto.randomUUID(),
        text: "Collaborated with senior developers to integrate third-party travel APIs and improve app functionality.",
      },
      {
        id: crypto.randomUUID(),
        text: "Assisted in troubleshooting, bug fixes, and updating new features based on user feedback.",
      },
    ],
  },
];

export default function Experience() {
  const [Experiences, setExperiences] = useState(initialExperience);
  const [isEdit, setIsEdit] = useState(false);
  const [tempExperiences, setTempExperiences] = useState(initialExperience);
  const [id, setId] = useState(2);
  function editHandler() {
    setTempExperiences(Experiences);
    setIsEdit(true);
  }

  return (
    <div className="experience">
      <h2>Experience</h2>
      <hr />
      <ul style={{ display: isEdit ? "none" : "block" }}>
        {Experiences.map((experience) => (
          <li key={experience.id}>
            {experience.positionTitle && <h3>{experience.positionTitle}</h3>}
            {experience.companyName && <p>{experience.companyName}</p>}
            {experience.mainResponsibilities && (
              <ul>
                {experience.mainResponsibilities.map((responsibility) => (
                  <li key={responsibility.id}>{responsibility.text}</li>
                ))}
              </ul>
            )}
            {experience.dates && <p className="date">{experience.dates}</p>}
          </li>
        ))}
        <button className="edit" onClick={editHandler}>
          Edit
        </button>
      </ul>
      {isEdit && (
        <EditExperience
          tempExperiences={tempExperiences}
          setTempExperiences={setTempExperiences}
          id={id}
          setId={setId}
          setIsEdit={setIsEdit}
          setExperiences={setExperiences}
        />
      )}
    </div>
  );
}

function EditExperience({
  tempExperiences,
  setTempExperiences,
  id,
  setId,
  setExperiences,
  setIsEdit,
}) {
  function cancelHandler() {
    setIsEdit(false);
  }

  function confirmHandler() {
    setExperiences(tempExperiences);
    setIsEdit(false);
  }

  function addHandler() {
    const newItem = {
      id: id,
      companyName: "",
      positionTitle: "",
      dates: "",
      mainResponsibilities: [
        {
          id: crypto.randomUUID(),
          text: "",
        },
      ],
    };
    setId(id + 1);
    setTempExperiences([...tempExperiences, newItem]);
  }

  function removeHandler(index) {
    setTempExperiences(tempExperiences.filter((exp) => exp.id !== index));
  }

  function addResponsibilityHandler(index) {
    const newRespon = {id: crypto.randomUUID(), text: ""} 
    setTempExperiences(tempExperiences.map(exp=> exp.id === index ? {...exp, mainResponsibilities:[...exp.mainResponsibilities, newRespon]}: exp))
  }

  function removeResponHandler(resIndex,expIndex){
    setTempExperiences(tempExperiences.map(exp => exp.id === expIndex ? {...exp, mainResponsibilities:exp.mainResponsibilities.filter(res=> res.id !==resIndex)}: exp))
  }

  return (
    <ul className="edit-experience">
      {tempExperiences.map((experience) => (
        <li key={experience.id}>
          <div className="remove" onClick={() => removeHandler(experience.id)}>
            X
          </div>
          <Label
            label="Position title"
            value={experience.positionTitle}
            onChange={(e) =>
              setTempExperiences((prevTemp) =>
                prevTemp.map((exp) =>
                  exp.id === experience.id
                    ? { ...exp, positionTitle: e.target.value }
                    : exp
                )
              )
            }
          />
          <Label
            label="Company Name"
            value={experience.companyName}
            onChange={(e) =>
              setTempExperiences((prevTemp) =>
                prevTemp.map((exp) =>
                  exp.id === experience.id
                    ? { ...exp, companyName: e.target.value }
                    : exp
                )
              )
            }
          />
          <Label
            label="Date"
            value={experience.dates}
            onChange={(e) =>
              setTempExperiences((prevTemp) =>
                prevTemp.map((exp) =>
                  exp.id === experience.id
                    ? { ...exp, dates: e.target.value }
                    : exp
                )
              )
            }
          />
          <ul className="experience-responsibilities">
            {experience.mainResponsibilities.map((respon) => (
              <li key={respon.id}>
                <div className="remove-responsibility" onClick={()=> removeResponHandler(respon.id,experience.id)}>Delete</div>
                <Label
                  label="Responsibility"
                  value={respon.text}
                  onChange={(e) =>
                    setTempExperiences((prevTemp) =>
                      prevTemp.map((exp) =>
                        exp.id === experience.id
                          ? {
                              ...exp,
                              mainResponsibilities:
                                exp.mainResponsibilities.map((r) =>
                                  r.id === respon.id
                                    ? { ...r, text: e.target.value }
                                    : r
                                ),
                            }
                          : exp
                      )
                    )
                  }
                />
              </li>
            ))}
            <button
              className="add-responsibility add"
              onClick={() => addResponsibilityHandler(experience.id)}
            >
              Add Responsibility
            </button>
          </ul>
        </li>
      ))}
      <div className="buttons">
        <button className="cancel" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="add" onClick={addHandler}>
          Add New Experience
        </button>
        <button className="confirm" onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </ul>
  );
}
