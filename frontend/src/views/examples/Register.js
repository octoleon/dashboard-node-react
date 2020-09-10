import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./index.css";
import alertify from "alertifyjs";
import validator from "validator";
import OtpInput from "react-otp-input";
import { baseURL } from "../../constants";
import axios from "axios";
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Modal
} from "reactstrap";
import { handleAuthenticated } from "redux/actions/authActions";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      phone: "",
      name: "",
      email: "",
      password: "",
      otpModalOpen: false
    };
  }

  handleChangeOtp = otp => {
    console.log(otp);
    this.setState({ otp });
  };

  handleOtp = async e => {
    e.preventDefault();
    let { phone, password, name, email } = this.state;
    console.log(password, name, email, phone);
    if (validator.isEmpty(name)) {
      alertify.error("Name Cannot be empty");
      return;
    }
    if (validator.isEmpty(email)) {
      alertify.error("Email Cannot be empty");
      return;
    }

    if (validator.isEmpty(password)) {
      alertify.error("Password Cannot be empty");
      return;
    }
    if (validator.isEmpty(phone)) {
      alertify.error("Phone Number Cannot be empty");
      return;
    }

    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    const call_url = baseURL + "/getOtp";
    await axios
      .post(call_url, JSON.stringify({ phone, email }), config)
      .then(async res => {
        console.log(res);
        let { smsRes, authy_id } = res.data;
        console.log(res.data);
        if (smsRes.success) {
          alertify.success("Sent code as SMS");
          this.setState({
            otpModalOpen: true,
            authy_id
          });
        } else {
          alertify.error("There is an error");
        }
      })
      .catch(error => {
        console.log(error);
        alertify.error("There is an error");
      });
  };
  registerUser = async e => {
    e.preventDefault();
    let { name, email, password, phone, authy_id, otp } = this.state;
    console.log(email, phone);
    console.log(typeof phone);
    console.log("OTP ===", otp);

    const config = {
      headers: {
        "content-type": "application/json"
      }
    };

    const call_url = baseURL + "/addProfile";
    await axios
      .post(
        call_url,
        JSON.stringify({ phone, password, email, name, otp, authy_id }),
        config
      )
      .then(async res => {
        console.log(res.data);
        let { token } = res.data;
        if (token) {
          alertify.success("Account Created Successfully");
          this.props.handleAuth({
            status: true,
            token
          });
          this.props.history.push("/admin/index");
        } else {
          alertify.error("There is an error");
          this.props.handleAuth({
            status: false,
            token: ""
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.props.handleAuth({
          status: false,
          token: ""
        });
        alertify.error("There is an error");
      });
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
      addingQuestionTemplateName: false
    });
  };
  render() {
    const { name, email, password } = this.state;
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <PhoneInput
                    country={"us"}
                    value={this.state.phone}
                    onChange={phone => this.setState({ phone })}
                  />
                </FormGroup>
                <Row className="my-4"></Row>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    onClick={this.handleOtp}
                  >
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.otpModalOpen}
          toggle={() => this.toggleModal("otpModalOpen")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="otpModalOpenLabel">
              OTP
            </h5>

            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("otpModalOpen")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div id="otp">
            <OtpInput
              style={{ margin: "0 auto" }}
              value={this.state.otp}
              onChange={this.handleChangeOtp}
              numInputs={7}
              separator={<span>-</span>}
            />
          </div>
          <Button
            type="submit"
            onClick={this.registerUser}
            className="submit"
            style={{
              backgroundColor: "#5E72E4",
              color: "white",
              width: "20%",
              margin: "0 auto",
              marginBottom: "17px",
              marginTop: "10px"
            }}
          >
            Submit
          </Button>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAuth: status => {
      dispatch(handleAuthenticated(status));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
