import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item", 
  actionText, 
  onAction,
  icon = "Database"
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name={icon} size={32} className="text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-slate-400 opacity-20 animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
        
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
          >
            <ApperIcon name="Plus" size={18} />
            <span>{actionText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;