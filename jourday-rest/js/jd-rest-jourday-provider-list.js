var $ = jQuery.noConflict();
var app = angular.module('report', []);
app.controller('reportCtr', function ($scope) {
    $scope.jd_rest_limit = 100;
    jd_rest_user_offset = 0;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var role = jd_get_roles();

    var showUrl = jd_jourday_provider_url;

    var collectionKey = 'jourdayProviders';

    var uri = {
        'Admin': '/widget/admin/jourday-provider',
        'JourdayProvider': '',
        'JourdayBeneficiary': '',
        'ActivityProvider': '',
        'CustomerSupport': '',
        'SalesResponsible': '',
        'Reseller': '',
        'Affiliate': ''
    };

    var report_list = {
        url: uri[role],
        list: function () {
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + this.url + '?offset=' + jd_rest_user_offset;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var users = response[collectionKey];
                            var table_body = $('#table_body');
                            var table = $('#table_report');
                            table_body.html('');
                            if ($.fn.dataTable.isDataTable('#table_report')) {
                                table.DataTable().destroy();
                            }
                            var next = document.getElementById('jd_list_next');
                            if (users) {
                                if (next) {
                                    next.classList.remove('hidden');
                                }
                                var html = '';
                                [].forEach.call(users, function (user) {
                                    html += '<tr>' +
                                        '<td class="id">' + user.id + '</td>' +
                                        '<td class="name"><a href="' + showUrl + '?user_id=' + user.id + '" target="_blank"> ' + user.firstName + '</a></td>' +
                                        '<td class="surname"><a href="' + showUrl + '?user_id=' + user.id + '" target="_blank"> ' + user.lastName + '</a></td>' +
                                        '<td class="email">' + user.email + '</td></tr>'
                                });
                                table_body.html(html);
                                if ($.fn.dataTable.isDataTable('#table_report')) {
                                    table.DataTable().destroy();
                                }
                                table.DataTable({
                                    'info': false,
                                    'searching': false,
                                    'lengthChange': false,
                                    'pageLength': 20,
                                    'order': [[0, "asc"]],
                                    oLanguage: {
                                        oPaginate: {
                                            sNext: '<i class="fa fa-chevron-right" ></i>',
                                            sPrevious: '<i class="fa fa-chevron-left" ></i>'
                                        }
                                    }
                                });
                            }
                            if (users.length < parseInt(jd_rest_limit)) {
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
            xhr.send();
        }
    };

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var previous = document.getElementById('jd_list_previous');
        if (previous) {
            previous.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                jd_reduce_user_offset();
                report_list.list();
                if (jd_rest_user_offset < jd_rest_limit) {
                    previous.classList.add('hidden');
                }
            })
        }
        var next = document.getElementById('jd_list_next');
        if (next) {
            next.classList.remove('hidden');
            next.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                jd_increase_user_offset();
                report_list.list();
                if (jd_rest_user_offset >= jd_rest_limit) {
                    previous.classList.remove('hidden');
                }
            })
        }
        report_list.list();
    });


});