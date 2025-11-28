import usersData from "@/services/mockData/users.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserService {
  async getAll() {
    await delay(300);
    return [...usersData];
  }

  async getById(id) {
    await delay(200);
    const user = usersData.find(user => user.Id === parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  }

  async getStudents() {
    await delay(350);
    return usersData.filter(user => user.role === "student").map(user => ({ ...user }));
  }

  async getTeachers() {
    await delay(350);
    return usersData.filter(user => user.role === "teacher").map(user => ({ ...user }));
  }

  async create(userData) {
    await delay(500);
    const newUser = {
      ...userData,
      Id: Math.max(...usersData.map(u => u.Id)) + 1
    };
    usersData.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await delay(400);
    const index = usersData.findIndex(user => user.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    
    usersData[index] = { ...usersData[index], ...userData };
    return { ...usersData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = usersData.findIndex(user => user.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    
    const deletedUser = usersData.splice(index, 1)[0];
    return { ...deletedUser };
  }
}

export default new UserService();