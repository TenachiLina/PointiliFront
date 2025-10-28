// export default function ReportingContent( { employees } ) {
//   return (
//     <>
//         {/* <div
//             style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 color: "black",
//                 fontSize: "20px",
//                 marginLeft:"35px",
//                 marginTop: "40px",
//                 marginBottom: "0px"
//             }}
//         >
//             Enter clock in/out and shift number: 
//         </div> */}



//         <div>
//         <table border="1" cellPadding="20" cellSpacing="0">
//             <thead>
//             <tr>
//                 <th>Num</th>
//                 <th>Full name</th>
//                 <th>Delay</th>
//                 <th>Overtime</th>
//                 <th>Hours</th>

//             </tr>
//             </thead>
//             <tbody>
//             {employees.map((emp) => (
//                 <tr>
//                 <td>{emp.num}</td>
//                 <td>{emp.name}</td>
//                 <td>{emp.delay}</td>
//                 <td>{emp.overtime}</td>
//                 <td>{emp.hours}</td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//         </div>
//     </>
//   );
// }





import React, { useState } from "react";

export default function ReportingContent({ employees }) {
    const [month, setMonth] = useState(new Date().getMonth() + 1); // current month
    const [year, setYear] = useState(new Date().getFullYear());    // current year
    const [exporting, setExporting] = useState(false);

    // Export monthly report
    const handleExportMonthlyReport = async () => {
        try {
            setExporting(true);

            const monthNum = Number(month);
            const yearNum = Number(year);

            // Fetch monthly data from backend
            const response = await fetch(
                `http://localhost:3000/api/worktime/monthly?month=${monthNum}&year=${yearNum}`
            );

            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }

            const data = await response.json();

            // Convert to CSV
            let csv = 'Employee,Total Hours,Delay (min),Overtime (min)\n';
            data.forEach(emp => {
                csv += `${emp.name},${emp.total_hours},${emp.total_delay},${emp.total_overtime}\n`;
            });

            // Download CSV
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `monthly_report_${yearNum}-${monthNum.toString().padStart(2, '0')}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('✅ Monthly report exported successfully!');
        } catch (err) {
            console.error('Failed to export monthly report:', err);
            alert(`❌ Failed to export monthly report: ${err.message}`);
        } finally {
            setExporting(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>


            {/* Employees table */}
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>Full name</th>
                        <th>Delay</th>
                        <th>Overtime</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, index) => (
                        <tr key={`${emp.emp_id || index}`}> {/* unique key */}
                            <td>{emp.num}</td>
                            <td>{emp.name}</td>
                            <td>{emp.delay}</td>
                            <td>{emp.overtime}</td>
                            <td>{emp.hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Month/Year selectors and export button */}
            <div style={{ marginBottom: "20px" }}>
                <label>Month: </label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <label style={{ marginLeft: "10px" }}>Year: </label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    {[2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <button
                    style={{ marginLeft: "10px" }}
                    onClick={handleExportMonthlyReport}
                    disabled={exporting}
                >
                    {exporting ? "Exporting..." : "Export Monthly Report"}
                </button>
            </div>
        </div>

    );
}

