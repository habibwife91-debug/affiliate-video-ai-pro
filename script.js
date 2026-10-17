Fail 4 Lengkap: script.js (Sistem Automasi Klik & Tema Interaktif Penuh)

// ==========================================================================
// 1. KONTROL INTERAKTIF PERTUKARAN TAB UTAMA
// ==========================================================================
function switchTab(tabName) {
    document.getElementById('tab-dashboard-content').classList.add('hidden');
    document.getElementById('tab-billing-content').classList.add('hidden');
    document.getElementById('tab-settings-content').classList.add('hidden');

    const navButtons = ['dashboard', 'billing', 'settings'];
    navButtons.forEach(btn => {
        document.getElementById(`nav-${btn}`).className = "w-full flex items-center space-x-3 text-gray-400 hover:bg-white/5 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition";
    });

    document.getElementById(`tab-${tabName}-content`).classList.remove('hidden');
    document.getElementById(`nav-${tabName}`).className = "w-full flex items-center space-x-3 bg-[#d4af37]/10 text-white px-4 py-2.5 rounded-lg text-sm font-medium border-l-4 border-[#d4af37]";
}

// ==========================================================================
// 2. KONTROL PERTUKARAN DENSITY GRID VIDEO (4 LAJUR / 6 LAJUR)
// ==========================================================================
function changeGridDensity(density) {
    const grid = document.getElementById('videoGrid');
    const btnComfort = document.getElementById('btn-grid-comfortable');
    const btnCompact = document.getElementById('btn-grid-compact');

    if(density === 'compact') {
        grid.className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3";
        btnCompact.className = "bg-[#d4af37] text-black text-xs font-bold px-4 py-2 rounded transition shadow";
        btnComfort.className = "bg-[#0f0e0c] border border-gray-700 text-gray-400 text-xs font-bold px-4 py-2 rounded transition hover:text-white";
    } else {
        grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4";
        btnComfort.className = "bg-[#d4af37] text-black text-xs font-bold px-4 py-2 rounded transition shadow";
        btnCompact.className = "bg-[#0f0e0c] border border-gray-700 text-gray-400 text-xs font-bold px-4 py-2 rounded transition hover:text-white";
    }
}

// ==========================================================================
// 3. KONTROL SIMULASI PERTUKARAN TEMA WARNA VISUAL
// ==========================================================================
function changeThemeSkin(theme) {
    const mainBody = document.body;
    if(theme === 'cyber') {
        alert("Tema Sistem Berjaya Ditukar Ke: Cyberpunk Neon Blue!");
        mainBody.style.backgroundColor = "#020813";
    } else if(theme === 'minimal') {
        alert("Tema Sistem Berjaya Ditukar Ke: Minimalist Stark White!");
        mainBody.style.backgroundColor = "#121212";
    } else {
        alert("Tema Sistem Berjaya Ditukar Ke: Dark Gold Aesthetic (Asal)!");
        mainBody.style.backgroundColor = "#0f0e0c";
    }
}

// ==========================================================================
// 4. PENGURUSAN MUAT NAIK IMED & SIMULASI PIPELINE ENJIN GPU
// ==========================================================================
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const generateBtn = document.getElementById('generateBtn');
const processingModal = document.getElementById('processingModal');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const outputSection = document.getElementById('outputSection');
const videoGrid = document.getElementById('videoGrid');

let uploadedFilesCount = 0;
let userTotalVideosGenerated = 0;

document.querySelectorAll('#timeSelector button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('#timeSelector button').forEach(b => { b.className = "bg-[#0f0e0c] border border-gray-700 text-gray-400 text-xs py-1.5 rounded"; });
        this.className = "bg-[#0f0e0c] border border-[#d4af37] text-[#d4af37] text-xs py-1.5 rounded font-bold";
    });
});

if(dropZone) {
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFiles);
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('border-[#d4af37]'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('border-[#d4af37]'));
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('border-[#d4af37]'); handleFiles({ target: { files: e.dataTransfer.files } }); });
}

