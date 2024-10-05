'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { mockItems } from '../mockData/mockData';
import { InventoryItem, categories } from '../models/models';
import React from 'react';

// TODO: anytime when save is clicked, make call to API and send info to backend db
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
      className="margins"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}
    >
      <h1>Hello, InventoryItem page!</h1>
      <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center', width: '20%' }}>Name</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Emoji</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Expiry Date</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Category</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Count</th>
            <th style={{ textAlign: 'center', width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((attribute) => (
                <td key={attribute} style={{ textAlign: 'center', width: '20%' }}>
                  {editingRow === rowIndex ? (
                    attribute === 'tags' ? (
                      <select
                        multiple
                        value={row[attribute as keyof InventoryItem]}
                        onChange={(e) => {
                          const selectedOptions = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value,
                          );
                          const newValue = row[attribute as keyof InventoryItem].includes(
                            selectedOptions[0],
                          )
                            ? row[attribute as keyof InventoryItem].filter(
                                (item: string) => item !== selectedOptions[0],
                              )
                            : [...row[attribute as keyof InventoryItem], ...selectedOptions];
                          handleInputChange(
                            {
                              ...e,
                              target: { ...e.target, value: newValue },
                            } as ChangeEvent<HTMLInputElement>,
                            rowIndex,
                            attribute as keyof InventoryItem,
                          );
                        }}
                        style={{ width: '100px' }} // Adjust the width as needed
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {row[attribute as keyof InventoryItem].includes(category) ? '✔️' : ''}
                            {category}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={attribute === 'expiry' ? 'date' : 'text'}
                        value={row[attribute as keyof InventoryItem]}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, attribute as keyof InventoryItem)
                        }
                        style={{ width: '100px' }} // Adjust the width as needed
                      />
                    )
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
              {Object.keys(newRow).map((attribute) => (
                <td key={attribute} style={{ textAlign: 'center', width: '20%' }}>
                  {attribute === 'tags' ? (
                    <select
                      multiple
                      value={newRow[attribute as keyof InventoryItem]}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value,
                        );
                        const newValue = newRow[attribute as keyof InventoryItem].includes(
                          selectedOptions[0],
                        )
                          ? newRow[attribute as keyof InventoryItem].filter(
                              (item: string) => item !== selectedOptions[0],
                            )
                          : [...newRow[attribute as keyof InventoryItem], ...selectedOptions];
                        handleNewRowChange(
                          {
                            ...e,
                            target: { ...e.target, value: newValue },
                          } as ChangeEvent<HTMLInputElement>,
                          attribute as keyof InventoryItem,
                        );
                      }}
                      style={{ width: '100px' }} // Adjust the width as needed
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {newRow[attribute as keyof InventoryItem].includes(category) ? '✔️ ' : ''}
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={attribute === 'expiry' ? 'date' : 'text'}
                      value={newRow[attribute as keyof InventoryItem]}
                      onChange={(e) => handleNewRowChange(e, attribute as keyof InventoryItem)}
                      style={{ width: '100px' }} // Adjust the width as needed
                    />
                  )}
                </td>
              ))}
              <td style={{ textAlign: 'center', width: '20%' }}>
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
