$(document).ready(function() {
    $('.btn-primary').click(function(e) {
        e.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        const confirmPassword = $('#confirm-password').val().trim();
        let isValid = true;

        $('.error-text').remove();
        $('#register-error').text('');

        if (!name) {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Invalid email format');
            isValid = false;
        }

        if (!password) {
            showFieldError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            showFieldError('password', 'Password must be at least 8 characters');
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            showFieldError('password', 'Password must contain at least one uppercase letter');
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            showFieldError('password', 'Password must contain at least one number');
            isValid = false;
        }

        if (!confirmPassword) {
            showFieldError('confirm-password', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showFieldError('confirm-password', 'Passwords do not match');
            isValid = false;
        }

        if (!isValid) {
            Toast.error("Please fix the errors");
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password
        };

        RestClient.post('auth/register', userData, function(response) {
            Utils.showSuccess('#register-success', 'Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.hash = '#login';
            }, 1500);
        }, function(xhr) {
            const error = xhr.responseJSON?.error || 'Registration failed';
            Utils.showError('#register-error', error);
        });
    });

    $('#goToLogin').click(function(e) {
        e.preventDefault();
        window.location.hash = '#login';
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFieldError(fieldId, message) {
        $(`#${fieldId}`).after(`<div class="error-text text-danger small mt-1">${message}</div>`);
    }
});


// 