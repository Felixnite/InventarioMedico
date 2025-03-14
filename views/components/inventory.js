
const inventory = document.querySelector('#inventory');
const notification = document.querySelector('#notification');
import { inventoryAPI } from '/src/api/inventory.js';
import { createNotification } from './notification.js';

//Inventory for the admin view

const crearInventarioAdmin = () => {
    inventory.innerHTML =
        `
    <header class="bg-white shadow-md p-6 mb-6">
     <!-- Search and Create Container -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
        <!-- Search Bar (flex-1 to take available space) -->
        <div class="relative flex-1">
            <input id="searchInput" type="text" placeholder="Search medications, devices, supplies..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-600 focus:border-blue-600">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 12.65z" />
                </svg>
            </div>
        </div>

        <!-- Create Button -->
        <button id="createItemButton" class="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Create Item</span>
        </button>
    </div>
        <!-- Filters  -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label for="filterCategory" class="block text-sm font-medium text-gray-700">Category</label>
                <select id="filterCategory"
                    class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600">
                    <option value="">All Categories</option>
                    <option value="Medicamentos">Medicamentos</option>
                    <option value="Instrumentos quirurgicos">Instrumentos quirurgicos</option>
                    <option value="Equipamiento medico">Equipamiento medico</option>
                    <option value="Consumibles">Consumibles</option>
                    <option value="Suministros de especialidad">Items de especialidad</option>
                    <option value="Emergencia y trauma">Emergencia y trauma</option>
                    <option value="Equipamiento de porteccion personal">Equipamiento de porteccion personal</option>
                    <option value="Suministros de laboratorio">Suministros de laboratorioEmergencia y trauma</option>




                </select>
            </div>
            <div>
                <label for="filterProvider" class="block text-sm font-medium text-gray-700">Provider</label>
                <select id="filterProvider"
                    class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600">
                    <option value="">All Providers</option>
                    <option value="Provider A" id="providerA">Provider A</option>
                    <option value="Provider B" id="providerB">Provider B</option>
                    <option value="Provider C" id="providerC">Provider C</option>
                </select>
            </div>
            <div>
                <label for="filterUsage" class="block text-sm font-medium text-gray-700">Usage</label>
                <select id="filterUsage"
                    class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600">
                    <option value="">Usage</option>
                    <option value="Reusable">Reusable</option>
                    <option value="Disposable">Disposable</option>
                </select>
            </div>
            <div>
                <label for="filterExpiry" class="block text-sm font-medium text-gray-700">Expiry Status</label>
                <select id="filterExpiry"
                    class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600">
                    <option value="">All Expiry Status</option>
                    <option value="Expired">Expired</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Valid">Valid</option>
                </select>
            </div>
            <div>
                <label for="filterLocation" class="block text-sm font-medium text-gray-700">Location</label>
                <select id="filterLocation"
                    class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600">
                    <option value="">All Locations</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Surgery">Surgery</option>
                    <option value="ICU">ICU</option>
                    <option value="Pabellon">Pabellon</option>
                </select>
            </div>
        </div>
    </header>

    <!-- Main Content: Inventory Table -->
    <main class="max-w-7xl mx-auto px-4">
        <!-- Bulk Edit Button (shown when one or more rows are selected) -->
        <div id="bulkActions" class="mb-4 hidden">
            <button onclick="openBulkEditModal()"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Edit Selected (×<span id="selectedCount">0</span>)
            </button>
        </div>
        <div class="bg-white shadow rounded-lg">
            <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-700">Clinical Inventory</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200" id="inventoryTable">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3">
                                <input type="checkbox" id="selectAll" class="h-4 w-4">
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Provider</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usage</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Expiry Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price</th>
                            <th
                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <!-- Row 1 -->
                        <tr data-id="med1">
                            <td class="px-4 py-3"><input type="checkbox" class="rowCheckbox h-4 w-4"></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Aspirin 500mg</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                <button class="focus:outline-none text-blue-600" onclick="decrement('med1')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20 12H4" />
                                    </svg>
                                </button>
                                <span id="med1-quantity" class="mx-2">100</span>
                                <button class="focus:outline-none text-blue-600" onclick="increment('med1')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medications</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Provider A</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Disposable</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-01</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5.00</td>
                            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button onclick="openEditModal('med1')"
                                    class="text-blue-600 hover:text-blue-900">Edit</button>
                            </td>
                        </tr>
                        <!-- Row 2 -->
                        <tr data-id="med2">
                            <td class="px-4 py-3"><input type="checkbox" class="rowCheckbox h-4 w-4"></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Syringe 5ml</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                <button class="focus:outline-none text-blue-600" onclick="decrement('med2')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20 12H4" />
                                    </svg>
                                </button>
                                <span id="med2-quantity" class="mx-2">50</span>
                                <button class="focus:outline-none text-blue-600" onclick="increment('med2')">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Consumables</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Provider B</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Disposable</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-12-15</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0.50</td>
                            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button onclick="openEditModal('med2')"
                                    class="text-blue-600 hover:text-blue-900">Edit</button>
                            </td>
                        </tr>
                        <!-- Additional rows -->
                    </tbody>
                </table>
            </div>
        </div>
    </main>

   <!-- Create Item Modal -->
<div id="createModal" class="fixed inset-0 bg-black/50 flex items-center justify-center hidden">
    <div class="modal-animation bg-white rounded-xl shadow-2xl w-[95%] max-w-lg p-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">Add New Inventory Item</h3>
            <button id="closeCreateModalButton">
            ✕
            </button>
        </div>
        <form id="createForm" class="space-y-4">
            <!-- Product Name -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">
                    Product Name
                </label>
                <input type="text" id="createProductName" placeholder="Enter product name" required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
            </div>

            <!-- Category with Add New Option -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">
                    Category
                </label>
                <div class="flex gap-2">
                    <select id="createCategory" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                        <option value="">Select Category</option>
                        <option value="Medicamentos">Medicamentos</option>
                        <option value="Instrumentos quirurgicos">Instrumentos quirurgicos</option>
                        <option value="Equipamiento medico">Equipamiento medico</option>
                        <option value="new">+ Add New Category</option>
                    </select>
                    <input type="text" id="newCategoryInput" placeholder="New Category Name" 
                           class="hidden w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                </div>
            </div>

            <!-- Provider with Add New Option -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">
                    Provider
                </label>
                <div class="flex gap-2">
                    <select id="createProvider" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                        <option value="">Select Provider</option>
                        <option value="Provider A">Provider A</option>
                        <option value="Provider B">Provider B</option>
                        <option value="Provider C">Provider C</option>
                        <option value="new">+ Add New Provider</option>
                    </select>
                    <input type="text" id="newProviderInput" placeholder="New Provider Name" 
                           class="hidden w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                </div>
            </div>

            <!-- UsageType field -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">Usage Type</label>
                <select id="createUsageType" class="w-full px-3 py-2 border rounded-md">
                <option value="Disposable">Disposable</option>
                <option value="Reusable">Reusable</option>
        </select>
    </div>

            <!-- Dynamic Form Fields -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-1">Quantity</label>
                    <input type="number" id="createQuantity" min="0" value="0" required
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-1">Price</label>
                    <input type="number" id="createPrice" step="0.01" min="0" required
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-1">Expiry Date</label>
                    <input type="date" id="createExpiry" 
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-1">Location</label>
                    <select id="createLocation" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Surgery">Surgery</option>
                        <option value="ICU">ICU</option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <button type="button" id="cancelCreateModalButton"
                    class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                    Cancel
                </button>
                <button type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Add Item
                </button>
            </div>
        </form>
    </div>
</div>

    <!-- Single Edit Modal Content -->
    <div id="editModal" class="fixed inset-0 bg-black/50 flex items-center justify-center hidden">
        <div class="modal-animation bg-white rounded-xl shadow-2xl w-[95%] max-w-lg p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">Edit Product</h3>
                <button onclick="closeEditModal()" class="text-gray-500 hover:text-gray-700">
                    ✕
                </button>
            </div>
            <form id="editForm" class="space-y-4">
                <!-- Product Name Field -->
                <div>
                    <label for="editProductName" class="block text-gray-700 text-sm font-bold mb-1">
                        Product Name
                    </label>
                    <input id="editProductName" type="text" placeholder="Enter product name"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600" />
                </div>
                <!-- Quantity Field with Increment/Decrement Controls -->
                <div>
                    <label for="editProductQuantity" class="block text-gray-700 text-sm font-bold mb-1">
                        Quantity
                    </label>
                    <div class="flex">
                        <button type="button" class="px-2 py-2 bg-blue-600 text-white rounded-l-md focus:outline-none"
                            onclick="modalDecrement('editProductQuantity')">-</button>
                        <input id="editProductQuantity" type="number" placeholder="0"
                            class="w-full text-center px-3 py-2 border-t border-b focus:outline-none focus:ring-blue-600" />
                        <button type="button" class="px-2 py-2 bg-blue-600 text-white rounded-r-md focus:outline-none"
                            onclick="modalIncrement('editProductQuantity')">+</button>
                    </div>
                </div>
                <!-- Category Selector -->
                <div>
                    <label for="editProductCategory" class="block text-gray-700 text-sm font-bold mb-1">
                        Category
                    </label>
                    <select id="editProductCategory"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600">
                        <option value="Medications">Medications</option>
                        <option value="Surgical Instruments">Surgical Instruments</option>
                        <option value="Diagnostic Equipment">Diagnostic Equipment</option>
                        <option value="Consumables">Consumables</option>
                    </select>
                </div>
                <!-- Provider Field -->
                <div>
                    <label for="editProductProvider" class="block text-gray-700 text-sm font-bold mb-1">
                        Provider
                    </label>
                    <input id="editProductProvider" type="text" placeholder="Enter provider name"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600" />
                </div>
                <!-- Expiry Date Field -->
                <div>
                    <label for="editProductExpiry" class="block text-gray-700 text-sm font-bold mb-1">
                        Expiry Date
                    </label>
                    <input id="editProductExpiry" type="date"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600" />
                </div>
                <!-- Price Field -->
                <div>
                    <label for="editProductPrice" class="block text-gray-700 text-sm font-bold mb-1">
                        Price
                    </label>
                    <input id="editProductPrice" type="text" placeholder="Enter price"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-600" />
                </div>
                <!-- Form Action Buttons -->
                <div class="flex justify-end space-x-4">
                    <button type="button" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md focus:outline-none"
                        onclick="closeEditModal()">Cancel</button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none">Save</button>
                </div>
            </form>
        </div>
    </div>
    </div>

    <!-- Bulk Edit Modal -->
    <div id="bulkEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center hidden">
        <div class="modal-animation bg-white rounded-xl shadow-2xl w-[95%] max-w-md p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">Edit Multiple</h3>
                <button onclick="closeBulkEditModal()" class="text-gray-500 hover:text-gray-700">
                    ✕
                </button>
            </div>
            <form id="bulkEditForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Update Provider</label>
                    <select id="bulkProvider" class="w-full p-2 border rounded-lg">
                        <option value="">No Change</option>
                        <option>Provider A</option>
                        <option>Provider B</option>
                        <option>Provider C</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Update Location</label>
                    <select id="bulkLocation" class="w-full p-2 border rounded-lg">
                        <option value="">No Change</option>
                        <option>Pharmacy</option>
                        <option>Surgery</option>
                        <option>ICU</option>
                    </select>
                </div>
                <div class="flex gap-3 justify-end">
                    <button type="button" onclick="closeBulkEditModal()"
                        class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Apply Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
    `
    setTimeout(() => {
        setupEventListeners();
        setupFormValidation();
    }, 0);
}






