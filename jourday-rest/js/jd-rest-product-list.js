var $ = jQuery.noConflict();
var app = angular.module('productList', []);
app.controller('productCtr', function ($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});

jd_rest_product_list = {
    list: function () {
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=products?include=Beneficiary,User%26offset=' + jd_rest_product_offset;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        var products = response.products;
                        var table_body = $('#table_body');
                        var table = $('#table_products');
                        table_body.html('');
                        if ($.fn.dataTable.isDataTable('#table_products')) {
                            table.DataTable().destroy();
                        }
                        var next = document.getElementById('jd_product_list_next');
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
                                    '<td class="id"><a href="' + jd_product_item_url + '?product_id=' + product.id + '" target="_blank">' + product.id + '</a></td>' +
                                    '<td class="name">' + product.name + '</td>' +
                                    '<td class="provider_id"><a href="' + jd_user_item_url + '?user_id=' + product.provider_id + '" target="_blank">' + username + '</a></td>' +
                                    '<td class="beneficiary_id"><a href="' + jd_user_item_url + '?user_id=' + product.beneficiary_id + '" target="_blank">' + beneficiary + '</a></td>' +
                                    '<td class="category">' + product.category + '</td></tr>'
                            });
                            table_body.html(html);

                            if ($.fn.dataTable.isDataTable('#table_products')) {
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
        xhr.open('GET', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
    }
};
document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }

    var previous = document.getElementById('jd_product_list_previous');
    if (previous) {
        previous.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            jd_reduce_product_offset();
            jd_rest_product_list.list();
            if (jd_rest_product_offset < jd_rest_limit) {
                previous.classList.add('hidden');
            }
        })
    }
    var next = document.getElementById('jd_product_list_next');
    if (next) {
        next.classList.remove('hidden');
        next.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            jd_increase_product_offset();
            jd_rest_product_list.list();
            if (jd_rest_product_offset >= jd_rest_limit) {
                previous.classList.remove('hidden');
            }
        })
    }

    jd_rest_product_list.list();

});