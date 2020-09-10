// import React from "react";
// // node.js library that concatenates classes (strings)
// // javascipt plugin for creating charts
// import Chart from "chart.js";
// // react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// import $ from "jquery";
// import DataTable from "datatables.net";
// import axios from "axios";
// // import { getAccessToken } from "accessToken";

// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   NavItem,
//   NavLink,
//   Nav,
//   Progress,
//   Table,
//   Container,
//   Row,
//   Col
// } from "reactstrap";

// // core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2
// } from "variables/charts.js";
// import { baseURL } from "../../constants";
// import Header from "components/Headers/Header.js";

// class Statistics extends React.Component {
//   constructor(props) {
//     super(props);

//     var str = window.location.href;
//     var pieces = str.split("/");
//     var base_url = pieces[0] + "//" + pieces[2];

//     this.state = {
//       activeNav: 1,
//       chartExample1Data: "data1",
//       base_url: base_url,
//       locations_chart: false,
//       top_ten_location_chart: null,
//       top_ten_employees_chart: null,
//       employees_chart: false,
//       inspectedOrdersPlacedAtChart: false,
//       ordersPlacedChart: null,
//       inspectedOrdersCompletedAtChart: false,
//       ordersCompletedChart: null,
//       maxDurationsChart: false,
//       maxDurationInspectionsChart: null
//     };
//     if (window.Chart) {
//       parseOptions(Chart, chartOptions());
//     }
//   }
//   toggleNavs = (e, index) => {
//     e.preventDefault();
//     this.setState({
//       activeNav: index,
//       chartExample1Data:
//         this.state.chartExample1Data === "data1" ? "data2" : "data1"
//     });
//   };

//   async componentDidMount() {
//     var org_id = JSON.parse(localStorage.getItem("data"));
//     org_id = org_id.user.organizationId;

//     var url = this.state.base_url;
//     url = url.split("/");
//     var domain = url[2].split(":");
//     url = url[0] + "//" + domain[0];
//     if (domain.length > 1) {
//       var url_with_port = url + ":" + domain[1];
//     } else {
//       var url_with_port = url;
//     }

//     axios.defaults.withCredentials = true;
//     const config = {
//       headers: {
//         "content-type": "application/json",
//         authorization: "bearer " + getAccessToken()
//       },
//       withCredentials: true
//     };

//     const server_url = baseURL + "/get_all_stats";
//     await axios
//       .post(server_url, { organization_id: org_id }, config)
//       .then(async response => {
//         console.log(response.data);
//         var top_ten_locations_graph_data_array = [];
//         var top_ten_employee_graph_data_array = [];
//         var top_ten_locations_graph_full_locations = [];
//         var top_ten_locations_graph_labels = [];

//         function getRandomColor() {
//           var letters = "0123456789ABCDEF";
//           var color = "#";
//           for (var i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//           }
//           return color;
//         }

//         var chartColors1 = {
//           red: "rgb(255, 99, 132)",
//           yellow: getRandomColor()
//         };
//         var chartColors2 = {
//           red: "rgb(255, 99, 132)",
//           yellow: getRandomColor()
//         }; var chartColors3 = {
//           red: "rgb(255, 99, 132)",
//           yellow: getRandomColor()
//         }; var chartColors4 = {
//           red: "rgb(255, 99, 132)",
//           yellow: getRandomColor()
//         }; var chartColors5 = {
//           red: "rgb(255, 99, 132)",
//           yellow: getRandomColor()
//         };

//         for (var i = 0; i < 10; i++) {
//           if (response.data[1][i]) {
//             var location_data = response.data[1][i].count;
//             top_ten_locations_graph_data_array.push(location_data);

//             var location_path = response.data[1][i].path;
//             top_ten_locations_graph_full_locations.push(location_path);

//             var location_label = response.data[1][i].name;
//             top_ten_locations_graph_labels.push(location_label);
//           } else {
//             top_ten_locations_graph_data_array.push(0);
//             top_ten_locations_graph_full_locations.push("");
//             top_ten_locations_graph_labels.push("");
//           }
//         }

//         var counter = 0;
//         for (let key in response.data[0]) {
//           var employee_data = response.data[0][key].count;
//           top_ten_employee_graph_data_array.push(employee_data);

//           counter++;
//         }

