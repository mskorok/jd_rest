var $ = jQuery.noConflict();
var app = angular.module('adminCreate', []);
app.controller('createCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;

    var formUrl = 'wp/product-category/create';
    var createUrl = '/product-categories/';
    var redirectUrl = rest_admin_product_category_list;

    var rest_admin_create = {
        model: 'ProductCategory',
        formId: 'ProductCategory_create_form',
        relatedModels: {
            CancellationPolicy: {
                model: 'ProductCategoryToCancellationPolicy',
                url: window.jd_form_create_related_url,
                field: 'policy_id',
                isImage: false
            }
        },
        modelsWithImages: [],
        imageFields: {},
        urls: {
            'CancellationPolicy': 'cancellation-policies',
            'ProductCategoryToCancellationPolicy': 'product-category-to-cancellation-policy'
        },
        related: {
            CancellationPolicy: 'ProductCategoryToCancellationPolicy'
        },
        relatedFields: {
            'CancellationPolicy': 'policy_id'
        },
        updatedSelects: [
            {
                name: 'category_id',
                field: 'name',
                model: 'ProductCategory',
                url: 'product-categories'
            },
            {
                name: 'policy_id',
                field: 'cancellationWindow',
                model: 'CancellationPolicy',
                url: 'cancellation-policies'
            }
        ],
        init: function () {
            var policy = document.getElementById('additional_forms_cancellationpolicy');
            var policy_button = document.getElementById('CancellationPolicy_click');
            if (policy_button && policy) {
                policy.classList.add('hidden');
                policy_button.addEventListener('click', function (e) {
                    if (policy.classList.contains('hidden')) {
                        policy.classList.remove('hidden');
                    } else {
                        policy.classList.add('hidden');
                    }
                })
            }

            var category = document.getElementById('additional_forms_productcategorytocancellationpolicy');
            var category_button = document.getElementById('ProductCategoryToCancellationPolicy_click');
            if (category_button && category) {
                category.classList.add('hidden');
                category_button.addEventListener('click', function (e) {
                    if (category.classList.contains('hidden')) {
                        category.classList.remove('hidden');
                    } else {
                        category.classList.add('hidden');
                    }
                })
            }
        },
        autocomplete: function () {
            //
        },
        appendCheckbox: function(form, form_data){
            //
        },
        send: function (form) {
            var form_data = new FormData(form);
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + createUrl;

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var error_container = document.getElementById('jd_error_container');
                            error_container.innerHTML = '';
                            var response = JSON.parse(this.response);
                            var html;
                            if (response.result === 'error') {
                                if (error_container) {
                                    html = '';
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
                                console.log('error', response.message, html);
                            } else if (response.error) {
                                if (error_container) {
                                    html = '';
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
                            } else if (response[jd_edit_product_key] && response[jd_edit_product_key].result === 'error') {
                                if (error_container) {
                                    error_container.textContent = response[jd_edit_product_key].message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response[jd_edit_product_key].message);
                            } else if (response.result === 'OK') {
                                console.log('OK');
                                window.location.href = redirectUrl;
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
        },
        disable_inputs: function(el) {
            var inputs = el.querySelectorAll('input');
            if (inputs) {
                [].forEach.call(inputs, function (input) {
                    input.setAttribute('disabled', 'disabled')
                })
            }
            var tas = el.querySelectorAll('textarea');
            if (tas) {
                [].forEach.call(tas, function (ta) {
                    ta.setAttribute('disabled', 'disabled')
                })
            }
            var selects = el.querySelectorAll('select');
            if (selects) {
                [].forEach.call(selects, function (select) {
                    select.setAttribute('disabled', 'disabled')
                })
            }
        },
        setProductId: function(id, name) {
            var forms = document.querySelectorAll('form');
            [].forEach.call(forms, function (form) {
                var input = form.category_id;
                if (input) {
                    if (input.tagName.toLowerCase() === 'input') {
                        input.setAttribute('value', id);
                    } else if (input.tagName.toLowerCase() === 'select') {
                        var options = input.querySelectorAll('option');
                        if (options) {
                            var flag = false;
                            [].forEach.call(options, function (option)  {
                                if (option.value == id) {
                                    option.setAttribute('selected', 'selected');
                                    flag = true;
                                }
                            });
                            if (!flag) {
                                var option = document.createElement('option');
                                option.setAttribute('value', id);
                                option.setAttribute('selected', 'selected');
                                option.textContent = name;
                                input.add(option);
                            }
                        }
                    }
                    input.closest('.col-xs-12').classList.add('hidden');
                }
            })
        },
        create: function (form, uri) {
            jd_sanitize_checkbox(form);
            uri = uri ||  jd_form_create_url;
            var self = this;
            var error_container;
            var model = form.getAttribute('id').split('_').shift();
            var jd_edit_product_key = window.jd_edit_product_key;
            var form_data = new FormData(form);
            if (this.imageFields[model]) {
                var image_field = this.imageFields[model];
                form_data.append('imageField', image_field);
            }
            var counter = form.getAttribute('id').split('_').pop();
            counter = parseInt(counter) -1;
            form_data.append('counter', counter);
            form_data.append('model', model);
            form_data.append('relatedId', 'category_id');
            this.appendCheckbox(form, form_data);
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + uri;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            error_container = document.getElementById('jd_error_container');
                            error_container.innerHTML = '';
                            var response = JSON.parse(this.response);
                            if (response.result === 'error') {
                                if (error_container) {
                                    var html = '';
                                    if (Array.isArray(response.message)) {
                                        response.message.forEach(function (item) {
                                            html += '<div>' + item + '</div>';
                                        })
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
                                console.log('error', response.message, html);
                            } else if (response.error) {
                                if (error_container) {
                                    error_container.textContent = response.error.message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', error_container, response.error.message);
                            } else if (response[jd_edit_product_key] && response[jd_edit_product_key].result === 'error') {
                                if (error_container) {
                                    error_container.textContent = response[jd_edit_product_key].message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response[jd_edit_product_key].message);
                            } else if (response[jd_edit_product_key].success) {
                                var div = document.createElement('div');
                                div.innerHTML = response[jd_edit_product_key].success;
                                var form_container = form.closest('.additional-form');
                                var container = form_container.querySelector('.saved-result');
                                if (container) {
                                    var id = form.getAttribute('id');
                                    container.appendChild(div);
                                    form.parentNode.removeChild(form);
                                    var new_form = div.querySelector('form');
                                    jd_successEdit(new_form);
                                    self.disable_inputs(div);
                                    var del = div.querySelector('.glyphicon-remove');
                                    if (del) {
                                        del.classList.remove('hidden');
                                        del.addEventListener('click', function () {
                                            rest_admin_create.removeModel(div);
                                        })
                                    }
                                    var button = div.querySelector('button');
                                    if (button) {
                                        button.parentNode.removeChild(button);
                                    }
                                    self.updateSelects();
                                    new_form.setAttribute('id', id);
                                }
                                if (error_container) {
                                    error_container.innerHTML = '';
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
        },
        createMainModel: function (form) {
            jd_sanitize_checkbox(form);
            var self = this;
            var model = form.getAttribute('id').split('_').shift();
            var jd_edit_product_key = window.jd_edit_product_key;
            var form_data = new FormData(form);
            var error_container;
            var counter = form.getAttribute('id').split('_').pop();
            counter = parseInt(counter) -1;
            form_data.append('counter', counter);
            form_data.append('model', model);
            form_data.append('formId', form.getAttribute('id'));
            this.appendCheckbox(form, form_data);
            var url = window.jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + jd_form_create_main_url;
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
                                        response.message.forEach(function (item) {
                                            html += '<div>' + item + '</div>';
                                        })
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
                                    html = '';
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
                                var container = form.previousElementSibling;
                                if (container) {
                                    form.parentNode.removeChild(form);
                                    container.appendChild(div);
                                    var new_form = div.querySelector('form');
                                    jd_successEdit(new_form);
                                    self.disable_inputs(div);
                                    var button = div.querySelector('button');
                                    if (button) {
                                        button.parentNode.removeChild(button);
                                    }
                                    if (new_form && new_form.id && new_form.id.value !== '') {
                                        rest_admin_create.setProductId(new_form.id.value, new_form.name.value);
                                    }
                                    self.updateSelects();
                                }
                                if (error_container) {
                                    error_container.innerHTML = '';
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
        },
        createRelated: function (form, id, uri) {
            jd_sanitize_checkbox(form);
            uri = uri || jd_form_create_related_url;
            var self = this;
            var error_container;
            var model = form.getAttribute('id').split('_').shift();
            var settings = this.relatedModels[model];
            var form_data = new FormData(form);
            var jd_edit_product_key = window.jd_edit_product_key;
            var counter = form.getAttribute('id').split('_').pop();
            counter = parseInt(counter) -1;
            form_data.append('counter', counter);
            form_data.append('related', settings.model);
            form_data.append('mainField', 'category_id');
            form_data.append('modelField', settings.field);
            form_data.append('mainId', id);
            form_data.append('model', model);
            this.appendCheckbox(form, form_data);
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + uri;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            error_container = document.getElementById('jd_error_container');

                            if (response.result === 'error') {
                                if (error_container) {
                                    var html = '';
                                    if (Array.isArray(response.message)) {
                                        response.message.forEach(function (item) {
                                            html += '<div>' + item + '</div>';
                                        })
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
                                console.log('error', 1, response.message);
                            } else if (response.error) {
                                if (error_container) {
                                    error_container.textContent = response.error.message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', 2, error_container, response.error.message);
                            }  else if (response[jd_edit_product_key].result === 'error') {
                                if (error_container) {
                                    error_container.textContent = response[jd_edit_product_key].message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', 3, response[jd_edit_product_key].message);
                            } else if (response[jd_edit_product_key].success) {
                                var div = document.createElement('div');
                                div.innerHTML = response[jd_edit_product_key].success;
                                var form_container = form.closest('.additional-form');
                                var container = form_container.querySelector('.saved-result');
                                if (container) {
                                    var id = form.getAttribute('id');
                                    container.appendChild(div);
                                    form.parentNode.removeChild(form);
                                    var new_form = div.querySelector('form');
                                    jd_successEdit(new_form);
                                    self.disable_inputs(div);
                                    var button = div.querySelector('button');
                                    var del = div.querySelector('.glyphicon-remove');
                                    if (del) {
                                        del.classList.remove('hidden');
                                        del.addEventListener('click', function () {
                                            rest_admin_create.removeRelatedModel(div);
                                        })
                                    }
                                    if (button) {
                                        button.parentNode.removeChild(button);
                                    }

                                    new_form.setAttribute('id', id);
                                }
                                if (error_container) {
                                    error_container.innerHTML = '';
                                }
                            }
                        } catch (e) {
                            console.log('error', 4, e);
                        }
                    } else {
                        console.log('error response', this.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(form_data);
        },
        addMainId: function (el) {
            var main = document.getElementById(this.formId);
            if (main.tagName && main.tagName.toLowerCase() === 'form' && main.id && main.id.value !== '') {
                var input = null;
                var form = el.querySelector('form');
                if (form) {
                    input = form.category_id;
                }
                var id = main.id.value;
                var name = main.name.value;
                if (input) {
                    if (input.tagName.toLowerCase() === 'input') {
                        input.setAttribute('value', id);
                    } else if (input.tagName.toLowerCase() === 'select') {
                        var options = input.querySelectorAll('option');
                        if (options) {
                            var flag = false;
                            [].forEach.call(options, function (option)  {
                                if (option.value == id) {// not === !!!!
                                    option.setAttribute('selected', 'selected');
                                    flag = true;
                                }
                            });
                            if (!flag) {
                                var option = document.createElement('option');
                                option.setAttribute('value', id);
                                option.setAttribute('selected', 'selected');
                                option.textContent = name;
                                input.add(option);
                            }
                        }
                    }
                    input.closest('.col-xs-12').classList.add('hidden');
                }
            }
        },
        add: function (el, forms) {
            var self = this;
            var last_form = forms.pop();
            var counter, model, xhr, url;
            if (last_form
                && last_form.tagName
                && last_form.tagName.toLowerCase() === 'form'
                && last_form.id.tagName && last_form.id.tagName.toLowerCase() === 'input'
            ) {
                counter = last_form.id.id.split('_').pop();
                if (el.id) {
                    model = el.id.split('_').pop();
                    url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_form_get_url + model + '/' + counter + '/0';
                    xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                try {
                                    var div = document.createElement('div');
                                    div.innerHTML = this.response;
                                    // last_form.parentNode.insertBefore(div, last_form.nextSibling);
                                    var parent = last_form.parentNode;
                                    parent.parentNode.insertBefore(div, parent.nextSibling);
                                    rest_admin_create.addMainId(div);
                                    var forms = div.querySelectorAll('form');
                                    if (forms) {
                                        [].forEach.call(forms, function (form) {
                                            rest_admin_create.submit(form)
                                        })
                                    }
                                    rest_admin_create.removeExcessSubmit(el);
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
            } else {
                counter = self.getCounter(el);
                if (el.id) {
                    model = el.id.split('_').pop();
                    url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_form_get_url + model + '/' + counter + '/0';
                    xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                try {
                                    var div = document.createElement('div');
                                    div.innerHTML = this.response;
                                    el.parentNode.insertBefore(div, el);
                                    rest_admin_create.addMainId(div);
                                    var forms = div.querySelectorAll('form');
                                    if (forms) {
                                        [].forEach.call(forms, function (form) {
                                            rest_admin_create.submit(form)
                                        })
                                    }
                                    rest_admin_create.removeExcessSubmit(el);
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
        },
        removeExcess: function (el, forms) {
            var form = forms.pop();
            form.parentNode.removeChild(form);
            rest_admin_create.removeExcessSubmit(el);
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
                                                    rest_admin_create.add(el, []);
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
                                                    rest_admin_create.add(el, []);
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
        formsPlus: function (self, forms) {
            if (forms) {
                var unsavedForms = [];
                [].forEach.call(forms, function (form) {
                    var input = form.elements['id'];
                    if (input.tagName && input.tagName.toLowerCase() === 'input') {
                        if (input.value === '') {
                            unsavedForms.push(form);
                        }
                    }
                });
                if (unsavedForms.length === 0) {
                    rest_admin_create.add(self, []);
                }
                // rest_admin_create.add(self, unsavedForms);
            }
        },
        formsMinus: function (self, forms) {
            if (forms) {
                var unsavedForms = [];
                [].forEach.call(forms, function (form) {
                    var input = form.elements['id'];
                    if (input.tagName && input.tagName.toLowerCase() === 'input') {
                        if (input.value === '') {
                            unsavedForms.push(form);
                        }
                    }
                });
                if  (unsavedForms.length > 1) {
                    rest_admin_create.removeExcess(self, unsavedForms);
                }
            }
        },
        getCounter: function(el) {
            var container = el.closest('div.additional-form');
            var counter = 0, cnt;
            if (container) {
                var cont = container.querySelector('div.saved-result');
                var forms = cont.querySelectorAll('form');
                if (forms) {
                    [].forEach.call(forms, function (form) {
                        if (form.id.value !== '' && !isNaN(form.id.value)) {
                            cnt = form.getAttribute('id').split('_').pop();
                            if (parseInt(cnt) > counter) {
                                counter = parseInt(cnt);
                            }
                        }
                    })
                }
            }
            return counter;
        },
        removeExcessSubmit: function (container) {
            if (container.parentNode) {
                var el = container.parentNode;
                var els = el.querySelectorAll('button[type=submit');
                var last = [].slice.call(els).pop();
                [].forEach.call(els, function (item) {
                    item.classList.add('hidden');
                });
                if (last) {
                    last.classList.remove('hidden');
                }
            }
        },
        submit: function (form) {
            var self = this;
            if (form.tagName && form.tagName.toLowerCase() === 'form') {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var main = document.getElementById(self.formId);
                    if (main && main.getAttribute('id') === form.getAttribute('id') && form.id.value === '') {
                        self.createMainModel(form);
                    }
                    if (main.tagName && main.tagName.toLowerCase() === 'form') {
                        if (main.id && main.id.value !== '' && !isNaN(main.id.value)) {
                            var container = form.closest('div.additional-form');
                            if (container) {
                                var forms = container.querySelectorAll('form');
                                if (forms) {
                                    [].forEach.call(forms, function (form) {
                                        if (form.id.value === '') {
                                            var model = form.getAttribute('id').split('_').shift();
                                            if (form.category_id) {
                                                form.category_id.value = main.id.value;
                                                if (self.modelsWithImages.indexOf(model) !== -1) {
                                                    setTimeout(function () {
                                                        rest_admin_create.create(form, jd_form_create_with_image_url);
                                                    }, 200)
                                                } else {
                                                    setTimeout(function () {
                                                        rest_admin_create.create(form);
                                                    }, 200)
                                                }
                                            } else if (self.relatedModels[model]) {
                                                var rel_settings = self.relatedModels[model];
                                                if (rel_settings.isImage) {
                                                    setTimeout(function () {
                                                        rest_admin_create.createRelated(form, main.id.value, jd_form_create_related_image_url)
                                                    }, 200)
                                                } else {
                                                    setTimeout(function () {
                                                        rest_admin_create.createRelated(form, main.id.value)
                                                    }, 200)
                                                }
                                            } else {
                                                console.log('Create product error - unknown type');
                                            }

                                        }
                                    })
                                }
                            }
                        }
                    }
                    return false;

                })
            }
        },
        submitAll: function () {
            var els = document.querySelectorAll('button[type=submit');
            [].forEach.call(els, function (item) {
                var form = item.parentNode;
                rest_admin_create.submit(form);
            })

        },
        updateSelects: function() {

        }
    };

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }

        var buttons = document.getElementById('rest_admin_models_block');
        var ps = buttons.querySelectorAll('p');
        if (ps) {
            [].forEach.call(ps, function (p) {
                p.parentNode.removeChild(p);
            });
        }

        var brs = buttons.querySelectorAll('br');
        if (brs) {
            [].forEach.call(brs, function (p) {
                p.parentNode.removeChild(p);
            })
        }

        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + formUrl;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        $('#admin_create_container').html(this.response);
                        rest_admin_create.submitAll();

                        rest_admin_create.init();

                        rest_admin_create.autocomplete();

                        var buttons_plus = document.querySelectorAll('div[id^=additional_forms_plus_');
                        if (buttons_plus) {
                            [].forEach.call(buttons_plus, function (button) {
                                button.addEventListener('click', function () {
                                    var self = this;
                                    var forms = this.parentNode.querySelectorAll('form');
                                    rest_admin_create.formsPlus(self, forms);
                                })
                            });
                        }

                        var buttons_minus = document.querySelectorAll('div[id^=additional_forms_minus_');
                        if (buttons_minus) {
                            [].forEach.call(buttons_minus, function (button) {
                                button.addEventListener('click', function () {
                                    var self = this;
                                    var forms = this.parentNode.querySelectorAll('form');
                                    rest_admin_create.formsMinus(self, forms);
                                })
                            });
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