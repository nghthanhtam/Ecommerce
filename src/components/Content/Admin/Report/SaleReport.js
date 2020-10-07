import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAllInvoices } from "../../../../actions/invoiceActions";
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

class SaleReport extends Component {
  state = {
    // data: [{ name: 'Page A', pv: 200, amt: 2400 },
    // { name: 'Page B', pv: 6000, amt: 2400 },
    yearData: [
      {
        label: "2018",
        value: "2018",
      },
      {
        label: "2019",
        value: "2019",
      },
    ],
    monthData: [
      {
        label: "11",
        value: "11",
      },
      {
        label: "12",
        value: "12",
      },
    ],
    data: [],
    options: [],
    idMaterial: "",
    selectedYear: "",
    selectedMonth: "",
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
  };

  componentDidMount() {
    this.props.getAllInvoices("");
    //this.setState({ selectedYear: (new Date()).getFullYear() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { selectedYear, selectedMonth } = this.state;
    if (selectedYear === "") return;

    //ng dung chon thang thi hien thi 4 tuan trong thang
    //ng dung ko chon thang ma chi chon nam thi hien thi 12 thang trong nam do

    if (prevState.selectedYear !== selectedYear) {
      if (selectedMonth === "") {
        this.setState((state) => {
          let data = [...state.data];
          for (let i = 0; i < 12; i++) {
            data.push({ total: 0, month: i + 1, amt: 2400 });
          }
          this.props.invoice.invoices.map((el) => {
            if (new Date(el.createddate).getFullYear() == selectedYear) {
              let month = new Date(el.createddate).getMonth() + 1;
              switch (month) {
                case 1:
                  data[0]["total"] += el.totalAmt;
                  return true;
                case 2:
                  data[1]["total"] += el.totalAmt;
                  return true;
                case 3:
                  data[2]["total"] += el.totalAmt;
                  return true;
                case 4:
                  data[3]["total"] += el.totalAmt;
                  return true;
                case 5:
                  data[4]["total"] += el.totalAmt;
                  return true;
                case 6:
                  data[5]["total"] += el.totalAmt;
                  return true;
                case 7:
                  data[6]["total"] += el.totalAmt;
                  return true;
                case 8:
                  data[7]["total"] += el.totalAmt;
                  return true;
                case 9:
                  data[8]["total"] += el.totalAmt;
                  return true;
                case 10:
                  data[9]["total"] += el.totalAmt;
                  return true;
                case 11:
                  data[10]["total"] += el.totalAmt;
                  return true;
                case 12:
                  data[11]["total"] += el.totalAmt;
                  return true;
                default:
                  return false;
              }
            }
          });
          return {
            data,
          };
        });
      }
    }

    if (prevState.selectedMonth !== selectedMonth) {
      this.setState((state) => {
        let data = [...state.data];
        data = [];
        for (let i = 0; i < 4; i++) {
          data.push({ total: 0, month: i + 1, amt: 2400 });
          //month dong tren dung ra la "week" nhung luoi ve lai chart :)
        }
        this.props.invoice.invoices.map((el) => {
          if (new Date(el.createddate).getFullYear() == selectedYear) {
            if (new Date(el.createddate).getMonth() + 1 == selectedMonth) {
              let date = new Date(el.createddate).getDate();

              switch (date) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                  data[0]["total"] += el.totalAmt;
                  return true;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                  data[1]["total"] += el.totalAmt;
                  return true;
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                  data[2]["total"] += el.totalAmt;
                  return true;
                default:
                  data[3]["total"] += el.totalAmt;
                  return true;
              }
            }
          }
        });
        return {
          data,
        };
      });
    }
  }

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

    console.log(ranges.selection);
  };

  render() {
    const { isLoaded } = this.props;
    const {
      options,
      yearData,
      monthData,
      selectionRange,
      select,
      sort,
      totalDocuments,
    } = this.state;

    return (
      <Fragment>
        {/* {!isLoaded ? (
                    <Loader></Loader>
                ) : ( */}
        {/* Content Header (Page header) */}

        <section className="content">
          <div className="row">
            {/* left column */}
            <div className="col-md-12">
              <div className="box">
                {/* /.box-header */}
                <div className="box-body">
                  <div className="box-body">
                    <strong> Material</strong>
                    <Select
                      name="idMember"
                      id="idMember"
                      onMenuOpen={this.onMenuOpen}
                      onChange={this.onChangeSelectedMaterial}
                      isSearchable={true}
                      options={options}
                      placeholder="Select material..."
                      required
                    ></Select>
                    {/* <input
                                        style={{ opacity: 0, height: 0 }}
                                         required
                                        value={invisibleInpMemVal}
                                        /> */}
                    <br />

                    <div style={container}>
                      <div style={menuStyle}>
                        <strong> Year</strong>
                        <Select
                          onChange={this.onChangeSelectedYear}
                          isSearchable={true}
                          options={yearData}
                          placeholder="Select year..."
                        ></Select>
                      </div>
                      <div style={menuStyle}>
                        <strong> Month</strong>
                        <Select
                          onChange={this.onChangeSelectedMonth}
                          isSearchable={true}
                          options={monthData}
                          placeholder="Select month..."
                        ></Select>
                      </div>
                    </div>
                  </div>
                  <br />
                  {/* /.box-body */}
                  <BarChart
                    fill="#8884d8"
                    width={700}
                    height={300}
                    data={this.state.data}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" barSize={40} />
                  </BarChart>
                  <br />
                </div>

                {/* /.row */}
              </div>
            </div>
          </div>
          <div className="row">
            {/* left column */}
            <div className="col-md-12">
              <div className="box">
                {/* /.box-header */}
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
                                onChange={this.onChangeSelectedYear}
                                isSearchable={true}
                                options={yearData}
                                placeholder="Chọn..."
                              ></Select>
                            </div>
                            <div style={menuStyle}>
                              <h4> Sắp xếp theo</h4>
                              <Select
                                onChange={this.onChangeSelectedYear}
                                isSearchable={true}
                                options={yearData}
                                placeholder="Chọn..."
                              ></Select>
                            </div>
                          </div>

                          <div style={menuStyle}>
                            <h4> Tình trạng đơn</h4>
                            <Select
                              onChange={this.onChangeSelectedYear}
                              isSearchable={true}
                              options={yearData}
                              placeholder="Chọn..."
                            ></Select>
                          </div>
                          <div style={menuStyle}>
                            <h4> Giá trị đơn hàng</h4>
                            <div class="row">
                              <div class="col-xs-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Từ..."
                                />
                              </div>

                              <div class="col-xs-3">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đến..."
                                />
                              </div>
                            </div>
                          </div>
                          <div style={menuStyle}>
                            <h4> Số hàng</h4>
                            <Select
                              onChange={this.onChangeSelectedYear}
                              isSearchable={true}
                              options={yearData}
                              placeholder="Chọn..."
                            ></Select>
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
                              <th
                                style={{
                                  width: "5%",
                                  fontFamily: "Saira, sans-serif",
                                }}
                              >
                                Đơn hàng
                              </th>
                              <th
                                style={{
                                  width: "5%",
                                  fontFamily: "Saira, sans-serif",
                                }}
                              >
                                Khách hàng
                              </th>
                              <th
                                style={{
                                  width: "5%",
                                  fontFamily: "Saira, sans-serif",
                                }}
                              >
                                Sản phẩm
                              </th>
                              <th
                                style={{
                                  width: "5%",
                                  fontFamily: "Saira, sans-serif",
                                }}
                              >
                                Số lượng tồn
                              </th>
                            </tr>
                          </thead>
                          {/* <tbody>{this.renderProducts()}</tbody> */}
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
                            {/* {this.renderPageButtons()} */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/.col (left) */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* )} */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoaded: state.member.isLoaded,
  member: state.member,
  invoice: state.invoice,
});

export default connect(mapStateToProps, { getAllInvoices })(SaleReport);

const menuStyle = {
  display: "inline-block",
  width: "94%",
  margin: "0 0 20px 30px",
};

const container = {
  flexDirection: "row",
  display: "flex",
};