//         for (var j = counter; j < 10; j++) {
//           top_ten_employee_graph_data_array.push(0);
//         }
//         let ttlchart = {
//           options: {
//             tooltips: {
//               filter: function(tooltipItem, data) {
//                 if (tooltipItem.label != "") {
//                   return tooltipItem.datasetIndex === 0;
//                 } else {
//                   return false;
//                 }
//               },
//               callbacks: {
//                 label: function(item, data) {
//                   var label = "";
//                   var yLabel = item.yLabel;
//                   var content = "";
//                   if (data.datasets.length > 1) {
//                     content += label;
//                   }
//                   content += yLabel;
//                   return "Snap Inspection: " + content;
//                 },
//                 title: function(item, data) {
//                   if (item.length > 0) {
//                     return data.full_locations[item[0].index];
//                   }
//                 }
//               }
//             },
//             legend: {
//               display: true,
//               position: "top"
//             },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     maxTicksLimit: 7,
//                     display: true,
//                     min: 0,
//                     stepSize: 1
//                   },
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ],
//               xAxes: [
//                 {
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ]
//             }
//           },
//           data: {
//             full_locations: top_ten_locations_graph_full_locations,
//             labels: top_ten_locations_graph_labels,
//             datasets: [
//               {
//                 label: "Snap Inspections",
//                 backgroundColor: [
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow,
//                   chartColors1.yellow
//                 ],
//                 data: top_ten_locations_graph_data_array,
//                 maxBarThickness: 50
//               }
//             ]
//           }
//         };

//         // Start Top 10 Employees Data
//         let topTenEmpGraphLabels = [];
//         let empChartDataArray = [];
//         let empGraphRoughData = response.data[0];
//         for (let i = 0; i < 10; i++) {
//           if (empGraphRoughData[i]) {
//             topTenEmpGraphLabels.push(empGraphRoughData[i].name);
//             empChartDataArray.push(empGraphRoughData[i].count);
//           } else {
//             topTenEmpGraphLabels.push("");
//             //empChartDataArray.push(0);
//           }
//         }

//         let tteChart = {
//           options: {
//             legend: {
//               display: true,
//               position: "top"
//             },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     maxTicksLimit: 5,
//                     display: true,
//                     min: 0,
//                     stepSize: 1
//                   },
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ],
//               xAxes: [
//                 {
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ]
//             }
//           },
//           data: {
//             labels: topTenEmpGraphLabels,
//             datasets: [
//               {
//                 label: "Snap Inspections",
//                 backgroundColor: [
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow,
//                   chartColors2.yellow
//                 ],
//                 data: empChartDataArray,
//                 maxBarThickness: 50
//               }
//             ]
//           }
//         };

//         // End Top 10 Employees Data

//         // Start Graph Data 3 ////////////////////////////////////////////
//         let inspectionOrdersPlacedLabel = [
//           "8AM",
//           "9AM",
//           "10AM",
//           "11AM",
//           "12PM",
//           "1PM",
//           "2PM",
//           "3PM",
//           "4PM",
//           "5PM",
//           "6PM",
//           "7PM",
//           "8PM",
//           "9PM",
//           "10PM",
//           "11PM",
//           "12AM",
//           "1AM",
//           "2AM",
//           "3AM",
//           "4AM",
//           "5AM",
//           "6AM",
//           "7AM"
//         ];
//         let inspectedOrdersPlacedDataArray = [];

//         let inspectedOrdersRoughData = response.data[2];

//         for (let key in inspectedOrdersRoughData) {
//           let index = inspectionOrdersPlacedLabel.findIndex(
//             label => label === key
//           );
//           inspectedOrdersPlacedDataArray[index] =
//             inspectedOrdersRoughData[key].count;
//         }

//         let inspectionOrdersPlacedAtChart = {
//           options: {
//             legend: {
//               display: true,
//               position: "top"
//             },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     maxTicksLimit: 5,
//                     display: true,
//                     min: 0,
//                     stepSize: 1
//                   },
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ],
//               xAxes: [
//                 {
//                   ticks: {
//                     maxTicksLimit: 10,
//                     display: true
//                   },
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ]
//             }
//           },
//           data: {
//             labels: inspectionOrdersPlacedLabel,
//             datasets: [
//               {
//                 label: "Inspection Orders",
//                 backgroundColor: [
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow,
//                   chartColors3.yellow
//                 ],
//                 data: inspectedOrdersPlacedDataArray,
//                 maxBarThickness: 50
//               }
//             ]
//           }
//         };

//         // End Graph Data 3 ////////////////////////////////////////////////////////////

