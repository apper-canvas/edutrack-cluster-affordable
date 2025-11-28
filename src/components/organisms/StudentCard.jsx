import React from "react";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Button from "@/components/atoms/Button";

const StudentCard = ({ 
  student, 
  assignmentStatus, 
  attendanceStatus, 
  feeStatus, 
  examStatus,
  onMarkAttendance,
  onGradeAssignment,
  onViewDetails 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name="User" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{student.name}</h3>
            <p className="text-sm text-slate-500">{student.email}</p>
            <p className="text-xs text-slate-400">ID: {student.Id}</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          icon="Eye"
          onClick={() => onViewDetails?.(student)}
        >
          View
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Assignment</span>
            <StatusBadge status={assignmentStatus} type="assignment" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Attendance</span>
            <StatusBadge status={attendanceStatus} type="attendance" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Fee Status</span>
            <StatusBadge status={feeStatus} type="fee" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Exam Form</span>
            <StatusBadge status={examStatus} type="exam" />
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="primary"
          size="sm"
          icon="Calendar"
          onClick={() => onMarkAttendance?.(student)}
          className="flex-1"
        >
          Attendance
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon="Star"
          onClick={() => onGradeAssignment?.(student)}
          className="flex-1"
        >
          Grade
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;