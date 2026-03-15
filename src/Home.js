
import { useEffect, useState } from "react";
import axios from "axios";
import {saveAs}from "file-saver";

function Home() {

  const [info, setInfo] = useState([]);

  const loadData = () => {

    let url = "https://student-management-system-5-t63p.onrender.com";

    axios.get(url)
    .then(res => {

      console.log(res.data);

      // ensure it is always array
      if(Array.isArray(res.data)){
        setInfo(res.data);
      }
      else if(Array.isArray(res.data.result)){
        setInfo(res.data.result);
      }
      else{
        setInfo([]);
      }

    })
    .catch(err => {
      alert("Issue: " + err);
    });

  };

  useEffect(() => {
    loadData();
  }, []);


  const delStu = (rno, file) => {

    let url = "http://localhost:9000/ds";

    if(window.confirm("Are you sure you want to delete?")){

      axios.delete(url, { data: { rno, file } })
      .then(res => {

        alert("Record Deleted Successfully");

        // reload data without refreshing page
        loadData();

      })
      .catch(err => {
        alert("Delete Issue " + err);
      });

    }

  };


  return (
  <>
    <br/>
    <h1>Home Page</h1>
    <br/>

    <table border={5} align="center">

      <thead>
        <tr>
          <th>Rno</th>
          <th>Name</th>
          <th>Marks</th>
          <th>View</th>
          <th>Download</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>

        {info.length === 0 ? (
          <tr>
            <td colSpan="6">No Records Found</td>
          </tr>
        ) : (

          info.map((e) => (

            <tr key={e.rno}>

              <td>{e.rno}</td>
              <td>{e.name}</td>
              <td>{e.marks}</td>

              <td>
                <img
                  src={"data:" + e.mime + ";base64," + e.file}
                  width="80"
                  alt="student"
                />
              </td>

              <td>
                <a
                  href={"data:" + e.mime + ";base64," + e.file}
                  download={"student_" + e.rno + "." + e.mime.split("/")[1]}
                >
                  Download
                </a>
              </td>

              <td>
                <button onClick={() => delStu(e.rno, e.file)}>
                  Delete
                </button>
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </>
  );
}

export default Home;

