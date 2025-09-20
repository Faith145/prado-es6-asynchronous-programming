# prado-es6-asynchronous-programming 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Student System</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Student and Course Data</h1>
  <div id="output"></div>

  <script src="script.js"></script>
</body>
</html>

body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
}

#output {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

section {
  margin-bottom: 20px;
}

h2 {
  color: #005f99;
}

.highlight {
  font-weight: bold;
  color: #d9534f;
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('students.json')
    .then(response => response.json())
    .then(data => {
      displayData(data);
    })
    .catch(error => console.error('Error loading JSON:', error));
});

function displayData(data) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  
  const courseMap = {};
  const instructorMap = {};

  data.courses.forEach(course => {
    courseMap[course.title] = course.description;
  });

  data.instructors.forEach(instructor => {
    instructorMap[instructor.subject] = instructor.name;
  });

  
  const studentSection = document.createElement('section');
  studentSection.innerHTML = `<h2>Students</h2>`;
  data.students.forEach(student => {
    const { name, age, course } = student;
    const description = courseMap[course];
    const isOlder = age > 21;
    const span = document.createElement('div');
    span.innerHTML = `${isOlder ? '<span class="highlight">* ' : ''}${name} (${age}) → ${course} → ${description}${isOlder ? '</span>' : ''}`;
    studentSection.appendChild(span);
  });
  output.appendChild(studentSection);

 
  const courseSection = document.createElement('section');
  courseSection.innerHTML = `<h2>Courses</h2>`;
  data.courses.forEach(course => {
    const div = document.createElement('div');
    div.textContent = `${course.title} → ${course.description}`;
    courseSection.appendChild(div);
  });
  output.appendChild(courseSection);

  
  const instructorSection = document.createElement('section');
  instructorSection.innerHTML = `<h2>Instructors</h2>`;
  data.courses.forEach(course => {
    const teacher = instructorMap[course.title];
    if (teacher) {
      const div = document.createElement('div');
      div.textContent = `${course.title} → Taught by ${teacher}`;
      instructorSection.appendChild(div);
    }
  });
  output.appendChild(instructorSection);
}

{
  "students": [
    { "name": "Ana", "age": 20, "course": "Computer Science" },
    { "name": "Mark", "age": 22, "course": "Information Technology" },
    { "name": "John", "age": 19, "course": "Software Engineering" },
    { "name": "Maria", "age": 23, "course": "Data Science" },
    { "name": "James", "age": 21, "course": "Cybersecurity" }
  ],
  "courses": [
    { "title": "Computer Science", "description": "Study of algorithms, programming, and computing systems." },
    { "title": "Information Technology", "description": "Focus on managing and deploying computer systems and networks." },
    { "title": "Software Engineering", "description": "Application of engineering principles to software development." },
    { "title": "Data Science", "description": "Exploration of data analysis, visualization, and machine learning." },
    { "title": "Cybersecurity", "description": "Protection of systems, networks, and programs from cyber threats." }
  ],
  "instructors": [
    { "name": "John Rey Silverio", "subject": "Computer Science" },
    { "name": "Maria Santos", "subject": "Data Science" },
    { "name": "Carlos Dela Cruz", "subject": "Cybersecurity" }
  ]
}
