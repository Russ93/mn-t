const rootTemplate = _.template(`
  <div id="js-main-region"></div>
  <div id="js-second-region"></div>
`)

const Result = Mn.View.extend({
  className: 'mt-5 card p-5',
  template: _.template('<div><%= count %></div>'),

  initialize(ops) {
    this.count = ops.count || 0;
  },

  templateContext() {
    return {
      count: this.count
    }
  }
})

const Btn = Mn.View.extend({
  tagName: 'button',
  className: 'btn btn-primary',
  template: _.template('Click'),

  triggers: {
    'click': 'button:click'
  }
})

const Root = Mn.View.extend({
  tagName: 'div',
  className: 'container mt-5 mb-5 text-center',
  template: rootTemplate,

  initialize() {
    this.count = 0;
  },

  childViewEvents: {
    'button:click': 'onClick'
  },

  regions: {
    'btnRegion': '#js-main-region',
    'previewRegion': '#js-second-region'
  },

  onClick() {
    this.count = this.count + 1;
    this.renderResult(this.count);
  },

  renderResult(count) {
    this.showChildView('previewRegion', new Result({count: count}))
  },

  onRender() {
    const btn = new Btn();
    this.showChildView('btnRegion', btn);
    this.renderResult(this.count)
  }
})

const root = new Root();
root.render();

$('#app').html(root.$el)