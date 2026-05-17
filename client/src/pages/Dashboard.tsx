import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

function Dashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("");

const [sourceFilter, setSourceFilter] =
  useState("");

const [sortOrder, setSortOrder] =
  useState("latest");

const [page, setPage] = useState(1);
const [loading, setLoading] =
  useState(false);
const [totalPages, setTotalPages] =
  useState(1);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  status: "new",
  source: "website",
});

const [editingLeadId, setEditingLeadId] =
  useState<string | null>(null);

const fetchLeads = async () => {
  setLoading(true);
  try {
    const res = await API.get(
      `/leads?search=${debouncedSearch}&status=${statusFilter}&source=${sourceFilter}&sort=${sortOrder}&page=${page}&limit=10`
    );

    setLeads(res.data.leads);

    setTotalPages(res.data.totalPages);
  } catch (error) {
    alert("Failed to fetch leads");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, statusFilter, sourceFilter, sortOrder, page]);

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);


  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleCreateLead = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (
  !formData.name ||
  !formData.email
) {
  alert(
    "Please fill all fields"
  );

  return;
}

  try {
    if (editingLeadId) {
      await API.put(
        `/leads/${editingLeadId}`,
        formData
      );

      alert("Lead updated successfully");
    } else {
      await API.post(
        "/leads",
        formData
      );

      alert("Lead created successfully");
    }

    setFormData({
      name: "",
      email: "",
      status: "new",
      source: "website",
    });

    setEditingLeadId(null);

    fetchLeads();
  } catch (error) {
    alert("Operation failed");
  }
};

const handleDeleteLead = async (
  id: string
) => {
  try {
    await API.delete(`/leads/${id}`);

    alert("Lead deleted");

    fetchLeads();
  } catch (error) {
    alert("Delete failed");
  }
};

const handleEditLead = (
  lead: Lead
) => {
  setEditingLeadId(lead._id);

  setFormData({
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
  });
};

const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white">
        
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          GigFlow Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
    <h2 className="text-gray-300">
      Total Leads
    </h2>

    <p className="text-4xl font-bold mt-2">
      {leads.length}
    </p>
  </div>

  <div className="bg-blue-500/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
    <h2 className="text-gray-300">
      Qualified Leads
    </h2>

    <p className="text-4xl font-bold mt-2">
      {
        leads.filter(
          (lead) =>
            lead.status ===
            "qualified"
        ).length
      }
    </p>
  </div>

  <div className="bg-green-500/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
    <h2 className="text-gray-300">
      New Leads
    </h2>

    <p className="text-4xl font-bold mt-2">
      {
        leads.filter(
          (lead) =>
            lead.status === "new"
        ).length
      }
    </p>
  </div>
</div>

      <div className="flex gap-4 mb-6">
  <input
    type="text"
    placeholder="Search leads..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="bg-white/10 border border-white/20 p-3 rounded-xl text-white placeholder-gray-300 w-full"
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="bg-slate-800 border border-white/20 p-3 rounded-xl text-white"
  >
    <option value="">All Status</option>

    <option value="new">New</option>

    <option value="contacted">
      Contacted
    </option>

    <option value="qualified">
      Qualified
    </option>

    <option value="lost">
      Lost
    </option>
  </select>

  <select
    value={sourceFilter}
    onChange={(e) =>
      setSourceFilter(
        e.target.value
      )
    }
    className="bg-slate-800 border border-white/20 p-3 rounded-xl text-white"
  >
    <option value="">
      All Sources
    </option>

    <option value="website">
      Website
    </option>

    <option value="instagram">
      Instagram
    </option>

    <option value="referral">
      Referral
    </option>
  </select>
  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(
        e.target.value
      )
    }
    className="bg-slate-800 border border-white/20 p-3 rounded-xl text-white"
  >
    <option value="latest">
      Latest
    </option>

    <option value="oldest">
      Oldest
    </option>
  </select>
</div>

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-8">
  <h2 className="text-2xl font-bold mb-4">
    Create Lead
  </h2>

  <form
    onSubmit={handleCreateLead}
    className="grid grid-cols-2 gap-4"
  >
    <input
      type="text"
      name="name"
      placeholder="Enter name"
      value={formData.name}
      onChange={handleChange}
      className="bg-white/10 border border-white/20 p-3 rounded-xl text-white placeholder-gray-300"
    />

    <input
      type="email"
      name="email"
      placeholder="Enter email"
      value={formData.email}
      onChange={handleChange}
      className="bg-white/10 border border-white/20 p-3 rounded-xl text-white placeholder-gray-300"
    />

    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="bg-slate-800 border border-white/20 p-3 rounded-xl text-white placeholder-gray-300"
    >
      <option value="new">New</option>

      <option value="contacted">
        Contacted
      </option>

      <option value="qualified">
        Qualified
      </option>

      <option value="lost">
        Lost
      </option>
    </select>

    <select
      name="source"
      value={formData.source}
      onChange={handleChange}
      className="bg-slate-800 border border-white/20 p-3 rounded-xl text-white placeholder-gray-300"
    >
      <option value="website">
        Website
      </option>

      <option value="instagram">
        Instagram
      </option>

      <option value="facebook">
        Facebook
      </option>

      <option value="referral">
        Referral
      </option>
    </select>

    <button
      type="submit"
      className="col-span-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold p-3 rounded-xl transition"
    >
      {editingLeadId
     ? "Update Lead"
     : "Create Lead"}
    </button>
    </form>
    </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-white/10 text-cyan-300">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Source
              </th>
              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-8 text-cyan-300"
                >
                  Loading leads...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-8 text-gray-300"
                >
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4">
                    {lead.name}
                  </td>

                  <td className="p-4">
                    {lead.email}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        
                      lead.status === "qualified"
                        ? "bg-green-500/20 text-green-300"
                      : lead.status === "contacted"
                        ? "bg-yellow-500/20 text-yellow-300"
                      : lead.status === "lost"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-blue-500/20 text-blue-300"
                        
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {lead.source}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleEditLead(lead)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-xl mr-2 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteLead(
                          lead._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-4 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
  >
    Previous
  </button>

  <span className="text-lg font-semibold">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
  >
    Next
  </button>
</div>
    </div>

    
  );
}

export default Dashboard;