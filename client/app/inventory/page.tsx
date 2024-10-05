'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import Navbar from '../components/navbar';
import { InventoryItem } from '../models/models';
import React from 'react';

// TODO: anytime when save is clicked, make call to API and send info to backend
export default function Page() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<Partial<InventoryItem> | null>(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/item');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: InventoryItem[] = (await response.json()).map((item: any) => ({
          id: item._id, // Assuming the backend returns _id
          name: item.name,
          icon: item.icon,
          expiry: item.expiry,
          tags: item.tags,
          count: item.count,
        }));
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
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

  const handleSave = async () => {
    if (editingRow !== null) {
      const updatedRow = data[editingRow];
      try {
        const response = await fetch(`http://localhost:4000/item/${updatedRow.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
        const updatedItem = await response.json();
        const { _id, __v, ...itemWithoutId } = updatedItem;
        const newData = [...data];
        newData[editingRow] = itemWithoutId;
        setData(newData);
        setEditingRow(null);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }
  };

  const handleAddNew = () => {
    setNewRow({
      name: '',
      icon: '',
      expiry: '',
      tags: [],
      count: '',
    });
  };

  const handleNewRowChange = (e: ChangeEvent<HTMLInputElement>, attribute: keyof InventoryItem) => {
    if (newRow) {
      setNewRow({ ...newRow, [attribute]: e.target.value });
    }
  };

  const handleSaveNewRow = async () => {
    if (newRow) {
      try {
        const response = await fetch('http://localhost:4000/item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRow),
        });
        if (!response.ok) {
          throw new Error('Failed to save new item');
        }
        const savedItem = await response.json();
        // Exclude the 'id' attribute from the saved item before updating the state
        const { _id, __v, ...itemWithoutId } = savedItem;
        setData([...data, itemWithoutId]);
        setNewRow(null);
      } catch (error) {
        console.error('Error saving new item:', error);
      }
    }
  };

  const handleDelete = async (rowIndex: number) => {
    const itemToDelete = data[rowIndex];
    try {
      const response = await fetch(`http://localhost:4000/item/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      const newData = data.filter((_, index) => index !== rowIndex);
      setData(newData);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
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
            <th style={{ textAlign: 'center', width: '20%' }}>Name</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Icon</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Expiry Date</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Category</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Count</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row)
                .filter((attribute) => attribute !== 'id') // Exclude the 'id' attribute
                .map((attribute) => (
                  <td key={attribute} style={{ textAlign: 'center', width: '20%' }}>
                    {editingRow === rowIndex ? (
                      <input
                        type={attribute === 'expiry' ? 'date' : 'text'}
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
              <td style={{ textAlign: 'center', width: '20%' }}>
                {editingRow === rowIndex ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => handleDelete(rowIndex)} style={{ marginLeft: '10px' }}>
                      Delete
                    </button>
                  </>
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
              {Object.keys(newRow)
                .filter((attribute) => attribute !== 'id') // Exclude the 'id' attribute
                .map((attribute) => (
                  <td key={attribute} style={{ textAlign: 'center', width: '20%' }}>
                    <input
                      type={attribute === 'expiry' ? 'date' : 'text'}
                      value={newRow[attribute as keyof InventoryItem] || ''} // Ensure value is a string
                      onChange={(e) => handleNewRowChange(e, attribute as keyof InventoryItem)}
                      style={{ width: '100px' }} // Adjust the width as needed
                    />
                  </td>
                ))}
              <td style={{ textAlign: 'center', width: '20%' }}>
                <button onClick={handleSaveNewRow}>Save</button>
                <button onClick={handleCancelNewRow} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
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