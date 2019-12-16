var $ = jQuery.noConflict();
var app = angular.module('bookingSearch', []);
app.controller('searchCtr', function ($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    var array = [
        'showBooking',
        'showPayment',
        'showUser',
        'showBookingItems',
        'showAffiliate',
        'showResellers'
    ];

    var url = jd_rest_host + '?action=jourday_ajax_get_content&method=GET&url=booking/search?where=';

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
            form = $scope.bookingForm;
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


            return url + string + '%26include=Affiliates,User';
        },
        send: function (url) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var username, affiliate, user;
                            var response = JSON.parse(this.response);
                            console.log(response);
                            if (response.data.result) {
                                var table_body = $('#table_body');
                                var table = $('#table_bookings');
                                table_body.html('');
                                if ($.fn.dataTable.isDataTable('#table_bookings')) {
                                    table.DataTable().destroy();
                                }
                                var html = '';
                                [].forEach.call(response.data.result, function (booking) {
                                    user = booking.includes.User[0];
                                    username = user.firstName + ' ' + user.lastName;
                                    affiliate = '';
                                    if (typeof booking.includes.Affiliates !== 'undefined') {
                                        affiliate = booking.includes.Affiliates[0].firstName + ' ' + booking.includes.Affiliates[0].lastName;
                                    }

                                    html += '<tr>' +
                                        '<td class="id"><a href="' + jd_booking_item_url + '?booking_id=' + booking.Booking_id + '" target="_blank">' + booking.Booking_id + '</a></td>' +
                                        '<td class="bookingDate">' + booking.Booking_bookingDate + '</td>' +
                                        '<td class="user_id"><a href="' + jd_user_item_url + '?user_id=' + booking.Booking_user_id + '" target="_blank">' + username + '</a></td>' +
                                        '<td class="status">' + booking.Booking_status + '</td>' +
                                        '<td class="paymentType">' + booking.Booking_paymentType + '</td>';
                                    if (affiliate !== '') {
                                        html += '<td class="affiliate"><a href="' + jd_user_item_url + '?user_id=' + booking.Booking_affiliate + '" target="_blank">' + affiliate + '</a></td></tr>';
                                    } else {
                                        html += '<td class="affiliate"></td></tr>';
                                    }
                                });
                                table_body.html(html);

                                if ($.fn.dataTable.isDataTable('#table_bookings')) {
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
                                var form_tab = document.getElementById('booking_search_form');
                                var result_tab = document.getElementById('booking_search_result');
                                var f_tab = document.getElementById('booking_search_form_tab');
                                var r_tab = document.getElementById('booking_search_result_tab');
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
    $scope.BookingID = '';

    $scope.$watch('BookingID', function () {
        // console.log('bi', $scope.BookingID, $scope.bookingForm.booking_id_input);
    });

    var search_fields = {
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
        },
        Payment: {
            id: {
                id: 'payment_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'paymentID',
                actual: true
            },
            user_id: {
                id: 'payment_user_id_select',
                type: 'numeric',
                operator: 'eq',
                model: 'paymentUser',
                actual: true
            },
            description: {
                id: 'payment_description_input',
                type: 'string',
                operator: {
                    name: 'payment_description',
                    like: 'payment_description_like',
                    eq: 'payment_description_eq'
                },
                model: 'paymentDescription',
                actual: true
            },
            type: {
                id: 'payment_type_select',
                type: 'numeric',
                operator: 'eq',
                model: 'paymentType',
                actual: true
            },
            date: {
                id: 'payment_date_input',
                type: 'date',
                operator: {
                    name: 'payment_date',
                    lt: 'payment_date_lt',
                    gt: 'payment_date_gt',
                    eq: 'payment_date_eq'
                },
                model: 'paymentDate',
                actual: true
            },
            senderName: {
                id: 'payment_sender_name_input',
                type: 'string',
                operator: {
                    name: 'payment_sender_name',
                    like: 'payment_sender_name_like',
                    eq: 'payment_sender_name_eq'
                },
                model: 'paymentSenderName',
                actual: true
            },
            senderAccount: {
                id: 'payment_sender_account_input',
                type: 'string',
                operator: {
                    name: 'payment_sender_account',
                    like: 'payment_sender_account_like',
                    eq: 'payment_sender_account_eq'
                },
                model: 'paymentSenderAccount',
                actual: true
            },
            senderBank: {
                id: 'payment_sender_bank_input',
                type: 'string',
                operator: {
                    name: 'payment_sender_bank',
                    like: 'payment_sender_bank_like',
                    eq: 'payment_sender_bank_eq'
                },
                model: 'paymentSenderBank',
                actual: true
            }
        },
        User: {
            id: {
                id: 'user_id_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'userID',
                actual: true
            },
            firstName: {
                id: 'user_id_first_name_input',
                type: 'string',
                operator: {
                    name: 'user_id_first_name',
                    like: 'user_id_first_name_like',
                    eq: 'user_id_first_name_eq'
                },
                model: 'userFirstName',
                actual: true
            },
            lastName: {
                id: 'user_id_last_name_input',
                type: 'string',
                operator: {
                    name: 'user_id_last_name',
                    like: 'user_id_last_name_like',
                    eq: 'user_id_last_name_eq"'
                },
                model: 'userLastName',
                actual: true
            },
            email: {
                id: 'user_id_email_input',
                type: 'string',
                operator: {
                    name: 'user_id_email',
                    like: 'user_id_email_like',
                    eq: 'user_id_email_eq'
                },
                model: 'userEmail',
                actual: true
            },
            address1: {
                id: 'user_id_address1_input',
                type: 'string',
                operator: {
                    name: 'user_id_address1',
                    like: 'user_id_address1_like',
                    eq: 'user_id_address1_eq'
                },
                model: 'userAddress1',
                actual: true
            },
            address2: {
                id: 'user_id_address2_input',
                type: 'string',
                operator: {
                    name: 'user_id_address2',
                    like: 'user_id_address2_like',
                    eq: 'user_id_address1_eq'
                },
                model: 'userAddress2',
                actual: true
            },
            city: {
                id: 'user_id_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'userCity',
                actual: true
            },
            postCode: {
                id: 'user_id_post_code_input',
                type: 'string',
                operator: {
                    name: 'user_id_post_code',
                    like: 'user_id_post_code_like',
                    eq: 'user_id_post_code_eq'
                },
                model: 'userPostCode',
                actual: true
            },
            phone: {
                id: 'user_id_phone_input',
                type: 'string',
                operator: {
                    name: 'user_id_phone',
                    like: 'user_id_phone_like',
                    eq: 'user_id_phone_eq'
                },
                model: 'userPhone',
                actual: true
            },
            mobile: {
                id: 'user_id_mobile_input',
                type: 'string',
                operator: {
                    name: 'user_id_mobile',
                    like: 'user_id_mobile_like',
                    eq: 'user_id_mobile_eq'
                },
                model: 'userMobile',
                actual: true
            },
            language: {
                id: 'user_id_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'userLanguage',
                actual: true
            },
            creationDate: {
                id: 'user_id_creation_date_input',
                type: 'date',
                operator: {
                    name: 'user_id_creation_date',
                    lt: 'user_id_creation_date_lt',
                    gt: 'user_id_creation_date_gt',
                    eq: 'user_id_creation_date_eq'
                },
                model: 'userCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'user_id_modified_date_input',
                type: 'date',
                operator: {
                    name: 'user_id_modified_date',
                    lt: 'user_id_modified_date_lt',
                    gt: 'user_id_modified_date_gt',
                    eq: 'user_id_modified_date_eq'
                },
                model: 'userModifiedDate',
                actual: true
            }
        },
        BookingItems: {
            id: {
                id: 'booking_items_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingItemsID',
                actual: true
            },
            startDate: {
                id: 'booking_items_start_date_input',
                type: 'date',
                operator: {
                    name: 'booking_items_start_date',
                    lt: 'booking_items_start_date_lt',
                    gt: 'booking_items_start_date_gt',
                    eq: 'booking_items_start_date_eq'
                },
                model: 'bookingItemsStartDate',
                actual: true
            },
            endDate: {
                id: 'booking_items_end_date_input',
                type: 'date',
                operator: {
                    name: 'booking_items_end_date',
                    lt: 'booking_items_end_date_lt',
                    gt: 'booking_items_end_date_gt',
                    eq: 'booking_items_end_date_eq'
                },
                model: 'bookingItemsEndDate',
                actual: true
            },
            slots: {
                id: 'booking_items_slots_input',
                type: 'date',
                operator: {
                    name: 'booking_items_slots',
                    lt: 'booking_items_slots_lt',
                    gt: 'booking_items_slots_gt',
                    eq: 'booking_items_slots_eq'
                },
                model: 'bookingItemsSlots',
                actual: true
            },
            details: {
                id: 'booking_items_details_input',
                type: 'string',
                operator: {
                    name: 'booking_items_details',
                    like: 'booking_items_details_like',
                    eq: 'booking_items_details_eq'
                },
                model: 'bookingItemsDetails',
                actual: true
            },
            finalPrice: {
                id: 'booking_items_final_price_input',
                type: 'numeric',
                operator: {
                    name: 'booking_items_final_price',
                    lt: 'booking_items_final_price_lt',
                    gt: 'booking_items_final_price_gt',
                    eq: 'booking_items_final_price_eq'
                },
                model: 'bookingItemsFinalPrice',
                actual: true
            },
            isChild: {
                id: 'booking_items_child_input',
                type: 'string',
                operator: 'eq',
                model: 'bookingItemsChild',
                actual: true
            },
            isStudent: {
                id: 'booking_items_student_input',
                type: 'string',
                operator: 'eq',
                model: 'bookingItemsStudent',
                actual: true
            }
        },
        Affiliate: {
            id: {
                id: 'affiliate_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateID',
                actual: true
            },
            firstName: {
                id: 'affiliate_first_name_input',
                type: 'string',
                operator: {
                    name: 'affiliate_first_name',
                    like: 'affiliate_first_name_like',
                    eq: 'affiliate_first_name_eq'
                },
                model: 'affiliateFirstName',
                actual: true
            },
            lastName: {
                id: 'affiliate_last_name_input',
                type: 'string',
                operator: {
                    name: 'affiliate_last_name',
                    like: 'affiliate_last_name_like',
                    eq: 'affiliate_last_name_eq"'
                },
                model: 'affiliateLastName',
                actual: true
            },
            email: {
                id: 'affiliate_email_input',
                type: 'string',
                operator: {
                    name: 'affiliate_email',
                    like: 'affiliate_email_like',
                    eq: 'affiliate_email_eq'
                },
                model: 'affiliateEmail',
                actual: true
            },
            address1: {
                id: 'affiliate_address1_input',
                type: 'string',
                operator: {
                    name: 'affiliate_address1',
                    like: 'affiliate_address1_like',
                    eq: 'affiliate_address1_eq'
                },
                model: 'affiliateAddress1',
                actual: true
            },
            address2: {
                id: 'affiliate_address2_input',
                type: 'string',
                operator: {
                    name: 'affiliate_address2',
                    like: 'affiliate_address2_like',
                    eq: 'affiliate_address1_eq'
                },
                model: 'affiliateAddress2',
                actual: true
            },
            city: {
                id: 'affiliate_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateCity',
                actual: true
            },
            postCode: {
                id: 'affiliate_post_code_input',
                type: 'string',
                operator: {
                    name: 'affiliate_post_code',
                    like: 'affiliate_post_code_like',
                    eq: 'affiliate_post_code_eq'
                },
                model: 'affiliatePostCode',
                actual: true
            },
            phone: {
                id: 'affiliate_phone_input',
                type: 'string',
                operator: {
                    name: 'affiliate_phone',
                    like: 'affiliate_phone_like',
                    eq: 'affiliate_phone_eq'
                },
                model: 'affiliatePhone',
                actual: true
            },
            mobile: {
                id: 'affiliate_mobile_input',
                type: 'string',
                operator: {
                    name: 'affiliate_mobile',
                    like: 'affiliate_mobile_like',
                    eq: 'affiliate_mobile_eq'
                },
                model: 'affiliateMobile',
                actual: true
            },
            language: {
                id: 'affiliate_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateLanguage',
                actual: true
            },
            creationDate: {
                id: 'affiliate_creation_date_input',
                type: 'date',
                operator: {
                    name: 'affiliate_creation_date',
                    lt: 'affiliate_creation_date_lt',
                    gt: 'affiliate_creation_date_gt',
                    eq: 'affiliate_creation_date_eq'
                },
                model: 'affiliateCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'affiliate_modified_date_input',
                type: 'date',
                operator: {
                    name: 'affiliate_modified_date',
                    lt: 'affiliate_modified_date_lt',
                    gt: 'affiliate_modified_date_gt',
                    eq: 'affiliate_modified_date_eq'
                },
                model: 'affiliateModifiedDate',
                actual: true
            }
        },
        Resellers: {
            id: {
                id: 'reseller_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'resellerID',
                actual: true
            },
            firstName: {
                id: 'reseller_first_name_input',
                type: 'string',
                operator: {
                    name: 'reseller_first_name',
                    like: 'reseller_first_name_like',
                    eq: 'reseller_first_name_eq'
                },
                model: 'resellerFirstName',
                actual: true
            },
            lastName: {
                id: 'reseller_last_name_input',
                type: 'string',
                operator: {
                    name: 'reseller_last_name',
                    like: 'reseller_last_name_like',
                    eq: 'reseller_last_name_eq"'
                },
                model: 'resellerLastName',
                actual: true
            },
            email: {
                id: 'reseller_email_input',
                type: 'string',
                operator: {
                    name: 'reseller_email',
                    like: 'reseller_email_like',
                    eq: 'reseller_email_eq'
                },
                model: 'resellerEmail',
                actual: true
            },
            address1: {
                id: 'reseller_address1_input',
                type: 'string',
                operator: {
                    name: 'reseller_address1',
                    like: 'reseller_address1_like',
                    eq: 'reseller_address1_eq'
                },
                model: 'resellerAddress1',
                actual: true
            },
            address2: {
                id: 'reseller_address2_input',
                type: 'string',
                operator: {
                    name: 'reseller_address2',
                    like: 'reseller_address2_like',
                    eq: 'reseller_address1_eq'
                },
                model: 'resellerAddress2',
                actual: true
            },
            city: {
                id: 'reseller_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateCity',
                actual: true
            },
            postCode: {
                id: 'reseller_post_code_input',
                type: 'string',
                operator: {
                    name: 'reseller_post_code',
                    like: 'reseller_post_code_like',
                    eq: 'reseller_post_code_eq'
                },
                model: 'resellerPostCode',
                actual: true
            },
            phone: {
                id: 'reseller_phone_input',
                type: 'string',
                operator: {
                    name: 'reseller_phone',
                    like: 'reseller_phone_like',
                    eq: 'reseller_phone_eq'
                },
                model: 'resellerPhone',
                actual: true
            },
            mobile: {
                id: 'reseller_mobile_input',
                type: 'string',
                operator: {
                    name: 'reseller_mobile',
                    like: 'reseller_mobile_like',
                    eq: 'reseller_mobile_eq'
                },
                model: 'resellerMobile',
                actual: true
            },
            language: {
                id: 'reseller_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateLanguage',
                actual: true
            },
            creationDate: {
                id: 'reseller_creation_date_input',
                type: 'date',
                operator: {
                    name: 'reseller_creation_date',
                    lt: 'reseller_creation_date_lt',
                    gt: 'reseller_creation_date_gt',
                    eq: 'reseller_creation_date_eq'
                },
                model: 'resellerCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'reseller_modified_date_input',
                type: 'date',
                operator: {
                    name: 'reseller_modified_date',
                    lt: 'reseller_modified_date_lt',
                    gt: 'reseller_modified_date_gt',
                    eq: 'reseller_modified_date_eq'
                },
                model: 'resellerModifiedDate',
                actual: true
            }
        }
    };

    array.forEach(function (show) {
        $scope[show] = false;
    });

    function getShowButton() {
        return ($scope.showBooking
            || $scope.showPayment
            || $scope.showUser
            || $scope.showBookingItems
            || $scope.showAffiliate
            || $scope.showResellers
        );
    }

    $scope.showButton = getShowButton();


    array.forEach(function (show) {
        $scope.$watch(show, function () {
            $scope.showButton = getShowButton();
        });
    });

    var users = [
        {
            field: 'firstName',
            selector: '#user_id_first_name_input'
        },
        {
            field: 'lastName',
            selector: '#user_id_last_name_input'
        },
        {
            field: 'email',
            selector: '#user_id_email_input'
        },
        {
            field: 'address1',
            selector: '#user_id_address1_input'
        },
        {
            field: 'address2',
            selector: '#user_id_address2_input'
        },
        {
            field: 'phone',
            selector: '#user_id_phone_input'
        },
        {
            field: 'mobile',
            selector: '#user_id_mobile_input'
        },
        {
            field: 'firstName',
            selector: '#affiliate_first_name_input'
        },
        {
            field: 'lastName',
            selector: '#affiliate_last_name_input'
        },
        {
            field: 'email',
            selector: '#affiliate_email_input'
        },
        {
            field: 'address1',
            selector: '#affiliate_address1_input'
        },
        {
            field: 'address2',
            selector: '#affiliate_address2_input'
        },
        {
            field: 'phone',
            selector: '#affiliate_phone_input'
        },
        {
            field: 'mobile',
            selector: '#affiliate_mobile_input'
        },
        {
            field: 'firstName',
            selector: '#reseller_first_name_input'
        },
        {
            field: 'lastName',
            selector: '#reseller_last_name_input'
        },
        {
            field: 'email',
            selector: '#reseller_email_input'
        },
        {
            field: 'address1',
            selector: '#reseller_address1_input'
        },
        {
            field: 'address2',
            selector: '#reseller_address2_input'
        },
        {
            field: 'phone',
            selector: '#reseller_phone_input'
        },
        {
            field: 'mobile',
            selector: '#reseller_mobile_input'
        }
    ];

    var bookingsItems = [
        {
            field: 'slots',
            selector: '#booking_items_slots_input'
        },
        {
            field: 'details',
            selector: '#booking_items_details_input'
        },
        {
            field: 'finalPrice',
            selector: '#booking_items_final_price_input'
        }
    ];


    jd_rest_awesomplete_mass(
        'email',
        'users',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        users,
        $scope
    );


    jd_rest_awesomplete_mass(
        'id',
        'bookingsItems',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=booking-items',
        bookingsItems,
        $scope
    );

    jd_rest_awesomplete(
        'description',
        'payments',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=payments',
        '#payment_description_input',
        $scope
    );


    // FILL

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
        var buttons = document.getElementById('booking_search_container');
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

        var form = document.getElementById('rest_booking_search_form');
        if (form) {
            form.addEventListener('submit', function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                var setting_array = search_compiler.conditions(search_fields);
                var search_url = search_compiler.parse(setting_array);
                console.log('uri', search_url);
                search_compiler.send(search_url);
                return false;
            })
        }
    });
});