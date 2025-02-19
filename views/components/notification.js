const createNotification = (isError, message) => {
    const notificationContainer = document.getElementById('notification');
    
    if (!notificationContainer) {
        console.error('Notification container not found!');
        return;
    }

    const notificationDiv = document.createElement('div');
    notificationDiv.classList.add('fixed', 'top-4', 'right-4', 'z-50', 'transition-opacity', 'duration-300');

    const notificationContent = document.createElement('div');
    notificationContent.classList.add('p-4', 'rounded-lg', 'shadow-lg', 'text-white', 'font-medium');

    if (isError) {
        notificationContent.classList.add('bg-red-500');
        console.log(error)
    } else {
        notificationContent.classList.add('bg-green-500');
    }

    notificationContent.textContent = message;
    notificationDiv.appendChild(notificationContent);
    notificationContainer.appendChild(notificationDiv);

    setTimeout(() => {
        notificationDiv.classList.add('opacity-100');
    }, 10);

    setTimeout(() => {
        notificationDiv.classList.remove('opacity-100');
        setTimeout(() => {
            notificationDiv.remove();
        }, 300);
    }, 5000);
};

export { createNotification };