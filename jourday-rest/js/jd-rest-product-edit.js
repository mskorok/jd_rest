var $ = jQuery.noConflict();
var app = angular.module('productEdit', []);
app.controller('productCtr', function($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
});
var jd_ajax_product_edit = {
    model: 'Product',
    formId: 'Product_edit_form',
    relatedModels: {
        ProductProvidedItems: {
            model: 'ProductToProvidedItems',
            url: window.jd_form_create_related_url,
            field: 'item_id',
            isImage: false
        },
        Tag: {
            model: 'ProductToTag',
            url: window.jd_form_create_related_url,
            field: 'tag_id',
            isImage: false
        },
        Image: {
            model: 'ProductToImage',
            url: window.jd_form_create_related_url,
            field: 'image_id',
            isImage: true
        }
    },
    modelsWithImages: [
        'ProductUsefulInfo',
        'User'
    ],
    imageFields: {
        'ProductUsefulInfo': 'avatar',
        'User' : 'avatar'
    },
    urls: {
        'ProductAvailability': 'product-availability',
        'ProductUsefulInfo': 'product-useful-info',
        'Activity': 'activities',
        'Addons': 'addons',
        'BlockedDates': 'blocked-dates',
        'Day': 'days',
        'GroupPriceDiscount': 'group-price-discount',
        'PersonsPriceDiscount': 'persons-price-discounts',
        'ProductDiscounts': 'product-discounts',
        'ProductOffers': 'product-offers',
        'ProductReview': 'product-review',
        'SpecificDate': 'specific-dates',
        'ProductProvidedItems': 'product-provided-items',
        'Image': 'images',
        'Tag': 'tags',
        'StartTime': 'start-time',
        'ProductToProvidedItems': 'product-to-provided-items',
        'ProductToTag': 'product-to-tag'
    },
    related: {
        'ProductProvidedItems': 'ProductToProvidedItems',
        'Tag': 'ProductToTag',
        'Image': 'ProductToImage'
    },
    relatedFields: {
        'ProductProvidedItems': 'item_id',
        'Tag': 'tag_id',
        'Image': 'image_id'
    },
    init: function () {
        var activity = document.getElementById('additional_forms_activity');
        var activity_button = document.getElementById('activity_click');
        var addons = document.getElementById('additional_forms_addons');
        var addons_button = document.getElementById('addons_click');
        var blockeddates = document.getElementById('additional_forms_blockeddates');
        var blockeddates_button = document.getElementById('blockeddates_click');
        var day = document.getElementById('additional_forms_day');
        var day_button = document.getElementById('day_click');
        var grouppricediscount = document.getElementById('additional_forms_grouppricediscount');
        var grouppricediscount_button = document.getElementById('grouppricediscount_click');
        var personspricediscount = document.getElementById('additional_forms_personspricediscount');
        var personspricediscount_button = document.getElementById('personspricediscount_click');
        var productavailability = document.getElementById('additional_forms_productavailability');
        var productavailability_button = document.getElementById('productavailability_click');
        var productdiscounts = document.getElementById('additional_forms_productdiscounts');
        var productdiscounts_button = document.getElementById('productdiscounts_click');
        var productoffers = document.getElementById('additional_forms_productoffers');
        var productoffers_button = document.getElementById('productoffers_click');
        var productreview = document.getElementById('additional_forms_productreview');
        var productreview_button = document.getElementById('productreview_click');
        var productusefulinfo = document.getElementById('additional_forms_productusefulinfo');
        var productusefulinfo_button = document.getElementById('productusefulinfo_click');
        var specificdate = document.getElementById('additional_forms_specificdate');
        var specificdate_button = document.getElementById('specificdate_click');
        var productprovideditems = document.getElementById('additional_forms_productprovideditems');
        var productprovideditems_button = document.getElementById('productprovideditems_click');
        var image = document.getElementById('additional_forms_image');
        var image_button = document.getElementById('image_click');
        var tag = document.getElementById('additional_forms_tag');
        var tag_button = document.getElementById('tag_click');
        var producttotag = document.getElementById('additional_forms_producttotag');
        var producttotag_button = document.getElementById('producttotag_click');
        var starttime = document.getElementById('additional_forms_starttime');
        var starttime_button = document.getElementById('starttime_click');
        if (activity_button && activity) {
            activity.classList.add('hidden');
            activity_button.addEventListener('click', function (e) {
                if (activity.classList.contains('hidden')) {
                    activity.classList.remove('hidden');
                } else {
                    activity.classList.add('hidden');
                }
            })
        }
        if (addons_button && addons) {
            addons.classList.add('hidden');
            addons_button.addEventListener('click', function (e) {
                if (addons.classList.contains('hidden')) {
                    addons.classList.remove('hidden');
                } else {
                    addons.classList.add('hidden');
                }
            })
        }
        if (blockeddates_button && blockeddates) {
            blockeddates.classList.add('hidden');
            blockeddates_button.addEventListener('click', function (e) {
                if (blockeddates.classList.contains('hidden')) {
                    blockeddates.classList.remove('hidden');
                } else {
                    blockeddates.classList.add('hidden');
                }
            })
        }
        if (day_button && day) {
            day.classList.add('hidden');
            day_button.addEventListener('click', function (e) {
                if (day.classList.contains('hidden')) {
                    day.classList.remove('hidden');
                } else {
                    day.classList.add('hidden');
                }
            })
        }
        if (grouppricediscount_button && grouppricediscount) {
            grouppricediscount.classList.add('hidden');
            grouppricediscount_button.addEventListener('click', function (e) {
                if (grouppricediscount.classList.contains('hidden')) {
                    grouppricediscount.classList.remove('hidden');
                } else {
                    grouppricediscount.classList.add('hidden');
                }
            })
        }
        if (personspricediscount_button && personspricediscount) {
            personspricediscount.classList.add('hidden');
            personspricediscount_button.addEventListener('click', function (e) {
                if (personspricediscount.classList.contains('hidden')) {
                    personspricediscount.classList.remove('hidden');
                } else {
                    personspricediscount.classList.add('hidden');
                }
            })
        }
        if (productavailability_button && productavailability) {
            productavailability.classList.add('hidden');
            productavailability_button.addEventListener('click', function (e) {
                if (productavailability.classList.contains('hidden')) {
                    productavailability.classList.remove('hidden');
                } else {
                    productavailability.classList.add('hidden');
                }
            })
        }
        if (productdiscounts_button && productdiscounts) {
            productdiscounts.classList.add('hidden');
            productdiscounts_button.addEventListener('click', function (e) {
                if (productdiscounts.classList.contains('hidden')) {
                    productdiscounts.classList.remove('hidden');
                } else {
                    productdiscounts.classList.add('hidden');
                }
            })
        }
        if (productoffers_button && productoffers) {
            productoffers.classList.add('hidden');
            productoffers_button.addEventListener('click', function (e) {
                if (productoffers.classList.contains('hidden')) {
                    productoffers.classList.remove('hidden');
                } else {
                    productoffers.classList.add('hidden');
                }
            })
        }
        if (productreview_button && productreview) {
            productreview.classList.add('hidden');
            productreview_button.addEventListener('click', function (e) {
                if (productreview.classList.contains('hidden')) {
                    productreview.classList.remove('hidden');
                } else {
                    productreview.classList.add('hidden');
                }
            })
        }
        if (productusefulinfo_button && productusefulinfo) {
            productusefulinfo.classList.add('hidden');
            productusefulinfo_button.addEventListener('click', function (e) {
                if (productusefulinfo.classList.contains('hidden')) {
                    productusefulinfo.classList.remove('hidden');
                } else {
                    productusefulinfo.classList.add('hidden');
                }
            })
        }
        if (specificdate_button && specificdate) {
            specificdate.classList.add('hidden');
            specificdate_button.addEventListener('click', function (e) {
                if (specificdate.classList.contains('hidden')) {
                    specificdate.classList.remove('hidden');
                } else {
                    specificdate.classList.add('hidden');
                }
            })
        }
        if (productprovideditems_button && productprovideditems) {
            productprovideditems.classList.add('hidden');
            productprovideditems_button.addEventListener('click', function (e) {
                if (productprovideditems.classList.contains('hidden')) {
                    productprovideditems.classList.remove('hidden');
                } else {
                    productprovideditems.classList.add('hidden');
                }
            })
        }
        if (image_button && image) {
            image.classList.add('hidden');
            image_button.addEventListener('click', function (e) {
                if (image.classList.contains('hidden')) {
                    image.classList.remove('hidden');
                } else {
                    image.classList.add('hidden');
                }
            })
        }
        if (tag_button && tag) {
            tag.classList.add('hidden');
            tag_button.addEventListener('click', function (e) {
                if (tag.classList.contains('hidden')) {
                    tag.classList.remove('hidden');
                } else {
                    tag.classList.add('hidden');
                }
            })
        }
        if (producttotag_button && producttotag) {
            producttotag.classList.add('hidden');
            producttotag_button.addEventListener('click', function (e) {
                if (producttotag.classList.contains('hidden')) {
                    producttotag.classList.remove('hidden');
                } else {
                    producttotag.classList.add('hidden');
                }
            })
        }
        if (starttime_button && starttime) {
            starttime.classList.add('hidden');
            starttime_button.addEventListener('click', function (e) {
                if (starttime.classList.contains('hidden')) {
                    starttime.classList.remove('hidden');
                } else {
                    starttime.classList.add('hidden');
                }
            })
        }
    },
    autocomplete: function () {
        // var users = [
        //     {
        //         field: 'firstName',
        //         selector: '#firstName_model_User_counter_1'
        //     },
        //     {
        //         field: 'lastName',
        //         selector: '#lastName_model_User_counter_1'
        //     },
        //     {
        //         field: 'email',
        //         selector: '#email_model_User_counter_1'
        //     },
        //     {
        //         field: 'address1',
        //         selector: '#address1_model_User_counter_1'
        //     },
        //     {
        //         field: 'address2',
        //         selector: '#address2_model_User_counter_1'
        //     },
        //     {
        //         field: 'phone',
        //         selector: '#phone_model_User_counter_1'
        //     },
        //     {
        //         field: 'mobile',
        //         selector: '#mobile_model_User_counter_1'
        //     },
        //     {
        //         field: 'firstName',
        //         selector: '#firstName_model_User_counter_2'
        //     },
        //     {
        //         field: 'lastName',
        //         selector: '#lastName_model_User_counter_2'
        //     },
        //     {
        //         field: 'email',
        //         selector: '#email_model_User_counter_2'
        //     },
        //     {
        //         field: 'address1',
        //         selector: '#address1_model_User_counter_2'
        //     },
        //     {
        //         field: 'address2',
        //         selector: '#address2_model_User_counter_2'
        //     },
        //     {
        //         field: 'phone',
        //         selector: '#phone_model_User_counter_2'
        //     },
        //     {
        //         field: 'mobile',
        //         selector: '#mobile_model_User_counter_2'
        //     }
        // ];
        //

        // jd_rest_awesomplete_mass(
        //     'email',
        //     'users',
        //     jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        //     users
        // );


        jd_rest_awesomplete(
            'email',
            'users',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
            '#beneficiary_id_model_Product_counter_1'
        );
    },
    setProductId: function(id, name) {
        var forms = document.querySelectorAll('form');
        [].forEach.call(forms, function (form) {
            var input = form.product_id;
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
    appendCheckbox: function(form, form_data) {
        if (form.instantBooking) {
            form_data.append('instantBooking', form.instantBooking.value);
        }
        if (form.daily) {
            form_data.append('daily', form.daily.value);
        }
        if (form.perPerson) {
            form_data.append('perPerson', form.perPerson.value);
        }
    },
    edit: function (form, uri) {
        jd_sanitize_checkbox(form);
        uri = uri ||  jd_form_create_url;
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
        form_data.append('relatedId', 'product_id');
        form_data.append('showControls', '1');
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
                                //self.disable_inputs(div);
                                var del = div.querySelector('.glyphicon-remove');
                                if (del) {
                                    del.classList.remove('hidden');
                                    del.addEventListener('click', function () {
                                        jd_ajax_product_edit.removeModel(div);
                                    })
                                }
                                var button = div.querySelector('button');
                                if (button) {
                                    button.parentNode.removeChild(button);
                                }
                                var new_form = div.querySelector('form');
                                new_form.setAttribute('id', id);
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
    },
    editMainModel: function (form, uri, remove) {
        jd_sanitize_checkbox(form);
        remove = remove || false;
        uri = uri ||  jd_form_create_main_url;
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
        var url = window.jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + uri;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);

                        if (response.result === 'error') {
                            error_container = document.getElementById('jd_error_container');
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
                            error_container = document.getElementById('jd_error_container');
                            if (error_container) {
                                error_container.textContent = response.error.message;
                                window.location.hash = 'top';
                            }
                            console.log('error', error_container, response.error.message);
                        }  else if (response[jd_edit_product_key].result === 'error') {
                            error_container = document.getElementById('jd_error_container');
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
                                    jd_ajax_product_edit.submit(new_form);
                                }
                                var remove_button = container.querySelector('.glyphicon-remove');
                                if (remove && remove_button) {
                                    remove_button.classList.remove('hidden');
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
    },
    editRelated: function (form, id, uri) {
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
        form_data.append('mainField', 'product_id');
        form_data.append('modelField', settings.field);
        form_data.append('mainId', id);
        form_data.append('model', model);
        form_data.append('showControls', '1');
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
                            if (form_container) {
                                var container = form_container.querySelector('.saved-result');
                                if (container) {
                                    var id = form.getAttribute('id');
                                    container.appendChild(div);
                                    form.parentNode.removeChild(form);
                                    var del = div.querySelector('.glyphicon-remove');
                                    if (del) {
                                        del.classList.remove('hidden');
                                        del.addEventListener('click', function () {
                                            jd_ajax_product_edit.removeRelatedModel(div);
                                        })
                                    }
                                    var new_form = div.querySelector('form');
                                    if (new_form) {
                                        new_form.setAttribute('id', id);
                                    }
                                    jd_successEdit(new_form);
                                }
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
                input = form.product_id;
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
                                var container = last_form.parentNode;
                                container.parentNode.insertBefore(div, container.nextSibling);
                                self.addMainId(div);
                                var forms = div.querySelectorAll('form');
                                if (forms) {
                                    [].forEach.call(forms, function (form) {
                                        self.submit(form)
                                    })
                                }
                                // self.removeExcessSubmit(el);
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
                                jd_ajax_product_edit.addMainId(div);
                                var forms = div.querySelectorAll('form');
                                if (forms) {
                                    [].forEach.call(forms, function (form) {
                                        jd_ajax_product_edit.submit(form)
                                    })
                                }
                                // jd_ajax_product_edit.removeExcessSubmit(el);
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
    removeExcess: function (el, forms) {
        var form = forms.pop();
        form.parentNode.removeChild(form);
        // jd_ajax_product_edit.removeExcessSubmit(el);
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
                                                jd_ajax_product_edit.add(el, []);
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
                    form_data.append('mainField', 'product_id');

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
                                                jd_ajax_product_edit.add(el, []);
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
                jd_ajax_product_edit.add(self, []);
            }
            // jd_ajax_product_edit.add(self, unsavedForms);
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
                jd_ajax_product_edit.removeExcess(self, unsavedForms);
            }
        }
    },
    removeExcessSubmit: function (container) {
        // if (container.parentNode) {
        //     var el = container.parentNode;
        //     var button;
        //     var del;
        //     var els = el.querySelectorAll('button[type=submit');
        //     var unsavedForms = [];
        //     [].forEach.call(els, function (el) {
        //         var form = el.parentNode;
        //         var input = form.elements['id'];
        //         if (input.tagName && input.tagName.toLowerCase() === 'input') {
        //             if (input.value === '') {
        //                 unsavedForms.push(form);
        //             }
        //         }
        //     });
        //
        //     var last = [].slice.call(unsavedForms).pop();
        //     [].forEach.call(unsavedForms, function (item) {
        //         button = item.querySelector('button[type=submit');
        //         if (button) {
        //             button.classList.add('hidden');
        //         }
        //         del = item.querySelector('.glyphicon-remove');
        //         if (del) {
        //             del.classList.remove('hidden');
        //             del.addEventListener('click', function () {
        //                 item.parentNode.removeChild(item);
        //             })
        //         }
        //
        //     });
        //     if (last) {
        //         del = last.querySelector('.glyphicon-remove');
        //         if (del) {
        //             del.classList.add('hidden');
        //         }
        //         button = last.querySelector('button[type=submit');
        //         if (button) {
        //             button.classList.remove('hidden');
        //         }
        //     }
        // }
    },
    submit: function (form) {
        var self = this;
        var native_form = form;
        var model, rel_settings;
        if (form.tagName && form.tagName.toLowerCase() === 'form') {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var main = document.getElementById(self.formId);
                if (main && main.getAttribute('id') === form.getAttribute('id')) {
                    self.editMainModel(form, false, true);
                }

                if (main.tagName
                    && main.tagName.toLowerCase() === 'form'
                    && main.getAttribute('id') !== form.getAttribute('id')
                ) {
                    if (main.id && main.id.value !== '' && !isNaN(main.id.value)) {
                        if (native_form.id.value !== '') {
                            model = native_form.getAttribute('id').split('_').shift();
                            if (native_form.product_id) {
                                native_form.product_id.value = main.id.value;
                                if (self.modelsWithImages.indexOf(model) !== -1) {
                                    setTimeout(function () {
                                        self.editMainModel(native_form, jd_form_create_with_image_url, true);
                                    }, 200)
                                } else {
                                    setTimeout(function () {
                                        self.editMainModel(native_form, false, true);
                                    }, 200)
                                }
                            } else if (self.relatedModels[model]) {
                                rel_settings = self.relatedModels[model];
                                if (rel_settings.isImage) {
                                    setTimeout(function () {
                                        self.editRelated(native_form, main.id.value, jd_form_create_related_image_url)
                                    }, 200)
                                } else {
                                    setTimeout(function () {
                                        self.editRelated(native_form, main.id.value)
                                    }, 200)
                                }
                            } else {
                                console.log('Create product error - unknown type');
                            }
                        }
                        var container = form.closest('div.additional-form');
                        if (container) {
                            var forms = container.querySelectorAll('form');
                            if (forms) {
                                [].forEach.call(forms, function (form) {
                                    if (form.id.value === '') {
                                        model = form.getAttribute('id').split('_').shift();
                                        if (form.product_id) {
                                            form.product_id.value = main.id.value;
                                            if (self.modelsWithImages.indexOf(model) !== -1) {
                                                setTimeout(function () {
                                                    jd_ajax_product_edit.edit(form, jd_form_create_with_image_url);
                                                }, 200)
                                            } else {
                                                setTimeout(function () {
                                                    jd_ajax_product_edit.edit(form);
                                                }, 200)
                                            }
                                        } else if (self.relatedModels[model]) {
                                            rel_settings = self.relatedModels[model];
                                            if (rel_settings.isImage) {
                                                setTimeout(function () {
                                                    jd_ajax_product_edit.editRelated(form, main.id.value, jd_form_create_related_image_url)
                                                }, 200)
                                            } else {
                                                setTimeout(function () {
                                                    jd_ajax_product_edit.editRelated(form, main.id.value)
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
            jd_ajax_product_edit.submit(form);
        })

    },
    skip_tags: function (selector) {
        var buttons = document.getElementById(selector);
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
    },
    addRemoveListeners: function (form) {
        var model = form.getAttribute('id').split('_').shift();
        if (form.product_id) {
            if (this.modelsWithImages.indexOf(model) !== -1) {
                jd_ajax_product_edit.removeModel(form.parentNode);
            } else {
                jd_ajax_product_edit.removeModel(form.parentNode);
            }
        } else if (this.relatedModels[model]) {
            var rel_settings = this.relatedModels[model];
            if (rel_settings.isImage) {
                jd_ajax_product_edit.removeRelatedModel(form.parentNode);
            } else {
                jd_ajax_product_edit.removeRelatedModel(form.parentNode);
            }
        } else {
            console.log('Remove product error - unknown type');
        }
    },
    getItem: function () {
        var product_id = getParameterByName('product_id');
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_product_edit_get_url + product_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var container = document.getElementById('product_edit_container');
                        container.innerHTML = this.response;
                        // $('#product_edit_container').html(this.response);

                        var remove_buttons = container.querySelectorAll('.glyphicon-remove');
                        [].forEach.call(remove_buttons, function (del) {
                            if (del) {
                                var form = del.closest('form');
                                del.classList.remove('hidden');
                                del.addEventListener('click', function () {
                                    jd_ajax_product_edit.addRemoveListeners(form);
                                })
                            }
                        });
                        jd_ajax_product_edit.submitAll();
                        jd_ajax_product_edit.init();
                        jd_ajax_product_edit.autocomplete();

                        var buttons_plus = document.querySelectorAll('div[id^=additional_forms_plus_');
                        if (buttons_plus) {
                            [].forEach.call(buttons_plus, function (button) {
                                button.addEventListener('click', function () {
                                    var self = this;
                                    var forms = this.parentNode.querySelectorAll('form');
                                    jd_ajax_product_edit.formsPlus(self, forms);
                                })
                            });
                        }

                        var buttons_minus = document.querySelectorAll('div[id^=additional_forms_minus_');
                        if (buttons_minus) {
                            [].forEach.call(buttons_minus, function (button) {
                                button.addEventListener('click', function () {
                                    var self = this;
                                    var forms = this.parentNode.querySelectorAll('form');
                                    jd_ajax_product_edit.formsMinus(self, forms);
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
    }
};
document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }
    jd_ajax_product_edit.skip_tags('jd_rest_product_models_block');

    var product_id = getParameterByName('product_id');
    if (!product_id) {
        window.location.href = jd_product_list_url;
    }

    if (jd_admin()) {
        jd_ajax_product_edit.getItem();
    } else {
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&method=POST&url=' + jd_owner_product_url + product_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response =  JSON.parse(this.response);
                        if (response.result === 'OK') {
                            jd_ajax_product_edit.getItem();
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