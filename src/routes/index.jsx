import Login from "@/pages/general/login.jsx";
import Register from "@/pages/general/register.jsx";
import Home from "@/pages/general/index.jsx";
import Reading from "@/pages/general/reading.jsx";
import Listening from "@/pages/general/listening.jsx";
import ReadingTest from "@/pages/general/readingtest.jsx";
import ListeningTest from "@/pages/general/listeningtest.jsx";
import TypeofTest from "@/pages/general/typeoftest.jsx";

import Layout from "@/components/Layout/index.jsx";
import TeacherLayout from "@/components/Layout/TeacherLayout.jsx";
import AdminLayout from "@/components/Layout/AdminLayout.jsx";

import StudentDashboard from "@/pages/student/index.jsx";
import Task1 from "@/pages/student/Task1.jsx";
import Task2 from "@/pages/student/Task2.jsx";
import History from "@/pages/student/history.jsx";
import Vocabulary from "@/pages/student/vocabulary.jsx";

import TeacherDashBoard from "@/pages/teacher/dashboard.jsx";
import Courses from "@/pages/teacher/course.jsx";
import Classes from "@/pages/teacher/class.jsx";
import Students from "@/pages/teacher/student.jsx";

import AdminDashBoard from "@/pages/admin/dashboard.jsx";
import AdminClasses from "@/pages/admin/classes/class.jsx";
import DetailClass from "@/pages/admin/classes/detailclass.jsx";
import AdminTeachers from "@/pages/admin/teachers/teachers.jsx";
import DetailTeacher from "@/pages/admin/teachers/detailteacher.jsx";
import AdminStudents from "@/pages/admin/students/students.jsx";
import AdminSettings from "@/pages/admin/settings.jsx";
import AdminWriting from "@/pages/admin/writings/index.jsx";
import AdminAddWriting from "@/pages/admin/writings/addwriting.jsx";

export const publicRoutes = [
  { path: "/", component: Home, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/reading", component: Reading, layout: Layout },
  { path: "/listening", component: Listening, layout: Layout },
  { path: "/type-of-test", component: TypeofTest, layout: null },
  { path: "/admin-writing", component: AdminWriting, layout: AdminLayout },
  {
    path: "/admin-addwriting",
    component: AdminAddWriting,
    layout: AdminLayout,
  },
];
//Routes need to login for accessing
export const privateRoutes = [
  { path: "/reading-test", component: ReadingTest, layout: null },
  { path: "/listening-test", component: ListeningTest, layout: null },
  {
    path: "/admin-settings",
    component: AdminSettings,
    layout: AdminLayout,
  },
  {
    path: "/teacher-dashboard",
    component: TeacherDashBoard,
    layout: TeacherLayout,
  },
  { path: "/teacher-course", component: Courses, layout: TeacherLayout },
  { path: "/teacher-class", component: Classes, layout: TeacherLayout },
  { path: "/teacher-student", component: Students, layout: TeacherLayout },

  { path: "/admin-dashboard", component: AdminDashBoard, layout: AdminLayout },
  { path: "/admin-class", component: AdminClasses, layout: AdminLayout },
  { path: "/admin-detailclass", component: DetailClass, layout: AdminLayout },
  {
    path: "/admin-detailteacher",
    component: DetailTeacher,
    layout: AdminLayout,
  },
  {
    path: "/admin-teachers",
    component: AdminTeachers,
    layout: AdminLayout,
  },
  {
    path: "/admin-students",
    component: AdminStudents,
    layout: AdminLayout,
  },
  { path: "/dashboard", component: StudentDashboard, layout: Layout },
  { path: "/task1", component: Task1, layout: Layout },
  { path: "/task2", component: Task2, layout: Layout },
  { path: "/history", component: History, layout: Layout },
  { path: "/vocabulary", component: Vocabulary, layout: Layout },
];
