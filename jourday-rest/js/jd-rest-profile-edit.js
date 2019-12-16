var has_company, has_company_checkbox;
var $ = jQuery.noConflict();
var app = angular.module('profileEdit', []);
app.controller('profileCtr', function($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});
var jd_ajax_user_edit = {
    show_company: function (has_company_checkbox) {
        has_company = has_company_checkbox.checked;
        if (has_company) {
            document.getElementById('additional_elements').classList.remove('hidden');
        } else {
            document.getElementById('additional_elements').classList.add('hidden');
        }
    },
    appendCheckbox: function(form, form_data){
        if (form.hasCompany) {
            form_data.append('hasCompany', form.hasCompany.value);
        }
        if (form.insurancePLI) {
            form_data.append('insurancePLI', form.insurancePLI.value);
        }
        if (form.insurancePTR) {
            form_data.append('insurancePTR', form.insurancePTR.value);
        }
        if (form.workWithLocals) {
            form_data.append('workWithLocals', form.workWithLocals.value);
        }
        if (form.refund4Days) {
            form_data.append('refund4Days', form.refund4Days.value);
        }
        if (form.refund4moreDays) {
            form_data.append('refund4moreDays', form.refund4moreDays.value);
        }
        if (form.refund8moreDays) {
            form_data.append('refund8moreDays', form.refund8moreDays.value);
        }
        if (form.refund30Days) {
            form_data.append('refund30Days', form.refund30Days.value);
        }
        if (form.refund30moreDays) {
            form_data.append('refund30moreDays', form.refund30moreDays.value);
        }
        if (form.refund60moreDays) {
            form_data.append('refund60moreDays', form.refund60moreDays.value);
        }
    },
    jd_user_edit: function (form) {
        jd_sanitize_checkbox(form);
        var jd_edit_user_key = window.jd_edit_user_key;
        var form_data = new FormData(form);
        this.appendCheckbox(form, form_data);
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post';
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        var error_container = document.getElementById('jd_error_container');
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
                                        console.log(e.message);
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
                        } else if (response[jd_edit_user_key].success) {
                            window.location.reload();
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
document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }
    var user_id = jd_get_authorized();
    var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_user_edit_get_url + user_id;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    $('#user_edit_container').html(this.response);
                    var form = document.getElementById('user_form');
                    if (form) {
                        form.addEventListener('submit', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            jd_ajax_user_edit.jd_user_edit(form);
                            return false;
                        })
                    }
                    var has_company_checkbox = document.querySelector('input[name=hasCompany]');
                    if (has_company_checkbox) {
                        jd_ajax_user_edit.show_company(has_company_checkbox);
                        has_company_checkbox.addEventListener('change', function (e) {
                            jd_ajax_user_edit.show_company(has_company_checkbox);
                        });
                    }
                    $('input[name=username]').attr('disabled', 'disabled');//edit
                    var role_select = document.querySelector('select[name=role]');
                    if (role_select) {
                        var role_id_input = document.getElementById('role_id');
                        role_select.removeAttribute('disabled');
                        if (role_id_input) {
                            var role_id = role_id_input.value;
                            var options = role_select.querySelectorAll('option');
                            if (role_id.length < 1 || role_id === 'null' || role_id === null) {
                                [].forEach.call(options, function (option) {
                                    if (parseInt(option.value) === 9) {
                                        option.setAttribute('selected', 'selected');
                                    }
                                });
                            }
                            [].forEach.call(options, function (option) {
                                if (parseInt(option.value) === parseInt(role_id)) {
                                    option.setAttribute('selected', 'selected');
                                }
                            });
                            // role_select.setAttribute('disabled', 'disabled');
                        }
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