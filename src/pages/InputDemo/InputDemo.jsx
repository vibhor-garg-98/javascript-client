import React, { Component } from 'react';
import * as yup from 'yup';
import TextField from '../../components/TextField/TextField';
import SelectField from '../../components/SelectField/SelectField';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import Button from '../../components/Button/Button';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../configs/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.error = false;

    this.schema = yup.object().shape({
      name: yup.string().required('Name is required field').min(3, 'Please enter no less than 3 characters'),
      sport: yup.string().required('Please select a sport'),
      cricket: yup.string().when('sport', {
        is: 'cricket',
        then: yup.string().required('select option'),
      }),
      football: yup.string().when('sport', {
        is: 'football',
        then: yup.string().required('select option'),
      }),
    });

    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      }
    };
  }

  onChangeTextField = (event) => {
    this.setState({ name: event.target.value });
  }

  onChangeSelectOptions = (event) => {
    let { cricket, football, sport } = this.state;
    sport = event.target.value;
    if (sport === 'select') {
      sport = '';
    }
    cricket = '';
    football = '';
    this.setState({ sport, cricket, football });
  }

  onChangeRadioOption = (event) => {
    let { cricket, football } = this.state;
    const { sport } = this.state;
    if (sport === 'football') {
      cricket = '';
      this.setState({ football: event.target.value, cricket });
    } else if (sport === 'cricket') {
      football = '';
      this.setState({ cricket: event.target.value, football });
    }
  }

  getRadioOptions = () => {
    const { sport } = this.state;

    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state)
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({ touched: { ...touched, [field]: true } });
  }

  getError = (field) => {
    if (this.state.touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
  };

  render() {
    console.log(this.state);
    const { sport, name } = this.state;
    return (
      <form>
        <p><b>Name</b></p>
        <TextField
          onChange={this.onChangeTextField}
          value={name}
          error={this.getError('name')}
          onBlur={() => this.isTouched('name')}
        />

        <p><b>Select Your Game You Play?</b></p>
        <SelectField
          defaultOption="select"
          options={selectOptions}
          onChange={this.onChangeSelectOptions}
          value={sport}
          error={this.getError('sport')}
          onBlur={() => this.isTouched('sport')}
        />

        {
          sport && (sport === 'cricket' || sport === 'football') && (
            <>
              <p><b>What you do ?</b></p>
              <RadioGroup
                options={this.getRadioOptions()}
                onChange={this.onChangeRadioOption}
                error={this.getError(sport)}
                onBlur={() => this.isTouched(sport)}
              />
            </>
          )
        }
        <div align="right">
          <Button value="cancle" />
          <Button value="submit" disabled={this.hasErrors()} />
        </div>
      </form>
    );
  }
}

export default InputDemo;
