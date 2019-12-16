var $ = jQuery.noConflict();
var app = angular.module('paymentSearch', []);
app.controller('searchCtr', function ($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    var array = [
        'showUser',
        'showBooking'
    ];

    var url = jd_rest_host + '?action=jourday_ajax_get_content&method=GET&url=payments/search?where=';

    var search_compiler = {
        getOperator: function (operator) {
            if (typeof operator === 'string' || operator instanceof String) {
                return operator;
            } else if (typeof operator === 'object') {
                var selector = 'input[name=' + operator.name + ']:checked';
                var el = document.querySelector(selector);
                if (el) {
                    return el.value;
                }
                return 'eq';
            } else {
                throw 'Unknown type of operator';
            }
        },
        conditions: function (fields) {
            var compiled_fields = [];
            var id, model, form, el, operator, type;
            form = $scope.paymentForm;
            for (var key in fields) {
                if (fields.hasOwnProperty(key)) {
                    var entity = fields[key];
                    for (var property in entity) {
                        if (entity.hasOwnProperty(property)) {
                            model = entity[property].model;
                            id = entity[property].id;
                            operator = entity[property].operator;
                            type = entity[property].type;
                            if (!form[id].$pristine) {
                                el = document.getElementById(id);
                                if (el && el.value.length !== 0) {
                                    var op = this.getOperator(operator);
                                    compiled_fields.push(
                                        {property: property, model: key, value: el.value, operator: op, type: type}
                                    );
                                }
                            }
                        }
                    }
                }
            }
            // console.log('cf', compiled_fields);
            return compiled_fields;
        },
        parse: function (settings) {
            var string = '';

            string = '{';

            if (settings.length === 0) {
                return '';
            }
            settings.forEach(function (opt) {
                var model = opt.model;
                var property = opt.property;
                var value = opt.value;
                var type = opt.type;
                var operator = opt.operator;
                switch (operator) {
                    case 'eq':
                        string += '"' + model + '.' + property + '":' + '{"e":"' + value + '"},';
                        break;
                    case 'like':
                        string += '"' + model + '.' + property + '":' + '{"l":"' + value + '"},';
                        break;
                    case 'lt':
                        if (type === 'numeric') {
                            string += '"' + model + '.' + property + '":' + '{ "lt": ' + value + '},';
                        } else {
                            string += '"' + model + '.' + property + '":' + '{ "lt": "' + value + '"},';
                        }
                        break;
                    case 'gt':
                        if (type === 'numeric') {
                            string += '"' + model + '.' + property + '":' + '{"lt":' + value + '},';
                        } else {
                            string += '"' + model + '.' + property + '":' + '{"lt":"' + value + '"},';
                        }
                        break;
                    default:
                        throw 'Operator not correct';
                }
            });
            string = string.substring(0, string.length - 1);

            string += '}';

            return url + string + '%26include=Booking,User';
        },
        send: function (url) {
            console.log(url);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            if (response.data.result) {
                                var table_body = $('#table_body');
                                var table = $('#table_payments');
                                table_body.html('');
                                if ($.fn.dataTable.isDataTable('#table_payments')) {
                                    table.DataTable().destroy();
                                }
                                var html = '';
                                [].forEach.call(response.data.result, function (payment) {
                                    var username = payment.includes.User[0].firstName + ' ' + payment.includes.User[0].lastName;
                                    html += '<tr>' +
                                        '<td class="id"><a href="' + jd_payment_item_url + '?payment_id=' + payment.Payment_id + '" target="_blank">' + payment.Payment_id + '</a></td>' +
                                        '<td class="amount">' + payment.amount + '</td>' +
                                        '<td class="user_id"><a href="' + jd_user_item_url + '?user_id=' + payment.Payment_user_id + '" target="_blank">' + username.slice(0, 30) + '</a></td>' +
                                        '<td class="description">' + payment.Payment_description + '</td>' +
                                        '<td class="type">' + payment.Payment_type + '</td>' +
                                        '<td class="booking_id"><a href="' + jd_booking_item_url + '?booking_id=' + payment.Payment_booking_id + '" target="_blank">' + payment.Payment_booking_id + '</a></td>' +
                                        '<td class="sender-name">' + payment.Payment_senderName + '</td>' +
                                        '<td class="sender-account">' + payment.Payment_senderAccount + '</td>' +
                                        '<td class="sender-bank">' + payment.Payment_senderBank + '</td></tr>'
                                });
                                table_body.html(html);

                                if ($.fn.dataTable.isDataTable('#table_payments')) {
                                    table.DataTable().destroy();
                                }
                                table.DataTable({
                                    'info': false,
                                    'searching': false,
                                    'lengthChange': false,
                                    'pageLength': 20,
                                    'order': [[0, "asc"], [1, "asc"]],
                                    oLanguage: {
                                        oPaginate: {
                                            sNext: '<i class="fa fa-chevron-right" ></i>',
                                            sPrevious: '<i class="fa fa-chevron-left" ></i>'
                                        }
                                    }
                                });
                                var form_tab = document.getElementById('payment_search_form');
                                var result_tab = document.getElementById('payment_search_result');
                                var f_tab = document.getElementById('payment_search_form_tab');
                                var r_tab = document.getElementById('payment_search_result_tab');
                                if (f_tab) {
                                    f_tab.classList.remove('active');
                                    var parent_f = f_tab.parentNode;
                                    if (parent_f) {
                                        parent_f.classList.remove('active');
                                    }
                                }
                                if (r_tab) {
                                    r_tab.classList.add('active');
                                    var parent_r = r_tab.parentNode;
                                    if (parent_r) {
                                        parent_r.classList.add('active');
                                    }
                                }
                                if (form_tab) {
                                    form_tab.classList.remove('active');
                                    form_tab.classList.remove('in');
                                }
                                if (result_tab) {
                                    result_tab.classList.add('active');
                                    result_tab.classList.add('in');
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

    var search_fields = {
        User: {
            id: {
                id: 'user_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'userID',
                actual: true
            },
            firstName: {
                id: 'user_first_name_input',
                type: 'string',
                operator: {
                    name: 'user_first_name',
                    like: 'user_first_name_like',
                    eq: 'user_first_name_eq'
                },
                model: 'userFirstName',
                actual: true
            },
            lastName: {
                id: 'user_last_name_input',
                type: 'string',
                operator: {
                    name: 'user_last_name',
                    like: 'user_last_name_like',
                    eq: 'user_last_name_eq"'
                },
                model: 'userLastName',
                actual: true
            },
            email: {
                id: 'user_email_input',
                type: 'string',
                operator: {
                    name: 'user_email',
                    like: 'user_email_like',
                    eq: 'user_email_eq'
                },
                model: 'userEmail',
                actual: true
            },
            address1: {
                id: 'user_address1_input',
                type: 'string',
                operator: {
                    name: 'user_address1',
                    like: 'user_address1_like',
                    eq: 'user_address1_eq'
                },
                model: 'userAddress1',
                actual: true
            },
            address2: {
                id: 'user_address2_input',
                type: 'string',
                operator: {
                    name: 'user_address2',
                    like: 'user_address2_like',
                    eq: 'user_address1_eq'
                },
                model: 'userAddress2',
                actual: true
            },
            city: {
                id: 'user_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'userCity',
                actual: true
            },
            postCode: {
                id: 'user_post_code_input',
                type: 'string',
                operator: {
                    name: 'user_post_code',
                    like: 'user_post_code_like',
                    eq: 'user_post_code_eq'
                },
                model: 'userPostCode',
                actual: true
            },
            phone: {
                id: 'user_phone_input',
                type: 'string',
                operator: {
                    name: 'user_phone',
                    like: 'user_phone_like',
                    eq: 'user_phone_eq'
                },
                model: 'userPhone',
                actual: true
            },
            mobile: {
                id: 'user_mobile_input',
                type: 'string',
                operator: {
                    name: 'user_mobile',
                    like: 'user_mobile_like',
                    eq: 'user_mobile_eq'
                },
                model: 'userMobile',
                actual: true
            },
            language: {
                id: 'user_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'userLanguage',
                actual: true
            },
            creationDate: {
                id: 'user_creation_date_input',
                type: 'date',
                operator: {
                    name: 'user_creation_date',
                    lt: 'user_creation_date_lt',
                    gt: 'user_creation_date_gt',
                    eq: 'user_creation_date_eq'
                },
                model: 'userCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'user_modified_date_input',
                type: 'date',
                operator: {
                    name: 'user_modified_date',
                    lt: 'user_modified_date_lt',
                    gt: 'user_modified_date_gt',
                    eq: 'user_modified_date_eq'
                },
                model: 'userModifiedDate',
                actual: true
            }
        },
        Booking: {
            id: {
                id: 'booking_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingID',
                actual: true
            },
            bookingDate: {
                id: 'booking_booking_date_input',
                type: 'date',
                operator: {
                    name: 'booking_booking_date',
                    lt: 'booking_booking_date_lt',
                    gt: 'booking_booking_date_gt',
                    eq: 'booking_booking_date_eq'
                },
                model: 'bookingBookingDate',
                actual: true
            },
            user_id: {
                id: 'booking_user_id_select',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingUsers',
                actual: true
            },
            paymentType: {
                id: 'booking_payment_type_select',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingPaymentType',
                actual: true
            },
            affiliate: {
                id: 'booking_affiliate_select',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingAffiliates',
                actual: true
            }
        }
    };

    array.forEach(function (show) {
        $scope[show] = false;
    });

    function getShowButton() {
        return ($scope.showUser || $scope.showBooking);
    }

    $scope.showButton = getShowButton();


    array.forEach(function (show) {
        $scope.$watch(show, function () {
            $scope.showButton = getShowButton();
        });
    });

    jd_rest_awesomplete('firstName', 'users', jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users', '#user_first_name_input');
    jd_rest_awesomplete('lastName', 'users', jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users', '#user_last_name_input');
    jd_rest_awesomplete(
        'email',
        'users',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        '#user_email_input',
        $scope
    );
    jd_rest_awesomplete('address1', 'users', jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users', '#user_address1_input');
    jd_rest_awesomplete('address2', 'users', jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users', '#user_address2_input');
    jd_rest_awesomplete('phone', 'users', jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users', '#user_phone_input');
    jd_rest_awesomplete('mobile', 'users', jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users', '#user_mobile_input');


    //FILL

    jd_rest_fill_model(
        'name',
        'cities',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=cities',
        $scope
    );

    jd_rest_fill_model(
        'name',
        'languages',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=languages',
        $scope
    );

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var buttons = document.getElementById('payment_search_container');
        var ps = buttons.querySelectorAll('p');
        if (ps) {
            [].forEach.call(ps, function (p) {
                p.parentNode.removeChild(p);
            });
        }

        var brs = buttons.querySelectorAll('br');
        if (brs) {
            [].forEach.call(brs, function (p) {
                p.parentNode.removeChild(p);
            })
        }
        var form = document.getElementById('rest_payment_search_form');
        if (form) {
            form.addEventListener('submit', function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                var setting_array = search_compiler.conditions(search_fields);
                var search_url = search_compiler.parse(setting_array);
                search_compiler.send(search_url);
                return false;
            })
        }
    });
});