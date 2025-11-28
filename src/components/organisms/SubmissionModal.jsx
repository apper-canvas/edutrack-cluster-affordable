import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const SubmissionModal = ({ isOpen, onClose, assignment, submission, onSubmit }) => {
  const [submissionText, setSubmissionText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submission) {
      setSubmissionText(submission.submission_text || "");
    } else {
      setSubmissionText("");
      setFile(null);
    }
  }, [submission]);

  if (!isOpen || !assignment) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({
        assignment_id: assignment.Id,
        submission_text: submissionText.trim(),
        file_path: file ? `submissions/${file.name}` : null,
        status: "submitted"
      });
      onClose();
    } catch (error) {
      console.error("Failed to submit assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6 transform transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Submit Assignment</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <ApperIcon name="X" size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">{assignment.title}</h4>
          <p className="text-sm text-blue-700">{assignment.description}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-blue-600">
            <span>Subject: {assignment.subject}</span>
            <span>Max Grade: {assignment.max_grade}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Submission Text
            </label>
            <textarea
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              placeholder="Write your submission here..."
              rows={6}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Attach File (optional)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-200">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <ApperIcon name="Upload" size={24} className="text-slate-400" />
                <span className="text-sm text-slate-600">
                  {file ? file.name : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-slate-400">PDF, DOC, DOCX, TXT up to 10MB</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="flex-1"
            >
              {submission ? "Update Submission" : "Submit Assignment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionModal;