var $ = jQuery.noConflict();
var app = angular.module('message', []);
app.controller('messageCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});
var jd_ajax_message_item = {
    jd_rest_disable_inputs: function(form) {
        var inputs = form.querySelectorAll('input');
        if (inputs) {
            [].forEach.call(inputs, function (input) {
                input.setAttribute('disabled', 'disabled')
            })
        }
        var tas = form.querySelectorAll('textarea');
        if (tas) {
            [].forEach.call(tas, function (ta) {
                ta.setAttribute('disabled', 'disabled')
            })
        }
        var selects = form.querySelectorAll('select');
        if (selects) {
            [].forEach.call(selects, function (select) {
                select.setAttribute('disabled', 'disabled')
            })
        }
    },
    setParent: function (form) {
        var input = form.querySelector('input[name=parent');
        if (input) {
            var value = input.value;
            if (value && value !== '' && !isNaN(value)) {
                var url = jd_message_item_url + '?message_id=' + value;
                var link = document.querySelector('#jd_message_parent');
                console.log(123, value, link);
                if (link) {
                    link.classList.remove('hidden');
                    link.setAttribute('href', url);
                }
            }
        }
    },
    getItem: function () {
        var message_id = getParameterByName('message_id');
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_message_show_url + message_id;

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        $('#message_show_container').html(this.response);
                        var form = document.getElementById('message_form');
                        var submit = document.getElementById('submit_button');
                        var h3 = document.querySelector('div#message_show_container h3');
                        h3.textContent = 'Message';
                        if (submit) {
                            submit.parentNode.removeChild(submit);
                        }
                        if (form) {
                            jd_ajax_message_item.setParent(form);
                            jd_ajax_message_item.jd_rest_disable_inputs(form);
                        }
                        var reply_button = document.getElementById('jd_message_reply');
                        if (reply_button) {
                            reply_button.classList.remove('hidden');
                            var input = form.querySelector('input[name=sender');
                            var edit_url = jd_messenger_url + '?message_id=' + message_id;
                            if (input && input.value !== '') {
                                edit_url += '&recipient_id=' + input.value;
                            }
                            reply_button.setAttribute('href', edit_url);
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
    var message_id = getParameterByName('message_id');

    if (!message_id) {
        window.location.href = jd_message_list_url;
    }

    if (jd_admin()) {
        jd_ajax_message_item.getItem();
    } else {
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + jd_owner_message_url + message_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response =  JSON.parse(this.response);
                        if (response.result === 'OK') {
                            jd_ajax_message_item.getItem();
                        } else {
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
        xhr.send();
    }
});