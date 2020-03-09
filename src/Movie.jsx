import React from "react";

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieName: "",
      movieURL: "",
      textArea: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //   In order to manually manage the form submission,
  //   we will have to "disable" the browser's default behavior when submitting a form.
  //   So we're going to create our method onSubmit which will be called when our form is sent:
  submitForm(e) {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };
    const url = "https://post-a-form.herokuapp.com/api/movies";
    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Employee #${res} has been successfully added!`);
        }
      })
      .catch(e => {
        console.error(e);
        alert("There was an error when adding the employee.");
      });
  }

  render() {
    console.log(this.state.movieName);
    return (
      <div className="FormEmployee">
        <h1>New Employee</h1>

        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Information</legend>
            <div className="form-data">
              <label htmlFor="movieName">Movie Name</label>
              <input
                type="text"
                id="movieName"
                name="movieName"
                onChange={this.onChange}
                value={this.state.movieName}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="movieURL">URL to movie</label>
              <input
                type="text"
                id="movieURL"
                name="movieURL"
                onChange={this.onChange}
                value={this.state.movieURL}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="textArea">Your message</label>
              <input
                type="textarea"
                id="textArea"
                name="textArea"
                onChange={this.onChange}
                value={this.state.textArea}
                required
              />
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Send" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Movie;
