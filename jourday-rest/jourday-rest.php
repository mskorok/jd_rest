<?php
/**
 * @package Jourday_REST
 * @version 1.0
 */
/*
Plugin Name: Jourday REST
Plugin URI: https://github.com/Jourdayltd/wp-rest-plugin
Description: This is plugin for Jourday REST API.
Author: Mikhail Skorokhod
Version: 1.0
Author URI: http://arcanas.eu/
Text Domain: jourday-rest
*/
header('Access-Control-Allow-Origin: *');

if (!defined('JD_REST_PLUGIN_DIR')) {
    define('JD_REST_PLUGIN_DIR', plugin_dir_path(__FILE__));
}
if (!defined('JD_REST_PLUGIN_URL')) {
    define('JD_REST_PLUGIN_URL', plugin_dir_url(__FILE__));
}

/******* KEYS *********************/
if (!defined('WP_EDIT_USER')) {
    define('WP_EDIT_USER', 'wp-ajax-edit-user');
}
if (!defined('WP_EDIT_PRODUCT')) {
    define('WP_EDIT_PRODUCT', 'wp-ajax-key');
}
if (!defined('WP_PROFILE')) {
    define('WP_PROFILE', 'user');
}

/****************  REST URLS *******************/

if (!defined('REST_URL_USER_EDIT_SET')) {
    define('REST_URL_USER_EDIT_SET', 'wp/user/edit/set/');
}
if (!defined('REST_URL_USER_EDIT_GET')) {
    define('REST_URL_USER_EDIT_GET', 'wp/user/edit/get');
}
if (!defined('REST_URL_USER_SHOW_GET')) {
    define('REST_URL_USER_SHOW_GET', 'wp/user/show/get');
}

if (!defined('REST_URL_PRODUCT_CREATE')) {
    define('REST_URL_PRODUCT_CREATE', 'wp/product/create/');
}
if (!defined('REST_URL_PRODUCT_EDIT')) {
    define('REST_URL_PRODUCT_EDIT', 'wp/product/edit/');
}
if (!defined('REST_URL_PRODUCT_SHOW')) {
    define('REST_URL_PRODUCT_SHOW', 'wp/product/show/');
}

if (!defined('REST_URL_COMMENTS_CREATE')) {
    define('REST_URL_COMMENTS_CREATE', 'wp/comments/create/');
}
if (!defined('REST_URL_COMMENTS_EDIT')) {
    define('REST_URL_COMMENTS_EDIT', 'wp/comments/edit/');
}
if (!defined('REST_URL_COMMENTS_SHOW')) {
    define('REST_URL_COMMENTS_SHOW', 'wp/comments/show/');
}

if (!defined('REST_URL_REVIEW_CREATE')) {
    define('REST_URL_REVIEW_CREATE', 'wp/review/create/');
}
if (!defined('REST_URL_REVIEW_EDIT')) {
    define('REST_URL_REVIEW_EDIT', 'wp/review/edit/');
}
if (!defined('REST_URL_REVIEW_SHOW')) {
    define('REST_URL_REVIEW_SHOW', 'wp/review/show/');
}

if (!defined('REST_URL_BOOKING_CREATE')) {
    define('REST_URL_BOOKING_CREATE', 'wp/booking/create/');
}
if (!defined('REST_URL_BOOKING_EDIT')) {
    define('REST_URL_BOOKING_EDIT', 'wp/booking/edit/');
}
if (!defined('REST_URL_BOOKING_SHOW')) {
    define('REST_URL_BOOKING_SHOW', 'wp/booking/show/');
}


if (!defined('REST_URL_SUBSCRIPTIONS_CREATE')) {
    define('REST_URL_SUBSCRIPTIONS_CREATE', 'wp/subscriptions/create/');
}
if (!defined('REST_URL_SUBSCRIPTIONS_EDIT')) {
    define('REST_URL_SUBSCRIPTIONS_EDIT', 'wp/subscriptions/edit/');
}
if (!defined('REST_URL_SUBSCRIPTIONS_SHOW')) {
    define('REST_URL_SUBSCRIPTIONS_SHOW', 'wp/subscriptions/show/');
}
if (!defined('REST_URL_NOTIFICATION_SEND')) {
    define('REST_URL_NOTIFICATION_SEND', 'wp/notification/show/');
}

if (!defined('REST_URL_SUBSCRIBER_ADD')) {
    define('REST_URL_SUBSCRIBER_ADD', '/wp/subscribers/create/');
}


if (!defined('REST_URL_FINAL_PRICE')) {
    define('REST_URL_FINAL_PRICE', 'booking/final/price');
}
if (!defined('REST_URL_FORM_GET')) {
    define('REST_URL_FORM_GET', 'wp/form/get/');
}
if (!defined('REST_URL_FORM_CREATE')) {
    define('REST_URL_FORM_CREATE', 'wp/form/create/');
}
if (!defined('REST_URL_FORM_CREATE_MAIN')) {
    define('REST_URL_FORM_CREATE_MAIN', 'wp/form/create/main');
}
if (!defined('REST_URL_FORM_CREATE_WITH_IMAGE')) {
    define('REST_URL_FORM_CREATE_WITH_IMAGE', 'wp/form/create/image');
}
if (!defined('REST_URL_FORM_CREATE_RELATED')) {
    define('REST_URL_FORM_CREATE_RELATED', 'wp/form/create/related/');
}
if (!defined('REST_URL_FORM_CREATE_RELATED_IMAGE')) {
    define('REST_URL_FORM_CREATE_RELATED_IMAGE', 'wp/form/create/related/image/');
}
if (!defined('REST_URL_FORM_DELETE_RELATED')) {
    define('REST_URL_FORM_DELETE_RELATED', 'wp/form/delete/related');
}

if (!defined('REST_URL_PAYMENT_GET')) {
    define('REST_URL_PAYMENT_GET', 'wp/payment/get');
}
if (!defined('REST_URL_PAYMENT_SHOW')) {
    define('REST_URL_PAYMENT_SHOW', 'wp/payment/show');
}

if (!defined('REST_URL_MESSAGE_CREATE')) {
    define('REST_URL_MESSAGE_CREATE', 'wp/message/create');
}
if (!defined('REST_URL_MESSAGE_GET')) {
    define('REST_URL_MESSAGE_GET', 'wp/message/get');
}
if (!defined('REST_URL_MESSAGE_SHOW')) {
    define('REST_URL_MESSAGE_SHOW', 'wp/message/show');
}

if (!defined('REST_URL_LOGIN_GET')) {
    define('REST_URL_LOGIN_GET', 'wp/login');
}
if (!defined('REST_URL_LOGIN_POST')) {
    define('REST_URL_LOGIN_POST', 'users/authenticate');
}

if (!defined('REST_URL_OWNER_PRODUCT')) {
    define('REST_URL_OWNER_PRODUCT', 'products/owner');
}
if (!defined('REST_URL_OWNER_BOOKING')) {
    define('REST_URL_OWNER_BOOKING', 'booking/owner');
}
if (!defined('REST_URL_OWNER_MESSAGE')) {
    define('REST_URL_OWNER_MESSAGE', 'messages/owner');
}

/**********  ROUTES ***************/

/*********************** NAVBAR ROUTES *********************************/

define('REST_PAYPAL', 'rest-paypal');
define('REST_BOOKING', 'rest-booking-item');
define('REST_BOOKING_LIST', 'rest-booking-list');
define('REST_BOOKING_ADD', 'rest-booking-create');
define('REST_BOOKING_EDIT', 'rest-booking-edit');
define('REST_BOOKING_SEARCH', 'rest-booking-search');
define('REST_MESSAGE', 'rest-message-item');
define('REST_MESSAGE_LIST', 'rest-message-list');
define('REST_MESSAGE_SEARCH', 'rest-message-search');
define('REST_PRODUCT', 'rest-product-item');
define('REST_PRODUCT_LIST', 'rest-product-list');
define('REST_PRODUCT_ADD', 'rest-product-create');
define('REST_PRODUCT_EDIT', 'rest-product-edit');
define('REST_PRODUCT_SEARCH', 'rest-product-search');
define('REST_DISCOUNT_TO_OFFER_LIST', 'rest-discount-to-offer-list');
define('REST_DISCOUNT_TO_OFFER_CREATE', 'rest-discount-to-offer-create');
define('REST_DISCOUNT_TO_OFFER_EDIT', 'rest-discount-to-offer-edit');
define('REST_DISCOUNT_TO_OFFER_SHOW', 'rest-discount-to-offer-show');
define('REST_PRODUCT_TO_AMENITIES_ADD_LIST', 'rest-product-to-amenities-add-list');
define('REST_PRODUCT_TO_AMENITIES_ADD_CREATE', 'rest-product-to-amenities-add-create');
define('REST_PRODUCT_TO_AMENITIES_ADD_EDIT', 'rest-product-to-amenities-add-edit');
define('REST_PRODUCT_TO_AMENITIES_ADD_SHOW', 'rest-product-to-amenities-add-show');
define('REST_PRODUCT_TO_AMENITIES_REMOVE_LIST', 'rest-product-to-amenities-remove-list');
define('REST_PRODUCT_TO_AMENITIES_REMOVE_CREATE', 'rest-product-to-amenities-remove-create');
define('REST_PRODUCT_TO_AMENITIES_REMOVE_EDIT', 'rest-product-to-amenities-remove-edit');
define('REST_PRODUCT_TO_AMENITIES_REMOVE_SHOW', 'rest-product-to-amenities-remove-show');
define('REST_PRODUCT_TO_LANGUAGE_LIST', 'rest-product-to-language-list');
define('REST_PRODUCT_TO_LANGUAGE_CREATE', 'rest-product-to-language-create');
define('REST_PRODUCT_TO_LANGUAGE_EDIT', 'rest-product-to-language-edit');
define('REST_PRODUCT_TO_LANGUAGE_SHOW', 'rest-product-to-language-show');
define('REST_PAYMENT', 'rest-payment-item');
define('REST_PAYMENT_LIST', 'rest-payment-list');
define('REST_PAYMENT_SEARCH', 'rest-payment-search');
define('REST_USER', 'rest-user-item');
define('REST_USER_LIST', 'rest-user-list');
define('REST_USER_EDIT', 'rest-user-edit');
define('REST_USER_CREATE', 'rest-user-create');
define('REST_USER_SEARCH', 'rest-user-search');
define('REST_USER_PROFILE', 'rest-user-profile');
define('REST_PROFILE_EDIT', 'rest-profile-edit');
define('REST_PROFILE_CREATE', 'rest-profile-create');
define('REST_PROFILE_AUTORESPONDER', 'rest-profile-autoresponder');
define('REST_MESSENGER', 'rest-messenger');
define('REST_LOGIN', 'rest-login');
define('REST_SIGNUP', 'rest-signup');
define('REST_HOME', 'rest-home');


/*********************** REPORT ROUTES *********************************/

define('REST_REPORT_RESELLERS_LIST', 'report-resellers-list');
define('REST_REPORT_RESELLERS_ACTIVE_LIST', 'report-resellers-active-list');
define('REST_REPORT_AFFILIATES_LIST', 'report-affiliates-list');
define('REST_REPORT_AFFILIATES_ACTIVE_LIST', 'report-affiliates-active-list');
define('REST_REPORT_CUSTOMERS_LIST', 'report-customers-list');
define('REST_REPORT_BENEFICIARIES_LIST', 'report-beneficiaries-list');
define('REST_REPORT_PROVIDERS_LIST', 'report-providers-list');
define('REST_REPORT_JOURDAY_PROVIDER_LIST', 'report-jourday-provider-list');
define('REST_REPORT_UPCOMING_PRODUCTS_LIST', 'report-upcoming-products-list');
define('REST_REPORT_LIVE_PRODUCTS_LIST', 'report-live-products-list');
define('REST_REPORT_PAYABLE_LIST', 'report-payable-list');
define('REST_REPORT_PAID_LIST', 'report-paid-list');
define('REST_REPORT_RECEIVABLES_LIST', 'report-receivables-list');
define('REST_REPORT_TOTALS_LIST', 'report-totals-list');
define('REST_REPORT_COMMENT_LIST', 'report-comment-list');
define('REST_REPORT_REVIEW_LIST', 'report-review-list');


define('REST_REPORT_RESELLERS', 'report-resellers-item');
define('REST_REPORT_RESELLERS_ACTIVE', 'report-resellers-active-item');
define('REST_REPORT_AFFILIATES', 'report-affiliates-item');
define('REST_REPORT_AFFILIATES_ACTIVE', 'report-affiliates-active-item');
define('REST_REPORT_CUSTOMERS', 'report-customers-item');
define('REST_REPORT_BENEFICIARIES', 'report-beneficiaries-item');
define('REST_REPORT_PROVIDERS', 'report-providers-item');
define('REST_REPORT_JOURDAY_PROVIDER', 'report-jourday-provider-item');
define('REST_REPORT_UPCOMING_PRODUCTS', 'report-upcoming-products-item');
define('REST_REPORT_LIVE_PRODUCTS', 'report-live-products-item');
define('REST_REPORT_PAYABLE', 'report-payable-item');
define('REST_REPORT_PAID', 'report-paid-item');
define('REST_REPORT_RECEIVABLES', 'report-receivables-item');
define('REST_REPORT_TOTALS', 'report-totals-item');
define('REST_REPORT_COMMENT', 'report-comment-item');
define('REST_REPORT_REVIEW', 'report-review-item');

/*********************** ADMIN ROUTES **********************************/

