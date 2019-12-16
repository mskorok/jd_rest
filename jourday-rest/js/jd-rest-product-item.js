var $ = jQuery.noConflict();
var app = angular.module('product', []);
app.controller('productCtr', function($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});

var jd_ajax_product_item = {
    deleteProduct: function (id) {
        if (id !== '' && !isNaN(id)) {
            var url = jd_rest_host + '?action=jourday_ajax_form_get&method=DELETE&url=/products/' + id;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            if (response.result === 'OK') {
                                window.location.href = jd_product_list_url;
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
    },
    getItem: function () {
        var product_id = getParameterByName('product_id');
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_product_show_get_url + product_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        $('#product_show_container').html(this.response);
                        var edit_button = document.getElementById('jd_product_show_edit');
                        if (edit_button) {
                            edit_button.classList.remove('hidden');
                            var edit_url = jd_product_edit_url + '?product_id=' + product_id;
                            edit_button.setAttribute('href', edit_url);
                        }
                        var delete_button = document.getElementById('jd_product_show_delete');
                        if (delete_button) {
                            delete_button.classList.remove('hidden');
                            delete_button.addEventListener('click' , function () {
                                jd_ajax_product_item.deleteProduct(product_id);
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
    }
};

document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }
    var product_id = getParameterByName('product_id');
    if (!product_id) {
        window.location.href = jd_product_list_url;
    }


    if (jd_admin()) {
        jd_ajax_product_item.getItem();
    } else {
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + jd_owner_product_url + product_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response =  JSON.parse(this.response);
                        if (response.result === 'OK') {
                            jd_ajax_product_item.getItem();
                        } else {
                            window.location.href = jd_product_list_url;
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