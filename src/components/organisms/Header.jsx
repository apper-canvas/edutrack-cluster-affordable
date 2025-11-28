import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "text-purple-600 bg-purple-100";
      case "teacher": return "text-blue-600 bg-blue-100";
      case "student": return "text-success-600 bg-success-100";
      default: return "text-slate-600 bg-slate-100";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              EduTrack Pro
            </h1>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getRoleColor(user.role)}`}>
                  {user.role}
                </p>
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={20} className="text-white" />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                icon="LogOut"
                onClick={handleLogout}
                className="ml-4"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;