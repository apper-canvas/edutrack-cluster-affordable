import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Button from "@/components/atoms/Button";

const AssignmentCard = ({ 
  assignment, 
  submission, 
  onSubmit, 
  onView 
}) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
  };

  const isOverdue = new Date(assignment.due_date) < new Date() && (!submission || submission.status === "pending");

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2">{assignment.title}</h3>
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">{assignment.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="BookOpen" size={16} />
              <span>{assignment.subject}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" size={16} />
              <span>Due: {formatDate(assignment.due_date)}</span>
            </div>
          </div>
        </div>

        <div className="ml-4">
          {submission ? (
            <StatusBadge status={submission.status} type="assignment" />
          ) : (
            <StatusBadge status="pending" type="assignment" />
          )}
        </div>
      </div>

      {isOverdue && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <ApperIcon name="AlertTriangle" size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-700">Assignment is overdue</span>
          </div>
        </div>
      )}

      {submission && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Your Submission</span>
            {submission.submitted_at && (
              <span className="text-xs text-slate-500">
                Submitted: {formatDate(submission.submitted_at)}
              </span>
            )}
          </div>
          
          {submission.submission_text && (
            <p className="text-sm text-slate-600 mb-2">{submission.submission_text}</p>
          )}
          
          {submission.grade !== null && (
            <div className="flex items-center space-x-2 mt-2">
              <ApperIcon name="Star" size={16} className="text-yellow-500" />
              <span className="text-sm font-medium text-slate-700">
                Grade: {submission.grade}/{assignment.max_grade}
              </span>
            </div>
          )}
          
          {submission.feedback && (
            <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs font-medium text-blue-700 mb-1">Teacher Feedback:</p>
              <p className="text-sm text-blue-600">{submission.feedback}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          icon="Eye"
          onClick={() => onView?.(assignment)}
          className="flex-1"
        >
          View Details
        </Button>
        
        {(!submission || submission.status === "pending") && (
          <Button
            variant="primary"
            size="sm"
            icon="Upload"
            onClick={() => onSubmit?.(assignment)}
            className="flex-1"
          >
            Submit Work
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;