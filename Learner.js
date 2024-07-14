const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

const StudentSubmissions = [
  {
    student_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    student_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    student_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    student_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    student_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getStudentData(course, ag, submissions) {
  if (ag.course_id !== course.id) {
    throw new Error("AssignmentGroup course_id does not match CourseInfo id");
  }
  const currentDate = new Date();
  const studentsData = {};
  submissions.forEach(submission => {
    const assignment = ag.assignments.find(a => a.id === submission.assignment_id);
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    const dueDate = new Date(assignment.due_at);
    const submittedDate = new Date(submission.submission.submitted_at);
    if (dueDate > currentDate) {
      return;
    }
    if (!studentsData[submission.student_id]) {
      studentsData[submission.student_id] = {
        id: submission.student_id,
        avg: 0,
        totalPoints: 0,
        totalWeightedScore: 0
      };
    }
    const studentData = studentsData[submission.student_id];
    let score = submission.submission.score;
    if (submittedDate > dueDate) {
      score -= assignment.points_possible * 0.1;
    }
    studentData[assignment.id] = (score / assignment.points_possible).toFixed(2);
    studentData.totalPoints += assignment.points_possible;
    studentData.totalWeightedScore += score;
  });
  return Object.values(studentsData).map(studentData => {
    studentData.avg = (studentData.totalWeightedScore / studentData.totalPoints).toFixed(2);
    delete studentData.totalPoints;
    delete studentData.totalWeightedScore;
    return studentData;
  });
}

const result = getStudentData(CourseInfo, AssignmentGroup, StudentSubmissions);
console.log(result);