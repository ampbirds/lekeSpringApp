import React, { useRef, useState } from "react";
import { get, isEmpty, set } from "lodash-es";
import { FormBuilder } from "@jeremyling/react-material-ui-form-builder";
import { Avatar, Button, IconButton, InputAdornment } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { indigo, red } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import Service from './services/Services';
//import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function validate(refs, form) {
  for (const [attribute, ref] of Object.entries(refs.current)) {
    var errors;
    if (ref.validate) {
      errors = await ref.validate(get(form, attribute));
    }
    if (!isEmpty(errors)) {
      console.log(errors);
      return false;
    }
  }
  return true;
}

export default function Login(props) {
  const { setAuthType } = props;
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState();
  const history = useHistory();
  const refs = useRef({});
  const [showAlert, setshowAlert] = useState(false);
  const [showAlerts, setshowAlerts] = useState(false);
  const goto=()=>{
    history.push("/signUp")
  }

  const ValidateUser = async(e) =>{
 
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }else{
      console.log(form)
      let user = {  "email":form.email,
                    "password":form.password}
      Service.validateUser(user).then(res =>{
        console.log(res);
        if(res.data.status){
          setshowAlerts(true);
          setTimeout(() => {
            history.push("/getdata");
          }, 1000);
          setTimeout(() => {
            setshowAlerts(false);

          }, 5000);
          
        }else{
          setshowAlert(true);
          setTimeout(() => {
            setshowAlert(false);

          }, 5000);
        }

    });
  
    }
    console.log(form);
  }
  const updateForm = (updates) => {
    const copy = { ...form };
    for (const [key, value] of Object.entries(updates)) {
      set(copy, key, value);
    }
    setForm(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }
    console.log(form);
  };

  const fields = [
    {
      component: "custom",
      customComponent: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar style={{ backgroundColor: red[500], color: "white" }}>
            <LockOutlined />
          </Avatar>
        </div>
      )
    },
    {
      component: "display-text",
      title: "Log In",
      titleProps: {
        style: {
          fontSize: "20px",
          fontWeight: "bold"
        }
      },
      titleContainerProps: {
        style: {
          justifyContent: "center"
        }
      }
    },
    {
      attribute: "email",
      component: "text-field",
      label: "Email",
      props: {
        required: true
      },
      validations: {
        required: true,
        email: true
      }
    },
    {
      attribute: "password",
      component: "text-field",
      label: "Password",
      props: {
        type: showPassword ? "text" : "password",
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          style: {
            paddingRight: 0
          }
        },
        required: true
      },
      validations: {
        required: true,
        min: 8,
        matches: ["/[a-z]/i", "At least 1 lowercase or uppercase letter"],
        test: {
          name: "specialChar",
          test: (value) =>
            /[0-9~!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]/.test(value),
          message: "At least 1 number or special character"
        }
      }
    },
    {
      attribute: "remember",
      component: "checkbox-group",
      options: [
        {
          label: "Remember Me",
          value: true
        }
      ],
      optionConfig: {
        key: "label",
        label: "label",
        value: "value"
      }
    }
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "60%" }}>
        {/* <form > */}
        <Snackbar open={showAlert} autoHideDuration={5000} >
        <Alert severity="error" sx={{ width: '100%' }}>Incorrect Email Id or Password </Alert>
        </Snackbar>
        <Snackbar open={showAlerts} autoHideDuration={5000} >
        <Alert severity="success" sx={{ width: '100%' }}>Successfully logged in....</Alert>
        </Snackbar>
          <FormBuilder
            fields={fields}
            form={form}
            updateForm={updateForm}
            refs={refs}
          />
          <Button
            onClick={() => ValidateUser()}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "8px" }}
          >
            Log In
          </Button>
        {/* </form> */}
        <div>
          <Button
            onClick={() => console.log("Forgot Password")}
            style={{
              textTransform: "initial",
              marginTop: "16px",
              color: indigo[500]
            }}
          >
            Forgot Password?
          </Button>
        </div>
        <div>
          <Button
            onClick={() => goto()}
            style={{
              textTransform: "initial",
              color: indigo[500]
            }}
          >
            Don't have an account?
          </Button>
        </div>
        {/* <div style={{ marginTop: "16px" }}>{JSON.stringify(form, null, 2)}</div> */}
      </div>
    </div>
  );
}

Login.propTypes = {
  setAuthType: PropTypes.func
};
