import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import EndpointDetails from './components/EndpointDetails';
import { apiGroups } from './apiData';
import './App.css';

function App() {
  const [activeEndpointId, setActiveEndpointId] = useState(
    apiGroups[0]?.endpoints[0]?.id || null
  );

  const activeEndpoint = useMemo(() => {
    for (const group of apiGroups) {
      const endpoint = group.endpoints.find(e => e.id === activeEndpointId);
      if (endpoint) return endpoint;
    }
    return null;
  }, [activeEndpointId]);

  return (
    <div className="app-container dark-theme">
      <Sidebar 
        activeEndpointId={activeEndpointId} 
        onSelectEndpoint={setActiveEndpointId} 
      />
      <main className="main-content">
        <EndpointDetails endpoint={activeEndpoint} />
      </main>
    </div>
  );
}

export default App;
