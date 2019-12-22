//global variables

var rest_api_host = 'http://api.arcana.pw';
var rest_paypal = 'rest-paypal';
// REPORT
var jd_resellers_url = 'report-resellers-item';
var jd_resellers_active_url = 'report-resellers-active-item';
var jd_affiliates_url = 'report-affiliates-item';
var jd_affiliates_active_url = 'report-affiliates-active-item';
var jd_customers_url = 'report-customers-item';
var jd_beneficiaries_url = 'report-beneficiaries-item';
var jd_providers_url = 'report-providers-item';
var jd_jourday_provider_url = 'report-jourday-provider-item';
var jd_live_products_url = 'report-live-products-item';
var jd_upcoming_products_url = 'report-upcoming-products-item';
var jd_payable_url = 'report-payable-item';
var jd_paid_url = 'report-paid-item';
var jd_receivables_url = 'report-receivables-item';
var jd_totals_url = 'report-totals-item';
var jd_comment_url = 'report-comment-item';
var jd_review_url = 'report-review-item';
var jd_resellers_list_url = 'report-resellers-list';
var jd_resellers_active_list_url = 'report-resellers-active-list';
var jd_affiliates_list_url = 'report-affiliates-list';
var jd_affiliates_active_list_url = 'report-affiliates-active-list';
var jd_customers_list_url = 'report-customers-list';
var jd_beneficiaries_list_url = 'report-beneficiaries-list';
var jd_providers_list_url = 'report-providers-list';
var jd_jourday_provider_list_url = 'report-jourday-provider-list';
var jd_live_products_list_url = 'report-live-products-list';
var jd_upcoming_products_list_url = 'report-upcoming-products-list';
var jd_payable_list_url = 'report-payable-list';
var jd_paid_list_url = 'report-paid-list';
var jd_receivables_list_url = 'report-receivables-list';
var jd_totals_list_url = 'report-totals-list';
var jd_comment_list_url = 'report-comment-list';
var jd_review_list_url = 'report-review-list';

//OWNER

var jd_owner_product_url = 'products/owner';
var jd_owner_booking_url = 'booking/owner';
var jd_owner_message_url = 'messages/owner';

//ADMIN

var rest_admin_activity_category_create = 'activity-category-create';
var rest_admin_activity_category_edit = 'activity-category-edit';
var rest_admin_activity_category_show = 'activity-category-show';
var rest_admin_activity_category_list = 'activity-category-list';

var rest_admin_activity_type_create = 'activity-type-create';
var rest_admin_activity_type_edit = 'activity-type-edit';
var rest_admin_activity_type_show = 'activity-type-show';
var rest_admin_activity_type_list = 'activity-type-list';

var rest_admin_amenities_create = 'amenities-create';
var rest_admin_amenities_edit = 'amenities-edit';
var rest_admin_amenities_show = 'amenities-show';
var rest_admin_amenities_list = 'amenities-list';

var rest_admin_cancellation_policy_create = 'cancellation-policy-create';
var rest_admin_cancellation_policy_edit = 'cancellation-policy-edit';
var rest_admin_cancellation_policy_show = 'cancellation-policy-show';
var rest_admin_cancellation_policy_list = 'cancellation-policy-list';

var rest_admin_city_create = 'city-create';
var rest_admin_city_edit = 'city-edit';
var rest_admin_city_show = 'city-show';
var rest_admin_city_list = 'city-list';

var rest_admin_country_create = 'country-create';
var rest_admin_country_edit = 'country-edit';
var rest_admin_country_show = 'country-show';
var rest_admin_country_list = 'country-list';

var rest_admin_language_create = 'language-create';
var rest_admin_language_edit = 'language-edit';
var rest_admin_language_show = 'language-show';
var rest_admin_language_list = 'language-list';

var rest_admin_physical_level_create = 'physical-level-create';
var rest_admin_physical_level_edit = 'physical-level-edit';
var rest_admin_physical_level_show = 'physical-level-show';
var rest_admin_physical_level_list = 'physical-level-list';

var rest_admin_product_category_create = 'product-category-create';
var rest_admin_product_category_edit = 'product-category-edit';
var rest_admin_product_category_show = 'product-category-show';
var rest_admin_product_category_list = 'product-category-list';

var rest_admin_settings_create = 'settings-create';
var rest_admin_settings_edit = 'settings-edit';
var rest_admin_settings_show = 'settings-show';
var rest_admin_settings_list = 'settings-list';

