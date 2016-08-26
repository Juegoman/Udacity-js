/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	// Model also has the prioritized attribute.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title`, `completed`, and `completed` keys.
		defaults: {
			title: '',
			completed: false,
			prioritized: false
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

		// Toggle the `prioritized` state of this todo item.
		togglePrioritized: function () {
			this.save({
				prioritized: !this.get('prioritized')
			});
		}
	});
})();
