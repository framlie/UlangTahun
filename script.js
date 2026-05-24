// ==========================================================================
// 1. ANIMASI BACKGROUND (BINTANG BERKEDIP & HUJAN HATI)
// ==========================================================================
function initBackgrounds(containerId, starCount) {
  const bg = document.getElementById(containerId);
  if (!bg) return;
  for(let i=0; i<starCount; i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${2 + Math.random() * 3}s;
    `;
    bg.appendChild(s);
  }
}
// Jalankan background bintang untuk hero dan lock screen
initBackgrounds('stars', 120);
initBackgrounds('lockStars', 60);

// Efek Hujan Hati / Simbol Cantik
const heartsRain = document.getElementById('heartsRain');
if (heartsRain) {
  const hSymbols = ['♥', '❤', '💕', '✨', '🌸'];
  for(let i=0; i<30; i++){
    const h = document.createElement('div');
    h.className = 'heart-drop';
    h.textContent = hSymbols[Math.floor(Math.random() * hSymbols.length)];
    const dur = 5 + Math.random() * 10;
    h.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${14 + Math.random() * 16}px;
      animation-duration: ${dur}s;
      animation-delay: ${Math.random() * dur}s;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    heartsRain.appendChild(h);
  }
}

// ==========================================================================
// 2. LOGIKA LOCK SCREEN & COUNTDOWN UTAMA (TARGET: 24 MEI 2026, 12:40)
// ==========================================================================
const targetDate = new Date('2026-06-14T00:00:00');

function checkLockAndCountdown(){
  const now = new Date();
  const diff = targetDate - now;

  // Jika waktu target sudah lewat / tercapai
  if (diff <= 0) {
    const lockScreen = document.getElementById('lockScreen');
    if (lockScreen) {
      lockScreen.style.opacity = '0';
      setTimeout(() => { lockScreen.style.display = 'none'; }, 1000);
    }
    
    // Tampilkan konten utama website
    const mainSite = document.getElementById('mainSite');
    if (mainSite) mainSite.style.display = 'block';

    // Reset teks countdown ke 00
    if (document.getElementById('cd-h')) document.getElementById('cd-h').textContent = '00';
    if (document.getElementById('cd-m')) document.getElementById('cd-m').textContent = '00';
    if (document.getElementById('cd-s')) document.getElementById('cd-s').textContent = '00';
    return true; 
  }

  // Kalkulasi matematika waktu mundur
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

  // Update angka di halaman Lock Screen
  if (document.getElementById('lock-d')) document.getElementById('lock-d').textContent = days;
  if (document.getElementById('lock-h')) document.getElementById('lock-h').textContent = hours;
  if (document.getElementById('lock-m')) document.getElementById('lock-m').textContent = minutes;
  if (document.getElementById('lock-s')) document.getElementById('lock-s').textContent = seconds;

  // Update angka di halaman utama (Hero Section)
  if (document.getElementById('cd-h')) document.getElementById('cd-h').textContent = hours;
  if (document.getElementById('cd-m')) document.getElementById('cd-m').textContent = minutes;
  if (document.getElementById('cd-s')) document.getElementById('cd-s').textContent = seconds;

  return false; 
}

// Jalankan timer setiap satu detik
const timerInterval = setInterval(() => {
  const isUnlocked = checkLockAndCountdown();
  if (isUnlocked) clearInterval(timerInterval);
}, 1000);
checkLockAndCountdown();

// ==========================================================================
// 3. FITUR AUDIO PLAYER UI & AUTOMATIC NEXT TRACK (PERBAIKAN FITUR AUTOMATIC)
// ==========================================================================
const audio = document.getElementById('bgAudio');
const musicBtn = document.getElementById('musicBtn');
const musicSelect = document.getElementById('musicSelect');

if (audio && musicBtn && musicSelect) {
  audio.src = musicSelect.value;

  // Fungsi khusus untuk memutar musik + memaksa kecepatan uji coba (jika dipakai)
  function jalankanAudio() {
    // UBAH ANGKA 1 MENJADI 8 ATAU 16 JIKA INGIN DIUJI COBA SECARA CEPAT
    audio.playbackRate = 1; 
    
    audio.play()
      .then(() => { 
        musicBtn.textContent = '⏸'; 
      })
      .catch(err => {
        console.log("Browser memblokir autoplay otomatis sebelum ada interaksi:", err);
        musicBtn.textContent = '▶';
      });
  }

  function togglePlay() {
    if (audio.paused) {
      jalankanAudio();
    } else {
      audio.pause();
      musicBtn.textContent = '▶';
    }
  }

  musicBtn.addEventListener('click', togglePlay);
  
  // Saat user mengubah lagu secara manual lewat dropdown menu
  musicSelect.addEventListener('change', function() {
    audio.src = this.value;
    // Langsung putar otomatis tanpa peduli status sebelumnya paused atau tidak
    jalankanAudio(); 
  });

  // LOGIKA UTAMA: Otomatis pindah lagu saat lagu selesai
  audio.addEventListener('ended', function() {
    const options = musicSelect.options;
    let currentIndex = musicSelect.selectedIndex;
    
    // Cari urutan index lagu berikutnya
    let nextIndex = (currentIndex + 1) % options.length;
    
    // Geser pilihan di layar visual select
    musicSelect.selectedIndex = nextIndex;
    
    // Ganti file sumber audio ke lagu yang baru
    audio.src = musicSelect.value;
    
    // Berikan jeda sangat singkat (100 milidetik) agar browser sempat memuat file baru sebelum di-play
    setTimeout(() => {
      jalankanAudio();
    }, 100);
  });
}

// ==========================================================================
// 4. GENERATE OTOMATIS DATA GRID: 21 ALASAN
// ==========================================================================
const reasons = [
  'Senyummu yang bisa langsung memperbaiki hariku yang paling buruk sekalipun',
  'Cara kamu tertawa — tulus, lepas, dan membuatku ikut bahagia',
  'Kekuatanmu yang tersembunyi di balik penampilanmu yang lembut',
  'Kejujuranmu dalam bercerita — aku selalu merasa aman bersamamu',
  'Kepedulianmu pada orang-orang di sekitarmu yang kamu cintai',
  'Cara kamu melihat dunia dengan sudut pandang yang selalu membuatku kagum',
  'Semangatmu yang tidak pernah padam meski keadaan sedang sulit',
  'Ketulusanmu — tidak ada yang dibuat-buat, semua dari hati',
  'Cara kamu perhatian pada hal-hal kecil yang orang lain sering lewatkan',
  'Suaramu yang bisa membuat hatiku tenang seketika',
  'Keberanianmu untuk terus bermimpi besar',
  'Cara kamu bisa membuat suasana menjadi hangat hanya dengan kehadiranmu',
  'Kesabaran dan kelembutanmu yang membuatku ingin jadi seseorang yang lebih baik',
  'Kamu tidak pernah takut untuk jadi dirimu sendiri — itu sangat langka',
  'Cara kamu membuatku selalu merasa dihargai dan disayangi',
  'Antusiasmu saat bercerita tentang hal yang kamu sukai',
  'Kehangatan hatimu yang terasa bahkan lewat kata-kata sederhana',
  'Cara kamu membuatku merasa diterima sepenuhnya',
  'Keunikanmu — tidak ada yang seperti kamu di dunia ini',
  'Kehadiranmu yang sudah mengubah hidupku menjadi lebih berwarna',
  'Dan yang paling penting: kamu adalah kamu — dan itu lebih dari cukup'
];

const grid = document.getElementById('reasonsGrid');
if (grid) {
  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `
      <div class="reason-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="reason-text">${r}</div>
    `;
    grid.appendChild(card);
  });
}

// ==========================================================================
// 5. ENGINE KEMBANG API GLOBAL (FIXED LAYER CANVAS)
// ==========================================================================
const canvas = document.getElementById('globalFwCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#ff8fb0', '#c084fc', '#ffcce0', '#ff6b9d', '#e9c2ff', '#ffffc2'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function spawnBurst(x, y) {
  for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 5;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 1.5 + Math.random() * 2.5
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.06; 
    p.life -= 0.015; 
    
    if (p.life <= 0) {
      particles.splice(idx, 1);
      return;
    }
    
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

// Event Tombol Kembang Api
const fwBtn = document.getElementById('fwBtn');
if (fwBtn) {
  fwBtn.addEventListener('click', function() {
    this.textContent = '💥 Boom! 🎆';
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;
    
    spawnBurst(midX, midY - 50);
    setTimeout(() => spawnBurst(midX - 120, midY - 120), 150);
    setTimeout(() => spawnBurst(midX + 120, midY - 100), 300);
    setTimeout(() => spawnBurst(midX - 60, midY + 40), 450);
    setTimeout(() => spawnBurst(midX + 60, midY + 30), 600);

    setTimeout(() => { this.textContent = 'Ledakkan lagi! 🎆'; }, 3000);
  });
}

// Efek Ledakan Otomatis Saat Scroll ke Paling Bawah
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.id === 'finalSection') {
      const midX = canvas.width / 2;
      spawnBurst(midX - 100, 200);
      setTimeout(() => spawnBurst(midX + 100, 150), 300);
      setTimeout(() => spawnBurst(midX, 250), 600);
      obs.unobserve(e.target); 
    }
  });
}, { threshold: 0.2 });

const finalSec = document.getElementById('finalSection');
if (finalSec) obs.observe(finalSec);