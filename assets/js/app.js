/**
 * App.js
 *
 * The main entry point and orchestrator for the AmbilCepat application.
 * It handles initialization, routing, and state management.
 */

const App = {
  // --- APPLICATION STATE ---
  state: {
    currentPage: 'splash',
    history: ['splash'],
    phoneNumber: null,
    currentOTP: null,
    activeServiceId: null,
    isModalOpen: false,
  },

  // --- INITIALIZATION ---
  init: () => {
    console.log("AmbilCepat App Initialized");
    App.router.render();
    setTimeout(() => {
      if (App.state.currentPage === 'splash') {
        App.router.navigate('welcome');
      }
    }, 2500);
  },

  // --- MODAL LOGIC ---
  openModal: () => {
      App.state.isModalOpen = true;
      App.router.render(App.state.activeServiceId);
  },
  closeModal: () => {
      App.state.isModalOpen = false;
      App.router.render(App.state.activeServiceId);
  },
  confirmPickup: () => {
      ServiceData.updateServiceStatus(App.state.activeServiceId, 'Telah Diambil');
      App.closeModal();
  },

  // --- VIEWS ---
  Views: {
    splash: () => Components.SplashScreen(),
    welcome: () => Components.WelcomeScreen(),
    'phone-input': () => Components.PhoneInputScreen(),
    otp: () => Components.OTPScreen(App.state.phoneNumber),
    dashboard: () => {
        const services = ServiceData.getAllServices();
        return `
            <div class="min-h-screen bg-gray-50">
                ${Components.Header('Beranda')}
                <main class="p-4 space-y-4 pb-20">
                    <div class="relative">
                        <input id="search-input" type="text" placeholder="Cari layanan atau ID servis..." class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow shadow-sm">
                        <svg class="absolute left-3 top-3.5 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900 mb-3">Layanan Aktif</h2>
                        <div id="service-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${services.map(service => Components.ServiceCard(service)).join('')}
                        </div>
                    </div>
                </main>
                <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 text-center text-sm text-gray-500">
                    Bottom Navigation Placeholder
                </footer>
            </div>
        `;
    },
    detail: (serviceId) => {
        const service = ServiceData.getServiceById(serviceId);
        if (!service) {
            return `<div class="p-8 text-center">Layanan tidak ditemukan. <a href="#" onclick="App.router.navigate('dashboard')">Kembali ke dasbor</a>.</div>`;
        }
        const totalCost = service.serviceCost + service.pickupFee;
        return `
            <div id="detail-view-container" class="${App.state.isModalOpen ? 'filter blur-sm' : ''}">
                <div class="min-h-screen bg-gray-50">
                    ${Components.Header('Detail Service', true)}
                    <main class="lg:grid lg:grid-cols-3 lg:gap-8 lg:p-8 pb-24">
                        <div class="lg:col-span-2 space-y-4">
                            <div class="bg-white p-6 text-center shadow-sm lg:rounded-xl">
                                <h1 class="text-2xl font-bold text-gray-900 mb-2">${service.status}</h1>
                                <div class="flex items-center justify-center space-x-3">
                                    <img src="https://i.pravatar.cc/150?u=${service.technician}" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow">
                                    <div class="text-left">
                                        <p class="font-medium text-gray-900">${service.technician}</p>
                                        <p class="text-sm text-gray-500">Teknisi</p>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 lg:p-0">
                                <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <h3 class="font-medium text-gray-900 mb-4">Progress Timeline</h3>
                                    ${Components.TimelineComponent(service.timeline)}
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-1 p-4 lg:p-0 space-y-4">
                            <div class="bg-white rounded-xl p-4 space-y-4 shadow-sm border border-gray-100">
                                <div class="flex items-center space-x-3">
                                    <div class="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 class="font-medium text-gray-900">${service.itemName}</h3>
                                        <p class="text-sm text-gray-500">ID: ${service.id}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
                                    <div><p class="text-gray-500">Tanggal Masuk</p><p class="font-medium">${service.dateReceived}</p></div>
                                    <div><p class="text-gray-500">Estimasi Selesai</p><p class="font-medium">${service.estimatedFinish}</p></div>
                                    <div><p class="text-gray-500">Nomer Antri</p><p class="font-medium font-mono">${service.queueNumber}</p></div>
                                    <div><p class="text-gray-500">Biaya Servis</p><p class="font-medium">Rp${service.serviceCost.toLocaleString('id-ID')}</p></div>
                                </div>
                                <div class="border-t pt-4 text-right">
                                    <p class="text-gray-500 text-sm">Total Bayar</p>
                                    <p class="text-xl font-bold text-gray-900">Rp${totalCost.toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                             <div class="hidden lg:block">
                                <button id="pickup-button" class="w-full bg-cyan-500 text-white py-3 rounded-xl font-medium hover:bg-cyan-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed" ${service.status !== 'Selesai' ? 'disabled' : ''}>
                                    ${service.status === 'Selesai' ? 'Ambil Sekarang' : (service.status === 'Telah Diambil' ? 'Telah Diambil' : 'Belum Selesai')}
                                </button>
                            </div>
                        </div>
                    </main>
                    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 border-t lg:hidden">
                        <button id="pickup-button-mobile" class="w-full bg-cyan-500 text-white py-3 rounded-xl font-medium hover:bg-cyan-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed" ${service.status !== 'Selesai' ? 'disabled' : ''}>
                            ${service.status === 'Selesai' ? 'Ambil Sekarang' : (service.status === 'Telah Diambil' ? 'Telah Diambil' : 'Belum Selesai')}
                        </button>
                    </div>
                </div>
            </div>
            ${App.state.isModalOpen ? Components.ConfirmationModal(service) : ''}
        `;
    },
  },

  // --- ROUTER & EVENT LISTENERS ---
  router: {
    navigate: (view, data = null) => {
      App.state.currentPage = view;
      if (view === 'detail') {
          App.state.activeServiceId = data;
      }
      if (App.state.history[App.state.history.length - 1] !== view) {
        App.state.history.push(view);
      }
      App.router.render(data);
    },
    back: () => {
      if (App.state.history.length > 1) {
        App.state.history.pop();
        const previousView = App.state.history[App.state.history.length - 1];
        App.state.currentPage = previousView;
        if(previousView !== 'detail') {
            App.state.activeServiceId = null;
        }
        App.router.render(App.state.activeServiceId);
      }
    },
    render: (data = null) => {
      const viewFn = App.Views[App.state.currentPage];
      const appContainer = document.getElementById('app');
      if (viewFn) {
        appContainer.innerHTML = viewFn(data);
        App.attachEventListeners();
      } else {
        console.error(`View "${App.state.currentPage}" not found.`);
        appContainer.innerHTML = `<div class="p-8 text-center text-red-500">Error: View not found</div>`;
      }
    },
  },

  attachEventListeners: () => {
    const page = App.state.currentPage;

    if (page === 'phone-input') {
        const sendOtpButton = document.getElementById('send-otp-button');
        const phoneInput = document.getElementById('phone-input');
        sendOtpButton.addEventListener('click', async () => {
            if (App.AuthFlow.validatePhone(phoneInput.value)) {
                sendOtpButton.disabled = true;
                sendOtpButton.textContent = 'Mengirim...';
                await App.AuthFlow.sendOTP(phoneInput.value);
                App.router.navigate('otp');
            } else {
                alert('Nomor telepon tidak valid.');
            }
        });
    } else if (page === 'otp') {
        const inputs = document.querySelectorAll('#otp-inputs input');
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', (e) => {
                if (e.key >= 0 && e.key <= 9) {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                } else if (e.key === 'Backspace') {
                    if (index > 0) {
                        inputs[index - 1].focus();
                    }
                }
                const otp = Array.from(inputs).map(i => i.value).join('');
                if (otp.length === 4) {
                    if (!App.AuthFlow.verifyOTP(otp)) {
                        alert('Kode OTP salah!');
                        inputs.forEach(i => i.value = '');
                        inputs[0].focus();
                    }
                }
            });
        });
    } else if (page === 'dashboard') {
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('keyup', () => {
            const query = searchInput.value;
            const filteredServices = App.TrackingSystem.searchService(query);
            const gridContainer = document.getElementById('service-grid');
            if (gridContainer) {
                if (filteredServices.length > 0) {
                    gridContainer.innerHTML = filteredServices.map(service => Components.ServiceCard(service)).join('');
                } else {
                    gridContainer.innerHTML = `<p class="text-center text-gray-500 py-8">Tidak ada layanan yang cocok dengan pencarian Anda.</p>`;
                }
            }
        });
    } else if (page === 'detail') {
        const pickupButton = document.getElementById('pickup-button');
        if (pickupButton && !pickupButton.disabled) {
            pickupButton.addEventListener('click', App.openModal);
        }
        const pickupButtonMobile = document.getElementById('pickup-button-mobile');
        if (pickupButtonMobile && !pickupButtonMobile.disabled) {
            pickupButtonMobile.addEventListener('click', App.openModal);
        }
    }
  },

  // --- APPLICATION LOGIC ---
  TrackingSystem: {
    searchService: (query) => {
      if (!query) {
        return ServiceData.getAllServices();
      }
      const lowerCaseQuery = query.toLowerCase();
      return ServiceData.getAllServices().filter(service =>
        service.itemName.toLowerCase().includes(lowerCaseQuery) ||
        service.id.toLowerCase().includes(lowerCaseQuery) ||
        service.customerName.toLowerCase().includes(lowerCaseQuery)
      );
    },
  },

  AuthFlow: {
    validatePhone: (phone) => {
      const phoneRegex = /^(\+62|62|0)?[0-9]{9,13}$/;
      return phoneRegex.test(phone);
    },
    sendOTP: (phone) => {
      console.log(`Simulating OTP sending to ${phone}...`);
      return new Promise(resolve => {
        setTimeout(() => {
          const otp = Math.floor(1000 + Math.random() * 9000).toString();
          App.state.currentOTP = otp;
          App.state.phoneNumber = phone;
          console.log(`[DEBUG] OTP for ${phone} is: ${otp}`);
          resolve({ success: true });
        }, 1500);
      });
    },
    verifyOTP: (inputOTP) => {
      const success = inputOTP === App.state.currentOTP;
      if (success) {
          console.log("OTP Verified! Navigating to dashboard.");
          App.router.navigate('dashboard');
      }
      return success;
    },
  },
};

// --- APPLICATION START ---
document.addEventListener('DOMContentLoaded', App.init);
