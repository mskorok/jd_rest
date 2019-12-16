var $ = jQuery.noConflict();
var app = angular.module('report', []);
app.controller('reportCtr', function($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var redirectUrl = jd_payable_list_url;
    var userUrl = jd_user_show_get_url;
    var productUrl = jd_product_show_get_url;

    var report_show = {
        jd_rest_disable_inputs: function(form) {
            var inputs = form.querySelectorAll('input');
            if (inputs) {
                [].forEach.call(inputs, function (input) {
                    input.setAttribute('disabled', 'disabled')
                })
            }
            var selects = form.querySelectorAll('select');
            if (selects) {
                [].forEach.call(selects, function (select) {
                    select.setAttribute('disabled', 'disabled')
                })
            }
        },
        show_company: function (has_company_checkbox) {
            if (has_company_checkbox) {
                var has_company = has_company_checkbox.checked;
                if (has_company) {
                    document.getElementById('additional_elements').classList.remove('hidden');
                } else {
                    document.getElementById('additional_elements').classList.add('hidden');
                }
            }
        },
        show: function (uri, id) {
            var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + uri + id;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var container = document.querySelector('#report_container');
                            if (container) {
                                container.innerHTML = this.response;
                                var has_company_checkbox = document.querySelector('input[name=hasCompany]');
                                if (has_company_checkbox) {
                                    report_show.show_company(has_company_checkbox);
                                    has_company_checkbox.addEventListener('change', function (e) {
                                        report_show.show_company(has_company_checkbox);
                                    });
                                }

                                var form = container.querySelector('form');

                                if (form) {
                                    var submit = form.querySelector('button[type=submit]');
                                    if (submit) {
                                        submit.parentNode.removeChild(submit);
                                    }
                                    report_show.jd_rest_disable_inputs(form);
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

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var user_id = getParameterByName('user_id');
        var product_id = getParameterByName('product_id');

        if ((user_id === 'undefined' || null === user_id) && (product_id === 'undefined' || null === product_id)) {
            window.location.href = redirectUrl;
        }

        var uri, id;
        if (product_id !== null) {
            uri = productUrl;
            id = product_id;
            report_show.show(uri, id);
        } else if (user_id !== null) {
            uri = userUrl;
            id = user_id;
            report_show.show(uri, id);
        } else {
            window.location.href = redirectUrl;
        }
    });
});