var $ = jQuery.noConflict();
var app = angular.module('report', []);
app.controller('reportCtr', function($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var redirectUrl = jd_comment_list_url;
    var commentUrl = jd_comments_show_get_url;

    var report_show = {
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
        },
        show: function (uri, id) {
            var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + uri + id;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var container = document.querySelector('#report_container');
                            if (container) {
                                container.innerHTML = this.response;
                                var form = container.querySelector('form');

                                if (form) {
                                    var submit = form.querySelector('button[type=submit]');
                                    if (submit) {
                                        submit.parentNode.removeChild(submit);
                                    }
                                    report_show.jd_rest_disable_inputs(form);
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
        var el_id = getParameterByName('el_id');

        if (el_id === 'undefined' || null === el_id) {
            window.location.href = redirectUrl;
        }

        var uri, id;
        if (el_id !== null) {
            uri = commentUrl;
            id = el_id;
            report_show.show(uri, id);
        } else {
            window.location.href = redirectUrl;
        }
    });
});