var rest_admin_sales_to_countries_create = 'sales-to-countries-create';
var rest_admin_sales_to_countries_edit = 'sales-to-countries-edit';
var rest_admin_sales_to_countries_show = 'sales-to-countries-show';
var rest_admin_sales_to_countries_list = 'sales-to-countries-list';

var rest_admin_autoresponder_create = 'autoresponder-create';
var rest_admin_autoresponder_edit = 'autoresponder-edit';
var rest_admin_autoresponder_show = 'autoresponder-show';
var rest_admin_autoresponder_list = 'autoresponder-list';

var rest_admin_document_create = 'document-create';
var rest_admin_document_edit = 'document-edit';
var rest_admin_document_show = 'document-show';
var rest_admin_document_list = 'document-list';

var rest_admin_mail_create = 'mail-create';
var rest_admin_mail_edit = 'mail-edit';
var rest_admin_mail_show = 'mail-show';
var rest_admin_mail_list = 'mail-list';

var rest_admin_template_create = 'template-create';
var rest_admin_template_edit = 'template-edit';
var rest_admin_template_show = 'template-show';
var rest_admin_template_list = 'template-list';

var rest_admin_voucher_create = 'voucher-create';
var rest_admin_voucher_edit = 'voucher-edit';
var rest_admin_voucher_show = 'voucher-show';
var rest_admin_voucher_list = 'voucher-list';


var rest_admin_confirm_user = 'confirm-user';
var rest_admin_confirm_provider = 'confirm-provider';

var rest_admin_subscriptions_list = 'subscription-list';
var rest_admin_subscriptions_show = 'subscription-show';
var rest_admin_subscriptions_create = 'subscription-create';
var rest_admin_subscriptions_edit = 'subscription-edit';
var rest_admin_subscriber_add = 'subscriber-add';

var rest_admin_notification_send = 'notification-send';


//SITE

var jd_discount_to_offer_create_url = 'rest-discount-to-offer-create';
var jd_discount_to_offer_edit_url = 'rest-discount-to-offer-edit';
var jd_discount_to_offer_show_url = 'rest-discount-to-offer-show';
var jd_discount_to_offer_list_url = 'rest-discount-to-offer-list';

var jd_product_to_amenities_add_create_url = 'rest-product-to-amenities-add-create';
var jd_product_to_amenities_add_edit_url = 'rest-product-to-amenities-add-edit';
var jd_product_to_amenities_add_show_url = 'rest-product-to-amenities-add-show';
var jd_product_to_amenities_add_list_url = 'rest-product-to-amenities-add-list';

var jd_product_to_amenities_remove_create_url = 'rest-product-to-amenities-remove-create';
var jd_product_to_amenities_remove_edit_url = 'rest-product-to-amenities-remove-edit';
var jd_product_to_amenities_remove_show_url = 'rest-product-to-amenities-remove-show';
var jd_product_to_amenities_remove_list_url = 'rest-product-to-amenities-remove-list';


var jd_product_to_language_create_url = 'rest-product-to-language-create';
var jd_product_to_language_edit_url = 'rest-product-to-language-edit';
var jd_product_to_language_show_url = 'rest-product-to-language-show';
var jd_product_to_language_list_url = 'rest-product-to-language-list';


