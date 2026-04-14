import express from 'express';
import cors from 'cors';
import fs from 'fs';
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const excelFilePath = path.join(__dirname, 'rsvps.xlsx');

// Initialize the Excel file if it doesn't exist
if (!fs.existsSync(excelFilePath)) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'RSVPs');
    xlsx.writeFile(workbook, excelFilePath);
    console.log(`Created new Excel file at ${excelFilePath}`);
}

app.post('/api/rsvp', (req, res) => {
    const { name, happiness } = req.body;
    
    if (!name || !happiness) {
        return res.status(400).json({ error: 'Name and Happiness level are required' });
    }

    try {
        // Read existing file
        const workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets['RSVPs'];
        
        // Convert sheet to json
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        // Append new data
        data.push({
            Timestamp: new Date().toISOString(),
            Name: name,
            Happiness_Level: happiness
        });
        
        // Update sheet
        const newWorksheet = xlsx.utils.json_to_sheet(data);
        workbook.Sheets['RSVPs'] = newWorksheet;
        
        // Write back to file
        xlsx.writeFile(workbook, excelFilePath);
        
        console.log(`Saved RSVP for ${name}`);
        res.status(200).json({ message: 'RSVP saved successfully' });
    } catch (error) {
        console.error('Error saving to Excel:', error);
        res.status(500).json({ error: 'Failed to save RSVP' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
