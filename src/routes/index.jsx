import Login from "@/pages/general/login.jsx";
import Register from "@/pages/general/register.jsx";
import Home from "@/pages/general/index.jsx";
import Reading from "@/pages/general/reading.jsx";
import Listening from "@/pages/general/listening.jsx";
import Writing from "@/pages/general/writing.jsx";
import ReadingTest from "@/pages/general/readingtest.jsx";
import ListeningTest from "@/pages/general/listeningtest.jsx";
import TypeofTest from "@/pages/general/typeoftest.jsx";

import Layout from "@/components/Layout/index.jsx";
import TeacherLayout from "@/components/Layout/TeacherLayout.jsx";
import AdminLayout from "@/components/Layout/AdminLayout.jsx";

import StudentDashboard from "@/pages/student/index.jsx";
import WritingTest from "@/pages/student/writingtest.jsx";
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

//PAGE403
import page403 from "@/pages/general/page403.jsx";

export const publicRoutes = [
  { path: "/", component: Home, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/reading", component: Reading, layout: Layout },
  { path: "/listening", component: Listening, layout: Layout },
  { path: "/writing", component: Writing, layout: Layout },
  { path: "/type-of-test", component: TypeofTest, layout: null },
  { path: "/page403", component: page403, layout: null },
];
//Routes need to login for accessing
export const privateRoutes = [
  {
    path: "/admin-settings",
    component: AdminSettings,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/teacher-dashboard",
    component: TeacherDashBoard,
    layout: TeacherLayout,
    roles: ["admin", "teacher"],
  },
  {
    path: "/teacher-course",
    component: Courses,
    layout: TeacherLayout,
    roles: ["admin", "teacher"],
  },
  {
    path: "/teacher-class",
    component: Classes,
    layout: TeacherLayout,
    roles: ["admin", "teacher"],
  },
  {
    path: "/teacher-student",
    component: Students,
    layout: TeacherLayout,
    roles: ["admin", "teacher"],
  },

  {
    path: "/admin-dashboard",
    component: AdminDashBoard,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/admin-class",
    component: AdminClasses,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/admin-detailclass",
    component: DetailClass,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/admin-detailteacher",
    component: DetailTeacher,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/admin-teachers",
    component: AdminTeachers,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/admin-students",
    component: AdminStudents,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/admin-writing",
    component: AdminWriting,
    layout: AdminLayout,
    roles: ["admin"],
  },
  {
    path: "/admin-addwriting",
    component: AdminAddWriting,
    layout: AdminLayout,
    roles: ["admin"],
  },
  { path: "/dashboard", component: StudentDashboard, layout: Layout },
  { path: "/writingtest/:id", component: WritingTest, layout: null },
  { path: "/writingtest", component: WritingTest, layout: null },
  { path: "/reading-test", component: ReadingTest, layout: null },
  { path: "/listening-test", component: ListeningTest, layout: null },
  { path: "/history", component: History, layout: Layout },
  { path: "/vocabulary", component: Vocabulary, layout: Layout },
];
