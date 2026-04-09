document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const modalOverlay = document.getElementById('addStockModal');
    const openModalBtn = document.getElementById('addStockBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const addStockForm = document.getElementById('addStockForm');

    // Functions to open and close modal
    const openModal = () => {
        modalOverlay.classList.add('active');
        // Prevent body from scrolling
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        // Restore scrolling
        document.body.style.overflow = '';
        // Reset form
        setTimeout(() => addStockForm.reset(), 300);
    };

    // Event Listeners for Modal
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // Close modal on clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Form Submission Simulation
    addStockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Change button state to loading
        const submitBtn = addStockForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
        submitBtn.disabled = true;

        // Simulate network request
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved';
            submitBtn.classList.add('btn-success');
            
            setTimeout(() => {
                closeModal();
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
            }, 1000);
        }, 800);
    });

    // View switching logic
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const views = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            // Update active state on nav
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all views, show target view
            views.forEach(view => {
                view.classList.remove('active');
                view.style.display = 'none';
            });
            
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
                targetView.style.display = 'block';
            }
        });
    });
});
