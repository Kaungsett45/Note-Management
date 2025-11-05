import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import AddNote from "../components/AddNotes";
import EditNote from "../components/EditandDeleteNote";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);




  const navigate = useNavigate();
  let username = "";
    const token = localStorage.getItem("token");


   if (token) {
  const checkans = JSON.parse(atob(token.split(".")[1]));
  console.log(checkans); 
    username = checkans.name;
}

 const fetchNotes = async () => {
    try {
      const res = await API.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch notes");
    }
  };

  useEffect(() => {
  if (!token) {
    navigate("/login");
  } else {
    fetchNotes();
  }
}, [token, navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-800">Notes</h1>
           
        </div>
        <nav className="px-4 space-y-2">
            <h3 className="text-sm font-bold mb-4">Welcome, {username}!</h3>
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"   onClick={handleLogout}>
           Logout
          </button>
         
         
        </nav>
        
      </div>

     
      <div className="flex-1 flex flex-col">
        
        <header className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">My Notes</h2>
                <button
            onClick={() => setShowForm(!showForm)} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
            >
            {showForm ? "Hide Add Note" : "Add New Note"}
            </button>
          </div>
        </header>

        {/* Users Notes */}
        <main className="flex-1 p-6">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No notes yet. Create your first note!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md cursor-pointer"
                  onClick={() => setEditingNote(note)}
                >
                  <h3 className="font-medium text-gray-800 mb-2">{note.title}</h3>
                  <p className="text-gray-600 text-sm">{note.content}</p>
                  <p className="text-xs text-gray-400 mt-2">Click to edit</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

        {showForm && <AddNote fetchNotes={fetchNotes} token={token} />}
        {editingNote && (
          <EditNote
            note={editingNote}
            onClose={() => setEditingNote(null)}
            fetchNotes={fetchNotes}
            token={token}
          />
        )}
    </div>
  );
};

export default Dashboard;