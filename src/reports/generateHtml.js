import _ from 'underscore';

const GenerateHtml = (reports) => {
    
  let output = `
<!DOCTYPE html>
<html lang="en">

<head>
  <style>
    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 10px;
    }

    th {
      background-color: #787878;
    }

    tr:nth-child(even) {
      background-color: #f0f0f0;
    }

    tr:nth-child(odd) {
      background-color: #b4b4b4;
    }
  </style>
  
  <title>Accessibilty Report</title>
  
</head>

<body>

  <h1>Accessibility Report</h1>

  <table style="width:100%">
    <tr>
      <th>File</th>
      <th>Heading</th>
      <th>Issue</th>
      <th>Element</th>
      <th>Id</th>
      <th>Class</th>
      <th>Ln:Col</th>
      <th>Description</th>
    </tr>`;
  
  _.each(reports, (report, fileName) => {
    
    report.messageLog.forEach((message) => {
        output +=
        `
    <tr>
      <td>${fileName}</td>
      <td>${message.heading}</td>
      <td>${message.issue}</td>
      <td>${message.element.node.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td>${message.element.id.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td>${message.element.class.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td>${message.position.lineNumber}:${message.position.columnNumber}</td>
      <td>${message.description}</td>
    </tr>`;
    });

  });

  output += 
  `
  </table>

</body>

</html>`;

  return output;

};


export { GenerateHtml as default };
