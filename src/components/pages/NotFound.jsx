import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
            <ApperIcon name="AlertTriangle" size={48} className="text-white" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-primary-500 opacity-20 animate-ping"></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
          <p className="text-slate-600 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            variant="primary"
            size="lg"
            icon="Home"
            className="w-full"
          >
            Go to Dashboard
          </Button>
          
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            icon="ArrowLeft"
            className="w-full"
          >
            Go Back
          </Button>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            If you believe this is an error, please contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;