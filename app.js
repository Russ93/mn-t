const JokeModel = Backbone.Model.extend({
  urlRoot: 'https://api.chucknorris.io/jokes/random'
})

const Joke = Mn.View.extend({
  className: 'alert alert-dark mt-5',
  template: _.template(`
    <img class="mb-3" src="<%= icon_url %>"></img>
    <p><%= value %></p>
  `),
})


const NorrisWidget = Mn.View.extend({
  tagName: 'div',
  className: 'container mt-5 p-5 text-center',
  template: _.template(`
    <div>
      <button class="btn btn-primary btn-lg">New joke</button>
    </div>
    <div id="js-joke-region"></div>`),

  initialize() {
    this.model = new JokeModel();
  },
  
  ui: {
    'btn': 'button'
  },

  events: {
    'click @ui.btn': 'fetchJoke'
  },

  modelEvents: {
    'sync': 'renderJoke'
  },

  regions: {
    'jokeRegion': '#js-joke-region'
  },

  fetchJoke() {
    this.getUI('btn').attr('disabled', true).text('Loading...');
    this.model.unset('id');
    this.model.fetch();
  },

  renderJoke(model, res, ops) {
    this.getUI('btn').attr('disabled', false).text('New joke');
    this.showChildView('jokeRegion', new Joke({model: model}))
  },

  onRender() {
    this.model.fetch();
  }
})


// $('#app').html(new NorrisWidget().render().$el)

const App = Mn.Application.extend({

  region: '#app',

  onStart() {
    this.showView(new NorrisWidget())
  }
});

new App().start();
