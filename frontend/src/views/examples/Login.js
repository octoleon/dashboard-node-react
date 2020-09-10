import React from "react";
import axios from "axios";
import alertify from "alertifyjs";
import { baseURL } from "../../constants";
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
  Col
} from "reactstrap";
import { handleAuthenticated } from "redux/actions/authActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      userEmail: "",
      userPassword: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange = event => {
    const userEmail = event.target.value;
    this.setState({ userEmail });
  };

  handleChange = event => {
    const userPassword = event.target.value;
    this.setState({ userPassword });
  };
  userEmail = e => {
    this.setState({ userEmail: e.target.value });
  };
  userPassword = e => {
    this.setState({ userPassword: e.target.value });
  };
  LoginHundler = e => {
    e.preventDefault();
    // loginUpHandler(this.state.userEmail, this.state.userPassword);
  };

  async handleClick() {
    let userEmail = this.state.userEmail;
    let userPassword = this.state.userPassword;
    console.log(userEmail, userPassword);
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };

    const call_url = baseURL + "/profiles/login";
    await axios
      .post(
        call_url,
        JSON.stringify({
          email: this.state.userEmail,
          password: this.state.userPassword
        }),
        config
      )
      .then(async res => {
        let { token } = res.data;

        if (token) {
          alertify.success("Logged in ");
          console.log("response============", res.data);
          this.props.handleAuth({
            status : true , token
          });
          this.props.history.push("/admin/index");
        } else {
          this.props.handleAuth({
            status : false , token : ''
          });
          alertify.error("something went wrong");
        }
      })
      .catch(error => {
        console.log(error);
        this.props.handleAuth({
          status : false , token : ''
        });
        alertify.error("There is an error");
      });
  }
  render(props) {
    const { userEmail, userPassword } = this.state;

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small onClick={this.props.getCollections}>
                  Or sign in with credentials{" "}
                  {JSON.stringify(this.props.collection)}
                </small>
              </div>
              <Form
                role="form"
                onSubmit={this.LoginHundler}
                onError={errors => console.log(errors)}
              >
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      autoComplete="off"
                      label="Email"
                      onChange={this.userEmail}
                      name="email"
                      value={userEmail}
                      type="text"
                      id="email"
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
                      autoComplete="off"
                      label="Password"
                      onChange={this.userPassword}
                      name="password"
                      value={userPassword}
                      type="password"
                      id="pass"
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button
                    className="my-4 lazy"
                    color="primary"
                    onClick={this.handleClick}
                    type="submit"
                  >
                    Log in
                  </Button>
                  <Button
                    className="my-4 lazy"
                    color="primary"
                    href="/auth/register"
                  >
                    Register
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
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

export default connect(null,mapDispatchToProps)(Login);
