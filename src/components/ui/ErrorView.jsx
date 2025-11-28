import React from "react";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ message, onRetry }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name="AlertCircle" size={32} className="text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-red-500 opacity-20 animate-ping"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">Oops! Something went wrong</h3>
          <p className="text-slate-600 leading-relaxed">
            {message || "We encountered an unexpected error. Please try again or contact support if the problem persists."}
          </p>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
          >
            <ApperIcon name="RefreshCw" size={18} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorView;