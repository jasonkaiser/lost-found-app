
$(document).ready(function () {
    Utils.updateNavbar();
    
});

const config = {
    templateDir: 'frontend/pages/',
    styleDir: 'frontend/assets/styles/',
    scriptDir: 'frontend/assets/js/'
};

const routes = {
    home: 'home.html',
    report: 'report.html',
    register: 'register.html',
    profile: 'profile.html',
    login: 'login.html',
    admin: 'admin.html',
    item: 'item.html',
    categories: 'categories.html',
    nearbyitems: 'nearbyitems.html'
  
};


function loadPage(route) {
    const app = $('#app');
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('user_role');

    console.log('Loading page:', route);
    console.log('JWT Token:', token);
    console.log('User Role:', role);

    if (route === 'admin') {
        if (!token || role !== 'Admin') {
            Toast.error('Access denied. Admins only.');
            window.location.hash = '#home';
            return;
        }
    }

    if (routes[route]) {
        const htmlPath = `${config.templateDir}${routes[route]}`;
        const cssPath = `${config.styleDir}${route}.css`;
        const jsPath = `${config.scriptDir}${route}.js`;

        $.get(htmlPath)
            .done((html) => {
                app.html(html);
                loadCSS(cssPath);
                loadJS(jsPath);

              
                setTimeout(() => {
                    if (route === 'report') {  
                        if (typeof window.initMap === 'function') {
                            window.initMap();
                        }
                    } else if (route === 'nearbyitems') {  
                        if (typeof window.initNearbyMap === 'function') {
                            window.initNearbyMap();
                        }
                    }
                }, 500); 
            })
            .fail((error) => {
                console.error('Failed to load page:', error);
                app.html('<h1>Page not found!</h1>');
            });
    } else {
        app.html('<h1>Page not found!</h1>');
    }
}



function loadCSS(href) {
    $('#dynamic-css').remove();
    $('<link>', {
        id: 'dynamic-css',
        rel: 'stylesheet',
        href: href
    }).appendTo('head');
}

function loadJS(src) {
    $('#dynamic-js').remove();
    const script = document.createElement('script');
    script.src = `${src}?v=${Date.now()}`;
    script.id = 'dynamic-js';
    script.defer = true;
    script.onload = () => console.log(`Loaded JS: ${src}`);
    script.onerror = () => console.error(`Failed to load JS: ${src}`);
    document.body.appendChild(script);
}

function loadSPA() {
    const token = localStorage.getItem('jwt_token');
    let hash = location.hash.slice(1);
    let route = hash.split('?')[0];
    

    if (!route) {
        if (!token) {
            route = 'login';
            location.hash = '#login';
        } else {
            route = 'home';
            location.hash = '#home';
        }
    } else {

        if (!token) {
            if (route !== 'login' && route !== 'register') {
                route = 'login';
                location.hash = '#login';
            }
        }
    }

    loadPage(route);
}



$(window).on('hashchange', function () {
    const token = localStorage.getItem('jwt_token');
    const hash = location.hash.slice(1);
    const [route] = hash.split('?'); 

    if (!token && route !== 'login' && route !== 'register') {
        window.location.hash = '#login';
        return; 
    }

    loadPage(route); 
});



$(document).ready(function () {
    $('.hamburger').on('click', function () {
        $('.nav-links').toggleClass('open');
    });

    loadSPA(); 
    Utils.updateNavbar();
});

$(document).on('click', '#logout-link', function (e) {
    e.preventDefault();
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    window.location.hash = '#home';
    Utils.updateNavbar();
});
