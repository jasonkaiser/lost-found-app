(function () {
    $(document).ready(function () {
        const $container = $('#cards-container');
        const $categoryTitle = $('#category-title');

        const categoryMap = {
            'Electronics': 1,
            'Wallets': 2,
            'Clothing': 3,
            'Keys': 4,
            'Documents': 5,
            'Pets': 6,
            'Jewelry': 7,
            'Toys': 8,
            'Others': 9
        };

        function createCard(item, status) {
            const bgColor = status === 'Lost' ? 'rgba(255, 141, 141, 0.26)' : 'rgba(173, 255, 149, 0.26)';
            const borderColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';
            const textColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';
            const createdAt = new Date(item.createdAt.replace(' ', 'T')).toLocaleDateString();

            return $(`
                <div class="card-design item-card" data-id="${item.id}" data-type="${status.toLowerCase()}">
                    <div class="card-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
                    <div class="card-text">
                        <div class="card-title">${item.itemName}</div>
                        <div class="card-status" style="background: ${bgColor}; border-color: ${borderColor}; color: ${textColor};">
                            ${status}
                        </div>
                        <div class="card-info">
                            <div class="card-data">
                                <div class="card-location">
                                    <i class="fa-solid fa-location-dot"></i> ${item.location}
                                </div>
                                <div class="card-date">
                                    <i class="fa-solid fa-calendar"></i> ${createdAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        function showEmptyState(categoryName, status) {
            const icon = status === 'Lost' ? 'fa-face-sad-tear' : 'fa-face-meh';
            return $(`
                <div class="empty-state text-center py-5">
                    <i class="fas ${icon} fa-3x mb-3" style="color: #6c757d;"></i>
                    <h5 class="text-muted">No ${status} ${categoryName} items found</h5>
                    <p class="text-muted small">Check back later or report a ${status.toLowerCase()} item</p>
                </div>
            `);
        }

        function loadItemsByCategory(url, status, categoryName) {
            return new Promise((resolve, reject) => {
                RestClient.get(url, function (items) {
                    if (Array.isArray(items) && items.length > 0) {
                        const fragment = document.createDocumentFragment();
                        items.forEach(item => {
                            fragment.appendChild(createCard(item, status)[0]);
                        });
                        resolve(fragment);
                    } else {
                        resolve(showEmptyState(categoryName, status));
                    }
                }, function (xhr) {
                    console.error(`Error loading ${status} items:`, xhr);
                    Notify.error(`Failed to load ${status.toLowerCase()} items. Please try again.`);
                    reject(xhr);
                });
            });
        }

        async function loadCategoryItems(categoryId, categoryName) {
            $container.html('<div class="text-center py-4"><div class="spinner-border text-primary" role="status"></div></div>');
            
            try {
                const [lostItems, foundItems] = await Promise.all([
                    loadItemsByCategory(`lost-items/category/${categoryId}`, 'Lost', categoryName),
                    loadItemsByCategory(`found-items/category/${categoryId}`, 'Found', categoryName)
                ]);

                $container.empty();
                
                if (lostItems.children.length > 0 || foundItems.children.length > 0) {
                    if (lostItems.children.length > 0) {
                        $container.append(lostItems);
                    }
                    if (foundItems.children.length > 0) {
                        $container.append(foundItems);
                    }
                } else {
                    $container.append(`
                        <div class="empty-state text-center py-5">
                            <i class="fas fa-box-open fa-3x mb-3" style="color: #6c757d;"></i>
                            <h5 class="text-muted">No items in ${categoryName} category</h5>
                            <p class="text-muted small">Be the first to report a lost or found item</p>
                        </div>
                    `);
                }
            } catch (error) {
                $container.html('<div class="alert alert-danger">Error loading items. Please try again later.</div>');
            }
        }

        $(document).on('click', '.category-link', function (e) {
            e.preventDefault();
            const categoryName = $(this).data('category');
            const categoryId = categoryMap[categoryName];
            
            if (categoryId) {
                $categoryTitle.text(`${categoryName}`);
                loadCategoryItems(categoryId, categoryName);
                history.pushState(null, '', `#categories?category=${encodeURIComponent(categoryName)}`);
            } else {
                Notify.error("Invalid category selected");
                $container.html('<div class="alert alert-warning">Invalid category selected</div>');
            }
        });

        $container.on('click', '.item-card', function () {
            const id = $(this).data('id');
            const type = $(this).data('type');
            window.location.hash = `item?id=${id}&type=${type}`;
        });

        function getHashParams() {
            const hash = window.location.hash.substr(1);
            const [route, query] = hash.split('?');
            const params = {};
            
            if (query) {
                query.split('&').forEach(pair => {
                    const [key, value] = pair.split('=');
                    params[key] = decodeURIComponent(value);
                });
            }
            
            return { route, params };
        }

        function loadCategoryFromHash() {
            const { route, params } = getHashParams();
            if (route === 'categories') {
                const categoryName = params.category || 'Electronics';
                const categoryId = categoryMap[categoryName];
                
                if (categoryId) {
                    $('#category-title').text(categoryName.charAt(0).toUpperCase() + categoryName.slice(1));
                    loadCategoryItems(categoryId, categoryName);
                } else {
                    Notify.error("Invalid category in URL");
                    $('#cards-container').html('<div class="alert alert-warning">Invalid category specified</div>');
                }
            }
        }

        $(window).on('hashchange', loadCategoryFromHash);


        loadCategoryFromHash();
    });
})();
