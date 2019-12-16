var $ = jQuery.noConflict();
var app = angular.module('adminEdit', []);
app.controller('editCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var getUrl = 'wp/voucher/edit/';
    var redirectUrl = rest_admin_voucher_list;

    var rest_admin_edit = {
        editUrl: '/wp/form/create/main',
        model: 'Voucher',
        formId: 'Vouchers_edit_form',
        mainField: -1,
        relatedModels: {},
        modelsWithImages: [],
        imageFields: {},
        urls: {},
        related: {},
        relatedFields: {},
        init: function () {
            //
        },
        autocomplete: function () {
            //
        },
        appendCheckbox: function(form, form_data) {
            // if (form.instantBooking) {
            //     form_data.append('instantBooking', form.instantBooking.value);
            // }
            // if (form.daily) {
            //     form_data.append('daily', form.daily.value);
            // }
            // if (form.perPerson) {
            //     form_data.append('perPerson', form.perPerson.value);
            // }
        },
        submit: function () {
            var self = this;
            var button = document.querySelector('button[type=submit]');
            var form = button.closest('form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.editMainModel(form);
                    return false;
                })
            }
        },
        listeners: function (form) {
            var self = this;
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.editMainModel(form);
                    return false;
                })
            }
        },
        addRemoveListeners: function (form) {
            var model = form.getAttribute('id').split('_').shift();
            if (form[this.mainField]) {
                if (this.modelsWithImages.indexOf(model) !== -1) {
                    rest_admin_edit.removeModel(form.parentNode);
                } else {
                    rest_admin_edit.removeModel(form.parentNode);
                }
            } else if (this.relatedModels[model]) {
                var rel_settings = this.relatedModels[model];
                if (rel_settings.isImage) {
                    rest_admin_edit.removeRelatedModel(form.parentNode);
                } else {
                    rest_admin_edit.removeRelatedModel(form.parentNode);
                }
            } else {
                console.log('Remove product error - unknown type');
            }
        },
        removeModel: function (div) {
            var form = div.querySelector('form');
            var self = this;
            var image_id = null;
            if (form) {
                var id_input = form.id;
                if (id_input) {
                    var id = id_input.value;
                    var model = form.getAttribute('id').split('_').shift();
                    if (self.imageFields[model]) {
                        var image_field = self.imageFields[model];
                        var image_input = form.querySelector('input[name=' + image_field + ']');
                        if (image_input && image_input.tagName && image_input.tagName.toLowerCase() === 'input') {
                            image_id = image_input.value;
                        }
                    }
                    if (id !== '' && !isNaN(id)) {
                        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=DELETE&url=/' + this.urls[model] + '/' + id;
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            if (this.readyState === 4) {
                                if (this.status === 200) {
                                    try {
                                        var response = JSON.parse(this.response);
                                        if (response.result === 'OK') {
                                            var container = div.closest('div[id^=additional_form');
                                            div.parentNode.removeChild(div);
                                            var is_form = container.querySelector('form');
                                            var el = container.querySelector('.glyphicon-plus-sign');
                                            if (!is_form) {
                                                if (el) {
                                                    rest_admin_edit.add(el, []);
                                                }
                                            }
                                            if (null !== image_id && !isNaN(image_id)) {
                                                var url_delete_image = jd_rest_host + '?action=jourday_ajax_form_get&method=DELETE&url=/images/' + image_id;
                                                var ajax = new XMLHttpRequest();
                                                ajax.onload = function () {
                                                    if (this.readyState === 4) {
                                                        if (this.status === 200) {
                                                            console.log('delete image ', this.response);
                                                        } else {
                                                            console.log('delete image error response', this.response);
                                                        }
                                                    }
                                                };
                                                ajax.open('GET', url_delete_image, true);
                                                ajax.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                                ajax.send();
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
                }
            }
        },
        removeRelatedModel: function (div) {
            var form = div.querySelector('form');
            if (form) {
                var id_input = form.id;
                if (id_input) {
                    var id = id_input.value;
                    var url, xhr;
                    var model = form.getAttribute('id').split('_').shift();
                    var main = document.getElementById(this.formId);
                    var main_id = null;
                    if (main) {
                        main_id = main.id.value;
                    }
                    if (id !== '' && !isNaN(id) && main_id !== '' && !isNaN(main_id)) {
                        var related = this.related[model];
                        url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + jd_form_delete_related_url;
                        var form_data = new FormData();
                        form_data.append('model', model);
                        form_data.append('related', related);
                        form_data.append('modelId', id);
                        form_data.append('mainId', main_id);
                        form_data.append('modelField', this.relatedFields[model]);
                        form_data.append('mainField', 'category_id');

                        xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            if (this.readyState === 4) {
                                if (this.status === 200) {
                                    try {
                                        var response = JSON.parse(this.response);
                                        if (response.result === 'OK') {
                                            var container = div.closest('div[id^=additional_form');
                                            div.parentNode.removeChild(div);
                                            var is_form = container.querySelector('form');
                                            var el = container.querySelector('.glyphicon-plus-sign');
                                            if (!is_form) {
                                                if (el) {
                                                    rest_admin_edit.add(el, []);
                                                }
                                            }
                                        } else {
                                            console.log('delete error', response);
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
                        xhr.send(form_data);
                    }
                }
            }
        },
        editMainModel: function (form) {
            jd_sanitize_checkbox(form);
            var self = this;
            var model = form.getAttribute('id').split('_').shift();
            var jd_edit_product_key = window.jd_edit_product_key;
            var form_data = new FormData(form);
            var error_container;
            console.log('m', model);
            form_data.append('model', model);
            form_data.append('formId', form.getAttribute('id'));
            this.appendCheckbox(form, form_data);
            var url = window.jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + this.editUrl;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            error_container = document.getElementById('jd_error_container');
                            error_container.innerHTML = '';
                            if (response.result === 'error') {
                                if (error_container) {
                                    var html = '';
                                    if (Array.isArray(response.message)) {
                                        response.message.forEach(function (message) {
                                            if (typeof message === 'object') {
                                                for (var key in message) {
                                                    html += '<div>' + key + ' : ' + message[key] + '</div>';
                                                }
                                            } else if (typeof message === 'string') {
                                                html += '<div>' + message + '</div>';
                                            }
                                        });
                                    } else if (typeof response.message === 'object') {
                                        for (var key in response.message) {
                                            html += '<div>' + key + ' : ' + response.message[key] + '</div>';
                                        }
                                    } else {
                                        html = '<div>' + response.message + '</div>';
                                    }
                                    error_container.innerHTML = html;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response.message);
                            } else if (response.error) {
                                if (error_container) {
                                    if (Array.isArray(response.error.message)) {
                                        response.error.message.forEach(function (message) {
                                            if (typeof message === 'object') {
                                                for (var key in message) {
                                                    html += '<div>' + key + ' : ' + message[key] + '</div>';
                                                }
                                            }
                                        })
                                    } else if (typeof response.error.message === 'string') {
                                        html = response.error.message;
                                    }
                                    error_container.textContent = html;
                                    window.location.hash = 'top';
                                }
                                console.log('error', error_container, response.error.message);
                            }  else if (response[jd_edit_product_key].result === 'error') {
                                if (error_container) {
                                    error_container.textContent = response[jd_edit_product_key].message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response[jd_edit_product_key].message);
                            }  else if (response[jd_edit_product_key].success) {
                                var div = document.createElement('div');
                                div.innerHTML = response[jd_edit_product_key].success;
                                var container = form.parentNode;
                                if (container) {
                                    container.parentNode.insertBefore(div, container);
                                    container.parentNode.removeChild(container);
                                    var new_form = div.querySelector('form');
                                    if (new_form) {
                                        self.listeners(new_form);
                                    }

                                    jd_successEdit(new_form);
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
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(form_data);
        }
    };

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var el_id = getParameterByName('el_id');
        if (!el_id) {
            window.location.href = redirectUrl;
        }

        if (!jd_admin()) {
            window.location.href = redirectUrl;
        }

        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + getUrl + el_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var container = document.getElementById('admin_edit_container');
                        container.innerHTML = this.response;

                        var remove_buttons = container.querySelectorAll('.glyphicon-remove');
                        [].forEach.call(remove_buttons, function (del) {
                            if (del) {
                                var form = del.closest('form');
                                del.classList.remove('hidden');
                                del.addEventListener('click', function () {
                                    rest_admin_edit.addRemoveListeners(form);
                                })
                            }
                        });
                        rest_admin_edit.init();
                        rest_admin_edit.autocomplete();
                        rest_admin_edit.submit();
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