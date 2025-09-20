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
