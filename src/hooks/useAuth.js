import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication - in real app would call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email domain
      let userData;
      if (email.includes("teacher")) {
        userData = {
          Id: 1,
          name: "Sarah Johnson",
          email: email,
          role: "teacher",
          profile_photo: null
        };
      } else if (email.includes("admin")) {
        userData = {
          Id: 1,
          name: "Admin User",
          email: email,
          role: "admin",
          profile_photo: null
        };
      } else {
        userData = {
          Id: 1,
          name: "Alex Chen",
          email: email,
          role: "student",
          profile_photo: null
        };
      }

      const token = `mock-token-${Date.now()}`;
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };
};