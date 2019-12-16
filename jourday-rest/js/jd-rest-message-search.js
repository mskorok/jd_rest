var $ = jQuery.noConflict();
var app = angular.module('messageSearch', []);
app.controller('searchCtr', function ($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    var array = [
        'showReceiver',
        'showAddresser',
        'showMessengerCategory',
        'showChildren',
        'showParent'
    ];


    var url = jd_rest_host + '?action=jourday_ajax_get_content&method=GET&url=messages/search?where=';

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
            form = $scope.messageForm;
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


            return url + string + '%26include=Receiver,Addresser,MessengerCategory';
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
                                var table = $('#table_messages');
                                table_body.html('');
                                if ($.fn.dataTable.isDataTable('#table_messages')) {
                                    table.DataTable().destroy();
                                }
                                var html = '';
                                var receiver, addresser, parent, read_date;
                                [].forEach.call(response.data.result, function (message) {

                                    parent = '';
                                    // receiver = message.Receiver.firstName + ' ' + message.Receiver.lastName;
                                    addresser = message.includes.Addresser[0].firstName + ' ' + message.includes.Addresser[0].lastName;
                                    read_date = (message.Message_readDate !== null) ? message.Message_readDate : '';

                                    html += '<tr>' +
                                        '<td class="id"><a href="' + jd_message_item_url + '?message_id=' + message.Message_id + '" target="_blank">' + message.Message_id + '</a></td>' +
                                        // '<td class="parent">' + parent + '</td>' +
                                        '<td class="sender"><a href="' + jd_user_item_url + '?user_id=' + message.includes.Addresser[0].id + '" target="_blank">' + addresser.slice(0, 30) + '</a></td>' +
                                        // '<td class="recipient"><a href="' + jd_user_item_url + '?user_id=' + message.Receiver.id + '" target="_blank">' + receiver.slice(0, 30) + '</a></td>' +
                                        '<td class="title">' + message.Message_title + '</td>' +
                                        '<td class="title">' + message.includes.MessengerCategory[0].name + '</td>' +
                                        '<td class="sentDate">' + message.Message_sentDate + '</td>' +
                                        '<td class="readDate">' + read_date + '</td></tr>'
                                });
                                table_body.html(html);

                                if ($.fn.dataTable.isDataTable('#table_messages')) {
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
                                var form_tab = document.getElementById('message_search_form');
                                var result_tab = document.getElementById('message_search_result');
                                var f_tab = document.getElementById('message_search_form_tab');
                                var r_tab = document.getElementById('message_search_result_tab');
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
        Receiver: {
            id: {
                id: 'receiver_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'receiverID',
                actual: true
            },
            firstName: {
                id: 'receiver_first_name_input',
                type: 'string',
                operator: {
                    name: 'receiver_first_name',
                    like: 'receiver_first_name_like',
                    eq: 'receiver_first_name_eq'
                },
                model: 'receiverFirstName',
                actual: true
            },
            lastName: {
                id: 'receiver_last_name_input',
                type: 'string',
                operator: {
                    name: 'receiver_last_name',
                    like: 'receiver_last_name_like',
                    eq: 'receiver_last_name_eq"'
                },
                model: 'receiverLastName',
                actual: true
            },
            email: {
                id: 'receiver_email_input',
                type: 'string',
                operator: {
                    name: 'receiver_email',
                    like: 'receiver_email_like',
                    eq: 'receiver_email_eq'
                },
                model: 'receiverEmail',
                actual: true
            },
            address1: {
                id: 'receiver_address1_input',
                type: 'string',
                operator: {
                    name: 'receiver_address1',
                    like: 'receiver_address1_like',
                    eq: 'receiver_address1_eq'
                },
                model: 'receiverAddress1',
                actual: true
            },
            address2: {
                id: 'receiver_address2_input',
                type: 'string',
                operator: {
                    name: 'receiver_address2',
                    like: 'receiver_address2_like',
                    eq: 'receiver_address1_eq'
                },
                model: 'receiverAddress2',
                actual: true
            },
            city: {
                id: 'receiver_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateCity',
                actual: true
            },
            postCode: {
                id: 'receiver_post_code_input',
                type: 'string',
                operator: {
                    name: 'receiver_post_code',
                    like: 'receiver_post_code_like',
                    eq: 'receiver_post_code_eq'
                },
                model: 'receiverPostCode',
                actual: true
            },
            phone: {
                id: 'receiver_phone_input',
                type: 'string',
                operator: {
                    name: 'receiver_phone',
                    like: 'receiver_phone_like',
                    eq: 'receiver_phone_eq'
                },
                model: 'receiverPhone',
                actual: true
            },
            mobile: {
                id: 'receiver_mobile_input',
                type: 'string',
                operator: {
                    name: 'receiver_mobile',
                    like: 'receiver_mobile_like',
                    eq: 'receiver_mobile_eq'
                },
                model: 'receiverMobile',
                actual: true
            },
            language: {
                id: 'receiver_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateLanguage',
                actual: true
            },
            creationDate: {
                id: 'receiver_creation_date_input',
                type: 'date',
                operator: {
                    name: 'receiver_creation_date',
                    lt: 'receiver_creation_date_lt',
                    gt: 'receiver_creation_date_gt',
                    eq: 'receiver_creation_date_eq'
                },
                model: 'receiverCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'receiver_modified_date_input',
                type: 'date',
                operator: {
                    name: 'receiver_modified_date',
                    lt: 'receiver_modified_date_lt',
                    gt: 'receiver_modified_date_gt',
                    eq: 'receiver_modified_date_eq'
                },
                model: 'receiverModifiedDate',
                actual: true
            }
        },
        Addresser: {
            id: {
                id: 'addresser_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'addresserID',
                actual: true
            },
            firstName: {
                id: 'addresser_first_name_input',
                type: 'string',
                operator: {
                    name: 'addresser_first_name',
                    like: 'addresser_first_name_like',
                    eq: 'addresser_first_name_eq'
                },
                model: 'addresserFirstName',
                actual: true
            },
            lastName: {
                id: 'addresser_last_name_input',
                type: 'string',
                operator: {
                    name: 'addresser_last_name',
                    like: 'addresser_last_name_like',
                    eq: 'addresser_last_name_eq"'
                },
                model: 'addresserLastName',
                actual: true
            },
            email: {
                id: 'addresser_email_input',
                type: 'string',
                operator: {
                    name: 'addresser_email',
                    like: 'addresser_email_like',
                    eq: 'addresser_email_eq'
                },
                model: 'addresserEmail',
                actual: true
            },
            address1: {
                id: 'addresser_address1_input',
                type: 'string',
                operator: {
                    name: 'addresser_address1',
                    like: 'addresser_address1_like',
                    eq: 'addresser_address1_eq'
                },
                model: 'addresserAddress1',
                actual: true
            },
            address2: {
                id: 'addresser_address2_input',
                type: 'string',
                operator: {
                    name: 'addresser_address2',
                    like: 'addresser_address2_like',
                    eq: 'addresser_address1_eq'
                },
                model: 'addresserAddress2',
                actual: true
            },
            city: {
                id: 'addresser_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateCity',
                actual: true
            },
            postCode: {
                id: 'addresser_post_code_input',
                type: 'string',
                operator: {
                    name: 'addresser_post_code',
                    like: 'addresser_post_code_like',
                    eq: 'addresser_post_code_eq'
                },
                model: 'addresserPostCode',
                actual: true
            },
            phone: {
                id: 'addresser_phone_input',
                type: 'string',
                operator: {
                    name: 'addresser_phone',
                    like: 'addresser_phone_like',
                    eq: 'addresser_phone_eq'
                },
                model: 'addresserPhone',
                actual: true
            },
            mobile: {
                id: 'addresser_mobile_input',
                type: 'string',
                operator: {
                    name: 'addresser_mobile',
                    like: 'addresser_mobile_like',
                    eq: 'addresser_mobile_eq'
                },
                model: 'addresserMobile',
                actual: true
            },
            language: {
                id: 'addresser_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'affiliateLanguage',
                actual: true
            },
            creationDate: {
                id: 'addresser_creation_date_input',
                type: 'date',
                operator: {
                    name: 'addresser_creation_date',
                    lt: 'addresser_creation_date_lt',
                    gt: 'addresser_creation_date_gt',
                    eq: 'addresser_creation_date_eq'
                },
                model: 'addresserCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'addresser_modified_date_input',
                type: 'date',
                operator: {
                    name: 'addresser_modified_date',
                    lt: 'addresser_modified_date_lt',
                    gt: 'addresser_modified_date_gt',
                    eq: 'addresser_modified_date_eq'
                },
                model: 'addresserModifiedDate',
                actual: true
            }
        },
        MessengerCategory: {
            id: {
                id: 'messenger_category_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'messengerCategoryID',
                actual: true
            },
            name: {
                id: 'messenger_category_id_input',
                type: 'string',
                operator: {
                    name: 'messenger_category_name',
                    like: 'messenger_category_name_like',
                    eq: 'messenger_category_name_eq'
                },
                model: 'messengerCategoryName',
                actual: true
            }
        },
        Children: {
            id: {
                id: 'children_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'childrenID',
                actual: true
            },
            sender: {
                id: 'children_sender_select',
                type: 'numeric',
                operator: 'eq',
                model: 'childrenSender',
                actual: true
            },
            recipient: {
                id: 'children_recipient_select',
                type: 'numeric',
                operator: 'eq',
                model: 'childrenRecipient',
                actual: true
            },
            sentDate: {
                id: 'children_sent_date_input',
                type: 'date',
                operator: {
                    name: 'children_sent_date',
                    lt: 'children_sent_date_lt',
                    gt: 'children_sent_date_gt',
                    eq: 'children_sent_date_eq'
                },
                model: 'childrenSentDate',
                actual: true
            },
            readDate: {
                id: 'children_read_date_input',
                type: 'date',
                operator: {
                    name: 'children_read_date',
                    lt: 'children_read_date_lt',
                    gt: 'children_read_date_gt',
                    eq: 'children_read_date_eq'
                },
                model: 'childrenReadDate',
                actual: true
            },
            title: {
                id: 'children_title_input',
                type: 'string',
                operator: {
                    name: 'children_title',
                    like: 'children_title_like',
                    eq: 'children_title_eq'
                },
                model: 'childrenTitle',
                actual: true
            },
            content: {
                id: 'children_content_input',
                type: 'string',
                operator: {
                    name: 'children_content',
                    like: 'children_content_like',
                    eq: 'children_content_eq'
                },
                model: 'childrenContent',
                actual: true
            },
            category: {
                id: 'children_category_select',
                type: 'numeric',
                operator: 'eq',
                model: 'childrenCategory',
                actual: true
            },
            sendMethod: {
                id: 'children_send_method_select',
                type: 'numeric',
                operator: 'eq',
                model: 'childrenSendMethod',
                actual: true
            }
        },
        Parent: {
            id: {
                id: 'parent_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'parentID',
                actual: true
            },
            sender: {
                id: 'parent_sender_select',
                type: 'numeric',
                operator: 'eq',
                model: 'parentSender',
                actual: true
            },
            recipient: {
                id: 'parent_recipient_select',
                type: 'numeric',
                operator: 'eq',
                model: 'parentRecipient',
                actual: true
            },
            sentDate: {
                id: 'parent_sent_date_input',
                type: 'date',
                operator: {
                    name: 'parent_sent_date',
                    lt: 'parent_sent_date_lt',
                    gt: 'parent_sent_date_gt',
                    eq: 'parent_sent_date_eq'
                },
                model: 'parentSentDate',
                actual: true
            },
            readDate: {
                id: 'parent_read_date_input',
                type: 'date',
                operator: {
                    name: 'parent_read_date',
                    lt: 'parent_read_date_lt',
                    gt: 'parent_read_date_gt',
                    eq: 'parent_read_date_eq'
                },
                model: 'parentReadDate',
                actual: true
            },
            title: {
                id: 'parent_title_input',
                type: 'string',
                operator: {
                    name: 'parent_title',
                    like: 'parent_title_like',
                    eq: 'parent_title_eq'
                },
                model: 'parentTitle',
                actual: true
            },
            content: {
                id: 'parent_content_input',
                type: 'string',
                operator: {
                    name: 'parent_content',
                    like: 'parent_content_like',
                    eq: 'parent_content_eq'
                },
                model: 'parentContent',
                actual: true
            },
            category: {
                id: 'parent_category_select',
                type: 'numeric',
                operator: 'eq',
                model: 'parentCategory',
                actual: true
            },
            sendMethod: {
                id: 'parent_send_method_select',
                type: 'numeric',
                operator: 'eq',
                model: 'parentSendMethod',
                actual: true
            }
        }
    };

    array.forEach(function (show) {
        $scope[show] = false;
    });

    function getShowButton() {
        return ($scope.showReceiver
            || $scope.showAddresser
            || $scope.showMessengerCategory
            || $scope.showChildren
            || $scope.showParent
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
            selector: '#addresser_first_name_input'
        },
        {
            field: 'lastName',
            selector: '#addresser_last_name_input'
        },
        {
            field: 'email',
            selector: '#addresser_email_input'
        },
        {
            field: 'address1',
            selector: '#addresser_address1_input'
        },
        {
            field: 'address2',
            selector: '#addresser_address2_input'
        },
        {
            field: 'phone',
            selector: '#addresser_phone_input'
        },
        {
            field: 'mobile',
            selector: '#addresser_mobile_input'
        },
        {
            field: 'firstName',
            selector: '#receiver_first_name_input'
        },
        {
            field: 'lastName',
            selector: '#receiver_last_name_input'
        },
        {
            field: 'email',
            selector: '#receiver_email_input'
        },
        {
            field: 'address1',
            selector: '#receiver_address1_input'
        },
        {
            field: 'address2',
            selector: '#receiver_address2_input'
        },
        {
            field: 'phone',
            selector: '#receiver_phone_input'
        },
        {
            field: 'mobile',
            selector: '#receiver_mobile_input'
        }
    ];


    var messages = [
        {
            field: 'title',
            selector: '#children_title_input'
        },
        {
            field: 'title',
            selector: '#parent_title_input'
        }
    ];

    jd_rest_awesomplete_mass(
        'email',
        'users',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        users,
        $scope
    );

    jd_rest_awesomplete(
        'name',
        'messengerCategories',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=messenger-category',
        '#messenger_category_name_input',
        $scope
    );

    jd_rest_awesomplete_mass(
        'title',
        'messages',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=messages',
        messages,
        $scope
    );


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
        var buttons = document.getElementById('message_search_container');
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
        var form = document.getElementById('rest_message_search_form');
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