'use client';
import { useState, ChangeEvent } from 'react';
import Navbar from '../components/navbar';

import { mockItems } from '../mockData/mockData';

// Define an interface for the table data
interface TableRow {
  a: string;
  b: string;
  c: string;
  d: string[];
  e: boolean;
  f: string;
}

import { useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState<TableRow[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);

  useEffect(() => {
    // Simulate a backend call to fetch data
    const fetchData = async () => {
      // const response = await fetch('/api/inventory'); // Replace with your actual API endpoint
      // const result: TableRow[] = await response.json();
      const result: TableRow[] = mockItems.map((item) => ({
        a: item.name,
        b: item.icon,
        c: item.expiry,
        d: item.tags,
        e: item.isFrozen,
        f: item.count,
      }));
      setData(result);
    };

    fetchData();
  }, []);

  const handleEditToggle = (rowIndex: number) => {
    setEditingRow(rowIndex);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    attribute: keyof TableRow,
  ) => {
    const newData = [...data];
    newData[rowIndex][attribute] = e.target.value;
    setData(newData);
  };

  const handleSave = () => {
    setEditingRow(null);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}
    >
      <Navbar />
      <h1>Hello, Inventory page!</h1>
      <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center', width: '16.66%' }}>Name</th>
            <th style={{ textAlign: 'center', width: '16.66%' }}>Emoji</th>
            <th style={{ textAlign: 'center', width: '16.66%' }}>Expiry Date</th>
            <th style={{ textAlign: 'center', width: '16.66%' }}>Category</th>
            <th style={{ textAlign: 'center', width: '16.66%' }}>Frozen?</th>
            <th style={{ textAlign: 'center', width: '16.66%' }}>Count</th>
            <th style={{ textAlign: 'center', width: '16.66%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((attribute) => (
                <td key={attribute} style={{ textAlign: 'center', width: '16.66%' }}>
                  {editingRow === rowIndex ? (
                    <input
                      type="text"
                      value={row[attribute as keyof TableRow]}
                      onChange={(e) => handleInputChange(e, rowIndex, attribute as keyof TableRow)}
                      style={{ width: '100px' }} // Adjust the width as needed
                    />
                  ) : Array.isArray(row[attribute as keyof TableRow]) ? (
                    row[attribute as keyof TableRow].join(', ')
                  ) : typeof row[attribute as keyof TableRow] === 'boolean' ? (
                    row[attribute as keyof TableRow].toString()
                  ) : (
                    row[attribute as keyof TableRow]
                  )}
                </td>
              ))}
              <td style={{ textAlign: 'center', width: '16.66%' }}>
                {editingRow === rowIndex ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEditToggle(rowIndex)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
