import { FC } from 'react';
import { Formik, Form } from 'formik';
import {
  Button, Input, Form as AntForm,
} from 'antd';
import { Link } from 'react-router-dom';
import ImageSlideshow from '../../component/ImageSlideShow';
import { validationSchema } from '../../validation/SignUp';

import './style.css';

const SignUp:FC = () => (
  <div className="auth-container">
    <ImageSlideshow />

    <div>
      <div className="auth-form">
        <i
          aria-label="Instagram"
          className="logo"
          role="img"
        />
        <h4 className="auth-brief">Sign up to see photos and videos from your friends.</h4>

        <Formik
          initialValues={{
            email: '',
            fullName: '',
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            values, errors, touched, handleChange, handleBlur, isSubmitting,
          }) => (
            <Form>
              <AntForm.Item
                validateStatus={
              errors.email && touched.email ? 'error' : 'success'
            }
                help={errors.email}
                className="form-item"
              >
                <Input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </AntForm.Item>

              <AntForm.Item
                validateStatus={
              errors.fullName && touched.fullName ? 'error' : 'success'
            }
                help={errors.fullName}
                className="form-item"
              >
                <Input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />
              </AntForm.Item>

              <AntForm.Item
                validateStatus={
                errors.username && touched.username ? 'error' : 'success'
              }
                help={errors.username}
                className="form-item"
              >
                <Input
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </AntForm.Item>

              <AntForm.Item
                validateStatus={
              errors.password && touched.password ? 'error' : 'success'
            }
                help={errors.password}
                className="form-item"
              >
                <Input
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </AntForm.Item>
              <p className="privacy-msg">
                People who use our service may have uploaded your contact
                information to Instagram.
              </p>
              <p className="privacy-msg">
                By signing up, you agree to our Terms ,
                Privacy Policy and Cookies Policy .
              </p>

              <Button
                className="form-item"
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="have-account">
        <p>
          Have an account?
          {'  '}
          <Link to="/sign-in">Log In</Link>
        </p>
      </div>
    </div>

  </div>
);

export default SignUp;
