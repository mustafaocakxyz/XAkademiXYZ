// Supabase setup
const SUPABASE_URL = 'https://cllvwwhixeymrbearmai.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbHZ3d2hpeGV5bXJiZWFybWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzkzNjQsImV4cCI6MjA2NjYxNTM2NH0.hb9srGc73pgSAqVPjBI97RTgrkjDujM_PwWYeHCFu2c';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const slotSelect = document.getElementById('slot');
const bookingForm = document.getElementById('booking-form');
const bookingMessage = document.getElementById('booking-message');

// Fetch available slots from Supabase
async function loadSlots() {
    slotSelect.innerHTML = '<option value="">Uygun bir saat seçin...</option>';
    const { data, error } = await supabase
        .from('slots')
        .select('*')
        .eq('status', 'available')
        .order('dateANDtime', { ascending: true });
    if (error) {
        bookingMessage.textContent = 'Uygun saatler yüklenemedi.';
        return;
    }
    if (data.length === 0) {
        slotSelect.innerHTML = '<option value="">Şu anda uygun saat yok</option>';
        return;
    }
    data.forEach(slot => {
        const dt = new Date(slot.dateANDtime);
        const label = dt.toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });
        const option = document.createElement('option');
        option.value = slot.dateANDtime;
        option.textContent = label;
        slotSelect.appendChild(option);
    });
}

// Handle booking form submission
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    bookingMessage.textContent = '';
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dateTime = slotSelect.value;
    if (!name || !phone || !dateTime) {
        bookingMessage.textContent = 'Lütfen tüm alanları doldurun.';
        return;
    }
    // Insert booking
    const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{ Name: name, PhoneNumber: phone, DateTime: dateTime }]);
    if (bookingError) {
        bookingMessage.textContent = 'Rezervasyon sırasında hata oluştu.';
        return;
    }
    // Update slot status
    const { error: slotError } = await supabase
        .from('slots')
        .update({ status: 'booked' })
        .eq('dateANDtime', dateTime);
    if (slotError) {
        bookingMessage.textContent = 'Slot güncellenemedi, lütfen tekrar deneyin.';
        return;
    }
    bookingMessage.textContent = 'Rezervasyonunuz başarıyla alındı!';
    bookingForm.reset();
    await loadSlots();
});

// Initial load
loadSlots(); 