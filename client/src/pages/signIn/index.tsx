/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import { Formik, Form } from 'formik';
import {
  Button, Input, Form as AntForm, message,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ImageSlideshow from '../../component/ImageSlideShow';
import { validationSchema } from '../../validation/SignIn';
import { IAuth } from '../../interfaces';
import { ApiService, JwtService } from '../../services';

import './style.css';

const SignIn:FC = () => {
  const navigate = useNavigate();

  const handleSignIn = async (body: IAuth, setSubmitting:any) => {
    try {
      const { data } = await ApiService.post('/api/v1/auth/signIn', body);
      JwtService.setToken(data.access_token);
      ApiService.setHeader();
      navigate('/');
    } catch (error:any) {
      message.error(error.response.data.message);
      message.config({
        maxCount: 1,
      });
      setSubmitting(false);
    }
  };

  return (
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
              setSubmitting(true);
              handleSignIn(values, setSubmitting);
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
                  help={touched.email && errors.email}
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
                  help={touched.password && errors.password}
                  className="form-item"
                >
                  <Input
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type="password"
                  />
                </AntForm.Item>
                <Button
                  className="form-item"
                  type="primary"
                  htmlType="submit"
                  disabled={
                  isSubmitting
                  || !values.email
                  || !values.password
                }
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
};

export default SignIn;
