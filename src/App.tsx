import React, { FormEvent } from "react";
import axios from "axios";

import {
  // createStyles,
  createTheme,
  // makeStyles,
  // Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./App.css";

const customUI = createTheme({
  palette: {
    primary: {
      main: "#66443B",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

type MyProps = {};
type MyState = { inputText: string; analysisResult: any };

class App extends React.Component<MyProps, MyState> {
  year = new Date().getFullYear();

  constructor(props: any) {
    super(props);
    this.state = { inputText: "", analysisResult: {} };
    this.submitToAnalyze = this.submitToAnalyze.bind(this);
    this.analyze = this.analyze.bind(this);
  }

  submitToAnalyze(event: FormEvent) {
    this.analyze(this.state.inputText);
    event.preventDefault();
  }

  receiveInputData(event: any) {
    this.setState((state, props) => {
      return { inputText: event.target.value };
    });
  }

  analyze(data: string) {
    console.log(data);
  }

  render() {
    return (
      <div className="app-container">
        <ThemeProvider theme={customUI}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography variant="h6" className="brand">
                ISABI... The Text Analyzer
              </Typography>
            </Toolbar>
          </AppBar>

          <div className="intro">
            <div className="landing-image-block">
              <img
                className="landing-image"
                src="/detective.png"
                alt="isabi artificial intelligence text analysis"
              />
            </div>
            <div className="description-block">
              <h1 className="description-title">
                What is ISABI Text Analyzer?
              </h1>
              <h4 className="description">
                ISABI is an artificial intelligence solution that helps to
                analyze and bring out sentiments from text. You type in or paste
                in the text you wish to analyze, and it helps you to bring out
                the sentiments contained in it. It is a simple demonstration of
                the functionality of azure text analysis API. It is built with
                React js.
              </h4>
              <a href="#tryIt">
                <Button
                  id="try-it-button"
                  className="action-button"
                  variant="contained"
                  color="secondary"
                >
                  Give It A Try
                </Button>
              </a>
            </div>
          </div>
          <form onSubmit={this.submitToAnalyze}>
            <div className="text-input-block">
              <TextField
                id="tryIt"
                style={{ marginBottom: 20 }}
                label="Enter the text to analyze"
                variant="filled"
                multiline
                fullWidth
                rows={10}
                value={this.state.inputText}
                onChange={this.receiveInputData.bind(this)}
              />
            </div>

            <div>
              <Button
                type="submit"
                id="analyse-button"
                style={{ marginBottom: 20 }}
                className="action-button"
                variant="contained"
                color="primary"
                disabled={this.state.inputText == ""}
              >
                Analyze
              </Button>
            </div>
          </form>

          <div className="result-block">
            <p className="copyright">
              &copy; {this.year}, Luckylead IT Solutions Ltd
            </p>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
