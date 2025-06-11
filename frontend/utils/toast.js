// utils/toast.js

if (typeof Notify === 'undefined') {
  console.error('Notify is not defined. Did you forget to include simple-notify.min.js?');
}

window.Toast = {
  success: (message, title = 'Success') => {
    new Notify({
      status: 'success',
      title,
      text: message,
      effect: 'slide',
      speed: 300,
      autoclose: true,
      autotimeout: 3000,
      position: 'right top'
    });
  },
  error: (message, title = 'Error') => {
    new Notify({
      status: 'error',
      title,
      text: message,
      effect: 'slide',
      speed: 300,
      autoclose: true,
      autotimeout: 4000,
      position: 'right top'
    });
  },
  info: (message, title = 'Info') => {
    new Notify({
      status: 'info',
      title,
      text: message,
      effect: 'slide',
      speed: 300,
      autoclose: true,
      autotimeout: 3000,
      position: 'right top'
    });
  }
};
