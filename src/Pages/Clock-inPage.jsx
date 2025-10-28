// // import '../App.css'
// // import Header from "../Components/Header"
// // import Content from "../Components/Content"
// // import TextField from "../Components/TextField"
// // import Animation3d from "../Components/The3dDesign"
// // import { useState, useEffect } from "react";
// // import { employeesApi } from "../services/employeesAPI";
// // //+++++++++++++
// // import { worktimeApi } from "../services/worktimeAPI";

// // //import ClockInPage from '../../../../Planning/src/Pages/Clock-inPage'

// // // Function to calculate work hours, late minutes, and overtime
// // function calculateWorkTime(shiftStart, shiftEnd, clockIn, clockOut) {
// //   const toMinutes = time => {
// //     const [h, m] = time.split(':').map(Number);
// //     return h * 60 + m;
// //   };

// //   const shiftStartM = toMinutes(shiftStart);
// //   const shiftEndM = toMinutes(shiftEnd);
// //   const clockInM = toMinutes(clockIn);
// //   const clockOutM = toMinutes(clockOut);

// //   const lateMinutes = Math.max(0, clockInM - shiftStartM);
// //   const workedMinutes = clockOutM - clockInM;
// //   const shiftMinutes = shiftEndM - shiftStartM;
// //   const overtimeMinutes = Math.max(0, workedMinutes - shiftMinutes);
// //   const workHours = Math.floor(workedMinutes / 60);

// //   return { workHours, lateMinutes, overtimeMinutes };
// // }

// // function ClockInPage() {
// //   const [employees, setEmployees] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [currentDate, setCurrentDate] = useState('');

// //   const [selectedEmployee, setSelectedEmployee] = useState(null);
// //   const [selectedShift, setSelectedShift] = useState(null);
// //   const [shiftStart, setShiftStart] = useState("");
// //   const [shiftEnd, setShiftEnd] = useState("");


// //   // GET CURRENT DATE ON COMPONENT MOUNT
// //   useEffect(() => {
// //     const fetchEmployees = async () => {
// //       setLoading(true);
// //       try {
// //         const employeesData = await employeesApi.getEmployees();
// //         console.log('Employees fetched:', employeesData); // check in browser console

// //         const transformedEmployees = employeesData.map(emp => ({
// //           num: emp.emp_id,  // use emp_id from backend
// //           name: emp.name,
// //           clockIn: "00:00",
// //           clockOut: "00:00",
// //           shift: 0,
// //           delay: "00:00",
// //           overtime: "00:00",
// //           hours: "00:00"
// //         }));

// //         setEmployees(transformedEmployees);
// //         fetchAllPlannedShifts(transformedEmployees); // keeps your shift fetching

// //         setError(null); // clear any previous error

// //       } catch (err) {
// //         console.error('Error fetching employees in useEffect:', err);
// //         setError('Failed to load employees');
// //         setEmployees([]); // prevent undefined
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchEmployees();
// //   }, []);













// //   // 📦 Fetch planned shift for employee
// //   async function getPlannedShift(emp_id, date) {
// //     const res = await fetch(`http://localhost:3000/api/planning/employee-shift/${emp_id}/${date}`);
// //     if (!res.ok) throw new Error("No planned shift found");
// //     return res.json();
// //   }

// //   // ADD NEW EMPLOYEE FUNCTION
// //   const addNewEmployee = async () => {
// //     const name = prompt("Enter new employee name:");
// //     if (!name) return;

// //     try {
// //       const newEmployee = await employeesApi.addEmployee({ name });

// //       // Add the new employee to the state
// //       setEmployees(prev => [...prev, {
// //         num: newEmployee.id,
// //         name: name,
// //         clockIn: "00:00",
// //         clockOut: "00:00",
// //         shift: 0,
// //         delay: "00:00",
// //         overtime: "00:00",
// //         hours: "00:00"
// //       }]);

// //       alert(`Employee "${name}" added successfully!`);
// //     } catch (err) {
// //       alert('Error adding employee: ' + err.message);
// //     }
// //   };

// //   // DELETE EMPLOYEE FUNCTION
// //   const handleEmployeeDeleted = async (employeeId) => {
// //     try {
// //       await employeesApi.deleteEmployee(employeeId);

// //       // Remove employee from state
// //       setEmployees(prev => prev.filter(emp => emp.num !== employeeId));

// //       alert("Employee deleted successfully!");
// //     } catch (err) {
// //       alert('Error deleting employee: ' + err.message);
// //     }
// //   };

