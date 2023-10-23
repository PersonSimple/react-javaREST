

// http://localhost:8082/user/saveuser
export function createUser(userData) {
  return new Promise(async (resolve,reject) => {

    try {
      const response = await fetch('http://localhost:8082/user/saveuser', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
      
        window.localStorage.setItem("isLoggedIn", true)
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

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {


    try {
      const response = await fetch("http://localhost:8082/login/userlogin", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(loginInfo),
        headers: {
          "content-type": "application/json",
        },

      });

      if (response.ok) {
        const data = await response.json();
      
        window.localStorage.setItem("isLoggedIn", true)
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

export function signOut() {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    window.localStorage.removeItem("isLoggedIn");
    resolve({ data: 'success' });
  });
}
