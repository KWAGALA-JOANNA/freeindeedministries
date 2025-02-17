// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './admin_dashboard.css';
// import { useAuth } from './auth_context'; 

// const AdminDashboard = () => {
//   const { user, logout, isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       window.location.href = '/login';
//     }
//   }, [isAuthenticated]);

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div>
//       <header>
//         <h1>Welcome to the Admin Dashboard</h1>
//       </header>

//       <br />

//       <table>
//         <thead>
//           <tr>
//             <th>Contact Inquiries</th>
//             <th>Programs</th>
//             <th>Gallery Items</th>
//             <th>Events</th>
//             <th>Donations</th>
//             <th>Users</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             {user && user.is_admin && (
//               <>
//                 <td>
                  // <Link to="contact_inquiry/create">Create contact inquiry</Link><br />
                  // <Link to="contact_inquiry/all">Get all contact inquiries</Link><br />
                  // <Link to="contact_inquiry/get">Get a specific contact inquiry</Link><br />
                  // <Link to="contact_inquiry/update">Update a specific contact inquiry</Link><br />
                  // <Link to="contact_inquiry/delete">Delete contact inquiry</Link><br />
//                 </td>
//                 <td>
                  // <Link to="programs/add">Add Program</Link><br />
                  // <Link to="programs/all">Get all programs</Link><br />
                  // <Link to="program/id">Get a specific program</Link><br />
                  // <Link to="program/update">Update a program</Link><br />
                  // <Link to="program/delete">Delete a program</Link><br />
//                 </td>
//                 <td>
                  // <Link to="upload/image">Upload image</Link><br />
                  // <Link to="getall/images">Get all images</Link><br />
                  // <Link to="getspecific/image">Get a specific image</Link><br />
                  // <Link to="update/image">Update an image</Link><br />
                  // <Link to="delete/image">Delete an image</Link><br />
//                 </td>
//                 <td>
                  // <Link to="create/event">Create an event</Link><br />
                  // <Link to="get/event">Get a specific event</Link><br />
                  // <Link to="all/events">Get all events</Link><br />
                  // <Link to="update/event">Update an event</Link><br />
                  // <Link to="delete/event">Delete an event</Link><br />
//                 </td>
//                 <td>
                  // <Link to="donation/add">Register donor</Link><br />
                  // <Link to="getall/donations">Get all donors</Link><br />
                  // <Link to="getspecific/donar">Get specific donor</Link><br />
                  // <Link to="update/donar">Update a donor</Link><br />
                  // <Link to="delete/donar">Delete a donor</Link><br />
//                 </td>
//                 <td>
                  // <Link to="user/register">Register user</Link><br />
                  // <Link to="getall/users">Get all users</Link><br />
                  // <Link to="getspecific/user">Get a specific user</Link><br />
                  // <Link to="update/user">Update a user</Link><br />
                  // <Link to="delete/user">Delete a user</Link><br />
//                 </td>
//               </>
//             )}
//           </tr>
//         </tbody>
//       </table>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin_dashboard.css';
import { useAuth } from './auth_context';

const AdminDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      name: 'Contact Inquiries',
      links: [
        { path: 'contact_inquiry/all', label: 'Get All Contact Inquiries' },
        { path: 'contact_inquiry/get', label: 'Get Specific Inquiry' },
        { path: 'contact_inquiry/update', label: 'Update Inquiry' },
        { path: 'contact_inquiry/delete', label: 'Delete Inquiry' },
      ],
    },
    {
      name: 'Programs',
      links: [
        { path: 'programs/add', label: 'Add Program' },
        { path: 'programs/all', label: 'Get All Programs' },
        { path: 'program/id', label: 'Get Specific Program' },
        { path: 'program/update', label: 'Update Program' },
        { path: 'program/delete', label: 'Delete Program' },
      ],
    },
    {
      name: 'Events',
      links: [
        { path: 'create/event', label: 'Add Event' },
        { path: 'get/event', label: 'Get Specific Event' },
        { path: 'all/events', label: 'Get All Events' },
        { path: 'update/event', label: 'Update Event' },
        { path: 'delete/event', label: 'Delete Event' },
      ],
    },
    {
      name: 'Gallery',
      links: [
        { path: 'upload/image', label: 'Upload Image' },
        { path: 'getall/images', label: 'Get All Images' },
        { path: 'getspecific/image', label: 'Get Specific Image' },
        { path: 'update/image', label: 'Update Image' },
        { path: 'delete/image', label: 'Delete Image' },
      ],
    },
    {
      name: 'Donations',
      links: [
        { path: 'donation/add', label: 'Register Donor' },
        { path: 'getall/donations', label: 'Get All Donors' },
        { path: 'getspecific/donar', label: 'Get Specific Donor' },
        { path: 'update/donar', label: 'Update Donor' },
        { path: 'delete/donar', label: 'Delete Donor' },
      ],
    },
    {
      name: 'Users',
      links: [
        { path: 'user/register', label: 'Register User' },
        { path: 'user/get_all_users', label: 'Get All Users' },
        { path: 'getaspecificUser/get_user', label: 'Get Specific User' },
        { path: 'updateUser/update_user', label: 'Update User' },
        { path: 'deleteUser/delete_user', label: 'Delete User' },
      ],
    },
    {
      name: 'SendMessages',
      links: [
        { path: 'SendMessages/send-sms', label: 'Send SMS and Email' },
      ],
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="dashboard-container">
      <header className="admin-dashboard-header">
        <h1>Welcome, {user?.name || 'Admin'}</h1>
      </header>
      <div className="dashboard-content">
        <aside className="sidebar">
          <nav>
            <ul>
              {sections.map((section) => (
                <li key={section.name} onClick={() => toggleSection(section.name)}>
                  {section.name} <span>{expandedSection === section.name ? '▼' : '▶'}</span>
                  {expandedSection === section.name && (
                    <div className="links">
                      {section.links.map((link) => (
                        <Link key={link.path} to={link.path}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </aside>
        <main className="main-content">
          <h2>Dashboard Overview</h2>
          <p>Select a section from the sidebar to manage content.</p>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
