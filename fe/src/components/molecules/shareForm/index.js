import Button from 'components/atoms/button';
import Input from 'components/atoms/input';
import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';

const ShareForm = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      youtubeUrl: '',
    },
    onSubmit: handleSubmit,
  });
  return (
    <ShareFormContainerStyled onSubmit={formik.handleSubmit}>
      <ShareFormFieldSet>
        <legend>Share a Youtube movie</legend>
        <ShareFormInputContainer>
          <label>Youtube URL: </label>
          <Input {...formik.getFieldProps('youtubeUrl')} />
        </ShareFormInputContainer>
        <Button type="submit">Share</Button>
      </ShareFormFieldSet>
    </ShareFormContainerStyled>
  );
};

const ShareFormInputContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const ShareFormContainerStyled = styled.form`
  display: flex;
  gap: 12px;
`;

const ShareFormFieldSet = styled.fieldset`
  padding: 48px;
  text-align: center;
`;

export default ShareForm;
