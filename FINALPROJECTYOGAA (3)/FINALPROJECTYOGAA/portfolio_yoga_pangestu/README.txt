PORTOFOLIO YOGA PANGESTU
========================

STRUKTUR FILE
  index.html                 Halaman utama
  pages/profil.html          Halaman Profil
  pages/uiux.html            Halaman UI/UX Design
  pages/game.html            Halaman Game
  pages/pencak-silat.html    Halaman Pencak Silat
  pages/home.html            Halaman Home (kartu ke-5)
  css/style.css              Semua desain (sudah diberi daftar isi di bagian atas)
  js/config.js               PENGATURAN: link media sosial
  js/main.js                 Skrip bersama (gambar opsional, tahun footer)
  js/home.js                 Skrip beranda (carousel kartu & link sosial)
  images/                    Semua foto

CARA MENJALANKAN
  1. Ekstrak file ZIP.
  2. Klik dua kali index.html.
  3. Untuk GitHub Pages, unggah semua file dan folder dengan struktur yang sama.


FOTO BACKGROUND FULL 1 WEB (BARU)
=================================
Foto background menutupi seluruh layar dan tetap diam di belakang saat halaman
di-scroll. Semua elemen (tulisan, kartu, tombol, foto Yoga) tetap tampil di depannya.

Letakkan di folder images/ :

  background-web.jpg      Dipakai di SEMUA halaman (cukup satu file ini saja).

FOTO LIVE (VIDEO): images/background-live.mp4 diputar otomatis di belakang halaman utama (index.html),
images/background-web.jpg dipakai sebagai gambar cadangan. Ganti file video untuk mengubahnya.

Jika ingin foto berbeda untuk tiap halaman (opsional, menimpa background-web.jpg):

  background-utama.jpg    Beranda
  background-profil.jpg   Halaman Profil
  background-uiux.jpg     Halaman UI/UX
  background-game.jpg     Halaman Game
  background-silat.jpg    Halaman Pencak Silat
  background-home.jpg     Halaman Home

Tips:
  - Ukuran disarankan landscape 1920x1080 atau lebih, JPG, di bawah 500 KB agar cepat dimuat.
  - Foto otomatis dipotong (cover) mengikuti layar HP maupun komputer.
  - Foto tampil apa adanya (tanpa lapisan putih). Hanya ada kegelapan tipis agar tulisan
    putih terbaca. Atur --overlay di css/style.css (bagian :root): 0 = foto asli,
    .22 = bawaan, .45 = lebih gelap.
  - Jika belum ada foto, halaman tetap tampil dengan warna abu-abu seperti semula.


GAMBAR LAINNYA (opsional)
=========================
Beranda
  foto-yoga.png      Foto Yoga di antara tulisan PORT dan FOLIO (PNG transparan, sudah terpasang)
  profil.jpg         Gambar kartu Profil
  uiux.jpg           Gambar kartu UI/UX
  game.jpg           Gambar kartu Game
  pencak-silat.jpg   Gambar kartu Pencak Silat

Halaman detail
  Profil        : profil-besar.jpg, aktivitas.jpg
  UI/UX         : uiux-proyek-1.jpg, uiux-proyek-2.jpg, uiux-proyek-3.jpg
  Game          : game-1.jpg, game-2.jpg, game-3.jpg
  Pencak Silat  : silat-latihan.jpg, silat-kegiatan.jpg, silat-prestasi.jpg
  Home          : HEROYOGA.jpg, YogaHero.jpg, KELUARGA.jpeg (sudah ada di folder images)

Nama file harus persis sama (huruf kecil, format .jpg / .png sesuai daftar).


CARA MENGGANTI LINK MEDIA SOSIAL
================================
  1. Buka js/config.js dengan VS Code atau Notepad.
  2. Ganti alamat contoh di SOCIAL_URLS dengan link akunmu.
     WhatsApp: pakai kode negara 62 dan hilangkan angka 0 di depan nomor.
  3. Simpan lalu refresh website.


CARA MENGUBAH ISI
=================
  - Nama dan link kartu: index.html
  - Teks tiap halaman: file di folder pages/
  - Warna & ukuran: css/style.css (variabel warna ada di bagian :root)
  - Font Google membutuhkan internet; jika offline, font cadangan dipakai.


TEMA TIAP HALAMAN
=================
  Profil        : oranye hangat
  UI/UX         : kanvas desain ungu + hijau lemon
  Game          : HUD neon gelap (angka statistik: ubah --v di pages/game.html)
  Pencak Silat  : merah, emas, hitam tegas
  Home          : hijau zamrud segar
  Warna tiap tema ada di css/style.css bagian 8 (variabel --sp-*).
