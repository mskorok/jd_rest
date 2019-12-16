var $ = jQuery.noConflict();
var app = angular.module('userSearch', []);
app.controller('searchCtr', function ($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    var array = [
        'showUser',
        'showAffiliates',
        'showAutoresponder',
        'showBooking',
        'showComments',
        'showCompany',
        'showCountry',
        'showImage',
        'showMessageReceived',
        'showMessageSent',
        'showPayment',
        'showProduct',
        'showProviderType',
        'showReports',
        'showResellerBookings',
        'showReview',
        'showRoles',
        'showUserCity',
        'showUserLanguage'
    ];

    var url = jd_rest_host + '?action=jourday_ajax_get_content&method=GET&url=users/search?where=';

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
            form = $scope.userForm;
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

            return url + string + '%26include=Roles,Image,Company,Product,ProviderType,UserCity,UserToRole,UserLanguage';
        },
        send: function (url) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            if (response.data.result) {
                                var table_body = $('#table_body');
                                var table = $('#table_users');
                                table_body.html('');
                                if ($.fn.dataTable.isDataTable('#table_users')) {
                                    table.DataTable().destroy();
                                }
                                var html = '';
                                [].forEach.call(response.data.result, function (user) {
                                    html += '<tr>' +
                                        '<td class="id">' + user.User_id + '</td>' +
                                        '<td class="name"><a href="' + jd_user_item_url + '?user_id=' + user.User_id + '" target="_blank"> ' + user.User_firstName + '</a></td>' +
                                        '<td class="surname"><a href="' + jd_user_item_url + '?user_id=' + user.User_id + '" target="_blank"> ' + user.User_lastName + '</a></td>' +
                                        '<td class="email">' + user.User_email + '</td></tr>'
                                });
                                table_body.html(html);

                                if ($.fn.dataTable.isDataTable('#table_users')) {
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
                                var form_tab = document.getElementById('user_search_form');
                                var result_tab = document.getElementById('user_search_result');
                                var f_tab = document.getElementById('user_search_form_tab');
                                var r_tab = document.getElementById('user_search_result_tab');
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
        Affiliates: {
            id: {
                id: 'affiliates_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliatesID',
                actual: true
            },
            firstName: {
                id: 'affiliates_first_name_input',
                type: 'string',
                operator: {
                    name: 'affiliates_first_name',
                    like: 'affiliates_first_name_like',
                    eq: 'affiliates_first_name_eq'
                },
                model: 'affiliatesFirstName',
                actual: true
            },
            lastName: {
                id: 'affiliates_last_name_input',
                type: 'string',
                operator: {
                    name: 'affiliates_last_name',
                    like: 'affiliates_last_name_like',
                    eq: 'affiliates_last_name_eq"'
                },
                model: 'affiliatesLastName',
                actual: true
            },
            email: {
                id: 'affiliates_email_input',
                type: 'string',
                operator: {
                    name: 'affiliates_email',
                    like: 'affiliates_email_like',
                    eq: 'affiliates_email_eq'
                },
                model: 'affiliatesEmail',
                actual: true
            },
            address1: {
                id: 'affiliates_address1_input',
                type: 'string',
                operator: {
                    name: 'affiliates_address1',
                    like: 'affiliates_address1_like',
                    eq: 'affiliates_address1_eq'
                },
                model: 'affiliatesAddress1',
                actual: true
            },
            address2: {
                id: 'affiliates_address2_input',
                type: 'string',
                operator: {
                    name: 'affiliates_address2',
                    like: 'affiliates_address2_like',
                    eq: 'affiliates_address1_eq'
                },
                model: 'affiliatesAddress2',
                actual: true
            },
            city: {
                id: 'affiliates_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateCity',
                actual: true
            },
            postCode: {
                id: 'affiliates_post_code_input',
                type: 'string',
                operator: {
                    name: 'affiliates_post_code',
                    like: 'affiliates_post_code_like',
                    eq: 'affiliates_post_code_eq'
                },
                model: 'affiliatesPostCode',
                actual: true
            },
            phone: {
                id: 'affiliates_phone_input',
                type: 'string',
                operator: {
                    name: 'affiliates_phone',
                    like: 'affiliates_phone_like',
                    eq: 'affiliates_phone_eq'
                },
                model: 'affiliatesPhone',
                actual: true
            },
            mobile: {
                id: 'affiliates_mobile_input',
                type: 'string',
                operator: {
                    name: 'affiliates_mobile',
                    like: 'affiliates_mobile_like',
                    eq: 'affiliates_mobile_eq'
                },
                model: 'affiliatesMobile',
                actual: true
            },
            language: {
                id: 'affiliates_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateLanguage',
                actual: true
            },
            creationDate: {
                id: 'affiliates_creation_date_input',
                type: 'date',
                operator: {
                    name: 'affiliates_creation_date',
                    lt: 'affiliates_creation_date_lt',
                    gt: 'affiliates_creation_date_gt',
                    eq: 'affiliates_creation_date_eq'
                },
                model: 'affiliatesCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'affiliates_modified_date_input',
                type: 'date',
                operator: {
                    name: 'affiliates_modified_date',
                    lt: 'affiliates_modified_date_lt',
                    gt: 'affiliates_modified_date_gt',
                    eq: 'affiliates_modified_date_eq'
                },
                model: 'affiliatesModifiedDate',
                actual: true
            }
        },
        Autoresponder: {
            id: {
                id: 'autoresponder_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'autoresponderID',
                actual: true
            },
            title: {
                id: 'autoresponder_title_input',
                type: 'string',
                operator: {
                    name: 'autoresponder_title',
                    like: 'autoresponder_title_like',
                    eq: 'autoresponder_title_eq'
                },
                model: 'autoresponderTitle',
                actual: true
            },
            description: {
                id: 'autoresponder_description_input',
                type: 'string',
                operator: {
                    name: 'autoresponder_description',
                    like: 'autoresponder_description_like',
                    eq: 'autoresponder_description_eq'
                },
                model: 'autoresponderDescription',
                actual: true
            },
            text: {
                id: 'autoresponder_text_input',
                type: 'string',
                operator: {
                    name: 'autoresponder_text',
                    like: 'autoresponder_text_like',
                    eq: 'autoresponder_text_eq'
                },
                model: 'autoresponderText',
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
        },
        UserCity: {
            id: {
                id: 'city_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'cityID',
                actual: true
            },
            name: {
                id: 'city_name_input',
                type: 'string',
                operator: {
                    name: 'city_name',
                    like: 'city_name_like',
                    eq: 'city_name_eq'
                },
                model: 'cityName',
                actual: true
            },
            country: {
                id: 'city_country_select',
                type: 'numeric',
                operator: 'eq',
                model: 'cityCountry',
                actual: true
            },
            postCode: {
                id: 'city_post_code_input',
                type: 'string',
                operator: {
                    name: 'city_post_code',
                    like: 'city_post_code_like',
                    eq: 'city_post_code_eq'
                },
                model: 'cityPostCode',
                actual: true
            }
        },
        Comments: {
            id: {
                id: 'comments_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'commentsID',
                actual: true
            },
            title: {
                id: 'comments_title_input',
                type: 'string',
                operator: {
                    name: 'comments_title',
                    like: 'comments_title_like',
                    eq: 'comments_title_eq'
                },
                model: 'commentsTitle',
                actual: true
            },
            subtitle: {
                id: 'comments_subtitle_input',
                type: 'string',
                operator: {
                    name: 'comments_subtitle',
                    like: 'comments_subtitle_like',
                    eq: 'comments_subtitle_eq'
                },
                model: 'commentsSubtitle',
                actual: true
            },
            text: {
                id: 'comments_text_input',
                type: 'string',
                operator: {
                    name: 'comments_text',
                    like: 'comments_text_like',
                    eq: 'comments_text_eq'
                },
                model: 'commentsText',
                actual: true
            },
            createDate: {
                id: 'comments_create_date_input',
                type: 'date',
                operator: {
                    name: 'comments_create_date',
                    lt: 'comments_create_date_lt',
                    gt: 'comments_create_date_lt',
                    eq: 'comments_create_date_lt'
                },
                model: 'commentsCreateDate',
                actual: true
            }
        },
        Company: {
            id: {
                id: 'company_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'companyID',
                actual: true
            },
            companyName: {
                id: 'company_company_name_input',
                type: 'string',
                operator: {
                    name: 'company_company_name',
                    like: 'company_company_name_like',
                    eq: 'company_company_name_eq'
                },
                model: 'companyName',
                actual: true
            },
            contactPerson: {
                id: 'company_contact_person_input',
                type: 'string',
                operator: {
                    name: 'company_contact_person',
                    like: 'company_contact_person_like',
                    eq: 'company_contact_person_eq'
                },
                model: 'companyContactPerson',
                actual: true
            },
            companyAddress: {
                id: 'company_company_address_input',
                type: 'string',
                operator: {
                    name: 'company_company_address',
                    like: 'company_company_address_like',
                    eq: 'company_company_address_eq'
                },
                model: 'companyAddress',
                actual: true
            },
            companyCity: {
                id: 'company_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'companyCity',
                actual: true
            },
            registrationNumber: {
                id: 'company_registration_number_input',
                type: 'string',
                operator: {
                    name: 'company_registration_number',
                    like: 'company_registration_number_like',
                    eq: 'company_registration_number_eq'
                },
                model: 'companyRegistrationNumber',
                actual: true
            },
            vatNumber: {
                id: 'company_vat_number_input',
                type: 'string',
                operator: {
                    name: 'company_vat_number',
                    like: 'company_vat_number_like',
                    eq: 'company_vat_number_eq'
                },
                model: 'companyVatNumber',
                actual: true
            },
            companyPhone: {
                id: 'company_company_phone_input',
                type: 'string',
                operator: {
                    name: 'company_company_phone',
                    like: 'company_company_phone_like',
                    eq: 'company_company_phone_eq'
                },
                model: 'companyCompanyPhone',
                actual: true
            },
            companyMobile: {
                id: 'company_company_mobile_input',
                type: 'string',
                operator: {
                    name: 'company_company_mobile',
                    like: 'company_company_mobile_like',
                    eq: 'company_company_mobile_eq'
                },
                model: 'companyCompanyMobile',
                actual: true
            },
            fax: {
                id: 'company_fax_input',
                type: 'string',
                operator: {
                    name: 'company_fax',
                    like: 'company_fax_like',
                    eq: 'company_fax_eq'
                },
                model: 'companyFax',
                actual: true
            },
            companyEmail: {
                id: 'company_company_email_input',
                type: 'string',
                operator: {
                    name: 'company_company_email',
                    like: 'company_company_email_like',
                    eq: 'company_company_email_eq'
                },
                model: 'companyCompanyEmail',
                actual: true
            },
            site: {
                id: 'company_site_input',
                type: 'string',
                operator: {
                    name: 'company_site',
                    like: 'company_site_like',
                    eq: 'company_site_eq'
                },
                model: 'companySite',
                actual: true
            }
        },
        Country: {
            id: {
                id: 'country_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'countryID',
                actual: true
            },
            name: {
                id: 'country_name_input',
                type: 'string',
                operator: {
                    name: 'country_name',
                    like: 'country_name_like',
                    eq: 'country_name_eq'
                },
                model: 'countryName',
                actual: true
            },
            description: {
                id: 'country_description_input',
                type: 'string',
                operator: {
                    name: 'country_description',
                    like: 'country_description_like',
                    eq: 'country_description_eq'
                },
                model: 'countryDescription',
                actual: true
            }
        },
        UserLanguage: {
            id: {
                id: 'language_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'languageID',
                actual: true
            },
            name: {
                id: 'language_name_input',
                type: 'string',
                operator: {
                    name: 'language_name',
                    like: 'language_name_like',
                    eq: 'language_name_eq'
                },
                model: 'languageName',
                actual: true
            }
        },
        MessageReceived: {
            id: {
                id: 'message_received_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'messageReceivedID',
                actual: true
            },
            sender: {
                id: 'message_received_sender_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageReceivedSender',
                actual: true
            },
            recipient: {
                id: 'message_received_recipient_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageReceivedRecipient',
                actual: true
            },
            sentDate: {
                id: 'message_received_sent_date_input',
                type: 'date',
                operator: {
                    name: 'message_received_sent_date',
                    lt: 'message_received_sent_date_lt',
                    gt: 'message_received_sent_date_gt',
                    eq: 'message_received_sent_date_eq'
                },
                model: 'messageReceivedSentDate',
                actual: true
            },
            readDate: {
                id: 'message_received_read_date_input',
                type: 'date',
                operator: {
                    name: 'message_received_read_date',
                    lt: 'message_received_read_date_lt',
                    gt: 'message_received_read_date_gt',
                    eq: 'message_received_read_date_eq'
                },
                model: 'messageReceivedReadDate',
                actual: true
            },
            title: {
                id: 'message_received_title_input',
                type: 'string',
                operator: {
                    name: 'message_received_title',
                    like: 'message_received_title_like',
                    eq: 'message_received_title_eq'
                },
                model: 'messageReceivedTitle',
                actual: true
            },
            content: {
                id: 'message_received_content_input',
                type: 'string',
                operator: {
                    name: 'message_received_content',
                    like: 'message_received_content_like',
                    eq: 'message_received_content_eq'
                },
                model: 'messageReceivedContent',
                actual: true
            },
            category: {
                id: 'message_received_category_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageReceivedCategory',
                actual: true
            },
            sendMethod: {
                id: 'message_received_send_method_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageReceivedSendMethod',
                actual: true
            }
        },
        MessageSent: {
            id: {
                id: 'message_sent_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'messageSentID',
                actual: true
            },
            sender: {
                id: 'message_sent_sender_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageSentSender',
                actual: true
            },
            recipient: {
                id: 'message_sent_recipient_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageSentRecipient',
                actual: true
            },
            sentDate: {
                id: 'message_sent_sent_date_input',
                type: 'date',
                operator: {
                    name: 'message_sent_sent_date',
                    lt: 'message_sent_sent_date_lt',
                    gt: 'message_sent_sent_date_gt',
                    eq: 'message_sent_sent_date_eq'
                },
                model: 'messageSentSentDate',
                actual: true
            },
            readDate: {
                id: 'message_sent_read_date_input',
                type: 'date',
                operator: {
                    name: 'message_sent_read_date',
                    lt: 'message_sent_read_date_lt',
                    gt: 'message_sent_read_date_gt',
                    eq: 'message_sent_read_date_eq'
                },
                model: 'messageSentReadDate',
                actual: true
            },
            title: {
                id: 'message_sent_title_input',
                type: 'string',
                operator: {
                    name: 'message_sent_title',
                    like: 'message_sent_title_like',
                    eq: 'message_sent_title_eq'
                },
                model: 'messageSentTitle',
                actual: true
            },
            content: {
                id: 'message_sent_content_input',
                type: 'string',
                operator: {
                    name: 'message_sent_content',
                    like: 'message_sent_content_like',
                    eq: 'message_sent_content_eq'
                },
                model: 'messageSentContent',
                actual: true
            },
            category: {
                id: 'message_sent_category_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageSentCategory',
                actual: true
            },
            sendMethod: {
                id: 'message_sent_send_method_select',
                type: 'numeric',
                operator: 'eq',
                model: 'messageSentSendMethod',
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
        Product: {
            id: {
                id: 'product_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productID',
                actual: true
            },
            name: {
                id: 'product_name_input',
                type: 'string',
                operator: {
                    name: 'product_name_like',
                    like: 'product_name_like',
                    eq: 'product_name_eq'
                },
                model: 'productName',
                actual: true
            },
            provider_id: {
                id: 'product_provider_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productProvider',
                actual: true
            },
            category: {
                id: 'product_category_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productCategory',
                actual: true
            }
        },
        ProviderType: {
            id: {
                id: 'provider_type_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'providerTypeID',
                actual: true
            },
            category: {
                id: 'provider_type_type_select',
                type: 'numeric',
                operator: 'eq',
                model: 'providerTypeType',
                actual: true
            }
        },
        Reports: {
            id: {
                id: 'reports_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'reportsID',
                actual: true
            },
            title: {
                id: 'reports_title_input',
                type: 'string',
                operator: {
                    name: 'reports_title',
                    like: 'reports_title_like',
                    eq: 'reports_title_eq'
                },
                model: 'reportsTitle',
                actual: true
            },
            description: {
                id: 'reports_description_input',
                type: 'string',
                operator: {
                    name: 'reports_description',
                    like: 'reports_description_like',
                    eq: 'reports_description_eq'
                },
                model: '',
                actual: true
            },
            text: {
                id: 'reports_text_input',
                type: 'string',
                operator: {
                    name: 'reports_text',
                    like: 'reports_text_like',
                    eq: 'reports_text_eq'
                },
                model: 'reportsDescription',
                actual: true
            },
            createDate: {
                id: 'reports_create_date_input',
                type: 'date',
                operator: {
                    name: 'reports_create_date',
                    lt: 'reports_create_date_lt',
                    gt: 'reports_create_date_gt',
                    eq: 'reports_create_date_eq'
                },
                model: 'reportsText',
                actual: true
            }
        },
        Review: {
            id: {
                id: 'review_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'reviewID',
                actual: true
            },
            title: {
                id: 'review_title_input',
                type: 'string',
                operator: {
                    name: 'review_title',
                    like: 'review_title_like',
                    eq: 'review_title_eq'
                },
                model: 'reviewTitle',
                actual: true
            },
            subtitle: {
                id: 'review_subtitle_input',
                type: 'string',
                operator: {
                    name: 'review_subtitle',
                    like: 'review_subtitle_like',
                    eq: 'review_subtitle_eq'
                },
                model: 'reviewSubtitle',
                actual: true
            },
            text: {
                id: 'review_text_input',
                type: 'string',
                operator: {
                    name: 'review_text',
                    like: 'review_text_like',
                    eq: 'review_text_eq'
                },
                model: 'reviewText',
                actual: true
            },
            createDate: {
                id: 'review_create_date_input',
                type: 'date',
                operator: {
                    name: 'review_create_date',
                    lt: 'review_create_date_lt',
                    gt: 'review_create_date_gt',
                    eq: 'review_create_date_eq'
                },
                model: 'reviewCreateDate',
                actual: true
            }
        },
        ResellerBookings: {
            id: {
                id: 'reseller_booking_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'resellerBookingID',
                actual: true
            },
            bookingDate: {
                id: 'reseller_booking_booking_date_input',
                type: 'date',
                operator: {
                    name: 'reseller_booking_booking_date',
                    lt: 'reseller_booking_booking_date_lt',
                    gt: 'reseller_booking_booking_date_gt',
                    eq: 'reseller_booking_booking_date_eq'
                },
                model: 'resellerBookingBookingDate',
                actual: true
            },
            user_id: {
                id: 'reseller_booking_user_id_select',
                type: 'numeric',
                operator: 'eq',
                model: 'resellerBookingUser',
                actual: true
            },
            paymentType: {
                id: 'reseller_booking_payment_type_select',
                type: 'numeric',
                operator: 'eq',
                model: 'resellerBookingPaymentType',
                actual: true
            },
            affiliate: {
                id: 'reseller_booking_affiliate_select',
                type: 'numeric',
                operator: 'eq',
                model: 'resellerBookingAffiliate',
                actual: true
            }
        },
        Roles: {
            id: {
                id: 'role_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'rolesID',
                actual: true
            },
            name: {
                id: 'role_name_input',
                type: 'string',
                operator: {
                    name: 'role_name',
                    like: 'role_name_like',
                    eq: 'role_name_eq'
                },
                model: 'rolesName',
                actual: true
            },
            description: {
                id: 'role_description_input',
                type: 'string',
                operator: {
                    name: 'role_description',
                    like: 'role_description_like',
                    eq: 'role_description_eq'
                },
                model: 'rolesDescription',
                actual: true
            }
        }
    };

    array.forEach(function (show) {
        $scope[show] = false;
    });

    function getShowButton() {
        return ($scope.showUser || $scope.showAffiliates || $scope.showAutoresponder
            || $scope.showBooking || $scope.showComments || $scope.showCompany || $scope.showCountry
            || $scope.showImage || $scope.showMessageReceived || $scope.showMessageSent || $scope.showPayment
            || $scope.showProduct || $scope.showProviderType || $scope.showReports || $scope.showResellerBookings
            || $scope.showReview || $scope.showRoles || $scope.showUserCity
            || $scope.showUserLanguage);
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
            selector: '#affiliates_first_name_input'
        },
        {
            field: 'lastName',
            selector: '#affiliates_last_name_input'
        },
        {
            field: 'email',
            selector: '#affiliates_email_input'
        },
        {
            field: 'address1',
            selector: '#affiliates_address1_input'
        },
        {
            field: 'address2',
            selector: '#affiliates_address2_input'
        },
        {
            field: 'phone',
            selector: '#affiliates_phone_input'
        },
        {
            field: 'mobile',
            selector: '#affiliates_mobile_input'
        }
    ];

    var autoresponders = [
        {
            field: 'title',
            selector: '#autoresponder_title_input'
        },
        {
            field: 'description',
            selector: '#autoresponder_description_input'
        }
    ];

    var cities = [
        {
            field: 'name',
            selector: '#city_name_input'
        },
        {
            field: 'postCode',
            selector: '#city_post_code_input'
        }
    ];

    var comments = [
        {
            field: 'title',
            selector: '#comments_title_input'
        },
        {
            field: 'subtitle',
            selector: '#comments_subtitle_input'
        }
    ];

    var companies = [
        {
            field: 'companyName',
            selector: '#company_company_name_input'
        },
        {
            field: 'companyAddress',
            selector: '#company_company_address_input'
        },
        {
            field: 'registrationNumber',
            selector: '#company_registration_number_input'
        },
        {
            field: 'vatNumber',
            selector: '#company_vat_number_input'
        },
        {
            field: 'companyPhone',
            selector: '#company_company_phone_input'
        },
        {
            field: 'companyEmail',
            selector: '#company_company_email_input'
        },
        {
            field: 'site',
            selector: '#company_site_input'
        }
    ];

    var messages = [
        {
            field: 'title',
            selector: '#message_received_title_input'
        },
        {
            field: 'title',
            selector: '#message_sent_title_input'
        }
    ];

    var payments = [
        {
            field: 'description',
            selector: '#payment_description_input'
        },
        {
            field: 'senderName',
            selector: '#payment_sender_name_input'
        },
        {
            field: 'senderAccount',
            selector: '#payment_sender_account_input'
        },
        {
            field: 'senderBank',
            selector: '#payment_sender_bank_input'
        }
    ];

    var reviews = [
        {
            field: 'title',
            selector: '#review_title_input'
        },
        {
            field: 'subtitle',
            selector: '#review_subtitle_input'
        }
    ];

    var reports = [
        {
            field: 'title',
            selector: '#reports_title_input'
        },
        {
            field: 'description',
            selector: '#reports_description_input'
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
        'title',
        'autoresponders',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=autoresponders',
        autoresponders,
        $scope
    );

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'name',
            'cities',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=cities',
            cities,
            $scope
        );
        jd_rest_awesomplete_mass(
            'title',
            'comments',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=comments',
            comments,
            $scope
        );
    }, 200);

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'companyName',
            'companies',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=companies',
            companies,
            $scope
        );
        jd_rest_awesomplete(
            'name',
            'countries',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=countries',
            '#country_name_input',
            $scope
        );
    }, 700);


    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'title',
            'messages',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=messages',
            messages,
            $scope
        );
        jd_rest_awesomplete_mass(
            'id',
            'payments',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=payments',
            payments,
            $scope
        );
    }, 1200);


    setTimeout(function () {
        jd_rest_awesomplete(
            'name',
            'products',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=products',
            '#product_name_input',
            $scope
        );
        jd_rest_awesomplete_mass(
            'title',
            'reviews',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=reviews',
            reviews,
            $scope
        );
    }, 1600);

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'title',
            'reports',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=reports',
            reports,
            $scope
        );
        jd_rest_awesomplete(
            'name',
            'roles',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=roles',
            '#role_name_input',
            $scope
        );
        jd_rest_awesomplete(
            'name',
            'languages',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=languages',
            '#language_name_input',
            $scope
        );
    }, 2000);

    setTimeout(function () {
        jd_rest_fill_model(
            'name',
            'messengerCategories',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=messenger-category',
            $scope
        );
        jd_rest_fill_model(
            'name',
            'productCategories',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-categories',
            $scope
        );
    }, 2500);

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var buttons = document.getElementById('user_search_container');
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

        var form = document.getElementById('rest_user_search_form');
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