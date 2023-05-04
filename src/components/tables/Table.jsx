import React from "react";

function Table(props) {
  return <table {...props} />;
}

Table.Header = (props) => <thead {...props} />;

Table.Body = (props) => <tbody {...props} />;

Table.Row = (props) => <tr {...props} />;

Table.Column = (props) => <td {...props} />;

export default Table;
