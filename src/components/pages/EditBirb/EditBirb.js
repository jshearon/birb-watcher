import React from 'react';
import birbsData from '../../../helpers/data/birbsData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class EditBirb extends React.Component {
  state = {}

  componentDidMount() {
    const { birbId } = this.props.match.params;
    birbsData.getBirbById(birbId)
      .then((birb) => {
        this.setState({
          type: birb.data.type,
          color: birb.data.color,
          size: birb.data.size,
          seenAt: new Date(birb.data.seenAt),
          altColor: birb.data.altColor,
          wasSleeping: birb.data.wasSleeping,
          location: birb.data.location,
          notes: birb.data.notes,
        });
      })
  }

  changeTypeEvent = (e) => {
    e.preventDefault();
    this.setState({ type: e.target.value });
  };

  changeColorEvent = (e) => {
    e.preventDefault();
    this.setState({ color: e.target.value });
  }

  changeSizeEvent = (e) => {
    e.preventDefault();
    this.setState({ size: e.target.value });
  }

  changeAltColor = (e) => {
    e.preventDefault();
    this.setState({ altColor: e.target.value });
  }

  changeLocation = (e) => {
    e.preventDefault();
    this.setState({ location: e.target.value });
  }

  changeNotesEvent = (e) => {
    e.preventDefault();
    this.setState({ notes: e.target.value });
  }

  changeWasSleepingEvent = (e) => {
    this.setState({ wasSleeping: e.target.checked });
  }

  seenAtEvent = (seenAt) => {
    this.setState({ seenAt });
  };

  updateBirb = (e) => {
    e.preventDefault();
    const {
      type,
      color,
      size,
      seenAt,
      altColor,
      wasSleeping,
      location,
      notes,
    } = this.state;
    const { birbId } = this.props.match.params;
    const updatedBirb = {
      type,
      color,
      size,
      seenAt,
      altColor,
      wasSleeping,
      location,
      notes,
    }
    birbsData.updateBirb(birbId, updatedBirb)
      .then((res) => {
        this.props.history.push(`/birbs/${birbId}`);
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      type,
      color,
      size,
      seenAt,
      altColor,
      wasSleeping,
      location,
      notes,
    } = this.state;

    return (
      <div className="EditBirb col-12">
        <h1>NewBirb</h1>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="birbType">Type</label>
            <input
              type="text"
              className="form-control"
              id="birbType"
              placeholder="Enter Birb Type"
              value={type}
              onChange={this.changeTypeEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbColor">Color</label>
            <input
              type="text"
              className="form-control"
              id="birbColor"
              placeholder="Enter Birb Color"
              value={color}
              onChange={this.changeColorEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbSize">Size</label>
            <input
              type="text"
              className="form-control"
              id="birbSize"
              placeholder="Enter Birb Size"
              value={size}
              onChange={this.changeSizeEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbAltColor">Alt Color</label>
            <input
              type="text"
              className="form-control"
              id="birbAltColor"
              placeholder="Enter Birb Alt Color"
              value={altColor}
              onChange={this.changeAltColor}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbLocation">Location</label>
            <input
              type="text"
              className="form-control"
              id="birbLocation"
              placeholder="Enter Birb Location"
              value={location}
              onChange={this.changeLocation}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbNotes">Notes</label>
            <input
              type="textarea"
              className="form-control"
              id="birbNotes"
              placeholder="Enter Birb Notes"
              value={notes}
              onChange={this.changeNotesEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbWasSleeping">Was Sleeping</label>
            <input
              type="checkbox"
              className="form-control"
              id="birbWasSleeping"
              checked={wasSleeping}
              onChange={this.changeWasSleepingEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbSeenAt" className="mr-2">
              Seen At:{' '}
            </label>
            <DatePicker
              selected={seenAt}
              onChange={this.seenAtEvent}
              showTimeSelect
            />
          </div>
          <button className="btn btn-warning" onClick={this.updateBirb}>
            Update Birb
          </button>
        </form>
      </div>
    );
  }
}

export default EditBirb;
