'use client';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import { InventoryItem } from '../models/models';
import React from 'react';

export default function Page() {
  const isFirstRender = useRef(true);

  useEffect(() => {
   
    // Your code to run on subsequent renders
  }, []);
  const [data, setData] = useState<InventoryItem[]>([]);
  const [newRow, setNewRow] = useState<Partial<InventoryItem> | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState<Set<number>>(new Set());

  // const [isAddRow, setIsAddRow] = useState(true);
  const [newItem, setNewItem] = useState<string>('');

  useEffect(() => {
    if (!isFirstRender.current) return; // only render the first time
    // Fetch data from the backend
    const fetchData = async () => {

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item`, {
          method: 'GET',
        });
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
    isFirstRender.current = false;
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
        }),
      );
      await Promise.all(promises);
      alert('Changes applied successfully');
    } catch (error) {
      console.error('Error applying changes:', error);
    }
  };

  // const handleAddNew = () => {
  //   if (isAddRow) {
  //     setNewRow({
  //       name: '',
  //       icon: '',
  //       expiry: '',
  //       tags: '',
  //       count: '',
  //     });
  //   } else {
  //     handleSaveNewRow(newRow);
  //   }
  //   setIsAddRow((prev) => !prev);
  // };

  const handleNewRowChange = (e: ChangeEvent<HTMLInputElement>, attribute: keyof InventoryItem) => {
    if (newRow) {
      setNewRow({ ...newRow, [attribute]: e.target.value });
    }
  };

  const handleSaveNewRow = async (newRow) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      });
      console.log("here");
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to save new item');
      }
      const savedItem = await response.json();
      // Format the expiry date before updating the state
      const { _id, __v, ...correctItem } = savedItem;
      const formattedItem = {
        ...correctItem,
        expiry: correctItem.expiry
          ? new Date(correctItem.expiry).toISOString().split('T')[0]
          : '',
      };
      setData([...data, formattedItem]);
      setNewRow(null);
    } catch (error) {
      console.log("error");
      console.error('Error saving new item:', error);
    }
  };

  const handleDeleteModeToggle = () => {
    setIsDeleteMode(!isDeleteMode);
    setRowsToDelete(new Set());
  };
  
  const handleRowSelectToggle = (rowIndex: number) => {
    setRowsToDelete(prevSet => {
      const newSet = new Set(prevSet);
      newSet.add(rowIndex);
      return newSet;
    });
  };

  const handleDeleteSelectedRows = async () => {
    try {
      const promises = Array.from(rowsToDelete).map((rowIndex) =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${data[rowIndex].id}`, {
          method: 'DELETE',
        }),
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

  useEffect(() =>  {
    const r = handleSaveNewRow(newRow);
    console.log(r);
  }, [newRow]);

  const handleMagicAdd = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/prompt/new/${newItem}`, {
        method: 'GET',
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch new item');
      }
      const result = await response.json();

      let data_no_id = JSON.parse(result.result);

      //let data = {id: "test", name: 'orange', icon: '🍊', expiry: '2024-11-02', tags: 'fruit, vitamin C', count: '5'};
      let data = { id: 'test', ...data_no_id };
      console.log(data);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + parseInt(data.expiry, 10));
      if (!isNaN(parseInt(data.expiry, 10))) {
        currentDate.setDate(currentDate.getDate() + parseInt(data.expiry, 10));
        data.expiry = currentDate.toISOString().split('T')[0];
      } else {
        data.expiry = '';
      }
      console.log('Fetched new item:', data);
      setNewRow(data);
      console.log(newRow);
      console.log("calling handle save new row")
      // You can handle the result here, e.g., add it to the inventory list
    } catch (error) {
      console.error('Error fetching new item:', error);
    }
  };


  return (
    <div className="h-full w-full flex flex-col items-center justify-start margins">
      <h1>Inventory</h1>
      <table className="w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left"></th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Icon</th>
            <th className="py-3 px-6 text-left">Expiry Date</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Count</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-200 ${isDeleteMode && rowsToDelete.has(rowIndex)
                  ? 'bg-orange-300 hover:bg-orange-400'
                  : 'hover:bg-gray-100'
                }`}
              onClick={() => isDeleteMode && handleRowSelectToggle(rowIndex)}
            >
              <td className="py-3 px-6 text-left">
                {isDeleteMode && (
                  <input
                    type="checkbox"
                    checked={rowsToDelete.has(rowIndex)}
                    onChange={() => handleRowSelectToggle(rowIndex)}
                  />
                )}
              </td>
              {Object.keys(row)
                .filter((attribute) => attribute !== 'id') // Exclude the 'id' attribute
                .map((attribute) => (
                  <td key={attribute} className="py-3 px-6 text-left">
                    <input
                      type={attribute === 'expiry' ? 'date' : 'text'}
                      value={row[attribute as keyof InventoryItem]}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, attribute as keyof InventoryItem)
                      }
                      className="bg-transparent"
                      style={{
                        width: '150px',
                        // backgroundColor:
                        //   isDeleteMode && rowsToDelete.has(rowIndex) ? 'red' : 'white',
                      }} // Adjust the width as needed
                      readOnly={isDeleteMode}
                    />
                  </td>
                ))}
            </tr>
          ))}
          {/* {newRow && (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left"></td>
              {Object.keys(newRow)
                .filter((attribute) => attribute !== 'id') // Exclude the 'id' attribute
                .map((attribute) => (
                  <td key={attribute} className="py-3 px-6 text-left">
                    <input
                      type={attribute === 'expiry' ? 'date' : 'text'}
                      value={newRow[attribute as keyof InventoryItem] || ''} // Ensure value is a string
                      onChange={(e) => handleNewRowChange(e, attribute as keyof InventoryItem)}
                      style={{ width: '150px' }} // Adjust the width as needed
                    />
                  </td>
                ))}
            </tr>
          )} */}
        </tbody>
      </table>
      <div className="flex flex-row justify-center gap-4 mt-5 w-full">
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Type an Item"
            className="input-box w-full pr-10"
            onChange={(event) => setNewItem(event.target.value)}
            onKeyDown={(event) => (event.key === 'Enter' ? handleMagicAdd() : null)}
            value={newItem}
          />
          <button
            className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-tl-none rounded-tr-md rounded-bl-none rounded-br-md"
            onClick={handleMagicAdd}
          >
            Add New
          </button>
        </div>

        {/* <button onClick={handleAddNew} className="btn-orange-outline mr-4">
          {isAddRow ? 'Add New' : 'Save New'}
        </button> */}
        <button onClick={handleApplyChanges} className="btn-orange">
          Apply
        </button>
        <button
          onClick={isDeleteMode ? handleDeleteSelectedRows : handleDeleteModeToggle}
          className="btn-orange"
        >
          {isDeleteMode ? 'Confirm' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
