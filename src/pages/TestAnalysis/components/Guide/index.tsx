import * as React from 'react';
import { Input, Form, Field } from '@alifd/next';
// import styles from './index.module.scss';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const Guide = () => {
  const field = Field.useField();

  const { init } = field;

  const handleSubmit = (val)=>{
    // debugger;
    console.log(`handleSubmit  ${val.input}`);
  }

  return (
    <Form {...formItemLayout} field={field}>

      <Form.Item label="test" key="test2">
        <Input {...init('input', {
          // initValue: 'test',  
          rules: [{
          }]
        })} />
      </Form.Item>
      <FormItem wrapperCol={{ offset: 6 }} >
        <Form.Submit validate onClick={handleSubmit} type="primary">Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </FormItem>
    </Form>
  );
};

export default Guide;
