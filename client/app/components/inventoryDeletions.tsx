import React from 'react';
import { InventoryItem } from '../models/models';

const InventoryDeletions: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
    return (
        <div>
            <h1>Confirm Item Deletions</h1>
            {/* send a list of the ingredients */}
            <p>Are you sure you want to delete</p>
        </div>
    );
};

export default InventoryDeletions;