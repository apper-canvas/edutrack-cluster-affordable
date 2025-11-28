import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status, type }) => {
  const getStatusConfig = () => {
    switch (type) {
      case "assignment":
        switch (status) {
          case "submitted":
            return { variant: "success", icon: "CheckCircle", text: "Submitted" };
          case "graded":
            return { variant: "primary", icon: "Star", text: "Graded" };
          case "pending":
          default:
            return { variant: "warning", icon: "Clock", text: "Pending" };
        }
        
      case "attendance":
        switch (status) {
          case "present":
            return { variant: "success", icon: "Check", text: "Present" };
          case "absent":
            return { variant: "danger", icon: "X", text: "Absent" };
          case "tardy":
            return { variant: "warning", icon: "Clock", text: "Tardy" };
          default:
            return { variant: "default", icon: "Minus", text: "Unknown" };
        }
        
      case "fee":
        switch (status) {
          case "paid":
            return { variant: "success", icon: "CheckCircle", text: "Paid" };
          case "overdue":
            return { variant: "danger", icon: "AlertCircle", text: "Overdue" };
          case "unpaid":
          default:
            return { variant: "warning", icon: "Clock", text: "Unpaid" };
        }
        
      case "exam":
        switch (status) {
          case "approved":
            return { variant: "success", icon: "CheckCircle", text: "Approved" };
          case "submitted":
            return { variant: "info", icon: "Send", text: "Submitted" };
          case "rejected":
            return { variant: "danger", icon: "XCircle", text: "Rejected" };
          case "not_submitted":
          default:
            return { variant: "warning", icon: "Clock", text: "Not Submitted" };
        }
        
      default:
        return { variant: "default", icon: "Info", text: status };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} className="inline-flex items-center space-x-1">
      <ApperIcon name={config.icon} size={12} />
      <span>{config.text}</span>
    </Badge>
  );
};

export default StatusBadge;