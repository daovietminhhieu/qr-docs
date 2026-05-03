import React from 'react';
import CodeBlock from './CodeBlock';

const EndpointDetails = ({ endpoint }) => {
  if (!endpoint) {
    return (
      <div className="endpoint-empty">
        <div className="empty-state">
          <h2>Select an endpoint</h2>
          <p>Choose an API endpoint from the sidebar to view its documentation.</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="endpoint-details">
      <header className="endpoint-header">
        <div className="endpoint-title-row">
          <h1>{endpoint.title}</h1>
        </div>
        <div className="endpoint-url-box">
          <span 
            className="method-badge large" 
            style={{ backgroundColor: getMethodColor(endpoint.method) }}
          >
            {endpoint.method}
          </span>
          <span className="url-path">{endpoint.path}</span>
        </div>
        <p className="endpoint-description">{endpoint.description}</p>
      </header>

      <div className="endpoint-content">
        <div className="main-column">
          {endpoint.headers && endpoint.headers.length > 0 && (
            <section className="detail-section">
              <h3>Headers</h3>
              <div className="table-responsive">
                <table className="params-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.headers.map((header, idx) => (
                      <tr key={idx}>
                        <td>
                          <span className="param-name">{header.name}</span>
                          {header.required && <span className="required-badge">required</span>}
                        </td>
                        <td><span className="param-type">{header.type}</span></td>
                        <td>{header.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <section className="detail-section">
              <h3>Parameters</h3>
              <div className="table-responsive">
                <table className="params-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>In</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param, idx) => (
                      <tr key={idx}>
                        <td>
                          <span className="param-name">{param.name}</span>
                          {param.required && <span className="required-badge">required</span>}
                        </td>
                        <td><span className="param-in">{param.in}</span></td>
                        <td><span className="param-type">{param.type}</span></td>
                        <td>{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {endpoint.requestBody && (
            <section className="detail-section">
              <h3>Request Body</h3>
              <p className="content-type">Content-Type: <code>{endpoint.requestBody.type}</code></p>
              <CodeBlock 
                code={JSON.stringify(endpoint.requestBody.example, null, 2)} 
                language="json" 
              />
            </section>
          )}
        </div>

        <div className="side-column">
          {endpoint.responses && endpoint.responses.map((response, idx) => (
            <section className="detail-section response-section" key={idx}>
              <h3>Response 
                <span className={`status-badge ${response.status >= 200 && response.status < 300 ? 'success' : 'error'}`}>
                  {response.status}
                </span>
              </h3>
              <p className="response-desc">{response.description}</p>
              {response.body && (
                <CodeBlock 
                  code={JSON.stringify(response.body, null, 2)} 
                  language="json" 
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EndpointDetails;
