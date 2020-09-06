import React, { Component, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import ClippingsParser from "./clippingsparser";

class KindleClippings extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedBook: "Select",
      selectedBookHighlights: [],
      highlightsTable: {},
      url: props.url
    };
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(evt) {
    console.log(evt.currentTarget.textContent)
    this.getHighlights(evt.currentTarget.textContent)
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


    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
      ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            <FormControl
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Type to filter..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <ul className="list-unstyled">
              {React.Children.toArray(children).filter(
                (child) =>
                  !value || child.props.children.toLowerCase().includes(value),
              )}
            </ul>
          </div>
        );
      },
    );
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-custom-components">
            {this.state.selectedBook}
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu}>
            {
              Object.keys(this.state.highlightsTable).map((book) => {
                return (
                  <Dropdown.Item
                    onClick={this.handleClick}
                    id={`bookdropdown${book}`}
                    key={`bookdropdown${book}`}
                    eventKey={book}
                  >
                    {book}
                  </Dropdown.Item>
                )
              })
            }

          </Dropdown.Menu>
        </Dropdown>
        <br />
        {this.state.selectedBookHighlights.map(item => {
          return (<Card body>{item.text}</Card>)
        })}

      </div>
    );
  }

}

export default KindleClippings;