var $ = jQuery.noConflict();
var app = angular.module('paymentList', []);
app.controller('paymentCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});

jd_rest_payment_list = {
    list: function () {
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=payments?include=Booking,User%26offset=' + jd_rest_payment_offset;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);

                        var payments = response.payments;
                        var table_body = $('#table_body');
                        var table =  $('#table_payments');
                        table_body.html('');
                        if ( $.fn.dataTable.isDataTable('#table_payments') ) {
                            table.DataTable().destroy();
                        }
                        var next = document.getElementById('jd_payment_list_next');
                        if (payments) {
                            if (next) {
                                next.classList.remove('hidden');
                            }
                            var html = '';
                            [].forEach.call(payments, function (payment) {
                                var username = payment.User.firstName + ' ' + payment.User.lastName;
                                html += '<tr>' +
                                    '<td class="id"><a href="' + jd_payment_item_url + '?payment_id=' + payment.id + '" target="_blank">' + payment.id + '</a></td>' +
                                    '<td class="amount">' + payment.amount + '</td>' +
                                    '<td class="user_id"><a href="' + jd_user_item_url + '?user_id=' + payment.user_id + '" target="_blank">' + username.slice(0,30) + '</a></td>' +
                                    '<td class="description">' + payment.description + '</td>' +
                                    '<td class="type">' + payment.type + '</td>' +
                                    '<td class="booking_id"><a href="' + jd_booking_item_url + '?booking_id=' + payment.booking_id + '" target="_blank">' + payment.booking_id + '</a></td>' +
                                    '<td class="sender-name">' + payment.senderName + '</td>' +
                                    '<td class="sender-account">' + payment.senderAccount + '</td>' +
                                    '<td class="sender-bank">' + payment.senderBank + '</td></tr>'
                            });
                            table_body.html(html);
                            if ( $.fn.dataTable.isDataTable('#table_payments') ) {
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
                        if (payments.length < parseInt(jd_rest_limit)) {
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
        xhr.open('GET', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }
    var previous = document.getElementById('jd_payment_list_previous');
    if (previous) {
        previous.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            jd_reduce_payment_offset();
            jd_rest_payment_list.list();
            if (jd_rest_payment_offset < jd_rest_limit) {
                previous.classList.add('hidden');
            }
        })
    }
    var next = document.getElementById('jd_payment_list_next');
    if (next) {
        next.classList.remove('hidden');
        next.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            jd_increase_payment_offset();
            jd_rest_payment_list.list();
            if (jd_rest_payment_offset >= jd_rest_limit) {
                previous.classList.remove('hidden');
            }
        })
    }
    jd_rest_payment_list.list();
});



