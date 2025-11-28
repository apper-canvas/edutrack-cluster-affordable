import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
          </div>
          <div className="absolute inset-0 w-16 h-16 mx-auto">
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 opacity-20 animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded animate-pulse w-32 mx-auto"></div>
          <div className="h-3 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 rounded animate-pulse w-24 mx-auto"></div>
        </div>
        
<div className="text-slate-600 font-medium">Loading application...</div>
      </div>
    </div>
  );
};

export default Loading;