/**
 * AmbilCepat - Service Tracking Prototype
 * A vanilla JavaScript single-page application for tracking service status.
 */

// =================================================================================
// --- 1. STATE MANAGEMENT ---
// =================================================================================
// A single object to hold the entire application state.
// This acts as the "single source of truth".
const state = {
    activeTab: 'beranda', // Can be 'beranda', 'lacak', or 'detail'
    activeServiceId: null, // Holds the ID of the service being viewed
    isModalOpen: false, // Controls the visibility of the confirmation modal

    // Static data for the services. In a real application, this would come from an API.
    services: {
        "DCM-001": {
            id: "DCM-001",
            itemName: "Instalasi Software",
            status: "Selesai",
            technician: "Andi Wijaya",
            technicianImg: "https://i.pravatar.cc/150?u=andi",
            date: "18 Agu 2024",
            estimatedFinish: "20 Agu 2024",
            cost: 150000,
            pickupFee: 5000,
            timeline: [
                { step: 1, text: "Servis diterima dan diagnosa awal.", completed: true },
                { step: 2, text: "Pengecekan komponen perangkat keras.", completed: true },
                { step: 3, text: "Instalasi sistem operasi dan software.", completed: true },
                { step: 4, text: "Pengujian fungsionalitas dan quality check.", completed: true },
                { step: 5, text: "Perangkat siap diambil.", completed: false },
            ]
        },
        "SRV-002": {
            id: "SRV-002",
            itemName: "Penggantian Layar iPhone 12",
            status: "Sedang Diproses",
            technician: "Budi Santoso",
            technicianImg: "https://i.pravatar.cc/150?u=budi",
            date: "19 Agu 2024",
            estimatedFinish: "21 Agu 2024",
            cost: 2500000,
            pickupFee: 0,
            timeline: [
                { step: 1, text: "Servis diterima dan diagnosa awal.", completed: true },
                { step: 2, text: "Menunggu sparepart layar.", completed: true },
                { step: 3, text: "Proses penggantian layar.", completed: false },
                { step: 4, text: "Pengujian fungsionalitas dan quality check.", completed: false },
                { step: 5, text: "Perangkat siap diambil.", completed: false },
            ]
        }
    }
};

// =================================================================================
// --- 2. DOM SELECTORS ---
// =================================================================================
// Central place for DOM element references.
const app = document.getElementById('app');

// =================================================================================
// --- 3. COMPONENTS ---
// =================================================================================
// Functions that return HTML strings. They are the building blocks of the UI.

/**
 * Renders the main header of the application.
 * Highlights the active tab based on `state.activeTab`.
 */
function Header() {
    const isBerandaActive = state.activeTab === 'beranda';
    const isLacakActive = state.activeTab === 'lacak';

    return `
        <header class="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
            <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="text-2xl font-bold text-gray-900">
                    Ambil<span class="text-blue-600">Cepat</span>
                </div>
                <div class="flex items-center space-x-8">
                    <a href="#" id="beranda-tab" class="text-gray-600 hover:text-blue-600 transition-colors ${isBerandaActive ? 'font-bold text-blue-600' : ''}">Beranda</a>
                    <a href="#" id="lacak-tab" class="text-gray-600 hover:text-blue-600 transition-colors ${isLacakActive ? 'font-bold text-blue-600' : ''}">Lacak Servis</a>
                </div>
            </nav>
        </header>
    `;
}

/**
 * Renders the feature cards section on the home screen.
 */
