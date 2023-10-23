// http://localhost:8082/course/allcourses
export function fetchCourses() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8082/course/allcourses");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCourseById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8082/course/seecourse/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCourseById(update, id) {
  return new Promise(async (resolve) => {
   
    const response = await fetch("http://localhost:8082/course/" + id, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
