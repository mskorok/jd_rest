var $ = jQuery.noConflict();
var app = angular.module('adminList', []);
app.controller('listCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var showUrl = rest_admin_product_category_show;
    var getUrl = 'product-categories?offset=' + jd_rest_admin_offset;
    var collectionKey = 'productCategories';

    var jd_rest_admin_list = {
        list: function () {
            var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + getUrl + '?offset=' + jd_rest_admin_offset;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);

                            var els = response[collectionKey];
                            var table_body = $('#table_body');
                            var table =  $('#table_admin');
                            table_body.html('');
                            if ( $.fn.dataTable.isDataTable('#table_admin') ) {
                                table.DataTable().destroy();
                            }
                            var next = document.getElementById('jd_admin_list_next');
                            if (els) {
                                if (next) {
                                    next.classList.remove('hidden');
                                }
                                var html = '';
                                [].forEach.call(els, function (el) {
                                    html += '<tr>' +
                                        '<td class="id"><a href="' + showUrl + '?el_id=' + el.id + '" target="_blank">' + el.id + '</a></td>' +
                                        '<td class="id"><a href="' + showUrl + '?el_id=' + el.id + '" target="_blank">' + el.name + '</a></td>' +
                                        '</tr>';
                                });
                                table_body.html(html);
                                if ( $.fn.dataTable.isDataTable('#table_admin') ) {
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
                                if (els.length < parseInt(jd_rest_limit)) {
                                    if (next) {
                                        next.classList.add('hidden');
                                    }
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

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var previous = document.getElementById('jd_admin_list_previous');
        if (previous) {
            previous.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                jd_reduce_admin_offset();
                jd_rest_admin_list.list();
                if (jd_rest_admin_offset < jd_rest_limit) {
                    previous.classList.add('hidden');
                }
            })
        }
        var next = document.getElementById('jd_admin_list_next');
        if (next) {
            next.classList.remove('hidden');
            next.addEventListener('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                jd_increase_admin_offset();
                jd_rest_admin_list.list();
                if (jd_rest_admin_offset >= jd_rest_limit) {
                    previous.classList.remove('hidden');
                }
            })
        }
        jd_rest_admin_list.list();
    });
});