define('REST_ADMIN_ACTIVITY_CATEGORY_CREATE', 'activity-category-create');
define('REST_ADMIN_ACTIVITY_CATEGORY_EDIT', 'activity-category-edit');
define('REST_ADMIN_ACTIVITY_CATEGORY_SHOW', 'activity-category-show');
define('REST_ADMIN_ACTIVITY_CATEGORY_LIST', 'activity-category-list');
define('REST_ADMIN_ACTIVITY_TYPE_CREATE', 'activity-type-create');
define('REST_ADMIN_ACTIVITY_TYPE_EDIT', 'activity-type-edit');
define('REST_ADMIN_ACTIVITY_TYPE_SHOW', 'activity-type-show');
define('REST_ADMIN_ACTIVITY_TYPE_LIST', 'activity-type-list');
define('REST_ADMIN_AMENITIES_CREATE', 'amenities-create');
define('REST_ADMIN_AMENITIES_EDIT', 'amenities-edit');
define('REST_ADMIN_AMENITIES_SHOW', 'amenities-show');
define('REST_ADMIN_AMENITIES_LIST', 'amenities-list');
define('REST_ADMIN_CANCELLATION_POLICY_CREATE', 'cancellation-policy-create');
define('REST_ADMIN_CANCELLATION_POLICY_EDIT', 'cancellation-policy-edit');
define('REST_ADMIN_CANCELLATION_POLICY_SHOW', 'cancellation-policy-show');
define('REST_ADMIN_CANCELLATION_POLICY_LIST', 'cancellation-policy-list');
define('REST_ADMIN_CITY_CREATE', 'city-create');
define('REST_ADMIN_CITY_EDIT', 'city-edit');
define('REST_ADMIN_CITY_SHOW', 'city-show');
define('REST_ADMIN_CITY_LIST', 'city-list');
define('REST_ADMIN_COUNTRY_CREATE', 'country-create');
define('REST_ADMIN_COUNTRY_EDIT', 'country-edit');
define('REST_ADMIN_COUNTRY_SHOW', 'country-show');
define('REST_ADMIN_COUNTRY_LIST', 'country-list');
define('REST_ADMIN_LANGUAGE_CREATE', 'language-create');
define('REST_ADMIN_LANGUAGE_EDIT', 'language-edit');
define('REST_ADMIN_LANGUAGE_SHOW', 'language-show');
define('REST_ADMIN_LANGUAGE_LIST', 'language-list');
define('REST_ADMIN_PHYSICAL_LEVEL_CREATE', 'physical-level-create');
define('REST_ADMIN_PHYSICAL_LEVEL_EDIT', 'physical-level-edit');
define('REST_ADMIN_PHYSICAL_LEVEL_SHOW', 'physical-level-show');
define('REST_ADMIN_PHYSICAL_LEVEL_LIST', 'physical-level-list');
define('REST_ADMIN_PRODUCT_CATEGORY_CREATE', 'product-category-create');
define('REST_ADMIN_PRODUCT_CATEGORY_EDIT', 'product-category-edit');
define('REST_ADMIN_PRODUCT_CATEGORY_SHOW', 'product-category-show');
define('REST_ADMIN_PRODUCT_CATEGORY_LIST', 'product-category-list');

define('REST_ADMIN_SETTINGS_CREATE', 'settings-create');
define('REST_ADMIN_SETTINGS_EDIT', 'settings-edit');
define('REST_ADMIN_SETTINGS_SHOW', 'settings-show');
define('REST_ADMIN_SETTINGS_LIST', 'settings-list');

define('REST_ADMIN_SALES_TO_COUNTRIES_CREATE', 'sales-to-countries-create');
define('REST_ADMIN_SALES_TO_COUNTRIES_EDIT', 'sales-to-countries-edit');
define('REST_ADMIN_SALES_TO_COUNTRIES_SHOW', 'sales-to-countries-show');
define('REST_ADMIN_SALES_TO_COUNTRIES_LIST', 'sales-to-countries-list');

define('REST_ADMIN_AUTORESPONDER_CREATE', 'autoresponder-create');
define('REST_ADMIN_AUTORESPONDER_EDIT', 'autoresponder-edit');
define('REST_ADMIN_AUTORESPONDER_SHOW', 'autoresponder-show');
define('REST_ADMIN_AUTORESPONDER_LIST', 'autoresponder-list');
define('REST_ADMIN_DOCUMENT_CREATE', 'document-create');
define('REST_ADMIN_DOCUMENT_EDIT', 'document-edit');
define('REST_ADMIN_DOCUMENT_SHOW', 'document-show');
define('REST_ADMIN_DOCUMENT_LIST', 'document-list');
define('REST_ADMIN_MAIL_CREATE', 'mail-create');
define('REST_ADMIN_MAIL_EDIT', 'mail-edit');
define('REST_ADMIN_MAIL_SHOW', 'mail-show');
define('REST_ADMIN_MAIL_LIST', 'mail-list');
define('REST_ADMIN_TEMPLATE_CREATE', 'template-create');
define('REST_ADMIN_TEMPLATE_EDIT', 'template-edit');
define('REST_ADMIN_TEMPLATE_SHOW', 'template-show');
define('REST_ADMIN_TEMPLATE_LIST', 'template-list');
define('REST_ADMIN_VOUCHER_CREATE', 'voucher-create');
define('REST_ADMIN_VOUCHER_EDIT', 'voucher-edit');
define('REST_ADMIN_VOUCHER_SHOW', 'voucher-show');
define('REST_ADMIN_VOUCHER_LIST', 'voucher-list');

define('REST_ADMIN_CONFIRM_USER', 'confirm-user');
define('REST_ADMIN_CONFIRM_PROVIDER', 'confirm-provider');

define('REST_ADMIN_SUBSCRIPTIONS_LIST', 'subscription-list');
define('REST_ADMIN_SUBSCRIPTIONS_SHOW', 'subscription-show');
define('REST_ADMIN_SUBSCRIPTIONS_CREATE', 'subscription-create');
define('REST_ADMIN_SUBSCRIPTIONS_EDIT', 'subscription-edit');
define('REST_ADMIN_SUBSCRIBER_ADD', 'subscriber-add');
define('REST_ADMIN_NOTIFICATION_SEND', 'notification-send');

/*********************** NAVBAR ROUTES *********************************/

//define('REST_ADMIN_URL', 'http://jd.old/wp-content/plugins/jourday-rest/template/admin-navbar.html');//local
define('REST_ADMIN_URL', 'http://148.251.124.133:8080/wp-content/plugins/jourday-rest/template/admin-navbar.html');//dev
//define('REST_NAVBAR_URL', 'http://jd.old/wp-content/plugins/jourday-rest/template/navbar.html');//local
define('REST_NAVBAR_URL', 'http://148.251.124.133:8080/wp-content/plugins/jourday-rest/template/navbar.html');//dev


/******* Init Data *******************/

