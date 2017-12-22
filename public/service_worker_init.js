if (navigator.serviceWorker !== undefined) {
    navigator.serviceWorker.register('service_worker.js')
        .then(registration => {
            console.log(`Service worker OK`);
        })
        .catch(error => {
            console.log(`Service worker ERROR`);
        });
}