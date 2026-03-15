import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {

const rRno = useRef();
const rName = useRef();
const rMarks = useRef();
const rFile = useRef();

const [rno, setRno] = useState("");
const [name, setName] = useState("");
const [marks, setMarks] = useState("");
const [file, setFile] = useState(null);
const [msg, setMsg] = useState("");

const hRno = (event) => {
setRno(event.target.value);
};

const hName = (event) => {
setName(event.target.value);
};

const hMarks = (event) => {
setMarks(event.target.value);
};

const hFile = (event) => {
if (event.target.files.length > 0) {
setFile(event.target.files[0]);
}
};

const save = (event) => {
event.preventDefault();

if (rno === "") {
  toast.error("Rno is empty");
  rRno.current.focus();
  return;
}

if (name === "") {
  toast.error("Name is empty");
  rName.current.focus();
  return;
}

if (marks === "") {
  toast.error("Marks is empty");
  rMarks.current.focus();
  return;
}

if (!file) {
  toast.error("File is empty");
  rFile.current.focus();
  return;
}

if (file.size > 1024 * 256) {
  alert("Max file size is 256KB");
  rFile.current.value = "";
  rFile.current.focus();
  return;
}

if (!file.type.startsWith("image/")) {
  alert("Only image files allowed");
  rFile.current.value = "";
  rFile.current.focus();
  return;
}

let fd = new FormData();
fd.append("rno", rno);
fd.append("name", name);
fd.append("marks", marks);
fd.append("file", file);

let url = "https://student-management-system-5-t63p.onrender.com";

axios.post(url, fd, {
  headers: { "Content-Type": "multipart/form-data" }
})
.then(res => {

  if (res.data.affectedRows === 1) {

    setMsg("Record Created Successfully");

    setRno("");
    setName("");
    setMarks("");
    setFile(null);

    if (rFile.current)
      rFile.current.value = "";

    rRno.current.focus();
  }

  else if (res.data.errno === 1062) {

    setMsg(rno + " already exists");
    setRno("");
    rRno.current.focus();
  }

})
.catch(err => {
  setMsg("Issue " + err);
});


};

return (
<> <br/>


  <ToastContainer />

  <h1>Create Page</h1>

  <form onSubmit={save}>

    <input
      type="number"
      ref={rRno}
      placeholder="Enter Rno"
      onChange={hRno}
      value={rno}
    />

    <br/><br/>

    <input
      type="text"
      ref={rName}
      placeholder="Enter Name"
      onChange={hName}
      value={name}
    />

    <br/><br/>

    <input
      type="number"
      ref={rMarks}
      placeholder="Enter Marks"
      onChange={hMarks}
      value={marks}
    />

    <br/><br/>

    <input
      type="file"
      ref={rFile}
      onChange={hFile}
    />

    <br/><br/>

    <input type="submit" value="Save Student"/>

  </form>

  <h2>{msg}</h2>
</>


);
}

export default Create;
