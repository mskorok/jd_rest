window.rest_user_role = 'Unauthorized';
var rest_auth = {
    restHome: '/rest-home',
    restLogin: '/rest-login',
    restRegister: '/rest-profile-create',
    notAllowedUrls: [
        'rest-paypal',
        'rest-booking-item',
        'rest-booking-list',
        'rest-booking-create',
        'rest-booking-edit',
        'rest-booking-search',
        'rest-message-item',
        'rest-message-list',
        'rest-message-search',
        'rest-product-item',
        'rest-product-list',
        'rest-product-create',
        'rest-product-edit',
        'rest-product-search',
        'rest-discount-to-offer-list',
        'rest-discount-to-offer-create',
        'rest-discount-to-offer-edit',
        'rest-discount-to-offer-show',
        'rest-product-to-amenities-add-list',
        'rest-product-to-amenities-add-create',
        'rest-product-to-amenities-add-edit',
        'rest-product-to-amenities-add-show',
        'rest-product-to-amenities-remove-list',
        'rest-product-to-amenities-remove-create',
        'rest-product-to-amenities-remove-edit',
        'rest-product-to-amenities-remove-show',
        'rest-product-to-language-list',
        'rest-product-to-language-create',
        'rest-product-to-language-edit',
        'rest-product-to-language-show',
        'rest-payment-item',
        'rest-payment-list',
        'rest-payment-search',
        'rest-user-item',
        'rest-user-list',
        'rest-user-edit',
        'rest-user-create',
        'rest-user-search',
        'rest-user-profile',
        'rest-profile-edit',
        'rest-profile-autoresponder',
        'rest-messenger',
        'rest-signup',
        'report-resellers-list',
        'report-resellers-active-list',
        'report-affiliates-list',
        'report-affiliates-active-list',
        'report-customers-list',
        'report-beneficiaries-list',
        'report-providers-list',
        'report-jourday-provider-list',
        'report-upcoming-products-list',
        'report-live-products-list',
        'report-payable-list',
        'report-paid-list',
        'report-receivables-list',
        'report-totals-list',
        'report-comment-list',
        'report-review-list',
        'report-resellers-item',
        'report-resellers-active-item',
        'report-affiliates-item',
        'report-affiliates-active-item',
        'report-customers-item',
        'report-beneficiaries-item',
        'report-providers-item',
        'report-jourday-provider-item',
        'report-upcoming-products-item',
        'report-live-products-item',
        'report-payable-item',
        'report-paid-item',
        'report-receivables-item',
        'report-totals-item',
        'report-comment-item',
        'report-review-item',
        'activity-category-create',
        'activity-category-edit',
        'activity-category-show',
        'activity-category-list',
        'activity-type-create',
        'activity-type-edit',
        'activity-type-show',
        'activity-type-list',
        'amenities-create',
        'amenities-edit',
        'amenities-show',
        'amenities-list',
        'cancellation-policy-create',
        'cancellation-policy-edit',
        'cancellation-policy-show',
        'cancellation-policy-list',
        'city-create',
        'city-edit',
        'city-show',
        'city-list',
        'country-create',
        'country-edit',
        'country-show',
        'country-list',
        'language-create',
        'language-edit',
        'language-show',
        'language-list',
        'physical-level-create',
        'physical-level-edit',
        'physical-level-show',
        'physical-level-list',
        'product-category-create',
        'product-category-edit',
        'product-category-show',
        'product-category-list',
        'settings-create',
        'settings-edit',
        'settings-show',
        'settings-list',
        'sales-to-countries-create',
        'sales-to-countries-edit',
        'sales-to-countries-show',
        'sales-to-countries-list',
        'autoresponder-create',
        'autoresponder-edit',
        'autoresponder-show',
        'autoresponder-list',
        'document-create',
        'document-edit',
        'document-show',
        'document-list',
        'mail-create',
        'mail-edit',
        'mail-show',
        'mail-list',
        'template-create',
        'template-edit',
        'template-show',
        'template-list',
        'voucher-create',
        'voucher-edit',
        'voucher-show',
        'voucher-list',
        'confirm-user',
        'confirm-provider'
    ],
    check_auth: function () {
        var self = this;
        window.rest_user_id = null;
        var cookies = rest_auth.get_cookies(), current_url = window.location.href;
        if (typeof cookies === 'object' && Object.keys(cookies).length > 0) {
            console.log('logged in');
            window.rest_user_role = cookies['rest_user_role'];
            window.rest_user_full_name = cookies['rest_user_full_name'];
            window.rest_user_id = cookies['rest_user_id'];
            window.rest_user_token = cookies['rest_user_token'];
            window.front_user = cookies['front_user'];
            if (current_url.indexOf(this.frontLogin) !== -1
                && current_url.indexOf(this.frontRegister) !== -1
            ) {
                window.location.href = this.restHome;
            }
        } else {
            console.log('not logged');
            this.notAllowedUrls.forEach(function (url) {
                if (current_url.indexOf(url) !== -1) {
                    console.log('not logged');
                    window.location.href = self.restLogin;
                }
            });
        }
    },
    get_cookies: function () {
        var parsed = {};
        if (this.get_cookie('rest_user_role') !== '') {
            parsed.rest_user_role = this.get_cookie('rest_user_role');
        }
        if (this.get_cookie('rest_user_id') !== '') {
            parsed.rest_user_id = this.get_cookie('rest_user_id');
        }
        if (this.get_cookie('rest_user_token') !== '') {
            parsed.rest_user_token = this.get_cookie('rest_user_token');
        }
        if (this.get_cookie('rest_user_full_name') !== '') {
            parsed.rest_user_full_name = this.get_cookie('rest_user_full_name');
        }
        if (this.get_cookie('front_user') !== '') {
            parsed.front_user = this.get_cookie('front_user');
        }
        return parsed;
    },
    set_cookie: function (name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        if (days) {
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        } else {
            document.cookie = name + "=" + value + ";path=/";
        }

    },
    get_cookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    eraseCookie: function (name) {
        this.set_cookie(name, '', -1);
    },
    login: function (name, password, remember) {
        remember = remember || null;
        var self = this;//TODO add headers with password and name
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + jd_login_post_url;
        var xhr = new XMLHttpRequest();
        var form_data = new FormData();
        form_data.append('username', name);
        form_data.append('password', password);
        form_data.append('Authorization', 'Basic ' + btoa(name + ":" + password));
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        self.set_cookies(response, remember);
                        window.location.href = self.restHome;
                    } catch (e) {
                        console.log('error', e);
                    }
                } else {
                    console.log('error response', this.response);
                }
            }
        };
        xhr.open('POST', url, true);
        xhr.send(form_data);

    },
    logout: function () {
        var el = document.getElementById('jd_nav_logout');
        if (el) {
            el.addEventListener('click', function (ev) {
                ev.stopPropagation();
                rest_auth.remove_cookies();
                window.location.reload();
            })
        }
    },
    set_cookies: function (response, remember) {
        var expires = remember ? 90 : 0;
        if (typeof response.data !== 'undefined' && typeof response.data.role !== 'undefined') {
            this.set_cookie('rest_user_role', response.data.role, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.token !== 'undefined') {
            this.set_cookie('rest_user_token', response.data.token, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.user.id !== 'undefined') {
            this.set_cookie('rest_user_id', response.data.user.id, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.user.id !== 'undefined') {
            var name = response.data.user.firstName + ' ' + response.data.user.lastName;
            this.set_cookie('rest_user_full_name', name, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.user !== 'undefined') {
            var user = JSON.stringify(response.data.user);
            this.set_cookie('front_user', user, expires);
            localStorage.setItem('front_user', user);
        }
    },
    remove_cookies: function () {
        this.eraseCookie('rest_user_role');
        this.eraseCookie('rest_user_id');
        this.eraseCookie('rest_user_token');
        this.eraseCookie('rest_user_full_name');
        this.eraseCookie('front_user');
        localStorage.removeItem('front_user');
    },
    get_token: function () {
        return this.get_cookie('rest_user_token');
    }
};

rest_auth.check_auth();

/**
 *
 * @param name
 * @param url
 * @returns {*}
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 *
 * @param items
 * @param prop
 * @returns {Array}
 */
function jd_rest_distinct(items, prop) {
    var unique = [];
    var distinctItems = [];
    [].forEach.call(items, function (item) {
        if (unique[item[prop]] === undefined) {
            distinctItems.push(item);
        }
        unique[item[prop]] = 0;
    });
    return distinctItems;
}

/**
 *
 * @param field
 * @param key
 * @param url
 * @param selector
 * @param scope
 */
function jd_rest_awesomplete(field, key, url, selector, scope) {
    var ajax = new XMLHttpRequest();
    var list = [];
    ajax.open("GET", url, true);
    ajax.onload = function () {
        // console.log('aws', ajax.responseText);
        try {
            var obj = JSON.parse(ajax.responseText);
            // console.log('obj', obj);
            if (scope) {
                var opt = obj[key];
                opt = jd_rest_distinct(opt, field);
                scope[key + '_' + field] = opt;
            }
            // console.log(scope);
            list = obj[key].map(function (i) {
                return i[field];
            });

            list = list.filter(function (x, i, a) {
                return a.indexOf(x) === i;
            });
            new Awesomplete(document.querySelector(selector), {list: list});
        } catch (e) {
            console.log('jd_rest_awesomplete_error', e);
        }
    };
    ajax.send();
}

/**
 *
 * @desc selectors = [
 *   {
 *       field: 'field',
 *       selector: '#selector'
 *   }
 * ]
 *
 * @param field
 * @param key
 * @param url
 * @param selectors
 * @param scope
 */
function jd_rest_awesomplete_mass(field, key, url, selectors, scope) {
    var ajax = new XMLHttpRequest();
    var list = [];
    ajax.open("GET", url, true);
    ajax.onload = function () {
        // console.log('aws', ajax.responseText);
        try {
            var obj = JSON.parse(ajax.responseText);
            // console.log('obj', obj, scope, key + '_' + field);
            if (scope) {
                var opt = obj[key];
                opt = jd_rest_distinct(opt, field);
                scope[key + '_' + field] = opt;
            }
            // console.log('aa', selectors, scope['messages_title']);
            selectors.forEach(function (item) {
                list = obj[key].map(function (i) {
                    return i[item.field];
                });

                list = list.filter(function (x, i, a) {
                    return a.indexOf(x) === i;
                });
                new Awesomplete(document.querySelector(item.selector), {list: list});
            })

        } catch (e) {
            console.log('jd_rest_awesomplete_error', e, key + '_' + field);
        }
    };
    ajax.send();
}

function jd_rest_fill_model(field, key, url, scope) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", url, true);
    ajax.onload = function () {
        try {
            var obj = JSON.parse(ajax.responseText);
            var opt = obj[key];
            opt = jd_rest_distinct(opt, field);
            scope[key + '_' + field] = opt;
        } catch (e) {
            console.log('fill_model_error', e);
        }
    };
    ajax.send();
}

function jd_profile_edit_link() {
    window.location.href = jd_profile_edit_url;
}

var jd_rest_booking_offset = 0;
var jd_rest_product_offset = 0;
var jd_rest_user_offset = 0;
var jd_rest_message_offset = 0;
var jd_rest_payment_offset = 0;
var jd_rest_admin_offset = 0;
var jd_rest_limit = 100;

function jd_reduce_admin_offset() {
    if (jd_rest_admin_offset < jd_rest_limit) {
        jd_rest_admin_offset = 0;
    } else {
        jd_rest_admin_offset -= jd_rest_limit;
    }
}

function jd_reduce_booking_offset() {
    if (jd_rest_booking_offset < jd_rest_limit) {
        jd_rest_booking_offset = 0;
    } else {
        jd_rest_booking_offset -= jd_rest_limit;
    }
}

function jd_reduce_product_offset() {
    if (jd_rest_product_offset < jd_rest_limit) {
        jd_rest_product_offset = 0;
    } else {
        jd_rest_product_offset -= jd_rest_limit;
    }
}

function jd_reduce_message_offset() {
    if (jd_rest_message_offset < jd_rest_limit) {
        jd_rest_message_offset = 0;
    } else {
        jd_rest_message_offset -= jd_rest_limit;
    }
}

function jd_reset_message_offset() {
    jd_rest_message_offset = jd_rest_limit;
}

function jd_reduce_user_offset() {
    if (jd_rest_user_offset < jd_rest_limit) {
        jd_rest_user_offset = 0;
    } else {
        jd_rest_user_offset -= jd_rest_limit;
    }
}

function jd_reduce_payment_offset() {
    if (jd_rest_payment_offset < jd_rest_limit) {
        jd_rest_payment_offset = 0;
    } else {
        jd_rest_payment_offset -= jd_rest_limit;
    }
}

function jd_increase_admin_offset() {
    jd_rest_admin_offset += jd_rest_limit;
}

function jd_increase_booking_offset() {
    jd_rest_booking_offset += jd_rest_limit;
}

function jd_increase_product_offset() {
    jd_rest_product_offset += jd_rest_limit;
}

function jd_increase_message_offset() {
    jd_rest_message_offset += jd_rest_limit;
}

function jd_increase_user_offset() {
    jd_rest_user_offset += jd_rest_limit;
}

function jd_increase_payment_offset() {
    jd_rest_payment_offset += jd_rest_limit;
}

var DateDiff = {

    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
};

function jd_sanitize_checkbox(form) {
    var inputs = form.querySelectorAll('input[type=checkbox]');
    [].forEach.call(inputs, function (input) {
        if (input.checked) {
            input.value = 1;
            input.setAttribute('checked', 'checked');
        } else {
            input.value = 0;
            input.removeAttribute('checked');
        }
    });
}

function jd_successEdit(form) {
    form = form || null;
    var container = document.querySelector('#jd_success_container');
    if (container) {
        container.textContent = 'Successfully updated';
        setTimeout(function () {
            container.textContent = '';
        }, 3000);
    }

    if (form) {
        var inputs = form.querySelectorAll('input[type=checkbox]');
        [].forEach.call(inputs, function (input) {
            if (input.value && input.value == 1) {
                input.setAttribute('checked', 'checked');
            } else {
                input.value = 0;
                input.removeAttribute('checked');
            }
        });
    }
}


function jd_get_authorized() {
    var id = rest_auth.get_cookie('rest_user_id');
    return id === '' ? null : id;
}

function jd_get_roles() {
    var role = window.rest_user_role;
    if (role === 'Superadmin') {
        role = 'Admin';
    }
    var roles = [
        'Admin',
        'JourdayProvider',
        'JourdayBeneficiary',
        'ActivityProvider',
        'CustomerSupport',
        'SalesResponsible',
        'Reseller',
        'Affiliate',
        'Traveler',
        'Unauthorized'
    ];
    if (roles.indexOf(role) !== -1) {
        return role;
    } else {
        window.location.href = jd_login_url;
    }
}

function jd_user() {
    return rest_auth.get_cookie('rest_user_full_name');
}

function jd_authorized() {
    var id = rest_auth.get_cookie('rest_user_id');
    return id !== '';
}

function jd_admin() {
    var role = window.rest_user_role;
    return role === 'Admin' || role === 'Superadmin';
}

document.addEventListener('DOMContentLoaded', function () {
    // rest_auth.check_auth();
    // rest_auth.login('test123', 'Mike1111', 10);
    // rest_auth.remove_cookies();
});
