var $ = jQuery.noConflict();
var app = angular.module('pluginCreate', []);
app.controller('createCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var formUrl = 'wp/user/create';
    var createUrl = '/users/';
    var redirectUrl = '/rest-home/';

    var rest_plugin_create = {
        init: function () {
            //
        },
        autocomplete: function () {
            //
        },
        submit: function () {
            var self = this;
            var button = document.querySelector('button[type=submit]');
            var form = button.closest('form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.send(form);
                    return false;
                })
            }
        },
        send: function (form) {
            jd_sanitize_checkbox(form);
            var form_data = new FormData(form);
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + createUrl;

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var error_container = document.getElementById('jd_error_container');
                            error_container.innerHTML = '';
                            console.log(this.response);
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
                                            } else if (typeof message === 'string') {
                                                html += '<div>' + message + '</div>';
                                            }
                                        })
                                    } else if (typeof response.error.message === 'string') {
                                        try {
                                            var errors = JSON.parse(response);
                                            errors.forEach(function (message) {
                                                html += '<div>' + message + '</div>';
                                            })

                                        } catch(e) {
                                            console.log(e);
                                            html = response.error.message;
                                        }
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
                            } else if (response.result === 'OK') {
                                console.log('OK');
                                window.location.href = redirectUrl;
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
        },
        show_company: function (has_company_checkbox) {
            has_company = has_company_checkbox.checked;
            if (has_company) {
                document.getElementById('additional_elements').classList.remove('hidden');
            } else {
                document.getElementById('additional_elements').classList.add('hidden');
            }
        }
    };

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }

        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + formUrl;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        $('#plugin_create_container').html(this.response);
                        rest_plugin_create.init();
                        rest_plugin_create.autocomplete();
                        rest_plugin_create.submit();
                        var has_company_checkbox = document.querySelector('input[name=hasCompany]');
                        if (has_company_checkbox) {
                            rest_plugin_create.show_company(has_company_checkbox);
                            has_company_checkbox.addEventListener('change', function (e) {
                                rest_plugin_create.show_company(has_company_checkbox);
                            });
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
    });
});