$jd_rest_init = [
    'home' => [
        'title' => 'Jourday REST API WP UI',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/home.html'),
        'name' => REST_HOME
    ],
    'paypal' => [
        'title' => 'REST Paypal Service',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/paypal.html'),
        'name' => REST_PAYPAL
    ],
    'booking-item' => [
        'title' => 'Booking',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/booking.html'),
        'name' => REST_BOOKING
    ],
    'booking-list' => [
        'title' => 'Booking List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/booking-list.html'),
        'name' => REST_BOOKING_LIST
    ],
    'booking-create' => [
        'title' => 'Booking Create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/booking-create.html'),
        'name' => REST_BOOKING_ADD
    ],
    'booking-edit' => [
        'title' => 'Booking Edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/booking-edit.html'),
        'name' => REST_BOOKING_EDIT
    ],
    'booking-search' => [
        'title' => 'Booking Search',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/booking-search.html'),
        'name' => REST_BOOKING_SEARCH
    ],
    'login' => [
        'title' => 'REST login',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/login.html'),
        'name' => REST_LOGIN
    ],
    'signup' => [
        'title' => 'REST signup',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/signup.html'),
        'name' => REST_SIGNUP
    ],
    'message-item' => [
        'title' => 'Message',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/message.html'),
        'name' => REST_MESSAGE
    ],
    'message-list' => [
        'title' => 'Message List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/message-list.html'),
        'name' => REST_MESSAGE_LIST
    ],
    'message-search' => [
        'title' => 'Message Search',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/message-search.html'),
        'name' => REST_MESSAGE_SEARCH
    ],
    'payment-item' => [
        'title' => 'Payment',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/payment.html'),
        'name' => REST_PAYMENT
    ],
    'payment-list' => [
        'title' => 'Payment List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/payment-list.html'),
        'name' => REST_PAYMENT_LIST
    ],
    'payment-search' => [
        'title' => 'Payment Search',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/payment-search.html'),
        'name' => REST_PAYMENT_SEARCH
    ],
    'product-item' => [
        'title' => 'Product',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product.html'),
        'name' => REST_PRODUCT
    ],
    'product-list' => [
        'title' => 'Product List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-list.html'),
        'name' => REST_PRODUCT_LIST
    ],
    'product-create' => [
        'title' => 'Product Create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-create.html'),
        'name' => REST_PRODUCT_ADD
    ],
    'product-edit' => [
        'title' => 'Product Edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-edit.html'),
        'name' => REST_PRODUCT_EDIT
    ],
    'product-search' => [
        'title' => 'Product Search',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-search.html'),
        'name' => REST_PRODUCT_SEARCH
    ],

    'discount-to-offer-show' => [
        'title' => 'Discount To Offer',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/discount-to-offer-show.html'),
        'name' => REST_DISCOUNT_TO_OFFER_SHOW
    ],
    'discount-to-offer-list' => [
        'title' => 'Discount to Offer List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/discount-to-offer-list.html'),
        'name' => REST_DISCOUNT_TO_OFFER_LIST
    ],
    'discount-to-offer-create' => [
        'title' => 'Discount To Offer Create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/discount-to-offer-create.html'),
        'name' => REST_DISCOUNT_TO_OFFER_CREATE
    ],
    'discount-to-offer-edit' => [
        'title' => 'Discount To Offer Edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/discount-to-offer-edit.html'),
        'name' => REST_DISCOUNT_TO_OFFER_EDIT
    ],


    'product-to-amenities-add-show' => [
        'title' => 'Product To Amenities Add',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-add-show.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_ADD_SHOW
    ],
    'product-to-amenities-add-list' => [
        'title' => 'List Product To Amenities Add',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-add-list.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_ADD_LIST
    ],
    'product-to-amenities-add-create' => [
        'title' => 'Create Product To Amenities Add',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-add-create.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_ADD_CREATE
    ],
    'product-to-amenities-add-edit' => [
        'title' => 'Edit Product To Amenities Add',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-add-edit.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_ADD_EDIT
    ],


    'product-to-amenities-remove-show' => [
        'title' => 'Product To Amenities Remove',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-remove-show.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_REMOVE_SHOW
    ],
    'product-to-amenities-remove-list' => [
        'title' => 'List Product To Amenities Remove',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-remove-list.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_REMOVE_LIST
    ],
    'product-to-amenities-remove-create' => [
        'title' => 'Create Product To Amenities Remove',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-remove-create.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_REMOVE_CREATE
    ],
    'product-to-amenities-remove-edit' => [
        'title' => 'Edit Product To Amenities Remove',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-amenities-remove-edit.html'),
        'name' => REST_PRODUCT_TO_AMENITIES_REMOVE_EDIT
    ],


    'product-to-language-show' => [
        'title' => 'Product To Language',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-language-show.html'),
        'name' => REST_PRODUCT_TO_LANGUAGE_SHOW
    ],
    'product-to-language-list' => [
        'title' => 'List Product To Language',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-language-list.html'),
        'name' => REST_PRODUCT_TO_LANGUAGE_LIST
    ],
    'product-to-language-create' => [
        'title' => 'Create Product To Language',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-language-create.html'),
        'name' => REST_PRODUCT_TO_LANGUAGE_CREATE
    ],
    'product-to-language-edit' => [
        'title' => 'Edit Product To Language',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/product-to-language-edit.html'),
        'name' => REST_PRODUCT_TO_LANGUAGE_EDIT
    ],

    'user-item' => [
        'title' => 'User',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/user.html'),
        'name' => REST_USER
    ],
    'user-list' => [
        'title' => 'User List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/user-list.html'),
        'name' => REST_USER_LIST
    ],
    'user-edit' => [
        'title' => 'User Edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/user-edit.html'),
        'name' => REST_USER_EDIT
    ],
    'user-create' => [
        'title' => 'User Create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/user-create.html'),
        'name' => REST_USER_CREATE
    ],
    'user-search' => [
        'title' => 'User Search',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/user-search.html'),
        'name' => REST_USER_SEARCH
    ],


    'affiliates-list' => [
        'title' => 'Report Affiliates List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/affiliates-list.html'),
        'name' => REST_REPORT_AFFILIATES_LIST
    ],
    'affiliates-active-list' => [
        'title' => 'Report Affiliates Active List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/affiliates-active-list.html'),
        'name' => REST_REPORT_AFFILIATES_ACTIVE_LIST
    ],
    'resellers-list' => [
        'title' => 'Report Resellers List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/resellers-list.html'),
        'name' => REST_REPORT_RESELLERS_LIST
    ],
    'resellers-active-list' => [
        'title' => 'Report Active List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/resellers-active-list.html'),
        'name' => REST_REPORT_RESELLERS_ACTIVE_LIST
    ],
    'customers-list' => [
        'title' => 'Report Customers List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/customers-list.html'),
        'name' => REST_REPORT_CUSTOMERS_LIST
    ],
    'beneficiaries-list' => [
        'title' => 'Report Beneficiaries List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/beneficiaries-list.html'),
        'name' => REST_REPORT_BENEFICIARIES_LIST
    ],
    'providers-list' => [
        'title' => 'Report Providers List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/providers-list.html'),
        'name' => REST_REPORT_PROVIDERS_LIST
    ],
    'jourday-provider-list' => [
        'title' => 'Report Jourday Provider List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/jourday-provider-list.html'),
        'name' => REST_REPORT_JOURDAY_PROVIDER_LIST
    ],
    'upcoming-products-list' => [
        'title' => 'Report Upcoming Products List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/upcoming-products-list.html'),
        'name' => REST_REPORT_UPCOMING_PRODUCTS_LIST
    ],
    'live-products-list' => [
        'title' => 'Report Live Products List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/live-products-list.html'),
        'name' => REST_REPORT_LIVE_PRODUCTS_LIST
    ],
    'paid-list' => [
        'title' => 'Report Paid List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/paid-list.html'),
        'name' => REST_REPORT_PAID_LIST
    ],
    'payable-list' => [
        'title' => 'Report Payable List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/payable-list.html'),
        'name' => REST_REPORT_PAYABLE_LIST
    ],
    'receivables-list' => [
        'title' => 'Report Receivables List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/receivables-list.html'),
        'name' => REST_REPORT_RECEIVABLES_LIST
    ],
    'totals-list' => [
        'title' => 'Report Totals List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/totals-list.html'),
        'name' => REST_REPORT_TOTALS_LIST
    ],
    'comment-list' => [
        'title' => 'Report Comment List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/comment-list.html'),
        'name' => REST_REPORT_COMMENT_LIST
    ],
    'review-list' => [
        'title' => 'Report Review List',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/review-list.html'),
        'name' => REST_REPORT_REVIEW_LIST
    ],



    'affiliates-item' => [
        'title' => 'Report Affiliates',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/affiliates-item.html'),
        'name' => REST_REPORT_AFFILIATES
    ],
    'affiliates-active-item' => [
        'title' => 'Report Affiliates Active',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/affiliates-active-item.html'),
        'name' => REST_REPORT_AFFILIATES_ACTIVE
    ],
    'resellers-item' => [
        'title' => 'Report Resellers',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/resellers-item.html'),
        'name' => REST_REPORT_RESELLERS
    ],
    'resellers-active-item' => [
        'title' => 'Report Resellers Active',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/resellers-active-item.html'),
        'name' => REST_REPORT_RESELLERS_ACTIVE
    ],
    'customers-item' => [
        'title' => 'Report Customers',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/customers-item.html'),
        'name' => REST_REPORT_CUSTOMERS
    ],
    'beneficiaries-item' => [
        'title' => 'Report Beneficiaries',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/beneficiaries-item.html'),
        'name' => REST_REPORT_BENEFICIARIES
    ],
    'providers-item' => [
        'title' => 'Report Providers',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/providers-item.html'),
        'name' => REST_REPORT_PROVIDERS
    ],
    'jourday-provider-item' => [
        'title' => 'Report Jourday Provider',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/jourday-provider-item.html'),
        'name' => REST_REPORT_JOURDAY_PROVIDER
    ],
    'upcoming-products-item' => [
        'title' => 'Report Upcoming Products',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/upcoming-products-item.html'),
        'name' => REST_REPORT_UPCOMING_PRODUCTS
    ],
    'live-products-item' => [
        'title' => 'Report Live Products',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/live-products-item.html'),
        'name' => REST_REPORT_LIVE_PRODUCTS
    ],
    'paid-item' => [
        'title' => 'Report Paid',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/paid-item.html'),
        'name' => REST_REPORT_PAID
    ],
    'payable-item' => [
        'title' => 'Report Payable',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/payable-item.html'),
        'name' => REST_REPORT_PAYABLE
    ],
    'receivables-item' => [
        'title' => 'Report Receivables',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/receivables-item.html'),
        'name' => REST_REPORT_RECEIVABLES
    ],
    'totals-item' => [
        'title' => 'Report Totals',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/totals-item.html'),
        'name' => REST_REPORT_TOTALS
    ],
    'comment-item' => [
        'title' => 'Report Comment',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/comment-item.html'),
        'name' => REST_REPORT_COMMENT
    ],
    'review-item' => [
        'title' => 'Report Review',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/report/review-item.html'),
        'name' => REST_REPORT_REVIEW
    ],



    'user-profile' => [
        'title' => 'Profile',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/profile.html'),
        'name' => REST_USER_PROFILE
    ],
    'profile-edit' => [
        'title' => 'Profile Edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/profile-edit.html'),
        'name' => REST_PROFILE_EDIT
    ],
    'profile-create' => [
        'title' => 'Profile Create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/profile-create.html'),
        'name' => REST_PROFILE_CREATE
    ],
    'profile-autoresponder' => [
        'title' => 'Profile Autoresponder',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/profile-autoresponder.html'),
        'name' => REST_PROFILE_AUTORESPONDER
    ],
    'messenger' => [
        'title' => 'REST Messenger',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/messenger.html'),
        'name' => REST_MESSENGER
    ],
    'activity-category-create' => [
        'title' => 'Activity Category create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-category-create.html'),
        'name' => REST_ADMIN_ACTIVITY_CATEGORY_CREATE
    ],
    'activity-category-edit' => [
        'title' => 'Activity Category edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-category-edit.html'),
        'name' => REST_ADMIN_ACTIVITY_CATEGORY_EDIT
    ],
    'activity-category-show' => [
        'title' => 'Activity Category',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-category-show.html'),
        'name' => REST_ADMIN_ACTIVITY_CATEGORY_SHOW
    ],
    'activity-category-list' => [
        'title' => 'Activity Category list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-category-list.html'),
        'name' => REST_ADMIN_ACTIVITY_CATEGORY_LIST
    ],
    'activity-type-create' => [
        'title' => 'Activity Type create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-type-create.html'),
        'name' => REST_ADMIN_ACTIVITY_TYPE_CREATE
    ],
    'activity-type-edit' => [
        'title' => 'Activity Type edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-type-edit.html'),
        'name' => REST_ADMIN_ACTIVITY_TYPE_EDIT
    ],
    'activity-type-show' => [
        'title' => 'Activity Type',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-type-show.html'),
        'name' => REST_ADMIN_ACTIVITY_TYPE_SHOW
    ],
    'activity-type-list' => [
        'title' => 'Activity Type list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/activity-type-list.html'),
        'name' => REST_ADMIN_ACTIVITY_TYPE_LIST
    ],

    'amenities-create' => [
        'title' => 'Amenities create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/amenities-create.html'),
        'name' => REST_ADMIN_AMENITIES_CREATE
    ],
    'amenities-edit' => [
        'title' => 'Amenities edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/amenities-edit.html'),
        'name' => REST_ADMIN_AMENITIES_EDIT
    ],
    'amenities-show' => [
        'title' => 'Amenities',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/amenities-show.html'),
        'name' => REST_ADMIN_AMENITIES_SHOW
    ],
    'amenities-list' => [
        'title' => 'Amenities list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/amenities-list.html'),
        'name' => REST_ADMIN_AMENITIES_LIST
    ],

    'cancellation-policy-create' => [
        'title' => 'Cancellation Policy create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/cancellation-policy-create.html'),
        'name' => REST_ADMIN_CANCELLATION_POLICY_CREATE
    ],
    'cancellation-policy-edit' => [
        'title' => 'Cancellation Policy edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/cancellation-policy-edit.html'),
        'name' => REST_ADMIN_CANCELLATION_POLICY_EDIT
    ],
    'cancellation-policy-show' => [
        'title' => 'Cancellation Policy',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/cancellation-policy-show.html'),
        'name' => REST_ADMIN_CANCELLATION_POLICY_SHOW
    ],
    'cancellation-policy-list' => [
        'title' => 'Cancellation Policy list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/cancellation-policy-list.html'),
        'name' => REST_ADMIN_CANCELLATION_POLICY_LIST
    ],
    'city-create' => [
        'title' => 'City create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/city-create.html'),
        'name' => REST_ADMIN_CITY_CREATE
    ],
    'city-edit' => [
        'title' => 'City edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/city-edit.html'),
        'name' => REST_ADMIN_CITY_EDIT
    ],
    'city-show' => [
        'title' => 'City',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/city-show.html'),
        'name' => REST_ADMIN_CITY_SHOW
    ],
    'city-list' => [
        'title' => 'City list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/city-list.html'),
        'name' => REST_ADMIN_CITY_LIST
    ],

    'country-create' => [
        'title' => 'Country create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/country-create.html'),
        'name' => REST_ADMIN_COUNTRY_CREATE
    ],
    'country-edit' => [
        'title' => 'Country edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/country-edit.html'),
        'name' => REST_ADMIN_COUNTRY_EDIT
    ],
    'country-show' => [
        'title' => 'Country',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/country-show.html'),
        'name' => REST_ADMIN_COUNTRY_SHOW
    ],
    'country-list' => [
        'title' => 'Country list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/country-list.html'),
        'name' => REST_ADMIN_COUNTRY_LIST
    ],
    'language-create' => [
        'title' => 'Language create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/language-create.html'),
        'name' => REST_ADMIN_LANGUAGE_CREATE
    ],
    'language-edit' => [
        'title' => 'Language edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/language-edit.html'),
        'name' => REST_ADMIN_LANGUAGE_EDIT
    ],
    'language-show' => [
        'title' => 'Language',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/language-show.html'),
        'name' => REST_ADMIN_LANGUAGE_SHOW
    ],
    'language-list' => [
        'title' => 'Language list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/language-list.html'),
        'name' => REST_ADMIN_LANGUAGE_LIST
    ],
    'physical-level-create' => [
        'title' => 'Physical Level create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/physical-level-create.html'),
        'name' => REST_ADMIN_PHYSICAL_LEVEL_CREATE
    ],
    'physical-level-edit' => [
        'title' => 'Physical Level edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/physical-level-edit.html'),
        'name' => REST_ADMIN_PHYSICAL_LEVEL_EDIT
    ],
    'physical-level-show' => [
        'title' => 'Physical Level',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/physical-level-show.html'),
        'name' => REST_ADMIN_PHYSICAL_LEVEL_SHOW
    ],
    'physical-level-list' => [
        'title' => 'Physical Level list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/physical-level-list.html'),
        'name' => REST_ADMIN_PHYSICAL_LEVEL_LIST
    ],
    'product-category-create' => [
        'title' => 'Product Category create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/product-category-create.html'),
        'name' => REST_ADMIN_PRODUCT_CATEGORY_CREATE
    ],
    'product-category-edit' => [
        'title' => 'Product Category edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/product-category-edit.html'),
        'name' => REST_ADMIN_PRODUCT_CATEGORY_EDIT
    ],
    'product-category-show' => [
        'title' => 'Product Category',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/product-category-show.html'),
        'name' => REST_ADMIN_PRODUCT_CATEGORY_SHOW
    ],
    'product-category-list' => [
        'title' => 'Product Category list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/constants/product-category-list.html'),
        'name' => REST_ADMIN_PRODUCT_CATEGORY_LIST
    ],


    'settings-create' => [
        'title' => 'Settings create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/settings-create.html'),
        'name' => REST_ADMIN_SETTINGS_CREATE
    ],
    'settings-edit' => [
        'title' => 'Settings edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/settings-edit.html'),
        'name' => REST_ADMIN_SETTINGS_EDIT
    ],
    'settings-show' => [
        'title' => 'Settings',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/settings-show.html'),
        'name' => REST_ADMIN_SETTINGS_SHOW
    ],
    'settings-list' => [
        'title' => 'Settings list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/settings-list.html'),
        'name' => REST_ADMIN_SETTINGS_LIST
    ],

    'sales-to-countries-create' => [
        'title' => 'Sales To Countries  create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/sales-to-countries-create.html'),
        'name' => REST_ADMIN_SALES_TO_COUNTRIES_CREATE
    ],
    'sales-to-countries-edit' => [
        'title' => 'Sales To Countries edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/sales-to-countries-edit.html'),
        'name' => REST_ADMIN_SALES_TO_COUNTRIES_EDIT
    ],
    'sales-to-countries-show' => [
        'title' => 'Sales to Countries',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/sales-to-countries-show.html'),
        'name' => REST_ADMIN_SALES_TO_COUNTRIES_SHOW
    ],
    'sales-to-countries-list' => [
        'title' => 'Sales to Countries list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/settings/sales-to-countries-list.html'),
        'name' => REST_ADMIN_SALES_TO_COUNTRIES_LIST
    ],

    'autoresponder-create' => [
        'title' => 'Autoresponder create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/autoresponder-create.html'),
        'name' => REST_ADMIN_AUTORESPONDER_CREATE
    ],
    'autoresponder-edit' => [
        'title' => 'Autoresponder edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/autoresponder-edit.html'),
        'name' => REST_ADMIN_AUTORESPONDER_EDIT
    ],
    'autoresponder-show' => [
        'title' => 'Autoresponder',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/autoresponder-show.html'),
        'name' => REST_ADMIN_AUTORESPONDER_SHOW
    ],
    'autoresponder-list' => [
        'title' => 'Autoresponder list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/autoresponder-list.html'),
        'name' => REST_ADMIN_AUTORESPONDER_LIST
    ],
    'document-create' => [
        'title' => 'Document create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/document-create.html'),
        'name' => REST_ADMIN_DOCUMENT_CREATE
    ],
    'document-edit' => [
        'title' => 'Document edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/document-edit.html'),
        'name' => REST_ADMIN_DOCUMENT_EDIT
    ],
    'document-show' => [
        'title' => 'Document',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/document-show.html'),
        'name' => REST_ADMIN_DOCUMENT_SHOW
    ],
    'document-list' => [
        'title' => 'Document list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/document-list.html'),
        'name' => REST_ADMIN_DOCUMENT_LIST
    ],
    'mail-create' => [
        'title' => 'Mail create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/mail-create.html'),
        'name' => REST_ADMIN_MAIL_CREATE
    ],
    'mail-edit' => [
        'title' => 'Mail edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/mail-edit.html'),
        'name' => REST_ADMIN_MAIL_EDIT
    ],
    'mail-show' => [
        'title' => 'Mail',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/mail-show.html'),
        'name' => REST_ADMIN_MAIL_SHOW
    ],
    'mail-list' => [
        'title' => 'Mail list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/mail-list.html'),
        'name' => REST_ADMIN_MAIL_LIST
    ],
    'template-create' => [
        'title' => 'Template create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/template-create.html'),
        'name' => REST_ADMIN_TEMPLATE_CREATE
    ],
    'template-edit' => [
        'title' => 'Template edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/template-edit.html'),
        'name' => REST_ADMIN_TEMPLATE_EDIT
    ],
    'template-show' => [
        'title' => 'Template',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/template-show.html'),
        'name' => REST_ADMIN_TEMPLATE_SHOW
    ],
    'template-list' => [
        'title' => 'Template list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/template-list.html'),
        'name' => REST_ADMIN_TEMPLATE_LIST
    ],
    'voucher-create' => [
        'title' => 'Voucher create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/voucher-create.html'),
        'name' => REST_ADMIN_VOUCHER_CREATE
    ],
    'voucher-edit' => [
        'title' => 'Voucher edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/voucher-edit.html'),
        'name' => REST_ADMIN_VOUCHER_EDIT
    ],
    'voucher-show' => [
        'title' => 'Voucher',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/voucher-show.html'),
        'name' => REST_ADMIN_VOUCHER_SHOW
    ],
    'voucher-list' => [
        'title' => 'Voucher list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/templates/voucher-list.html'),
        'name' => REST_ADMIN_VOUCHER_LIST
    ],
    'confirm-user' => [
        'title' => 'Confirm User',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/confirm-user.html'),
        'name' => REST_ADMIN_CONFIRM_USER
    ],
    'confirm-provider' => [
        'title' => 'Confirm Provider',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/confirm-provider.html'),
        'name' => REST_ADMIN_CONFIRM_PROVIDER
    ],
    'subscriptions-list' => [
        'title' => 'Subscriptions list',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/subscriptions/subscriptions-list.html'),
        'name' => REST_ADMIN_SUBSCRIPTIONS_LIST
    ],
    'subscriptions-create' => [
        'title' => 'Subscription create',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/subscriptions/subscriptions-create.html'),
        'name' => REST_ADMIN_SUBSCRIPTIONS_CREATE
    ],
    'subscriptions-show' => [
        'title' => 'Subscription',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/subscriptions/subscriptions-show.html'),
        'name' => REST_ADMIN_SUBSCRIPTIONS_SHOW
    ],
    'subscriptions-edit' => [
        'title' => 'Subscription edit',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/subscriptions/subscriptions-edit.html'),
        'name' => REST_ADMIN_SUBSCRIPTIONS_EDIT
    ],
    'subscriber-add' => [
        'title' => 'Subscriber add',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/subscriptions/subscriber-add.html'),
        'name' => REST_ADMIN_SUBSCRIBER_ADD
    ],
    'notification-send' => [
        'title' => 'Send notification',
        'content' => file_get_contents(JD_REST_PLUGIN_DIR . 'template/admin/subscriptions/notification-send.html'),
        'name' => REST_ADMIN_NOTIFICATION_SEND
    ]
];

