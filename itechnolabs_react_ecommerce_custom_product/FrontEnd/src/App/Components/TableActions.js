import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import XLSX from "xlsx";
import { injectIntl } from "react-intl";
import { message } from "antd";
import _ from "underscore";

class TableActions extends Component {
  constructor() {
    super();
    this.state = {
      option: "choose",
    };
    this.printTable = this.printTable.bind(this);
    this.savePdf = this.savePdf.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
  }
  /**Print Table component */
  printTable = (columns, data) => {
    if (columns.length && data.length) {
      window.print();
    } else {
      message.error(this.props.intl.formatMessage({ id: "noRecords" }));
    }
  };

  /**Save Table component as PDF */
  savePdf = (columns, data) => {
    const input =
      document.getElementsByClassName("react-table") &&
      document.getElementsByClassName("react-table")[0];
    if (input && columns.length && data.length) {
      /**Parse HTML to canvas */
      html2canvas(input).then((canvas) => {
        /**Get Image from canvas */
        const imgData = canvas.toDataURL("image/png");
        /**Create new pdf obect and set configurations as in landscape mode */
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "in",
          //format: [4,2]
        });
        let width = pdf.internal.pageSize.getWidth();
        let height = pdf.internal.pageSize.getHeight();
        //pdf.addImage(imgData, 'JPEG', 0,0, width, height);

        /**Add image in pdf object and set parameters */
        pdf.addImage(imgData, "JPEG", 0, 0);
        /**Dowanload pdf */
        pdf.save("download.pdf");
      });
    } else {
      message.error(this.props.intl.formatMessage({ id: "noRecords" }));
    }
  };
  /**Export Table component as Excel */
  exportExcel = (columns, data, tableType, fileName, flag) => {
    let tableData = [],
      tableHeader = [];
    if (columns.length) {
      columns.forEach((column) => {
        if (
          column.accessor !== "serialNumber" &&
          column.accessor !== "action"
        ) {
          tableHeader.push(column.Header);
        }
      });
    }
    if (flag) {
      data = _.pluck(data, "original");
    }
    tableData.push(tableHeader);
    if (data !== undefined) {
      data.forEach((rowData) => {
        let tableRow = [
          rowData.order_number,
          rowData.order_date,
          rowData.total,
        ];
        // if (tableType == 'appointments') {
        //   tableRow = [
        //       rowData.user.firstName && rowData.user.lastName ? capitalizeFirstLetter(rowData.user.firstName) + ' ' + rowData.user.lastName : '',
        //       rowData.emailsubject,
        //       rowData.amount ? rowData.amount : 0,
        //       rowData.documents &&  rowData.documents.length ? rowData.documents.length : 0,
        //       rowData.dateTime ? moment(rowData.dateTime).format('DD/MM/YYYY HH:mm') : ''
        //   ];
        // }
        tableData.push(tableRow);
      });
    }
    if (tableHeader.length && data.length) {
      const wb = XLSX.utils.book_new();
      const wsAll = XLSX.utils.aoa_to_sheet(tableData);
      XLSX.utils.book_append_sheet(wb, wsAll, tableType);
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } else {
      message.error(this.props.intl.formatMessage({ id: "noRecords" }));
    }
  };

  onChange = (e) => {
    this.setState({ option: e.target.value });
    if (e.target.value === "print") {
      this.printTable(this.props.columns, this.props.data);
    } else if (e.target.value === "pdf") {
      this.savePdf(this.props.columns, this.props.data);
    } else if (e.target.value === "excel") {
      this.exportExcel(
        this.props.columns,
        this.props.data,
        this.props.tableType,
        this.props.fileName,
        this.props.flag
      );
    }
  };

  render() {
    return (
      <div className="no-print actionClass">
        <select
          className="actionClassChild"
          value={this.state.option}
          onChange={(e) => this.onChange(e)}
        >
          <option value="choose">
            {" "}
            {this.props.intl.formatMessage({ id: "action" })}
          </option>
          <option value="print">
            {" "}
            {this.props.intl.formatMessage({ id: "print" })}{" "}
          </option>
          <option value="pdf">
            {" "}
            {this.props.intl.formatMessage({ id: "pdf" })}{" "}
          </option>
          <option value="excel">
            {" "}
            {this.props.intl.formatMessage({ id: "excel" })}{" "}
          </option>
        </select>
      </div>
    );
  }
}

export default injectIntl(TableActions);
