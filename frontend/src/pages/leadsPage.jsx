import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"; // State to store responses
import * as XLSX from "xlsx";

const Leads = () => {
  const API_URI = import.meta.env.VITE_API_BASE_URI;
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    college: "",
    degree: "",
    year_of_study: "",
    interested_domain: "",
    assigned: "",
    response: "",
  });
  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URI}/api/leads/all`);
      const data = await res.json();

      if (data.success) {
        setLeads(data.leads);
      } else {
        console.error("Failed to fetch leads:", data.error);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch leads data from backend
  useEffect(() => {
    fetchLeads();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };
  const addLead = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URI}/api/leads/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads();
        setNewLead({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
          college: "",
          degree: "",
          year_of_study: "",
          interested_domain: "",
          assigned: "",
          response: "",
        });
        alert("Lead added successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };
  // Function to update response in the database
  const editResponse = async (id, currentResponse) => {
    const newResponse = prompt("Enter new response:", currentResponse || "");
    if (newResponse !== null) {
      try {
        const res = await fetch(`${API_URI}/api/leads/updateRes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ response: newResponse }),
        });

        const data = await res.json();
        if (data.success) {
          // Update state with new response
          setLeads((prevLeads) =>
            prevLeads.map((lead) =>
              lead.id === id ? { ...lead, response: newResponse } : lead
            )
          );
          alert("Response updated successfully!");
        } else {
          console.error("Failed to update response:", data.error);
        }
      } catch (error) {
        console.error("Error updating response:", error);
      }
    }
  };
  const editAssigned = async (id) => {
    const newAss = prompt("Enter new Assigne:");
    if (newAss !== null) {
      try {
        const res = await fetch(`${API_URI}/api/leads/updateAss/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assigned: newAss }),
        });

        const data = await res.json();
        if (data.success) {
          // Update state with new Assigned
          setLeads((prevLeads) =>
            prevLeads.map((lead) =>
              lead.id === id ? { ...lead, assigned: newAss } : lead
            )
          );
          alert("Assigned updated successfully!");
        } else {
          console.error("Failed to update Assigne:", data.error);
        }
      } catch (error) {
        console.error("Error updating Assigned:", error);
      }
    }
  };

  // Function to delete lead from the database
  const deleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`${API_URI}/api/leads/delete/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (data.success) {
          setLeads((prev) => prev.filter((lead) => lead.id !== id)); // Remove from state
          alert("Lead deleted successfully!");
        } else {
          console.error("Failed to delete lead:", data.error);
        }
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(leads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "Leads.xlsx");
  };
  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      try {
        const response = await fetch(`${API_URI}/api/leads/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leads: jsonData }),
        });
        
        const result = await response.json();
        if (result.success) {
          alert("Leads uploaded successfully!");
          fetchLeads();
        } else {
          console.error("Upload failed:", result.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };
  if (loading)
    return <p className="text-center text-gray-600">Loading leads...</p>;

  return (
    <>
      <Navbar isNavbarVisible={true} />

      <div className="p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6">Leads Management</h1>
        {leads.length === 0 ? (
          <p className="text-gray-500">No leads found.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Whatsapp</th>
                <th className="border p-2">College Name</th>
                <th className="border p-2">Course Name</th>
                <th className="border p-2">Study Year</th>
                <th className="border p-2">Interested Domain</th>
                <th className="border p-2">Assigned</th>
                <th className="border p-2">Response</th>
                <th className="border p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="text-center border-b">
                  <td className="border p-2">{lead.name}</td>
                  <td className="border p-2">{lead.email}</td>
                  <td className="border p-2">{lead.phone}</td>
                  <td className="border p-2">{lead.whatsapp}</td>
                  <td className="border p-2">{lead.college}</td>
                  <td className="border p-2">{lead.degree}</td>
                  <td className="border p-2">{lead.year_of_study}</td>
                  <td className="border p-2">{lead.interested_domain}</td>
                  <td className="border p-2">
                    <span id={`response-${lead.id}`}>
                      {lead.assigned || "-"}
                    </span>
                    <button
                      onClick={() => editAssigned(lead.id)}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        padding: "2px",
                      }}
                    >
                      ✏️
                    </button>
                  </td>

                  <td className="border p-2">
                    <span id={`response-${lead.id}`}>
                      {lead.response || "-"}
                    </span>
                    <button
                      onClick={() => editResponse(lead.id, lead.response)}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        padding: "2px",
                      }}
                    >
                      ✏️
                    </button>
                  </td>
                  <td className=" p-2 flex items-center gap-7">
                    <button
                      onClick={() => deleteLead(lead.id)}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        padding: "2px",
                        color: "red",
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button style={{ float: "right" }}
        onClick={exportToExcel}
        className="bg-green-500 text-white p-2 mb-4"
      >
        Export to Excel
      </button>
      <div className="p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6">Add Leads</h1>
        {/* File Upload Input */}
        <h3 className="text-xl font-bold mb-6">Upload Excel or csv file for bulk data</h3>
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileUpload}
          className="mb-4 border p-2"
        />
        <h3 className="text-xl font-bold mb-6">Fill Data for adding leads</h3>
        <form onSubmit={addLead} className="mb-6 flex flex-wrap gap-2">
          <input
            type="text"
            name="name"
            value={newLead.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="border p-2"
          />
          <input
            type="email"
            name="email"
            value={newLead.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="border p-2"
          />
          <input
            type="text"
            name="phone"
            value={newLead.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
            className="border p-2"
          />
          <input
            type="text"
            name="whatsapp"
            value={newLead.whatsapp}
            onChange={handleInputChange}
            placeholder="WhatsApp"
            className="border p-2"
          />
          <input
            type="text"
            name="college"
            value={newLead.college}
            onChange={handleInputChange}
            placeholder="College Name"
            required
            className="border p-2"
          />
          <input
            type="text"
            name="degree"
            value={newLead.degree}
            onChange={handleInputChange}
            placeholder="Course Name"
            required
            className="border p-2"
          />
          <input
            type="text"
            name="year_of_study"
            value={newLead.year_of_study}
            onChange={handleInputChange}
            placeholder="Study Year"
            required
            className="border p-2"
          />
          <input
            type="text"
            name="interested_domain"
            value={newLead.interested_domain}
            onChange={handleInputChange}
            placeholder="Interested Domain"
            required
            className="border p-2"
          />

          <input
            type="text"
            name="assigned"
            value={newLead.assigned}
            onChange={handleInputChange}
            placeholder="Assigned To"
            className="border p-2"
          />

          <input
            type="text"
            name="response"
            value={newLead.response}
            onChange={handleInputChange}
            placeholder="Response"
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            Add Lead
          </button>
        </form>
      </div>
    </>
  );
};

export default Leads;
