import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import userService from "@/services/api/userService";
import assignmentService from "@/services/api/assignmentService";
import attendanceService from "@/services/api/attendanceService";
import feeService from "@/services/api/feeService";
import examFormService from "@/services/api/examFormService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import StudentCard from "@/components/organisms/StudentCard";
import AttendanceModal from "@/components/organisms/AttendanceModal";
import GradingModal from "@/components/organisms/GradingModal";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);
  const [examForms, setExamForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [attendanceModal, setAttendanceModal] = useState({ isOpen: false, student: null });
  const [gradingModal, setGradingModal] = useState({ isOpen: false, student: null, submission: null });

  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);

      const [studentsData, submissionsData, attendanceData, feesData, examFormsData] = await Promise.all([
        userService.getStudents(),
        assignmentService.getSubmissions(),
        attendanceService.getAll(),
        feeService.getAll(),
        examFormService.getAll()
      ]);

      setStudents(studentsData);
      setSubmissions(submissionsData);
      setAttendance(attendanceData);
      setFees(feesData);
      setExamForms(examFormsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getStudentStatus = (studentId, type) => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (type) {
      case "assignment":
        const studentSubmissions = submissions.filter(s => s.student_id === studentId);
        if (studentSubmissions.length === 0) return "pending";
        const latestSubmission = studentSubmissions.sort((a, b) => 
          new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0)
        )[0];
        return latestSubmission.status;

      case "attendance":
        const todayAttendance = attendance.find(a => 
          a.student_id === studentId && a.date === today
        );
        return todayAttendance ? todayAttendance.status : "absent";

      case "fee":
        const studentFee = fees.find(f => f.student_id === studentId);
        return studentFee ? studentFee.payment_status : "unpaid";

      case "exam":
        const studentExams = examForms.filter(e => e.student_id === studentId);
        if (studentExams.length === 0) return "not_submitted";
        const latestExam = studentExams.sort((a, b) => 
          new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0)
        )[0];
        return latestExam.submission_status;

      default:
        return "unknown";
    }
  };

  const handleMarkAttendance = (student) => {
    setAttendanceModal({ isOpen: true, student });
  };

  const handleGradeAssignment = (student) => {
    const studentSubmission = submissions.find(s => 
      s.student_id === student.Id && s.status !== "pending"
    );
    setGradingModal({ isOpen: true, student, submission: studentSubmission });
  };

  const handleAttendanceSubmit = async (attendanceData) => {
    try {
      await attendanceService.markAttendance(
        attendanceData.studentId,
        1, // teacher ID
        attendanceData.date,
        attendanceData.status,
        attendanceData.remarks
      );
      
      toast.success("Attendance marked successfully");
      loadData(); // Refresh data
      setAttendanceModal({ isOpen: false, student: null });
    } catch (error) {
      toast.error("Failed to mark attendance");
      throw error;
    }
  };

  const handleGradingSubmit = async (gradeData) => {
    try {
      await assignmentService.gradeSubmission(gradeData.submissionId, {
        grade: gradeData.grade,
        status: gradeData.status,
        feedback: gradeData.feedback
      });
      
      toast.success("Assignment graded successfully");
      loadData(); // Refresh data
      setGradingModal({ isOpen: false, student: null, submission: null });
    } catch (error) {
      toast.error("Failed to grade assignment");
      throw error;
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={loadData} />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your students and track their progress</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-slate-900">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Users" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Assignments Submitted</p>
              <p className="text-2xl font-bold text-slate-900">
                {submissions.filter(s => s.status === "submitted").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Present Today</p>
              <p className="text-2xl font-bold text-slate-900">
                {attendance.filter(a => 
                  a.date === new Date().toISOString().split('T')[0] && a.status === "present"
                ).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Calendar" size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Fees Pending</p>
              <p className="text-2xl font-bold text-slate-900">
                {fees.filter(f => f.payment_status === "unpaid").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-danger-500 to-danger-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="DollarSign" size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search students by name or email..."
          className="max-w-md"
        />
      </div>

      {/* Students Grid */}
      {filteredStudents.length === 0 ? (
        <Empty
          title="No students found"
          description="No students match your search criteria"
          icon="Users"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.Id}
              student={student}
              assignmentStatus={getStudentStatus(student.Id, "assignment")}
              attendanceStatus={getStudentStatus(student.Id, "attendance")}
              feeStatus={getStudentStatus(student.Id, "fee")}
              examStatus={getStudentStatus(student.Id, "exam")}
              onMarkAttendance={handleMarkAttendance}
              onGradeAssignment={handleGradeAssignment}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <AttendanceModal
        isOpen={attendanceModal.isOpen}
        onClose={() => setAttendanceModal({ isOpen: false, student: null })}
        student={attendanceModal.student}
        onSubmit={handleAttendanceSubmit}
      />

      <GradingModal
        isOpen={gradingModal.isOpen}
        onClose={() => setGradingModal({ isOpen: false, student: null, submission: null })}
        student={gradingModal.student}
        submission={gradingModal.submission}
        onSubmit={handleGradingSubmit}
      />
    </div>
  );
};

export default TeacherDashboard;