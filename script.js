// ===============================
// Student Result Management and Analysis System
// ===============================

// ---------- 1. Student class ----------
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;         // array of 3 subject grades
    this.attendance = attendance; // percentage (0-100)
  }

  // Average using reduce
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // Letter grade using if / else
  getGradeLetter(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  // Final status using && (both conditions must be true)
  getFinalStatus() {
    const average = this.calculateAverage();
    if (average >= 50 && this.attendance >= 75) {
      return "Passed";
    }
    return "Requires Review";
  }
}

// ---------- 2. University system (objects array) ----------
const studentsList = [
  new Student(101, "Ahmed Hassan", [95, 92, 90], 96),  // strong student
  new Student(102, "Sara Ali",     [45, 42, 48], 80),  // struggling (avg 45)
  new Student(103, "Omar Khaled",  [60, 70, 65], 60),  // good average, low attendance
  new Student(104, "Layla Mostafa",[41, 47, 44], 90)   // struggling (avg 44)
];

// ---------- 3. Report for every student ----------
console.log("========== STUDENT REPORT ==========");
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(
    `Name: ${student.name} | Average: ${average.toFixed(2)} | ` +
    `Grade: ${student.getGradeLetter(average)} | Result: ${student.getFinalStatus()}`
  );
});

// ---------- 4. Academic Review Committee ----------

// Extraction: filter students whose average is between 40 and 49
const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

// Processing: map adds 5 grace points (returns new objects, originals untouched)
const GRACE_POINTS = 5;
const leniencyStudents = strugglingStudents.map((student) => ({
  id: student.id,
  name: student.name,
  originalAverage: student.calculateAverage(),
  adjustedAverage: student.calculateAverage() + GRACE_POINTS
}));

// Analysis: reduce sums the adjusted averages
const totalAdjusted = leniencyStudents.reduce(
  (sum, student) => sum + student.adjustedAverage,
  0
);

// Leniency average with a safety shield against division by zero
const leniencyAverage =
  leniencyStudents.length === 0 ? 0 : totalAdjusted / leniencyStudents.length;

// ---------- 5. Committee output ----------
console.log("\n===== STUDENTS GRANTED LENIENCY =====");
console.log(leniencyStudents);

console.log("\n===== LENIENCY AVERAGE (after +5 grace points) =====");
console.log(leniencyAverage.toFixed(2));