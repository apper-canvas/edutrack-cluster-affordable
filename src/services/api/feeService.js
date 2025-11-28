import feesData from "@/services/mockData/fees.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FeeService {
  async getAll() {
    await delay(300);
    return [...feesData];
  }

  async getById(id) {
    await delay(200);
    const fee = feesData.find(f => f.Id === parseInt(id));
    if (!fee) {
      throw new Error("Fee record not found");
    }
    return { ...fee };
  }

  async getByStudent(studentId) {
    await delay(350);
    return feesData.filter(f => f.student_id === parseInt(studentId)).map(f => ({ ...f }));
  }

  async create(feeData) {
    await delay(500);
    const newFee = {
      ...feeData,
      Id: Math.max(...feesData.map(f => f.Id)) + 1
    };
    feesData.push(newFee);
    return { ...newFee };
  }

  async update(id, feeData) {
    await delay(400);
    const index = feesData.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Fee record not found");
    }
    
    feesData[index] = { ...feesData[index], ...feeData };
    return { ...feesData[index] };
  }

  async updatePaymentStatus(studentId, paymentData) {
    await delay(400);
    const index = feesData.findIndex(f => f.student_id === parseInt(studentId));
    if (index === -1) {
      throw new Error("Fee record not found for student");
    }
    
    feesData[index] = { 
      ...feesData[index], 
      ...paymentData,
      payment_date: paymentData.payment_status === "paid" ? new Date().toISOString().split('T')[0] : null
    };
    return { ...feesData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = feesData.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Fee record not found");
    }
    
    const deletedFee = feesData.splice(index, 1)[0];
    return { ...deletedFee };
  }
}

export default new FeeService();