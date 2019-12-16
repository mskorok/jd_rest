var $ = jQuery.noConflict();
var sendUser = false;
var sendAll = false;
var sendAdmin = false;
var sendJourdayProvider = false;
var sendJourdayBeneficiary = false;
var sendJourdayBeneficiaries = false;
var sendActivityProvider = false;
var sendActivityProviders = false;
var sendCustomerSupport = false;
var sendSalesResponsible = false;
var sendReseller = false;
var sendActiveReseller = false;
var sendResellers = false;
var sendAffiliate = false;
var sendActiveAffiliate = false;
var sendAffiliates = false;
var sendCustomer = false;
var sendCustomers = false;
var app = angular.module('messenger', []);
app.controller('messengerCtr', function ($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    jd_rest_fill_model(
        'email',
        'users',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        $scope
    );
    var jd_ajax_messenger = {
        init: function () {
            sendUser = true;
            buttonVisibility(false);
            this.initByRoles();
            array.forEach(function (show) {
                $scope.$watch(show, function () {
                    getShowButton();
                });
            });
        },
        initByRoles: function () {
            var uri;
            var select = document.getElementById('recipient');
            select.closest('div.col-xs-12').classList.remove('hidden');
            uri = '/widget/users';
            this.reload(uri, select);
        },
        autocomplete: function () {
            // jd_rest_awesomplete(
            //     'email',
            //     'users',
            //     jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
            //     '#recipient'
            // );
        },
        submit: function () {
            var self = this;
            var button = document.querySelector('button[type=submit]');
            var submit = button.closest('form');
            if (submit) {
                submit.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.send();
                    return false;
                })
            }
        },
        send: function () {
            var form = document.getElementById('Message_create_form');
            if (form) {
                var roles = jd_get_roles();
                switch (roles) {
                    case 'Admin':
                        this.createAdminMessages(form);
                        break;
                    case 'JourdayProvider':
                        this.createJourdayProviderMessages(form);
                        break;
                    case 'JourdayBeneficiary':
                        this.createJourdayBeneficiaryMessages(form);
                        break;
                    case 'ActivityProvider':
                        this.createActivityProviderMessages(form);
                        break;
                    case 'CustomerSupport':
                        this.createCustomerSupportMessages(form);
                        break;
                    case 'SalesResponsible':
                        this.createSalesResponsibleMessages(form);
                        break;
                    case 'Reseller':
                        this.createResellerMessages(form);
                        break;
                    case 'Affiliate':
                        this.createAffiliateMessages(form);
                        break;
                    case 'Traveler':
                        this.createCustomerMessages(form);
                        break;
                }
            }

        },
        createAdminMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendJourdayProvider) {
                uri = '/messages/admin/send/jourday-provider';
            } else if (sendJourdayBeneficiary) {
                uri = '/messages/admin/send/beneficiary';
            } else if (sendJourdayBeneficiaries) {
                uri = '/messages/admin/send/beneficiaries';
            } else if (sendActivityProvider) {
                uri = '/messages/admin/send/provider';
            } else if (sendActivityProviders) {
                uri = '/messages/admin/send/providers';
            } else if (sendCustomerSupport) {
                uri = '/messages/admin/send/customer-support';
            } else if (sendSalesResponsible) {
                uri = '/messages/admin/send/sales-responsible';
            } else if (sendReseller) {
                uri = '/messages/admin/send/reseller';
            } else if (sendResellers) {
                uri = '/messages/admin/send/reseller/all';
            } else if (sendActiveReseller) {
                uri = '/messages/admin/send/reseller/active';
            } else if (sendResellers) {
                uri = '/messages/admin/send/reseller/active';
            } else if (sendAffiliate) {
                uri = '/messages/admin/send/affiliate';
            } else if (sendAffiliates) {
                uri = '/messages/admin/send/affiliate/all';
            } else if (sendActiveAffiliate) {
                uri = '/messages/admin/send/affiliate/active';
            } else if (sendCustomer) {
                uri = '/messages/admin/send/customer';
            } else if (sendCustomers) {
                uri = '/messages/admin/send/customers';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createJourdayProviderMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendAdmin) {
                uri = '/messages/jourday-provider/send/admin';
            } else if (sendJourdayBeneficiary) {
                uri = '/messages/jourday-provider/send/beneficiary';
            } else if (sendJourdayBeneficiaries) {
                uri = '/messages/jourday-provider/send/beneficiaries';
            } else if (sendReseller) {
                uri = '/messages/jourday-provider/send/reseller';
            } else if (sendResellers) {
                uri = '/messages/jourday-provider/send/reseller/all';
            } else if (sendActiveReseller) {
                uri = '/messages/jourday-provider/send/reseller/active';
            } else if (sendAffiliate) {
                uri = '/messages/jourday-provider/send/affiliate';
            } else if (sendAffiliates) {
                uri = '/messages/jourday-provider/send/affiliate/all';
            } else if (sendActiveAffiliate) {
                uri = '/messages/jourday-provider/send/affiliate/active';
            } else if (sendCustomer) {
                uri = '/messages/jourday-provider/send/customer';
            } else if (sendCustomers) {
                uri = '/messages/jourday-provider/send/customers';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createJourdayBeneficiaryMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendAdmin) {
                uri = '/messages/beneficiary/send/admin';
            } else if (sendJourdayProvider) {
                uri = '/messages/beneficiary/send/jourday-provider';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createActivityProviderMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendAdmin) {
                uri = '/messages/provider/send/admin';
            } else if (sendReseller) {
                uri = '/messages/provider/send/reseller';
            } else if (sendResellers) {
                uri = '/messages/provider/send/reseller/all';
            } else if (sendActiveReseller) {
                uri = '/messages/provider/send/reseller/active';
            } else if (sendAffiliate) {
                uri = '/messages/provider/send/affiliate';
            } else if (sendAffiliates) {
                uri = '/messages/provider/send/affiliate/all';
            } else if (sendActiveAffiliate) {
                uri = '/messages/provider/send/affiliate/active';
            } else if (sendCustomer) {
                uri = '/messages/provider/send/customer';
            } else if (sendCustomers) {
                uri = '/messages/provider/send/customers';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createCustomerSupportMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendAdmin) {
                uri = '/messages/customer-support/send/admin';
            } else if (sendJourdayProvider) {
                uri = '/messages/customer-support/send/jourday-provider';
            } else if (sendActivityProvider) {
                uri = '/messages/customer-support/send/provider';
            } else if (sendActivityProviders) {
                uri = '/messages/customer-support/send/providers';
            } else if (sendCustomer) {
                uri = '/messages/customer-support/send/customer';
            } else if (sendCustomers) {
                uri = '/messages/customer-support/send/customers';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createSalesResponsibleMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendAdmin) {
                uri = '/messages/sales-responsible/send/admin';
            } else if (sendJourdayProvider) {
                uri = '/messages/sales-responsible/send/jourday-provider';
            } else if (sendActivityProvider) {
                uri = '/messages/sales-responsible/send/provider';
            } else if (sendActivityProvider) {
                uri = '/messages/sales-responsible/send/providers';
            } else if (sendReseller) {
                uri = '/messages/sales-responsible/send/reseller';
            } else if (sendResellers) {
                uri = '/messages/sales-responsible/send/reseller/all';
            } else if (sendActiveReseller) {
                uri = '/messages/sales-responsible/send/reseller/active';
            } else if (sendCustomer) {
                uri = '/messages/sales-responsible/send/customer';
            } else if (sendCustomers) {
                uri = '/messages/sales-responsible/send/customers';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createResellerMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendAdmin) {
                uri = '/messages/reseller/send/admin';
            } else if (sendJourdayProvider) {
                uri = '/messages/reseller/send/jourday-provider';
            } else if (sendActivityProvider) {
                uri = '/messages/reseller/send/provider';
            } else if (sendActivityProviders) {
                uri = '/messages/reseller/send/provider';
            } else if (sendCustomerSupport) {
                uri = '/messages/reseller/send/customer-support';
            } else if (sendSalesResponsible) {
                uri = '/messages/reseller/send/sales-responsible';
            } else if (sendCustomer) {
                uri = '/messages/reseller/send/customer';
            } else if (sendCustomers) {
                uri = '/messages/reseller/send/customer';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createAffiliateMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendAdmin) {
                uri = '/messages/affiliate/send/admin';
            } else if (sendJourdayProvider) {
                uri = '/messages/affiliate/send/jourday-provider';
            } else if (sendActivityProvider) {
                uri = '/messages/affiliate/send/provider';
            } else if (sendActivityProvider) {
                uri = '/messages/affiliate/send/providers';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        createCustomerMessages: function (form) {
            var uri = null;
            if (sendUser) {
                uri = '/messages/send/simple';
            } else if (sendAll) {
                uri = '/messages/send/all';
            } else if (sendCustomerSupport) {
                uri = '/messages/customer/send/customer-support';
            }
            if (uri) {
                this.create(form, uri);
            }
        },
        create: function (form, uri) {
            var form_data = new FormData(form);
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + uri;
            console.log('url', uri);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var error_container = document.getElementById('jd_error_container');
                            error_container.innerHTML = '';
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
                            } else if (response.result === 'OK') {
                                console.log('OK');
                                window.location.href = jd_message_list_url;
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
        setSender: function (user_id) {
            var container = document.getElementById('messenger_container');
            if (container) {
                var sender = container.querySelector('input[name=sender]');
                if (sender) {
                    sender.setAttribute('value', user_id);
                }
            }
        },
        setRecipient: function (user_id) {
            var container = document.getElementById('messenger_container');
            if (container) {
                var recipient = container.querySelector('select[name=recipient]');
                console.log('r', user_id, recipient);
                if (recipient) {
                    recipient.setAttribute('value', user_id);
                    recipient.closest('div.col-xs-12').classList.add('hidden');
                    var buttons = document.getElementById('jd_rest_recipient_block');
                    if (buttons) {
                        buttons.classList.add('hidden');
                    }
                    var submit = document.querySelector('button[type=submit]');
                    if (submit) {
                        submit.classList.remove('hidden');
                    }
                }
            }
        },
        setParent: function (message_id) {
            var container = document.getElementById('messenger_container');
            if (container) {
                var parent = container.querySelector('input[name=parent]');
                if (parent) {
                    parent.setAttribute('value', message_id);
                }
            }
        },
        reloadRecipientsByRoles: function () {
            var self = this;
            var select = document.getElementById('recipient');
            var uri;
            if (select) {
                (function (select, self) {
                    array.forEach(function (send) {
                        $scope.$watch(send, function () {
                            if (send === 'sendUser' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/users';
                                self.reload(uri, select);
                            } else if (send === 'sendAll' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/users';
                                self.reload(uri, select);
                            } else if (send === 'sendAdmin' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/admin/users';
                                self.reload(uri, select);
                            } else if (send === 'sendJourdayProvider' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/jourday-provider/users';
                                self.reload(uri, select);
                            } else if (send === 'sendJourdayBeneficiary' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/beneficiary/users';
                                self.reload(uri, select);
                            } else if (send === 'sendJourdayBeneficiaries' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/beneficiary/users';
                                self.reload(uri, select);
                            } else if (send === 'sendActivityProvider' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/provider/users';
                                self.reload(uri, select);
                            } else if (send === 'sendActivityProviders' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/provider/users';
                                self.reload(uri, select);
                            } else if (send === 'sendCustomerSupport' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/customer-support/users';
                                self.reload(uri, select);
                            } else if (send === 'sendSalesResponsible' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/sales-responsible/users';
                                self.reload(uri, select);
                            } else if (send === 'sendReseller' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/reseller/users';
                                self.reload(uri, select);
                            } else if (send === 'sendResellers' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/reseller/users';
                                self.reload(uri, select);
                            } else if (send === 'sendActiveReseller' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/reseller/users';
                                self.reload(uri, select);
                            } else if (send === 'sendAffiliate' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/affiliate/users';
                                self.reload(uri, select);
                            } else if (send === 'sendAffiliates' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/affiliate/users';
                                self.reload(uri, select);
                            } else if (send === 'sendActiveAffiliate' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/affiliate/users';
                                self.reload(uri, select);
                            } else if (send === 'sendCustomer' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.remove('hidden');
                                uri = '/widget/customer/users';
                                self.reload(uri, select);
                            } else if (send === 'sendCustomers' && $scope[send] === true) {
                                select.closest('div.col-xs-12').classList.add('hidden');
                                uri = '/widget/customer/users';
                                self.reload(uri, select);
                            }
                        });
                    });
                })(select, self);
            }
        },
        reload: function(uri, select) {
            select.innerHTML = '';
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + uri;
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
    };

    var array = [
        'sendUser',
        'sendAll',
        'sendAdmin',
        'sendJourdayProvider',
        'sendJourdayBeneficiary',
        'sendJourdayBeneficiaries',
        'sendActivityProvider',
        'sendActivityProviders',
        'sendCustomerSupport',
        'sendSalesResponsible',
        'sendReseller',
        'sendResellers',
        'sendActiveReseller',
        'sendAffiliate',
        'sendAffiliates',
        'sendActiveAffiliate',
        'sendCustomer',
        'sendCustomers'
    ];

    var roles_recipients = {
        Admin: [
            'User',
            'All',
            'JourdayProvider',
            'JourdayBeneficiary',
            'JourdayBeneficiaries',
            'ActivityProvider',
            'ActivityProviders',
            'ActiveActivityProvider',
            'CustomerSupport',
            'SalesResponsible',
            'Reseller',
            'Resellers',
            'ActiveReseller',
            'Affiliate',
            'ActiveAffiliate',
            'Affiliates',
            'Customer',
            'Customers'
        ],
        JourdayProvider: [
            'User',
            'All',
            'Admin',
            'JourdayBeneficiary',
            'JourdayBeneficiaries',
            'Reseller',
            'Resellers',
            'ActiveReseller',
            'Affiliate',
            'Affiliates',
            'ActiveAffiliate',
            'Customer',
            'Customers'
        ],
        JourdayBeneficiary: [
            'User',
            'All',
            'Admin',
            'JourdayProvider'
        ],
        ActivityProvider: [
            'User',
            'All',
            'Admin',
            'Reseller',
            'Resellers',
            'ActiveReseller',
            'Affiliate',
            'Affiliates',
            'ActiveAffiliate',
            'Customer',
            'Customers'
        ],
        CustomerSupport: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'ActivityProviders',
            'ActiveActivityProvider',
            'Customer',
            'Customers'
        ],
        SalesResponsible: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'ActivityProviders',
            'ActiveActivityProvider',
            'Reseller',
            'Resellers',
            'ActiveReseller',
            'Customer',
            'Customers'
        ],
        Reseller: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'ActivityProviders',
            'ActiveActivityProvider',
            'SalesResponsible',
            'Customer',
            'Customers'
        ],
        Affiliate: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'ActivityProviders',
            'ActiveActivityProvider'
        ],
        Traveler: [
            'User',
            'All',
            'Admin',
            'JourdayProvider',
            'ActivityProvider',
            'ActivityProviders',
            'ActiveActivityProvider',
            'Customer',
            'Customers'
        ]

    };

    function removeExcessButtons() {
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
    }

    removeExcessButtons();

    array.forEach(function (send) {
        $scope[send] = false;
    });

    function setFalse(send) {
        if (send) {
            array.forEach(function (value) {
                if (value !== send) {
                    $scope[value] = false;
                }
            });
        }
    }

    array.forEach(function (send) {
        $scope.$watch(send, function () {
            if ($scope[send]) {
                setFalse(send);
            }
        });
    });

    function buttonVisibility(show) {
        var buttons = document.querySelectorAll('button[type=submit]');
        [].forEach.call(buttons, function (button) {
            if (show) {
                button.classList.remove('hidden');
            } else {
                button.classList.add('hidden');
            }
        })
    }

    function getShowButton() {
        var show = false;
        array.forEach(function (value) {
            if ($scope[value]) {
                show = true;
            }
        });
        buttonVisibility(show);
    }

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var message_id = getParameterByName('message_id');
        var recipient_id = getParameterByName('recipient_id');
        var user_id = jd_get_authorized();
        if (!user_id) {
            window.location.href = '/rest-home/';
        }

        var buttons = document.getElementById('jd_rest_recipient_block');
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
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_message_create_url;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        $('#messenger_container').html(this.response);
                        jd_ajax_messenger.init();
                        sendUser = true;
                        jd_ajax_messenger.reloadRecipientsByRoles();
                        jd_ajax_messenger.autocomplete();
                        jd_ajax_messenger.submit();
                        if (user_id) {
                            jd_ajax_messenger.setSender(user_id);
                        }
                        if (recipient_id) {
                            jd_ajax_messenger.setRecipient(recipient_id);
                        }
                        if (message_id) {
                            jd_ajax_messenger.setParent(message_id);
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