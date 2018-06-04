var AccessSniff = require('../dist');
var fs = require('fs');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


const options = {
  force: true,
  browser: true
};

exports.accessibilityTests = {
  setUp: done => {
    // setup here if necessary
    done();
  },
  report_JSON: test => {
    AccessSniff.default(['./test/examples/test.html'], options)
      .then(report => AccessSniff.report(report, {reportLocation: 'reports'}))
      .then(report => {
        var writtenReport = fs.readFileSync('./reports/report.json', 'utf8');
        var expected = fs.readFileSync('./test/expected/report.json', 'utf8');

        test.deepEqual(report, expected, 'Should return JSON report data for test.html');
        test.deepEqual(writtenReport, expected, 'Should write a JSON report for test.html');
        test.expect(2);
        test.done();

      });
  },
  report_CSV: test => {
    AccessSniff.default(['./test/examples/test.html'], options)
      .then(report => AccessSniff.report(report, {reportLocation: 'reports', reportType: 'csv', force: true}))
      .then(report => {
        var writtenReport = fs.readFileSync('./reports/report.csv', 'utf8');
        var expected = fs.readFileSync('./test/expected/report.csv', 'utf8');

        test.deepEqual(report, expected, 'Should return CSV report data for test.html');
        test.deepEqual(writtenReport, expected, 'Should write a CSV report for test.html');
        test.expect(2);
        test.done();

      });
  },
  report_TXT: test => {
    AccessSniff.default(['./test/examples/test.html'], options)
      .then(report => AccessSniff.report(report, {reportLocation: 'reports', reportType: 'txt', force: true}))
      .then(report => {
        var writtenReport = fs.readFileSync('./reports/report.txt', 'utf8');
        var expected = fs.readFileSync('./test/expected/report.txt', 'utf8');

        test.deepEqual(report, expected, 'Should return TXT report data for test.html');
        test.deepEqual(writtenReport, expected, 'Should write a TXT report for test.html');
        test.expect(2);
        test.done();
      });
  },
  report_HTML: test => {
    AccessSniff.default(['./test/examples/test.html'], options)
    .then(report => AccessSniff.report(report, {reportLocation: 'reports', reportType: 'html', force: true}))
    .then(report => {
      var writtenReport = fs.readFileSync('./reports/report.html', 'utf8');
      var expected = fs.readFileSync('./test/expected/report.html', 'utf8');

      test.deepEqual(report, expected, 'Should return HTML report data for test.html');
      test.deepEqual(writtenReport, expected, 'Should write an HTML report for test.html');
      test.expect(2);
      test.done();
    });
  },
  report_Error: test => {
    AccessSniff.default(['./test/errors/no-alt.html'], {
      browser: true
    })
      .then(() => {
        test.ok(false, 'Error not detected');
        test.done();
      }, result => AccessSniff.report(result.reportLogs, {reportLocation: 'reports/error'}))
      .then(report => {
        var writtenReport = fs.readFileSync('./reports/error/report.json', 'utf8');
        var expected = fs.readFileSync('./test/expected/error/report.json', 'utf8');

        test.deepEqual(report, expected, 'Should return a JSON report if an error is detected in a test file');
        test.deepEqual(writtenReport, expected, 'Should write a JSON report if an error is detected in a test file');
        test.expect(2);
        test.done();
      });
  }
};