//         // Start Graph Data 4 ////////////////////////////////////////////
//         let inspectionOrdersCompletedLabel = [
//           "8AM",
//           "9AM",
//           "10AM",
//           "11AM",
//           "12PM",
//           "1PM",
//           "2PM",
//           "3PM",
//           "4PM",
//           "5PM",
//           "6PM",
//           "7PM",
//           "8PM",
//           "9PM",
//           "10PM",
//           "11PM",
//           "12AM",
//           "1AM",
//           "2AM",
//           "3AM",
//           "4AM",
//           "5AM",
//           "6AM",
//           "7AM"
//         ];
//         let inspectedOrdersCompletedDataArray = [];

//         let inspectedsCompletedRoughData = response.data[3];

//         for (let key in inspectedsCompletedRoughData) {
//           let index = inspectionOrdersCompletedLabel.findIndex(
//             label => label === key
//           );
//           inspectedOrdersCompletedDataArray[index] =
//             inspectedsCompletedRoughData[key].count;
//         }
//         let inspectionOrdersCompletedAtChart = {
//           options: {
//             legend: {
//               display: true,
//               position: "top"
//             },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     maxTicksLimit: 5,
//                     display: true,
//                     min: 0,
//                     stepSize: 1
//                   },
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ],
//               xAxes: [
//                 {
//                   ticks: {
//                     maxTicksLimit: 10,
//                     display: true
//                   },
//                   gridLines: {
//                     display: true,
//                     lineWidth: 1
//                   }
//                 }
//               ]
//             }
//           },
//           data: {
//             labels: inspectionOrdersCompletedLabel,
//             datasets: [
//               {
//                 label: "Snap Inspections Completed",
//                 backgroundColor: [
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow,
//                   chartColors4.yellow
//                 ],
//                 data: inspectedOrdersCompletedDataArray,
//                 maxBarThickness: 50
//               }
//             ]
//           }
//         };

//         // End Graph Data 4 ////////////////////////////////////////////////////////////


//       //  Start Graph Data 5 //////////////////////////////////////////////////////////
//       let mostDurationsRoughData = response.data[4];
//            let maxDurationedInspectionsLabel =[];
//            let maxDurationedInspectionsData =[];
//            let durationsTextArr = [];
//            for(let i=0 ; i<mostDurationsRoughData.length;i++){
//                const {name,duration,durationText} = mostDurationsRoughData[i]
//                maxDurationedInspectionsData.push(duration);;
//                maxDurationedInspectionsLabel.push(name);
//                durationsTextArr.push(durationText);
//            }
//            let maxDurationsChart = {
//             options: {
              
//             tooltips: {
//               filter: function(tooltipItem, data) {
//                 console.log(tooltipItem , data);
//                 return "hello"
//               },
//               callbacks: {
//                 label: function(item, data) {
//                   return data.durationsTextArr[item.index]
//                   },
//                 title: function(item, data) {
//                   return "Duration"
//                 }
//               }
//             },
//               legend: {
//                 display: true,
//                 position: "top"
//               },
//               scales: {
//                 yAxes: [
//                   {
//                     scaleLabel: {
//                       display: true,
//                       labelString: 'Duration'
//                     },
//                     ticks: {
//                       maxTicksLimit: 5,
//                       display: true,
//                       min: 0,
//                       stepSize: 1,
//                       callback: function(label, index, labels) {
//                         if(label > 24){
//                            label = Math.round(label/24);
//                           return label+" days";
//                         }else{
//                            return label+" hours";
//                         }
//                       }
//                     },
//                     gridLines: {
//                       display: true,
//                       lineWidth: 1
//                     }
//                   }
//                 ],
//                 xAxes: [
//                   {
//                     scaleLabel: {
//                       display: true,
//                       labelString: 'Location'
//                     },
//                     gridLines: {
//                       display: true,
//                       lineWidth: 1
//                     }
//                   }
//                 ]
//               }
//             },
//             data: {
//               durationsTextArr : durationsTextArr,
//               labels: maxDurationedInspectionsLabel,
//               datasets: [
//                 {
//                   label: "Hours",
//                   backgroundColor: [
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow,
//                     chartColors5.yellow
//                   ],
//                   data: maxDurationedInspectionsData,
//                   maxBarThickness: 50
//                 }
//               ]
//             }
//           };
//       // End Graph Data 5 /////////////////////////////////////////////////////////////



