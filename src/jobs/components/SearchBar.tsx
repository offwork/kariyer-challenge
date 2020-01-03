import React, { PureComponent } from 'react';
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { Button, Row, Col } from 'react-bootstrap';
import { singletonService as vm } from '../../+state/singleton.service';
import MySelect from './MySelect';
import { Tag } from '../../models/tag.model';
import { FormValues } from '../../models/search.model';

const defaultValues: FormValues = {
  cityName: '',
  positionName: ''
};

interface Props {
  handleSubmit: Function
}

interface State {
  tags: Tag[];
  tag: Tag | null;
}

export class SearchBar extends PureComponent<Props, State> {
  state = { tags: [], tag: null };
  
  /**
   * Initialization
   */
  componentDidMount() {
    vm.loadTags().subscribe(tags => {
      this.setState({ tags });
    });
  }

  onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    // alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    this.props.handleSubmit(values);
  };

  renderForm = (formikBag: FormikProps<FormValues>) => (
    <Form>
      <Row>
        <Col sm={5}>
          <Field
            className="custom-select"
            name="cityName"
            options={this.state.tags.map((tag: Tag) => {
              return {value: tag.cityName, label: tag.cityName}
            })}
            component={MySelect}
            placeholder="Şehir seç..."
            isMulti={false}
          />
        </Col>
        <Col sm={5}>
          <Field
            className="custom-select"
            name="positionName"
            options={this.state.tags.map((tag: Tag) => {
              return {value: tag.positionName, label: tag.positionName}
            })}
            component={MySelect}
            placeholder="Meslek seç..."
            isMulti={false}
          />
        </Col>
        <Col sm={2}>
          <Button type="submit" variant="outline-success" className="w-100">ARA</Button>
        </Col>     
      </Row>
    </Form>
  );

  render() {
    return (
      <Formik
        initialValues={defaultValues}
        children={this.renderForm}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default SearchBar;