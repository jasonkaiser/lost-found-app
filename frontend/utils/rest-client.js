let Constants = {
    get_api_base_url: function() {
        if(location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            return '/lost-found-app/backend/';
        } else {
            return 'https://lost-found-kmq3o.ondigitalocean.app/backend/';
        }
    },
    USER_ROLE: "User",
    ADMIN_ROLE: "Admin"
};

let RestClient = {
    get: function(url, callback, error_callback) {
        $.ajax({
            url: Constants.get_api_base_url() + url,
            type: "GET",
            beforeSend: function(xhr) {
                const token = localStorage.getItem("jwt_token");
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("GET Request Failed:", jqXHR.responseText);
                }
            }
        });
    },

    post: function(url, data, callback, error_callback) {
        $.ajax({
            url: Constants.get_api_base_url() + url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("POST Request Failed:", jqXHR.responseText);
                }
            }
        });
    },

    put: function(url, data, callback, error_callback) {
        $.ajax({
            url: Constants.get_api_base_url() + url,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                const token = localStorage.getItem("jwt_token");
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("PUT Request Failed:", jqXHR.responseText);
                }
            }
        });
    },

    delete: function(url, callback, error_callback) {
        $.ajax({
            url: Constants.get_api_base_url() + url,
            type: "DELETE",
            beforeSend: function(xhr) {
                const token = localStorage.getItem("jwt_token");
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("DELETE Request Failed:", jqXHR.responseText);
                }
            }
        });
    }
};