$GLOBALS['jd_rest_init'] = $jd_rest_init;

require_once JD_REST_PLUGIN_DIR . 'class/CreateNewPage.php';

require_once JD_REST_PLUGIN_DIR . 'php-http-class/EasyRequest.php';

function add_jourday_rest_vars_js() {
    /******************************* API HOST ******************************/

    $rest_api_host = '<script>var rest_api_host = "'
        . REST_API_HOST . '";</script>';
    add_action('wp_head', function () use ($rest_api_host) { echo $rest_api_host;});

    /***************************** PAYPAL ***************************************/

    $rest_paypal = '<script>var rest_paypal = "'
        . REST_PAYPAL . '";</script>';
    add_action('wp_head', function () use ($rest_paypal) { echo $rest_paypal;});

    /*******************************   REPORT ******************************/
    $rest_report_resellers = '<script>var jd_resellers_url = "'
        . get_site_url(null, REST_REPORT_RESELLERS) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_resellers) { echo $rest_report_resellers;});
    $rest_report_resellers_active = '<script>var jd_resellers_active_url = "'
        . get_site_url(null, REST_REPORT_RESELLERS_ACTIVE) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_resellers_active) { echo $rest_report_resellers_active;});
    $rest_report_affiliates = '<script>var jd_affiliates_url = "'
        . get_site_url(null, REST_REPORT_AFFILIATES) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_affiliates) { echo $rest_report_affiliates;});
    $rest_report_affiliates_active = '<script>var jd_affiliates_active_url = "'
        . get_site_url(null, REST_REPORT_AFFILIATES_ACTIVE) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_affiliates_active) { echo $rest_report_affiliates_active;});
    $rest_report_customers = '<script>var jd_customers_url = "'
        . get_site_url(null, REST_REPORT_CUSTOMERS) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_customers) { echo $rest_report_customers;});
    $rest_report_beneficiaries = '<script>var jd_beneficiaries_url = "'
        . get_site_url(null, REST_REPORT_BENEFICIARIES) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_beneficiaries) { echo $rest_report_beneficiaries;});
    $rest_report_providers = '<script>var jd_providers_url = "'
        . get_site_url(null, REST_REPORT_PROVIDERS) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_providers) { echo $rest_report_providers;});
    $rest_report_jourday_provider = '<script>var jd_jourday_provider_url = "'
        . get_site_url(null, REST_REPORT_JOURDAY_PROVIDER) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_jourday_provider) { echo $rest_report_jourday_provider;});
    $rest_report_live_products = '<script>var jd_live_products_url = "'
        . get_site_url(null, REST_REPORT_LIVE_PRODUCTS) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_live_products) { echo $rest_report_live_products;});
    $rest_report_upcoming_products = '<script>var jd_upcoming_products_url = "'
        . get_site_url(null, REST_REPORT_UPCOMING_PRODUCTS) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_upcoming_products) { echo $rest_report_upcoming_products;});
    $rest_report_payable = '<script>var jd_payable_url = "'
        . get_site_url(null, REST_REPORT_PAYABLE) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_payable) { echo $rest_report_payable;});
    $rest_report_paid = '<script>var jd_paid_url = "'
        . get_site_url(null, REST_REPORT_PAID) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_paid) { echo $rest_report_paid;});
    $rest_report_receivables = '<script>var jd_receivables_url = "'
        . get_site_url(null, REST_REPORT_RECEIVABLES) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_receivables) { echo $rest_report_receivables;});
    $rest_report_totals = '<script>var jd_totals_url = "'
        . get_site_url(null, REST_REPORT_TOTALS) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_totals) { echo $rest_report_totals;});
    $rest_report_comment = '<script>var jd_comment_url = "'
        . get_site_url(null, REST_REPORT_COMMENT) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_comment) { echo $rest_report_comment;});
    $rest_report_review = '<script>var jd_review_url = "'
        . get_site_url(null, REST_REPORT_REVIEW) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_review) { echo $rest_report_review;});


    $rest_owner_product = '<script>var jd_owner_product_url = "'
        . REST_URL_OWNER_PRODUCT . '/";</script>';
    add_action('wp_head', function () use ($rest_owner_product) { echo $rest_owner_product;});
    $rest_owner_booking = '<script>var jd_owner_booking_url = "'
        . REST_URL_OWNER_BOOKING . '/";</script>';
    add_action('wp_head', function () use ($rest_owner_booking) { echo $rest_owner_booking;});
    $rest_owner_message = '<script>var jd_owner_message_url = "'
        . REST_URL_OWNER_MESSAGE . '/";</script>';
    add_action('wp_head', function () use ($rest_owner_message) { echo $rest_owner_message;});


    $rest_report_resellers = '<script>var jd_resellers_list_url = "'
        . get_site_url(null, REST_REPORT_RESELLERS_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_resellers) { echo $rest_report_resellers;});
    $rest_report_resellers_active = '<script>var jd_resellers_active_list_url = "'
        . get_site_url(null, REST_REPORT_RESELLERS_ACTIVE_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_resellers_active) { echo $rest_report_resellers_active;});
    $rest_report_affiliates = '<script>var jd_affiliates_list_url = "'
        . get_site_url(null, REST_REPORT_AFFILIATES_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_affiliates) { echo $rest_report_affiliates;});
    $rest_report_affiliates_active = '<script>var jd_affiliates_active_list_url = "'
        . get_site_url(null, REST_REPORT_AFFILIATES_ACTIVE_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_affiliates_active) { echo $rest_report_affiliates_active;});
    $rest_report_customers = '<script>var jd_customers_list_url = "'
        . get_site_url(null, REST_REPORT_CUSTOMERS_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_customers) { echo $rest_report_customers;});
    $rest_report_beneficiaries = '<script>var jd_beneficiaries_list_url = "'
        . get_site_url(null, REST_REPORT_BENEFICIARIES_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_beneficiaries) { echo $rest_report_beneficiaries;});
    $rest_report_providers = '<script>var jd_providers_list_url = "'
        . get_site_url(null, REST_REPORT_PROVIDERS_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_providers) { echo $rest_report_providers;});
    $rest_report_jourday_provider = '<script>var jd_jourday_provider_list_url = "'
        . get_site_url(null, REST_REPORT_JOURDAY_PROVIDER_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_jourday_provider) { echo $rest_report_jourday_provider;});
    $rest_report_live_products = '<script>var jd_live_products_list_url = "'
        . get_site_url(null, REST_REPORT_LIVE_PRODUCTS_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_live_products) { echo $rest_report_live_products;});
    $rest_report_upcoming_products = '<script>var jd_upcoming_products_list_url = "'
        . get_site_url(null, REST_REPORT_UPCOMING_PRODUCTS_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_upcoming_products) { echo $rest_report_upcoming_products;});
    $rest_report_payable = '<script>var jd_payable_list_url = "'
        . get_site_url(null, REST_REPORT_PAYABLE_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_payable) { echo $rest_report_payable;});
    $rest_report_paid = '<script>var jd_paid_list_url = "'
        . get_site_url(null, REST_REPORT_PAID_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_paid) { echo $rest_report_paid;});
    $rest_report_receivables = '<script>var jd_receivables_list_url = "'
        . get_site_url(null, REST_REPORT_RECEIVABLES_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_receivables) { echo $rest_report_receivables;});
    $rest_report_totals = '<script>var jd_totals_list_url = "'
        . get_site_url(null, REST_REPORT_TOTALS_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_totals) { echo $rest_report_totals;});
    $rest_report_comment = '<script>var jd_comment_list_url = "'
        . get_site_url(null, REST_REPORT_COMMENT_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_comment) { echo $rest_report_comment;});
    $rest_report_review = '<script>var jd_review_list_url = "'
        . get_site_url(null, REST_REPORT_REVIEW_LIST) . '/";</script>';
    add_action('wp_head', function () use ($rest_report_review) { echo $rest_report_review;});

    /********************************  ADMIN *******************************/
    $rest_admin_activity_category_create = '<script>var rest_admin_activity_category_create = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_CATEGORY_CREATE) . '/";</script>';
    $rest_admin_activity_category_edit = '<script>var rest_admin_activity_category_edit = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_CATEGORY_EDIT) . '/";</script>';
    $rest_admin_activity_category_show = '<script>var rest_admin_activity_category_show = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_CATEGORY_SHOW) . '/";</script>';
    $rest_admin_activity_category_list = '<script>var rest_admin_activity_category_list = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_CATEGORY_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_activity_category_create) { echo $rest_admin_activity_category_create;});
    add_action('wp_head', function () use ($rest_admin_activity_category_edit) { echo $rest_admin_activity_category_edit;});
    add_action('wp_head', function () use ($rest_admin_activity_category_show) { echo $rest_admin_activity_category_show;});
    add_action('wp_head', function () use ($rest_admin_activity_category_list) { echo $rest_admin_activity_category_list;});

    $rest_admin_activity_type_create = '<script>var rest_admin_activity_type_create = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_TYPE_CREATE) . '/";</script>';
    $rest_admin_activity_type_edit = '<script>var rest_admin_activity_type_edit = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_TYPE_EDIT) . '/";</script>';
    $rest_admin_activity_type_show = '<script>var rest_admin_activity_type_show = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_TYPE_SHOW) . '/";</script>';
    $rest_admin_activity_type_list = '<script>var rest_admin_activity_type_list = "'
        . get_site_url(null, REST_ADMIN_ACTIVITY_TYPE_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_activity_type_create) { echo $rest_admin_activity_type_create;});
    add_action('wp_head', function () use ($rest_admin_activity_type_edit) { echo $rest_admin_activity_type_edit;});
    add_action('wp_head', function () use ($rest_admin_activity_type_show) { echo $rest_admin_activity_type_show;});
    add_action('wp_head', function () use ($rest_admin_activity_type_list) { echo $rest_admin_activity_type_list;});

    $rest_admin_amenities_create = '<script>var rest_admin_amenities_create = "'
        . get_site_url(null, REST_ADMIN_AMENITIES_CREATE) . '/";</script>';
    $rest_admin_amenities_edit = '<script>var rest_admin_amenities_edit = "'
        . get_site_url(null, REST_ADMIN_AMENITIES_EDIT) . '/";</script>';
    $rest_admin_amenities_show = '<script>var rest_admin_amenities_show = "'
        . get_site_url(null, REST_ADMIN_AMENITIES_SHOW) . '/";</script>';
    $rest_admin_amenities_list = '<script>var rest_admin_amenities_list = "'
        . get_site_url(null, REST_ADMIN_AMENITIES_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_amenities_create) { echo $rest_admin_amenities_create;});
    add_action('wp_head', function () use ($rest_admin_amenities_edit) { echo $rest_admin_amenities_edit;});
    add_action('wp_head', function () use ($rest_admin_amenities_show) { echo $rest_admin_amenities_show;});
    add_action('wp_head', function () use ($rest_admin_amenities_list) { echo $rest_admin_amenities_list;});

    $rest_admin_cancellation_policy_create = '<script>var rest_admin_cancellation_policy_create = "'
        . get_site_url(null, REST_ADMIN_CANCELLATION_POLICY_CREATE) . '/";</script>';
    $rest_admin_cancellation_policy_edit = '<script>var rest_admin_cancellation_policy_edit = "'
        . get_site_url(null, REST_ADMIN_CANCELLATION_POLICY_EDIT) . '/";</script>';
    $rest_admin_cancellation_policy_show = '<script>var rest_admin_cancellation_policy_show = "'
        . get_site_url(null, REST_ADMIN_CANCELLATION_POLICY_SHOW) . '/";</script>';
    $rest_admin_cancellation_policy_list = '<script>var rest_admin_cancellation_policy_list = "'
        . get_site_url(null, REST_ADMIN_CANCELLATION_POLICY_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_cancellation_policy_create) { echo $rest_admin_cancellation_policy_create;});
    add_action('wp_head', function () use ($rest_admin_cancellation_policy_edit) { echo $rest_admin_cancellation_policy_edit;});
    add_action('wp_head', function () use ($rest_admin_cancellation_policy_show) { echo $rest_admin_cancellation_policy_show;});
    add_action('wp_head', function () use ($rest_admin_cancellation_policy_list) { echo $rest_admin_cancellation_policy_list;});

    $rest_admin_city_create = '<script>var rest_admin_city_create = "'
        . get_site_url(null, REST_ADMIN_CITY_CREATE) . '/";</script>';
    $rest_admin_city_edit = '<script>var rest_admin_city_edit = "'
        . get_site_url(null, REST_ADMIN_CITY_EDIT) . '/";</script>';
    $rest_admin_city_show = '<script>var rest_admin_city_show = "'
        . get_site_url(null, REST_ADMIN_CITY_SHOW) . '/";</script>';
    $rest_admin_city_list = '<script>var rest_admin_city_list = "'
        . get_site_url(null, REST_ADMIN_CITY_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_city_create) { echo $rest_admin_city_create;});
    add_action('wp_head', function () use ($rest_admin_city_edit) { echo $rest_admin_city_edit;});
    add_action('wp_head', function () use ($rest_admin_city_show) { echo $rest_admin_city_show;});
    add_action('wp_head', function () use ($rest_admin_city_list) { echo $rest_admin_city_list;});

    $rest_admin_country_create = '<script>var rest_admin_country_create = "'
        . get_site_url(null, REST_ADMIN_COUNTRY_CREATE) . '/";</script>';
    $rest_admin_country_edit = '<script>var rest_admin_country_edit = "'
        . get_site_url(null, REST_ADMIN_COUNTRY_EDIT) . '/";</script>';
    $rest_admin_country_show = '<script>var rest_admin_country_show = "'
        . get_site_url(null, REST_ADMIN_COUNTRY_SHOW) . '/";</script>';
    $rest_admin_country_list = '<script>var rest_admin_country_list = "'
        . get_site_url(null, REST_ADMIN_COUNTRY_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_country_create) { echo $rest_admin_country_create;});
    add_action('wp_head', function () use ($rest_admin_country_edit) { echo $rest_admin_country_edit;});
    add_action('wp_head', function () use ($rest_admin_country_show) { echo $rest_admin_country_show;});
    add_action('wp_head', function () use ($rest_admin_country_list) { echo $rest_admin_country_list;});

    $rest_admin_language_create = '<script>var rest_admin_language_create = "'
        . get_site_url(null, REST_ADMIN_LANGUAGE_CREATE) . '/";</script>';
    $rest_admin_language_edit = '<script>var rest_admin_language_edit = "'
        . get_site_url(null, REST_ADMIN_LANGUAGE_EDIT) . '/";</script>';
    $rest_admin_language_show = '<script>var rest_admin_language_show = "'
        . get_site_url(null, REST_ADMIN_LANGUAGE_SHOW) . '/";</script>';
    $rest_admin_language_list = '<script>var rest_admin_language_list = "'
        . get_site_url(null, REST_ADMIN_LANGUAGE_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_language_create) { echo $rest_admin_language_create;});
    add_action('wp_head', function () use ($rest_admin_language_edit) { echo $rest_admin_language_edit;});
    add_action('wp_head', function () use ($rest_admin_language_show) { echo $rest_admin_language_show;});
    add_action('wp_head', function () use ($rest_admin_language_list) { echo $rest_admin_language_list;});

    $rest_admin_physical_level_create = '<script>var rest_admin_physical_level_create = "'
        . get_site_url(null, REST_ADMIN_PHYSICAL_LEVEL_CREATE) . '/";</script>';
    $rest_admin_physical_level_edit = '<script>var rest_admin_physical_level_edit = "'
        . get_site_url(null, REST_ADMIN_PHYSICAL_LEVEL_EDIT) . '/";</script>';
    $rest_admin_physical_level_show = '<script>var rest_admin_physical_level_show = "'
        . get_site_url(null, REST_ADMIN_PHYSICAL_LEVEL_SHOW) . '/";</script>';
    $rest_admin_physical_level_list = '<script>var rest_admin_physical_level_list = "'
        . get_site_url(null, REST_ADMIN_PHYSICAL_LEVEL_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_physical_level_create) { echo $rest_admin_physical_level_create;});
    add_action('wp_head', function () use ($rest_admin_physical_level_edit) { echo $rest_admin_physical_level_edit;});
    add_action('wp_head', function () use ($rest_admin_physical_level_show) { echo $rest_admin_physical_level_show;});
    add_action('wp_head', function () use ($rest_admin_physical_level_list) { echo $rest_admin_physical_level_list;});

    $rest_admin_product_category_create = '<script>var rest_admin_product_category_create = "'
        . get_site_url(null, REST_ADMIN_PRODUCT_CATEGORY_CREATE) . '/";</script>';
    $rest_admin_product_category_edit = '<script>var rest_admin_product_category_edit = "'
        . get_site_url(null, REST_ADMIN_PRODUCT_CATEGORY_EDIT) . '/";</script>';
    $rest_admin_product_category_show = '<script>var rest_admin_product_category_show = "'
        . get_site_url(null, REST_ADMIN_PRODUCT_CATEGORY_SHOW) . '/";</script>';
    $rest_admin_product_category_list = '<script>var rest_admin_product_category_list = "'
        . get_site_url(null, REST_ADMIN_PRODUCT_CATEGORY_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_product_category_create) { echo $rest_admin_product_category_create;});
    add_action('wp_head', function () use ($rest_admin_product_category_edit) { echo $rest_admin_product_category_edit;});
    add_action('wp_head', function () use ($rest_admin_product_category_show) { echo $rest_admin_product_category_show;});
    add_action('wp_head', function () use ($rest_admin_product_category_list) { echo $rest_admin_product_category_list;});

    $rest_admin_settings_create = '<script>var rest_admin_settings_create = "'
        . get_site_url(null, REST_ADMIN_SETTINGS_CREATE) . '/";</script>';
    $rest_admin_settings_edit = '<script>var rest_admin_settings_edit = "'
        . get_site_url(null, REST_ADMIN_SETTINGS_EDIT) . '/";</script>';
    $rest_admin_settings_show = '<script>var rest_admin_settings_show = "'
        . get_site_url(null, REST_ADMIN_SETTINGS_SHOW) . '/";</script>';
    $rest_admin_settings_list = '<script>var rest_admin_settings_list = "'
        . get_site_url(null, REST_ADMIN_SETTINGS_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_settings_create) { echo $rest_admin_settings_create;});
    add_action('wp_head', function () use ($rest_admin_settings_edit) { echo $rest_admin_settings_edit;});
    add_action('wp_head', function () use ($rest_admin_settings_show) { echo $rest_admin_settings_show;});
    add_action('wp_head', function () use ($rest_admin_settings_list) { echo $rest_admin_settings_list;});

    $rest_admin_sales_to_countries_create = '<script>var rest_admin_sales_to_countries_create = "'
        . get_site_url(null, REST_ADMIN_SALES_TO_COUNTRIES_CREATE) . '/";</script>';
    $rest_admin_sales_to_countries_edit = '<script>var rest_admin_sales_to_countries_edit = "'
        . get_site_url(null, REST_ADMIN_SALES_TO_COUNTRIES_EDIT) . '/";</script>';
    $rest_admin_sales_to_countries_show = '<script>var rest_admin_sales_to_countries_show = "'
        . get_site_url(null, REST_ADMIN_SALES_TO_COUNTRIES_SHOW) . '/";</script>';
    $rest_admin_sales_to_countries_list = '<script>var rest_admin_sales_to_countries_list = "'
        . get_site_url(null, REST_ADMIN_SALES_TO_COUNTRIES_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_sales_to_countries_create) { echo $rest_admin_sales_to_countries_create;});
    add_action('wp_head', function () use ($rest_admin_sales_to_countries_edit) { echo $rest_admin_sales_to_countries_edit;});
    add_action('wp_head', function () use ($rest_admin_sales_to_countries_show) { echo $rest_admin_sales_to_countries_show;});
    add_action('wp_head', function () use ($rest_admin_sales_to_countries_list) { echo $rest_admin_sales_to_countries_list;});

    $rest_admin_autoresponder_create = '<script>var rest_admin_autoresponder_create = "'
        . get_site_url(null, REST_ADMIN_AUTORESPONDER_CREATE) . '/";</script>';
    $rest_admin_autoresponder_edit = '<script>var rest_admin_autoresponder_edit = "'
        . get_site_url(null, REST_ADMIN_AUTORESPONDER_EDIT) . '/";</script>';
    $rest_admin_autoresponder_show = '<script>var rest_admin_autoresponder_show = "'
        . get_site_url(null, REST_ADMIN_AUTORESPONDER_SHOW) . '/";</script>';
    $rest_admin_autoresponder_list = '<script>var rest_admin_autoresponder_list = "'
        . get_site_url(null, REST_ADMIN_AUTORESPONDER_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_autoresponder_create) { echo $rest_admin_autoresponder_create;});
    add_action('wp_head', function () use ($rest_admin_autoresponder_edit) { echo $rest_admin_autoresponder_edit;});
    add_action('wp_head', function () use ($rest_admin_autoresponder_show) { echo $rest_admin_autoresponder_show;});
    add_action('wp_head', function () use ($rest_admin_autoresponder_list) { echo $rest_admin_autoresponder_list;});

    $rest_admin_document_create = '<script>var rest_admin_document_create = "'
        . get_site_url(null, REST_ADMIN_DOCUMENT_CREATE) . '/";</script>';
    $rest_admin_document_edit = '<script>var rest_admin_document_edit = "'
        . get_site_url(null, REST_ADMIN_DOCUMENT_EDIT) . '/";</script>';
    $rest_admin_document_show = '<script>var rest_admin_document_show = "'
        . get_site_url(null, REST_ADMIN_DOCUMENT_SHOW) . '/";</script>';
    $rest_admin_document_list = '<script>var rest_admin_document_list = "'
        . get_site_url(null, REST_ADMIN_DOCUMENT_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_document_create) { echo $rest_admin_document_create;});
    add_action('wp_head', function () use ($rest_admin_document_edit) { echo $rest_admin_document_edit;});
    add_action('wp_head', function () use ($rest_admin_document_show) { echo $rest_admin_document_show;});
    add_action('wp_head', function () use ($rest_admin_document_list) { echo $rest_admin_document_list;});

    $rest_admin_mail_create = '<script>var rest_admin_mail_create = "'
        . get_site_url(null, REST_ADMIN_MAIL_CREATE) . '/";</script>';
    $rest_admin_mail_edit = '<script>var rest_admin_mail_edit = "'
        . get_site_url(null, REST_ADMIN_MAIL_EDIT) . '/";</script>';
    $rest_admin_mail_show = '<script>var rest_admin_mail_show = "'
        . get_site_url(null, REST_ADMIN_MAIL_SHOW) . '/";</script>';
    $rest_admin_mail_list = '<script>var rest_admin_mail_list = "'
        . get_site_url(null, REST_ADMIN_MAIL_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_mail_create) { echo $rest_admin_mail_create;});
    add_action('wp_head', function () use ($rest_admin_mail_edit) { echo $rest_admin_mail_edit;});
    add_action('wp_head', function () use ($rest_admin_mail_show) { echo $rest_admin_mail_show;});
    add_action('wp_head', function () use ($rest_admin_mail_list) { echo $rest_admin_mail_list;});

    $rest_admin_template_create = '<script>var rest_admin_template_create = "'
        . get_site_url(null, REST_ADMIN_TEMPLATE_CREATE) . '/";</script>';
    $rest_admin_template_edit = '<script>var rest_admin_template_edit = "'
        . get_site_url(null, REST_ADMIN_TEMPLATE_EDIT) . '/";</script>';
    $rest_admin_template_show = '<script>var rest_admin_template_show = "'
        . get_site_url(null, REST_ADMIN_TEMPLATE_SHOW) . '/";</script>';
    $rest_admin_template_list = '<script>var rest_admin_template_list = "'
        . get_site_url(null, REST_ADMIN_TEMPLATE_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_template_create) { echo $rest_admin_template_create;});
    add_action('wp_head', function () use ($rest_admin_template_edit) { echo $rest_admin_template_edit;});
    add_action('wp_head', function () use ($rest_admin_template_show) { echo $rest_admin_template_show;});
    add_action('wp_head', function () use ($rest_admin_template_list) { echo $rest_admin_template_list;});

    $rest_admin_voucher_create = '<script>var rest_admin_voucher_create = "'
        . get_site_url(null, REST_ADMIN_VOUCHER_CREATE) . '/";</script>';
    $rest_admin_voucher_edit = '<script>var rest_admin_voucher_edit = "'
        . get_site_url(null, REST_ADMIN_VOUCHER_EDIT) . '/";</script>';
    $rest_admin_voucher_show = '<script>var rest_admin_voucher_show = "'
        . get_site_url(null, REST_ADMIN_VOUCHER_SHOW) . '/";</script>';
    $rest_admin_voucher_list = '<script>var rest_admin_voucher_list = "'
        . get_site_url(null, REST_ADMIN_VOUCHER_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_voucher_create) { echo $rest_admin_voucher_create;});
    add_action('wp_head', function () use ($rest_admin_voucher_edit) { echo $rest_admin_voucher_edit;});
    add_action('wp_head', function () use ($rest_admin_voucher_show) { echo $rest_admin_voucher_show;});
    add_action('wp_head', function () use ($rest_admin_voucher_list) { echo $rest_admin_voucher_list;});

    $rest_admin_confirm_user = '<script>var rest_admin_confirm_user = "'
        . get_site_url(null, REST_ADMIN_CONFIRM_USER) . '/";</script>';
    $rest_admin_confirm_provider = '<script>var rest_admin_confirm_provider = "'
        . get_site_url(null, REST_ADMIN_CONFIRM_PROVIDER) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_confirm_user) { echo $rest_admin_confirm_user;});
    add_action('wp_head', function () use ($rest_admin_confirm_provider) { echo $rest_admin_confirm_provider;});


    $rest_admin_subscriptions_list = '<script>var rest_admin_subscriptions_list = "'
        . get_site_url(null, REST_ADMIN_SUBSCRIPTIONS_LIST) . '/";</script>';
    $rest_admin_subscriptions_show = '<script>var rest_admin_subscriptions_show = "'
        . get_site_url(null, REST_ADMIN_SUBSCRIPTIONS_SHOW) . '/";</script>';
    $rest_admin_subscriptions_create = '<script>var rest_admin_subscriptions_create = "'
        . get_site_url(null, REST_ADMIN_SUBSCRIPTIONS_CREATE) . '/";</script>';
    $rest_admin_subscriptions_edit = '<script>var rest_admin_subscriptions_edit = "'
        . get_site_url(null, REST_ADMIN_SUBSCRIPTIONS_EDIT) . '/";</script>';
    $rest_admin_subscriber_add = '<script>var rest_admin_subscriber_add = "'
        . get_site_url(null, REST_ADMIN_SUBSCRIBER_ADD) . '/";</script>';
    $rest_admin_notification_send = '<script>var rest_admin_notification_send = "'
        . get_site_url(null, REST_ADMIN_NOTIFICATION_SEND) . '/";</script>';

    add_action('wp_head', function () use ($rest_admin_subscriptions_list) { echo $rest_admin_subscriptions_list;});
    add_action('wp_head', function () use ($rest_admin_subscriptions_show) { echo $rest_admin_subscriptions_show;});
    add_action('wp_head', function () use ($rest_admin_subscriptions_create) { echo $rest_admin_subscriptions_create;});
    add_action('wp_head', function () use ($rest_admin_subscriptions_edit) { echo $rest_admin_subscriptions_edit;});
    add_action('wp_head', function () use ($rest_admin_subscriber_add) { echo $rest_admin_subscriber_add;});
    add_action('wp_head', function () use ($rest_admin_notification_send) { echo $rest_admin_notification_send;});

    /******************************** PLUGIN **********************************/
    $rest_discount_to_offer_create = '<script>var jd_discount_to_offer_create_url = "'
        . get_site_url(null, REST_DISCOUNT_TO_OFFER_CREATE) . '/";</script>';
    $rest_discount_to_offer_edit = '<script>var jd_discount_to_offer_edit_url = "'
        . get_site_url(null, REST_DISCOUNT_TO_OFFER_EDIT) . '/";</script>';
    $rest_discount_to_offer_show = '<script>var jd_discount_to_offer_show_url = "'
        . get_site_url(null, REST_DISCOUNT_TO_OFFER_SHOW) . '/";</script>';
    $rest_discount_to_offer_list = '<script>var jd_discount_to_offer_list_url = "'
        . get_site_url(null, REST_DISCOUNT_TO_OFFER_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_discount_to_offer_create) { echo $rest_discount_to_offer_create;});
    add_action('wp_head', function () use ($rest_discount_to_offer_edit) { echo $rest_discount_to_offer_edit;});
    add_action('wp_head', function () use ($rest_discount_to_offer_show) { echo $rest_discount_to_offer_show;});
    add_action('wp_head', function () use ($rest_discount_to_offer_list) { echo $rest_discount_to_offer_list;});

    $rest_product_to_amenities_add_create = '<script>var jd_product_to_amenities_add_create_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_ADD_CREATE) . '/";</script>';
    $rest_product_to_amenities_add_edit = '<script>var jd_product_to_amenities_add_edit_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_ADD_EDIT) . '/";</script>';
    $rest_product_to_amenities_add_show = '<script>var jd_product_to_amenities_add_show_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_ADD_SHOW) . '/";</script>';
    $rest_product_to_amenities_add_list = '<script>var jd_product_to_amenities_add_list_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_ADD_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_product_to_amenities_add_create) { echo $rest_product_to_amenities_add_create;});
    add_action('wp_head', function () use ($rest_product_to_amenities_add_edit) { echo $rest_product_to_amenities_add_edit;});
    add_action('wp_head', function () use ($rest_product_to_amenities_add_show) { echo $rest_product_to_amenities_add_show;});
    add_action('wp_head', function () use ($rest_product_to_amenities_add_list) { echo $rest_product_to_amenities_add_list;});


    $rest_product_to_amenities_remove_create = '<script>var jd_product_to_amenities_remove_create_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_REMOVE_CREATE) . '/";</script>';
    $rest_product_to_amenities_remove_edit = '<script>var jd_product_to_amenities_remove_edit_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_REMOVE_EDIT) . '/";</script>';
    $rest_product_to_amenities_remove_show = '<script>var jd_product_to_amenities_remove_show_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_REMOVE_SHOW) . '/";</script>';
    $rest_product_to_amenities_remove_list = '<script>var jd_product_to_amenities_remove_list_url = "'
        . get_site_url(null, REST_PRODUCT_TO_AMENITIES_REMOVE_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_product_to_amenities_remove_create) { echo $rest_product_to_amenities_remove_create;});
    add_action('wp_head', function () use ($rest_product_to_amenities_remove_edit) { echo $rest_product_to_amenities_remove_edit;});
    add_action('wp_head', function () use ($rest_product_to_amenities_remove_show) { echo $rest_product_to_amenities_remove_show;});
    add_action('wp_head', function () use ($rest_product_to_amenities_remove_list) { echo $rest_product_to_amenities_remove_list;});

    $rest_product_to_language_create = '<script>var jd_product_to_language_create_url = "'
        . get_site_url(null, REST_PRODUCT_TO_LANGUAGE_CREATE) . '/";</script>';
    $rest_product_to_language_edit = '<script>var jd_product_to_language_edit_url = "'
        . get_site_url(null, REST_PRODUCT_TO_LANGUAGE_EDIT) . '/";</script>';
    $rest_product_to_language_show = '<script>var jd_product_to_language_show_url = "'
        . get_site_url(null, REST_PRODUCT_TO_LANGUAGE_SHOW) . '/";</script>';
    $rest_product_to_language_list = '<script>var jd_product_to_language_list_url = "'
        . get_site_url(null, REST_PRODUCT_TO_LANGUAGE_LIST) . '/";</script>';

    add_action('wp_head', function () use ($rest_product_to_language_create) { echo $rest_product_to_language_create;});
    add_action('wp_head', function () use ($rest_product_to_language_edit) { echo $rest_product_to_language_edit;});
    add_action('wp_head', function () use ($rest_product_to_language_show) { echo $rest_product_to_language_show;});
    add_action('wp_head', function () use ($rest_product_to_language_list) { echo $rest_product_to_language_list;});


    $jd_rest_host = '<script>var jd_rest_host = "'.WP_REST_API_HOST.'";</script>';
    $jd_rest_admin_url = '<script>var jd_rest_admin_url = "'.REST_ADMIN_URL.'";</script>';
    $jd_rest_navbar_url = '<script>var jd_rest_navbar_url = "'.REST_NAVBAR_URL.'";</script>';
    $jd_rest_edit_user_key = '<script>var jd_edit_user_key = "' . WP_EDIT_USER . '";</script>';
    $jd_rest_edit_product_key = '<script>var jd_edit_product_key = "' . WP_EDIT_PRODUCT . '";</script>';
    $jd_rest_profile_key = '<script>var jd_profile_key = "' . WP_PROFILE . '";</script>';

    $jd_rest_user_edit_get_url = '<script>var jd_user_edit_get_url = "' . REST_URL_USER_EDIT_GET . '/";</script>';
    $jd_rest_user_show_get_url = '<script>var jd_user_show_get_url = "' . REST_URL_USER_SHOW_GET . '/";</script>';
    $jd_rest_payment_get_url = '<script>var jd_payment_get_url = "' . REST_URL_PAYMENT_GET . '/";</script>';
    $jd_rest_payment_show_url = '<script>var jd_payment_show_url = "' . REST_URL_PAYMENT_SHOW . '/";</script>';
    $jd_rest_message_create_url = '<script>var jd_message_create_url = "' . REST_URL_MESSAGE_CREATE . '/";</script>';
    $jd_rest_message_get_url = '<script>var jd_message_get_url = "' . REST_URL_MESSAGE_GET . '/";</script>';
    $jd_rest_message_show_url = '<script>var jd_message_show_url = "' . REST_URL_MESSAGE_SHOW . '/";</script>';

    $jd_rest_product_create_get_url = '<script>var jd_product_create_get_url = "' . REST_URL_PRODUCT_CREATE . '/";</script>';
    $jd_rest_product_edit_get_url = '<script>var jd_product_edit_get_url = "' . REST_URL_PRODUCT_EDIT . '/";</script>';
    $jd_rest_product_show_get_url = '<script>var jd_product_show_get_url = "' . REST_URL_PRODUCT_SHOW . '/";</script>';

    $jd_rest_comments_create_get_url = '<script>var jd_comments_create_get_url = "' . REST_URL_COMMENTS_CREATE . '/";</script>';
    $jd_rest_comments_edit_get_url = '<script>var jd_comments_edit_get_url = "' . REST_URL_COMMENTS_EDIT . '/";</script>';
    $jd_rest_comments_show_get_url = '<script>var jd_comments_show_get_url = "' . REST_URL_COMMENTS_SHOW . '/";</script>';

    $jd_rest_review_create_get_url = '<script>var jd_review_create_get_url = "' . REST_URL_REVIEW_CREATE . '/";</script>';
    $jd_rest_review_edit_get_url = '<script>var jd_review_edit_get_url = "' . REST_URL_REVIEW_EDIT . '/";</script>';
    $jd_rest_review_show_get_url = '<script>var jd_review_show_get_url = "' . REST_URL_REVIEW_SHOW . '/";</script>';

    $jd_rest_form_create_url = '<script>var jd_form_create_url = "' . REST_URL_FORM_CREATE . '/";</script>';
    $jd_rest_form_create_main_url = '<script>var jd_form_create_main_url = "' . REST_URL_FORM_CREATE_MAIN . '/";</script>';
    $jd_rest_form_create_with_image_url = '<script>var jd_form_create_with_image_url = "' . REST_URL_FORM_CREATE_WITH_IMAGE . '/";</script>';
    $jd_rest_form_create_related_url = '<script>var jd_form_create_related_url = "' . REST_URL_FORM_CREATE_RELATED . '/";</script>';
    $jd_rest_form_create_related_image_url = '<script>var jd_form_create_related_image_url = "' . REST_URL_FORM_CREATE_RELATED_IMAGE . '/";</script>';
    $jd_rest_form_delete_related_url = '<script>var jd_form_delete_related_url = "' . REST_URL_FORM_DELETE_RELATED . '/";</script>';
    $jd_rest_form_get_url = '<script>var jd_form_get_url = "' . REST_URL_FORM_GET . '/";</script>';
    $jd_rest_final_price_url = '<script>var jd_final_price_get_url = "' . REST_URL_FINAL_PRICE . '/";</script>';


    $jd_rest_login_get_url = '<script>var jd_login_get_url = "' . REST_URL_LOGIN_GET . '/";</script>';
    $jd_rest_login_post_url = '<script>var jd_login_post_url = "' . REST_URL_LOGIN_POST . '/";</script>';


    $jd_rest_user_list_url = '<script>var jd_user_list_url = "' .  get_site_url(null, REST_USER_LIST) . '/";</script>';
    $jd_rest_user_item_url = '<script>var jd_user_item_url = "' .  get_site_url(null, REST_USER) . '/";</script>';
    $jd_rest_user_edit_url = '<script>var jd_user_edit_url = "' .  get_site_url(null, REST_USER_EDIT) . '/";</script>';
    $jd_rest_user_create_url = '<script>var jd_user_create_url = "' .  get_site_url(null, REST_USER_CREATE) . '/";</script>';
    $jd_rest_user_search_url = '<script>var jd_user_search_url = "' .  get_site_url(null, REST_USER_SEARCH) . '/";</script>';

    $jd_rest_user_profile_url = '<script>var jd_profile_url = "' .  get_site_url(null, REST_USER_PROFILE) . '/";</script>';
    $jd_rest_profile_edit_url = '<script>var jd_profile_edit_url = "' .  get_site_url(null, REST_PROFILE_EDIT) . '/";</script>';
    $jd_rest_profile_create_url = '<script>var jd_profile_create_url = "' .  get_site_url(null, REST_PROFILE_CREATE) . '/";</script>';
    $jd_rest_profile_autoresponder_url = '<script>var jd_profile_autoresponder_url = "' .  get_site_url(null, REST_PROFILE_AUTORESPONDER) . '/";</script>';

    $jd_rest_message_list_url = '<script>var jd_message_list_url = "' .  get_site_url(null, REST_MESSAGE_LIST) . '/";</script>';
    $jd_rest_message_url = '<script>var jd_message_item_url = "' .  get_site_url(null, REST_MESSAGE) . '/";</script>';
    $jd_rest_message_search_url = '<script>var jd_message_search_url = "' .  get_site_url(null, REST_MESSAGE_SEARCH) . '/";</script>';

    $jd_rest_payment_list_url = '<script>var jd_payment_list_url = "' .  get_site_url(null, REST_PAYMENT_LIST) . '/";</script>';
    $jd_rest_payment_url = '<script>var jd_payment_item_url = "' .  get_site_url(null, REST_PAYMENT) . '/";</script>';
    $jd_rest_payment_search_url = '<script>var jd_payment_search_url = "' .  get_site_url(null, REST_PAYMENT_SEARCH) . '/";</script>';

    $jd_rest_product_list_url = '<script>var jd_product_list_url = "' .  get_site_url(null, REST_PRODUCT_LIST) . '/";</script>';
    $jd_rest_product_url = '<script>var jd_product_item_url = "' .  get_site_url(null, REST_PRODUCT) . '/";</script>';
    $jd_rest_product_search_url = '<script>var jd_product_search_url = "' .  get_site_url(null, REST_PRODUCT_SEARCH) . '/";</script>';
    $jd_rest_product_edit_url = '<script>var jd_product_edit_url = "' .  get_site_url(null, REST_PRODUCT_EDIT) . '/";</script>';
    $jd_rest_product_create_url = '<script>var jd_product_create_url = "' .  get_site_url(null, REST_PRODUCT_ADD) . '/";</script>';

    $jd_rest_booking_list_url = '<script>var jd_booking_list_url = "' .  get_site_url(null, REST_BOOKING_LIST) . '/";</script>';
    $jd_rest_booking_url = '<script>var jd_booking_item_url = "' .  get_site_url(null, REST_BOOKING) . '/";</script>';
    $jd_rest_booking_search_url = '<script>var jd_booking_search_url = "' .  get_site_url(null, REST_BOOKING_SEARCH) . '/";</script>';
    $jd_rest_booking_edit_url = '<script>var jd_booking_edit_url = "' .  get_site_url(null, REST_BOOKING_EDIT) . '/";</script>';
    $jd_rest_booking_create_url = '<script>var jd_booking_create_url = "' .  get_site_url(null, REST_BOOKING_ADD) . '/";</script>';
    $jd_rest_booking_create_get_url = '<script>var jd_booking_create_get_url = "' . REST_URL_BOOKING_CREATE . '/";</script>';
    $jd_rest_booking_edit_get_url = '<script>var jd_booking_edit_get_url = "' . REST_URL_BOOKING_EDIT . '/";</script>';
    $jd_rest_booking_show_get_url = '<script>var jd_booking_show_get_url = "' . REST_URL_BOOKING_SHOW . '/";</script>';

    $jd_rest_subscriptions_create_url = '<script>var jd_subscriptions_create_url = "' .  get_site_url(null, REST_URL_SUBSCRIPTIONS_CREATE) . '/";</script>';
    $jd_rest_subscriptions_edit_url = '<script>var jd_subscriptions_edit_url = "' .  get_site_url(null, REST_URL_SUBSCRIPTIONS_EDIT) . '/";</script>';
    $jd_rest_subscriptions_show_url = '<script>var jd_subscriptions_show_url = "' . REST_URL_SUBSCRIPTIONS_SHOW . '/";</script>';
    $jd_rest_subscriber_add_url = '<script>var jd_subscriber_add_url = "' . REST_URL_SUBSCRIBER_ADD . '/";</script>';
    $jd_rest_notification_send_url = '<script>var jd_notification_send_url = "' . REST_URL_NOTIFICATION_SEND . '/";</script>';

    $jd_rest_home_url = '<script>var jd_home_url = "' .  get_site_url(null, REST_HOME) . '/";</script>';
    $jd_rest_login_url = '<script>var jd_login_url = "' .  get_site_url(null, REST_LOGIN) . '/";</script>';
    $jd_rest_signup_url = '<script>var jd_signup_url = "' .  get_site_url(null, REST_SIGNUP) . '/";</script>';
    $jd_rest_messenger_url = '<script>var jd_messenger_url = "' .  get_site_url(null, REST_MESSENGER) . '/";</script>';

    add_action('wp_head', function () use ($jd_rest_home_url) { echo $jd_rest_home_url;});
    add_action('wp_head', function () use ($jd_rest_login_url) { echo $jd_rest_login_url;});
    add_action('wp_head', function () use ($jd_rest_signup_url) { echo $jd_rest_signup_url;});
    add_action('wp_head', function () use ($jd_rest_messenger_url) { echo $jd_rest_messenger_url;});

    add_action('wp_head', function () use ($jd_rest_subscriptions_create_url) { echo $jd_rest_subscriptions_create_url;});
    add_action('wp_head', function () use ($jd_rest_subscriptions_edit_url) { echo $jd_rest_subscriptions_edit_url;});
    add_action('wp_head', function () use ($jd_rest_subscriptions_show_url) { echo $jd_rest_subscriptions_show_url;});
    add_action('wp_head', function () use ($jd_rest_subscriber_add_url) { echo $jd_rest_subscriber_add_url;});
    add_action('wp_head', function () use ($jd_rest_notification_send_url) { echo $jd_rest_notification_send_url;});

    add_action('wp_head', function () use ($jd_rest_host) { echo $jd_rest_host;});
    add_action('wp_head', function () use ($jd_rest_admin_url) { echo $jd_rest_admin_url;});
    add_action('wp_head', function () use ($jd_rest_navbar_url) { echo $jd_rest_navbar_url;});
    add_action('wp_head', function () use ($jd_rest_edit_user_key) { echo $jd_rest_edit_user_key;});
    add_action('wp_head', function () use ($jd_rest_edit_product_key) { echo $jd_rest_edit_product_key;});
    add_action('wp_head', function () use ($jd_rest_profile_key) { echo $jd_rest_profile_key;});

    add_action('wp_head', function () use ($jd_rest_user_edit_get_url) { echo $jd_rest_user_edit_get_url;});
    add_action('wp_head', function () use ($jd_rest_user_show_get_url) { echo $jd_rest_user_show_get_url;});
    add_action('wp_head', function () use ($jd_rest_payment_get_url) { echo $jd_rest_payment_get_url;});
    add_action('wp_head', function () use ($jd_rest_payment_show_url) { echo $jd_rest_payment_show_url;});
    add_action('wp_head', function () use ($jd_rest_message_create_url) { echo $jd_rest_message_create_url;});
    add_action('wp_head', function () use ($jd_rest_message_get_url) { echo $jd_rest_message_get_url;});
    add_action('wp_head', function () use ($jd_rest_message_show_url) { echo $jd_rest_message_show_url;});

    add_action('wp_head', function () use ($jd_rest_product_create_get_url) { echo $jd_rest_product_create_get_url;});
    add_action('wp_head', function () use ($jd_rest_product_show_get_url) { echo $jd_rest_product_show_get_url;});
    add_action('wp_head', function () use ($jd_rest_product_edit_get_url) { echo $jd_rest_product_edit_get_url;});

    add_action('wp_head', function () use ($jd_rest_comments_create_get_url) { echo $jd_rest_comments_create_get_url;});
    add_action('wp_head', function () use ($jd_rest_comments_show_get_url) { echo $jd_rest_comments_show_get_url;});
    add_action('wp_head', function () use ($jd_rest_comments_edit_get_url) { echo $jd_rest_comments_edit_get_url;});

    add_action('wp_head', function () use ($jd_rest_review_create_get_url) { echo $jd_rest_review_create_get_url;});
    add_action('wp_head', function () use ($jd_rest_review_show_get_url) { echo $jd_rest_review_show_get_url;});
    add_action('wp_head', function () use ($jd_rest_review_edit_get_url) { echo $jd_rest_review_edit_get_url;});

    add_action('wp_head', function () use ($jd_rest_booking_create_get_url) { echo $jd_rest_booking_create_get_url;});
    add_action('wp_head', function () use ($jd_rest_booking_show_get_url) { echo $jd_rest_booking_show_get_url;});
    add_action('wp_head', function () use ($jd_rest_booking_edit_get_url) { echo $jd_rest_booking_edit_get_url;});

    add_action('wp_head', function () use ($jd_rest_form_create_url) { echo $jd_rest_form_create_url;});
    add_action('wp_head', function () use ($jd_rest_form_create_main_url) { echo $jd_rest_form_create_main_url;});
    add_action('wp_head', function () use ($jd_rest_form_create_with_image_url) { echo $jd_rest_form_create_with_image_url;});
    add_action('wp_head', function () use ($jd_rest_form_create_related_url) { echo $jd_rest_form_create_related_url;});
    add_action('wp_head', function () use ($jd_rest_form_create_related_image_url) { echo $jd_rest_form_create_related_image_url;});
    add_action('wp_head', function () use ($jd_rest_form_delete_related_url) { echo $jd_rest_form_delete_related_url;});
    add_action('wp_head', function () use ($jd_rest_form_get_url) { echo $jd_rest_form_get_url;});
    add_action('wp_head', function () use ($jd_rest_final_price_url) { echo $jd_rest_final_price_url;});

    add_action('wp_head', function () use ($jd_rest_login_get_url) { echo $jd_rest_login_get_url;});
    add_action('wp_head', function () use ($jd_rest_login_post_url) { echo $jd_rest_login_post_url;});

    add_action('wp_head', function () use ($jd_rest_user_list_url) { echo $jd_rest_user_list_url;});
    add_action('wp_head', function () use ($jd_rest_user_item_url) { echo $jd_rest_user_item_url;});
    add_action('wp_head', function () use ($jd_rest_user_edit_url) { echo $jd_rest_user_edit_url;});
    add_action('wp_head', function () use ($jd_rest_user_create_url) { echo $jd_rest_user_create_url;});
    add_action('wp_head', function () use ($jd_rest_user_search_url) { echo $jd_rest_user_search_url;});

    add_action('wp_head', function () use ($jd_rest_user_profile_url) { echo $jd_rest_user_profile_url;});
    add_action('wp_head', function () use ($jd_rest_profile_edit_url) { echo $jd_rest_profile_edit_url;});
    add_action('wp_head', function () use ($jd_rest_profile_create_url) { echo $jd_rest_profile_create_url;});
    add_action('wp_head', function () use ($jd_rest_profile_autoresponder_url) { echo $jd_rest_profile_autoresponder_url;});

    add_action('wp_head', function () use ($jd_rest_message_list_url) { echo $jd_rest_message_list_url;});
    add_action('wp_head', function () use ($jd_rest_message_url) { echo $jd_rest_message_url;});
    add_action('wp_head', function () use ($jd_rest_message_search_url) { echo $jd_rest_message_search_url;});


    add_action('wp_head', function () use ($jd_rest_payment_list_url) { echo $jd_rest_payment_list_url;});
    add_action('wp_head', function () use ($jd_rest_payment_url) { echo $jd_rest_payment_url;});
    add_action('wp_head', function () use ($jd_rest_payment_search_url) { echo $jd_rest_payment_search_url;});

    add_action('wp_head', function () use ($jd_rest_product_list_url) { echo $jd_rest_product_list_url;});
    add_action('wp_head', function () use ($jd_rest_product_edit_url) { echo $jd_rest_product_edit_url;});
    add_action('wp_head', function () use ($jd_rest_product_search_url) { echo $jd_rest_product_search_url;});
    add_action('wp_head', function () use ($jd_rest_product_url) { echo $jd_rest_product_url;});
    add_action('wp_head', function () use ($jd_rest_product_create_url) { echo $jd_rest_product_create_url;});

    add_action('wp_head', function () use ($jd_rest_booking_list_url) { echo $jd_rest_booking_list_url;});
    add_action('wp_head', function () use ($jd_rest_booking_edit_url) { echo $jd_rest_booking_edit_url;});
    add_action('wp_head', function () use ($jd_rest_booking_search_url) { echo $jd_rest_booking_search_url;});
    add_action('wp_head', function () use ($jd_rest_booking_url) { echo $jd_rest_booking_url;});
    add_action('wp_head', function () use ($jd_rest_booking_create_url) { echo $jd_rest_booking_create_url;});
}


