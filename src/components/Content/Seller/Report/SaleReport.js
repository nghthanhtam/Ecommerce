import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Select from "react-select";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import ReportRow from "./ReportRow";

const mapStateToProps = (state) => ({
  idShop: state.auth.role.idShop,
  token: state.auth.token,
});

class SaleReport extends Component {
  state = {
    reportData: [
      {
        label: "Doanh số mỗi tháng",
        value: "SALE_SUMMARY",
      },
      {
        label: "Ngày trong tuần",
        value: "WEEKDAY",
      },
      {
        label: "Thành phố",
        value: "CITY",
      },
      {
        label: "Giờ",
        value: "HOUR",
      },
    ],
    sortData: [
      {
        label: "Khách hàng",
        value: "CUSTOMER",
      },
      {
        label: "Đơn hàng",
        value: "ORDER",
      },
      {
        label: "Phí ship",
        value: "SHIPPING",
      },
      {
        label: "Mã giảm giá",
        value: "PROMOTINON",
      },
      {
        label: "Sản phẩm",
        value: "PRODUCT",
      },
    ],
    statusData: [
      {
        label: "Đang xử lý",
        value: "P",
      },
      {
        label: "Giao thành công",
        value: "S",
      },
      {
        label: "Đã hủy",
        value: "C",
      },
    ],
    yearData: [
      {
        label: "2013",
        value: "2013",
      },
      {
        label: "2014",
        value: "2014",
      },
      {
        label: "2015",
        value: "2015",
      },
      {
        label: "2016",
        value: "2016",
      },
      {
        label: "2017",
        value: "2017",
      },
      {
        label: "2018",
        value: "2018",
      },
      {
        label: "2019",
        value: "2019",
      },
      {
        label: "2020",
        value: "2020",
      },
      {
        label: "2021",
        value: "2021",
      },
      {
        label: "2022",
        value: "2022",
      },
    ],
    data: [],
    options: [],
    idMaterial: "",
    selectedYear: "",
    selectedMonth: "",
    selectedReport: "",
    selectedSort: "",
    selectedStatus: "",
    selectionRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
    defaultHeaderList: [
      "Đơn hàng",
      "Khách hàng",
      "Sản phẩm",
      "Phí ship",
      "Giảm giá",
      "Tổng tiền",
    ],
    headerList: [
      "Loại báo cáo",
      "Đơn hàng",
      "Khách hàng",
      "Sản phẩm",
      "Phí ship",
      "Giảm giá",
      "Tổng tiền",
    ],
    startDate: new Date(),
    endDate: new Date(),
    reports: [],
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { selectedYear, selectedMonth } = this.state;
  //   if (selectedYear === "") return;

  //   //ng dung chon thang thi hien thi 4 tuan trong thang
  //   //ng dung ko chon thang ma chi chon nam thi hien thi 12 thang trong nam do

  //   if (prevState.selectedYear !== selectedYear) {
  //     if (selectedMonth === "") {
  //       this.setState((state) => {
  //         let data = [...state.data];
  //         for (let i = 0; i < 12; i++) {
  //           data.push({ total: 0, month: i + 1, amt: 2400 });
  //         }
  //         this.props.invoice.invoices.map((el) => {
  //           if (new Date(el.createddate).getFullYear() == selectedYear) {
  //             let month = new Date(el.createddate).getMonth() + 1;
  //             switch (month) {
  //               case 1:
  //                 data[0]["total"] += el.totalAmt;
  //                 return true;
  //               case 2:
  //                 data[1]["total"] += el.totalAmt;
  //                 return true;
  //               case 3:
  //                 data[2]["total"] += el.totalAmt;
  //                 return true;
  //               case 4:
  //                 data[3]["total"] += el.totalAmt;
  //                 return true;
  //               case 5:
  //                 data[4]["total"] += el.totalAmt;
  //                 return true;
  //               case 6:
  //                 data[5]["total"] += el.totalAmt;
  //                 return true;
  //               case 7:
  //                 data[6]["total"] += el.totalAmt;
  //                 return true;
  //               case 8:
  //                 data[7]["total"] += el.totalAmt;
  //                 return true;
  //               case 9:
  //                 data[8]["total"] += el.totalAmt;
  //                 return true;
  //               case 10:
  //                 data[9]["total"] += el.totalAmt;
  //                 return true;
  //               case 11:
  //                 data[10]["total"] += el.totalAmt;
  //                 return true;
  //               case 12:
  //                 data[11]["total"] += el.totalAmt;
  //                 return true;
  //               default:
  //                 return false;
  //             }
  //           }
  //         });
  //         return {
  //           data,
  //         };
  //       });
  //     }
  //   }
  //   if (prevState.selectedMonth !== selectedMonth) {
  //     this.setState((state) => {
  //       let data = [...state.data];
  //       data = [];
  //       for (let i = 0; i < 4; i++) {
  //         data.push({ total: 0, month: i + 1, amt: 2400 });
  //         //month dong tren dung ra la "week" nhung luoi ve lai chart :)
  //       }
  //       this.props.invoice.invoices.map((el) => {
  //         if (new Date(el.createddate).getFullYear() == selectedYear) {
  //           if (new Date(el.createddate).getMonth() + 1 == selectedMonth) {
  //             let date = new Date(el.createddate).getDate();

  //             switch (date) {
  //               case 1:
  //               case 2:
  //               case 3:
  //               case 4:
  //               case 5:
  //               case 6:
  //               case 7:
  //                 data[0]["total"] += el.totalAmt;
  //                 return true;
  //               case 8:
  //               case 9:
  //               case 10:
  //               case 11:
  //               case 12:
  //               case 13:
  //               case 14:
  //                 data[1]["total"] += el.totalAmt;
  //                 return true;
  //               case 15:
  //               case 16:
  //               case 17:
  //               case 18:
  //               case 19:
  //               case 20:
  //               case 21:
  //                 data[2]["total"] += el.totalAmt;
  //                 return true;
  //               default:
  //                 data[3]["total"] += el.totalAmt;
  //                 return true;
  //             }
  //           }
  //         }
  //       });
  //       return {
  //         data,
  //       };
  //     });
  //   }
  // }
  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getProducts({ select, currentPage, query });
      this.getPages();
      this.getTotalDocuments();
    });
  };
  selectedStatus = (selectedItem) => {
    this.setState({ selectedStatus: selectedItem.value });
  };
  onSelectedReport = (selectedItem) => {
    this.setState({ selectedReport: selectedItem.value });
  };
  onSelectedSort = (selectedItem) => {
    this.setState({ selectedSort: selectedItem.value });
  };
  onSelectedStatus = (selectedItem) => {
    this.setState({ selectedSort: selectedItem.value });
  };
  onChangeSelectedYear = (selectedItem) => {
    this.setState({ selectedYear: selectedItem.value });
  };
  onChangeSelectedMonth = (selectedItem) => {
    this.setState({ selectedMonth: selectedItem.value });
  };
  onChangeSelectedMaterial = (selectedMember) => {
    this.setState({ idMaterial: selectedMember.value });
  };

  handleSelect = (ranges) => {
    this.setState({
      selectionRange: {
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: "selection",
      },
    });
  };

  renderReports = () => {
    const { reports, selectedReport, selectedYear } = this.state;
    if (reports.length === 0) {
      return "Không có báo cáo nào";
    } else {
      return reports.map((report) => (
        <ReportRow
          key={report.id}
          report={report}
          selectedReport={selectedReport}
          selectedYear={selectedYear}
        />
      ));
    }
  };

  filter = () => {
    let {
        selectedReport,
        defaultHeaderList,
        selectedYear,
        selectionRange,
      } = this.state,
      addingColName = "";
    const { idShop, token } = this.props;
    if (selectedReport === "SALE_SUMMARY") {
      addingColName = "Tháng/Năm";

      console.log(defaultHeaderList);
      //set lại các cột mặc định -> thêm các cột tùy theo loại report dc chọn
      this.setState({ headerList: defaultHeaderList }, () => {
        this.setState(
          (prepState) => ({
            headerList: [addingColName, ...prepState.headerList],
          }),
          () => console.log(this.state.headerList)
        );
      });

      axios
        .get(
          `${process.env.REACT_APP_BACKEND_ORDER}/api/report/${idShop}/getReportByMonth?year=${selectedYear}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.setState({ reports: response.data });
        })
        .catch((er) => console.log(er.response));
    } else if (selectedReport === "WEEKDAY") {
      addingColName = "Thứ";
    } else if (selectedReport === "CITY") {
      addingColName = "Tỉnh/Thành phố";

      this.setState({ headerList: defaultHeaderList }, () => {
        this.setState((prepState) => ({
          headerList: [addingColName, ...prepState.headerList],
        }));
      });

      axios
        .get(
          `${
            process.env.REACT_APP_BACKEND_ORDER
          }/api/report/${idShop}/getReportByCity?startDate=${selectionRange.startDate
            .toISOString()
            .slice(0, 19)
            .replace(
              "T",
              " "
            )}&endDate=${selectionRange.endDate
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.setState({ reports: response.data });
        })
        .catch((er) => console.log(er.response));
    }
  };

  renderPageButtons = () => {
    const { pages, page, isNextBtnShow } = this.state;
    if (pages.length > 1) {
      return (
        <>
          {pages.map((eachButton) => (
            <li
              key={eachButton.pageNumber}
              className={
                page === eachButton.pageNumber
                  ? "paginae_button active"
                  : "paginate_button "
              }
            >
              <a
                className="paga-link"
                name="page"
                href="javascript:void(0);"
                onClick={() => this.handleChoosePage(eachButton.pageNumber)}
              >
                {eachButton.pageNumber}
              </a>
            </li>
          ))}
          <li className="paginate_button">
            <a
              className={
                isNextBtnShow === true ? "paga-link" : "paga-link_hidden"
              }
              name="currentPage"
              href="#"
              onClick={() => this.handleChoosePage(-1)}
            >
              {">>"}
            </a>
          </li>
        </>
      );
    }
  };

  render() {
    const {
      reportData,
      sortData,
      statusData,
      yearData,
      selectionRange,
      headerList,
      selectedReport,
      select,
      sort,
      totalDocuments,
    } = this.state;

    return (
      <Fragment>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-body">
                  <div className="box-body">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div>
                        <button
                          style={{
                            width: "100px",
                            float: "right",
                            marginTop: "5px",
                          }}
                          type="button"
                          className="btn btn-block btn-success"
                        >
                          Export
                        </button>
                        <button
                          type="button"
                          style={{
                            width: "100px",
                            float: "right",
                          }}
                          className="btn btn-block btn-primary"
                        >
                          Clear
                        </button>
                        <button
                          onClick={this.filter}
                          type="button"
                          style={{ width: "100px", float: "right" }}
                          className="btn btn-block btn-info"
                        >
                          Filter
                        </button>
                      </div>
                      <div className="row-flex">
                        <div
                          style={{
                            background: "#f5f5f5",
                            padding: "10px",
                            margin: "10px",
                          }}
                        >
                          <h4>Ngày tạo đơn hàng</h4>
                          <div>
                            <DateRangePicker
                              showSelectionPreview={true}
                              ranges={[selectionRange]}
                              onChange={this.handleSelect}
                            />
                          </div>
                        </div>
                        <div
                          className="column-flex"
                          style={{
                            background: "#f5f5f5",
                            padding: "10px 20px 0 0",
                            margin: "10px",
                            flex: 1,
                          }}
                        >
                          <div className="row-flex">
                            <div style={menuStyle}>
                              <h4> Tạo báo cáo theo</h4>
                              <Select
                                onChange={this.onSelectedReport}
                                isSearchable={true}
                                options={reportData}
                                placeholder="Chọn..."
                              ></Select>
                            </div>
                            {selectedReport == "SALE_SUMMARY" && (
                              <div style={menuStyle}>
                                <h4> Năm</h4>
                                <Select
                                  onChange={this.onChangeSelectedYear}
                                  isSearchable={true}
                                  options={yearData}
                                  placeholder="Chọn năm..."
                                ></Select>
                              </div>
                            )}
                          </div>
                          <div style={menuStyle}>
                            <h4> Sắp xếp theo</h4>
                            <Select
                              onChange={this.onChangeSelectedYear}
                              isSearchable={true}
                              options={sortData}
                              placeholder="Chọn..."
                            ></Select>
                          </div>
                          <div style={menuStyle}>
                            <h4> Tình trạng đơn hàng</h4>
                            <Select
                              onChange={this.onSelectedStatus}
                              isSearchable={true}
                              options={statusData}
                              placeholder="Chọn..."
                            ></Select>
                          </div>
                          <div style={menuStyle}>
                            <h4> Giá trị đơn hàng</h4>
                            <div className="row">
                              <div className="col-xs-3">
                                <input
                                  type="number"
                                  min={0}
                                  className="form-control"
                                  placeholder="Từ..."
                                />
                              </div>

                              <div className="col-xs-3">
                                <input
                                  min={0}
                                  type="number"
                                  className="form-control"
                                  placeholder="Đến..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box-body">
                  <div
                    id="example1_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap"
                  >
                    <div className="row">
                      <div>
                        <div className="col-sm-6">
                          <div
                            className="dataTables_length"
                            id="example1_length"
                          >
                            <label
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                              }}
                            >
                              Hiển thị
                              <select
                                onChange={this.handleOnChange}
                                name="select"
                                aria-controls="example1"
                                style={{ margin: "0px 5px" }}
                                className="form-control input-sm"
                                value={this.state.select}
                              >
                                {sort.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.value}
                                  </option>
                                ))}
                              </select>
                              kết quả
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div
                            id="example1_filter"
                            className="dataTables_filter"
                          >
                            <label
                              style={{
                                float: "right",
                                fontFamily: "Saira, sans-serif",
                              }}
                            >
                              Tìm kiếm
                              <input
                                type="search"
                                name="query"
                                style={{ margin: "0px 5px" }}
                                className="form-control input-sm"
                                placeholder="Nhập từ khóa...  "
                                aria-controls="example1"
                                onChange={this.handleOnChange}
                                value={this.state.query}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          id="example1"
                          className="table table-bordered table-striped"
                        >
                          <thead>
                            <tr>
                              {headerList.map((item, index) => (
                                <th
                                  key={index}
                                  style={{
                                    width: "5%",
                                    fontFamily: "Saira, sans-serif",
                                  }}
                                >
                                  {item}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>{this.renderReports()}</tbody>
                          {/* <tbody>
                            <tr>
                              <td
                                style={{ fontWeight: "600", color: "#003A88" }}
                              >
                                Tổng cộng
                              </td>
                              {defaultHeaderList.map((item, index) => (
                                <td
                                  key={index}
                                  style={{
                                    fontWeight: "600",
                                    color: "#003A88",
                                  }}
                                >
                                  10626000
                                </td>
                              ))}
                            </tr>
                          </tbody> */}

                          <tfoot></tfoot>
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-5">
                        <div
                          className="dataTables_info"
                          id="example1_info"
                          role="status"
                          aria-live="polite"
                        >
                          Hiển thị 1 đến {select} trong {totalDocuments} mục
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example1_paginate"
                        >
                          <ul className="pagination" style={{ float: "right" }}>
                            {this.renderPageButtons()}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, {})(SaleReport);

const menuStyle = {
  display: "inline-block",
  width: "94%",
  margin: "0 0 20px 30px",
};

const container = {
  flexDirection: "row",
  display: "flex",
};
