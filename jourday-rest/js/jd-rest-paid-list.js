var $ = jQuery.noConflict();
var app = angular.module('report', []);
app.controller('reportCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    jd_rest_user_offset = 0;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var role = jd_get_roles();

    var showUrl = jd_paid_url;

    var collectionKey = 'revenuePaid';

    var pdfKey = 'revenuePaidWithPdf';
    var excelKey = 'revenuePaidWithExcel';

    var uri = {
        'Admin': {
            data:'/widget/admin/paid',
                pdf: '/widget/admin/paid/pdf',
                excel: '/widget/admin/paid/excel'
        },
        'JourdayProvider': {
            data:'/widget/jourday-provider/paid',
                pdf: '/widget/jourday-provider/paid/pdf',
                excel: '/widget/jourday-provider/paid/excel'
        },
        'JourdayBeneficiary': {
            data:'',
                pdf: '',
                excel: ''
        },
        'ActivityProvider': {
            data:'',
                pdf: '',
                excel: ''
        },
        'CustomerSupport': {
            data:'',
                pdf: '',
                excel: ''
        },
        'SalesResponsible': {
            data:'/widget/sales-responsible/paid',
                pdf: '/widget/sales-responsible/paid/pdf',
                excel: '/widget/sales-responsible/paid/excel'
        },
        'Reseller': {
            data:'',
                pdf: '',
                excel: ''
        },
        'Affiliate': {
            data:'',
                pdf: '',
                excel: ''
        }
    };

    var report_list = {
        url: uri[role]['data'],
        list: function () {
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + this.url + '?offset=' + jd_rest_user_offset;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var reports = response[collectionKey];
                            var table_body = $('#table_body');
                            var table =  $('#table_report');
                            table_body.html('');
                            if ( $.fn.dataTable.isDataTable('#table_report') ) {
                                table.DataTable().destroy();
                            }
                            var next = document.getElementById('jd_list_next');
                            if (reports) {
                                if (next) {
                                    next.classList.remove('hidden');
                                }
                                var html = '';
                                [].forEach.call(reports, function (report) {
                                    html += '<tr>' +
                                        '<td class="id"><a href="' + showUrl + '?product_id=' + report.productId + '" target="_blank">' + report.productName + '</a></td>' +
                                        '<td class="id"><a href="' + showUrl + '?product_id=' + report.productId + '" target="_blank">' + report.categoryName + '</a></td>' +
                                        '<td class="name"><a href="' + showUrl + '?user_id=' + report.providerId + '" target="_blank">' + report.firstName + '  ' + report.lastName + '</a></td>' +
                                        '<td class="name">' + report.date + '</td>' +
                                        '<td class="surname">' + report.revenue + '</td>'
                                });
                                table_body.html(html);
                                if ( $.fn.dataTable.isDataTable('#table_report') ) {
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
                            if (reports.length < parseInt(jd_rest_limit)) {
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
        },
        download: function (selector, uri, key) {
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + uri + '?offset=' + jd_rest_user_offset;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var reports = response[key];
                            var link = document.getElementById(selector);
                            if (link) {
                                // link.setAttribute('href', rest_api_host + reports.link.substring(8));//local
                                link.setAttribute('href', rest_api_host + '/uploads/' + reports.link);//dev
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
        },
        pdf: function () {
            var url = uri[role]['pdf'];
            var selector = 'report_pdf';
            this.download(selector, url, pdfKey);
        },
        excel: function () {
            var url = uri[role]['excel'];
            var selector = 'report_excel';
            this.download(selector, url, excelKey);
        }
    };

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var buttons = document.getElementById('download_links');
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
        var previous = document.getElementById('jd_list_previous');
        if (previous) {
            previous.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                jd_reduce_user_offset();
                report_list.list();
                report_list.pdf();
                report_list.excel();
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
                report_list.pdf();
                report_list.excel();
                if (jd_rest_user_offset >= jd_rest_limit) {
                    previous.classList.remove('hidden');
                }
            })
        }
        report_list.list();
        report_list.pdf();
        report_list.excel();
    });


});