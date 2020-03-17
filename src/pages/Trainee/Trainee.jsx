import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './components/AddDialog/AddDialog';
import Navbar from '../components/Navbar/Navbar';

class Trainee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  onClick = () => {
    this.setState({ open: true },() => { console.log(this.state) });
  }

  onClose = () => {
    this.setState({ open: false }, () => { console.log(this.state) })
  }

  onSubmit = (data) => {

    this.setState({ open: false }, () => { console.log(data) });
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Navbar/>
        <br/>
        <Button variant="outlined" color="primary" onClick={this.onClick}>
        ADD TRAINEE
      </Button>
      <AddDialog onClose = { this.onClose } onSubmit={() => this.onSubmit} open = {open} />
      </>
    )
  }
}

export default Trainee;
