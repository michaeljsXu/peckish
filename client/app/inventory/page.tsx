'use client';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { InventoryItem } from '../models/models';
import React from 'react';
import Snackbar from '../components/snackbar';

export default function Page() {
  const isFirstRender = useRef(true);
  const [data, setData] = useState<InventoryItem[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState<Set<number>>(new Set());
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

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
      onChangesApplied();
    } catch (error) {
      console.error('Error applying changes:', error);
    }
  };

  const handleSaveNewRow = async (newRow: Partial<InventoryItem> | null) => {
    try {
      if (!newRow) {
        console.error('No new row to save');
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to save new item');
      }
      const savedItem = await response.json();
      // Format the expiry date before updating the state
      const { _id, __v, ...correctItem } = savedItem;
      const formattedItem = {
        ...correctItem,
        expiry: correctItem.expiry ? new Date(correctItem.expiry).toISOString().split('T')[0] : '',
      };
      setData([...data, formattedItem]);
    } catch (error) {
      console.error('Error saving new item:', error);
    }
  };

  const handleDeleteModeToggle = () => {
    setIsDeleteMode(!isDeleteMode);
    setRowsToDelete(new Set());
  };

  const handleRowSelectToggle = (rowIndex: number) => {
    setRowsToDelete((prevSet) => {
      const newSet = new Set(prevSet);
      if (prevSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
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
    } catch (error) {
      console.error('Error deleting selected rows:', error);
    }
  };

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
      const data_no_id = JSON.parse(result.result);
      const data = { id: 'test', ...data_no_id };
      console.log('Fetched new item:', data);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + parseInt(data.expiry, 10));
      if (!isNaN(parseInt(data.expiry, 10))) {
        currentDate.setDate(currentDate.getDate() + parseInt(data.expiry, 10));
        data.expiry = currentDate.toISOString().split('T')[0];
      } else {
        data.expiry = '';
      }

      handleSaveNewRow(data);
    } catch (error) {
      console.error('Error fetching new item:', error);
    }
  };

  const onChangesApplied = () => {
    console.log('changes have been applied!');

    setSnackbarMessage('Changes saved!');

    setTimeout(() => {
      setSnackbarMessage('');
    }, 3000);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-start margins">
      <h1>Inventory</h1>
      <table className="table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-orange-100 text-gray-600 uppercase text-sm leading-normal">
            {/* <th className="py-3 px-6 text-left"></th> */}
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
              className={`border-b border-gray-200 ${
                isDeleteMode && rowsToDelete.has(rowIndex)
                  ? 'bg-red-300 hover:bg-red-400'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => isDeleteMode && handleRowSelectToggle(rowIndex)}
            >
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
                      className={
                        'bg-transparent ' + (attribute === 'icon' ? 'w-[60px]' : 'min-w-[150px]')
                      }
                      readOnly={isDeleteMode}
                    />
                  </td>
                ))}
            </tr>
          ))}
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
      <Snackbar message={snackbarMessage} visible={snackbarMessage.trim() !== ''} />
    </div>
  );
}
