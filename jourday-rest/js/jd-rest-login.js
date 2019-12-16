var $ = jQuery.noConflict();
var app = angular.module('login', []);
app.controller('loginCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var jd_ajax_login = {
        login: function (form) {
            var name, password, remember;
            if (typeof form.username.value !== 'undefined') {
                name = form.username.value;
            } else {
                alert('Username not defined');
                return false;
            }
            if (typeof form.password.value !== 'undefined') {
                password = form.password.value;
            } else {
                alert('password not defined');
                return false;
            }
            if (typeof form.remember.checked !== 'undefined' && form.remember.checked) {
                remember = form.remember.checked
            } else {
                remember = null;
            }
            rest_auth.login(name, password, remember);
        }
    };
    angular.element(document).ready(function () {
        console.log(new Date().getTime());
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_login_get_url;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        console.log(new Date().getTime());
                        $('#login_container').html(this.response);
                        var form = document.getElementById('login_form');
                        if (form) {
                            form.addEventListener('submit', function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                                jd_ajax_login.login(form);
                                return false;
                            })
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
});