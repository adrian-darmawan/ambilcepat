/**
 * getStatusColor
 * A helper function to return Tailwind CSS classes based on service status.
 * @param {string} status - The status of the service.
 * @returns {string} - A string of Tailwind CSS classes.
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-800';
    case 'Sedang Diproses':
      return 'bg-cyan-100 text-cyan-800';
    case 'Menunggu Sparepart':
      return 'bg-orange-100 text-orange-800';
    case 'Telah Diambil':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};


/**
 * Components
 *
 * An object that holds all UI component functions. Each function returns an
 * HTML string that can be rendered into the DOM.
 */
const Components = {
  /**
   * Renders the main header for a view.
   * @param {string} title - The title to display in the header.
   * @param {boolean} showBack - If true, shows a back button.
   */
  Header: (title, showBack = false) => {
    // The onclick for the back button will be handled by the router in app.js
    const backButton = showBack
      ? `<button class="p-2 -ml-2" onclick="App.router.back()">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
           </svg>
         </button>`
      : `<div class="w-6"></div>`; // Placeholder for alignment

    return `
      <header class="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div class="container mx-auto flex items-center justify-between px-4 py-3">
          ${backButton}
          <h1 class="text-lg font-semibold text-gray-900">${title}</h1>
          <button class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </header>
    `;
  },

  /**
   * Renders the visual timeline for a service's progress.
   * @param {Array<object>} timeline - The timeline array from a service object.
   */
  TimelineComponent: (timeline) => {
    return `
      <div class="flow-root">
        <ul class="-mb-8">
          ${timeline.map((step, index) => `
            <li>
              <div class="relative pb-8">
                ${index !== timeline.length - 1 ? '<span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>' : ''}
                <div class="relative flex items-start space-x-3">
                  <div>
                    <div class="h-8 w-8 rounded-full ${step.completed ? 'bg-cyan-500' : 'bg-gray-300'} flex items-center justify-center ring-8 ring-white">
                      ${step.completed ?
                        `<svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                           <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                         </svg>` :
                        `<span class="h-2 w-2 bg-white rounded-full"></span>`
                      }
                    </div>
                  </div>
                  <div class="min-w-0 flex-1 pt-1.5">
                    <p class="text-sm ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}">${step.text}</p>
                    ${step.timestamp ? `<p class="text-xs text-gray-400 mt-1">${new Date(step.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>` : ''}
                  </div>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  },

  /**
   * Renders a single service card.
   * @param {object} service - The service data object.
   */
  ServiceCard: (service) => {
    // Placeholder for the item's image/icon
    const itemIcon = `<div class="w-12 h-12 bg-gray-900 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                     </div>`;

    return `
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
           onclick="App.router.navigate('detail', '${service.id}')">
        <div class="flex items-start space-x-3">
          ${itemIcon}
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-gray-900 truncate">${service.itemName}</h3>
            <p class="text-sm text-gray-500">Estimasi: ${service.estimatedFinish}</p>
            <div class="flex items-center mt-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}">
                ${service.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // --- AUTHENTICATION COMPONENTS ---

  SplashScreen: () => `
    <div class="h-screen w-screen flex flex-col items-center justify-center bg-cyan-500 text-white">
      <svg class="w-24 h-24 mb-4 animate-pulse" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
      </svg>
      <h1 class="text-4xl font-bold">AmbilCepat</h1>
      <p class="mt-2">Lacak servis Anda dengan mudah.</p>
    </div>
  `,

  WelcomeScreen: () => `
    <div class="h-screen w-screen flex flex-col items-center justify-center p-8 text-center bg-white">
      <div class="flex-grow flex items-center justify-center">
        <div>
          <!-- Placeholder for illustration -->
          <div class="w-64 h-64 bg-gray-200 rounded-full mx-auto mb-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Selamat Datang di AmbilCepat</h1>
          <p class="text-gray-600 mt-2">Solusi modern untuk melacak status servis perangkat Anda. Cepat, transparan, dan mudah.</p>
        </div>
      </div>
      <div class="w-full">
        <button onclick="App.router.navigate('phone-input')" class="w-full bg-cyan-500 text-white py-4 rounded-xl font-medium hover:bg-cyan-600 transition-colors">Masuk dengan Nomor Telepon</button>
        <button onclick="App.router.navigate('dashboard')" class="w-full text-gray-600 py-3 mt-2 rounded-xl font-medium">Lacak Tanpa Masuk</button>
      </div>
    </div>
  `,

  PhoneInputScreen: () => `
    <div class="h-screen w-screen flex flex-col p-8 bg-white">
      <button class="self-start p-2 -ml-2" onclick="App.router.navigate('welcome')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div class="flex-grow flex flex-col justify-center">
        <h1 class="text-2xl font-bold text-gray-900">Masukkan Nomor Telepon</h1>
        <p class="text-gray-600 mt-2 mb-8">Kami akan mengirimkan kode verifikasi (OTP) ke nomor Anda.</p>
        <div class="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
          <span class="text-gray-600 font-medium pr-3 border-r border-gray-200">+62</span>
          <input type="tel" id="phone-input" class="w-full ml-3 focus:outline-none" placeholder="812 3456 7890">
        </div>
        <button id="send-otp-button" class="w-full bg-cyan-500 text-white py-4 rounded-xl font-medium mt-auto hover:bg-cyan-600 transition-colors">Kirim Kode</button>
      </div>
    </div>
  `,

  OTPScreen: (phoneNumber) => `
    <div class="h-screen w-screen flex flex-col p-8 bg-white">
      <button class="self-start p-2 -ml-2" onclick="App.router.navigate('phone-input')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div class="flex-grow flex flex-col justify-center text-center">
        <h1 class="text-2xl font-bold text-gray-900">Masukkan Kode Verifikasi</h1>
        <p class="text-gray-600 mt-2 mb-8">Kode 4 digit telah dikirimkan ke nomor +62 ${phoneNumber}.</p>
        <div class="flex justify-center space-x-2" id="otp-inputs">
          <input type="text" maxlength="1" class="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
          <input type="text" maxlength="1" class="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
          <input type="text" maxlength="1" class="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
          <input type="text" maxlength="1" class="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
        </div>
        <p class="text-gray-600 mt-6">Tidak menerima kode? <a href="#" class="font-medium text-cyan-600">Kirim ulang</a></p>
      </div>
    </div>
  `,

  ConfirmationModal: (service) => `
    <div id="pickup-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl modal-content-animate">
        <h3 class="text-lg font-semibold text-center mb-2">Konfirmasi Selesai?</h3>
        <p class="text-gray-600 text-center mb-6">
          Perangkat Anda, "${service.itemName.toLowerCase()}", telah selesai.
          Pastikan software sesuai sebelum lanjut.
        </p>
        <div class="flex space-x-3">
          <button onclick="App.closeModal()" class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">Batalkan</button>
          <button onclick="App.confirmPickup()" class="flex-1 bg-cyan-500 text-white py-3 rounded-xl font-medium hover:bg-cyan-600 transition-colors">Ya</button>
        </div>
      </div>
    </div>
  `,
};