//Inventory for the staff view




let inventoryItems = []; // Global state for inventory items

function setupEventListeners() {
    document.getElementById('createItemButton')?.addEventListener('click', openCreateModal);
    document.getElementById('closeCreateModalButton')?.addEventListener('click', closeCreateModal);

    inventory.addEventListener('click', (e) => {
        if (e.target.closest('[data-action="increment"]')) handleQuantityChange(e, 'increment');
        if (e.target.closest('[data-action="decrement"]')) handleQuantityChange(e, 'decrement');
        if (e.target.closest('[data-action="edit"]')) handleEditItem(e);
    });
}

function setupFormValidation() {
    const createForm = document.querySelector('#createForm');

    createForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const formData = {
            name: document.getElementById('createProductName').value.trim(),
            quantity: parseInt(document.getElementById('createQuantity').value),
            price: parseFloat(document.getElementById('createPrice').value),
            location: document.getElementById('createLocation').value,
            category: getSelectedCategory(),
            provider: getSelectedProvider(),
            usageType: document.getElementById('createUsageType').value,
            expiryDate: document.getElementById('createExpiry').value,
        };

        const payload = {
            ...formData,
            expiryDate: new Date(formData.expiryDate).toISOString()
        };

        // Frontend validation
        let isValid = true;

        if (!formData.name) {
            showError('name', 'Product name is required');
            isValid = false;
        }

        if (isNaN(formData.quantity) || formData.quantity < 0) {
            showError('quantity', 'Quantity must be a positive number');
            isValid = false;
        }

        if (isNaN(formData.price) || formData.price < 0) {
            showError('price', 'Price must be a positive number');
            isValid = false;
        }

        if (!payload.expiryDate || isNaN(new Date(payload.expiryDate))) {
            showError('expiry', 'Expiry date is required');
            isValid = false;
        }

        if (!isValid) return;

        try {
            await inventoryAPI.createItem(payload);
            createNotification(false, 'Item created successfully!');
            closeCreateModal();
            await initAdminInventory();
        } catch (error) {
            if (error.details) {
                Object.entries(error.details).forEach(([field, message]) => {
                    showError(field.toLowerCase(), message);
                });
            } else {
                createNotification(true, error.message);
            }
        }
    });
}

