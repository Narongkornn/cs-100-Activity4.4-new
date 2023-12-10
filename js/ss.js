const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const studentID = document.getElementById('StudentID');
const address = document.getElementById('location');
const phonenumber = document.getElementById('phone');
const description = document.getElementById('description');
const title = document.getElementById('title');
const semester = document.getElementById("semester");

const config = {
    backendUrl: "http://localhost:8000/", // Default backend URL
  };
  const port = 8000;

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check username is valid
function checkUsername(input) {
    const names = username.value.trim().split(" ");
    if (names.length !== 2) {
        showError(input,'Please enter your Firstname and Lastname.');
        return false;
    }else {
        showSucces(input);
        return true;
    }
}

let Facul;
let Myears;
const facultyValues = [0,1, 2, 3, 4, 5, 3,7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 26, 27, 64];
const facultyTexts = [
      "Puey Ungphakorn School of Development Studies",
      "Faculty of Law",
      "Faculty of Commerce and Accountancy",
      "Faculty of Political Science",
      "Faculty of Economics",
      "Faculty of Social Administration",
      "Faculty of Liberal Arts",
      "Faculty of Journalism and Mass Communication",
      "Faculty of Sociology and Anthropology",
      "Faculty of Science and Technology",
      "Faculty of Engineering",
      "Faculty of Medicine",
      "Faculty of Allied Health Sciences",
      "Doctor of Dental Surgery Program",
      "Bachelor of Nursing Science",
      "Faculty of Fine and Applied Arts",
      "Faculty of Architecture and Planning",
      "Faculty of Public Health",
      "Faculty of Pharmacy",
      "Language Institute",
      "SIIT",
      "College of Innovation",
      "College of Interdisciplinary Studies",
      "Thai Khadi Research Institute",
      "Pridi Banomyong International College",
      "Faculty of Learning Sciences and Education"
];

//check studentID is valid
function checkstudentID(input) {
    const ne = /^\d{10}$/;
    const B = document.getElementById("StudentID").value;
    const A = parseInt(B, 10);
    let C = A/100000000;
    console.log(A);
    console.log(C);
    Myears = Math.floor(C);
  
  
    let tuFaci = (parseInt(studentID.value[2]) * 10) + (parseInt(studentID.value[3]) * 1);
  
    
    let Faci = ""; // Initialize Faci outside the loop
    
    for (let i = 0; i < facultyTexts.length; i++) {
        if (tuFaci === facultyValues[i]) {
            Faci = facultyTexts[i];
            break; // Exit the loop once a match is found
        }
        Faci ="Your ID is not correct"
    }
  
    Facul=Faci;
    if(ne.test(input.value.trim())) {
        showSucces(input)
        const tuFaci = (parseInt(studentID.value[2]) * 10) + (parseInt(studentID.value[3]) * 1);
  
        document.getElementById("Myear").innerHTML = "25" + Myears - 543;
        document.getElementById("MyFaci").innerHTML = Faci;
  
        let isValidFaci = false;
  
        for (let i = 0; i < facultyTexts.length; i++) {
            if (tuFaci === facultyValues[i]) {
                isValidFaci = true;
                break; 
            }
        }
    } else {
        showError(input,'StudentID format is not invalid');
        document.getElementById("Myear").innerHTML = "";
        document.getElementById("MyFaci").innerHTML = "";
        return false;
    }
}
    
//check email is valid
function checkEmail(input) {
    const re = /^[a-zA-Z]+\.[a-zA-Z]{3}@dome\.tu\.ac\.th$/;  
    if(re.test(input.value.trim())) {
        showSucces(input)
        return true;
    }else {
        showError(input,'Email is not invalid');
        return false;
    }
}

//check numberphone is valid
function checkPhoneNumber(input) {
    const de = /^[0-9]{10}$/;
    if(de.test(input.value.trim())) {
        showSucces(input)
        return true;
    }else {
        showError(input,'Phone number is invalid form.');
        return false;
    }
}

//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
            return false;
        }else {
            showSucces(input);
            return true;
        }
    });
}


//check input Length
function checkLength(input, min ,max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    }else {
        showSucces(input);
    }
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



// Function to fetch activity types from the backend
async function fetchActivityTypes() {
    try {
      const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch activity types.");
        return [];
      }
    } catch (error) {
      console.error("An error occurred while fetching activity types:", error);
      return [];
    }
  }
  
  // Function to populate activity types in the select element
  function populateActivityTypes(activityTypes) {
    const activityTypeSelect = document.getElementById("activityType");
  
    for (const type of activityTypes) {
      const option = document.createElement("option");
      option.value = type.id;
      option.textContent = type.value;
      activityTypeSelect.appendChild(option);
    }
 }
  
