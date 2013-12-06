$(function () {

	//Creates a view
	var AppView = Backbone.View.extend({
		//pass an object with the particalurs that describes what an app view is
		//every app view has to have an associated DOM element
		el: '#random-number-app', //binds changes to backbone to the DOM
		events: {
			"click button" : "randomButtonPressed"
		},
		initialize: function () { //things that should happen when the view is initialized
			this.render(); //renders the app view
			this.listenTo(myModel, 'change', this.render);
		},
		template: function (context) {
			return '<h1>' + context.rannum + '</h1>' + '<button class="pure-button pure-button-primary">Random</button>'
		},
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this; //allows for future chaining
		},
		randomButtonPressed: function () {
			this.model.newRandomNumber();
		}
	});
	
	var CommView = Backbone.View.extend({
		el: '#random-number-commentary',
		initialize: function () {
			this.render();
			this.listenTo(myModel, 'change', this.render);
		},
		//commentary: templates should turn data into HTML and that is it, other logic belongs elsewhere.
		template: function (context) {
			if (context.rannum > 900) {
				return '<h2>Woah, that\'s a big number!</h2>';
			} else if (context.rannum < 100) {
				return '<h2>That\'s a little number.</h2>';
			} else {
				return '<h2>That\'s just a number.</h2>';
			}
		},
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});

	var AppModel = Backbone.Model.extend({ //constructor fuction
		initialize: function () {
			this.newRandomNumber();
		},
		newRandomNumber: function () {
			var number = Math.floor(Math.random() * 1000);
			this.set('rannum', number);

			return number;
		}
	});

	var myModel = new AppModel();

	var app = new AppView({model: myModel});
	var comm = new CommView({model: myModel});
	window.app = app; //allows access to the app from the console once we run this.

	
	
});