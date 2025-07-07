# Google Sheets Integration Setup Guide

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "X Akademi Applications"
3. Set up the following columns in the first row:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | İsim | Telefon | TYT Neti | AYT Neti | Çalışma Saati | Karar | Veli Onayı | Status |

4. Format the header row (Row 1) with bold text and background color
5. Set column widths appropriately

## Step 2: Google Apps Script Setup

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Replace the default code with the following:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare row data
    const rowData = [
      new Date(), // Timestamp
      data.isim,
      data.telefon,
      data.tyt,
      data.ayt,
      data.saat,
      data.karar,
      data.veliOnay ? "Evet" : "Hayır",
      "Yeni" // Status
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Başvuru başarıyla kaydedildi" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("X Akademi Applications API is running")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Save the script with a name like "X Akademi Applications API"

## Step 3: Deploy the Apps Script

1. Click **Deploy > New deployment**
2. Choose **Web app** as the type
3. Set the following settings:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** - you'll need this for the frontend

## Step 4: Test the API

You can test the API using curl or Postman:

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "isim": "Test User",
    "telefon": "5551234567",
    "tyt": "85.5",
    "ayt": "72.3",
    "saat": "4",
    "karar": "Kararım net ve olumlu, koçluk almaya hazırım.",
    "veliOnay": true
  }'
```

## Step 5: Update Frontend Code

The frontend code will need to be updated to use the Google Sheets API instead of Supabase. 