//         this.setState({
//           top_ten_location_chart: ttlchart,
//           locations_chart: true,
//           top_ten_employees_chart: tteChart,
//           employees_chart: true,
//           inspectedOrdersPlacedAtChart: true,
//           ordersPlacedChart: inspectionOrdersPlacedAtChart,
//           inspectedOrdersCompletedAtChart: true,
//           ordersCompletedChart: inspectionOrdersCompletedAtChart,
//           maxDurationsChart: true,
//       maxDurationInspectionsChart: maxDurationsChart
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   render() {
//     return (
//       <>
//         {/* <Header /> */}
//         {/* Page content */}

//         <Container style={{paddingLeft:"15px !important" , paddingRight : "15px !important"}}>
//           <Row>
//             <Col xl="6">
//               <Card className="shadow">
//                 <CardHeader className="bg-transparent">
//                   <Row className="align-items-center">
//                     <div className="col">
//                       <h6 className="text-uppercase text-muted ls-1 mb-1">
//                         Performance
//                       </h6>
//                       <h2 className="mb-0">
//                         Top 10 Employees who Completed snap inspections in last
//                         30 days
//                       </h2>
//                     </div>
//                   </Row>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="chart">
//                     {this.state.locations_chart ? (
//                       <Bar
//                         data={this.state.top_ten_employees_chart.data}
//                         options={this.state.top_ten_employees_chart.options}
//                       />
//                     ) : (
//                       <h3>Loading ...</h3>
//                     )}
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col xl="6">
//               <Card className="shadow">
//                 <CardHeader className="bg-transparent">
//                   <Row className="align-items-center">
//                     <div className="col">
//                       <h6 className="text-uppercase text-muted ls-1 mb-1">
//                         Performance
//                       </h6>
//                       <h2 className="mb-0">Top 10 Inspected Locations</h2>
//                     </div>
//                   </Row>
//                 </CardHeader>
//                 <CardBody>
//                   {/* Chart */}
//                   <div className="chart">
//                     {this.state.locations_chart ? (
//                       <Bar
//                         data={this.state.top_ten_location_chart.data}
//                         options={this.state.top_ten_location_chart.options}
//                       />
//                     ) : (
//                       <h3>Loading ...</h3>
//                     )}
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//           <Row className="mt-4">
//             <Col xl="6">
//               <Card className="shadow">
//                 <CardHeader className="bg-transparent">
//                   <Row className="align-items-center">
//                     <div className="col">
//                       <h6 className="text-uppercase text-muted ls-1 mb-1">
//                         Performance
//                       </h6>
//                       <h2 className="mb-0">
//                         Most inspection orders placed at, in last 30 days
//                       </h2>
//                     </div>
//                   </Row>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="chart">
//                     {this.state.inspectedOrdersPlacedAtChart ? (
//                       <Bar
//                         data={this.state.ordersPlacedChart.data}
//                         options={this.state.ordersPlacedChart.options}
//                       />
//                     ) : (
//                       <h3>Loading ...</h3>
//                     )}
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col xl="6">
//               <Card className="shadow">
//                 <CardHeader className="bg-transparent">
//                   <Row className="align-items-center">
//                     <div className="col">
//                       <h6 className="text-uppercase text-muted ls-1 mb-1">
//                         Performance
//                       </h6>
//                       <h2 className="mb-0">
//                         Most inspection orders completed at, in last 30 days
//                       </h2>
//                     </div>
//                   </Row>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="chart">
//                     {this.state.inspectedOrdersCompletedAtChart ? (
//                       <Bar
//                         data={this.state.ordersCompletedChart.data}
//                         options={this.state.ordersCompletedChart.options}
//                       />
//                     ) : (
//                       <h3>Loading ...</h3>
//                     )}
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//           <Row className="mt-4">
//             <Col xl="12">
//               <Card className="shadow">
//                 <CardHeader className="bg-transparent">
//                   <Row className="align-items-center">
//                     <div className="col">
//                       <h6 className="text-uppercase text-muted ls-1 mb-1">
//                         Performance
//                       </h6>
//                       <h2 className="mb-0">Top 10 max time durations spent on a snap inspection in last 30 days</h2>
//                     </div>
//                   </Row>
//                 </CardHeader>
//                 <CardBody>
//                 <div className="chart">
//                     {this.state.maxDurationsChart ? (
//                        <Bar
//                        data={this.state.maxDurationInspectionsChart.data}
//                        options={this.state.maxDurationInspectionsChart.options}
//                      />
//                     ) : (
//                       <h3>Loading ...</h3>
//                     )}</div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//           {/* DataTable */}
//         </Container>
     
//       </>
//     );
//   }
// }

// export default Statistics;
