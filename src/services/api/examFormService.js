import examFormsData from "@/services/mockData/examForms.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ExamFormService {
  async getAll() {
    await delay(300);
    return [...examFormsData];
  }

  async getById(id) {
    await delay(200);
    const form = examFormsData.find(f => f.Id === parseInt(id));
    if (!form) {
      throw new Error("Exam form not found");
    }
    return { ...form };
  }

  async getByStudent(studentId) {
    await delay(350);
    return examFormsData.filter(f => f.student_id === parseInt(studentId)).map(f => ({ ...f }));
  }

  async create(formData) {
    await delay(500);
    const newForm = {
      ...formData,
      Id: Math.max(...examFormsData.map(f => f.Id)) + 1
    };
    examFormsData.push(newForm);
    return { ...newForm };
  }

  async update(id, formData) {
    await delay(400);
    const index = examFormsData.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Exam form not found");
    }
    
    examFormsData[index] = { ...examFormsData[index], ...formData };
    return { ...examFormsData[index] };
  }

  async submitForm(formData) {
    await delay(500);
    const newForm = {
      ...formData,
      Id: Math.max(...examFormsData.map(f => f.Id)) + 1,
      submission_status: "submitted",
      submitted_at: new Date().toISOString()
    };
    examFormsData.push(newForm);
    return { ...newForm };
  }

  async updateStatus(id, status) {
    await delay(400);
    const index = examFormsData.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Exam form not found");
    }
    
    const updateData = { submission_status: status };
    if (status === "approved") {
      updateData.approved_at = new Date().toISOString();
    }
    
    examFormsData[index] = { ...examFormsData[index], ...updateData };
    return { ...examFormsData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = examFormsData.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Exam form not found");
    }
    
    const deletedForm = examFormsData.splice(index, 1)[0];
    return { ...deletedForm };
  }
}

export default new ExamFormService();