if ( ! function_exists( 'add_jourday_angular' ) ) {
    function add_jourday_angular() {
        $url = 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js';
        wp_enqueue_script('jd_rest_angular_js', $url, array(), false, false);
    }
}

if ( ! function_exists( 'add_jourday_awesomplete' ) ) {
    function add_jourday_awesomplete() {
        $url = JD_REST_PLUGIN_URL.'js/components/awesomplete.js';
        wp_enqueue_script('jd_rest_awesomplete_js', $url, array(), false, false);
    }
}

if ( ! function_exists( 'add_jourday_underscore' ) ) {
    function add_jourday_underscore() {
        $url = 'http://underscorejs.org/underscore-min.js';
        wp_enqueue_script('jd_rest_underscore_js', $url, array(), false, false);
    }
}

if ( ! function_exists( 'add_jourday_data_tables_js' ) ) {
    function add_jourday_data_tables_js() {
        $url = JD_REST_PLUGIN_URL.'js/components/jquery.dataTables.min.js';
        wp_enqueue_script('jd_rest_data_tables_js', $url, array(), false, true);
    }
}

if ( ! function_exists( 'add_jourday_rest_data_tables_css' ) ) {
    function add_jourday_rest_data_tables_css() {
        $url = JD_REST_PLUGIN_URL.'css/components/jquery.dataTables.min.css';
        wp_enqueue_style('jd_rest_data_tables_css', $url, array());
    }
}

