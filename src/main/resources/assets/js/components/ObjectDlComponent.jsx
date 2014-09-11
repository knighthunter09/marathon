define([
  "React"
], function(React) {
  function formatKey(key) {
    return key.split("_").map(function(piece) {
      return piece.charAt(0).toUpperCase() + piece.slice(1);
    }).join(" ");
  }

  function prettyPrint(object) {
    if (typeof object === "object" && !!object) {
      return JSON.stringify(object, null, " ");
    } else if (typeof object === "boolean") {
      return <code>{object.toString()}</code>;
    } else {
      return object.toString();
    }
  }

  return React.createClass({
    displayName: "ObjectDlComponent",
    propTypes: {
      object: React.PropTypes.object.isRequired
    },

    render: function() {
      var dlNodes;
      if (this.props.object != null) {
        dlNodes = [];
        Object.keys(this.props.object).sort().forEach(function(key) {
          dlNodes.push(
            <dt key={key} title={key}>{formatKey(key)}</dt>
          );
          dlNodes.push(
            <dd key={key + "_val"}>
              {this.props.object[key] == null ?
                <span className="text-muted">Undefined</span> :
                prettyPrint(this.props.object[key])}
            </dd>
          );
        }, this);
      }

      return (
        <dl className="dl-horizontal dl-horizontal-lg">
          {dlNodes}
        </dl>
      );
    }
  });
});