function FeatureSection() {
    return `
        <section class="bg-white py-20">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div class="feature-card">
                        <div class="p-4 bg-blue-100 rounded-full inline-block">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold mt-4">Cepat</h3>
                        <p class="text-gray-500 mt-2">Dapatkan pembaruan status servis Anda secara real-time tanpa penundaan.</p>
                    </div>
                    <div class="feature-card">
                        <div class="p-4 bg-blue-100 rounded-full inline-block">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold mt-4">Transparan</h3>
                        <p class="text-gray-500 mt-2">Lihat setiap langkah proses perbaikan, dari diagnosa hingga selesai.</p>
                    </div>
                    <div class="feature-card">
                         <div class="p-4 bg-blue-100 rounded-full inline-block">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold mt-4">Elegan</h3>
                        <p class="text-gray-500 mt-2">Antarmuka yang bersih dan modern, dirancang untuk kemudahan penggunaan.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * Renders the entire home screen, including the hero and feature sections.
 */
function HomeScreen() {
    return `
        <main class="main-content">
            <div class="container mx-auto px-6 py-24 text-center">
                <h1 class="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
                    Pelacakan Servis <br> yang <span class="text-blue-600">Cepat & Elegan</span>.
                </h1>
                <p class="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
                    Memberikan pengalaman pelacakan servis yang transparan, menghilangkan ketidakpastian dan membangun kepercayaan.
                </p>
                <div class="mt-10">
                    <a href="#" id="lacak-cta" class="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                        Lacak Servis Anda Sekarang
                    </a>
                </div>
            </div>
            ${FeatureSection()}
        </main>
    `;
}

/**
 * Renders a single service card for the tracking list.
 * @param {object} service - The service object from the state.
 */
function ServiceCard(service) {
    const statusClasses = {
        'Selesai': 'bg-green-100 text-green-800',
        'Sedang Diproses': 'bg-yellow-100 text-yellow-800',
        'Menunggu Sparepart': 'bg-orange-100 text-orange-800',
        'Telah Diambil': 'bg-gray-100 text-gray-800',
    };

    return `
        <div data-id="${service.id}" class="service-card bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div class="flex justify-between items-start">
                <h3 class="font-bold text-lg text-gray-800">${service.itemName}</h3>
                <span class="text-xs font-semibold px-2 py-1 rounded-full ${statusClasses[service.status] || 'bg-gray-100 text-gray-800'}">
                    ${service.status}
                </span>
            </div>
            <p class="text-sm text-gray-500 mt-2">ID Servis: <span class="font-mono text-gray-700">${service.id}</span></p>
            <p class="text-sm text-gray-500">Teknisi: ${service.technician}</p>
        </div>
    `;
}

/**
 * Renders the service tracking screen with a search bar and a grid of service cards.
 */
function StatusScreen() {
    const serviceCards = Object.values(state.services).map(service => ServiceCard(service)).join('');

    return `
        <main class="main-content container mx-auto px-6 py-12">
            <div class="max-w-2xl mx-auto text-center">
                <h1 class="text-4xl font-bold text-gray-900">Lacak Status Servis</h1>
                <p class="mt-4 text-gray-600">Masukkan ID servis Anda untuk melihat progres, atau pilih dari daftar di bawah ini.</p>
            </div>

            <div class="mt-8 max-w-lg mx-auto">
                <div class="flex rounded-lg shadow-sm">
                    <input type="text" id="search-input" placeholder="Contoh: DCM-001" class="flex-1 block w-full px-4 py-3 rounded-l-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500">
                    <button id="search-button" class="bg-blue-600 text-white font-bold px-6 py-3 rounded-r-lg hover:bg-blue-700">Lacak</button>
                </div>
            </div>

            <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${serviceCards}
            </div>
        </main>
    `;
}

/**
 * Renders a single item in the service timeline.
 * @param {object} item - A timeline step object.
 * @param {boolean} isLast - True if the item is the last in the timeline, to omit the connecting line.
 */
function TimelineItem(item, isLast) {
    const itemClass = item.completed ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white';
    const textClass = item.completed ? 'text-gray-800' : 'text-gray-500';
    const lineClass = isLast ? '' : `<div class="absolute left-4 top-5 -ml-px mt-0.5 h-full w-0.5 ${item.completed ? 'bg-blue-600' : 'bg-gray-300'}"></div>`;

    return `
        <li class="relative pb-8">
            ${lineClass}
            <div class="relative flex items-start space-x-3">
                <div>
                    <span class="h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${itemClass}">
                        ${item.completed ? `
                        <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>` : `
                        <span class="h-2 w-2 rounded-full bg-gray-300"></span>
                        `}
                    </span>
                </div>
                <div class="min-w-0 flex-1 pt-1.5">
                    <p class="text-sm ${textClass}">${item.text}</p>
                </div>
            </div>
        </li>
    `;
}

/**
 * Renders the detailed view of a single service, including its timeline and cost.
 */
function StatusDetailScreen() {
    const service = state.services[state.activeServiceId];
    if (!service) {
        state.activeTab = 'lacak';
        render();
        return ''; // Return empty string to avoid rendering issues
    }

    const timelineItems = service.timeline.map((item, index) => TimelineItem(item, index === service.timeline.length - 1)).join('');
    const isFinished = service.status === 'Selesai';
    const isPickedUp = service.status === 'Telah Diambil';

    return `
        <main class="main-content bg-gray-50 py-12">
            <div class="container mx-auto px-6">
                <div class="md:grid md:grid-cols-3 md:gap-12">
                    <!-- Left Column: Service Details & Timeline -->
                    <div class="md:col-span-2">
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <div class="flex justify-between items-center mb-4">
                                <h1 class="text-3xl font-bold text-gray-900">${service.itemName}</h1>
                                <a href="#" id="back-to-list" class="text-blue-600 hover:underline">‹ Kembali ke Daftar</a>
                            </div>
                            <p class="text-gray-500 mb-6">ID Servis: <span class="font-mono">${service.id}</span></p>

                            <h2 class="text-xl font-bold text-gray-800 mb-4">Timeline Progres</h2>
                            <ul>
                                ${timelineItems}
                            </ul>
                        </div>
                    </div>

                    <!-- Right Column: Technician & Cost -->
                    <div class="md:col-span-1 mt-8 md:mt-0">
                        <div class="sticky top-28 bg-white p-6 rounded-lg shadow-md">
                             <div class="flex items-center mb-4">
                                <img class="h-16 w-16 rounded-full object-cover mr-4" src="${service.technicianImg}" alt="Foto ${service.technician}">
                                <div>
                                    <h3 class="text-lg font-bold">${service.technician}</h3>
                                    <p class="text-sm text-gray-500">Teknisi Anda</p>
                                </div>
                            </div>

                            <hr class="my-4">

                            <h3 class="text-lg font-bold mb-2">Rincian Biaya</h3>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between"><span>Perkiraan Biaya Servis</span> <span>Rp ${service.cost.toLocaleString('id-ID')}</span></div>
                                <div class="flex justify-between"><span>Biaya Pengambilan</span> <span>Rp ${service.pickupFee.toLocaleString('id-ID')}</span></div>
                                <div class="flex justify-between font-bold text-base border-t pt-2 mt-2"><span>Total</span> <span>Rp ${(service.cost + service.pickupFee).toLocaleString('id-ID')}</span></div>
                            </div>

                            <button id="pickup-button" class="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed" ${!isFinished || isPickedUp ? 'disabled' : ''}>
                                ${isPickedUp ? 'Telah Diambil' : (isFinished ? 'Ambil Sekarang' : 'Belum Selesai')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
}

/**
 * Renders the confirmation modal for picking up an item.
 * Is only rendered if `state.isModalOpen` is true.
 */
function ConfirmationModal() {
    if (!state.isModalOpen || !state.activeServiceId) return '';

    const service = state.services[state.activeServiceId];

    return `
        <div id="modal-overlay" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div id="modal-content" class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Konfirmasi Pengambilan</h2>
                <p class="text-gray-600 mb-2">Anda akan mengkonfirmasi pengambilan untuk item berikut:</p>
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <p class="font-bold text-lg">${service.itemName}</p>
                    <p class="text-sm text-gray-500">ID: ${service.id}</p>
                </div>
                <p class="text-gray-600 mb-6">Pastikan Anda telah melakukan pembayaran dan menerima barang Anda.</p>
                <div class="flex justify-end space-x-4">
                    <button id="cancel-button" class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Batal</button>
                    <button id="confirm-button" class="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">Konfirmasi Pengambilan</button>
                </div>
            </div>
        </div>
    `;
}


// =================================================================================
// --- 4. LOGIC FUNCTIONS ---
// =================================================================================
// Functions that handle user interactions and state changes.

/**
 * Displays the confirmation modal.
 */
function showConfirmationModal() {
    state.isModalOpen = true;
    render();
}

/**
 * Hides the confirmation modal.
 */
function closeModal() {
    state.isModalOpen = false;
    render();
}

/**
 * Marks the active service as "Telah Diambil", closes the modal, and shows a notification.
 */
function confirmPickup() {
    const service = state.services[state.activeServiceId];
    if (service) {
        service.status = "Telah Diambil";
    }
    closeModal(); // This will trigger a re-render
    showNotification(`Status untuk "${service.itemName}" telah diperbarui.`, 'success');
}

/**
 * Handles the service search logic.
 * Navigates to the detail screen on success or shows a notification on failure.
 */
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const serviceId = searchInput.value.trim().toUpperCase();
    if (state.services[serviceId]) {
        state.activeServiceId = serviceId;
        state.activeTab = 'detail';
        render();
    } else {
        showNotification('ID Servis tidak ditemukan. Silakan coba lagi.', 'error');
        searchInput.value = '';
    }
}

