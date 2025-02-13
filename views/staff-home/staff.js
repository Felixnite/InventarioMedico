

// Global functions for inline handlers
function increment(id) {
  const span = document.getElementById(`${id}-quantity`);
  span.textContent = parseInt(span.textContent) + 1;
}

function decrement(id) {
  const span = document.getElementById(`${id}-quantity`);
  span.textContent = Math.max(0, parseInt(span.textContent) - 1);
}

function openEditModal(id) {
  const modal = document.getElementById('editModal');
  const row = document.querySelector(`tr[data-id="${id}"]`);
  
  document.getElementById('editProductName').value = row.children[1].textContent;
  document.getElementById('editProductQuantity').value = document.getElementById(`${id}-quantity`).textContent;
  document.getElementById('editProductCategory').value = row.children[3].textContent;
  document.getElementById('editProductProvider').value = row.children[4].textContent;
  document.getElementById('editProductExpiry').value = row.children[5].textContent;
  document.getElementById('editProductPrice').value = row.children[6].textContent.replace('$', '');
  
  modal.classList.remove('hidden');
}

// DOMContentLoaded initialization
document.addEventListener('DOMContentLoaded', () => {
  // Bulk selection functionality
  const selectAll = document.getElementById('selectAll');
  const checkboxes = document.querySelectorAll('.rowCheckbox');
  const bulkActions = document.getElementById('bulkActions');

  selectAll.addEventListener('change', (e) => {
    checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
    bulkActions.classList.toggle('hidden', !e.target.checked);
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const anyChecked = document.querySelectorAll('.rowCheckbox:checked').length > 0;
      selectAll.checked = [...checkboxes].every(cb => cb.checked);
      bulkActions.classList.toggle('hidden', !anyChecked);
    });
  });

  // Modal functionality
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');

  window.closeEditModal = () => editModal.classList.add('hidden');

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#editModal [name="id"]').value;
    const row = document.querySelector(`tr[data-id="${id}"]`);

    // Update row data
    row.children[1].textContent = document.getElementById('editProductName').value;
    document.getElementById(`${id}-quantity`).textContent = document.getElementById('editProductQuantity').value;
    row.children[3].textContent = document.getElementById('editProductCategory').value;
    row.children[4].textContent = document.getElementById('editProductProvider').value;
    row.children[5].textContent = document.getElementById('editProductExpiry').value;
    row.children[6].textContent = `$${document.getElementById('editProductPrice').value}`;

    closeEditModal();
  });

  // Close modal when clicking outside
  editModal.addEventListener('click', (e) => e.target === editModal && closeEditModal());
});

// Modal quantity controls
function modalIncrement(inputId) {
  const input = document.getElementById(inputId);
  input.value = parseInt(input.value || 0) + 1;
}

function modalDecrement(inputId) {
  const input = document.getElementById(inputId);
  input.value = Math.max(0, parseInt(input.value || 0) - 1);
}
