import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PersistLogin from '../Features/Auth/persistLogin';
import RequireAuth from '../Features/Auth/RequireAuth';
import TeacherDashboard from '../Features/Teachers/TeacherDashboard';
import { StudentContainer } from '../Features/Teachers/StudentInfo/StudentContainer';
import { TeacherAssignmentContainer } from '../Features/Teachers/Assignment/TeacherAssignmentContainer';
import { TimeTableBox } from '../Features/Teachers/TimeTable/TimeTableBox';
import { TeacherCalendarContainer } from '../Features/Teachers/Calendar/TeacherCalendarContainer';
import { TeacherExaminationContainer } from '../Features/Teachers/Examination/TeacherExaminationContainer';
import { TeacherResultsContainer } from '../Features/Teachers/Results/TeacherResultsContainer';
import { Attendance } from '../Features/Teachers/Attendance/Attendance';
import { OtherInfo } from '../Features/Teachers/MiscellaneousInfo/OtherInfo';
import StudentDashboard from '../Features/Student/StudentDashboard';
import { Assignments } from '../Features/Student/Assignments';
import { Timetable } from '../Features/Student/Timetable';
import { Examination } from '../Features/Student/Examination';
import { Results } from '../Features/Student/Results';
import { UsersData } from '../Features/Admin/GetUsers';
import ROLES_LIST from '../Data/Roles.json';
import { AdminTimeTable } from '../Features/Admin/Timetable/AdminTimetable';
import { StaffContainer } from '../Features/Admin/StaffTable/AdminStaffContainer';
import { CalendarContainer } from '../Features/Student/CalendarContainer';
import EmployabilityPage from '../Pages/EmployabilityPage';
import { Courses } from '../Features/Teachers/Course';
import { StudentList } from '../Features/Teachers/StudentList';
import AdminDashboard from '../Features/Admin/AdminDashboard';
import AdminStudentListPage from '../Features/Admin/AdminStudentList';
import StudentResult from '../Features/Admin/StudentResult';
import NotFound404 from '../Pages/NotFound404';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        {/* --------- Admin Routes ------- */}
        <Route element={<RequireAuth allowedRoles={ROLES_LIST.Admin} />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/student-result' element={<StudentResult />} />
          <Route path='/admin/users' element={<UsersData />} />

          <Route path='admin/:classId/timetable' element={<AdminTimeTable />} />
          <Route
            path='/admin/:classId/staffInfo'
            element={<StaffContainer />}
          />
          <Route path='/admin/student-list'
            element={<AdminStudentListPage />}
          />
        </Route>
        {/* --------- Teacher Routes ------- */}
        <Route element={<RequireAuth allowedRoles={ROLES_LIST.Teacher} />}>
          <Route path='teacher/:classId' element={<TeacherDashboard />} />
          <Route
            path='teacher/:classId/students'
            element={<StudentContainer />}
          />
          <Route
            path='teacher/:classId/assignment'
            element={<TeacherAssignmentContainer />}
          />
          <Route path='teacher/:classId/timetable' element={<TimeTableBox />} />
          <Route
            path='teacher/:classId/calendar'
            element={<TeacherCalendarContainer />}
          />
          <Route
            path='teacher/:classId/examinations'
            element={<TeacherExaminationContainer />}
          />
          <Route
            path='teacher/:classId/results'
            element={<TeacherResultsContainer />}
          />
          <Route path='teacher/:classId/attendance' element={<Attendance />} />
          <Route
            path='teacher/:classId/miscellaneous'
            element={<OtherInfo />}
          />
        </Route>

        {/* ------- Student Routes ----------- */}
        <Route
          path='/employability'
          element={<EmployabilityPage />}
        />
        <Route path='/results' element={<Results />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/students' element={<StudentList />} />
        <Route element={<RequireAuth allowedRoles={ROLES_LIST.Student} />}>
          <Route path='/' element={<StudentDashboard />} />
        </Route>
        {/* <Route path='/dashboard/results' element={<Results />} /> */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
