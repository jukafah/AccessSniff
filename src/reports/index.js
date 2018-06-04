/* eslint-disable no-console */
import _ from 'underscore';
import fs from 'fs';
import mkdirp from 'mkdirp';
import logger from '../logger';

import GenerateReport from './generateReport';
import GenerateHtml from './generateHtml';

const defaultOptions = {
  fileName: 'report',
  reportType: 'json',
  reportLocation: ''
};

export default (reports, options = defaultOptions) => {

  _.defaults(options, defaultOptions);

  let report = new ReportsGenerator(reports, options);

  if (options.reportLocation) {
    report.writeFile();
  }

  return report.getReport();
};


class ReportsGenerator {

  constructor(reports, options) {

    this.report = {
      name: options.fileName,
      type: options.reportType,
      location: options.reportLocation,
      output: ''
    };

    switch (options.reportType) {

      case 'json':
        this.report.output = this.reportJson(reports);
        break;

      case 'csv':
        this.report.output = this.reportCsv(reports);
        break;

      case 'txt':
        this.report.output = this.reportTxt(reports);
        break;

      case 'html':
        this.report.output = this.reportHtml(reports);
        break;

    }

  }

  reportJson(reports) {
    return JSON.stringify(reports);
  }

  reportTxt(reports) {
    return GenerateReport(reports, '|');
  }

  reportCsv(reports) {
    return GenerateReport(reports, ',');
  }

  reportHtml(reports) {
    return GenerateHtml(reports);
  }

  writeFile() {
    const report = this.report;
    const fileName = `${report.name}.${report.type}`;
    const filePath = `${process.cwd()}/${report.location}/${fileName}`;

    mkdirp.sync(`${process.cwd()}/${report.location}`);

    fs.writeFileSync(filePath, report.output);

    logger.finishedMessage(filePath);

    return report.output;
  }

  getReport() {
    const newReport = this.report.output;
    return newReport;
  }
}
