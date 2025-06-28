import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';

// Teacher Pages
import TeacherDashboard from './pages/TeacherDashboard';
import AddCourse from './pages/AddCourse';
import TeacherCourses from './pages/TeacherCourses';
import EditCourse from './pages/EditCourse';
import CourseDetail from './pages/CourseDetail'; 

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import StudentCourses from './pages/StudentCourses';
import EnrolledCourses from './pages/EnrolledCourses';
import LearnCourse from './pages/LearnCourse'; 

import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute role="admin"><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/courses" element={<PrivateRoute role="admin"><AdminCourses /></PrivateRoute>} />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<PrivateRoute role="teacher"><TeacherDashboard /></PrivateRoute>} />
        <Route path="/teacher/add-course" element={<PrivateRoute role="teacher"><AddCourse /></PrivateRoute>} />
        <Route path="/teacher/courses" element={<PrivateRoute role="teacher"><TeacherCourses /></PrivateRoute>} />
        <Route path="/teacher/edit/:id" element={<PrivateRoute role="teacher"><EditCourse /></PrivateRoute>} />
        <Route path="/teacher/course/:id" element={<PrivateRoute role="teacher"><CourseDetail /></PrivateRoute>} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/student/courses" element={<PrivateRoute role="student"><StudentCourses /></PrivateRoute>} />
        <Route path="/student/enrolled" element={<PrivateRoute role="student"><EnrolledCourses /></PrivateRoute>} />
        <Route path="/student/learn/:id" element={<PrivateRoute role="student"><LearnCourse /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
