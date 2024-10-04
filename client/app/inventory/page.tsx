'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import Navbar from '../components/navbar';
import { mockItems } from '../mockData/mockData';
import { InventoryItem } from '../models/models';
// Define an interface for the table data


export default function Page() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<InventoryItem | null>(null);

  useEffect(() => {
    // Simulate a backend call to fetch data
    const fetchData = async () => {
      const result: InventoryItem[] = mockItems.map((item) => ({
        name: item.name,
        emoji: item.emoji,
        expiry: item.expiry,
        tags: item.tags,
        isFrozen: item.isFrozen,
        count: item.count,
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
    attribute: keyof InventoryItem,
  ) => {
    const newData = [...data];
    newData[rowIndex][attribute] = e.target.value;
    setData(newData);
  };

  const handleSave = () => {
    setEditingRow(null);
  };

  const handleAddNew = () => {
    setNewRow({
      name: '',
      emoji: '',
      expiry: '',
      tags: [],
      isFrozen: false,
      count: '',
    });
  };

  const handleNewRowChange = (e: ChangeEvent<HTMLInputElement>, attribute: keyof InventoryItem) => {
    if (newRow) {
      setNewRow({ ...newRow, [attribute]: e.target.value });
    }
  };

  const handleSaveNewRow = () => {
    if (newRow) {
      setData([...data, newRow]);
      setNewRow(null);
    }
  };

  const handleDelete = (rowIndex: number) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}
    >
      <Navbar />
      <h1>Hello, InventoryItem page!</h1>
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
                      value={row[attribute as keyof InventoryItem]}
                      onChange={(e) => handleInputChange(e, rowIndex, attribute as keyof InventoryItem)}
                      style={{ width: '100px' }} // Adjust the width as needed
                    />
                  ) : Array.isArray(row[attribute as keyof InventoryItem]) ? (
                    row[attribute as keyof InventoryItem].join(', ')
                  ) : typeof row[attribute as keyof InventoryItem] === 'boolean' ? (
                    row[attribute as keyof InventoryItem].toString()
                  ) : (
                    row[attribute as keyof InventoryItem]
                  )}
                </td>
              ))}
              <td style={{ textAlign: 'center', width: '16.66%' }}>
                {editingRow === rowIndex ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditToggle(rowIndex)}>Edit</button>
                    <button onClick={() => handleDelete(rowIndex)} style={{ marginLeft: '10px' }}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {newRow && (
            <tr>
              {Object.keys(newRow).map((attribute) => (
                <td key={attribute} style={{ textAlign: 'center', width: '16.66%' }}>
                  <input
                    type={attribute === 'expiry' ? 'date' : 'text'}
                    value={newRow[attribute as keyof InventoryItem]}
                    onChange={(e) => handleNewRowChange(e, attribute as keyof InventoryItem)}
                    style={{ width: '100px' }} // Adjust the width as needed
                  />
                </td>
              ))}
              <td style={{ textAlign: 'center', width: '16.66%' }}>
                <button onClick={handleSaveNewRow}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleAddNew} style={{ marginTop: '20px' }}>
        Add New
      </button>
    </div>
  );
}