// Helper functions
function showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function clearErrors() {
    document.querySelectorAll('[id$="Error"]').forEach(el => {
        el.classList.add('hidden');
        el.textContent = '';
    });
}

function getSelectedCategory() {
    const select = document.getElementById('createCategory');
    return select.value === 'new'
        ? document.getElementById('newCategoryInput').value
        : select.value;
}

function getSelectedProvider() {
    const select = document.getElementById('createProvider');
    return select.value === 'new'
        ? document.getElementById('newProviderInput').value
        : select.value;
}

function handleQuantityChange(e, action) {
    const itemId = e.target.closest('tr').dataset.id;
    const quantityElement = document.getElementById(`${itemId}-quantity`);
    if (!quantityElement) return;

    let quantity = parseInt(quantityElement.textContent);
    quantity = action === 'increment' ? quantity + 1 : Math.max(0, quantity - 1);
    quantityElement.textContent = quantity;

    // Optional: Update the backend with the new quantity
    // inventoryAPI.updateItemQuantity(itemId, quantity);
}

function handleEditItem(e) {
    const itemId = e.target.closest('tr').dataset.id;
    const item = inventoryItems.find(item => item._id === itemId);
    if (!item) return;

    // Populate the edit modal with item data
    document.getElementById('editProductName').value = item.name;
    document.getElementById('editProductQuantity').value = item.quantity;
    document.getElementById('editProductCategory').value = item.category;
    document.getElementById('editProductProvider').value = item.provider;
    document.getElementById('editProductExpiry').value = new Date(item.expiryDate).toISOString().split('T')[0];
    document.getElementById('editProductPrice').value = item.price;
    document.getElementById('editProductLocation').value = item.location;

    // Open the edit modal
    document.getElementById('editModal').classList.remove('hidden');
}

function openCreateModal() {
    document.getElementById('createModal').classList.remove('hidden');
    document.getElementById('createForm').reset();
    clearErrors();
}

function closeCreateModal() {
    document.getElementById('createModal').classList.add('hidden');
}

// In /InventarioMedico/views/components/inventory.js
async function initAdminInventory() {
    try {
        const items = await inventoryAPI.getAllItems();
        inventoryItems = items;
        renderInventoryTable(items);
    } catch (error) {
        createNotification(true, 'Failed to load inventory');
    }
}

function renderInventoryTable(items) {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = items.map(item => `
        <tr data-id="${item._id}">
            <td class="px-4 py-3"><input type="checkbox" class="rowCheckbox h-4 w-4"></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                <button class="focus:outline-none text-blue-600" data-action="decrement">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                    </svg>
                </button>
                <span id="${item._id}-quantity" class="mx-2">${item.quantity}</span>
                <button class="focus:outline-none text-blue-600" data-action="increment">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.category}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.provider}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.usageType}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(item.expiryDate).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${item.price.toFixed(2)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button data-action="edit" class="text-blue-600 hover:text-blue-900">Edit</button>
            </td>
        </tr>
    `).join('');
}


document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === '/admin-home/') {
        crearInventarioAdmin();
    }
});