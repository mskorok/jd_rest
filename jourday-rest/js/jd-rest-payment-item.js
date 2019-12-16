var $ = jQuery.noConflict();
var app = angular.module('payment', []);
app.controller('paymentCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});


var jd_ajax_payment_show = {
    jd_rest_disable_inputs: function(form) {
        var inputs = form.querySelectorAll('input');
        if (inputs) {
            [].forEach.call(inputs, function (input) {
                input.setAttribute('disabled', 'disabled')
            })
        }
        var selects = form.querySelectorAll('select');
        if (selects) {
            [].forEach.call(selects, function (select) {
                select.setAttribute('disabled', 'disabled')
            })
        }
    }
};
document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }
    var payment_id = getParameterByName('payment_id');

    if (!payment_id) {
        window.location.href = jd_payment_list_url;
    }
    var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_payment_show_url + payment_id;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    $('#payment_edit_container').html(this.response);
                    var form = document.getElementById('payment_form');
                    var submit = document.getElementById('submit_button');
                    var h3 = document.querySelector('div#payment_edit_container h3');
                    h3.textContent = 'Payment';
                    if (submit) {
                        submit.parentNode.removeChild(submit);
                    }
                    if (form) {
                        jd_ajax_payment_show.jd_rest_disable_inputs(form);
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