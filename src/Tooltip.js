'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var PropTypes = require('prop-types');

var Tooltip = createReactClass({
  mixins: [PureRenderMixin],

  propTypes: {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  },

  render: function() {
    var children = this.props.children;
    var className = this.props.className || '';

    return (
      <div className={'regexr regexr-react-tooltip ' + className}>
        {children}
      </div>
    );
  }
});

module.exports = Tooltip;
