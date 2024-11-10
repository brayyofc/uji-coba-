// Simpan preferensi tema di localStorage
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Fungsi untuk mengubah tema
function switchTheme() {
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    // Tambahkan efek glowing pada tombol saat diklik
    themeToggle.classList.add("glow");
    setTimeout(() => {
        themeToggle.classList.remove("glow");
    }, 300);

    // Simpan tema yang dipilih di localStorage
    const currentTheme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);

    // Ubah ikon tombol tema berdasarkan tema yang dipilih
    themeToggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";
}

// Event Listener untuk tombol tema
themeToggle.addEventListener("click", switchTheme);

// Atur tema awal berdasarkan localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme + "-theme");
    themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
} else {
    // Default ke mode terang jika belum ada preferensi tersimpan
    body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
}

document.getElementById('contactForm').onsubmit = function(event) {
    event.preventDefault();

    const statusMessage = document.getElementById('statusMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Tampilkan spinner saat mulai mengirim
    loadingSpinner.style.display = 'inline-block';
    statusMessage.textContent = ""; // Kosongkan status pesan

    emailjs.send("service_kqlmrsz", "template_5wkb8sv", formData)
        .then(response => {
            console.log("SUCCESS!", response.status, response.text);
            statusMessage.textContent = "Pesan Anda berhasil dikirim.";
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            console.error("FAILED...", error);
            statusMessage.textContent = "Terjadi kesalahan dalam mengirim pesan.";
        })
        .finally(() => {
            // Sembunyikan spinner setelah pengiriman selesai
            loadingSpinner.style.display = 'none';
        });
};
document.addEventListener("DOMContentLoaded", () => {
    // Terapkan kelas transisi saat halaman pertama kali dimuat
    const mainContent = document.querySelector(".main-content");
    mainContent.classList.add("page-transition");

    // Tambahkan event listener pada tautan navigasi untuk memuat halaman berikutnya dengan transisi
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Mencegah default link behavior

            // Tambahkan kelas transisi keluar
            mainContent.classList.remove("page-transition");

            // Tunggu animasi selesai sebelum pindah halaman
            setTimeout(() => {
                window.location.href = link.href;
            }, 500); // Sesuaikan dengan durasi animasi CSS
        });
    });
});
