var $ = jQuery.noConflict();
var app = angular.module('report', []);
app.controller('reportCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    jd_rest_product_offset = 0;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var role = jd_get_roles();

    var collectionKey = 'products';

    var showUrl = jd_upcoming_products_url;

    var uri = {
        'Admin': {
            data:'/widget/admin/products/upcoming',
            pdf: '',
            excel: ''
        },
        'JourdayProvider': {
            data:'',
            pdf: '',
            excel: ''
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
            data:'/widget/customer-support/products/upcoming',
            pdf: '',
            excel: ''
        },
        'SalesResponsible': {
            data:'/widget/sales-responsible/products/upcoming',
            pdf: '',
            excel: ''
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
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + this.url + '?include=Beneficiary,User,ProductCategory%26offset=' + jd_rest_product_offset;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            console.log('r', response);
                            var products = response[collectionKey];
                            var table_body = $('#table_body');
                            var table =  $('#table_report');
                            table_body.html('');
                            if ( $.fn.dataTable.isDataTable('#table_report') ) {
                                table.DataTable().destroy();
                            }
                            var next = document.getElementById('jd_list_next');
                            if (products) {
                                if (next) {
                                    next.classList.remove('hidden');
                                }
                                var html = '';
                                [].forEach.call(products, function (product) {
                                    var username = product.User.firstName + ' ' + product.User.lastName;
                                    var beneficiary = typeof beneficiary === 'object'
                                        ? product.Beneficiary.firstName + ' ' + product.Beneficiary.lastName : '';
                                    html += '<tr>' +
                                        '<td class="id"><a href="' + showUrl + '?product_id=' + product.id + '" target="_blank">' + product.id + '</a></td>' +
                                        '<td class="name"><a href="' + showUrl + '?product_id=' + product.id + '" target="_blank">' + product.name + '</a></td>' +
                                        '<td class="provider_id"><a href="' + showUrl + '?user_id=' + product.provider_id + '" target="_blank">' + username + '</a></td>' +
                                        '<td class="beneficiary_id"><a href="' + showUrl + '?user_id=' + product.beneficiary_id + '" target="_blank">' + beneficiary + '</a></td>' +
                                        '<td class="category">' + product.ProductCategory.name + '</td></tr>'
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
                                    'order': [[0, "asc"], [1, "asc"]],
                                    oLanguage: {
                                        oPaginate: {
                                            sNext: '<i class="fa fa-chevron-right" ></i>',
                                            sPrevious: '<i class="fa fa-chevron-left" ></i>'
                                        }
                                    }
                                });
                            }
                            if (products.length < parseInt(jd_rest_limit)) {
                                if (next) {
                                    next.classList.add('hidden');
                                }
                            }

                        } catch (e) {
                            console.log('error', e, this.response);
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
                jd_reduce_product_offset();
                report_list.list();
                if (jd_rest_product_offset < jd_rest_limit) {
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
                jd_increase_product_offset();
                report_list.list();
                if (jd_rest_product_offset >= jd_rest_limit) {
                    previous.classList.remove('hidden');
                }
            })
        }

        report_list.list();
    });
});