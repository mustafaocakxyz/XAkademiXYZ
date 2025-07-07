# Google Sheets Integration Implementation Checklist

## ✅ Phase 1: Google Sheets Setup

### Step 1: Create Google Sheet
- [ ] Go to [Google Sheets](https://sheets.google.com)
- [ ] Create new spreadsheet named "X Akademi Applications"
- [ ] Set up columns in Row 1:
  - [ ] A: Timestamp
  - [ ] B: İsim
  - [ ] C: Telefon
  - [ ] D: TYT Neti
  - [ ] E: AYT Neti
  - [ ] F: Çalışma Saati
  - [ ] G: Karar
  - [ ] H: Veli Onayı
  - [ ] I: Status
- [ ] Format header row (bold, background color)
- [ ] Adjust column widths

### Step 2: Google Apps Script
- [ ] In Google Sheet, go to **Extensions > Apps Script**
- [ ] Replace default code with the provided script
- [ ] Save script as "X Akademi Applications API"

### Step 3: Deploy Apps Script
- [ ] Click **Deploy > New deployment**
- [ ] Choose **Web app** type
- [ ] Set Execute as: **Me**
- [ ] Set Who has access: **Anyone**
- [ ] Click **Deploy**
- [ ] Copy the **Web app URL**

## ✅ Phase 2: Frontend Integration

### Step 4: Update Application Form
- [ ] Replace `basvuru.html` with `basvuru-google-sheets.html`
- [ ] Update `GOOGLE_SHEETS_API_URL` with your actual Web App URL
- [ ] Test form submission

### Step 5: Test Integration
- [ ] Fill out test application form
- [ ] Submit form
- [ ] Verify data appears in Google Sheet
- [ ] Check success/error messages

## ✅ Phase 3: Advanced Features (Optional)

### Step 6: Email Notifications
- [ ] Add email notification to Google Apps Script
- [ ] Configure email template
- [ ] Test email delivery

### Step 7: Data Validation
- [ ] Add phone number format validation
- [ ] Add score range validation
- [ ] Add duplicate prevention

### Step 8: Admin Dashboard
- [ ] Create read-only Google Apps Script endpoint
- [ ] Build simple admin interface
- [ ] Add application status management

## 🔧 Troubleshooting

### Common Issues:
1. **CORS Error**: Make sure Google Apps Script is deployed as Web app
2. **Permission Error**: Check "Who has access" is set to "Anyone"
3. **Data Not Appearing**: Verify column order matches script
4. **Form Not Submitting**: Check browser console for errors

### Testing Commands:
```bash
# Test API endpoint
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

## 📊 Benefits of Google Sheets Integration

1. **Easy Data Management**: View applications in familiar spreadsheet format
2. **Real-time Updates**: Applications appear instantly in the sheet
3. **No Database Setup**: No need for complex database management
4. **Export Capabilities**: Easy to export data to Excel/CSV
5. **Collaboration**: Multiple people can view/manage applications
6. **Cost Effective**: Free for reasonable usage limits
7. **Backup**: Automatic Google Drive backup

## 🔄 Migration from Supabase

### Data Migration (if needed):
- [ ] Export existing applications from Supabase
- [ ] Import to Google Sheets
- [ ] Verify data integrity
- [ ] Update any references to old system

### Code Cleanup:
- [ ] Remove Supabase dependencies
- [ ] Update documentation
- [ ] Test all functionality 