/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import { Formik, Form } from 'formik';
import {
  Button, Input, Form as AntForm,
} from 'antd';
import { Link } from 'react-router-dom';
import ImageSlideshow from '../../component/ImageSlideShow';
import { validationSchema } from '../../validation/SignIn';

import './style.css';

const SignIn:FC = () => (
  <div className="auth-container">
    <ImageSlideshow />

    <div>
      <div className="auth-form">
        <i
          aria-label="Instagram"
          className="logo"
          role="img"
        />
        <h4 className="auth-brief">sign in to see photos and videos from your friends.</h4>

        <Formik
          initialValues={{
            email: '',
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
              <Button
                className="form-item"
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="have-account">
        <p>
          Don't have an account?
          {'  '}
          <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
    </div>

  </div>
);

export default SignIn;
