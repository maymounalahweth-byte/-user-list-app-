import { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setListOfUsers(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUser = (id) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  if (loading) return <p className="status">Loading users...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <div className="container">
      <h1>👥 User Directory</h1>

      <input
        type="text"
        className="search"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 && (
        <p className="status">No users match "{search}".</p>
      )}

      <ul className="user-list">
        {filteredUsers.map((user) => {
          const isOpen = selectedId === user.id;
          return (
            <li
              key={user.id}
              className={`user-card ${isOpen ? "open" : ""}`}
              onClick={() => toggleUser(user.id)}
            >
              <div className="user-main">
                <h2>{user.name}</h2>
                <p>📧 {user.email}</p>
                <p>🏢 {user.company.name}</p>
              </div>

              {isOpen && (
                <div className="user-details">
                  <p>
                    📍 {user.address.street}, {user.address.suite},{" "}
                    {user.address.city} {user.address.zipcode}
                  </p>
                  <p>📞 {user.phone}</p>
                  <p>🌐 {user.website}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserList;