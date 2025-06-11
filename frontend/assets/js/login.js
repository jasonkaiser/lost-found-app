$(document).ready(function() {
    Utils.updateNavbar();

    $('.btn-primary').click(function(e) {
        e.preventDefault();
        
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        let isValid = true;

        $('.error-text').remove();
        $('#login-error').text('');

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
        }

        if (!isValid) {
            Toast.error("Please fix the errors");
            return;
        }

        RestClient.post('auth/login', { email, password }, function(response) {
            localStorage.setItem('jwt_token', response.data.token);
            localStorage.setItem('user_role', response.data.role); 
            localStorage.setItem('user_id', response.data.id);
            Utils.updateNavbar();
            window.location.hash = '#home'; 
            Toast.success("Welcome back");
        }, function(xhr) {
            const error = xhr.responseJSON?.error || 'Login failed';
            Utils.showError('#login-error', error);
            Toast.error("Login Failed");
        });
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFieldError(fieldId, message) {
        $(`#${fieldId}`).after(`<div class="error-text text-danger small mt-1">${message}</div>`);
    }
});