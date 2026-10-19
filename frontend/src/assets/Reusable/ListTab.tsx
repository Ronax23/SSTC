import React from 'react';
import LoaderError from './LoaderError';

interface Column<T> {
  header: string;
  key: keyof T | string; // The property name in the data object
  render?: (item: T) => React.ReactNode; // Optional: Custom way to display the data
}

interface ListTabProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  actions?: (item: T, index: number) => React.ReactNode; // Optional: Custom actions
  isLoading?: boolean;
}

const ListTab = <T extends { id: string | number }>({title,data,columns,actions,isLoading}: ListTabProps<T>) => {
  return (
    <div className="card shadow-sm mb-5">
      <div className="card-header bg-white py-3">
        <h4 className="mb-0">{title}</h4>
      </div>
      <div className="card-body p-0">
        {isLoading ? <LoaderError loading={true} />
         : data.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  {columns.map((col, index) => (
                    <th key={index} className="ps-3">{col.header}</th>
                  ))}
                  {actions && <th className="text-center">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id || index}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="ps-3">
                        {col.render ? col.render(item) : (item[col.key as keyof T] as string)}
                      </td>
                    ))}
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
