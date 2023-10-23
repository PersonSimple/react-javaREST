- **Author**: Aniket Kumar
- **Contributor**: Shivam Tiwari (Backend Team)
- **Date**: October 23, 2023
- **Version**: 1.0

# Course api 

1. GET ALL COURSES - http://localhost:8080/course (GET)

2. GET COURSE BY ID http://localhost:8080/course/{courseId} (GET)

3. CREATE COURSE - http://localhost:8080/course

      REQUEST BODY(CONTENT TYPE - APPLICATION/JSON)
     {
   
          "courseName": "cse",
          "courseDescription": "B.tech"
      }


5. UPDATE COURSE - http://localhost:8080/course/{courseId}

         REQUEST BODY -
        {
  
          "courseName": "AI",
          "courseDescription": "B.tech"
    
        }

5. DELETE COURSE http://localhost:8080/course/{courseId} (DELETE)


6. GET COURSE BY STATUS - http://localhost:8080/course/status/{status} (GET)

9. FIND BY NAME http://localhost:8080/user/find/{userName} (GET)