// //   // SAVE ALL FUNCTION (if needed)
// //   const saveAll = () => {
// //     alert('Save functionality would go here');
// //   };

// //   if (loading) {
// //     return <div>Loading employees...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   // Store clock-in time locally
// //   const handleClockIn = () => {
// //     const now = new Date().toISOString();
// //     localStorage.setItem("clockInTime", now);
// //     alert(`Clocked in at ${new Date(now).toLocaleTimeString()}`);
// //   };

// //   // Save clock-out time and send to backend
// //   // const handleClockOut = async () => {
// //   //   const clockIn = localStorage.getItem("clockInTime");
// //   //   if (!clockIn) {
// //   //     alert("You must clock in first!");
// //   //     return;
// //   //   }
// //   // Store clock-out time and send to backend
// //   const handleClockOut = () => {
// //     const clockInTime = localStorage.getItem("clockInTime");
// //     if (!clockInTime) {
// //       alert("You must clock in first!");
// //       return;
// //     }

// //     const clockOutTime = new Date().toISOString();
// //     const employeeId = prompt("Enter your Employee ID:");

// //     // calculate work time
// //     const { workHours, lateMinutes, overtimeMinutes } = calculateWorkTime(
// //       "08:00",   // shift start
// //       "16:00",   // shift end
// //       clockInTime,
// //       clockOutTime
// //     );

// //     // send only DB fields
// //     worktimeApi.saveWorkTime({
// //       emp_id: parseInt(employeeId),
// //       work_date: currentDate,
// //       work_hours: workHours,
// //       late_minutes: lateMinutes,
// //       overtime_minutes: overtimeMinutes,
// //       shift_id: 1
// //     })
// //       .then(() => {
// //         alert("✅ Worktime recorded successfully!");
// //         localStorage.removeItem("clockInTime");
// //       })
// //       .catch(err => {
// //         console.error(err);
// //         alert("❌ Error saving work time to database");
// //       });
// //   };



// //   //   const clockOut = new Date().toISOString();
// //   //   const employeeId = prompt("Enter your Employee ID to confirm:");
// //   //   const workDate = currentDate;

// //   //   try {
// //   //     const result = await worktimeApi.saveWorkTime({
// //   //       emp_id: parseInt(employeeId),
// //   //       work_date: workDate,
// //   //       clock_in: clockIn,
// //   //       clock_out: clockOut
// //   //     });

// //   //     alert(`✅ Worktime recorded!
// //   //       Delay: ${result.late_minutes} min
// //   //       Overtime: ${result.overtime_minutes} min
// //   //       Worked: ${result.work_hours.toFixed(2)} h`);

// //   //     localStorage.removeItem("clockInTime");
// //   //   } catch (error) {
// //   //     console.error("Error saving worktime:", error);
// //   //     alert("❌ Failed to save worktime");
// //   //   }
// //   // };

// //   const fetchAllPlannedShifts = async (employeesList) => {
// //     const today = currentDate || new Date().toISOString().split('T')[0];
// //     const updated = await Promise.all(employeesList.map(async (emp) => {
// //       try {
// //         const res = await fetch(`http://localhost:3000/api/planning/employee-shift/${emp.num}/${today}`);
// //         if (!res.ok) throw new Error("No planned shift");
// //         const data = await res.json();
// //         return {
// //           ...emp,
// //           shift: data.shift_id,
// //           shiftStart: data.start_time,
// //           shiftEnd: data.end_time,
// //         };
// //       } catch {
// //         return emp;
// //       }
// //     }));
// //     setEmployees(updated);
// //   };



// //   return (
// //     <>
// //       <Header />
// //       {/* <Animation3d /> */}
// //       <TextField
// //         label="Date"
// //         value={currentDate} // PASSEZ LA DATE ACTUELLE
// //         readOnly //  RENDU LECTURE SEULE
// //       />
// //       <Content
// //         employees={employees}
// //         onEmployeeDeleted={handleEmployeeDeleted}
// //       />
// //       <div className='cntbtns'>
// //         <button className='cntbtn' onClick={addNewEmployee}>New Employee</button>
// //         <button className='cntbtn' onClick={saveAll}>Save</button>




// //       </div>
// //     </>
// //   );
// // }

// // export default ClockInPage;




































// import '../App.css'
// import Header from "../Components/Header"
// import Content from "../Components/Content"
// import TextField from "../Components/TextField"
// import { useState, useEffect } from "react";
// import { employeesApi } from "../services/employeesAPI";
// import { worktimeApi } from "../services/worktimeAPI";

