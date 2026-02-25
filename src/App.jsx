import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CreateCourse from './pages/CreateCourse';
import CourseList from './pages/CourseList';
import EnrollCourse from './pages/EnrollCourse';
import AssignmentSubmit from './pages/AssignmentSubmit';
import './App.css';

const initialCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn the fundamentals of React.js, hooks, and component-based architecture.',
    instructor: 'Dr. Sarah Collins',
    duration: '6 Weeks',
    level: 'Beginner',
    category: 'Web Development',
    image: '⚛️',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into closures, async/await, prototypes, and modern ES6+ features.',
    instructor: 'Prof. Mark Evans',
    duration: '8 Weeks',
    level: 'Advanced',
    category: 'Programming',
    image: '🟨',
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Master user interface design, wireframing, and creating stunning user experiences.',
    instructor: 'Ms. Priya Sharma',
    duration: '5 Weeks',
    level: 'Intermediate',
    category: 'Design',
    image: '🎨',
  },
  {
    id: 4,
    title: 'Python Data Science',
    description: 'Explore data analysis, visualization, and machine learning using Python & Pandas.',
    instructor: 'Dr. Alan Wright',
    duration: '10 Weeks',
    level: 'Intermediate',
    category: 'Data Science',
    image: '🐍',
  },
];

function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [nextId, setNextId] = useState(5);

  const addCourse = (course) => {
    const newCourse = { ...course, id: nextId };
    setCourses((prev) => [...prev, newCourse]);
    setNextId((prev) => prev + 1);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const enrollCourse = (course) => {
    if (!enrolledCourses.find((c) => c.id === course.id)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  const unenrollCourse = (id) => {
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addSubmission = (submission) => {
    setSubmissions((prev) => [...prev, submission]);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home courses={courses} enrollCourse={enrollCourse} />} />
            <Route
              path="/admin"
              element={
                <AdminDashboard
                  courses={courses}
                  deleteCourse={deleteCourse}
                  enrolledCourses={enrolledCourses}
                  submissions={submissions}
                />
              }
            />
            <Route
              path="/student"
              element={
                <StudentDashboard
                  courses={courses}
                  enrolledCourses={enrolledCourses}
                  enrollCourse={enrollCourse}
                  unenrollCourse={unenrollCourse}
                  submissions={submissions}
                />
              }
            />
            <Route path="/create-course" element={<CreateCourse addCourse={addCourse} />} />
            <Route
              path="/courses"
              element={<CourseList courses={courses} enrollCourse={enrollCourse} enrolledCourses={enrolledCourses} />}
            />
            <Route
              path="/enroll"
              element={<EnrollCourse courses={courses} enrollCourse={enrollCourse} enrolledCourses={enrolledCourses} />}
            />
            <Route
              path="/submit-assignment"
              element={<AssignmentSubmit enrolledCourses={enrolledCourses} addSubmission={addSubmission} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
