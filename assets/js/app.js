/**
 * AmbilCepat v3 - App.js
 */

const App = {
  // --- STATE ---
  state: {
    currentPage: 'splash',
    activeTab: 'beranda',
    history: ['beranda'],
    phoneNumber: null,
    currentOTP: null,
    activeServiceId: null,
    isModalOpen: false,
  },

  // --- INITIALIZATION ---
  init: () => {
    console.log("AmbilCepat App Initialized");
    // On initial load, determine the starting page
    // For now, we start with the auth flow. In a real app, you might check for a login token.
    App.router.navigate('splash');

    setTimeout(() => {
      if (App.state.currentPage === 'splash') {
        App.router.navigate('welcome');
      }
    }, 2500);
  },

  // --- MODAL & LOGIC ---
  openModal: () => {
      App.state.isModalOpen = true;
      App.router.render();
  },
  closeModal: () => {
      App.state.isModalOpen = false;
      App.router.render();
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

    beranda: () => {
        const serviceTypes = ServiceData.getAllServiceTypes();
        return `
            <div class="min-h-screen bg-light">
                ${Components.Header('AmbilCepat')}
                <main class="p-4 space-y-4 pb-20">
                    <h2 class="text-lg font-semibold text-dark">Pilih Jenis Layanan</h2>
                    <div class="grid grid-cols-2 gap-4">
                        ${serviceTypes.map(st => Components.ServiceCatalogCard(st)).join('')}
                    </div>
                </main>
                ${Components.BottomNav(App.state.activeTab)}
            </div>
        `;
    },

    status: () => {
        const services = ServiceData.getAllServices();
        return `
            <div class="min-h-screen bg-light">
                ${Components.Header('Status Layanan')}
                <main class="p-4 space-y-4 pb-20">
                    <div class="relative">
                        <input id="search-input" type="text" placeholder="Cari nama atau ID servis..." class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500">
                        <svg class="absolute left-3 top-3.5 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div id="service-grid" class="space-y-3">
                        ${services.map(service => Components.ActiveServiceCard(service)).join('')}
                    </div>
                </main>
                ${Components.BottomNav(App.state.activeTab)}
            </div>
        `;
    },

    jadwal: () => {
        return `
             <div class="min-h-screen bg-light">
                ${Components.Header('Jadwal')}
                <main class="p-4 pb-20">
                    <div class="bg-white p-4 rounded-xl shadow-sm text-center">
                        <p class="font-semibold text-dark">Kalender Interaktif</p>
                        <p class="text-sm text-gray-custom mt-2">(Komponen kalender akan diimplementasikan di sini)</p>
                    </div>
                </main>
                ${Components.BottomNav(App.state.activeTab)}
            </div>
        `;
    },

    pengaturan: () => {
         return `
             <div class="min-h-screen bg-light">
                ${Components.Header('Pengaturan')}
                <main class="p-4 pb-20 text-center">
                     <p class="text-dark">Halaman Pengaturan</p>
                </main>
                ${Components.BottomNav(App.state.activeTab)}
            </div>
        `;
    },

    detail: (serviceId) => {
        const service = ServiceData.getServiceById(serviceId);
        if (!service) {
            return `<div class="p-8 text-center">Layanan tidak ditemukan. <a href="#" onclick="App.router.navigate('status')">Kembali ke daftar</a>.</div>`;
        }
        const totalCost = service.serviceCost + service.pickupFee;
        return `
            <div id="detail-view-container" class="${App.state.isModalOpen ? 'filter blur-sm' : ''}">
                <div class="min-h-screen bg-light">
                    ${Components.Header('Detail Service', true)}
                    <main class="lg:grid lg:grid-cols-3 lg:gap-8 lg:p-8 pb-24">
                        <div class="lg:col-span-2 space-y-4">
                            <div class="bg-white p-6 text-center shadow-sm lg:rounded-xl">
                                <h1 class="text-2xl font-semibold text-dark mb-2">${service.status}</h1>
                                <div class="flex items-center justify-center space-x-4">
                                    <img src="${service.technicianImg}" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow">
                                    <div class="text-left">
                                        <p class="font-semibold text-dark">${service.technician}</p>
                                        <p class="text-sm text-gray-custom">Teknisi</p>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 lg:p-0">
                                <div class="bg-white rounded-xl p-4 shadow-sm">
                                    <h3 class="font-semibold text-dark mb-4">Progress Timeline</h3>
                                    ${Components.TimelineComponent(service.timeline)}
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-1 p-4 lg:p-0 space-y-4">
                            <div class="bg-white rounded-xl p-4 space-y-4 shadow-sm">
                                <div class="flex items-center space-x-4">
                                    <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-dark"><svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                                    <div>
                                        <h3 class="font-semibold text-dark">${service.itemName}</h3>
                                        <p class="text-sm text-gray-custom">ID: ${service.id}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
                                    <div><p class="text-gray-custom">Tanggal Masuk</p><p class="font-semibold text-dark">${service.dateReceived}</p></div>
                                    <div><p class="text-gray-custom">Estimasi Selesai</p><p class="font-semibold text-dark">${service.estimatedFinish}</p></div>
                                    <div><p class="text-gray-custom">Nomer Antri</p><p class="font-semibold text-dark font-mono">${service.queueNumber}</p></div>
                                    <div><p class="text-gray-custom">Biaya Servis</p><p class="font-semibold text-dark">Rp${service.serviceCost.toLocaleString('id-ID')}</p></div>
                                </div>
                                <div class="border-t pt-4 text-right">
                                    <p class="text-sm text-gray-custom">Total Bayar</p>
                                    <p class="text-xl font-semibold text-dark">Rp${totalCost.toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                             <div class="hidden lg:block">
                                <button id="pickup-button" class="w-full text-white py-3 rounded-xl font-semibold" style="background-color: var(--primary-blue); ${service.status !== 'Selesai' ? 'opacity: 0.5; cursor: not-allowed;' : ''}" ${service.status !== 'Selesai' ? 'disabled' : ''}>
                                    ${service.status === 'Selesai' ? 'Ambil Sekarang' : (service.status === 'Telah Diambil' ? 'Telah Diambil' : 'Belum Selesai')}
                                </button>
                            </div>
                        </div>
                    </main>
                    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 border-t lg:hidden">
                        <button id="pickup-button-mobile" class="w-full text-white py-3 rounded-xl font-semibold" style="background-color: var(--primary-blue); ${service.status !== 'Selesai' ? 'opacity: 0.5;' : ''}" ${service.status !== 'Selesai' ? 'disabled' : ''}>
                            ${service.status === 'Selesai' ? 'Ambil Sekarang' : (service.status === 'Telah Diambil' ? 'Telah Diambil' : 'Belum Selesai')}
                        </button>
                    </div>
                </div>
            </div>
            ${App.state.isModalOpen ? Components.ConfirmationModal(service) : ''}
        `;
    },
  },

  router: {
    navigate: (view, data = null) => {
      const mainTabs = ['beranda', 'status', 'jadwal', 'pengaturan'];
      if(mainTabs.includes(view)) {
          App.state.activeTab = view;
      }
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
    } else if (page === 'status') {
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('keyup', () => {
            const query = searchInput.value;
            const filteredServices = App.TrackingSystem.searchService(query);
            const gridContainer = document.getElementById('service-grid');
            if (gridContainer) {
                if (filteredServices.length > 0) {
                    gridContainer.innerHTML = filteredServices.map(service => Components.ActiveServiceCard(service)).join('');
                } else {
                    gridContainer.innerHTML = `<p class="text-center text-gray-custom py-8">Tidak ada layanan yang cocok dengan pencarian Anda.</p>`;
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

  AuthFlow: {
    validatePhone: (phone) => {
      const phoneRegex = /^(\+62|62|0)?[0-9]{9,13}$/;
      return phoneRegex.test(phone);
    },
    sendOTP: (phone) => {
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
          App.router.navigate('beranda');
      }
      return success;
    },
  },

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
};

document.addEventListener('DOMContentLoaded', App.init);
