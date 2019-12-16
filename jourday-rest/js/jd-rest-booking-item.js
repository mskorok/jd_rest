var $ = jQuery.noConflict();
var app = angular.module('booking', []);
app.controller('bookingCtr', function ($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});

var jd_ajax_booking_item = {
    deleteBooking: function (id) {
        if (id !== '' && !isNaN(id)) {
            var url = jd_rest_host + '?action=jourday_ajax_form_get&method=DELETE&url=/booking/' + id;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            if (response.result === 'OK') {
                                window.location.href = jd_booking_list_url;
                            }
                        } catch (e) {
                            console.log('error', e);
                        }
                    } else {
                        console.log('error response', this.response);
                    }
                }
            };
            xhr.open('GET', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send();
        }
    },
    getItem: function () {
        var booking_id = getParameterByName('booking_id');
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_booking_show_get_url + booking_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        $('#booking_show_container').html(this.response);
                        var edit_button = document.getElementById('jd_booking_show_edit');
                        if (edit_button) {
                            edit_button.classList.remove('hidden');
                            var edit_url = jd_booking_edit_url + '?booking_id=' + booking_id;
                            edit_button.setAttribute('href', edit_url);
                        }
                        var delete_button = document.getElementById('jd_booking_show_delete');
                        if (delete_button) {
                            delete_button.classList.remove('hidden');
                            delete_button.addEventListener('click', function () {
                                jd_ajax_booking_item.deleteBooking(booking_id);
                            })
                        }
                    } catch (e) {
                        console.log('error', e);
                    }
                } else {
                    console.log('error response', this.response);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    var booking_id = getParameterByName('booking_id');
    if (!booking_id) {
        window.location.href = jd_booking_list_url;
    }

    if (jd_admin()) {
        jd_ajax_booking_item.getItem();
    } else {
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + jd_owner_booking_url + booking_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response =  JSON.parse(this.response);
                        if (response.result === 'OK') {
                            jd_ajax_booking_item.getItem();
                        } else {
                            window.location.href = jd_booking_list_url;
                        }
                    } catch (e) {
                        console.log('error', e);
                    }
                } else {
                    console.log('error response', this.response);
                }
            }
        };
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
    }

});