'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ExpressionEditor = require('../src/ExpressionEditor');
var SourceEditor = require('../src/SourceEditor');

var MainPage = createReactClass({
  mixins: [PureRenderMixin],

  getInitialState: function() {
    return {
      pattern: '([A-Z])\\w+',
      flags: 'g',

      prevMatch: null,
      nextMatch: null,

      text: [
        'Welcome to RegExr v2.1 by gskinner.com, proudly hosted by Media Temple!',
        '',
        'Edit the Expression & Text to see matches. Roll over matches or the expression for details. Undo mistakes with ctrl-z. Save Favorites & Share expressions with friends or the Community. Explore your results with Tools. A full Reference & Help is available in the Library, or watch the video Tutorial.',
        '',
        'Sample text for testing:',
        'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        '0123456789 _+-.,!@#$%^&*();\\/|<>"\'',
        '12345 -98.7 3.141 .6180 9,000 +42',
        '555.123.4567	+1-(800)-555-2468',
        'foo@demo.net	bar.ba@test.co.uk',
        'www.demo.com	http://foo.co.uk/',
        'http://regexr.com/foo.html?q=bar',
        'https://mediatemple.net'
      ].join('\n')
    };
  },

  componentWillMount: function() {
    this._sourceEditor = React.createRef();
  },
  handleChange: function(name) {
    return function(editor, data, value) {
      this.setState({ [name]: value });
    }.bind(this);
  },
  handleFlagsChange: function(value) {
    this.setState({ flags: value });
  },
  handleViewportChange: function(viewport) {
    this.setState({
      nextMatch: viewport.nextMatch,
      prevMatch: viewport.prevMatch
    });
  },

  scrollToPrev: function() {
    this._sourceEditor.current.scrollToMatch(this.state.prevMatch);
  },

  scrollToNext: function() {
    this._sourceEditor.current.scrollToMatch(this.state.nextMatch);
  },

  render: function() {
    var pattern = this.state.pattern;
    var text = this.state.text;
    var flags = this.state.flags;

    return (<div>
      <ExpressionEditor
          pattern={pattern}
          flags={flags}
          onPatternChange={this.handleChange('pattern')}
          onPatternBeforeChange={this.handleChange('pattern')}
          onFlagsChange={this.handleFlagsChange} />
      <SourceEditor
          pattern={pattern}
          flags="g"
          onTextChange={this.handleChange('text')}
          onTextBeforeChange={this.handleChange('text')}
          text={text}
          options={{
            lineWrapping: true
          }}
          onViewportChange={this.handleViewportChange}
          ref={this._sourceEditor} />

      <button onClick={this.scrollToPrev} type="button">Previous match</button>
      <button onClick={this.scrollToNext} type="button">Next match</button>
    </div>);
  }
});

module.exports = MainPage;
