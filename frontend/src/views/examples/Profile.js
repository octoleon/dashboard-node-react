// import React from "react";
// import axios from "axios";
// // import"../index.css";
// // reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   Container,
//   Row,
//   Col
// } from "reactstrap";
// // core components
// import UserHeader from "components/Headers/UserHeader.js";

// class Profile extends React.Component {
//   constructor(props){
//     super(props);
//     let all_data = JSON.parse(localStorage.getItem('data'));
//     let role = all_data.user.role;
//     let status = all_data.user.status;
//     if(role == 1){
//       role = 'Manager';
//     }
//     if(role == 2){
//       role = 'Inspector';
//     }
//     if(role == 3){
//       role = 'Employee';
//     }

//     if(!status){
//       status = 'N/A'
//     }
//     this.state = {
//       user_name: all_data.user.name,
//       user_image: all_data.user.imageUrl,
//       user_role: role,
//       organization_name: all_data.organization.organization_data.name,
//       user_email: all_data.user.email,
//       Employment_status: status
//     }
//   }

//   render() {
//     return (
//       <>
//         <UserHeader />
//         {/* Page content */}
//         <Container className="mt--7 user-header" fluid>
//           <Row>
//             <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
//               <Card className="card-profile shadow">
//                 <Row className="justify-content-center">
//                   <Col className="order-lg-2" lg="3">
//                     <div className="card-profile-image">
//                       <a href="#pablo" onClick={e => e.preventDefault()}>
//                       {this.state.user_image? <img
//                         alt="..." style={{borderRadius: '100%'}}
//                         src={this.state.user_image}
//                       /> : <img
//                         alt="..." style={{borderRadius: '100%'}}
//                         src={require("assets/img/theme/user_avatar.png")}
//                       />}
//                       </a>
//                     </div>
//                   </Col>
//                 </Row>
//                 <CardBody className="pt-0 pt-md-6">
//                   <Row>
//                     <div className="col">
//                       <div className="card-profile-stats d-flex justify-content-center mt-md-5">
//                         <div>
//                           <span className="description">{this.state.user_name}</span>
//                           <br/>
//                       <span className="description">{this.state.user_role}</span>
//                         </div>
//                        </div>
//                     </div>
//                   </Row>
                 
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col className="order-xl-1" xl="8">
//               <Card className="bg-secondary shadow">
//                 {/* <CardHeader className="bg-white border-0">
//                   <Row className="align-items-center">
//                     <Col xs="8">
//                       <h3 className="mb-0">My account</h3>
//                     </Col>
//                   </Row>
//                 </CardHeader> */}
//                 <CardBody>
//                   <Form>
//                     <h6 className="heading-small text-muted mb-4">
//                       User information
//                     </h6>
//                     <div className="pl-lg-4">
//                       <Row>
//                         <Col lg="6">
//                           <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor="input-username"
//                             >
//                               Organization
//                             </label>
//                             <Input
//                               className="form-control-alternative"
//                               id="input-organization"
//                               value={this.state.organization_name}
//                               type="text"
//                               disabled
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col lg="6">
//                           <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor="input-email"
//                             >
//                               Email address
//                             </label>
//                             <Input
//                               className="form-control-alternative"
//                               id="input-email"
//                               value={this.state.user_email}
//                               type="email"
//                               disabled
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg="6">
//                           <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor="input-first-name"
//                             >
//                               Full name
//                             </label>
//                             <Input
//                               className="form-control-alternative"
//                               value={this.state.user_name}
//                               id="input-first-name"
//                               type="text"
//                               disabled
//                             />
//                           </FormGroup>
//                         </Col>
                         
                        
//                         <Col lg="6">
//                         <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor=""
//                             >
//                               Employee Status
//                             </label>
//                             <Input
//                               className="form-control-alternative"
//                               value={this.state.Employment_status}
//                               id="Employee"
//                               type="text"
//                               disabled
//                             />
//                           </FormGroup>
                         
//                         </Col>
//                       </Row>
//                     </div>
//                   </Form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </>
//     );
//   }
// }

// export default Profile;