if ( ! function_exists( 'add_jourday_rest_data_tables_reset_css' ) ) {
    function add_jourday_rest_data_tables_reset_css() {
        $url = JD_REST_PLUGIN_URL.'css/components/jquery.dataTables.reset.css';
        wp_enqueue_style('jd_rest_data_tables_reset_css', $url, array());
    }
}

if ( ! function_exists( 'add_jourday_rest_awesomplete_css' ) ) {
    function add_jourday_rest_awesomplete_css() {
        $url = JD_REST_PLUGIN_URL.'css/components/awesomplete.css';
        wp_enqueue_style('jd_rest_data_awesomplete_css', $url, array());
    }
}

if ( ! function_exists( 'is_jd_rest_url' ) ) {
    function is_jd_rest_url($slug) {
        $url = $_SERVER['REQUEST_URI'];
        return false !== stripos($url, $slug);
    }
}

function add_jourday_rest_js() {
    $url = JD_REST_PLUGIN_URL.'js/jd-rest.js';
    wp_enqueue_script('jd_rest_js', $url, array(), false, true);
}

function add_jourday_rest_css() {
    $url = JD_REST_PLUGIN_URL.'css/jd-rest.css';
    wp_enqueue_style('jd_rest_css', $url, array());
}

/**
 * @param array $configs
 * @return array
 */
