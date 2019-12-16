var $ = jQuery.noConflict();
var app = angular.module('bookingList', []);
app.controller('bookingCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});
jd_rest_booking_list = {
    list: function () {
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=booking?include=Affiliates,User%26offset=' + jd_rest_booking_offset;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        var bookings = response.bookings;
                        var table_body = $('#table_body');
                        var table =  $('#table_bookings');
                        table_body.html('');
                        if ( $.fn.dataTable.isDataTable('#table_bookings') ) {
                            table.DataTable().destroy();
                        }
                        var next = document.getElementById('jd_booking_list_next');
                        if (bookings) {
                            if (next) {
                                next.classList.remove('hidden');
                            }
                            var html = '';
                            [].forEach.call(bookings, function (booking) {
                                var username = booking.User.firstName + ' ' + booking.User.lastName;
                                var affiliate = '';
                                if (typeof booking.Affiliates === "object") {
                                    affiliate = booking.Affiliates.firstName + ' ' + booking.Affiliates.lastName;
                                }

                                html += '<tr>' +
                                    '<td class="id"><a href="' + jd_booking_item_url + '?booking_id=' + booking.id + '" target="_blank">' + booking.id + '</a></td>' +
                                    '<td class="bookingDate">' + booking.bookingDate + '</td>' +
                                    '<td class="user_id"><a href="' + jd_user_item_url + '?user_id=' + booking.user_id + '" target="_blank">' + username + '</a></td>' +
                                    '<td class="status">' + booking.status + '</td>' +
                                    '<td class="paymentType">' + booking.paymentType + '</td>' +
                                    '<td class="affiliate"><a href="' + jd_user_item_url + '?user_id=' + booking.affiliate + '" target="_blank">' + affiliate + '</a></td></tr>'
                            });
                            table_body.html(html);
                            if ( $.fn.dataTable.isDataTable('#table_bookings') ) {
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

                        if (bookings.length < parseInt(jd_rest_limit)) {
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
    var previous = document.getElementById('jd_booking_list_previous');
    if (previous) {
        previous.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            jd_reduce_booking_offset();
            jd_rest_booking_list.list();
            if (jd_rest_booking_offset < jd_rest_limit) {
                previous.classList.add('hidden');
            }
        })
    }
    var next = document.getElementById('jd_booking_list_next');
    if (next) {
        next.classList.remove('hidden');
        next.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            jd_increase_booking_offset();
            jd_rest_booking_list.list();
            if (jd_rest_booking_offset >= jd_rest_limit) {
                previous.classList.remove('hidden');
            }
        })
    }
    jd_rest_booking_list.list();
});