var jd_rest_host = 'http://jd.old/wp-admin/admin-ajax.php';//TODO
var jd_rest_admin_url = 'template/admin-navbar.html';
var jd_rest_navbar_url = 'template/navbar.html';
var jd_edit_user_key = 'wp-ajax-edit-user';
var jd_edit_product_key = 'wp-ajax-key';
var jd_profile_key = 'user';
var jd_user_edit_get_url = 'wp/user/edit/get';
var jd_user_show_get_url = 'wp/user/show/get';
var jd_payment_get_url = 'wp/payment/get';
var jd_payment_show_url = 'wp/payment/show';
var jd_message_create_url = 'wp/message/create';
var jd_message_get_url = 'wp/message/get';
var jd_message_show_url = 'wp/message/show';
var jd_product_create_get_url = 'wp/product/create/';
var jd_product_edit_get_url = 'wp/product/edit/';
var jd_product_show_get_url = 'wp/product/show/';
var jd_comments_create_get_url = 'wp/comments/create/';
var jd_comments_edit_get_url = 'wp/comments/edit/';
var jd_comments_show_get_url = 'wp/comments/show/';
var jd_review_create_get_url = 'wp/review/create/';
var jd_review_edit_get_url = 'wp/review/edit/';
var jd_review_show_get_url = 'wp/review/show/';
var jd_form_create_url = 'wp/form/create/';
var jd_form_create_main_url = 'wp/form/create/main';
var jd_form_create_with_image_url = 'wp/form/create/image';
var jd_form_create_related_url = 'wp/form/create/related/';
var jd_form_create_related_image_url = 'wp/form/create/related/image/';
var jd_form_delete_related_url = 'wp/form/delete/related';
var jd_form_get_url = 'wp/form/get/';
var jd_final_price_get_url = 'booking/final/price';
var jd_login_get_url = 'wp/login';
var jd_login_post_url = 'users/authenticate';
var jd_user_list_url = 'rest-user-list';
var jd_user_item_url = 'rest-user-item';
var jd_user_edit_url = 'rest-user-edit';
var jd_user_create_url = 'rest-user-create';
var jd_user_search_url = 'rest-user-search';
var jd_profile_url = 'rest-user-profile';
var jd_profile_edit_url = 'rest-profile-edit';
var jd_profile_create_url = 'rest-profile-create';
var jd_profile_autoresponder_url = 'rest-profile-autoresponder';
var jd_message_list_url = 'rest-message-list';
var jd_message_item_url = 'rest-message-item';
var jd_message_search_url = 'rest-message-search';
var jd_payment_list_url = 'rest-payment-list';
var jd_payment_item_url = 'rest-payment-item';
var jd_payment_search_url = 'rest-payment-search';
var jd_product_list_url = 'rest-product-list';
var jd_product_item_url = 'rest-product-item';
var jd_product_search_url = 'rest-product-search';
var jd_product_edit_url = 'rest-product-edit';
var jd_product_create_url = 'rest-product-create';
var jd_booking_list_url = 'rest-booking-list';
var jd_booking_item_url = 'rest-booking-item';
var jd_booking_search_url = 'rest-booking-search';
var jd_booking_edit_url = 'rest-booking-edit';
var jd_booking_create_url = 'rest-booking-create';
var jd_booking_create_get_url = 'wp/booking/create/';
var jd_booking_edit_get_url = 'wp/booking/edit/';
var jd_booking_show_get_url = 'wp/booking/show/';
var jd_subscriptions_create_url = 'wp/subscriptions/create/';
var jd_subscriptions_edit_url = 'wp/subscriptions/edit/';
var jd_subscriptions_show_url = 'wp/subscriptions/show/';
var jd_subscriber_add_url = '/wp/subscribers/create/';
var jd_notification_send_url = 'wp/notification/show/';
var jd_home_url = 'rest-home';
var jd_login_url = 'rest-login';
var jd_signup_url = 'rest-signup';
var jd_messenger_url = 'rest-messenger';



var navbar = {
  admin: 'template/admin-navbar.html',
  nav: 'template/navbar.html'
};

