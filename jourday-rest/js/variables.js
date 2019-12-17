var navbar = {
  admin: 'template/admin-navbar.html',
  nav: 'template/navbar.html'
};
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