import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getMenuItems = () => {
    if (!user) return [];

    const commonItems = [
      { name: "Dashboard", path: "", icon: "LayoutDashboard" },
      { name: "Profile", path: "profile", icon: "User" }
    ];

    if (user.role === "teacher") {
      return [
        { name: "Dashboard", path: "", icon: "LayoutDashboard" },
        { name: "Students", path: "students", icon: "Users" },
        { name: "Assignments", path: "assignments", icon: "FileText" },
        { name: "Attendance", path: "attendance", icon: "Calendar" },
        { name: "Profile", path: "profile", icon: "User" }
      ];
    } else if (user.role === "student") {
      return [
        { name: "Dashboard", path: "", icon: "LayoutDashboard" },
        { name: "My Assignments", path: "my-assignments", icon: "BookOpen" },
        { name: "My Records", path: "my-records", icon: "FileCheck" },
        { name: "Profile", path: "profile", icon: "User" }
      ];
    } else if (user.role === "admin") {
      return [
        { name: "Dashboard", path: "", icon: "LayoutDashboard" },
        { name: "All Users", path: "users", icon: "Users" },
        { name: "System Reports", path: "reports", icon: "BarChart3" },
        { name: "Settings", path: "settings", icon: "Settings" },
        { name: "Profile", path: "profile", icon: "User" }
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-slate-200 shadow-sm">
        <div className="h-full overflow-y-auto">
          <nav className="p-6 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path === "" ? "/" : `/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 border-l-4 border-primary-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <ApperIcon
                      name={item.icon}
                      size={20}
                      className={cn(
                        "transition-colors duration-200",
                        isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300">
            <div className="h-full overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Menu</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  >
                    <ApperIcon name="X" size={20} className="text-slate-600" />
                  </button>
                </div>
              </div>
              
              <nav className="p-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path === "" ? "/" : `/${item.path}`)}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 group"
                  >
                    <ApperIcon
                      name={item.icon}
                      size={20}
                      className="text-slate-400 group-hover:text-slate-600 transition-colors duration-200"
                    />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;