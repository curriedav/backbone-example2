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
	window.app = app; //allows access to the app from the console once we run this.

	app.listenTo(myModel, 'change', app.render);
});