function get_jd_rest_create_classes(array $configs) {
    $classes = [];
    foreach ($configs as $key => $value) {
        $class = new CreateNewPage();
        $class->setPageContent($value['content']);
        $class->setPageTitle($value['title']);
        $class->setPageName($class->slugify($value['name']));
        $classes[] = $class;
        if (is_jd_rest_url($class->slugify($value['name'])) && $class->slugExists($class->slugify($value['name']))) {
            add_action( 'wp_enqueue_scripts', function () use ($key) {
                $js_url = JD_REST_PLUGIN_URL.'js/jd-rest-' . $key . '.js';
                wp_enqueue_script('jd_rest_' . $key . '_js', $js_url, array(), false, false);
            }, 100 );
            add_action( 'wp_head', function () use ($key) {
                $css_url = JD_REST_PLUGIN_URL.'css/jd-rest-' . $key . '.css';
                wp_enqueue_style('jd_rest_' . $key . '_css', $css_url, array());
            } );
        }
    }
    return $classes;
}



function get_jd_rest_init(array $configs) {
    foreach ($configs as $key => $value) {
        $class = new CreateNewPage();
        $class->setPageContent($value['content']);
        $class->setPageTitle($value['title']);
        $class->setPageName($class->slugify($value['name']));
        $classes[] = $class;
        if (is_jd_rest_url($class->slugify($value['name'])) && $class->slugExists($class->slugify($value['name']))) {
            add_action( 'wp_enqueue_scripts', function () use ($key) {
                $js_url = JD_REST_PLUGIN_URL.'js/jd-rest-' . $key . '.js';
                wp_enqueue_script('jd_rest_' . $key . '_js', $js_url, array(), false, false);
            }, 100 );
            add_action( 'wp_head', function () use ($key) {
                $css_url = JD_REST_PLUGIN_URL.'css/jd-rest-' . $key . '.css';
                wp_enqueue_style('jd_rest_' . $key . '_css', $css_url, array());
            } );
        }
    }
}




