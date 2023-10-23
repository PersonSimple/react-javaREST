// http://localhost:8082/student/allstudents
export function fetchStudents() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8082/student/allstudents");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchStudentById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8082/student/seestudent/" + id
    );
    const data = await response.json();

    resolve({ data });
  });
}
export function updateStudentById(update, id) {
  return new Promise(async (resolve) => {

    const response = await fetch("http://localhost:8082/student/update/" + id, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    resolve({ data });
  });
}
export function fetchStudentByEmail(emailId) {
  return new Promise(async (resolve, reject) => {
    //TODO: we will not hard-code server URL here
    try {
      const response = await fetch(
        "http://localhost:8082/student/viewstudent/" + emailId
      );
      if (response.ok) {
        const data = await response.json();
       console.log(data);
       
        resolve({ data });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (error) {
      reject(error);
    }

  });
}
