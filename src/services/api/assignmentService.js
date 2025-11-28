import assignmentsData from "@/services/mockData/assignments.json";
import submissionsData from "@/services/mockData/assignmentSubmissions.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AssignmentService {
  async getAll() {
    await delay(300);
    return [...assignmentsData];
  }

  async getById(id) {
    await delay(200);
    const assignment = assignmentsData.find(a => a.Id === parseInt(id));
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    return { ...assignment };
  }

  async getByTeacherId(teacherId) {
    await delay(350);
    return assignmentsData.filter(a => a.teacher_id === parseInt(teacherId)).map(a => ({ ...a }));
  }

  async create(assignmentData) {
    await delay(500);
    const newAssignment = {
      ...assignmentData,
      Id: Math.max(...assignmentsData.map(a => a.Id)) + 1
    };
    assignmentsData.push(newAssignment);
    return { ...newAssignment };
  }

  async update(id, assignmentData) {
    await delay(400);
    const index = assignmentsData.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Assignment not found");
    }
    
    assignmentsData[index] = { ...assignmentsData[index], ...assignmentData };
    return { ...assignmentsData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = assignmentsData.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Assignment not found");
    }
    
    const deletedAssignment = assignmentsData.splice(index, 1)[0];
    return { ...deletedAssignment };
  }

  async getSubmissions() {
    await delay(300);
    return [...submissionsData];
  }

  async getSubmissionById(id) {
    await delay(200);
    const submission = submissionsData.find(s => s.Id === parseInt(id));
    if (!submission) {
      throw new Error("Submission not found");
    }
    return { ...submission };
  }

  async getSubmissionsByStudent(studentId) {
    await delay(350);
    return submissionsData.filter(s => s.student_id === parseInt(studentId)).map(s => ({ ...s }));
  }

  async getSubmissionsByAssignment(assignmentId) {
    await delay(350);
    return submissionsData.filter(s => s.assignment_id === parseInt(assignmentId)).map(s => ({ ...s }));
  }

  async submitAssignment(submissionData) {
    await delay(500);
    const newSubmission = {
      ...submissionData,
      Id: Math.max(...submissionsData.map(s => s.Id)) + 1,
      submitted_at: new Date().toISOString()
    };
    
    // Update existing submission or create new one
    const existingIndex = submissionsData.findIndex(
      s => s.assignment_id === submissionData.assignment_id && 
           s.student_id === submissionData.student_id
    );
    
    if (existingIndex !== -1) {
      submissionsData[existingIndex] = { ...submissionsData[existingIndex], ...newSubmission };
      return { ...submissionsData[existingIndex] };
    } else {
      submissionsData.push(newSubmission);
      return { ...newSubmission };
    }
  }

  async gradeSubmission(id, gradeData) {
    await delay(400);
    const index = submissionsData.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Submission not found");
    }
    
    submissionsData[index] = { 
      ...submissionsData[index], 
      ...gradeData,
      graded_at: new Date().toISOString()
    };
    return { ...submissionsData[index] };
  }
}

export default new AssignmentService();