// // Function to calculate work hours, late minutes, and overtime
// function calculateWorkTime(shiftStart, shiftEnd, clockIn, clockOut) {
//   const toMinutes = time => {
//     const [h, m] = time.split(':').map(Number);
//     return h * 60 + m;
//   };

//   const shiftStartM = toMinutes(shiftStart);
//   const shiftEndM = toMinutes(shiftEnd);
//   const clockInM = toMinutes(clockIn);
//   const clockOutM = toMinutes(clockOut);

//   const lateMinutes = Math.max(0, clockInM - shiftStartM);
//   const workedMinutes = clockOutM - clockInM;
//   const shiftMinutes = shiftEndM - shiftStartM;
//   const overtimeMinutes = Math.max(0, workedMinutes - shiftMinutes);
//   const workHours = Math.floor(workedMinutes / 60);

//   return { workHours, lateMinutes, overtimeMinutes };
// }

// function ClockInPage() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentDate, setCurrentDate] = useState('');

//   // GET CURRENT DATE
//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     setCurrentDate(today);
//   }, []);

//   // FETCH EMPLOYEES
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       setLoading(true);
//       try {
//         const employeesData = await employeesApi.getEmployees();
//         console.log('Employees fetched:', employeesData);

//         const transformedEmployees = employeesData.map(emp => ({
//           num: emp.emp_id, // <-- match backend field
//           name: emp.name,
//           clockIn: "00:00",
//           clockOut: "00:00",
//           shift: 0,
//           delay: "00:00",
//           overtime: "00:00",
//           hours: "00:00"
//         }));

//         setEmployees(transformedEmployees);
//         fetchAllPlannedShifts(transformedEmployees);
//         setError(null);

//       } catch (err) {
//         console.error('Error fetching employees:', err);
//         setError('Failed to load employees');
//         setEmployees([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // FETCH PLANNED SHIFTS
//   const fetchAllPlannedShifts = async (employeesList) => {
//     const today = currentDate || new Date().toISOString().split('T')[0];
//     const updated = await Promise.all(employeesList.map(async (emp) => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/planning/employee-shift/${emp.num}/${today}`);
//         if (!res.ok) throw new Error("No planned shift");
//         const data = await res.json();
//         return {
//           ...emp,
//           shift: data.shift_id,
//           shiftStart: data.start_time,
//           shiftEnd: data.end_time,
//         };
//       } catch {
//         return emp;
//       }
//     }));
//     setEmployees(updated);
//   };

//   // ADD NEW EMPLOYEE
//   const addNewEmployee = async () => {
//     const name = prompt("Enter new employee name:");
//     if (!name) return;
//     try {
//       const newEmployee = await employeesApi.addEmployee({ name });
//       setEmployees(prev => [...prev, {
//         num: newEmployee.id,
//         name: name,
//         clockIn: "00:00",
//         clockOut: "00:00",
//         shift: 0,
//         delay: "00:00",
//         overtime: "00:00",
//         hours: "00:00"
//       }]);
//       alert(`Employee "${name}" added successfully!`);
//     } catch (err) {
//       alert('Error adding employee: ' + err.message);
//     }
//   };

//   // DELETE EMPLOYEE
//   const handleEmployeeDeleted = async (employeeId) => {
//     try {
//       await employeesApi.deleteEmployee(employeeId);
//       setEmployees(prev => prev.filter(emp => emp.num !== employeeId));
//       alert("Employee deleted successfully!");
//     } catch (err) {
//       alert('Error deleting employee: ' + err.message);
//     }
//   };

//   // CLOCK IN
//   const handleClockIn = () => {
//     const now = new Date().toISOString();
//     localStorage.setItem("clockInTime", now);
//     alert(`Clocked in at ${new Date(now).toLocaleTimeString()}`);
//   };

//   // CLOCK OUT
//   const handleClockOut = () => {
//     const clockInTime = localStorage.getItem("clockInTime");
//     if (!clockInTime) {
//       alert("You must clock in first!");
//       return;
//     }

//     const clockOutTime = new Date().toISOString();
//     const employeeId = prompt("Enter your Employee ID:");
//     if (!employeeId) return alert("Employee ID is required");

//     // extract HH:MM from ISO string
//     const clockInHHMM = clockInTime.split('T')[1].substring(0, 5);
//     const clockOutHHMM = clockOutTime.split('T')[1].substring(0, 5);