/**
 * Creates and displays a temporary notification.
 * This function directly manipulates the DOM to avoid re-rendering the entire app.
 * @param {string} message - The message to display.
 * @param {string} type - 'success' or 'error'.
 */
function showNotification(message, type = 'error') {
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');

    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    notif.className = `notification-item text-white px-6 py-3 rounded-lg shadow-lg ${bgColor}`;
    notif.textContent = message;

    container.appendChild(notif);

    // The animation will auto-remove it from view, but we should remove it from the DOM after
    setTimeout(() => {
        if (container.contains(notif)) {
            container.removeChild(notif);
        }
    }, 4000); // Must match the animation duration in CSS
}


// =================================================================================
// --- 5. RENDER & INITIALIZATION ---
// =================================================================================

/**
 * The main render function. It orchestrates the UI updates based on the current state.
 * It clears the app container, renders the correct screen, and then re-attaches event listeners.
 */
function render() {
    let currentScreen = '';
    if (state.activeTab === 'beranda') {
        currentScreen = HomeScreen();
    } else if (state.activeTab === 'lacak') {
        currentScreen = StatusScreen();
    } else if (state.activeTab === 'detail') {
        currentScreen = StatusDetailScreen();
    }

    app.innerHTML = `
        ${Header()}
        ${currentScreen}
        ${ConfirmationModal()}
    `;

    // --- Event Listener Attachment ---
    // Re-attach event listeners after every render, as innerHTML wipes them out.

    // Always-on listeners for header tabs
    document.getElementById('beranda-tab').addEventListener('click', (e) => {
        e.preventDefault();
        if (state.activeTab === 'beranda') return;
        state.activeTab = 'beranda';
        state.activeServiceId = null;
        render();
    });
    document.getElementById('lacak-tab').addEventListener('click', (e) => {
        e.preventDefault();
        if (state.activeTab === 'lacak') return;
        state.activeTab = 'lacak';
        state.activeServiceId = null;
        render();
    });

    // Listeners specific to the active tab
    if (state.activeTab === 'beranda') {
        document.getElementById('lacak-cta').addEventListener('click', (e) => {
            e.preventDefault();
            state.activeTab = 'lacak';
            render();
        });
    } else if (state.activeTab === 'lacak') {
        document.getElementById('search-button').addEventListener('click', handleSearch);
        document.getElementById('search-input').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') handleSearch();
        });

        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.getAttribute('data-id');
                state.activeServiceId = serviceId;
                state.activeTab = 'detail';
                render();
            });
        });
    } else if (state.activeTab === 'detail') {
        document.getElementById('back-to-list').addEventListener('click', (e) => {
            e.preventDefault();
            state.activeTab = 'lacak';
            state.activeServiceId = null;
            render();
        });

        const pickupButton = document.getElementById('pickup-button');
        if (pickupButton && !pickupButton.disabled) {
            pickupButton.addEventListener('click', showConfirmationModal);
        }

        if (state.isModalOpen) {
            document.getElementById('cancel-button').addEventListener('click', closeModal);
            document.getElementById('confirm-button').addEventListener('click', confirmPickup);
            document.getElementById('modal-overlay').addEventListener('click', (e) => {
                if (e.target.id === 'modal-overlay') {
                    closeModal();
                }
            });
        }
    }
}

/**
 * Entry point of the application.
 * Called when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    render();
});
