/**
 * ServiceData
 *
 * An object to manage all service-related data and interactions.
 * It includes sample data and methods for CRUD operations, as well as
 * functionality for persisting data to Local Storage.
 */
const ServiceData = {
  // Default service data. This is used if nothing is found in Local Storage.
  services: {
    "DCM-001": {
      id: "DCM-001",
      itemName: "Instalasi Software",
      customerName: "Adrian Darmawan",
      phoneNumber: "877-4708-3381",
      status: "Selesai", // Changed for variety
      technician: "Asep",
      technicianImg: "assets/images/tech-photos/asep.jpg", // Placeholder path
      dateReceived: "2024-01-15",
      estimatedFinish: "2024-01-16",
      serviceCost: 50000,
      pickupFee: 0,
      queueNumber: "2909 1051 0703 0210",
      timeline: [
        { step: 1, text: "Permintaan service telah diterima", completed: true, timestamp: "2024-01-15 08:35" },
        { step: 2, text: "Teknisi sedang mengkonfirmasi ketersediaan", completed: true, timestamp: "2024-01-15 09:15" },
        { step: 3, text: "Teknisi telah ditugaskan untuk service", completed: true, timestamp: "2024-01-15 10:00" },
        { step: 4, text: "Perangkat sedang dalam proses instalasi", completed: true, timestamp: "2024-01-15 14:00" },
        { step: 5, text: "Service telah selesai", completed: true, timestamp: "2024-01-16 11:00" },
        { step: 6, text: "Perangkat siap untuk diambil", completed: false, timestamp: null },
      ],
    },
    "SRV-002": {
        id: "SRV-002",
        itemName: "Penggantian Layar iPhone 12",
        customerName: "Budi Santoso",
        phoneNumber: "812-3456-7890",
        status: "Sedang Diproses",
        technician: "Jajang",
        technicianImg: "assets/images/tech-photos/jajang.jpg", // Placeholder path
        dateReceived: "2024-01-18",
        estimatedFinish: "2024-01-20",
        serviceCost: 2500000,
        pickupFee: 0,
        queueNumber: "1801 1051 0703 0211",
        timeline: [
          { step: 1, text: "Permintaan service telah diterima", completed: true, timestamp: "2024-01-18 10:00" },
          { step: 2, text: "Menunggu sparepart layar.", completed: true, timestamp: "2024-01-18 11:30" },
          { step: 3, text: "Proses penggantian layar.", completed: false, timestamp: null },
          { step: 4, text: "Pengujian fungsionalitas dan quality check.", completed: false, timestamp: null },
          { step: 5, text: "Service telah selesai", completed: false, timestamp: null },
          { step: 6, text: "Perangkat siap untuk diambil", completed: false, timestamp: null },
        ],
      },
  },

  /**
   * Returns an array of all service objects.
   * @returns {Array<object>}
   */
  getAllServices: function () {
    return Object.values(this.services);
  },

  /**
   * Retrieves a single service by its ID.
   * @param {string} id - The ID of the service.
   * @returns {object|undefined}
   */
  getServiceById: function (id) {
    return this.services[id];
  },

  /**
   * Updates the status of a specific service.
   * @param {string} id - The ID of the service to update.
   * @param {string} newStatus - The new status string.
   * @returns {boolean} - True if update was successful, false otherwise.
   */
  updateServiceStatus: function (id, newStatus) {
    if (this.services[id]) {
      this.services[id].status = newStatus;
      this.saveToStorage();
      return true;
    }
    return false;
  },

  /**
   * Saves the current `services` object to Local Storage.
   */
  saveToStorage: function () {
    localStorage.setItem("ambilcepat_services", JSON.stringify(this.services));
  },

  /**
   * Loads the services data from Local Storage.
   * If no data is found, it uses the default data.
   */
  loadFromStorage: function () {
    const storedServices = localStorage.getItem("ambilcepat_services");
    if (storedServices) {
      this.services = JSON.parse(storedServices);
    }
  },
};

// Initial load from local storage when the script is first run.
// This allows data to persist across page refreshes.
ServiceData.loadFromStorage();
