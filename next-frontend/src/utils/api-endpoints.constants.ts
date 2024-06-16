export const apiendpoints = {
  getAllStudentDetails: "/api/students",
  getStudentDetails: (user: string) => `/api/students/${user}`,
  createStudent: `/api/students`,
  deleteStudent: (id: string) => `/api/students/${id}`,
  updateStudentDetails: (id: string) => `/api/students/${id}`,
};
