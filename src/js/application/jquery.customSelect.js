(function ($) {
	'use strict';

	var CustomSelect = function ($root, options) {
		this.options = options;
		this.$root = $root;

		this.bindUIActions();
		this.init();
	};

	CustomSelect.DEFAULTS = {};

	CustomSelect.prototype.fillVisualValue = function () {
		var valueBox = this.$root.parent().children('span'),
			value = $('option:selected', this.$root).text();

		valueBox.html(value);
	};

	CustomSelect.prototype.bindUIActions = function () {
		this.$root.on('change', $.proxy(this.fillVisualValue, this));
	};

	CustomSelect.prototype.init = function () {
		this.fillVisualValue();
	};

	$.fn.customSelect = function (options) {
		return this.each(function () {
			var $root = $(this),
				settings = $.extend({}, CustomSelect.DEFAULTS, options);

			return new CustomSelect($root, settings);
		});
	};

})(jQuery);