//     // calculate work time
//     const { workHours, lateMinutes, overtimeMinutes } = calculateWorkTime(
//       "08:00", // shift start
//       "16:00", // shift end
//       clockInHHMM,
//       clockOutHHMM
//     );

//     // send as strings to match VARCHAR columns
//     worktimeApi.saveWorkTime({
//       employeeId: parseInt(employeeId),
//       date: currentDate,               // YYYY-MM-DD
//       timeOfWork: workHours.toString(),
//       delay: lateMinutes.toString(),
//       overtime: overtimeMinutes.toString(),
//       shift: 1
//     })
//       .then(() => {
//         alert("✅ Worktime recorded successfully!");
//         localStorage.removeItem("clockInTime");
//       })
//       .catch(err => {
//         console.error('Worktime save error:', err);
//         alert("❌ Error saving work time to database");
//       });
//   };
//   s



//   // SAVE ALL (optional)
//   const saveAll = () => {
//     alert('Save functionality would go here');
//   };

//   if (loading) return <div>Loading employees...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <Header />
//       <TextField label="Date" value={currentDate} readOnly />
//       <Content employees={employees} onEmployeeDeleted={handleEmployeeDeleted} />
//       <div className='cntbtns'>
//         <button className='cntbtn' onClick={addNewEmployee}>New Employee</button>
//         <button className='cntbtn' onClick={saveAll}>Save</button>
//       </div>
//     </>
//   );
// }

// export default ClockInPage;






























import '../App.css'
import Header from "../Components/Header"
import Content from "../Components/Content"
import TextField from "../Components/TextField"
import { useState, useEffect } from "react";
import { employeesApi } from "../services/employeesAPI";
import { worktimeApi } from "../services/worktimeAPI";

// Function to calculate work hours, late minutes, and overtime
function calculateWorkTime(shiftStart, shiftEnd, clockIn, clockOut) {
  const toMinutes = time => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const shiftStartM = toMinutes(shiftStart);
  const shiftEndM = toMinutes(shiftEnd);
  const clockInM = toMinutes(clockIn);
  const clockOutM = toMinutes(clockOut);

  const lateMinutes = Math.max(0, clockInM - shiftStartM);
  const workedMinutes = clockOutM - clockInM;
  const shiftMinutes = shiftEndM - shiftStartM;
  const overtimeMinutes = Math.max(0, workedMinutes - shiftMinutes);
  const workHours = Math.floor(workedMinutes / 60);

  return { workHours, lateMinutes, overtimeMinutes };
}

function ClockInPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [plannedShift, setPlannedShift] = useState(null); // 🆕 new state
  const [selectedShifts, setSelectedShifts] = useState({});

  useEffect(() => {
    const loadShifts = async () => {
      if (!currentDate) return;

      try {
        const updatedShifts = {};
        await Promise.all(
          employees.map(async (emp) => {
            const res = await fetch(`http://localhost:3000/api/planning/employee-shift/${emp.num}/${currentDate}`);
            if (!res.ok) return;
            const data = await res.json();
            if (data.shift_id) updatedShifts[emp.num] = data.shift_id.toString();
          })
        );

        setSelectedShifts(updatedShifts);
      } catch (err) {
        console.error("Error fetching shifts:", err);
        setSelectedShifts({});
      }
    };

    loadShifts();
  }, [currentDate, employees]); // ✅ run whenever date or employees change




  // GET CURRENT DATE (local time)
  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      setCurrentDate(`${yyyy}-${mm}-${dd}`);
    };

    updateDate(); // set immediately
    const timer = setInterval(updateDate, 60 * 1000); // update every minute

    return () => clearInterval(timer); // cleanup on unmount
  }, []);


  // FETCH EMPLOYEES
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const employeesData = await employeesApi.getEmployees();

        const transformedEmployees = employeesData.map(emp => ({
          num: emp.emp_id,
          name: emp.name,
          clockIn: "00:00",
          clockOut: "00:00",
          shift: 0,
        }));

        const today = currentDate
          ? (currentDate instanceof Date ? currentDate.toISOString().split('T')[0] : currentDate)
          : new Date().toISOString().split('T')[0];

        const employeesWithShifts = await Promise.all(
          transformedEmployees.map(async emp => {
            try {
              console.log(`Fetching shift for employee ${emp.num} on date ${today}`);
              const res = await fetch(`http://localhost:3000/api/planning/employee-shift/${emp.num}/${today}`);
              if (!res.ok) return { ...emp, shift: 0 };
              const data = await res.json();
              return { ...emp, shift: data.shift_id || 0 };
            } catch {
              return { ...emp, shift: 0 };
            }
          })
        );

        setEmployees(employeesWithShifts);
        // Initialize selectedShifts so dropdown shows the planned shift
        const initialShifts = {};
        employeesWithShifts.forEach(emp => {
          initialShifts[emp.emp_id] = emp.shift ? emp.shift.toString() : ""; // if shift is undefined

        });
        setSelectedShifts(initialShifts);
        setError(null);

      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employees');
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [currentDate]);


  // FETCH PLANNED SHIFTS
  const fetchAllPlannedShifts = async (employeesList) => {
    const today = currentDate || new Date().toISOString().split('T')[0];
    const updated = await Promise.all(
      employeesList.map(async (emp) => {
        try {
          const res = await fetch(`http://localhost:3000/api/planning/employee-shift/${emp.num}/${today}`);
          if (!res.ok) throw new Error("No planned shift");
          const data = await res.json();
          return {
            ...emp,
            shift: data.shift_id,
            shiftStart: data.start_time,
            shiftEnd: data.end_time,
          };
        } catch {
          return emp;
        }
      })
    );
    setEmployees(updated);
  };

  // ADD NEW EMPLOYEE
  const addNewEmployee = async () => {
    const name = prompt("Enter new employee name:");
    if (!name) return;
    try {
      const newEmployee = await employeesApi.addEmployee({ name });
      setEmployees(prev => [
        ...prev,
        {
          num: newEmployee.id,
          name: name,
          clockIn: "00:00",
          clockOut: "00:00",
          shift: 0,
          delay: "00:00",
          overtime: "00:00",
          hours: "00:00"
        }
      ]);
      alert(`Employee "${name}" added successfully!`);
    } catch (err) {
      alert('Error adding employee: ' + err.message);
    }
  };

  // DELETE EMPLOYEE
  const handleEmployeeDeleted = async (employeeId) => {
    try {
      await employeesApi.deleteEmployee(employeeId);
      setEmployees(prev => prev.filter(emp => emp.num !== employeeId));
      alert("Employee deleted successfully!");
    } catch (err) {
      alert('Error deleting employee: ' + err.message);
    }
  };

  // CLOCK IN
  const handleClockIn = () => {
    const now = new Date().toISOString();
    localStorage.setItem("clockInTime", now);
    alert(`Clocked in at ${new Date(now).toLocaleTimeString()}`);
  };

  // CLOCK OUT
  const handleClockOut = () => {
    const clockInTime = localStorage.getItem("clockInTime");
    if (!clockInTime) {
      alert("You must clock in first!");
      return;
    }

    const clockOutTime = new Date().toISOString();
    const employeeId = prompt("Enter your Employee ID:");
    if (!employeeId) return alert("Employee ID is required");

    const clockInHHMM = clockInTime.split('T')[1].substring(0, 5);
    const clockOutHHMM = clockOutTime.split('T')[1].substring(0, 5);

    const { workHours, lateMinutes, overtimeMinutes } = calculateWorkTime(
      "08:00",
      "16:00",
      clockInHHMM,
      clockOutHHMM
    );

    worktimeApi.saveWorkTime({
      employeeId: parseInt(employeeId),
      date: currentDate,
      timeOfWork: workHours.toString(),
      delay: lateMinutes.toString(),
      overtime: overtimeMinutes.toString(),
      shift: 1
    })
      .then(() => {
        alert("✅ Worktime recorded successfully!");
        localStorage.removeItem("clockInTime");
      })
      .catch(err => {
        console.error('Worktime save error:', err);
        alert("❌ Error saving work time to database");
      });
  };

  // SAVE ALL
  const saveAll = () => {
    alert('Save functionality would go here');
  };

  if (loading) return <div>Loading employees...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <TextField label="Date" value={currentDate} readOnly />
      <Content
        employees={employees}
        selectedShifts={selectedShifts}       // ✅ pass the state
        setSelectedShifts={setSelectedShifts} // ✅ pass the setter
        onEmployeeDeleted={handleEmployeeDeleted} />
      <div className='cntbtns'>
        <button className='cntbtn' onClick={addNewEmployee}>New Employee</button>
        <button className='cntbtn' onClick={saveAll}>Save</button>
      </div>
    </>
  );
}

export default ClockInPage;
