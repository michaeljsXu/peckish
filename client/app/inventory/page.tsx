'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import Navbar from '../components/navbar';
import { InventoryItem } from '../models/models';
import React from 'react';

// TODO: anytime when save is clicked, make call to API and send info to backend
export default function Page() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [newRow, setNewRow] = useState<Partial<InventoryItem> | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: InventoryItem[] = (await response.json()).map((item: any) => ({
          id: item._id, // Assuming the backend returns _id
          name: item.name,
          icon: item.icon,
          expiry: item.expiry ? new Date(item.expiry).toISOString().split('T')[0] : '', // Format the date
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    attribute: keyof InventoryItem,
  ) => {
    const newData = [...data];
    newData[rowIndex][attribute] = e.target.value;
    setData(newData);
  };

  const handleApplyChanges = async () => {
    try {
      const promises = data.map((item) =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })
      );
      await Promise.all(promises);
      alert('Changes applied successfully');
    } catch (error) {
      console.error('Error applying changes:', error);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item`, {
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
        // Format the expiry date before updating the state
        const { _id, __v, ...correctItem } = savedItem
        const formattedItem = {
          ...correctItem,
          expiry: correctItem.expiry ? new Date(correctItem.expiry).toISOString().split('T')[0] : '',
        };
        setData([...data, formattedItem]);
        setNewRow(null);
      } catch (error) {
        console.error('Error saving new item:', error);
      }
    }
  };

  const handleDeleteModeToggle = () => {
    setIsDeleteMode(!isDeleteMode);
    setRowsToDelete(new Set());
  };

  const handleRowSelectToggle = (rowIndex: number) => {
    const newRowsToDelete = new Set(rowsToDelete);
    if (newRowsToDelete.has(rowIndex)) {
      newRowsToDelete.delete(rowIndex);
    } else {
      newRowsToDelete.add(rowIndex);
    }
    setRowsToDelete(newRowsToDelete);
  };

  const handleDeleteSelectedRows = async () => {
    try {
      const promises = Array.from(rowsToDelete).map((rowIndex) =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${data[rowIndex].id}`, {
          method: 'DELETE',
        })
      );
      await Promise.all(promises);
      const newData = data.filter((_, index) => !rowsToDelete.has(index));
      setData(newData);
      setIsDeleteMode(false);
      setRowsToDelete(new Set());
      alert('Selected rows deleted successfully');
    } catch (error) {
      console.error('Error deleting selected rows:', error);
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
            {isDeleteMode && <th style={{ width: '5%' }}></th>}
            <th style={{ textAlign: 'center', width: '20%' }}>Name</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Icon</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Expiry Date</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Category</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => isDeleteMode && handleRowSelectToggle(rowIndex)}>
              {isDeleteMode && (
                <td style={{ textAlign: 'center', width: '5%' }}>
                  <input
                    type="checkbox"
                    checked={rowsToDelete.has(rowIndex)}
                    onChange={() => handleRowSelectToggle(rowIndex)}
                  />
                </td>
              )}
              {Object.keys(row)
                .filter((attribute) => attribute !== 'id') // Exclude the 'id' attribute
                .map((attribute) => (
                  <td key={attribute} style={{ textAlign: 'center', width: '20%' }}>
                    <input
                      type={attribute === 'expiry' ? 'date' : 'text'}
                      value={row[attribute as keyof InventoryItem]}
                      onChange={(e) => handleInputChange(e, rowIndex, attribute as keyof InventoryItem)}
                      style={{ width: '150px', backgroundColor: isDeleteMode && rowsToDelete.has(rowIndex) ? 'red' : 'white' }} // Adjust the width as needed
                      readOnly={isDeleteMode}
                    />
                  </td>
                ))}
            </tr>
          ))}
          {newRow && (
            <tr>
              {isDeleteMode && <td style={{ textAlign: 'center', width: '5%' }}></td>}
              {Object.keys(newRow)
                .filter((attribute) => attribute !== 'id') // Exclude the 'id' attribute
                .map((attribute) => (
                  <td key={attribute} style={{ textAlign: 'center', width: '20%' }}>
                    <input
                      type={attribute === 'expiry' ? 'date' : 'text'}
                      value={newRow[attribute as keyof InventoryItem] || ''} // Ensure value is a string
                      onChange={(e) => handleNewRowChange(e, attribute as keyof InventoryItem)}
                      style={{ width: '150px' }} // Adjust the width as needed
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
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAddNew}>Add New</button>
        <button onClick={handleApplyChanges} style={{ marginLeft: '10px' }}>
          Apply
        </button>
        <button onClick={isDeleteMode ? handleDeleteSelectedRows : handleDeleteModeToggle} style={{ marginLeft: '10px' }}>
          {isDeleteMode ? 'Confirm' : 'Delete'}
        </button>
      </div>
    </div>
  );
}