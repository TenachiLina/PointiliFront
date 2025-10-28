const API_BASE_URL = 'http://localhost:3000/api';

export const employeesApi = {

  async getEmployees() {
    try {
      console.log("🟢 Fetching employees from:", `${API_BASE_URL}/employees`);
      const response = await fetch(`${API_BASE_URL}/employees`);

      console.log("🟡 Response status:", response.status);
      const text = await response.text();
      console.log("🟣 Raw response text:", text);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = JSON.parse(text);
      console.log("✅ Parsed employees:", data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      throw error;
    }
  },



  async deleteEmployee(employeeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  },

  async addEmployee(employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  }
};


// export const employeesApi = {
//   async getEmployees() {
//     try {
//       const response = await fetch('http://localhost:3000/api/employees');
//       console.log('Raw response:', response);
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       console.log('Parsed data:', data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       throw error;
//     }
//   },
//   async deleteEmployee(employeeId) {
//     const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`, { method: 'DELETE' });
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return await response.json();
//   },
//   async addEmployee(employeeData) {
//     const response = await fetch(`http://localhost:3000/api/employees`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(employeeData),
//     });
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return await response.json();
//   }
// };
