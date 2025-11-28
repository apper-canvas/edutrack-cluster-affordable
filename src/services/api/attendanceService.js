import attendanceData from "@/services/mockData/attendance.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AttendanceService {
  async getAll() {
    await delay(300);
    return [...attendanceData];
  }

  async getById(id) {
    await delay(200);
    const record = attendanceData.find(a => a.Id === parseInt(id));
    if (!record) {
      throw new Error("Attendance record not found");
    }
    return { ...record };
  }

  async getByStudent(studentId) {
    await delay(350);
    return attendanceData.filter(a => a.student_id === parseInt(studentId)).map(a => ({ ...a }));
  }

  async getByDate(date) {
    await delay(350);
    return attendanceData.filter(a => a.date === date).map(a => ({ ...a }));
  }

  async getByDateRange(startDate, endDate) {
    await delay(400);
    return attendanceData.filter(a => {
      return a.date >= startDate && a.date <= endDate;
    }).map(a => ({ ...a }));
  }

  async create(attendanceRecord) {
    await delay(500);
    const newRecord = {
      ...attendanceRecord,
      Id: Math.max(...attendanceData.map(a => a.Id)) + 1
    };
    attendanceData.push(newRecord);
    return { ...newRecord };
  }

  async update(id, attendanceRecord) {
    await delay(400);
    const index = attendanceData.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Attendance record not found");
    }
    
    attendanceData[index] = { ...attendanceData[index], ...attendanceRecord };
    return { ...attendanceData[index] };
  }

  async markAttendance(studentId, teacherId, date, status, remarks = null) {
    await delay(400);
    
    // Check if attendance already exists for this date
    const existingIndex = attendanceData.findIndex(
      a => a.student_id === parseInt(studentId) && 
           a.date === date
    );
    
    const attendanceRecord = {
      student_id: parseInt(studentId),
      teacher_id: parseInt(teacherId),
      date: date,
      status: status,
      remarks: remarks
    };
    
    if (existingIndex !== -1) {
      // Update existing record
      attendanceData[existingIndex] = { ...attendanceData[existingIndex], ...attendanceRecord };
      return { ...attendanceData[existingIndex] };
    } else {
      // Create new record
      const newRecord = {
        ...attendanceRecord,
        Id: Math.max(...attendanceData.map(a => a.Id)) + 1
      };
      attendanceData.push(newRecord);
      return { ...newRecord };
    }
  }

  async delete(id) {
    await delay(300);
    const index = attendanceData.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Attendance record not found");
    }
    
    const deletedRecord = attendanceData.splice(index, 1)[0];
    return { ...deletedRecord };
  }
}

export default new AttendanceService();