// Image viewer
function previewImage() {
    var input = document.getElementById('image');
    var previewImage = document.getElementById('previewImage');
  
    var file = input.files[0];
    var reader = new FileReader();
  
    reader.onloadend = function () {
        previewImage.src = reader.result;
        previewImage.style.display = 'block';
    };
  
    if (file) {
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        previewImage.style.display = 'none';
    }
  }

  // Event listener when the page content has finished loading
  document.addEventListener("DOMContentLoaded", async () => {
    const activityTypes = await fetchActivityTypes();
    populateActivityTypes(activityTypes);
  });

// Function to submit the form
async function submitForm(event) {
    event.preventDefault();
  
    // Validate form inputs before submission
    if (!checkUsername(username) || !checkstudentID(studentID) || !checkEmail(email) || !checkPhoneNumber(phonenumber)) {
      return;
    }
  
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
  
    if (endDate <= startDate) {
      alert("End datetime should be after the start datetime.");
      return;
    }
  
    // Create the data object to send to the backend
    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get("username").split(" ")[0],
      last_name: formData.get("username").split(" ")[1],
      student_id: parseInt(formData.get("StudentID")),
      email: formData.get("email"),
      title: formData.get("title"),
      type_of_work_id: parseInt(formData.get("activityType")),
      academic_year: parseInt(formData.get("academicYear")) - 543,
      semester: parseInt(formData.get("semester")),
      start_date: formData.get("startDate"),
      end_date: formData.get("endDate"),
      location: formData.get("location"),
      description: formData.get("description")
    };
  
    console.log(data);
  
    const detailsContainer = document.createElement("div");
    var title = document.getElementById("title").value;
    var name = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var semester = document.getElementById("semester").value;
    var image = document.getElementById("image").files[0];
    var start_date = document.getElementById("startDate").value;
    var end_date = document.getElementById("endDate").value;
    var phoneNumber = document.getElementById("phone").value;
    var description = document.getElementById("description").value;
  
    detailsContainer.id = "submission-details"; // กำหนด id หรือ class ตามที่ต้องการ
    detailsContainer.classList.add("element_box");
  
    // สร้าง HTML หรือเนื้อหาที่ต้องการแสดง
    const detailsContent = `
    <h2>${title}</h2>
    <img src="${URL.createObjectURL(image)}" alt="Preview" style="max-width: 100%; height: auto;">
    <p>ผู้เข้าร่วม : ${name}</p>
    <p>Email : ${email} เบอรโทรติดต่อ : ${phoneNumber}</p>
    <p>ระยะเวลาของกิจกรรม : ${startDate} ถึง ${endDate} (เทอม ${semester}</p>
    <p>รายละเอียด: ${description}</p>
    
  `;
  
    detailsContainer.innerHTML = detailsContent;
  
    // Add element
    document.body.appendChild(detailsContainer);
  
    const elementToInsertBefore = document.getElementById("footer");
    document.body.insertBefore(detailsContainer, elementToInsertBefore);
  
  
    // clear form
    document.getElementById("form").reset();
  
    try {
      // Send data to the backend using POST request
      const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Form data submitted successfully!");
  
        // Format JSON data for display
        const formattedData = Object.entries(responseData.data)
          .map(([key, value]) => `"${key}": "${value}"`)
          .join("\n");
  
        // Display success message with formatted data
        alert(responseData.message + "\n" + formattedData);
  
        document.getElementById("form").reset();
      } else {
        console.error("Failed to submit form data.");
  
        // Display error message
        alert("Failed to submit form data. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while submitting form data:", error);
    }
  }

  

//Event Listeners 

document.getElementById("form").addEventListener("submit", submitForm);
form.addEventListener('onclick',function(e) {
    e.preventDefault();

    //checkRequired([username, email]);
    // checkUsername(username);
    // checkLength(username,5,20);
    // checkLength(studentID,10,10);
    //checkEmail(email);
    //checkLength(address,3,20);
    //checkPhoneNumber(phonenumber);
    //checkLength(description,5,40);
    // checkLength(title,3,10);
    //checkSemester();
});

username.addEventListener('input',function(e){
    checkUsername(username);
    
})

email.addEventListener('input',function(e){
    checkEmail(email);
})

studentID.addEventListener('input',function(e){
    checkstudentID(studentID);
})

phonenumber.addEventListener('input',function(e){
    checkPhoneNumber(phonenumber);
})

title.addEventListener('input',function(e){
    checkLength(title,3,12);
})

address.addEventListener('input',function(e){
    checkLength(address,3,20);
})

description.addEventListener('input',function(e){
    checkLength(description,5,40);
})
