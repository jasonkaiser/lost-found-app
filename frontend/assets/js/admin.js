$(document).ready(function () {

    if (!Utils.isAuthenticated() || !Utils.isAdmin()) {
        Toast.error("You need to be logged in as admin to access this page.");
        window.location.hash = "#login";
        return;
    }


    const profileModal = new bootstrap.Modal($("#viewProfileModal")[0]);
    const editUserModal = new bootstrap.Modal($("#editUserModal")[0]);
    const viewLostItemModal = new bootstrap.Modal($("#viewLostItemModal")[0]);
    const editLostItemModal = new bootstrap.Modal($("#editLostItemModal")[0]);
    const viewFoundItemModal = new bootstrap.Modal($("#viewFoundItemModal")[0]);
    const editFoundItemModal = new bootstrap.Modal($("#editFoundItemModal")[0]);

   
    loadUsers();
    loadLostItems();
    loadFoundItems();


    $(document).on("click", "#users-table-body .btn-info", function () {
        const $btn = $(this);
        $btn.prop("disabled", true);
        const userId = $btn.data("id");
        
        RestClient.get(`users/${userId}`, function (user) {
            $("#profile-id").text(user.id);
            $("#profile-name").text(user.name);
            $("#profile-email").text(user.email);
            $("#profile-role").text(user.role);
            profileModal.show();
            $btn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to fetch user details.");
            console.error(xhr.responseText);
            $btn.prop("disabled", false);
        });
    });

    $(document).on("click", "#users-table-body .btn-primary", function () {
        const $btn = $(this);
        $btn.prop("disabled", true);
        const userId = $btn.data("id");
        
        RestClient.get(`users/${userId}`, function (user) {
            $("#edit-user-id").val(user.id);
            $("#edit-user-name").val(user.name);
            $("#edit-user-email").val(user.email);
            $("#edit-user-password").val("");
            editUserModal.show();
            $btn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to load user for editing.");
            console.error(xhr.responseText);
            $btn.prop("disabled", false);
        });
    });

    $("#edit-user-form").on("submit", function (e) {
        e.preventDefault();
        const $form = $(this);
        const $submitBtn = $form.find("button[type='submit']");
        $submitBtn.prop("disabled", true);
        
        const userId = $("#edit-user-id").val();
        const updatedData = {
            name: $("#edit-user-name").val(),
            email: $("#edit-user-email").val()
        };

        const password = $("#edit-user-password").val();
        if (password) {
            updatedData.passwordHash = password;
        }

        RestClient.put(`users/${userId}`, updatedData, function () {
            Toast.success("User updated successfully!");
            loadUsers();
            editUserModal.hide();
            $submitBtn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to update user.");
            console.error(xhr.responseText);
            $submitBtn.prop("disabled", false);
        });
    });

    $(document).on("click", "#users-table-body .btn-danger", function () {
        const $btn = $(this);
        const userId = $btn.data("id");
        
        if (confirm("Are you sure you want to delete this user?")) {
            $btn.prop("disabled", true);
            RestClient.delete(`users/${userId}`, function () {
                Toast.success("User deleted successfully!");
                loadUsers();
            }, function (xhr) {
                Toast.error("Failed to delete user.");
                console.error(xhr.responseText);
                $btn.prop("disabled", false);
            });
        }
    });

 
    $(document).on("click", "#lost-items-table-body .btn-info", function () {
        const $btn = $(this);
        $btn.prop("disabled", true);
        const itemId = $btn.data("id");
        
        RestClient.get(`lost-items/${itemId}`, function (item) {
            $("#lost-item-id").text(item.id);
            $("#lost-item-name").text(item.itemName);
            $("#lost-item-description").text(item.description);
            $("#lost-item-location").text(item.location);
            $("#lost-item-date").text(item.createdAt);
            $("#lost-item-user-id").text(item.userID);
            viewLostItemModal.show();
            $btn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to fetch lost item details.");
            console.error(xhr.responseText);
            $btn.prop("disabled", false);
        });
    });

    $(document).on("click", "#lost-items-table-body .btn-primary", function () {
        const $btn = $(this);
        $btn.prop("disabled", true);
        const itemId = $btn.data("id");
        
        RestClient.get(`lost-items/${itemId}`, function (item) {
            $("#edit-lost-item-id").val(item.id);
            $("#edit-lost-item-name").val(item.itemName);
            $("#edit-lost-item-description").val(item.description);
            $("#edit-lost-item-location").val(item.location);
            $("#edit-lost-item-date").val(item.createdAt.split('T')[0]);
            editLostItemModal.show();
            $btn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to load lost item for editing.");
            console.error(xhr.responseText);
            $btn.prop("disabled", false);
        });
    });

    $("#edit-lost-item-form").on("submit", function (e) {
        e.preventDefault();
        const $form = $(this);
        const $submitBtn = $form.find("button[type='submit']");
        $submitBtn.prop("disabled", true);
        
        const itemId = $("#edit-lost-item-id").val();
        const updatedData = {
            itemName: $("#edit-lost-item-name").val(),
            description: $("#edit-lost-item-description").val(),
            location: $("#edit-lost-item-location").val(),
            createdAt: $("#edit-lost-item-date").val(),
        };

        RestClient.put(`lost-items/${itemId}`, updatedData, function () {
            Toast.success("Lost item updated successfully!");
            loadLostItems();
            editLostItemModal.hide();
            $submitBtn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to update lost item.");
            console.error(xhr.responseText);
            $submitBtn.prop("disabled", false);
        });
    });

    $(document).on("click", "#lost-items-table-body .btn-danger", function () {
        const $btn = $(this);
        const itemId = $btn.data("id");
        
        if (confirm("Are you sure you want to delete this lost item?")) {
            $btn.prop("disabled", true);
            RestClient.delete(`lost-items/${itemId}`, function () {
                Toast.success("Lost item deleted successfully!");
                loadLostItems();
            }, function (xhr) {
                Toast.error("Failed to delete lost item.");
                console.error(xhr.responseText);
                $btn.prop("disabled", false);
            });
        }
    });

  
    $(document).on("click", "#found-items-table-body .btn-info", function () {
        const $btn = $(this);
        $btn.prop("disabled", true);
        const itemId = $btn.data("id");
        
        RestClient.get(`found-items/${itemId}`, function (item) {
            $("#found-item-id").text(item.id);
            $("#found-item-name").text(item.itemName);
            $("#found-item-description").text(item.description);
            $("#found-item-location").text(item.location);
            $("#found-item-date").text(item.createdAt);
            $("#found-item-user-id").text(item.userID);
            viewFoundItemModal.show();
            $btn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to fetch found item details.");
            console.error(xhr.responseText);
            $btn.prop("disabled", false);
        });
    });

    $(document).on("click", "#found-items-table-body .btn-primary", function () {
        const $btn = $(this);
        $btn.prop("disabled", true);
        const itemId = $btn.data("id");
        
        RestClient.get(`found-items/${itemId}`, function (item) {
            $("#edit-found-item-id").val(item.id);
            $("#edit-found-item-name").val(item.itemName);
            $("#edit-found-item-description").val(item.description);
            $("#edit-found-item-location").val(item.location);
            $("#edit-found-item-date").val(item.createdAt.split('T')[0]);
            editFoundItemModal.show();
            $btn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to load found item for editing.");
            console.error(xhr.responseText);
            $btn.prop("disabled", false);
        });
    });

    $("#edit-found-item-form").on("submit", function (e) {
        e.preventDefault();
        const $form = $(this);
        const $submitBtn = $form.find("button[type='submit']");
        $submitBtn.prop("disabled", true);
        
        const itemId = $("#edit-found-item-id").val();
        const updatedData = {
            itemName: $("#edit-found-item-name").val(),
            description: $("#edit-found-item-description").val(),
            location: $("#edit-found-item-location").val(),
            createdAt: $("#edit-found-item-date").val(),
        };

        RestClient.put(`found-items/${itemId}`, updatedData, function () {
            Toast.success("Found item updated successfully!");
            loadFoundItems();
            editFoundItemModal.hide();
            $submitBtn.prop("disabled", false);
        }, function (xhr) {
            Toast.error("Failed to update found item.");
            console.error(xhr.responseText);
            $submitBtn.prop("disabled", false);
        });
    });

    $(document).on("click", "#found-items-table-body .btn-danger", function () {
        const $btn = $(this);
        const itemId = $btn.data("id");
        
        if (confirm("Are you sure you want to delete this found item report?")) {
            $btn.prop("disabled", true);
            RestClient.delete(`found-items/${itemId}`, function () {
                Toast.success("Found item deleted successfully!");
                loadFoundItems();
            }, function (xhr) {
                Toast.error("Failed to delete found item.");
                console.error(xhr.responseText);
                $btn.prop("disabled", false);
            });
        }
    });

   
    function loadUsers() {
        RestClient.get("users", function (users) {
            const $tbody = $("#users-table-body");
            $tbody.empty();

            if (!users || users.length === 0) {
                $tbody.append('<tr><td colspan="7" class="text-center">No users found</td></tr>');
                $("#totalUsers").text(0);
                return;
            }

            users.forEach((user) => {
                const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name || "-"}</td>
                        <td>${user.email || "-"}</td>
                        <td>${user.location || "-"}</td>
                        <td>${user.verified ? "Yes" : "No"}</td>
                        <td>${user.role || "user"}</td>
                        <td>
                            <button class="btn btn-info btn-sm" data-id="${user.id}">Profile</button>
                            <button class="btn btn-primary btn-sm" data-id="${user.id}">Edit</button>
                            <button class="btn btn-danger btn-sm" data-id="${user.id}">Delete</button>
                        </td>
                    </tr>`;
                $tbody.append(row);
            });

            $("#totalUsers").text(users.length);
        }, function (xhr) {
            console.error("Error loading users:", xhr.responseText);
            $("#users-table-body").html('<tr><td colspan="7" class="text-center">Error loading users</td></tr>');
            Toast.error("Failed to load users. Check your permissions.");
        });
    }

    function loadLostItems() {
        RestClient.get("lost-items", function (lostItems) {
            const $tbody = $("#lost-items-table-body");
            $tbody.empty();

            if (!lostItems || lostItems.length === 0) {
                $tbody.append('<tr><td colspan="8" class="text-center">No lost items found</td></tr>');
                $("#totalLost").text(0);
                return;
            }

            lostItems.forEach((item) => {
                const row = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.itemName || "-"}</td>
                        <td>${item.description || "-"}</td>
                        <td>${item.location || "-"}</td>
                        <td>${item.createdAt ? item.createdAt.split('T')[0] : "-"}</td>
                        <td>${item.userID || "-"}</td>
                        <td>
                            <button class="btn btn-info btn-sm" data-id="${item.id}">View</button>
                            <button class="btn btn-primary btn-sm" data-id="${item.id}">Edit</button>
                            <button class="btn btn-danger btn-sm" data-id="${item.id}">Delete</button>
                        </td>
                    </tr>`;
                $tbody.append(row);
            });

            $("#totalLost").text(lostItems.length);
        }, function (xhr) {
            console.error("Error loading lost items:", xhr.responseText);
            $("#lost-items-table-body").html('<tr><td colspan="8" class="text-center">Error loading lost items</td></tr>');
            Toast.error("Failed to load lost items. Check your permissions.");
        });
    }

    function loadFoundItems() {
        RestClient.get("found-items", function (foundItems) {
            const $tbody = $("#found-items-table-body");
            $tbody.empty();

            if (!foundItems || foundItems.length === 0) {
                $tbody.append('<tr><td colspan="8" class="text-center">No found items</td></tr>');
                $("#totalFound").text(0);
                return;
            }

            foundItems.forEach((item) => {
                const row = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.itemName || "-"}</td>
                        <td>${item.description || "-"}</td>
                        <td>${item.location || "-"}</td>
                        <td>${item.createdAt ? item.createdAt.split('T')[0] : "-"}</td>
                        <td>${item.userID || "-"}</td>
                        <td>
                            <button class="btn btn-info btn-sm" data-id="${item.id}">View</button>
                            <button class="btn btn-primary btn-sm" data-id="${item.id}">Edit</button>
                            <button class="btn btn-danger btn-sm" data-id="${item.id}">Delete</button>
                        </td>
                    </tr>`;
                $tbody.append(row);
            });

            $("#totalFound").text(foundItems.length);
        }, function (xhr) {
            console.error("Error loading found items:", xhr.responseText);
            $("#found-items-table-body").html('<tr><td colspan="8" class="text-center">Error loading found items</td></tr>');
            Toast.error("Failed to load found items. Check your permissions.");
        });
    }

   
    const modalIds = [
    '#viewProfileModal',
    '#editUserModal',
    '#viewLostItemModal',
    '#editLostItemModal',
    '#viewFoundItemModal',
    '#editFoundItemModal'
    ];

    modalIds.forEach(modalId => {
    $(modalId).on('hidden.bs.modal', function () {
      
        $(this).find('form')[0]?.reset();

   
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open').css('padding-right', '');
    });
    });

});