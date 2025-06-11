$(document).ready(function () {
    const userId = localStorage.getItem('user_id');
    const jwtToken = localStorage.getItem('jwt_token');

    if (!userId || !jwtToken) {
        Toast.error("You need to be logged in to access this page.");
        window.location.href = '/login';
        return;
    }

    const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));

    function loadProfileData() {
        RestClient.get(`users/${userId}`, function (response) {
            if (response) updateProfileUI(response);
            else Toast.error("Failed to load profile data");
        }, function (error) {
            console.error('Error loading profile:', error);
            Toast.error("Error loading profile data");
            if (error.status === 401) {
                Toast.error("Session expired. Please login again.");
                window.location.href = '/login';
            }
        });
    }

    function updateProfileUI(userData) {
        $('.profile-name').text(userData.name || 'Not provided');
        $('.user-name').text(`@${userData.email?.split('@')[0]}` || '@username');
        $('.info-name').text(userData.name || 'Not provided');
        $('.info-email').text(userData.email || 'Not provided');
        $('.info-phone').text(userData.phone_number || 'Not provided');
        $('.info-location').text(userData.location || 'Not provided');
        $('.info-verified').text(userData.verified ? "Verified" : "Not Verified");
        $('.card-avatar').css('background-image', 'url("frontend/assets/images/avatar.png")');
    }

    function loadUserReports() {
        RestClient.get(`lost-items/user/${userId}`, function (lostReports) {
            renderReports(lostReports, '.lost-reports');
        }, function () {
            $('.lost-reports').html('<div class="no-reports-message">No lost reports found</div>');
        });

        RestClient.get(`found-items/user/${userId}`, function (foundReports) {
            renderReports(foundReports, '.found-reports');
        }, function () {
            $('.found-reports').html('<div class="no-reports-message">No found reports found</div>');
        });
    }

    function renderReports(reports, containerSelector) {
        const $container = $(containerSelector).empty();
        if (!reports || reports.length === 0) {
            $container.append('<div class="no-reports-message">No reports found</div>');
            return;
        }

        reports.forEach(report => {
            const reportDate = new Date(report.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            $container.append(`
                <div class="report-card">
                    <div class="card-header">
                        <h5 class="report-title">
                            <b style="color:var(--primary-color)">ID:${report.id} - </b>
                            <b>${report.itemName || 'Untitled Report'}</b>
                        </h5>
                        <div class="report-meta">
                            <span class="report-description">${report.description || 'No description provided'}</span>    
                            <div>
                                <span class="meta-item"><i class="far fa-calendar"></i> ${reportDate}</span>
                                <span class="meta-item"><i class="fas fa-map-marker-alt"></i> ${report.location || 'Unknown location'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    $(document).on("click", ".edit-profile-btn, .edit-info-btn", function () {
        const $btn = $(this).prop("disabled", true);

        RestClient.get(`users/${userId}`, function (user) {
            $('#editName').val(user.name || '');
            $('#editEmail').val(user.email || '');
            $('#editPhone').val(user.phone_number || '');
            $('#editLocation').val(user.location || '');
            $('#editPassword').val('');
            editProfileModal.show();
            $btn.prop("disabled", false);
        }, function (error) {
            Toast.error("Failed to load profile data for editing");
            console.error(error);
            $btn.prop("disabled", false);
        });
    });

    $('#editPhone').on('input', function () {
        const clean = this.value.replace(/[^0-9+ ]/g, '');
        if (this.value !== clean) {
            this.value = clean;
            Toast.info("Only numbers, spaces and '+' are allowed.");
        }
    });

    $('#editLocation').on('input', function () {
        const clean = this.value.replace(/[^a-zA-ZčćžšđČĆŽŠĐ\s]/g, '');
        if (this.value !== clean) {
            this.value = clean;
            Toast.info("Only letters and spaces are allowed in location.");
        }
    });

    $('#profileForm').submit(function (e) {
        e.preventDefault();
        const $form = $(this);
        const $submitBtn = $form.find("button[type='submit']").prop("disabled", true);

        const updatedData = {
            name: $('#editName').val().trim(),
            email: $('#editEmail').val().trim(),
            phone_number: $('#editPhone').val().trim(),
            location: $('#editLocation').val().trim()
        };

        const newPassword = $('#editPassword').val().trim();
        if (newPassword) {
            updatedData.password = newPassword;
        }

        if (!updatedData.name || !updatedData.email) {
            Toast.error("Please fill all required fields.");
            $submitBtn.prop("disabled", false);
            return;
        }

        if (updatedData.phone_number && !/^[0-9+ ]{6,20}$/.test(updatedData.phone_number)) {
            Toast.error("Phone number is invalid. Use only digits and optional '+'");
            $submitBtn.prop("disabled", false);
            return;
        }

        if (updatedData.location && !/^[a-zA-ZčćžšđČĆŽŠĐ\s]{2,50}$/.test(updatedData.location)) {
            Toast.error("Location is invalid. Use only letters and spaces.");
            $submitBtn.prop("disabled", false);
            return;
        }

        RestClient.put(`users/${userId}`, updatedData, function () {
            Toast.success("Profile updated successfully!");
            editProfileModal.hide();
            loadProfileData();
            $submitBtn.prop("disabled", false);
        }, function (error) {
            console.error('Error updating profile:', error);
            Toast.error("Failed to update profile. Please try again.");
            $submitBtn.prop("disabled", false);
        });
    });

    $('#editProfileModal').on('hidden.bs.modal', function () {
        $('#profileForm')[0].reset();
    });

    $('#editProfileModal').on('hidden.bs.modal', function () {
    $('#profileForm')[0].reset();

  
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open').css('padding-right', '');
    });


    loadProfileData();
    loadUserReports();
});
