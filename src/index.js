import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import ClippingsParser from "./clippingsparser";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class KindleClippings extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedBook: "Select",
      selectedBookHighlights: [],
      highlightsTable: {},
      url: props.url
    };
  }
  async getHighlightsTable() {
    let parser = new ClippingsParser();
    let groupedHighlights = await parser.parse(this.state.url);

    this.setState((state) => ({
      highlightsTable: groupedHighlights
    }));
  }

  componentDidMount() {
    this.getHighlightsTable();
    this.getHighlights("Select");
  }

  getHighlights(bookTitle) {
    this.setState((state) => ({
      selectedBook: bookTitle,
      selectedBookHighlights:
        this.state.highlightsTable[bookTitle] ?
          this.state.highlightsTable[bookTitle] : []
    }));
  }

  render() {
    
    return (
      <div>
         <Autocomplete
            id="bookTitlesDropDown"
            value={this.state.selectedBook}
            onChange={(event, newValue) => {
              this.getHighlights(newValue);
            }}
            options={Object.keys(this.state.highlightsTable)}
            getOptionLabel={(option) => option}
            style={{ width: 300, paddingTop: 10 }}
            renderInput={(params) => <TextField {...params} label="Type a book name" variant="outlined" />}
          />
        <br />
        {this.state.selectedBookHighlights.map(item => {
          return (<Card body>{item.text}</Card>)
        })}

      </div>
    );
  }

}

export default KindleClippings;