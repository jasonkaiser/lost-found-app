let Utils = {
    // Parse JWT token
    parseJwt: function(token) {
        if (!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Invalid JWT token", e);
            return null;
        }
    },

    // Check if user is authenticated
    isAuthenticated: function() {
        const token = localStorage.getItem('jwt_token');
        if (!token) return false;
        
        const payload = this.parseJwt(token);
        if (!payload) return false;
        
        // Check if token is expired
        return payload.exp > Date.now() / 1000;
    },

    // Get current user data from token
   getCurrentUser: function() {
    const token = localStorage.getItem('jwt_token');
    const payload = this.parseJwt(token);
    return payload ? payload.user : null;
},


    // Check if user has admin role
    isAdmin: function() {
        const user = this.getCurrentUser();
         console.log("Current user (from JWT):", user);
        return user && user.role === 'Admin';
    },

    // Logout user
    logout: function() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_id');
        window.location.hash = '#login';
    },

    // Show error message
    showError: function(selector, message, duration = 5000) {
        const $errorDiv = $(selector).length ? $(selector) : 
            $(`<div id="${selector.replace('#', '')}" class="alert alert-danger mt-3"></div>`).appendTo('.form-container');
        $errorDiv.text(message).stop().fadeIn().delay(duration).fadeOut();
    },

    // Show success message
    showSuccess: function(selector, message, duration = 5000) {
        const $successDiv = $(selector).length ? $(selector) : 
            $(`<div id="${selector.replace('#', '')}" class="alert alert-success mt-3"></div>`).appendTo('.form-container');
        $successDiv.text(message).stop().fadeIn().delay(duration).fadeOut();
    },

    // Update navbar based on authentication status
    updateNavbar: function() {
        const role = localStorage.getItem('user_role');
        const token = localStorage.getItem('jwt_token');

        if (token) {
            $('#login-link').hide();

            if (!$('#logout-link').length) {
                $('<li><a href="#" id="logout-link">Logout</a></li>')
                    .insertAfter('#login-link')
                    .click(function(e) {
                        e.preventDefault();
                        Utils.logout();
                    });
            } else {
                $('#logout-link').show();
            }
        } else {
            $('#login-link').show();
            $('#logout-link').hide();
        }

        if (role === 'Admin') {
            $('#admin-dashboard-link').show();
        } else {
            $('#admin-dashboard-link').hide();
        }
    }
};

