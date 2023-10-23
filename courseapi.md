- **Author**: Aniket Kumar
- **Contributor**: Shivam Tiwari (Backend Team)
- **Date**: October 23, 2023
- **Version**: 1.0

# User api - 

1.register user - http://localhost:8080/user/registration (POST)

        request body-
        {
           "username": "st",
            "password": "st"
        }


2. LOGIN http://localhost:8080/user/login (POST)

        EX: http://localhost:8080/user/login
        {
           "username": "st",
            "password": "st"
        }


3. ALL USER - http://localhost:8080/user/all (GET)

4. DELETE USER - http://localhost:8080/user/{userId}. (DELETE)

5. UPDATE USER PASSWORD - http://localhost:8080/user/{userId}/updatepassword (PUT)

EX - "1234"  (type - string,  in the request body)

6. UPDATE STATUS - http://localhost:8080/user/{userId}/updatestatus/{newStatus} (PUT)

7. FIND USER BY STATUS - http://localhost:8080/user/find/status/{status} (GET)

8. FIND USER BY ID -  http://localhost:8080/user/{usedId} (GET)

9. FIND BY NAME http://localhost:8080/user/find/{userName} (GET)
