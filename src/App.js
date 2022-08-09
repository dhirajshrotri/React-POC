import React, { Component } from 'react';
import TextInput from "./component/TextField/TextField";
import { Select, Button, MenuItem, OutlinedInput } from '@material-ui/core';
import places from './tags';
import DisplayInfo from './DisplayInfo';

const style = {
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  width: '20%',
  height: '100vh',
  gap: '16px'

}

const mainStyles = {
  display: 'flex',
  flexDirection: 'row',

}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default class MapContainer extends Component {
  constructor () {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
    data: {
      radius: 0,
      lat: 0.000,
      long: 0.000,
      tag: ''
    },
    response: {
      results: []
    },
    showError: false,
  };

  // theme = useTheme();

  handleChange (event) {
    const data = { ...this.state.data };
    event.target.name !== 'tag' ?
      data[event.target.name] = Number(event.target.value) :
      data[event.target.name] = event.target.value;
    
    this.setState({ data });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://35.200.193.2:3000/api';
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data)
    };
    return fetch(url, options)
              .then(response => {
                return response.json();
              })
              .then(parsedJson => {
                this.setState({response: parsedJson})
                this.setState({showingInfoWindow: true})
              })
              .catch(error => {
                this.setState({showError: true});
              });
  }

  render() {
    return (
      <div style={mainStyles}>
        <form
        style={style}
        onSubmit={this.handleSubmit}
      >
        <TextInput
          name="lat"
          value={this.state.data["lat"]}
          type="number"
          label="Lat"
          placeholder="Enter your latitude here..."
          onChange={this.handleChange}
        >
        </TextInput>
        <TextInput
          name="long"
          value={this.state.data["long"]}
          type="number"
          label="Long"
          placeholder="Enter your longitude here..."
          onChange={this.handleChange}
        >
        </TextInput>
        <TextInput
          name="radius"
          value={this.state.data["radius"]}
          type="number"
          label="Radius"
          placeholder="Enter the radius here..."
          onChange={this.handleChange}
        >
        </TextInput>
        <Select
          id="demo-multiple-name"
          value={this.state.data['tag']}
          onChange={this.handleChange}
          input={<OutlinedInput label="Place Tags" />}
          MenuProps={MenuProps}
          name="tag"
        >
          {places.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
              // style={getStyles(tag, places, this.theme)}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="contained"
          size="medium"
          color="primary"
        >
          Submit
        </Button>
      </form>
      <DisplayInfo showingInfoWindow={this.state.showingInfoWindow} response={this.state.response}>
      </DisplayInfo>
      {
        this.state.showError && 
        <div >There was an error while fetching your response. Please try again.</div>
      }
      </div>
    );
  }
}