get_jd_rest_init($jd_rest_init);

if ( ! function_exists( 'jourday_rest_activate' ) ) {
    function jourday_rest_activate() {
        global $jd_rest_init;
        $classes = get_jd_rest_create_classes($jd_rest_init);
        foreach ($classes as $class) {
            $class->create();
        }
    }
}

if ( ! function_exists( 'jourday_rest_deactivate' ) ) {
    function jourday_rest_deactivate() {
        global $jd_rest_init;
        $classes = get_jd_rest_create_classes($jd_rest_init);
        foreach ($classes as $class) {
            $class->delete();
        }
    }
}

if ( ! function_exists( 'jourday_rest_uninstall' ) ) {
    function jourday_rest_uninstall() {
        global $jd_rest_init;
        $classes = get_jd_rest_create_classes($jd_rest_init);
        foreach ($classes as $class) {
            $class->delete();
        }
    }
}


/*************************  HOOKS ********************************/

register_activation_hook( __FILE__, 'jourday_rest_activate' );
register_deactivation_hook( __FILE__, 'jourday_rest_deactivate' );
register_uninstall_hook( __FILE__, 'jourday_rest_uninstall' );

add_action( 'wp_enqueue_scripts', 'add_jourday_rest_css' );
add_action( 'wp_enqueue_scripts', 'add_jourday_rest_data_tables_css' );
add_action( 'wp_enqueue_scripts', 'add_jourday_rest_data_tables_reset_css' );
add_action( 'wp_enqueue_scripts', 'add_jourday_rest_awesomplete_css' );
add_action( 'wp_enqueue_scripts', 'add_jourday_angular' );
//add_action( 'wp_enqueue_scripts', 'add_jourday_underscore' );
add_action( 'wp_enqueue_scripts', 'add_jourday_awesomplete' );
add_action( 'wp_enqueue_scripts', 'add_jourday_data_tables_js' );
add_action( 'wp_enqueue_scripts', 'add_jourday_rest_js' );
add_action( 'wp_enqueue_scripts', 'add_jourday_rest_vars_js' );



/********************** protected ***************************/

if ( ! function_exists( '_get_query_vars' ) ) {
    function _get_query_vars() {
        return $_GET;
    }
}

/*******************  AJAX FUNCTIONS  ***************************/

/**
 * @throws Exception
 */
function jourday_ajax_form_get() {
    $headers = null;
    $method = null;
    $url = null;
    $params = _get_query_vars();
    if (isset($params['method'])) {
        $method = $params['method'];
    }
    if (!\in_array(strtolower($method), ['get', 'post', 'delete'], true)) {
        ob_clean();
        echo json_encode(['error' =>' - Method is not correct']);
        wp_die();
    }
    if (isset($params['url'])) {
        $url = $params['url'];
    }
    if ($url) {
        $url = REST_API_HOST . $url;
    }
    if (filter_var($url, FILTER_VALIDATE_URL) === false) {
        ob_clean();
        echo json_encode(['error' =>' - Not valid URL']);
        wp_die();
    }

    if (isset($params['headers'])) {
        $headers  = $params['headers'];
        $headers = json_decode($headers);
        if (!$headers) {
            ob_clean();
            switch (json_last_error()) {
                case JSON_ERROR_NONE:
                    echo ' - No errors';
                    break;
                case JSON_ERROR_DEPTH:
                    echo json_encode(['error' =>' - Maximum stack depth exceeded']);
                    break;
                case JSON_ERROR_STATE_MISMATCH:
                    echo json_encode(['error' =>' - Underflow or the modes mismatch']);
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    echo json_encode(['error' =>' - Unexpected control character found']);
                    break;
                case JSON_ERROR_SYNTAX:
                    echo json_encode(['error' =>' - Syntax error, malformed JSON']);
                    break;
                case JSON_ERROR_UTF8:
                    echo json_encode(['error' =>' - Malformed UTF-8 characters, possibly incorrectly encoded']);
                    break;
                default:
                    echo json_encode(['error' =>' - Unknown error']);
                    break;
            }
            wp_die();
        }
    }

    $client = EasyRequest::create(
        $method,
        $url,
        [
            'handler' => 'curl'
        ]
    );

    $client->withHeader('X-Requested-With', 'XMLHttpRequest');

    if (isset($params['Authorization'])) {
        $client->withHeader('Authorization', $params['Authorization']);
    } elseif (isset($_COOKIE['rest_user_token']) && !empty($_COOKIE['rest_user_token'])) {
        $token = 'Bearer '.$_COOKIE['rest_user_token'];
        $client->withHeader('Authorization', $token);
    }

    $request = $client->send();
    $rr = $request->getResponse();
    $body = $rr['body'] ?? json_encode(['error' => $rr,  'url' => $url]);
    $body = wp_specialchars_decode($body);


    ob_clean();
    echo $body;
    wp_die();
}


/**
 * @throws Exception
 */
function jourday_ajax_get_content() {
    $headers = null;
    $method = null;
    $url = null;
    $params = _get_query_vars();
    if (isset($params['method'])) {
        $method = $params['method'];
    }
    if (!\in_array(strtolower($method), ['get', 'post', 'delete'], true)) {
        ob_clean();
        echo json_encode(['error' =>' - Method is not correct']);
        wp_die();
    }
    if (isset($params['url'])) {
        $url = $params['url'];
    }
    if ($url) {
        $url = REST_API_HOST . $url;
    }
    if (filter_var($url, FILTER_VALIDATE_URL) === false) {
        ob_clean();
        echo json_encode(['error' =>' - Not valid URL']);
        wp_die();
    }

    if (isset($params['headers'])) {
        $headers  = $params['headers'];
        $headers = json_decode($headers);
        if (!$headers) {
            ob_clean();
            switch (json_last_error()) {
                case JSON_ERROR_NONE:
                    echo ' - No errors';
                    break;
                case JSON_ERROR_DEPTH:
                    echo json_encode(['error' =>' - Maximum stack depth exceeded']);
                    break;
                case JSON_ERROR_STATE_MISMATCH:
                    echo json_encode(['error' =>' - Underflow or the modes mismatch']);
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    echo json_encode(['error' =>' - Unexpected control character found']);
                    break;
                case JSON_ERROR_SYNTAX:
                    echo json_encode(['error' =>' - Syntax error, malformed JSON']);
                    break;
                case JSON_ERROR_UTF8:
                    echo json_encode(['error' =>' - Malformed UTF-8 characters, possibly incorrectly encoded']);
                    break;
                default:
                    echo json_encode(['error' =>' - Unknown error']);
                    break;
            }
            wp_die();
        }
    }



    $url = stripslashes($url);
    $url = str_replace('"', '%22', $url);
    $body = file_get_contents($url);
    $body = wp_specialchars_decode($body);


    ob_clean();
    echo $body;
    wp_die();
}

add_action( 'wp_ajax_jourday_ajax_form_get', 'jourday_ajax_form_get' );
add_action( 'wp_ajax_nopriv_jourday_ajax_form_get', 'jourday_ajax_form_get' );
add_action( 'wp_ajax_jourday_ajax_get_content', 'jourday_ajax_get_content' );
add_action( 'wp_ajax_nopriv_jourday_ajax_get_content', 'jourday_ajax_get_content' );



function jourday_ajax_send_form_post_user_edit() {
    $params = $_POST;
    $files = $_FILES;

    $id = $params['id'] ?? null;
    if (!$id) {
        ob_clean();
        echo json_encode(['error' =>' - Id not found']);
        wp_die();
    }
    $query = _get_query_vars();
    $url = $query['url'] ?? REST_URL_USER_EDIT_SET;
    if ($url) {
        $url = REST_API_HOST . $url . $id;
    }

    $multipart = [];

    if (!empty($files) && is_array($files)) {
        $file = $files['fileName'] ?? null;
        $filePath = $file['tmp_name'] ?? '';
        $fileType = $file['type'] ?? '';
        $fileName = $file['name'] ?? '';
        $multipart['fileName'] = [
            'name' => 'fileName',
            'contents' => fopen($filePath, 'rb+'),
            // optional keys
            'filename' => $fileName,
            'headers' => [
                'Content-Type' => $fileType
            ]
        ];
    }
    
    $client = EasyRequest::create('POST', $url, [
        'multipart' => $multipart
    ]);

    $client->withHeader('X-Requested-With', 'XMLHttpRequest');

    if (isset($params['Authorization'])) {
        $client->withHeader('Authorization', $params['Authorization']);
    } elseif (isset($_COOKIE['rest_user_token']) && !empty($_COOKIE['rest_user_token'])) {
        $token = 'Bearer '.$_COOKIE['rest_user_token'];
        $client->withHeader('Authorization', $token);
    }

    if (is_array($params) && !empty($params)) {
        foreach ($params as $field => $value) {
            $client->withMultipart($field, $value);
        }
    }

    try {
        $request = $client->send();
        $rr = $request->getResponse();
        $error = json_encode(['result' =>'error', 'message' => 'Body not sent']);
        $body = $rr['body'] ?? $error;
        ob_clean();
        echo $body;
        wp_die();
    } catch (Exception $e) {
        ob_clean();
        echo json_encode(['error' => $e->getMessage()]);
        wp_die();
    }
}


function jourday_ajax_send_form_post_models() {
    $params = $_POST;
    $files = $_FILES;

    $query = _get_query_vars();
    $url = $query['url'] ?? REST_URL_FORM_CREATE;
    if ($url) {
        $url = REST_API_HOST . $url;
    }

    $multipart = [];

    if (!empty($files) && is_array($files)) {
        $file = $files['fileName'] ?? null;
        $filePath = $file['tmp_name'] ?? '';
        $fileType = $file['type'] ?? '';
        $fileName = $file['name'] ?? '';
        $multipart['fileName'] = [
            'name' => 'fileName',
            'contents' => fopen($filePath, 'rb+'),
            // optional keys
            'filename' => $fileName,
            'headers' => [
                'Content-Type' => $fileType
            ]
        ];
    }

    $client = EasyRequest::create('POST', $url, [
        'multipart' => $multipart
    ]);

    $client->withHeader('X-Requested-With', 'XMLHttpRequest');

    if (isset($params['Authorization'])) {
        $client->withHeader('Authorization', $params['Authorization']);
    } elseif (isset($_COOKIE['rest_user_token']) && !empty($_COOKIE['rest_user_token'])) {
        $token = 'Bearer '.$_COOKIE['rest_user_token'];
        $client->withHeader('Authorization', $token);
    }

    if (is_array($params) && !empty($params)) {
        foreach ($params as $field => $value) {
            $client->withMultipart($field, $value);
        }
    }

    try {
        $request = $client->send();
        $rr = $request->getResponse();
        $error = json_encode(['result' =>'error', 'message' => 'Body not sent']);
        $body = $rr['body'] ?? $error;
        ob_clean();
        echo $body;
        wp_die();
    } catch (Exception $e) {
        ob_clean();
        echo json_encode(['error' => $e->getMessage()]);
        wp_die();
    }
}

add_action( 'wp_ajax_jourday_ajax_send_form_post', 'jourday_ajax_send_form_post_user_edit' );
add_action( 'wp_ajax_nopriv_jourday_ajax_send_form_post', 'jourday_ajax_send_form_post_user_edit' );


add_action( 'wp_ajax_jourday_ajax_send_form_post_models', 'jourday_ajax_send_form_post_models' );
add_action( 'wp_ajax_nopriv_jourday_ajax_send_form_post_models', 'jourday_ajax_send_form_post_models' );