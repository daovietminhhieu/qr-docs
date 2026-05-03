import React from 'react';
import { Server, CreditCard, ChevronRight, Hash, Activity, BookOpen } from 'lucide-react';
import { apiGroups } from '../apiData';

const getMethodColor = (method) => {
  switch (method.toUpperCase()) {
    case 'GET': return 'var(--method-get)';
    case 'POST': return 'var(--method-post)';
    case 'PUT': return 'var(--method-put)';
    case 'DELETE': return 'var(--method-delete)';
    case 'INFO': return 'var(--method-info)';
    default: return '#fff';
  }
};

const getGroupIcon = (name) => {
  if (name.toLowerCase() === 'getting started' || name.toLowerCase() === 'hướng dẫn') return <BookOpen size={18} />;
  if (name.toLowerCase() === 'system') return <Activity size={18} />;
  if (name.toLowerCase() === 'payment') return <CreditCard size={18} />;
  return <Server size={18} />;
};

const Sidebar = ({ activeEndpointId, onSelectEndpoint }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Server className="logo-icon" size={24} />
        <h2>API Reference</h2>
      </div>
      
      <div className="sidebar-nav">
        {apiGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="nav-group">
            <h3 className="group-title">
              {getGroupIcon(group.name)}
              <span>{group.name}</span>
            </h3>
            <ul className="endpoint-list">
              {group.endpoints.map(endpoint => (
                <li key={endpoint.id}>
                  <button
                    className={`endpoint-btn ${activeEndpointId === endpoint.id ? 'active' : ''}`}
                    onClick={() => onSelectEndpoint(endpoint.id)}
                  >
                    <span 
                      className="method-badge" 
                      style={{ color: getMethodColor(endpoint.method) }}
                    >
                      {endpoint.method}
                    </span>
                    <span className="endpoint-path">{endpoint.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
