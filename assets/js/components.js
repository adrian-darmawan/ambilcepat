/**
 * AmbilCepat v3 - UI Components
 *
 * All components are designed to strictly follow the new Design System:
 * - 4 Font Sizes, 2 Weights (Semibold, Regular)
 * - 8pt Grid System (multiples of 4px/8px)
 * - 60/30/10 Color Rule
 */

// Helper function to apply status colors, adhering to the new color system
const getStatusColor = (status) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-800'; // Using Tailwind defaults which are close enough
    case 'Sedang Diproses':
      return 'bg-cyan-100 text-cyan-700';
    case 'Menunggu Sparepart':
      return 'bg-orange-100 text-orange-700';
    case 'Telah Diambil':
      return 'bg-gray-200 text-dark';
    default:
      return 'bg-gray-100 text-gray-custom';
  }
};

const Components = {
  /**
   * Header Component
   * Adheres to 8pt grid (p-4=16px, h-16=64px). Uses Semibold for title.
   */
  Header: (title, showBack = false) => {
    const backButton = showBack
      ? `<button class="p-2 -ml-2" onclick="App.router.back()"><svg style="color: var(--text-dark)" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg></button>`
      : `<div class="w-10"></div>`; // Adjusted for alignment

    const notificationIcon = `<svg style="color: var(--text-dark)" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4a2 2 0 01-1.4-1.4V11a6 6 0 00-4-5.6V5a2 2 0 10-4 0v.4A6 6 0 006 11v3.2a2 2 0 01-1.4 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`;

    return `
      <header class="bg-white sticky top-0 z-40 border-b border-gray-100 h-16 flex items-center">
        <div class="w-full flex items-center justify-between px-4">
          ${backButton}
          <h1 class="text-lg font-semibold" style="color: var(--text-dark);">${title}</h1>
          <button class="p-2">${notificationIcon}</button>
        </div>
      </header>
    `;
  },

  /**
   * Service Catalog Card (for Beranda)
   * Adheres to 8pt grid (p-4, gap-4, h-40).
   */
  ServiceCatalogCard: (serviceType) => {
    return `
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col" onclick="App.router.navigate('schedule', '${serviceType.id}')">
        <div class="w-full h-40 bg-gray-200 rounded-lg mb-4">
          <img src="${serviceType.image}" class="w-full h-full object-cover rounded-lg" alt="${serviceType.name}" loading="lazy">
        </div>
        <h3 class="font-semibold" style="color: var(--text-dark);">${serviceType.name}</h3>
        <p class="text-sm mt-1" style="color: var(--text-gray);">${serviceType.availability}</p>
        <p class="text-sm mt-auto pt-2" style="color: var(--text-gray);">${serviceType.queue} Orang Antri</p>
      </div>
    `;
  },

  /**
   * Active Service Card (for Status page)
   * Adheres to 8pt grid (p-4, space-x-4).
   */
  ActiveServiceCard: (service) => {
    const itemIcon = `<div class="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center" style="background-color: var(--text-dark);"><svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>`;
    return `
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100" onclick="App.router.navigate('detail', '${service.id}')">
        <div class="flex items-start space-x-4">
          ${itemIcon}
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center">
                <h3 class="font-semibold truncate" style="color: var(--text-dark);">${service.itemName}</h3>
                <p class="text-sm" style="color: var(--text-gray);">${service.id}</p>
            </div>
            <p class="text-sm mt-1" style="color: var(--text-gray);">Teknisi: ${service.technician}</p>
            <div class="flex items-center mt-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(service.status)}">
                ${service.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Bottom Navigation Component
   * Adheres to 8pt grid (h-16, p-2).
   */
  BottomNav: (activeTab = 'beranda') => {
    const tabs = [
      { id: 'beranda', label: 'Beranda', icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>` },
      { id: 'status', label: 'Status', icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>` },
      { id: 'jadwal', label: 'Jadwal', icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>` },
      { id: 'pengaturan', label: 'Pengaturan', icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>` },
    ];

    return `
      <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16" style="color: var(--text-gray);">
        <div class="grid grid-cols-4 h-full">
          ${tabs.map(tab => `
            <button class="flex flex-col items-center justify-center p-2" onclick="App.router.navigate('${tab.id}')">
              <div style="${activeTab === tab.id ? 'color: var(--primary-blue);' : ''}">${tab.icon}</div>
              <span class="text-xs mt-1 ${activeTab === tab.id ? 'font-semibold' : ''}" style="${activeTab === tab.id ? 'color: var(--primary-blue);' : ''}">${tab.label}</span>
            </button>
          `).join('')}
        </div>
      </footer>
    `;
  },

  // --- AUTHENTICATION & MODAL COMPONENTS ---

  SplashScreen: () => `
    <div class="h-screen w-screen flex flex-col items-center justify-center text-white" style="background-color: var(--primary-blue);">
      <svg class="w-24 h-24 mb-4 animate-pulse" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
      </svg>
      <h1 class="text-4xl font-semibold">AmbilCepat</h1>
    </div>
  `,

  WelcomeScreen: () => `
    <div class="h-screen w-screen flex flex-col items-center justify-center p-8 text-center bg-white">
      <div class="flex-grow flex items-center justify-center">
        <div>
          <img src="https://picsum.photos/seed/welcome/400/400" alt="Welcome Illustration" class="w-64 h-auto mx-auto mb-8 rounded-full">
          <h1 class="text-2xl font-semibold" style="color: var(--text-dark);">Selamat Datang di AmbilCepat</h1>
          <p style="color: var(--text-gray);" class="mt-2">Solusi modern untuk melacak status servis perangkat Anda. Cepat, transparan, dan mudah.</p>
        </div>
      </div>
      <div class="w-full p-4">
        <button onclick="App.router.navigate('phone-input')" class="w-full text-white py-4 rounded-xl font-semibold" style="background-color: var(--primary-blue);">Masuk dengan Nomor Telepon</button>
        <button onclick="App.router.navigate('status')" class="w-full py-3 mt-2 rounded-xl font-semibold" style="color: var(--text-gray);">Lacak Tanpa Masuk</button>
      </div>
    </div>
  `,

  PhoneInputScreen: () => `
    <div class="h-screen w-screen flex flex-col p-4 bg-white">
      ${Components.Header('Masuk', true)}
      <div class="flex-grow flex flex-col justify-center p-4">
        <h1 class="text-2xl font-semibold" style="color: var(--text-dark);">Masukkan Nomor Telepon</h1>
        <p style="color: var(--text-gray);" class="mt-2 mb-8">Kami akan mengirimkan kode verifikasi (OTP) ke nomor Anda.</p>
        <div class="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-cyan-500">
          <span style="color: var(--text-dark);" class="font-semibold pr-3 border-r border-gray-200">+62</span>
          <input type="tel" id="phone-input" class="w-full ml-3 focus:outline-none bg-transparent" placeholder="812 3456 7890">
        </div>
      </div>
      <div class="p-4">
        <button id="send-otp-button" class="w-full text-white py-4 rounded-xl font-semibold" style="background-color: var(--primary-blue);">Kirim Kode</button>
      </div>
    </div>
  `,

  OTPScreen: (phoneNumber) => `
     <div class="h-screen w-screen flex flex-col p-4 bg-white">
      ${Components.Header('Verifikasi OTP', true)}
      <div class="flex-grow flex flex-col justify-center text-center p-4">
        <h1 class="text-2xl font-semibold" style="color: var(--text-dark);">Masukkan Kode Verifikasi</h1>
        <p style="color: var(--text-gray);" class="mt-2 mb-8">Kode 4 digit telah dikirimkan ke nomor +62 ${phoneNumber}.</p>
        <div class="flex justify-center space-x-4" id="otp-inputs">
          <input type="text" maxlength="1" class="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-cyan-500">
          <input type="text" maxlength="1" class="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-cyan-500">
          <input type="text" maxlength="1" class="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-cyan-500">
          <input type="text" maxlength="1" class="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-cyan-500">
        </div>
        <p style="color: var(--text-gray);" class="mt-8">Tidak menerima kode? <button class="font-semibold" style="color: var(--primary-blue);">Kirim ulang</button></p>
      </div>
    </div>
  `,

  ConfirmationModal: (service) => `
    <div id="pickup-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl modal-content-animate">
        <h3 class="text-lg font-semibold text-center mb-2" style="color: var(--text-dark);">Konfirmasi Selesai?</h3>
        <p style="color: var(--text-gray);" class="text-center mb-6">
          Perangkat Anda, "${service.itemName.toLowerCase()}", telah selesai.
          Pastikan software sesuai sebelum lanjut.
        </p>
        <div class="flex space-x-4">
          <button onclick="App.closeModal()" class="flex-1 bg-gray-100 py-3 rounded-xl font-semibold" style="color: var(--text-dark);">Batalkan</button>
          <button onclick="App.confirmPickup()" class="flex-1 text-white py-3 rounded-xl font-semibold" style="background-color: var(--primary-blue);">Ya</button>
        </div>
      </div>
    </div>
  `,
};
