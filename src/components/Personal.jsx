import { useState } from "react";
import "../styles/personal.css";
export default function Personal() {
  const initialPersonal = {
    fullName: "Belal Hashem",
    phone: "123-456-7890",
    email: "belal.hashem@gmail.com",
    linkedLink: "#",
    gitLink: "#",
  };
  const [personal, setPersonal] = useState(initialPersonal);
  const [isEdit, setIsEdit] = useState(false);
  const [tempPersonal, setTempPersonal] = useState(initialPersonal);

  function handleEdit() {
    setTempPersonal(personal);
    setIsEdit(true);
  }
  return (
    <>
      <div className="personal" style={{ display: isEdit ? "none" : "block" }}>
        <h1>{personal.fullName}</h1>
        <p>
          {personal.phone} | {personal.email} |{" "}
          <a href={personal.linkedLink}>LinkedIn</a> |{" "}
          <a href={personal.gitLink}>GitHub</a>
        </p>
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
      </div>
      {isEdit && (
        <EditPersonal
          tempPersonal={tempPersonal}
          setTempPersonal={setTempPersonal}
          setIsEdit={setIsEdit}
          setPersonal={setPersonal}
        />
      )}
    </>
  );
}

function EditPersonal({
  tempPersonal,
  setTempPersonal,
  setIsEdit,
  setPersonal,
}) {
  function handleCancel() {
    setIsEdit(false);
  }
  function handleConfirm() {
    setPersonal(tempPersonal);
    setIsEdit(false);
  }

  return (
    <div className="edit-personal">
      <Label
        label="Name"
        value={tempPersonal.fullName}
        onChange={(e) =>
          setTempPersonal({ ...tempPersonal, fullName: e.target.value })
        }
      />
      <Label
        label="Phone"
        value={tempPersonal.phone}
        type="tel"
        onChange={(e) =>
          setTempPersonal({ ...tempPersonal, phone: e.target.value })
        }
      />
      <Label
        label="Email"
        type="email"
        value={tempPersonal.email}
        onChange={(e) =>
          setTempPersonal({ ...tempPersonal, email: e.target.value })
        }
      />
      <Label
        label="Linkedin Link"
        value={tempPersonal.linkedLink}
        onChange={(e) =>
          setTempPersonal({ ...tempPersonal, linkedLink: e.target.value })
        }
      />
      <Label
        label="Github Link"
        value={tempPersonal.gitLink}
        onChange={(e) =>
          setTempPersonal({ ...tempPersonal, gitLink: e.target.value })
        }
      />
      <button className="cancel" onClick={handleCancel}>Cancel</button>
      <button className="confirm" onClick={handleConfirm}>Confirm</button>
    </div>
  );
}

function Label({ label, value, onChange, type = "text" }) {
  return (
    <label>
      {label}
      <input type={type} value={value} onChange={onChange} />
    </label>
  );
}
