/**
 * ServiceData v3
 *
 * Manages all service-related data, including a catalog of service types
 * and a list of active service orders.
 */
const ServiceData = {
  // Catalog of available service types for the "Beranda" page
  serviceTypes: [
    {
      id: 'cat-01',
      name: 'Perbaikan Komputer',
      availability: 'Tersedia saat ini',
      queue: 2,
      image: 'https://picsum.photos/seed/computer/400/300',
    },
    {
      id: 'cat-02',
      name: 'Instalasi Software',
      availability: 'Tersedia saat ini',
      queue: 0,
      image: 'https://picsum.photos/seed/software/400/300',
    },
    {
      id: 'cat-03',
      name: 'Pembersihan Laptop',
      availability: 'Slot penuh',
      queue: 5,
      image: 'https://picsum.photos/seed/cleaning/400/300',
    },
    {
      id: 'cat-04',
      name: 'Recovery Data',
      availability: 'Tersedia saat ini',
      queue: 1,
      image: 'https://picsum.photos/seed/recovery/400/300',
    },
  ],

  // Active service orders
  services: {
    "DCM-001": {
      id: "DCM-001",
      itemName: "Instalasi Windows 11",
      customerName: "Adrian Darmawan",
      phoneNumber: "877-4708-3381",
      status: "Selesai",
      technician: "Asep",
      technicianImg: "https://i.pravatar.cc/150?u=asep",
      dateReceived: "2024-07-15",
      estimatedFinish: "2024-07-16",
      serviceCost: 150000,
      pickupFee: 0,
      queueNumber: "2909105107030210",
      timeline: [
        { step: 1, text: "Permintaan service diterima", completed: true, timestamp: "2024-07-15T08:35:00Z" },
        { step: 2, text: "Teknisi ditugaskan", completed: true, timestamp: "2024-07-15T09:15:00Z" },
        { step: 3, text: "Proses instalasi dimulai", completed: true, timestamp: "2024-07-15T10:00:00Z" },
        { step: 4, text: "Instalasi selesai, quality check", completed: true, timestamp: "2024-07-16T11:00:00Z" },
        { step: 5, text: "Service telah selesai", completed: true, timestamp: "2024-07-16T11:30:00Z" },
      ],
    },
    "SRV-002": {
      id: "SRV-002",
      itemName: "Ganti Layar iPhone 12",
      customerName: "Budi Santoso",
      phoneNumber: "812-3456-7890",
      status: "Sedang Diproses",
      technician: "Jajang",
      technicianImg: "https://i.pravatar.cc/150?u=jajang",
      dateReceived: "2024-07-18",
      estimatedFinish: "2024-07-20",
      serviceCost: 2500000,
      pickupFee: 0,
      queueNumber: "1801105107030211",
      timeline: [
        { step: 1, text: "Permintaan service diterima", completed: true, timestamp: "2024-07-18T10:00:00Z" },
        { step: 2, text: "Menunggu sparepart layar", completed: true, timestamp: "2024-07-18T11:30:00Z" },
        { step: 3, text: "Proses penggantian layar", completed: false, timestamp: null },
        { step: 4, text: "Pengujian fungsionalitas", completed: false, timestamp: null },
        { step: 5, text: "Service telah selesai", completed: false, timestamp: null },
      ],
    },
    "CLN-003": {
      id: "CLN-003",
      itemName: "Pembersihan MacBook Pro",
      customerName: "Citra Lestari",
      phoneNumber: "813-1122-3344",
      status: "Menunggu Sparepart",
      technician: "Udin",
      technicianImg: "https://i.pravatar.cc/150?u=udin",
      dateReceived: "2024-07-19",
      estimatedFinish: "2024-07-22",
      serviceCost: 350000,
      pickupFee: 0,
      queueNumber: "1907105107030212",
      timeline: [
        { step: 1, text: "Permintaan service diterima", completed: true, timestamp: "2024-07-19T13:00:00Z" },
        { step: 2, text: "Diagnosa awal", completed: true, timestamp: "2024-07-19T13:45:00Z" },
        { step: 3, text: "Menunggu thermal paste baru", completed: false, timestamp: null },
        { step: 4, text: "Pembersihan dan perakitan", completed: false, timestamp: null },
        { step: 5, text: "Service telah selesai", completed: false, timestamp: null },
      ],
    },
     "DTR-004": {
      id: "DTR-004",
      itemName: "Data Recovery SSD 1TB",
      customerName: "Dewi Anggraini",
      phoneNumber: "852-5566-7788",
      status: "Telah Diambil",
      technician: "Asep",
      technicianImg: "https://i.pravatar.cc/150?u=asep",
      dateReceived: "2024-07-10",
      estimatedFinish: "2024-07-14",
      serviceCost: 750000,
      pickupFee: 0,
      queueNumber: "1007105107030213",
      timeline: [
        { step: 1, text: "Permintaan service diterima", completed: true, timestamp: "2024-07-10T11:00:00Z" },
        { step: 2, text: "Scanning deep-level", completed: true, timestamp: "2024-07-11T15:00:00Z" },
        { step: 3, text: "Proses recovery data", completed: true, timestamp: "2024-07-13T18:00:00Z" },
        { step: 4, text: "Service telah selesai", completed: true, timestamp: "2024-07-14T10:00:00Z" },
        { step: 5, text: "Perangkat telah diambil", completed: true, timestamp: "2024-07-15T12:00:00Z" },
      ],
    },
  },

  getAllServiceTypes: function () {
    return this.serviceTypes;
  },

  getAllServices: function () {
    return Object.values(this.services);
  },

  getServiceById: function (id) {
    return this.services[id];
  },

  updateServiceStatus: function (id, newStatus) {
    if (this.services[id]) {
      this.services[id].status = newStatus;
      this.saveToStorage();
      return true;
    }
    return false;
  },

  saveToStorage: function () {
    localStorage.setItem("ambilcepat_services_v3", JSON.stringify(this.services));
  },

  loadFromStorage: function () {
    const storedServices = localStorage.getItem("ambilcepat_services_v3");
    if (storedServices) {
      this.services = JSON.parse(storedServices);
    }
  },
};

ServiceData.loadFromStorage();
