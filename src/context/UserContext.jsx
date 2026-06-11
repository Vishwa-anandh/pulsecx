import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Sarah Connor', email: 'sarah@pulsecx.com', role: 'Global Admin', privilege: 'Full Access', status: 'Active' },
    { id: 'usr-2', name: 'John Doe', email: 'john.d@pulsecx.com', role: 'Engineer', privilege: 'Read, Write, Execute', status: 'Active' },
    { id: 'usr-3', name: 'Alice Smith', email: 'alice.s@pulsecx.com', role: 'Support Tier 1', privilege: 'Read Only', status: 'Inactive' },
    { id: 'usr-4', name: 'Bob Johnson', email: 'bob.j@pulsecx.com', role: 'Ops Manager', privilege: 'Read, Write', status: 'Active' },
  ]);

  const [teams, setTeams] = useState([
    { id: 'team-1', name: 'Operations Team', desc: 'Handles infrastructure, platform health, and deployments.', members: ['usr-1', 'usr-4'] },
    { id: 'team-2', name: 'Support Team', desc: 'Frontline customer support and tier 1 incident triaging.', members: ['usr-3'] },
    { id: 'team-3', name: 'Engineering Team', desc: 'Core developers, handles L3 escalations and bug fixes.', members: ['usr-2'] }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 'role-1', name: 'Global Admin',
      privileges: {
        dashboards: { read: true, write: true, delete: true },
        operations: { read: true, write: true, delete: true },
        journeys: { read: true, write: true, delete: true },
        monitoring: { read: true, write: true, delete: true },
        api: { read: true, write: true, delete: true },
        admin: { read: true, write: true, delete: true }
      }
    },
    {
      id: 'role-2', name: 'Ops Manager',
      privileges: {
        dashboards: { read: true, write: true, delete: false },
        operations: { read: true, write: true, delete: true },
        journeys: { read: true, write: false, delete: false },
        monitoring: { read: true, write: true, delete: true },
        api: { read: true, write: true, delete: false },
        admin: { read: false, write: false, delete: false }
      }
    },
    {
      id: 'role-3', name: 'Engineer',
      privileges: {
        dashboards: { read: true, write: false, delete: false },
        operations: { read: true, write: true, delete: false },
        journeys: { read: true, write: true, delete: true },
        monitoring: { read: true, write: true, delete: false },
        api: { read: true, write: true, delete: false },
        admin: { read: false, write: false, delete: false }
      }
    },
    {
      id: 'role-4', name: 'Support Tier 1',
      privileges: {
        dashboards: { read: true, write: false, delete: false },
        operations: { read: true, write: false, delete: false },
        journeys: { read: true, write: false, delete: false },
        monitoring: { read: true, write: false, delete: false },
        api: { read: false, write: false, delete: false },
        admin: { read: false, write: false, delete: false }
      }
    }
  ]);

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: `usr-${Date.now()}`,
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id, updatedData) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updatedData } : user));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const updateRolePrivilege = (roleId, module, privilegeType, value) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          privileges: {
            ...role.privileges,
            [module]: {
              ...role.privileges[module],
              [privilegeType]: value
            }
          }
        };
      }
      return role;
    }));
  };

  const addRole = (roleName) => {
    const newRole = {
      id: `role-${Date.now()}`,
      name: roleName,
      privileges: {
        dashboards: { read: false, write: false, delete: false },
        operations: { read: false, write: false, delete: false },
        journeys: { read: false, write: false, delete: false },
        monitoring: { read: false, write: false, delete: false },
        api: { read: false, write: false, delete: false },
        admin: { read: false, write: false, delete: false }
      }
    };
    setRoles(prev => [...prev, newRole]);
  };

  const addTeam = (teamData) => {
    const newTeam = {
      ...teamData,
      id: `team-${Date.now()}`,
    };
    setTeams(prev => [...prev, newTeam]);
  };

  const updateTeam = (id, updatedData) => {
    setTeams(prev => prev.map(team => team.id === id ? { ...team, ...updatedData } : team));
  };

  const deleteTeam = (id) => {
    setTeams(prev => prev.filter(team => team.id !== id));
  };

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, roles, updateRolePrivilege, addRole, teams, addTeam, updateTeam, deleteTeam, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
