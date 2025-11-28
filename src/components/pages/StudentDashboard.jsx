import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import assignmentService from "@/services/api/assignmentService";
import attendanceService from "@/services/api/attendanceService";
import feeService from "@/services/api/feeService";
import examFormService from "@/services/api/examFormService";
import { useAuth } from "@/hooks/useAuth";
import ApperIcon from "@/components/ApperIcon";
import AssignmentCard from "@/components/organisms/AssignmentCard";
import SubmissionModal from "@/components/organisms/SubmissionModal";
import StatusBadge from "@/components/molecules/StatusBadge";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import { format, subDays } from "date-fns";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);
  const [examForms, setExamForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [submissionModal, setSubmissionModal] = useState({ 
    isOpen: false, 
    assignment: null, 
    submission: null 
  });

  const loadData = async () => {
    if (!user) return;

    try {
      setError(null);
      setLoading(true);

      const [assignmentsData, submissionsData, attendanceData, feesData, examFormsData] = await Promise.all([
        assignmentService.getAll(),
        assignmentService.getSubmissionsByStudent(user.Id),
        attendanceService.getByStudent(user.Id),
        feeService.getByStudent(user.Id),
        examFormService.getByStudent(user.Id)
      ]);

      setAssignments(assignmentsData);
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
  }, [user]);

  const handleSubmitAssignment = (assignment) => {
    const existingSubmission = submissions.find(s => s.assignment_id === assignment.Id);
    setSubmissionModal({ 
      isOpen: true, 
      assignment, 
      submission: existingSubmission 
    });
  };

  const handleSubmissionSubmit = async (submissionData) => {
    if (!user) return;

    try {
      await assignmentService.submitAssignment({
        ...submissionData,
        student_id: user.Id
      });
      
      toast.success("Assignment submitted successfully!");
      loadData(); // Refresh data
      setSubmissionModal({ isOpen: false, assignment: null, submission: null });
    } catch (error) {
      toast.error("Failed to submit assignment");
      throw error;
    }
  };

  const getAttendanceStats = () => {
    const last30Days = attendance.filter(record => {
      const recordDate = new Date(record.date);
      const thirtyDaysAgo = subDays(new Date(), 30);
      return recordDate >= thirtyDaysAgo;
    });

    return {
      present: last30Days.filter(r => r.status === "present").length,
      absent: last30Days.filter(r => r.status === "absent").length,
      tardy: last30Days.filter(r => r.status === "tardy").length,
      total: last30Days.length
    };
  };

  const attendanceStats = getAttendanceStats();
  const currentFee = fees[0] || null;
  const pendingAssignments = assignments.filter(assignment => {
    const submission = submissions.find(s => s.assignment_id === assignment.Id);
    return !submission || submission.status === "pending";
  });

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={loadData} />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back, {user?.name}!</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Assignments Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Assignments</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="BookOpen" size={24} className="text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Assignments</span>
              <span className="font-semibold text-slate-900">{assignments.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Submitted</span>
              <span className="font-semibold text-success-600">
                {submissions.filter(s => s.status === "submitted").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Pending</span>
              <span className="font-semibold text-warning-600">{pendingAssignments.length}</span>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Attendance</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Calendar" size={24} className="text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Present (30 days)</span>
              <span className="font-semibold text-success-600">{attendanceStats.present}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Absent</span>
              <span className="font-semibold text-danger-600">{attendanceStats.absent}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Attendance Rate</span>
              <span className="font-semibold text-slate-900">
                {attendanceStats.total > 0 ? 
                  Math.round((attendanceStats.present / attendanceStats.total) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Fee Status */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Fee Status</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="DollarSign" size={24} className="text-white" />
            </div>
          </div>
          {currentFee ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Amount</span>
                <span className="font-semibold text-slate-900">${currentFee.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Due Date</span>
                <span className="font-semibold text-slate-900">
                  {format(new Date(currentFee.due_date), "MMM dd, yyyy")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Status</span>
                <StatusBadge status={currentFee.payment_status} type="fee" />
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No fee information available</p>
          )}
        </div>
      </div>

      {/* Assignments Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">My Assignments</h2>
          <span className="text-sm text-slate-500">{assignments.length} total</span>
        </div>

        {assignments.length === 0 ? (
          <Empty
            title="No assignments yet"
            description="Your assignments will appear here when your teachers post them"
            icon="BookOpen"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.map((assignment) => {
              const submission = submissions.find(s => s.assignment_id === assignment.Id);
              return (
                <AssignmentCard
                  key={assignment.Id}
                  assignment={assignment}
                  submission={submission}
                  onSubmit={handleSubmitAssignment}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Exam Forms Section */}
      {examForms.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Exam Form Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examForms.map((form) => (
              <div key={form.Id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-900">{form.subject}</h4>
                  <StatusBadge status={form.submission_status} type="exam" />
                </div>
                <p className="text-sm text-slate-600 mb-1">{form.form_type}</p>
                <p className="text-xs text-slate-500">
                  Exam Date: {format(new Date(form.exam_date), "MMM dd, yyyy")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={submissionModal.isOpen}
        onClose={() => setSubmissionModal({ isOpen: false, assignment: null, submission: null })}
        assignment={submissionModal.assignment}
        submission={submissionModal.submission}
        onSubmit={handleSubmissionSubmit}
      />
    </div>
  );
};

export default StudentDashboard;