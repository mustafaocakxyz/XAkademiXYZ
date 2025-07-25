// Supabase setup
const SUPABASE_URL = 'https://cllvwwhixeymrbearmai.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbHZ3d2hpeGV5bXJiZWFybWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzkzNjQsImV4cCI6MjA2NjYxNTM2NH0.hb9srGc73pgSAqVPjBI97RTgrkjDujM_PwWYeHCFu2c';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const bookingForm = document.getElementById('booking-form');
const bookingMessage = document.getElementById('booking-message');

// Handle booking form submission
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    bookingMessage.textContent = '';
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!name || !phone) {
        bookingMessage.textContent = 'Lütfen tüm alanları doldurun.';
        return;
    }
    // Insert booking (only name and phone)
    const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{ Name: name, PhoneNumber: phone }]);
    if (bookingError) {
        bookingMessage.textContent = 'Başvuru sırasında hata oluştu.';
        return;
    }
    bookingMessage.textContent = 'Başvurunuz alındı, ödeme sayfasına yönlendiriliyorsunuz...';
    bookingForm.reset();
    setTimeout(() => {
        window.location.href = 'https://www.shopier.com/37227230';
    }, 2500);
}); 