$(function () {

	//Creates a view
	var AppView = Backbone.View.extend({
		//pass an object with the particalurs that describes what an app view is
		//every app view has to have an associated DOM element
		el: 'body', //binds changes to backbone to the DOM
		initialize: function () { //things that should happen when the view is initialized
			this.render(); //renders the app view
		},
		render: function () {
			this.$el.html("<h1>Stir it up, " + this.model.attributes.name + ".</h1>");
			return this; //allows for future chaining
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

	var myModel = new AppModel({name: "Bob"});

	var app = new AppView({model: myModel});
	window.app = app; //allows access to the app from the console once we run this.

	app.listenTo(myModel, 'change', app.render);
});