var scripts = [
  'js/vendor/js/jquery/jquery.js',
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js',
  'js/components/awesomplete.js',
  'http://underscorejs.org/underscore-min.js',
  'js/components/jquery.dataTables.min.js',
  'css/components/jquery.dataTables.min.css',
  'css/components/jquery.dataTables.reset.css',
  'css/components/awesomplete.css'
];
var templates = {
  'home': {
    'title': 'Jourday REST API WP UI',
    'content': 'template/home.html',
    'url': 'rest-home'
  },
  'paypal': {
    'title': 'REST Paypal Service',
    'content': 'template/paypal.html',
    'url': 'rest-paypal'
  },
  'booking-item': {
    'title': 'Booking',
    'content': 'template/booking.html',
    'url': 'rest-booking-item'
  },
  'booking-list': {
    'title': 'Booking List',
    'content': 'template/booking-list.html',
    'url': 'rest-booking-list'
  },
  'booking-create': {
    'title': 'Booking Create',
    'content': 'template/booking-create.html',
    'url': 'rest-booking-create'
  },
  'booking-edit': {
    'title': 'Booking Edit',
    'content': 'template/booking-edit.html',
    'url': 'rest-booking-edit'
  },
  'booking-search': {
    'title': 'Booking Search',
    'content': 'template/booking-search.html',
    'url': 'rest-booking-search'
  },
  'login': {
    'title': 'REST login',
    'content': 'template/login.html',
    'url': 'rest-login'
  },
  'signup': {
    'title': 'REST signup',
    'content': 'template/signup.html',
    'url': 'rest-signup'
  },
  'message-item': {
    'title': 'Message',
    'content': 'template/message.html',
    'url': 'rest-message-item'
  },
  'message-list': {
    'title': 'Message List',
    'content': 'template/message-list.html',
    'url': 'rest-message-list'
  },
  'message-search': {
    'title': 'Message Search',
    'content': 'template/message-search.html',
    'url': 'rest-message-search'
  },
  'payment-item': {
    'title': 'Payment',
    'content': 'template/payment.html',
    'url': 'rest-payment-item'
  },
  'payment-list': {
    'title': 'Payment List',
    'content': 'template/payment-list.html',
    'url': 'rest-payment-list'
  },
  'payment-search': {
    'title': 'Payment Search',
    'content': 'template/payment-search.html',
    'url': 'rest-payment-search'
  },
  'product-item': {
    'title': 'Product',
    'content': 'template/product.html',
    'url': 'rest-product-item'
  },
  'product-list': {
    'title': 'Product List',
    'content': 'template/product-list.html',
    'url': 'rest-product-list'
  },
  'product-create': {
    'title': 'Product Create',
    'content': 'template/product-create.html',
    'url': 'rest-product-create'
  },
  'product-edit': {
    'title': 'Product Edit',
    'content': 'template/product-edit.html',
    'url': 'rest-product-edit'
  },
  'product-search': {
    'title': 'Product Search',
    'content': 'template/product-search.html',
    'url': 'rest-product-search'
  },

  'discount-to-offer-show': {
    'title': 'Discount To Offer',
    'content': 'template/discount-to-offer-show.html',
    'url': 'rest-discount-to-offer-show'
  },
  'discount-to-offer-list': {
    'title': 'Discount to Offer List',
    'content': 'template/discount-to-offer-list.html',
    'url': 'rest-discount-to-offer-list'
  },
  'discount-to-offer-create': {
    'title': 'Discount To Offer Create',
    'content': 'template/discount-to-offer-create.html',
    'url': 'rest-discount-to-offer-create'
  },
  'discount-to-offer-edit': {
    'title': 'Discount To Offer Edit',
    'content': 'template/discount-to-offer-edit.html',
    'url': 'rest-discount-to-offer-edit'
  },


  'product-to-amenities-add-show': {
    'title': 'Product To Amenities Add',
    'content': 'template/product-to-amenities-add-show.html',
    'url': 'rest-product-to-amenities-add-show'
  },
  'product-to-amenities-add-list': {
    'title': 'List Product To Amenities Add',
    'content': 'template/product-to-amenities-add-list.html',
    'url': 'rest-product-to-amenities-add-list'
  },
  'product-to-amenities-add-create': {
    'title': 'Create Product To Amenities Add',
    'content': 'template/product-to-amenities-add-create.html',
    'url': 'rest-product-to-amenities-add-create'
  },
  'product-to-amenities-add-edit': {
    'title': 'Edit Product To Amenities Add',
    'content': 'template/product-to-amenities-add-edit.html',
    'url': 'rest-product-to-amenities-add-edit'
  },


  'product-to-amenities-remove-show': {
    'title': 'Product To Amenities Remove',
    'content': 'template/product-to-amenities-remove-show.html',
    'url': 'rest-product-to-amenities-remove-show'
  },
  'product-to-amenities-remove-list': {
    'title': 'List Product To Amenities Remove',
    'content': 'template/product-to-amenities-remove-list.html',
    'url': 'rest-product-to-amenities-remove-list'
  },
  'product-to-amenities-remove-create': {
    'title': 'Create Product To Amenities Remove',
    'content': 'template/product-to-amenities-remove-create.html',
    'url': 'rest-product-to-amenities-remove-create'
  },
  'product-to-amenities-remove-edit': {
    'title': 'Edit Product To Amenities Remove',
    'content': 'template/product-to-amenities-remove-edit.html',
    'url': 'rest-product-to-amenities-remove-edit'
  },


  'product-to-language-show': {
    'title': 'Product To Language',
    'content': 'template/product-to-language-show.html',
    'url': 'rest-product-to-language-show'
  },
  'product-to-language-list': {
    'title': 'List Product To Language',
    'content': 'template/product-to-language-list.html',
    'url': 'rest-product-to-language-list'
  },
  'product-to-language-create': {
    'title': 'Create Product To Language',
    'content': 'template/product-to-language-create.html',
    'url': 'rest-product-to-language-create'
  },
  'product-to-language-edit': {
    'title': 'Edit Product To Language',
    'content': 'template/product-to-language-edit.html',
    'url': 'rest-product-to-language-edit'
  },

  'user-item': {
    'title': 'User',
    'content': 'template/user.html',
    'url': 'rest-user-item'
  },
  'user-list': {
    'title': 'User List',
    'content': 'template/user-list.html',
    'url': 'rest-user-list'
  },
  'user-edit': {
    'title': 'User Edit',
    'content': 'template/user-edit.html',
    'url': 'rest-user-edit'
  },
  'user-create': {
    'title': 'User Create',
    'content': 'template/user-create.html',
    'url': 'rest-user-create'
  },
  'user-search': {
    'title': 'User Search',
    'content': 'template/user-search.html',
    'url': 'rest-user-search'
  },


  'affiliates-list': {
    'title': 'Report Affiliates List',
    'content': 'template/report/affiliates-list.html',
    'url': 'report-affiliates-list'
  },
  'affiliates-active-list': {
    'title': 'Report Affiliates Active List',
    'content': 'template/report/affiliates-active-list.html',
    'url': 'report-affiliates-active-list'
  },
  'resellers-list': {
    'title': 'Report Resellers List',
    'content': 'template/report/resellers-list.html',
    'url': 'report-resellers-list'
  },
  'resellers-active-list': {
    'title': 'Report Active List',
    'content': 'template/report/resellers-active-list.html',
    'url': 'report-resellers-active-list'
  },
  'customers-list': {
    'title': 'Report Customers List',
    'content': 'template/report/customers-list.html',
    'url': 'report-customers-list'
  },
  'beneficiaries-list': {
    'title': 'Report Beneficiaries List',
    'content': 'template/report/beneficiaries-list.html',
    'url': 'report-beneficiaries-list'
  },
  'providers-list': {
    'title': 'Report Providers List',
    'content': 'template/report/providers-list.html',
    'url': 'report-providers-list'
  },
  'jourday-provider-list': {
    'title': 'Report Jourday Provider List',
    'content': 'template/report/jourday-provider-list.html',
    'url': 'report-jourday-provider-list'
  },
  'upcoming-products-list': {
    'title': 'Report Upcoming Products List',
    'content': 'template/report/upcoming-products-list.html',
    'url': 'report-upcoming-products-list'
  },
  'live-products-list': {
    'title': 'Report Live Products List',
    'content': 'template/report/live-products-list.html',
    'url': 'report-live-products-list'
  },
  'paid-list': {
    'title': 'Report Paid List',
    'content': 'template/report/paid-list.html',
    'url': 'report-paid-list'
  },
  'payable-list': {
    'title': 'Report Payable List',
    'content': 'template/report/payable-list.html',
    'url': 'report-payable-list'
  },
  'receivables-list': {
    'title': 'Report Receivables List',
    'content': 'template/report/receivables-list.html',
    'url': 'report-receivables-list'
  },
  'totals-list': {
    'title': 'Report Totals List',
    'content': 'template/report/totals-list.html',
    'url': 'report-totals-list'
  },
  'comment-list': {
    'title': 'Report Comment List',
    'content': 'template/report/comment-list.html',
    'url': 'report-comment-list'
  },
  'review-list': {
    'title': 'Report Review List',
    'content': 'template/report/review-list.html',
    'url': 'report-review-list'
  },


  'affiliates-item': {
    'title': 'Report Affiliates',
    'content': 'template/report/affiliates-item.html',
    'url': 'report-affiliates-item'
  },
  'affiliates-active-item': {
    'title': 'Report Affiliates Active',
    'content': 'template/report/affiliates-active-item.html',
    'url': 'report-affiliates-active-item'
  },
  'resellers-item': {
    'title': 'Report Resellers',
    'content': 'template/report/resellers-item.html',
    'url': 'report-resellers-item'
  },
  'resellers-active-item': {
    'title': 'Report Resellers Active',
    'content': 'template/report/resellers-active-item.html',
    'url': 'report-resellers-active-item'
  },
  'customers-item': {
    'title': 'Report Customers',
    'content': 'template/report/customers-item.html',
    'url': 'report-customers-item'
  },
  'beneficiaries-item': {
    'title': 'Report Beneficiaries',
    'content': 'template/report/beneficiaries-item.html',
    'url': 'report-beneficiaries-item'
  },
  'providers-item': {
    'title': 'Report Providers',
    'content': 'template/report/providers-item.html',
    'url': 'report-providers-item'
  },
  'jourday-provider-item': {
    'title': 'Report Jourday Provider',
    'content': 'template/report/jourday-provider-item.html',
    'url': 'report-jourday-provider-item'
  },
  'upcoming-products-item': {
    'title': 'Report Upcoming Products',
    'content': 'template/report/upcoming-products-item.html',
    'url': 'report-upcoming-products-item'
  },
  'live-products-item': {
    'title': 'Report Live Products',
    'content': 'template/report/live-products-item.html',
    'url': 'report-live-products-item'
  },
  'paid-item': {
    'title': 'Report Paid',
    'content': 'template/report/paid-item.html',
    'url': 'report-paid-item'
  },
  'payable-item': {
    'title': 'Report Payable',
    'content': 'template/report/payable-item.html',
    'url': 'report-payable-item'
  },
  'receivables-item': {
    'title': 'Report Receivables',
    'content': 'template/report/receivables-item.html',
    'url': 'report-receivables-item'
  },
  'totals-item': {
    'title': 'Report Totals',
    'content': 'template/report/totals-item.html',
    'url': 'report-totals-item'
  },
  'comment-item': {
    'title': 'Report Comment',
    'content': 'template/report/comment-item.html',
    'url': 'report-comment-item'
  },
  'review-item': {
    'title': 'Report Review',
    'content': 'template/report/review-item.html',
    'url': 'report-review-item'
  },


  'user-profile': {
    'title': 'Profile',
    'content': 'template/profile.html',
    'url': 'rest-user-profile'
  },
  'profile-edit': {
    'title': 'Profile Edit',
    'content': 'template/profile-edit.html',
    'url': 'rest-profile-edit'
  },
  'profile-create': {
    'title': 'Profile Create',
    'content': 'template/profile-create.html',
    'url': 'rest-profile-create'
  },
  'profile-autoresponder': {
    'title': 'Profile Autoresponder',
    'content': 'template/profile-autoresponder.html',
    'url': 'rest-profile-autoresponder'
  },
  'messenger': {
    'title': 'REST Messenger',
    'content': 'template/messenger.html',
    'url': 'rest-messenger'
  },
  'activity-category-create': {
    'title': 'Activity Category create',
    'content': 'template/admin/constants/activity-category-create.html',
    'url': 'activity-category-create'
  },
  'activity-category-edit': {
    'title': 'Activity Category edit',
    'content': 'template/admin/constants/activity-category-edit.html',
    'url': 'activity-category-edit'
  },
  'activity-category-show': {
    'title': 'Activity Category',
    'content': 'template/admin/constants/activity-category-show.html',
    'url': 'activity-category-show'
  },
  'activity-category-list': {
    'title': 'Activity Category list',
    'content': 'template/admin/constants/activity-category-list.html',
    'url': 'activity-category-list'
  },
  'activity-type-create': {
    'title': 'Activity Type create',
    'content': 'template/admin/constants/activity-type-create.html',
    'url': 'activity-type-create'
  },
  'activity-type-edit': {
    'title': 'Activity Type edit',
    'content': 'template/admin/constants/activity-type-edit.html',
    'url': 'activity-type-edit'
  },
  'activity-type-show': {
    'title': 'Activity Type',
    'content': 'template/admin/constants/activity-type-show.html',
    'url': 'activity-type-show'
  },
  'activity-type-list': {
    'title': 'Activity Type list',
    'content': 'template/admin/constants/activity-type-list.html',
    'url': 'activity-type-list'
  },

  'amenities-create': {
    'title': 'Amenities create',
    'content': 'template/admin/constants/amenities-create.html',
    'url': 'amenities-create'
  },
  'amenities-edit': {
    'title': 'Amenities edit',
    'content': 'template/admin/constants/amenities-edit.html',
    'url': 'amenities-edit'
  },
  'amenities-show': {
    'title': 'Amenities',
    'content': 'template/admin/constants/amenities-show.html',
    'url': 'amenities-show'
  },
  'amenities-list': {
    'title': 'Amenities list',
    'content': 'template/admin/constants/amenities-list.html',
    'url': 'amenities-list'
  },

  'cancellation-policy-create': {
    'title': 'Cancellation Policy create',
    'content': 'template/admin/constants/cancellation-policy-create.html',
    'url': 'cancellation-policy-create'
  },
  'cancellation-policy-edit': {
    'title': 'Cancellation Policy edit',
    'content': 'template/admin/constants/cancellation-policy-edit.html',
    'url': 'cancellation-policy-edit'
  },
  'cancellation-policy-show': {
    'title': 'Cancellation Policy',
    'content': 'template/admin/constants/cancellation-policy-show.html',
    'url': 'cancellation-policy-show'
  },
  'cancellation-policy-list': {
    'title': 'Cancellation Policy list',
    'content': 'template/admin/constants/cancellation-policy-list.html',
    'url': 'cancellation-policy-list'
  },
  'city-create': {
    'title': 'City create',
    'content': 'template/admin/constants/city-create.html',
    'url': 'city-create'
  },
  'city-edit': {
    'title': 'City edit',
    'content': 'template/admin/constants/city-edit.html',
    'url': 'city-edit'
  },
  'city-show': {
    'title': 'City',
    'content': 'template/admin/constants/city-show.html',
    'url': 'city-show'
  },
  'city-list': {
    'title': 'City list',
    'content': 'template/admin/constants/city-list.html',
    'url': 'city-list'
  },

  'country-create': {
    'title': 'Country create',
    'content': 'template/admin/constants/country-create.html',
    'url': 'country-create'
  },
  'country-edit': {
    'title': 'Country edit',
    'content': 'template/admin/constants/country-edit.html',
    'url': 'country-edit'
  },
  'country-show': {
    'title': 'Country',
    'content': 'template/admin/constants/country-show.html',
    'url': 'country-show'
  },
  'country-list': {
    'title': 'Country list',
    'content': 'template/admin/constants/country-list.html',
    'url': 'country-list'
  },
  'language-create': {
    'title': 'Language create',
    'content': 'template/admin/constants/language-create.html',
    'url': 'language-create'
  },
  'language-edit': {
    'title': 'Language edit',
    'content': 'template/admin/constants/language-edit.html',
    'url': 'language-edit'
  },
  'language-show': {
    'title': 'Language',
    'content': 'template/admin/constants/language-show.html',
    'url': 'language-show'
  },
  'language-list': {
    'title': 'Language list',
    'content': 'template/admin/constants/language-list.html',
    'url': 'language-list'
  },
  'physical-level-create': {
    'title': 'Physical Level create',
    'content': 'template/admin/constants/physical-level-create.html',
    'url': 'physical-level-create'
  },
  'physical-level-edit': {
    'title': 'Physical Level edit',
    'content': 'template/admin/constants/physical-level-edit.html',
    'url': 'physical-level-edit'
  },
  'physical-level-show': {
    'title': 'Physical Level',
    'content': 'template/admin/constants/physical-level-show.html',
    'url': 'physical-level-show'
  },
  'physical-level-list': {
    'title': 'Physical Level list',
    'content': 'template/admin/constants/physical-level-list.html',
    'url': 'physical-level-list'
  },
  'product-category-create': {
    'title': 'Product Category create',
    'content': 'template/admin/constants/product-category-create.html',
    'url': 'product-category-create'
  },
  'product-category-edit': {
    'title': 'Product Category edit',
    'content': 'template/admin/constants/product-category-edit.html',
    'url': 'product-category-edit'
  },
  'product-category-show': {
    'title': 'Product Category',
    'content': 'template/admin/constants/product-category-show.html',
    'url': 'product-category-show'
  },
  'product-category-list': {
    'title': 'Product Category list',
    'content': 'template/admin/constants/product-category-list.html',
    'url': 'product-category-list'
  },


  'settings-create': {
    'title': 'Settings create',
    'content': 'template/admin/settings/settings-create.html',
    'url': 'settings-create'
  },
  'settings-edit': {
    'title': 'Settings edit',
    'content': 'template/admin/settings/settings-edit.html',
    'url': 'settings-edit'
  },
  'settings-show': {
    'title': 'Settings',
    'content': 'template/admin/settings/settings-show.html',
    'url': 'settings-show'
  },
  'settings-list': {
    'title': 'Settings list',
    'content': 'template/admin/settings/settings-list.html',
    'url': 'settings-list'
  },

  'sales-to-countries-create': {
    'title': 'Sales To Countries  create',
    'content': 'template/admin/settings/sales-to-countries-create.html',
    'url': 'sales-to-countries-create'
  },
  'sales-to-countries-edit': {
    'title': 'Sales To Countries edit',
    'content': 'template/admin/settings/sales-to-countries-edit.html',
    'url': 'sales-to-countries-edit'
  },
  'sales-to-countries-show': {
    'title': 'Sales to Countries',
    'content': 'template/admin/settings/sales-to-countries-show.html',
    'url': 'sales-to-countries-show'
  },
  'sales-to-countries-list': {
    'title': 'Sales to Countries list',
    'content': 'template/admin/settings/sales-to-countries-list.html',
    'url': 'sales-to-countries-list'
  },

  'autoresponder-create': {
    'title': 'Autoresponder create',
    'content': 'template/admin/templates/autoresponder-create.html',
    'url': 'autoresponder-create'
  },
  'autoresponder-edit': {
    'title': 'Autoresponder edit',
    'content': 'template/admin/templates/autoresponder-edit.html',
    'url': 'autoresponder-edit'
  },
  'autoresponder-show': {
    'title': 'Autoresponder',
    'content': 'template/admin/templates/autoresponder-show.html',
    'url': 'autoresponder-show'
  },
  'autoresponder-list': {
    'title': 'Autoresponder list',
    'content': 'template/admin/templates/autoresponder-list.html',
    'url': 'autoresponder-list'
  },
  'document-create': {
    'title': 'Document create',
    'content': 'template/admin/templates/document-create.html',
    'url': 'document-create'
  },
  'document-edit': {
    'title': 'Document edit',
    'content': 'template/admin/templates/document-edit.html',
    'url': 'document-edit'
  },
  'document-show': {
    'title': 'Document',
    'content': 'template/admin/templates/document-show.html',
    'url': 'document-show'
  },
  'document-list': {
    'title': 'Document list',
    'content': 'template/admin/templates/document-list.html',
    'url': 'document-list'
  },
  'mail-create': {
    'title': 'Mail create',
    'content': 'template/admin/templates/mail-create.html',
    'url': 'mail-create'
  },
  'mail-edit': {
    'title': 'Mail edit',
    'content': 'template/admin/templates/mail-edit.html',
    'url': 'mail-edit'
  },
  'mail-show': {
    'title': 'Mail',
    'content': 'template/admin/templates/mail-show.html',
    'url': 'mail-show'
  },
  'mail-list': {
    'title': 'Mail list',
    'content': 'template/admin/templates/mail-list.html',
    'url': 'mail-list'
  },
  'template-create': {
    'title': 'Template create',
    'content': 'template/admin/templates/template-create.html',
    'url': 'template-create'
  },
  'template-edit': {
    'title': 'Template edit',
    'content': 'template/admin/templates/template-edit.html',
    'url': 'template-edit'
  },
  'template-show': {
    'title': 'Template',
    'content': 'template/admin/templates/template-show.html',
    'url': 'template-show'
  },
  'template-list': {
    'title': 'Template list',
    'content': 'template/admin/templates/template-list.html',
    'url': 'template-list'
  },
  'voucher-create': {
    'title': 'Voucher create',
    'content': 'template/admin/templates/voucher-create.html',
    'url': 'voucher-create'
  },
  'voucher-edit': {
    'title': 'Voucher edit',
    'content': 'template/admin/templates/voucher-edit.html',
    'url': 'voucher-edit'
  },
  'voucher-show': {
    'title': 'Voucher',
    'content': 'template/admin/templates/voucher-show.html',
    'url': 'voucher-show'
  },
  'voucher-list': {
    'title': 'Voucher list',
    'content': 'template/admin/templates/voucher-list.html',
    'url': 'voucher-list'
  },
  'confirm-user': {
    'title': 'Confirm User',
    'content': 'template/confirm-user.html',
    'url': 'confirm-user'
  },
  'confirm-provider': {
    'title': 'Confirm Provider',
    'content': 'template/confirm-provider.html',
    'url': 'confirm-provider'
  },
  'subscriptions-list': {
    'title': 'Subscriptions list',
    'content': 'template/admin/subscriptions/subscriptions-list.html',
    'url': 'subscription-list'
  },
  'subscriptions-create': {
    'title': 'Subscription create',
    'content': 'template/admin/subscriptions/subscriptions-create.html',
    'url': 'subscription-show'
  },
  'subscriptions-show': {
    'title': 'Subscription',
    'content': 'template/admin/subscriptions/subscriptions-show.html',
    'url': 'subscription-create'
  },
  'subscriptions-edit': {
    'title': 'Subscription edit',
    'content': 'template/admin/subscriptions/subscriptions-edit.html',
    'url': 'subscription-edit'
  },
  'subscriber-add': {
    'title': 'Subscriber add',
    'content': 'template/admin/subscriptions/subscriber-add.html',
    'url': 'subscriber-add'
  },
  'notification-send': {
    'title': 'Send notification',
    'content': 'template/admin/subscriptions/notification-send.html',
    'url': 'notification-send'
  }
};