function handleFiles(e) {
    const files = Array.from(e.target.files).slice(0, 3);
    uploadedFilesCount = files.length;
    if (uploadedFilesCount > 0) {
        previewContainer.innerHTML = '';
        previewContainer.classList.remove('hidden');
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const div = document.createElement('div');
                div.className = "bg-black/40 border border-white/5 rounded-lg p-2 text-center relative";
                div.innerHTML = `<img src="${event.target.result}" class="h-20 w-full object-cover rounded mb-1"><p class="text-[9px] text-gray-500 truncate">${file.name}</p><span class="absolute top-1 right-1 bg-green-500 text-black text-[8px] font-bold px-1 rounded">SIAP</span>`;
                previewContainer.appendChild(div);
            }
            reader.readAsDataURL(file);
        });
        generateBtn.disabled = false;
        generateBtn.className = "w-full bg-gradient-to-r from-[#b38f2d] to-[#d4af37] text-black font-bold py-3 rounded-lg text-sm mt-6 shadow-lg shadow-[#d4af37]/10 cursor-pointer transition";
    }
}

if(generateBtn) {
    generateBtn.addEventListener('click', () => {
        processingModal.classList.remove('hidden');
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 2;
            progressBar.style.width = currentProgress + '%';
            progressPercent.innerText = currentProgress + '%';
            if(currentProgress >= 20) updateLayerStatus('layer1', 'Sukses');
            if(currentProgress >= 25 && currentProgress < 45) updateLayerStatus('layer2', 'Memproses');
            if(currentProgress >= 45) updateLayerStatus('layer2', 'Sukses');
            if(currentProgress >= 50 && currentProgress < 70) updateLayerStatus('layer3', 'Memproses');
            if(currentProgress >= 70) updateLayerStatus('layer3', 'Sukses');
            if(currentProgress >= 75 && currentProgress < 90) updateLayerStatus('layer4', 'Memproses');
            if(currentProgress >= 90) updateLayerStatus('layer4', 'Sukses');
            if(currentProgress >= 92 && currentProgress < 100) updateLayerStatus('layer5', 'Memproses');
            if (currentProgress >= 100) {
                clearInterval(interval);
                updateLayerStatus('layer5', 'Sukses');
                setTimeout(() => { processingModal.classList.add('hidden'); render8VideoVariations(); updateDashboardStatistics(); }, 500);
            }
        }, 40);
    });
}

function updateLayerStatus(id, text) {
    const el = document.getElementById(id);
    if(el) {
        el.querySelector('.status-label').innerText = text;
        if(text === 'Memproses') el.className = "flex items-center justify-between text-yellow-400 font-bold";
        else if(text === 'Sukses') el.className = "flex items-center justify-between text-green-400";
    }
}

function render8VideoVariations() {
    outputSection.classList.remove('hidden');
    videoGrid.innerHTML = '';
    const strategies = [
        { v: 'V1', name: 'Dynamic Hook', style: 'Impak visual 3 saat pertama' },
        { v: 'V2', name: 'UGC Social Style', style: 'Gaya reviu influencer kasual' },
        { v: 'V3', name: 'Customer Testimonial', style: 'Bukti kepuasan tulen' },
        { v: 'V4', name: 'Side Comparison', style: 'Analisis kelebihan produk' },
        { v: 'V5', name: 'Storytelling Trend', style: 'Penceritaan emosi mendalam' },
        { v: 'V6', name: 'Flash Promo Sale', style: 'Tawaran promosi terhad agresif' },
        { v: 'V7', name: 'Tech Key Features', style: 'Perincian spesifikasi fizikal' },
        { v: 'V8', name: 'High Conversion', style: 'Seruan tindakan jualan padu' }
    ];
    strategies.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between group hover:border-[#d4af37]/30 transition";
        card.innerHTML = `
            <div>
                <div class="bg-[#1e1b18] aspect-video w-full rounded-lg mb-3 flex items-center justify-center border border-white/5 relative overflow-hidden">
                    <i class="fa-solid fa-circle-play text-gray-600 group-hover:text-[#d4af37] text-3xl transition"></i>
                    <span class="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-1 rounded font-mono">10s</span>
                    <span class="absolute top-2 left-2 bg-[#d4af37]/15 text-[#d4af37] text-[9px] font-bold px-1.5 py-0.2 rounded font-mono">${item.v}</span>
                </div>
                <h4 class="text-xs font-bold text-white tracking-wide">${item.name}</h4>
                <p class="text-[10px] text-gray-500 mt-0.5">${item.style}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-4">
                <button class="bg-[#1e1b18] border border-white/10 text-white text-[10px] py-1.5 rounded">Simpan</button>
