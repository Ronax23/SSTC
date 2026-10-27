import React from 'react';
import LoaderError from './LoaderError';

interface ListTabProps<T> {
  title: string;
  data: T[];
  columns: string[]; // Array of string keys
  actions?: (item: T, index: number) => React.ReactNode; 
  isLoading?: boolean;
  setSearch: (search: string) => void; // Function to set search state
}

const ListTab = <T extends { id?: string | number; _id?: string | number }>({
  title,
  data,
  columns,
  actions,
  isLoading,
  setSearch
}: ListTabProps<T>) => {

  // Filter out 'id' and '_id' so they never show up as columns or headers
  const filteredColumns = columns.filter(col => col !== '_id' && col !== 'id' && col !== '__v');

  // Helper to make raw keys look nice in headers (e.g., "firmName" -> "Firm Name")
  const formatHeader = (key: string) => {
    if (key === 'img') return 'Profile';
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <div className="card shadow-sm mb-5 overflow-hidden" style={{ maxHeight: '60vh' }}>
      <div className="card-header bg-white justify-content-between d-flex py-3">
        <h4 className="mb-0">{title}</h4>
        <input type="text" placeholder="Search..." className='me-5 p-2' onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="card-body p-0 overflow-y-auto" style={{ maxHeight: 'calc(60vh - 70px)' }}>
        {isLoading ? (
          <LoaderError loading={true} />
        ) : data.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light sticky-top">
                <tr>
                  {filteredColumns.map((col, index) => (
                    <th key={index} className="ps-3 py-3">{formatHeader(col)}</th>
                  ))}
                  {actions && <th className="text-center">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    {filteredColumns.map((col, colIndex) => {
                      const key = col as keyof T;
                      
                      return (
                        <td key={colIndex} className="ps-3 p-4">
                          {key === 'img' ? (
                            <img 
                              src={item[key] as unknown as string} 
                              alt="Profile" 
                              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                          ) : (
                            // Otherwise, render text value from the object
                            (item[key] as React.ReactNode)
                          )}
                        </td>
                      );
                    })}
                    {actions && (
                      <td className="text-center">
                        {actions(item, index)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-5 text-center">
            <p className="text-muted">No records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTab;