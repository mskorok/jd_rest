var has_company, has_company_checkbox;
var $ = jQuery.noConflict();
var app = angular.module('user', []);
app.controller('userCtr', function($scope) {
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
    jd_user_edit: function (form) {
        var jd_edit_user_key = window.jd_edit_user_key;
        var form_data = new FormData(form);
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post';
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        if (response[jd_edit_user_key].error) {
                            var error_container = document.getElementById('jd_error_container');
                            if (error_container) {
                                error_container.textContent = response[jd_edit_user_key].message;
                                window.location.hash = 'top';
                            }
                            console.log('error', response[jd_edit_user_key].message);
                        } else if (response[jd_edit_user_key].success) {
                            window.location.href = jd_user_list_url;
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
    jd_rest_disable_inputs: function(form) {
        var inputs = form.querySelectorAll('input');
        if (inputs) {
            [].forEach.call(inputs, function (input) {
                // console.log('inputs', input);
                input.setAttribute('disabled', 'disabled')
            })
        }
        var selects = form.querySelectorAll('select');
        if (selects) {
            [].forEach.call(selects, function (select) {
                // console.log('inputs', input);
                select.setAttribute('disabled', 'disabled')
            })
        }
    }
};
document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }
    var user_id = getParameterByName('user_id');
    if (!user_id) {
        user_id = jd_get_authorized();
        if (!user_id) {
            window.location.href = jd_user_list_url;
        }
    }
    var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_user_show_get_url + user_id;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    $('#user_edit_container').html(this.response);
                    var edit_button = document.getElementById('jd_user_show_edit');
                    if (edit_button) {
                        edit_button.classList.remove('hidden');
                        var edit_url = jd_user_edit_url + '?user_id=' + user_id;
                        edit_button.setAttribute('href', edit_url);
                    }
                    var form = document.getElementById('user_form');
                    var submit = document.getElementById('submit_button');
                    var h3 = document.querySelector('div#user_edit_container h3');
                    h3.textContent = 'User';
                    if (submit) {
                        submit.parentNode.removeChild(submit);
                    }
                    has_company_checkbox = document.querySelector('input[name=hasCompany]');
                    if (has_company_checkbox) {
                        jd_ajax_user_edit.show_company(has_company_checkbox);
                        has_company_checkbox.addEventListener('change', function (e) {
                            jd_ajax_user_edit.show_company(has_company_checkbox);
                        });
                    }

                    if (form) {
                        jd_ajax_user_edit.jd_rest_disable_inputs(form);
                    }
                    // $('#username').attr('disabled', 'disabled');//edit
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
                            role_select.setAttribute('disabled', 'disabled');
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