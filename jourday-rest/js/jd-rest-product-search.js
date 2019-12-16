var $ = jQuery.noConflict();
var app = angular.module('productSearch', []);
app.controller('searchCtr', function ($scope) {
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    var array = [
        'showProduct',
        'showActivity',
        'showAddons',
        'showBlockedDates',
        'showBookingItems',
        'showDay',
        'showGroupPriceDiscount',
        'showPersonsPriceDiscount',
        'showProductAvailability',
        'showProductCategory',
        'showProductDiscounts',
        'showProductOffers',
        'showProductReview',
        'showProductUsefulInfo',
        'showUser',
        'showProvidedItems',
        'showReview',
        'showSpecificDate',
        'showStartTime',
        'showTags'
    ];

    var url = jd_rest_host + '?action=jourday_ajax_get_content&method=GET&url=products/search?where=';

    var search_compiler = {
        getOperator: function (operator) {
            if (typeof operator === 'string' || operator instanceof String) {
                return operator;
            } else if (typeof operator === 'object') {
                var selector = 'input[name=' + operator.name + ']:checked';
                var el = document.querySelector(selector);
                if (el) {
                    return el.value;
                }
                return 'eq';
            } else {
                throw 'Unknown type of operator';
            }
        },
        conditions: function (fields) {
            var compiled_fields = [];
            var id, model, form, el, operator, type;
            form = $scope.productForm;
            for (var key in fields) {
                if (fields.hasOwnProperty(key)) {
                    var entity = fields[key];
                    for (var property in entity) {
                        if (entity.hasOwnProperty(property)) {
                            model = entity[property].model;
                            id = entity[property].id;
                            operator = entity[property].operator;
                            type = entity[property].type;
                            if (!form[id].$pristine) {
                                el = document.getElementById(id);
                                if (el && el.value.length !== 0) {
                                    var op = this.getOperator(operator);
                                    compiled_fields.push(
                                        {property: property, model: key, value: el.value, operator: op, type: type}
                                    );
                                }
                            }
                        }
                    }
                }
            }
            // console.log('cf', compiled_fields);
            return compiled_fields;
        },
        parse: function (settings) {
            var string = '';
            string = '{';
            if (settings.length === 0) {
                return '';
            }
            settings.forEach(function (opt) {
                var model = opt.model;
                var property = opt.property;
                var value = opt.value;
                var type = opt.type;
                var operator = opt.operator;
                switch (operator) {
                    case 'eq':
                        string += '"' + model + '.' + property + '":' + '{"e":"' + value + '"},';
                        break;
                    case 'like':
                        string += '"' + model + '.' + property + '":' + '{"l":"' + value + '"},';
                        break;
                    case 'lt':
                        if (type === 'numeric') {
                            string += '"' + model + '.' + property + '":' + '{ "lt": ' + value + '},';
                        } else {
                            string += '"' + model + '.' + property + '":' + '{ "lt": "' + value + '"},';
                        }
                        break;
                    case 'gt':
                        if (type === 'numeric') {
                            string += '"' + model + '.' + property + '":' + '{"lt":' + value + '},';
                        } else {
                            string += '"' + model + '.' + property + '":' + '{"lt":"' + value + '"},';
                        }
                        break;
                    default:
                        throw 'Operator not correct';
                }
            });
            string = string.substring(0, string.length - 1);
            string += '}';

            console.log(url + string);

            return url + string + '%26include=ProductCategory';
        },
        send: function (url) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var category;
                            var response = JSON.parse(this.response);
                            if (response.data.result) {
                                var table_body = $('#table_body');
                                var table = $('#table_products');
                                table_body.html('');
                                if ($.fn.dataTable.isDataTable('#table_products')) {
                                    table.DataTable().destroy();
                                }
                                var html = '';
                                [].forEach.call(response.data.result, function (product) {
                                    category = product.includes.ProductCategory[0];
                                    html += '<tr>' +
                                        '<td class="id"><a href="' + jd_product_item_url + '?product_id=' + product.Product_id + '" target="_blank">' + product.Product_id + '</a></td>' +
                                        '<td class="name"><a href="' + jd_product_item_url + '?product_id=' + product.Product_id + '" target="_blank">' + product.Product_name + '</a></td>' +
                                        '<td class="category">' + category.name + '</td></tr>'
                                });
                                table_body.html(html);

                                if ($.fn.dataTable.isDataTable('#table_products')) {
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
                                var form_tab = document.getElementById('product_search_form');
                                var result_tab = document.getElementById('product_search_result');
                                var f_tab = document.getElementById('product_search_form_tab');
                                var r_tab = document.getElementById('product_search_result_tab');
                                if (f_tab) {
                                    f_tab.classList.remove('active');
                                    var parent_f = f_tab.parentNode;
                                    if (parent_f) {
                                        parent_f.classList.remove('active');
                                    }
                                }
                                if (r_tab) {
                                    r_tab.classList.add('active');
                                    var parent_r = r_tab.parentNode;
                                    if (parent_r) {
                                        parent_r.classList.add('active');
                                    }
                                }
                                if (form_tab) {
                                    form_tab.classList.remove('active');
                                    form_tab.classList.remove('in');
                                }
                                if (result_tab) {
                                    result_tab.classList.add('active');
                                    result_tab.classList.add('in');
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

    var search_fields = {
        Product: {
            id: {
                id: 'product_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productID',
                actual: true
            },
            name: {
                id: 'product_name_input',
                type: 'string',
                operator: {
                    name: 'product_name',
                    like: 'product_name_like',
                    eq: 'product_name_eq'
                },
                model: 'productName',
                actual: true
            },
            provider_id: {
                id: 'product_provider_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productProvider',
                actual: true
            },
            category: {
                id: 'product_category_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productCategory',
                actual: true
            }
        },
        Activity: {
            id: {
                id: 'activity_id_input',
                operator: 'eq',
                type: 'numeric',
                model: 'activityID',
                actual: true
            },
            code: {
                id: 'activity_code_input',
                type: 'string',
                operator: {
                    name: 'activity_code',
                    like: 'activity_code_like',
                    eq: 'activity_code_eq'
                },
                model: 'activityCode',
                actual: true
            },
            category: {
                id: 'activity_category_select',
                type: 'numeric',
                operator: 'eq',
                model: 'activityCategory',
                actual: true
            },
            type: {
                id: 'activity_type_select',
                type: 'numeric',
                operator: 'eq',
                model: 'activityType',
                actual: true
            }
        },
        Addons: {
            id: {
                id: 'addons_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'addonsID',
                actual: true
            },
            name: {
                id: 'addons_name_input',
                type: 'string',
                operator: {
                    name: 'addons_name',
                    like: 'addons_name_like',
                    eq: 'addons_name_eq'
                },
                model: 'addonsName',
                actual: true
            },
            description: {
                id: 'addons_description_input',
                type: 'string',
                operator: {
                    name: 'addons_description',
                    like: 'addons_description_like',
                    eq: 'addons_description_eq'
                },
                model: 'addonsDescription',
                actual: true
            },
            price: {
                id: 'addons_price_input',
                type: 'numeric',
                operator: {
                    name: 'addons_price',
                    lt: 'addons_price_lt',
                    gt: 'addons_price_gt',
                    eq: 'addons_price_eq'
                },
                model: 'addonsPrice',
                actual: true
            }
        },
        BlockedDates: {
            id: {
                id: 'blocked_dates_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'blockedDatesID',
                actual: true
            },
            date: {
                id: 'blocked_dates_date_input',
                type: 'date',
                operator: {
                    name: 'blocked_dates_date',
                    lt: 'blocked_dates_date_lt',
                    gt: 'blocked_dates_date_gt',
                    eq: 'blocked_dates_date_eq'
                },
                model: 'blockedDatesDate',
                actual: true
            }
        },
        BookingItems: {
            id: {
                id: 'booking_items_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingItemsID',
                actual: true
            },
            startDate: {
                id: 'booking_items_start_date_input',
                type: 'date',
                operator: {
                    name: 'booking_items_start_date',
                    lt: 'booking_items_start_date_lt',
                    gt: 'booking_items_start_date_gt',
                    eq: 'booking_items_start_date_eq'
                },
                model: 'bookingItemsStartDate',
                actual: true
            },
            endDate: {
                id: 'booking_items_end_date_input',
                type: 'date',
                operator: {
                    name: 'booking_items_end_date',
                    lt: 'booking_items_end_date_lt',
                    gt: 'booking_items_end_date_gt',
                    eq: 'booking_items_end_date_eq'
                },
                model: 'bookingItemsEndDate',
                actual: true
            },
            slots: {
                id: 'booking_items_slots_input',
                type: 'numeric',
                operator: {
                    name: 'booking_items_slots',
                    lt: 'booking_items_slots_lt',
                    gt: 'booking_items_slots_gt',
                    eq: 'booking_items_slots_eq'
                },
                model: 'bookingItemsSlots',
                actual: true
            },
            details: {
                id: 'booking_items_details_input',
                type: 'string',
                operator: {
                    name: 'booking_items_details',
                    like: 'booking_items_details_like',
                    eq: 'booking_items_details_eq'
                },
                model: 'bookingItemsDetails',
                actual: true
            },
            finalPrice: {
                id: 'booking_items_final_price_input',
                type: 'numeric',
                operator: {
                    name: 'booking_items_final_price',
                    lt: 'booking_items_final_price_lt',
                    gt: 'booking_items_final_price_gt',
                    eq: 'booking_items_final_price_eq'
                },
                model: 'bookingItemsFinalPrice',
                actual: true
            },
            isChild: {
                id: 'booking_items_child_input',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingItemsChild',
                actual: true
            },
            isStudent: {
                id: 'booking_items_student_input',
                type: 'numeric',
                operator: 'eq',
                model: 'bookingItemsStudent',
                actual: true
            }
        },
        Day: {
            id: {
                id: 'day_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'dayID',
                actual: true
            },
            day: {
                id: 'day_day_input',
                type: 'string',
                operator: {
                    name: 'day_day',
                    like: 'day_day_like',
                    eq: 'day_day_eq'
                },
                model: 'dayDay',
                actual: true
            }
        },
        GroupPriceDiscount: {
            id: {
                id: 'group_price_discount_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'groupPriceID',
                actual: true
            },
            number: {
                id: 'group_price_discount_number_input',
                type: 'numeric',
                operator: {
                    name: 'group_price_discount_number',
                    lt: 'group_price_discount_number_lt',
                    gt: 'group_price_discount_number_gt',
                    eq: 'group_price_discount_number_eq'
                },
                model: 'groupPriceNumber',
                actual: true
            },
            discount: {
                id: 'group_price_discount_discount_input',
                type: 'numeric',
                operator: {
                    name: 'group_price_discount_discount',
                    lt: 'group_price_discount_discount_lt',
                    gt: 'group_price_discount_discount_gt',
                    eq: 'group_price_discount_discount_eq'
                },
                model: 'groupPriceDiscount',
                actual: true
            }
        },
        PersonsPriceDiscount: {
            id: {
                id: 'persons_price_discount_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'personsPriceID',
                actual: true
            },
            number: {
                id: 'persons_price_discount_number_input',
                type: 'numeric',
                operator: {
                    name: 'persons_price_discount_number',
                    lt: 'persons_price_discount_number_lt',
                    gt: 'persons_price_discount_number_gt',
                    eq: 'persons_price_discount_number_eq'
                },
                model: 'personsPriceNumber',
                actual: true
            },
            discount: {
                id: 'persons_price_discount_discount_input',
                type: 'numeric',
                operator: {
                    name: 'persons_price_discount_discount',
                    lt: 'persons_price_discount_discount_lt',
                    gt: 'persons_price_discount_discount_gt',
                    eq: 'persons_price_discount_discount_eq'
                },
                model: 'personsPriceDiscount',
                actual: true
            }
        },
        ProductAvailability: {
            id: {
                id: 'product_availability_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productAvailabilityID',
                actual: true
            },
            startDate: {
                id: 'product_availability_start_date_input',
                type: 'date',
                operator: {
                    name: 'product_availability_start_date',
                    lt: 'product_availability_start_date_lt',
                    gt: 'product_availability_start_date_gt',
                    eq: 'product_availability_start_date_eq'
                },
                model: 'productAvailabilityStartDate',
                actual: true
            },
            endDate: {
                id: 'product_availability_end_date_input',
                type: 'date',
                operator: {
                    name: 'product_availability_end_date',
                    lt: 'product_availability_end_date_lt',
                    gt: 'product_availability_end_date_gt',
                    eq: 'product_availability_end_date_eq'
                },
                model: 'productAvailabilityEndDate',
                actual: true
            },
            totalSlots: {
                id: 'product_availability_total_slots_input',
                type: 'numeric',
                operator: {
                    name: 'product_availability_total_slots',
                    lt: 'product_availability_total_slots_lt',
                    gt: 'product_availability_total_slots_gt',
                    eq: 'product_availability_total_slots_eq'
                },
                model: 'productAvailabilityTotalSlots',
                actual: true
            },
            availableSlots: {
                id: 'product_availability_available_slots_input',
                type: 'numeric',
                operator: {
                    name: 'product_availability_available_slots',
                    lt: 'product_availability_available_slots_lt',
                    gt: 'product_availability_available_slots_gt',
                    eq: 'product_availability_available_slots_eq'
                },
                model: 'productAvailabilityAvailableSlots',
                actual: true
            },
            adultPrice: {
                id: 'product_availability_adult_price_input',
                type: 'numeric',
                operator: {
                    name: 'product_availability_adult_price',
                    lt: 'product_availability_adult_price_lt',
                    gt: 'product_availability_adult_price_gt',
                    eq: 'product_availability_adult_price_eq'
                },
                model: 'productAvailabilityAdultPrice',
                actual: true
            },
            childPrice: {
                id: 'product_availability_child_price_input',
                type: 'numeric',
                operator: {
                    name: 'product_availability_child_price',
                    lt: 'product_availability_child_price_lt',
                    gt: 'product_availability_child_price_gt',
                    eq: 'product_availability_child_price_eq'
                },
                model: 'productAvailabilityChildPrice',
                actual: true
            },
            studentPrice: {
                id: 'product_availability_student_price_input',
                type: 'numeric',
                operator: {
                    name: 'product_availability_student_price_',
                    lt: 'product_availability_student_price_lt',
                    gt: 'product_availability_student_price_gt',
                    eq: 'product_availability_student_price_eq'
                },
                model: 'productAvailabilityStudentPrice',
                actual: true
            },
            instantBooking: {
                id: 'product_availability_instant_booking_input',
                type: 'string',
                operator: 'eq',
                model: 'productAvailabilityInstantBooking',
                actual: true
            },
            startCity: {
                id: 'product_availability_start_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productAvailabilityStartCity',
                actual: true
            },
            personsPerGroup: {
                id: 'product_availability_persons_per_group_input',
                type: 'numeric',
                operator: {
                    name: 'product_availability_persons_per_group',
                    lt: 'product_availability_persons_per_group_lt',
                    gt: 'product_availability_persons_per_group_gt',
                    eq: 'product_availability_persons_per_group_eq'
                },
                model: 'productAvailabilityPersonsPerGroup',
                actual: true
            }
        },
        ProductCategory: {
            id: {
                id: 'product_category_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productCategoryID',
                actual: true
            },
            name: {
                id: 'product_category_name_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productCategoryCategory',
                actual: true
            }
        },
        ProductDiscounts: {
            id: {
                id: 'product_discounts_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productDiscountsID',
                actual: true
            },
            title: {
                id: 'product_discounts_title_input',
                type: 'string',
                operator: {
                    name: '',
                    like: 'product_discounts_title_like',
                    eq: 'product_discounts_title_eq'
                },
                model: 'productDiscountsTitle',
                actual: true
            },
            discountType: {
                id: 'product_discounts_discount_type_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productDiscountsType',
                actual: true
            },
            discount: {
                id: 'product_discounts_discount_input',
                type: 'numeric',
                operator: {
                    name: 'product_discounts_discount',
                    lt: 'product_discounts_discount_lt',
                    gt: 'product_discounts_discount_gt',
                    eq: 'product_discounts_discount_eq'
                },
                model: 'productDiscountsDiscount',
                actual: true
            },
            startAppliedDate: {
                id: 'product_discounts_start_applied_date_input',
                type: 'date',
                operator: {
                    name: 'product_discounts_start_applied_date',
                    lt: 'product_discounts_start_applied_date_lt',
                    gt: 'product_discounts_start_applied_date_gt',
                    eq: 'product_discounts_start_applied_date_eq'
                },
                model: 'productDiscountsStartAppliedDate',
                actual: true
            },
            endAppliedDate: {
                id: 'product_discounts_end_applied_date_input',
                type: 'date',
                operator: {
                    name: 'product_discounts_end_applied_date',
                    lt: 'product_discounts_end_applied_date_lt',
                    gt: 'product_discounts_end_applied_date_gt',
                    eq: 'product_discounts_end_applied_date_eq'
                },
                model: 'productDiscountsEndAppliedDate',
                actual: true
            },
            startValidityDate: {
                id: 'product_discounts_start_validity_date_input',
                type: 'date',
                operator: {
                    name: 'product_discounts_start_validity_date',
                    lt: 'product_discounts_start_validity_date_lt',
                    gt: 'product_discounts_start_validity_date_gt',
                    eq: 'product_discounts_start_validity_date_eq'
                },
                model: 'productDiscountsStartValidityDate',
                actual: true
            },
            endValidityDate: {
                id: 'product_discounts_end_validity_date_input',
                type: 'date',
                operator: {
                    name: 'product_discounts_end_validity_date',
                    lt: 'product_discounts_end_validity_date_lt',
                    gt: 'product_discounts_end_validity_date_gt',
                    eq: 'product_discounts_end_validity_date_eq'
                },
                model: 'productDiscountsEndValidityDate',
                actual: true
            }
        },
        ProductOffers: {
            id: {
                id: 'product_offers_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productOffersID',
                actual: true
            },
            finalPrice: {
                id: 'product_offers_final_price_input',
                type: 'numeric',
                operator: {
                    name: 'product_offers_final_price',
                    lt: 'product_offers_final_price_lt',
                    gt: 'product_offers_final_price_gt',
                    eq: 'product_offers_final_price_eq'
                },
                model: 'productOffersFinalPrice',
                actual: true
            },
            name: {
                id: 'product_offers_name_input',
                type: 'string',
                operator: {
                    name: 'product_offers_name',
                    like: 'product_offers_name_like',
                    eq: 'product_offers_name_eq'
                },
                model: 'productOffersName',
                actual: true
            },
            description: {
                id: 'product_offers_description_input',
                type: 'string',
                operator: {
                    name: 'product_offers_description',
                    like: 'product_offers_description_like',
                    eq: 'product_offers_description_eq'
                },
                model: 'productOffersDescription',
                actual: true
            }
        },
        ProductReview: {
            id: {
                id: 'product_review_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productReviewID',
                actual: true
            },
            name: {
                id: 'product_review_name_input',
                type: 'string',
                operator: {
                    name: 'product_review_name',
                    like: 'product_review_name_like',
                    eq: 'product_review_name_eq'
                },
                model: 'productReviewName',
                actual: true
            },
            description: {
                id: 'product_review_description_input',
                type: 'string',
                operator: {
                    name: 'product_review_description',
                    like: 'product_review_description_like',
                    eq: 'product_review_description_eq'
                },
                model: 'productReviewDescription',
                actual: true
            }
        },
        ProductUsefulInfo: {
            id: {
                id: 'product_useful_info_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productUsefulInfoID',
                actual: true
            },
            title: {
                id: 'product_useful_info_title_input',
                type: 'string',
                operator: {
                    name: 'product_useful_info_title',
                    like: 'product_useful_info_title_like',
                    eq: 'product_useful_info_title_eq'
                },
                model: 'productUsefulInfoTitle',
                actual: true
            },
            tourHighlights: {
                id: 'product_useful_info_tour_highlights_input',
                type: 'string',
                operator: {
                    name: 'product_useful_info_tour_highlights',
                    like: 'product_useful_info_tour_highlights_like',
                    eq: 'product_useful_info_tour_highlights_eq'
                },
                model: 'productUsefulInfoTourHighlights',
                actual: true
            },
            tipsUsefulInfo: {
                id: 'product_useful_info_tips_useful_info_input',
                type: 'string',
                operator: {
                    name: 'product_useful_info_tips_useful_info',
                    like: 'product_useful_info_tips_useful_info_like',
                    eq: 'product_useful_info_tips_useful_info_eq'
                },
                model: 'productUsefulInfoTipsUsefulInfo',
                actual: true
            },
            dayToDayItinerary: {
                id: 'product_useful_info_day_to_day_itinerary_input',
                type: 'string',
                operator: {
                    name: 'product_useful_info_day_to_day_itinerary',
                    like: 'product_useful_info_day_to_day_itinerary_like',
                    eq: 'product_useful_info_day_to_day_itinerary_eq'
                },
                model: 'productUsefulInfoDayToDayItinerary',
                actual: true
            },
            overview: {
                id: 'product_useful_info_overview_input',
                type: 'string',
                operator: {
                    name: 'product_useful_info_overview',
                    like: 'product_useful_info_overview_like',
                    eq: 'product_useful_info_overview_eq'
                },
                model: 'productUsefulInfoOverview',
                actual: true
            },
            meetingPoint: {
                id: 'product_useful_info_meeting_point_input',
                type: 'string',
                operator: {
                    name: 'product_useful_info_meeting_point_info',
                    like: 'product_useful_info_meeting_point_like',
                    eq: 'product_useful_info_meeting_point_eq'
                },
                model: 'productUsefulInfoMeetingPoint',
                actual: true
            },
            startingPoint: {
                id: 'product_useful_info_starting_point_input',
                type: 'string',
                operator: {
                    name: 'product_useful_info_starting_point',
                    like: 'product_useful_info_starting_point_like',
                    eq: 'product_useful_info_starting_point_eq'
                },
                model: 'productUsefulInfoStartingPoint',
                actual: true
            },
            physicalLevel: {
                id: 'product_discounts_discount_type_select',
                type: 'numeric',
                operator: 'eq',
                model: 'productDiscountsType',
                actual: true
            },
            minGuests: {
                id: 'product_useful_info_min_guests_input',
                type: 'numeric',
                operator: {
                    name: 'product_useful_info_min_guests',
                    lt: 'product_useful_info_min_guests_lt',
                    gt: 'product_useful_info_min_guests_gt',
                    eq: 'product_useful_info_min_guests_eq'
                },
                model: 'productUsefulInfoMinGuests',
                actual: true
            },
            maxGuests: {
                id: 'product_useful_info_max_guests_input',
                type: 'numeric',
                operator: {
                    name: 'product_useful_info_max_guests',
                    lt: 'product_useful_info_max_guests_lt',
                    gt: 'product_useful_info_max_guests_gt',
                    eq: 'product_useful_info_max_guests_eq'
                },
                model: 'productUsefulInfoMaxGuests',
                actual: true
            },
            daily: {
                id: 'product_useful_info_daily_input',
                type: 'string',
                operator: 'eq',
                model: 'productUsefulInfoDaily',
                actual: true
            },
            weekly: {
                id: 'product_useful_info_weekly_input',
                type: 'string',
                operator: 'eq',
                model: 'productUsefulInfoWeekly',
                actual: true
            }
        },
        User: {
            id: {
                id: 'provider_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'providerID',
                actual: true
            },
            firstName: {
                id: 'provider_first_name_input',
                type: 'string',
                operator: {
                    name: 'provider_first_name',
                    like: 'provider_first_name_like',
                    eq: 'provider_first_name_eq'

                },
                model: 'providerFirstName',
                actual: true
            },
            lastName: {
                id: 'provider_last_name_input',
                type: 'string',
                operator: {
                    name: 'provider_last_name',
                    like: 'provider_last_name_like',
                    eq: 'provider_last_name_eq"'
                },
                model: 'providerLastName',
                actual: true
            },
            email: {
                id: 'provider_email_input',
                type: 'string',
                operator: {
                    name: 'provider_email',
                    like: 'provider_email_like',
                    eq: 'provider_email_eq'
                },
                model: 'providerEmail',
                actual: true
            },
            address1: {
                id: 'provider_address1_input',
                type: 'string',
                operator: {
                    name: 'provider_address1',
                    like: 'provider_address1_like',
                    eq: 'provider_address1_eq'
                },
                model: 'providerAddress1',
                actual: true
            },
            address2: {
                id: 'provider_address2_input',
                type: 'string',
                operator: {
                    name: 'provider_address2',
                    like: 'provider_address2_like',
                    eq: 'provider_address1_eq'
                },
                model: 'providerAddress2',
                actual: true
            },
            city: {
                id: 'provider_city_select',
                type: 'numeric',
                operator: 'eq',
                model: 'providerCity',
                actual: true
            },
            postCode: {
                id: 'provider_post_code_input',
                type: 'string',
                operator: {
                    name: 'provider_post_code',
                    like: 'provider_post_code_like',
                    eq: 'provider_post_code_eq'
                },
                model: 'providerPostCode',
                actual: true
            },
            phone: {
                id: 'provider_phone_input',
                type: 'string',
                operator: {
                    name: 'provider_phone',
                    like: 'provider_phone_like',
                    eq: 'provider_phone_eq'
                },
                model: 'providerPhone',
                actual: true
            },
            mobile: {
                id: 'provider_mobile_input',
                type: 'string',
                operator: {
                    name: 'provider_mobile',
                    like: 'provider_mobile_like',
                    eq: 'provider_mobile_eq'
                },
                model: 'providerMobile',
                actual: true
            },
            language: {
                id: 'provider_language_select',
                type: 'numeric',
                operator: 'eq',
                model: 'providerLanguage',
                actual: true
            },
            creationDate: {
                id: 'provider_creation_date_input',
                type: 'date',
                operator: {
                    name: 'provider_creation_date',
                    lt: 'provider_creation_date_lt',
                    gt: 'provider_creation_date_gt',
                    eq: 'provider_creation_date_eq'
                },
                model: 'providerCreationDate',
                actual: true
            },
            modifiedDate: {
                id: 'provider_modified_date_input',
                type: 'date',
                operator: {
                    name: 'provider_modified_date',
                    lt: 'provider_modified_date_lt',
                    gt: 'provider_modified_date_gt',
                    eq: 'provider_modified_date_eq'
                },
                model: 'providerModifiedDate',
                actual: true
            }
        },
        ProvidedItems: {
            id: {
                id: 'product_provided_items_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'productProvidedItemsID',
                actual: true
            },
            name: {
                id: 'product_provided_items_name_input',
                type: 'string',
                operator: {
                    name: 'product_provided_items_name',
                    like: 'product_provided_items_name_like',
                    eq: 'product_provided_items_name_eq'
                },
                model: 'productProvidedItemsName',
                actual: true
            }
        },
        Review: {
            id: {
                id: 'review_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'reviewID',
                actual: true
            },
            title: {
                id: 'review_title_input',
                type: 'string',
                operator: {
                    name: 'review_title',
                    like: 'review_title_like',
                    eq: 'review_title_eq'
                },
                model: 'reviewTitle',
                actual: true
            },
            subtitle: {
                id: 'review_subtitle_input',
                type: 'string',
                operator: {
                    name: 'review_subtitle',
                    like: 'review_subtitle_like',
                    eq: 'review_subtitle_eq'
                },
                model: 'reviewSubtitle',
                actual: true
            },
            text: {
                id: 'review_text_input',
                type: 'string',
                operator: {
                    name: 'review_text',
                    like: 'review_text_like',
                    eq: 'review_text_eq'
                },
                model: 'reviewText',
                actual: true
            },
            createDate: {
                id: 'review_create_date_input',
                type: 'date',
                operator: {
                    name: 'review_create_date',
                    lt: 'review_create_date_lt',
                    gt: 'review_create_date_gt',
                    eq: 'review_create_date_eq'
                },
                model: 'reviewCreateDate',
                actual: true
            }
        },
        SpecificDate: {
            id: {
                id: 'specific_date_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'specificDateID',
                actual: true
            },
            date: {
                id: 'specific_date_date_input',
                type: 'date',
                operator: {
                    name: 'specific_date_date',
                    lt: 'specific_date_date_lt',
                    gt: 'specific_date_date_gt',
                    eq: 'specific_date_date_eq'
                },
                model: 'specificDateDate',
                actual: true
            }
        },
        StartTime: {
            id: {
                id: 'start_time_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'startTimeID',
                actual: true
            },
            time: {
                id: 'start_time_time_input',
                type: 'numeric',
                operator: {
                    name: 'start_time_time',
                    lt: 'start_time_time_lt',
                    gt: 'start_time_time_gt',
                    eq: 'start_time_time_eq'
                },
                model: 'startTimeTime',
                actual: true
            }
        },
        Tags: {
            id: {
                id: 'tag_id_input',
                type: 'numeric',
                operator: 'eq',
                model: 'tagsID',
                actual: true
            },
            name: {
                id: 'tag_name_input',
                type: 'string',
                operator: {
                    name: 'tag_name',
                    like: 'tag_name_like',
                    eq: 'tag_name_eq'
                },
                model: 'tagsName',
                actual: true
            },
            slug: {
                id: 'tag_slug_input',
                type: 'string',
                operator: {
                    name: 'tag_slug',
                    like: 'tag_slug_like',
                    eq: 'tag_slug_eq'
                },
                model: 'tagsSlug',
                actual: true
            }
        }
    };

    array.forEach(function (show) {
        $scope[show] = false;
    });

    function getShowButton() {
        return ($scope.showProduct
            || $scope.showActivity
            || $scope.showAddons
            || $scope.showBlockedDates
            || $scope.showBookingItems
            || $scope.showDay
            || $scope.showGroupPriceDiscount
            || $scope.showPersonsPriceDiscount
            || $scope.showProductAvailability
            || $scope.showProductCategory
            || $scope.showProductDiscounts
            || $scope.showProductOffers
            || $scope.showProductReview
            || $scope.showProductUsefulInfo
            || $scope.showUser
            || $scope.showProvidedItems
            || $scope.showReview
            || $scope.showSpecificDate
            || $scope.showStartTime
            || $scope.showTags
        );
    }

    $scope.showButton = getShowButton();


    array.forEach(function (show) {
        $scope.$watch(show, function () {
            $scope.showButton = getShowButton();
        });
    });

    var users = [
        {
            field: 'firstName',
            selector: '#provider_first_name_input'
        },
        {
            field: 'lastName',
            selector: '#provider_last_name_input'
        },
        {
            field: 'email',
            selector: '#provider_email_input'
        },
        {
            field: 'address1',
            selector: '#provider_address1_input'
        },
        {
            field: 'address2',
            selector: '#provider_address2_input'
        },
        {
            field: 'phone',
            selector: '#provider_phone_input'
        },
        {
            field: 'mobile',
            selector: '#provider_mobile_input'
        }
    ];

    var addons = [
        {
            field: 'name',
            selector: '#addons_name_input'
        },
        {
            field: 'description',
            selector: '#addons_description_input'
        },
        {
            field: 'price',
            selector: '#addons_price_input'
        }
    ];

    var bookingsItems = [
        {
            field: 'slots',
            selector: '#booking_items_slots_input'
        },
        {
            field: 'details',
            selector: '#booking_items_details_input'
        },
        {
            field: 'finalPrice',
            selector: '#booking_items_final_price_input'
        }
    ];

    var groupPriceDiscounts = [
        {
            field: 'number',
            selector: '#group_price_discount_number_input'
        },
        {
            field: 'discount',
            selector: '#group_price_discount_discount_input'
        }
    ];


    var personsPriceDiscounts = [
        {
            field: 'number',
            selector: '#persons_price_discount_number_input'
        },
        {
            field: 'discount',
            selector: '#persons_price_discount_discount_input'
        }
    ];

    var productAvailabilities = [
        {
            field: 'totalSlots',
            selector: '#product_availability_total_slots_input'
        },
        {
            field: 'availableSlots',
            selector: '#product_availability_available_slots_input'
        },
        {
            field: 'adultPrice',
            selector: '#product_availability_adult_price_input'
        },
        {
            field: 'childPrice',
            selector: '#product_availability_child_price_input'
        },
        {
            field: 'studentPrice',
            selector: '#product_availability_student_price_input'
        },
        {
            field: 'personsPerGroup',
            selector: '#product_availability_persons_per_group_input'
        }
    ];

    var productDiscounts = [
        {
            field: 'title',
            selector: '#product_discounts_title_input'
        },
        {
            field: 'discount',
            selector: '#product_discounts_title_input'
        }
    ];

    var productOffers = [
        {
            field: 'name',
            selector: '#product_offers_name_input'
        },
        {
            field: 'description',
            selector: '#product_offers_description_input'
        },
        {
            field: 'finalPrice',
            selector: '#product_offers_final_price_input'
        }
    ];

    var productReviews = [
        {
            field: 'name',
            selector: '#product_review_name_input'
        },
        {
            field: 'description',
            selector: '#product_review_description_input'
        }
    ];

    var productsUsefulInfo = [
        {
            field: 'title',
            selector: '#product_useful_info_title_input'
        },
        {
            field: 'tourHighlights',
            selector: '#product_useful_info_tour_highlights_input'
        },
        {
            field: 'tipsUsefulInfo',
            selector: '#product_useful_info_tour_highlights_input'
        },
        {
            field: 'dayToDayItinerary',
            selector: '#product_useful_info_day_to_day_itinerary_input'
        },
        {
            field: 'meetingPoint',
            selector: '#product_useful_info_meeting_point_input'
        },
        {
            field: 'overview',
            selector: '#product_useful_info_overview_input'
        },
        {
            field: 'startingPoint',
            selector: '#product_useful_info_starting_point_input'
        },
        {
            field: 'minGuests',
            selector: '#product_useful_info_min_guests_input'
        },
        {
            field: 'maxGuests',
            selector: '#product_useful_info_max_guests_input'
        }
    ];

    var reviews = [
        {
            field: 'title',
            selector: '#review_title_input'
        },
        {
            field: 'subtitle',
            selector: '#review_subtitle_input'
        },
        {
            field: 'text',
            selector: '#review_text_input'
        }
    ];

    var tags = [
        {
            field: 'name',
            selector: '#tag_name_input'
        },
        {
            field: 'slug',
            selector: '#tag_slug_input'
        }
    ];

    //*****************************************************//

    jd_rest_awesomplete_mass(
        'email',
        'users',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=users',
        users,
        $scope
    );

    jd_rest_awesomplete(
        'name',
        'products',
        jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=products',
        '#product_name_input'
    );

    setTimeout(function () {
        jd_rest_fill_model(
            'name',
            'productCategories',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-categories',
            $scope
        );

        jd_rest_fill_model(
            'name',
            'activityCategories',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=activity-categories',
            $scope
        );

        jd_rest_fill_model(
            'name',
            'activitiesTypes',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=activity-types',
            $scope
        );
    }, 600);


    setTimeout(function () {
        jd_rest_fill_model(
            'name',
            'cities',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=cities',
            $scope
        );

        jd_rest_fill_model(
            'label',
            'physicalLevels',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=physical-level',
            $scope
        );
    }, 1100);


    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'id',
            'groupPriceDiscounts',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=group-price-discount',
            groupPriceDiscounts,
            $scope
        );

        jd_rest_awesomplete_mass(
            'id',
            'personsPriceDiscounts',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=persons-price-discounts',
            personsPriceDiscounts,
            $scope
        );
    }, 1700);

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'id',
            'productAvailabilities',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-availability',
            productAvailabilities,
            $scope
        );

        jd_rest_awesomplete_mass(
            'title',
            'productDiscounts',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-discounts',
            productDiscounts,
            $scope
        );
    }, 1900);

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'name',
            'productOffers',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-offers',
            productOffers,
            $scope
        );

        jd_rest_awesomplete_mass(
            'name',
            'productReviews',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-review',
            productReviews,
            $scope
        );
    }, 2700);

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'title',
            'productsUsefulInfo',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-useful-info',
            productsUsefulInfo,
            $scope
        );

        jd_rest_awesomplete(
            'name',
            'productProvidedItems',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=product-provided-items',
            '#product_provided_items_name_input'
        );
    }, 3200);

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'title',
            'reviews',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=reviews',
            reviews,
            $scope
        );

        jd_rest_awesomplete_mass(
            'name',
            'tags',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=tags',
            tags,
            $scope
        );
    }, 3500);

    setTimeout(function () {
        jd_rest_awesomplete(
            'code',
            'activities',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=activities',
            '#activity_code_input'
        );

        jd_rest_awesomplete_mass(
            'name',
            'addons',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=addons',
            addons,
            $scope
        );
    }, 3900);

    setTimeout(function () {
        jd_rest_awesomplete_mass(
            'id',
            'bookingsItems',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=booking-items',
            bookingsItems,
            $scope
        );

        jd_rest_awesomplete(
            'day',
            'days',
            jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=days',
            '#day_day_input'
        );
    }, 4600);
    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var buttons = document.getElementById('product_search_container');
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
        var form = document.getElementById('rest_product_search_form');
        if (form) {
            form.addEventListener('submit', function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                var setting_array = search_compiler.conditions(search_fields);
                var search_url = search_compiler.parse(setting_array);
                search_compiler.send(search_url);
                return false;
            })
        }
    });

});