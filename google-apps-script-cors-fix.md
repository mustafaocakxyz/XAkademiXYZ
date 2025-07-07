# Fix CORS Issues in Google Apps Script

## Updated Google Apps Script Code

Replace your current Google Apps Script code with this CORS-enabled version:

```javascript
function doPost(e) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

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
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Başvuru başarıyla kaydedildi" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doGet(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput("X Akademi Applications API is running")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}

function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('')
    .setHeaders(headers);
}
```

## Steps to Update:

1. Go to your Google Apps Script project
2. Replace the current code with the above code
3. Save the script
4. Create a new deployment:
   - Click **Deploy > New deployment**
   - Choose **Web app**
   - Set Execute as: **Me**
   - Set Who has access: **Anyone**
   - Click **Deploy**
5. Copy the new Web App URL
6. Update your `basvuru.html` with the new URL 