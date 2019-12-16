var $ = jQuery.noConflict();
var showAll = false;
var showRead = false;
var showUnread = false;
var getAll = false;
var getAdmin = false;
var getJourdayProvider = false;
var getJourdayBeneficiary = false;
var getActivityProvider = false;
var getCustomerSupport = false;
var getSalesResponsible = false;
var getReseller = false;
var getAffiliate = false;
var getCustomer = false;
var app = angular.module('messagesList', []);
app.controller('messageCtr', function ($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var array = [
        'getAll',
        'getAdmin',
        'getJourdayProvider',
        'getJourdayBeneficiary',
        'getActivityProvider',
        'getCustomerSupport',
        'getSalesResponsible',
        'getReseller',
        'getAffiliate',
        'getCustomer'
    ];

    var array_read = [
        'showAll',
        'showRead',
        'showUnread'
    ];

    var roles_keys = {
        Admin: 'admin',
        JourdayProvider: 'jourday-provider',
        JourdayBeneficiary: 'jourday-beneficiary',
        ActivityProvider: 'provider',
        CustomerSupport: 'customer-support',
        SalesResponsible: 'sales-responsible',
        Reseller: 'reseller',
        Affiliate: 'affiliate',
        Traveler: 'customer'

    };

    var roles_recipients = {
        Admin: [
            'User',
            'All',
            'JourdayProvider',
            'JourdayBeneficiary',
            'ActivityProvider',
            'ActiveActivityProvider',
            'CustomerSupport',
            'SalesResponsible',
            'Reseller',
            'Affiliate',
            'Customer'
        ],
        JourdayProvider: [
            'All',
            'Admin',
            'JourdayBeneficiary',
            'Reseller',
            'ActiveReseller',
            'Affiliate',
            'Customer'
        ],
        JourdayBeneficiary: [
            'All',
            'Admin',
            'JourdayProvider'
        ],
        ActivityProvider: [
            'All',
            'Admin',
            'Reseller',
            'Affiliate',
            'Customer'
        ],
        CustomerSupport: [
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'Customer'
        ],
        SalesResponsible: [
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'Reseller',
            'Customer'
        ],
        Reseller: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'SalesResponsible',
            'Customer'
        ],
        Affiliate: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider'
        ],
        Traveler: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'Customer'
        ]

    };

    var jd_rest_message_list = {
        read: 'showAll',
        uri: 'messages',
        init: function () {
            var role = jd_get_roles();
            var slug = roles_keys[role];
            this.uri = 'messages/' + slug + '/get/all';
            array.forEach(function (send) {
                $scope[send] = false;
            });

            array_read.forEach(function (send) {
                $scope[send] = false;
            });


            array.forEach(function (send) {
                $scope.$watch(send, function () {
                    if ($scope[send]) {
                        jd_rest_message_list.setFalse(array, send);
                    }
                });
            });
            array_read.forEach(function (send) {
                $scope.$watch(send, function () {
                    if ($scope[send]) {
                        jd_rest_message_list.setFalse(array_read, send);
                    }
                });
            });
        },
        list: function () {
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + this.uri + '?include=Receiver,Addresser,MessengerCategory,Parent%26offset=' + jd_rest_message_offset;
            var xhr = new XMLHttpRequest();
            var form_data = new FormData();
            form_data.append('read', this.read);
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var messages = response.messages;
                            var table_body = $('#table_body');
                            var table = $('#table_messages');
                            table_body.html('');
                            if ($.fn.dataTable.isDataTable('#table_messages')) {
                                table.DataTable().destroy();
                            }
                            var next = document.getElementById('jd_message_list_next');
                            if (messages) {
                                if (next) {
                                    next.classList.remove('hidden');
                                }
                                var html = '';
                                [].forEach.call(messages, function (message) {
                                    var receiver, addresser, parent;

                                    parent = '';
                                    receiver = message.Receiver.firstName + ' ' + message.Receiver.lastName;
                                    addresser = message.Addresser.firstName + ' ' + message.Addresser.lastName;
                                    if (typeof message.Parent === "object") {
                                        parent = '<a href="' + jd_message_item_url + '?message_id=' + message.Parent.id + '" target="_blank">' + message.Parent.id + '</a>'
                                    }

                                    html += '<tr>' +
                                        '<td class="id"><a href="' + jd_message_item_url + '?message_id=' + message.id + '" target="_blank">' + message.id + '</a></td>' +
                                        '<td class="parent">' + parent + '</td>' +
                                        '<td class="sender"><a href="' + jd_user_item_url + '?user_id=' + message.Addresser.id + '" target="_blank">' + addresser.slice(0, 30) + '</a></td>' +
                                        '<td class="recipient"><a href="' + jd_user_item_url + '?user_id=' + message.Receiver.id + '" target="_blank">' + receiver.slice(0, 30) + '</a></td>' +
                                        '<td class="title">' + message.title + '</td>' +
                                        '<td class="title">' + message.MessengerCategory.name + '</td>' +
                                        '<td class="sentDate">' + message.sentDate + '</td>' +
                                        '<td class="readDate">' + message.readDate + '</td></tr>'
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
                            }
                            if (messages.length < parseInt(jd_rest_limit)) {
                                if (next) {
                                    next.classList.add('hidden');
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
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(form_data);
        },
        removeExcess: function (selector) {
            var buttons = document.getElementById(selector);
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
        },
        removeExcessButtons: function () {
            var links = document.querySelectorAll('div[id=recipients_buttons] span');
            for (var key in roles_recipients) {
                if (key === jd_get_roles()) {
                    var approved_roles = roles_recipients[key];
                    (function (roles) {
                        [].forEach.call(links, function (link) {
                            var id = link.getAttribute('id');
                            if (id) {
                                var el = id.split('_').shift();
                                if (roles.indexOf(el) === -1) {
                                    link.classList.add('hidden')
                                } else {
                                    link.classList.remove('hidden');
                                }
                            }
                        });
                    })(approved_roles)

                }
            }
        },
        setFalse: function (arrays, send) {
            if (send) {
                arrays.forEach(function (value) {
                    if (value !== send  && $scope[send] === true) {
                        $scope[value] = false;
                    }
                });
            }
        },
        relist: function () {
            var self = this;
            array.forEach(function (send) {
                $scope.$watch(send, function () {
                    var role = jd_get_roles();
                    var slug = roles_keys[role];
                    if (send === 'getAll' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/all';
                    } else if (send === 'getAdmin' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/admin';
                    } else if (send === 'getJourdayProvider' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/jourday-provider';
                    } else if (send === 'getJourdayBeneficiary' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/beneficiary';
                    } else if (send === 'getActivityProvider' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/provider';
                    } else if (send === 'getCustomerSupport' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/all';
                    } else if (send === 'getSalesResponsible' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/all';
                    } else if (send === 'getReseller' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/all';
                    } else if (send === 'getAffiliate' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/all';
                    } else if (send === 'getCustomer' && $scope[send] === true) {
                        self.uri = 'messages/' + slug + '/get/all';
                    }
                    if ($scope[send]) {
                        self.reload();
                    }
                });
            });
        },
        readStatus: function () {
            var self = this;
            array_read.forEach(function (show) {
                $scope.$watch(show, function () {
                    if ($scope[show]) {
                        self.read = show;
                        self.reload();
                    }
                });
            });
        },
        reload: function () {
            jd_reset_message_offset();
            this.list()
        }
    };


    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        jd_rest_message_list.init();
        jd_rest_message_list.removeExcessButtons();
        jd_rest_message_list.removeExcess('jd_rest_recipient_block');
        jd_rest_message_list.removeExcess('jd_rest_read_block');

        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var previous = document.getElementById('jd_message_list_previous');
        if (previous) {
            previous.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                jd_reduce_message_offset();
                jd_rest_message_list.list();
                if (jd_rest_message_offset < jd_rest_limit) {
                    previous.classList.add('hidden');
                }
            })
        }
        var next = document.getElementById('jd_message_list_next');
        if (next) {
            next.classList.remove('hidden');
            next.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                jd_increase_message_offset();
                jd_rest_message_list.list();
                if (jd_rest_message_offset >= jd_rest_limit) {
                    previous.classList.remove('hidden');
                }
            })
        }
        jd_rest_message_list.list();
        jd_rest_message_list.relist();
        jd_rest_message_list.readStatus();

    });
});