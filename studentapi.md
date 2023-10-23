- **Author**: Aniket Kumar
- **Contributor**: Shivam Tiwari (Backend Team)
- **Date**: October 23, 2023
- **Version**: 1.0

# Student api - 

1. GET ALL STUDENT - http://localhost:8080/student (GET)

2. GET STUDENT BY ID http://localhost:8080/student/{studentId} (GET)

3. CREATE STUDENT - http://localhost:8080/student

        REQUEST BODY(CONTENT TYPE - APPLICATION/JSON)
        {
            "studentName": "shiavm",
            "phoneNumber": "123",
            "gender":"Male",
            "dateOfBirth": "2002-06-13",
            "city": "sln",
            "state": "up",
            "email": "st@gmail",
            "pinCode":"221344",
            "address": "lko",
            "course" :"ai&ml"
        }

4. UPDATE STUDENT - http://localhost:8080/student/{studentId}

        REQUEST BODY -
        {
            "studentName": "shiavm",
            "phoneNumber": "567",
            "gender":"Male",
            "dateOfBirth": "2002-06-13",
            "city": "sln",
            "state": "up",
            "email": "st@gmail",
            "pinCode":"221344",
            "address": "lko",
            "course" :"ai&ml"
        }

5.DELETE STUDENT http://localhost:8080/student/{studentId} (DELETE)


6.GET STUDENT BY STATUS - http://localhost:8080/student/status/{status} (GET)
