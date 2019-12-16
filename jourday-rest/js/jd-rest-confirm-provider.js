var $ = jQuery.noConflict();
var app = angular.module('confirm', []);
app.controller('confirmCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var confirmUrl = '/users/confirm/provider';
    var autocompleteUrl = '/widget/admin/unconfirmed/providers';

    var rest_confirm = {
        init: function () {
            //
        },
        autocomplete: function () {
            var select = document.getElementById('confirm_user_select');
            if (select) {
                select.innerHTML = '';
                var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + autocompleteUrl;
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            try {
                                var response = JSON.parse(this.response);
                                if (response.users) {
                                    var users = response.users;
                                    [].forEach.call(users, function (user) {
                                        var option = document.createElement('option');
                                        option.setAttribute('value', user.id);
                                        option.textContent = user.firstName + ' ' + user.lastName;
                                        select.appendChild(option);
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
        },
        submit: function () {
            var self = this;
            var button = document.querySelector('button[type=submit]');
            var form = button.closest('form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.send();
                    return false;
                })
            }
        },
        send: function () {
            var self = this;
            var select = document.getElementById('confirm_user_select');
            var user_id = select.options[select.selectedIndex].value;
            var form_data = new FormData();
            form_data.append('user_id', user_id);
            form_data.append('confirm', '1');
            if (!user_id || user_id === '') {
                return false;
            }
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + confirmUrl;

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var error_container = document.getElementById('jd_error_container');
                            var success_container = document.getElementById('jd_success_container');
                            error_container.innerHTML = '';
                            success_container.innerHTML = '';
                            var response = JSON.parse(this.response);
                            var html;
                            if (response.result === 'error') {
                                if (error_container) {
                                    html = '';
                                    if (Array.isArray(response.message)) {
                                        response.message.forEach(function (message) {
                                            if (typeof message === 'object') {
                                                for (var key in message) {
                                                    html += '<div>' + key + ' : ' + message[key] + '</div>';
                                                }
                                            } else if (typeof message === 'string') {
                                                html += '<div>' + message + '</div>';
                                            }
                                        });
                                    } else if (typeof response.message === 'object') {
                                        for (var key in response.message) {
                                            html += '<div>' + key + ' : ' + response.message[key] + '</div>';
                                        }
                                    } else {
                                        html = '<div>' + response.message + '</div>';
                                    }
                                    error_container.innerHTML = html;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response.message, html);
                            } else if (response.error) {
                                if (error_container) {
                                    html = '';
                                    if (Array.isArray(response.error.message)) {
                                        response.error.message.forEach(function (message) {
                                            if (typeof message === 'object') {
                                                for (var key in message) {
                                                    html += '<div>' + key + ' : ' + message[key] + '</div>';
                                                }
                                            }
                                        })
                                    } else if (typeof response.error.message === 'string') {
                                        html = response.error.message;
                                    }
                                    error_container.textContent = html;
                                    window.location.hash = 'top';
                                }
                                console.log('error', error_container, response.error.message);
                            } else if (response[jd_edit_product_key] && response[jd_edit_product_key].result === 'error') {
                                if (error_container) {
                                    error_container.textContent = response[jd_edit_product_key].message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response[jd_edit_product_key].message);
                            } else if (response.data) {
                                if (success_container) {
                                    success_container.textContent = 'Provider confirmed'
                                }
                                self.autocomplete();
                                console.log('OK');
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
            xhr.send(form_data);
        }
    };

    angular.element(document).ready(function () {
        if (!jd_admin()) {
            window.location.href = '/rest-home/';
        }

        rest_confirm.init();
        rest_confirm.autocomplete();
        rest_confirm.submit();
    });
});