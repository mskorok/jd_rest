var $ = jQuery.noConflict();
var app = angular.module('bookingCreate', []);
app.controller('createCtr', function($scope) {

    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    //FILL

    jd_rest_fill_model(
        'email',
        'users',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        $scope
    );

    jd_rest_fill_model(
        'name',
        'cities',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=cities',
        $scope
    );

    jd_rest_fill_model(
        'name',
        'languages',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=languages',
        $scope
    );
});
var jd_ajax_booking_create = {
    model: 'Booking',
    formId: 'Booking_create_form',
    relatedModels: {},
    modelsWithImages: [
        'User'
    ],
    imageFields: {
        'User' : 'avatar'
    },
    urls: {
        'BookingItems': 'booking-items',
        'User': 'users'
    },
    related: {},
    relatedFields: {},
    additionListenersSettings: {
        Activity: {
            model: 'Activity',
            field: 'code',
            sort: 2
        },
        ActivityCategory: {
            model: 'ActivityCategory',
            field: 'name',
            sort: 1
        },
        ActivityType: {
            model: 'ActivityType',
            field: 'name',
            sort: 1
        },
        product_id: {
            model: 'Product',
            field: 'name',
            sort: 3
        },
        startTime_id: {
            model: 'StartTime',
            field: 'time',
            sort: 4
        }
    },
    init: function () {
        var bookingitems = document.getElementById('additional_forms_bookingitems');
        var bookingitems_button = document.getElementById('bookingitems_click');
        // var user = document.getElementById('additional_forms_user');
        // var user_button = document.getElementById('user_click');

        if (bookingitems_button && bookingitems) {
            bookingitems.classList.add('hidden');
            bookingitems_button.addEventListener('click', function (e) {
                if (bookingitems.classList.contains('hidden')) {
                    bookingitems.classList.remove('hidden');
                } else {
                    bookingitems.classList.add('hidden');
                }
            })
        }
        // if (user_button && user) {
        //     user.classList.add('hidden');
        //     user_button.addEventListener('click', function (e) {
        //         if (user.classList.contains('hidden')) {
        //             user.classList.remove('hidden');
        //         } else {
        //             user.classList.add('hidden');
        //         }
        //     })
        // }
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


        // jd_rest_awesomplete(
        //     'email',
        //     'users',
        //     jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        //     '#beneficiary_id_model_Booking_counter_1'
        // );
    },
    additionListeners: function (form) {
        var selects = form.querySelectorAll('select');
        var self = this;
        var keys = Object.keys(this.additionListenersSettings);
        [].forEach.call(selects, function (select) {
            var name = select.getAttribute('name');
            if (keys.indexOf(name) !== -1) {
                select.addEventListener('change', function () {
                    if (self.additionListenersSettings[name].sort === 1) {
                        var activity_category = form.querySelector('select[name=ActivityCategory]');
                        var activity_type = form.querySelector('select[name=ActivityType]');
                        var category = activity_category.options[activity_category.selectedIndex].value;
                        var type = activity_type.options[activity_type.selectedIndex].value;
                        self.setActivities(form, category, type);
                    } else if (self.additionListenersSettings[name].sort === 2) {
                        var activity = form.querySelector('select[name=Activity]');
                        var arg = activity.options[activity.selectedIndex].value;
                        self.setProducts(form, arg);
                    }  else if (self.additionListenersSettings[name].sort === 4) {
                        self.finalPriceModal(form);
                    }
                })
            }

        })
    },
    appendCheckbox: function(form, form_data){
        if (form.isChild) {
            form_data.append('isChild', form.isChild.value);
        }
        if (form.isStudent) {
            form_data.append('isStudent', form.isStudent.value);
        }
    },
    finalPriceModal: function (form) {
        this.checkFinalPrice(form)
    },
    setIsAllowed: function (form) {
        var available = form.querySelector('input[name=available]');
        if (available) {
            available.setAttribute('value', '1');
        }
    },
    setNotAllowed: function (form) {
        var available = form.querySelector('input[name=available]');
        if (available) {
            available.setAttribute('value', '0');
        }
    },
    setAllowed: function (form, data, startDate) {
        var hasPrice = false;
       [].forEach.call(data, function (row) {
           if (row.startDate === startDate && row.price !== null) {
               hasPrice = true;
               var finalPrice = form.finalPrice;
               if (finalPrice) {
                   finalPrice.value = row.price;
               }
           }
       });
        if (hasPrice) {
          this.setIsAllowed(form);
        } else {
            this.setNotAllowed(form);
        }
    },
    cleanModal: function () {
        var tbody = document.getElementById('modal_tbody');
        tbody.innerHTML = '';
    },
    submitFromModal: function(id, startDate, endDate, price) {
        var self = this;
        var form = document.getElementById(id);
        if (form.finalPrice) {
            form.finalPrice.value = price;
        }

        if (form.available) {
            form.available.value = 1;
        }
        var main = document.getElementById(self.formId);
        $('#biModal').modal('hide');
        this.cleanModal();
        if (main && main.getAttribute('id') === form.getAttribute('id') && form.id.value === '') {
            self.createMainModel(form);
        }

        if (main.tagName && main.tagName.toLowerCase() === 'form') {
            if (main.id && main.id.value !== '' && !isNaN(main.id.value)) {
                if (form) {
                    var start_input = form.querySelector('input[name=startDate]');
                    var end_input = form.querySelector('input[name=endDate]');
                    start_input.value = startDate;
                    end_input.value = endDate;
                    this.create(form);
                }
            }
        }
        return false;
    },
    createModal: function (form, data) {
        var tr = '', tr1 = '<tr>', tr2 = '<tr>';
        var i = 0, firstDate = form.startDate.value, firstDateEnd = form.endDate.value;
        var lastDate = form.startDate.value, lastDateEnd = form.endDate.value;
        var func = '', funcLeft, funcRight;
        var id = form.getAttribute('id');
        var modal = document.getElementById('biModal');
        if (modal) {
            modal.setAttribute('data-form-id', id);
        }
        [].forEach.call(data, function (row) {
            var gradient, price;
            var color = 'white';

            if (form.startDate.value === row.startDate) {
                color = 'yellow';
            }

            lastDate = row.startDate;
            lastDateEnd = row.endDate;
            if (i === 0) {
                firstDate = row.startDate;
                firstDateEnd = row.endDate;
            }
            i++;
            if (row.price === null) {
                price = 0;
                gradient = 'table-head-color-red';
                func = 'onclick="jd_ajax_booking_create.rewriteModal(\'' + id + '\', \'' + row.startDate + '\', \'' + row.endDate + '\')"'
            } else {
                price = row.price;
                gradient =  'table-head-color-green';
                func = 'onclick="jd_ajax_booking_create.submitFromModal(\'' +
                    id + '\', \'' + row.startDate + '\', \'' + row.endDate + '\', \'' + price +  '\')"'
            }

            tr1 += '<th nowrap="" width="9%" class="price-table blue-gradient-vertical ' + color + ' jd-br-0">\n' +
                '                                    <div class="not-transform smaller">\n' +
                '                                        <div class="jd-align-center w-100 jd-pointer" ' + func + '>' + row.startDate + '</div>\n' +
                '                                    </div>\n' +
                '                                </th>';

            tr2 += '<td align="center" class="smaller ' + gradient + ' price-table" width="9%">\n' +
                '                                    <span class="price-table  w-100 jd-pointer" ' + func + '>\n' +
                price +
                '                                    </span>\n' +
                '                                </td>';
        });

        funcLeft = 'onclick="jd_ajax_booking_create.rewriteModal(\'' + id + '\', \'' + firstDate + '\', \'' + firstDateEnd + '\')"';
        funcRight = 'onclick="jd_ajax_booking_create.rewriteModal(\'' + id + '\', \'' + lastDate + '\', \'' + lastDateEnd + '\')"';

        tr += '<tr style="background-color: transparent;">\n' +
            '    <td style="border: none;">&nbsp;</td>\n' +
            '    <th colspan="7" align="center" style="background-color:transparent; border: none;">\n' +
            '        <a href="javascript:void(0);" ' + funcLeft + '>\n' +
            '            &nbsp;<i class="fa fa-arrow-circle-left"></i>\n' +
            '        </a>\n' +
            '        <a href="javascript:void(0);" ' + funcRight + '>\n' +
            '            &nbsp;<i class="fa fa-arrow-circle-right"></i>\n' +
            '        </a>\n' +
            '    </th>\n' +
            '</tr>\n';
        tr1 += '</tr>\n';
        tr2 += '</tr>\n';

        var tbody = document.getElementById('modal_tbody');
        tbody.innerHTML = tr +  tr1 + tr2;
      //
    },
    writeModal: function (form, params) {
        var self = this;
        var diff = DateDiff.inDays(params.start, params.end);
        var start_date = new Date();
        var start_date_time = params.start.getTime() - 432000000;
        start_date.setTime(start_date_time);

        var data = [];
        var obj;
        for (var i = 0; i < 10; i++) {
            var current_start_date = new Date();
            var current_start_date_time = start_date.getTime() + 86400000*i;
            current_start_date.setTime(current_start_date_time);
            var current_end_date = new Date();
            var current_end_date_time = start_date.getTime() + 86400000*(i + diff);
            current_end_date.setTime(current_end_date_time);
            obj = {
                'productId': params.product,
                'isChild': params.isChild,
                'isStudent': params.isStudent,
                'slots': params.slots,
                'startDate': current_start_date.toISOString().split('T').shift(),
                'endDate': current_end_date.toISOString().split('T').shift(),
                'startTime': params.startTime
            };
            data.push(obj);
        }
        data = JSON.stringify(data);
        var url = jd_rest_host + '?action=jourday_ajax_send_form_post_models&url=' + jd_final_price_get_url;
        var xhr = new XMLHttpRequest();
        var form_data = new FormData();
        form_data.append('data', data);
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        if (response.data.finalPrices) {
                            self.createModal(form, response.data.finalPrices);
                            self.setAllowed(form, response.data.finalPrices, start_date.value);
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
    rewriteModal: function(id, startDate, endDate) {
        var form = document.getElementById(id);
        if (form) {
            var start_input = form.querySelector('input[name=startDate]');
            var end_input = form.querySelector('input[name=endDate]');
            start_input.value = startDate;
            end_input.value = endDate;
            var time_input = form.querySelector('select[name=startTime_id]');
            var start_time = time_input.options[time_input.selectedIndex].textContent;
            var isChild = 0;
            var child = form.querySelector('input[name=isChild]');

            if (child) {
                isChild = parseInt(child.value);
            }
            var isStudent = 0;
            var student = form.querySelector('input[name=isStudent]');
            if (student) {
                isStudent = parseInt(student.value);
            }
            var product = form.querySelector('select[name=product_id]');
            var slots = form.querySelector('input[name=slots]');
            if (slots) {
                slots = slots.value;
            } else {
                this.setNotAllowed(form);
                return false;
            }

            if (slots === '' || isNaN(slots)) {
                this.setNotAllowed(form);
                return false;
            }

            if (!product) {
                this.setNotAllowed(form);
                return false;
            }

            product = product.options[product.selectedIndex].value;
            if (product === '' || isNaN(product)) {
                this.setNotAllowed(form);
                return false;
            }

            var start = new Date(start_input.value);
            var end = new Date(end_input.value);


            var params = {
                product: parseInt(product),
                isChild: isChild,
                isStudent: isStudent,
                slots: parseInt(slots),
                start: start,
                end: end,
                startTime: start_time
            };

            this.writeModal(form, params);
        }
    },
    checkFinalPrice: function (form) {
        var main = document.getElementById(this.formId);
        console.log(1);
        if (!main) {
            console.log(2);
            return false;
        }
        if (!main.id || main.id.value === '' || isNaN(main.id.value)) {
            console.log(3);
            return false;
        }
        console.log(4);
        var time_input = form.querySelector('select[name=startTime_id]');
        var start_time = time_input.options[time_input.selectedIndex].textContent;
        var start_input = form.querySelector('input[name=startDate]');
        var end_input = form.querySelector('input[name=endDate]');

        var isChild = 0;
        var child = form.querySelector('input[name=isChild]');

        if (child) {
            isChild = parseInt(child.value);
        }
        var isStudent = 0;
        var student = form.querySelector('input[name=isStudent]');
        if (student) {
            isStudent = parseInt(student.value);
        }
        var product = form.querySelector('select[name=product_id]');
        var slots = form.querySelector('input[name=slots]');
        var error_cont;
        if (slots) {
            if (slots.value === '' || parseInt(slots.value) < 1) {
                error_cont = document.getElementById('jd_error_container');
                if (error_cont) {
                    error_cont.textContent = 'Slots is empty';
                    window.location.hash = 'top';
                }
                this.setNotAllowed(form);
                $('#biModal').modal('hide');
                console.log('Slots is empty');
                return false;
            }

            slots = slots.value;
        } else {
            error_cont = document.getElementById('jd_error_container');
            if (error_cont) {
                error_cont.textContent = 'Slots not found';
                window.location.hash = 'top';
            }
            $('#biModal').modal('hide');
            console.log('Slots not found');
            this.setNotAllowed(form);
            return false;
        }

        if (slots === '' || isNaN(slots)) {
            this.setNotAllowed(form);
            return false;
        }

        if (!product) {
            this.setNotAllowed(form);
            return false;
        }

        product = product.options[product.selectedIndex].value;
        if (product === '' || isNaN(product)) {
            this.setNotAllowed(form);
            return false;
        }

        var start = new Date(start_input.value);
        var end = new Date(end_input.value);


        var params = {
            product: parseInt(product),
            isChild: isChild,
            isStudent: isStudent,
            slots: parseInt(slots),
            start: start,
            end: end,
            startTime: start_time
        };
        $('#biModal').modal();
        this.writeModal(form, params);
    },
    disable_inputs: function (el) {
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
    setBookingId: function (id, name) {
        var forms = document.querySelectorAll('form');
        var paypal = document.getElementById('jd_booking_payment');
        if (paypal) {
            paypal.classList.remove('hidden');
        }
        [].forEach.call(forms, function (form) {
            var input = form.booking_id;
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
    createBookingItems: function (form, uri) {
        jd_sanitize_checkbox(form);
        var available = form.querySelector('input[name=available]');
        if (!available) {
            console.log(5);
            this.finalPriceModal(form);
            return false;
        }
        if (parseInt(available.value) !== 1) {
            console.log(6);
            this.finalPriceModal(form);
            return false;
        }
        console.log(7);
        uri = uri ||  jd_form_create_url;
        var self = this;
        var error_container;
        var model = form.getAttribute('id').split('_').shift();
        var jd_edit_product_key = window.jd_edit_product_key;
        var form_data = new FormData(form);
        var counter = form.getAttribute('id').split('_').pop();
        counter = parseInt(counter) -1;
        form_data.append('counter', counter);
        form_data.append('model', model);
        form_data.append('relatedId', 'booking_id');
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
                                $('#biModal').modal('hide');
                                window.location.hash = 'top';
                            }
                            console.log('error', response.message, html);
                        } else if (response.error) {
                            if (error_container) {
                                error_container.textContent = response.error.message;
                                $('#biModal').modal('hide');
                                window.location.hash = 'top';
                            }
                            console.log('error', error_container, response.error.message);
                        } else if (response[jd_edit_product_key] && response[jd_edit_product_key].result === 'error') {
                            if (error_container) {
                                error_container.textContent = response[jd_edit_product_key].message;
                                $('#biModal').modal('hide');
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
                                var booking_input = div.querySelector('select[name=booking_id]');
                                if (booking_input) {
                                    var booking_container = booking_input.closest('div[class^=col-xs-12]');
                                    if (booking_container) {
                                        booking_container.classList.add('hidden');
                                    }
                                }
                                var del = div.querySelector('.glyphicon-remove');
                                if (del) {
                                    del.classList.remove('hidden');
                                    del.addEventListener('click', function () {
                                        jd_ajax_booking_create.removeModel(div);
                                    })
                                }
                                var button = div.querySelector('button');
                                if (button) {
                                    button.parentNode.removeChild(button);
                                }
                                new_form.setAttribute('id', id);
                            }
                            error_container.innerHTML = '';
                            $('#biModal').modal('hide');
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
        form_data.append('relatedId', 'booking_id');
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
                                $('#biModal').modal('hide');
                                window.location.hash = 'top';
                            }
                            console.log('error', response.message, html);
                        } else if (response.error) {
                            if (error_container) {
                                error_container.textContent = response.error.message;
                                $('#biModal').modal('hide');
                                window.location.hash = 'top';
                            }
                            console.log('error', error_container, response.error.message);
                        } else if (response[jd_edit_product_key] && response[jd_edit_product_key].result === 'error') {
                            if (error_container) {
                                error_container.textContent = response[jd_edit_product_key].message;
                                $('#biModal').modal('hide');
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
                                var booking_input = div.querySelector('select[name=booking_id]');
                                if (booking_input) {
                                    var booking_container = booking_input.closest('div[class^=col-xs-12]');
                                    booking_container.classList.add('hidden');
                                }
                                var new_form = div.querySelector('form');
                                jd_successEdit(new_form);
                                self.disable_inputs(div);
                                var del = div.querySelector('.glyphicon-remove');
                                if (del) {
                                    del.classList.remove('hidden');
                                    del.addEventListener('click', function () {
                                        jd_ajax_booking_create.removeModel(div);
                                    })
                                }
                                var button = div.querySelector('button');
                                if (button) {
                                    button.parentNode.removeChild(button);
                                }
                                new_form.setAttribute('id', id);
                            }
                            self.removeExcessSubmit(form_container.firstChild);
                            error_container.innerHTML = '';
                            $('#biModal').modal('hide');
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
                        if (response.result === 'error') {
                            error_container.innerHTML = '';
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
                                $('#biModal').modal('hide');
                                window.location.hash = 'top';
                            }
                            console.log('error', response.message);
                        } else if (response.error) {
                            error_container = document.getElementById('jd_error_container');
                            if (error_container) {
                                error_container.textContent = response.error.message;
                                $('#biModal').modal('hide');
                                window.location.hash = 'top';
                            }
                            console.log('error', error_container, response.error.message);
                        }  else if (response[jd_edit_product_key].result === 'error') {
                            error_container = document.getElementById('jd_error_container');
                            if (error_container) {
                                error_container.textContent = response[jd_edit_product_key].message;
                                $('#biModal').modal('hide');
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
                                var affiliate = div.querySelector('select[id^=affiliate_model_Booking]');
                                if (affiliate) {
                                    var options = affiliate.querySelectorAll('option');
                                    var isSelected = false;
                                    [].forEach.call(options, function (option) {
                                        if (option.hasAttribute('selected')) {
                                            isSelected = true;
                                        }
                                    });
                                    if (!isSelected) {
                                        var option = document.createElement('option');
                                        option.setAttribute('value', '');
                                        option.setAttribute('selected', 'selected');
                                        affiliate.appendChild(option);
                                    }

                                }
                                var new_form = div.querySelector('form');
                                jd_successEdit(new_form);
                                self.disable_inputs(div);
                                var button = div.querySelector('button');
                                if (button) {
                                    button.parentNode.removeChild(button);
                                }
                                if (new_form && new_form.id && new_form.id.value !== '') {
                                    jd_ajax_booking_create.setBookingId(new_form.id.value, new_form.name.value);
                                }
                            }
                            error_container.innerHTML = '';
                            $('#biModal').modal('hide');
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
        form_data.append('mainField', 'booking_id');
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
                        $('#biModal').modal('hide');
                        if (response.result === 'error') {
                            if (error_container) {
                                var html = '';
                                if (Array.isArray(response.message)) {
                                    response.message.forEach(function (item) {
                                        html += '<div>' + item + '</div>';
                                    })
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
                                        jd_ajax_booking_create.removeRelatedModel(div);
                                    })
                                }
                                if (button) {
                                    button.parentNode.removeChild(button);
                                }
                                new_form.setAttribute('id', id);
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
                input = form.booking_id;
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
                                var parent = last_form.parentNode;
                                parent.parentNode.insertBefore(div, parent.nextSibling);
                                jd_ajax_booking_create.addMainId(div);
                                var forms = div.querySelectorAll('form');
                                if (forms) {
                                    [].forEach.call(forms, function (form) {
                                        jd_ajax_booking_create.submit(form);
                                        jd_ajax_booking_create.additionListeners(form);
                                    })
                                }
                                jd_ajax_booking_create.removeExcessSubmit(el);
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
                                jd_ajax_booking_create.addMainId(div);
                                var forms = div.querySelectorAll('form');
                                if (forms) {
                                    [].forEach.call(forms, function (form) {
                                        jd_ajax_booking_create.submit(form);
                                        jd_ajax_booking_create.additionListeners(form);
                                    })
                                }
                                jd_ajax_booking_create.removeExcessSubmit(el);
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
        jd_ajax_booking_create.removeExcessSubmit(el);
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
                                                jd_ajax_booking_create.add(el, []);
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
                    form_data.append('mainField', 'booking_id');

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
                                                jd_ajax_booking_create.add(el, []);
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
                jd_ajax_booking_create.add(self, []);
            }
            // jd_ajax_booking_create.add(self, unsavedForms);
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
                jd_ajax_booking_create.removeExcess(self, unsavedForms);
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
                                        if (form.booking_id) {
                                            form.booking_id.value = main.id.value;
                                            if (self.modelsWithImages.indexOf(model) !== -1) {
                                                setTimeout(function () {
                                                    jd_ajax_booking_create.create(form, jd_form_create_with_image_url);
                                                }, 200)
                                            } else if (model === 'BookingItems') {
                                                setTimeout(function () {
                                                    jd_ajax_booking_create.createBookingItems(form);
                                                }, 200)
                                            } else {
                                                setTimeout(function () {
                                                    jd_ajax_booking_create.create(form);
                                                }, 200)
                                            }
                                        } else if (self.relatedModels[model]) {
                                            var rel_settings = self.relatedModels[model];
                                            if (rel_settings.isImage) {
                                                setTimeout(function () {
                                                    jd_ajax_booking_create.createRelated(form, main.id.value, jd_form_create_related_image_url)
                                                }, 200)
                                            } else {
                                                setTimeout(function () {
                                                    jd_ajax_booking_create.createRelated(form, main.id.value)
                                                }, 200)
                                            }
                                        } else {
                                            console.log('Create booking error - unknown type');
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
            jd_ajax_booking_create.submit(form);
            jd_ajax_booking_create.additionListeners(form);
        })

    },
    setActivities: function(form, category, type) {
        var url = 'activities/?' +
            'having={%22category%22:%22' + category + '%22,%22type%22:%22' + type + '%22}';
        /*
        {"activities":[{"id":1,"product_id":1,"code":"LT5324","category":2,"type":2}]}
         */



        url = jd_rest_host + '?action=jourday_ajax_get_content&method=GET&url=' + url;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        var activities = response.activities;
                        var select = form.querySelector('select[name=Activity]');
                        var html = '';
                        [].forEach.call(activities, function (activity) {
                            html += '<option value="' + activity.id + '">' + activity.code + '</option>'
                        });
                        if (select) {
                            select.innerHTML = html;
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

    },
    setProducts: function(form, activity) {
        var url = 'products/search?where={"Activity.id":{"e":"'  + activity + '"}}';
        /*
        {"data":{"result":[{"Product_id":"2","Product_name":"Borjomi","Product_provider_id":"1","Product_category":"2",
        "Product_active":"1","Activity_id":"2","Activity_product_id":"2","Activity_code":"GE9584",
        "Activity_category":"1","Activity_type":"3","includes":[]}]}}

         */
        url = encodeURIComponent(url);
        url = jd_rest_host + '?action=jourday_ajax_get_content&method=GET&url=' + url;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        var products = response.data.result;
                        var select = form.querySelector('select[name=product_id]');
                        var html = '';
                        [].forEach.call(products, function (product) {
                            if (product.hasOwnProperty('Product_id'))
                            var id = product.hasOwnProperty('Product_id') ? product.Product_id : '';
                            var name = product.hasOwnProperty('Product_name') ? product.Product_name : '';
                            html += '<option value="' + id + '">' + name + '</option>';
                        });
                        if (select) {
                            select.innerHTML = html;
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

    },
    removeWpTags: function(selector) {
        var buttons = document.getElementById(selector);
        if (buttons) {
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
        }
    }

};
document.addEventListener('DOMContentLoaded', function () {
    if (!jd_authorized()) {
        window.location.href = '/rest-home/';
    }
    var payment_link = document.getElementById('jd_booking_payment');
    if (payment_link) {
        payment_link.setAttribute('href', rest_paypal);
    }
    jd_ajax_booking_create.removeWpTags('jd_rest_booking_models_block');
    jd_ajax_booking_create.removeWpTags('biModal');
    var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + jd_booking_create_get_url;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    $('#booking_create_container').html(this.response);

                    jd_ajax_booking_create.submitAll();

                    jd_ajax_booking_create.init();

                    jd_ajax_booking_create.autocomplete();

                    var buttons_plus = document.querySelectorAll('div[id^=additional_forms_plus_');
                    if (buttons_plus) {
                        [].forEach.call(buttons_plus, function (button) {
                            button.addEventListener('click', function () {
                                var self = this;
                                var forms = this.parentNode.querySelectorAll('form');
                                jd_ajax_booking_create.formsPlus(self, forms);
                            })
                        });
                    }

                    var buttons_minus = document.querySelectorAll('div[id^=additional_forms_minus_');
                    if (buttons_minus) {
                        [].forEach.call(buttons_minus, function (button) {
                            button.addEventListener('click', function () {
                                var self = this;
                                var forms = this.parentNode.querySelectorAll('form');
                                jd_ajax_booking_create.formsMinus(self, forms);
                            })
                        });
                    }
                    var affiliate = document.querySelector('select[id^=affiliate_model_Booking]');
                    if (affiliate) {
                        var option = document.createElement('option');
                        option.setAttribute('value', '');
                        option.setAttribute('selected', 'selected');
                        affiliate.appendChild(option);
                    }
                    $('#biModal').modal('hide');
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