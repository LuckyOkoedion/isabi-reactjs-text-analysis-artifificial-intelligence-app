import React, { FormEvent } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import {
  DetectedLanguage,
  DocumentSentiment,
  TextSentimentEnum,
} from "./interfaces";

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
type MyState = {
  inputText: string;
  analysisResult: DocumentSentiment | null;
  dataLoading: boolean;
};

class App extends React.Component<MyProps, MyState> {
  year = new Date().getFullYear();

  constructor(props: any) {
    super(props);
    this.state = { inputText: "", analysisResult: null, dataLoading: false };
    this.submitToAnalyze = this.submitToAnalyze.bind(this);
    this.analyze = this.analyze.bind(this);
  }

  submitToAnalyze(event: FormEvent) {
    this.setState((state, props) => {
      return { dataLoading: true };
    });
    this.analyze(this.state.inputText);
    event.preventDefault();
  }

  receiveInputData(event: any) {
    this.setState((state, props) => {
      return { inputText: event.target.value };
    });
  }

  analyze(data: string) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      axios
        .post<DetectedLanguage>(
          "https://isabi-text-analysis-rest-api.azurewebsites.net/api/LanguageDetection",
          { text: data },
          { headers }
        )
        .then((value) => {
          const theValue = value.data;

          if (typeof theValue !== "undefined") {
            try {
              axios
                .post<DocumentSentiment>(
                  "https://isabi-text-analysis-rest-api.azurewebsites.net/api/OpinionMining",
                  {
                    text: data,
                    language: theValue.iso6391Name,
                  },
                  { headers }
                )
                .then((resp) => {
                  const theResponse = resp.data;
                  if (typeof theResponse !== "undefined") {
                    this.setState((state, props) => {
                      return {
                        analysisResult: theResponse,
                      };
                    });

                    this.setState((state, props) => {
                      return {
                        dataLoading: false,
                      };
                    });
                  }
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
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
              <a href="#seeResult">
                <Button
                  type="submit"
                  id="analyse-button"
                  style={{ marginBottom: 20 }}
                  className="action-button"
                  variant="contained"
                  color="primary"
                  disabled={this.state.inputText === ""}
                >
                  Analyze
                </Button>
              </a>
            </div>
          </form>

          <div className="result-block">
            {this.state.analysisResult !== null ? (
              <div className="the-result">
                <p>
                  Overall, the opinion sentiment in the text is{" "}
                  {this.state.analysisResult.confidenceScores.positive * 100}{" "}
                  percent positive,{" "}
                  {this.state.analysisResult.confidenceScores.negative * 100}{" "}
                  percent negative, and{" "}
                  {this.state.analysisResult.confidenceScores.neutral} percent
                  neutral.
                </p>
                <p>
                  <strong>DETAILS:</strong>
                </p>
                {this.state.analysisResult.sentences.map((sentenceSentiment) =>
                  sentenceSentiment.opinions.map((opinion, index) => (
                    <p key={index}>
                      <span>
                        The author is{" "}
                        {TextSentimentEnum[opinion.target.sentiment]} about the{" "}
                        "{opinion.target.text}". The author considers the "
                        {opinion.target.text}" to be{" "}
                      </span>

                      {opinion.assessments.map((assessment, index) => (
                        <span key={index}>
                          "{assessment.text}" (a{" "}
                          {TextSentimentEnum[assessment.sentiment]} assessment),
                          ....
                        </span>
                      ))}
                    </p>
                  ))
                )}
              </div>
            ) : (
              <div className="the-result">
                {this.state.dataLoading ? (
                  <div>Analysizing text please wait...</div>
                ) : (
                  <div>RESULT WILL SHOW HERE</div>
                )}
              </div>
            )}
            {this.state.dataLoading ? (
              <div className="loader-container">
                <CircularProgress className="loader" color="secondary" />
              </div>
            ) : (
              ""
            )}
            <p className="copyright" id="seeResult">
              &copy; {this.year},{" "}
              <span>
                <a
                  id="author"
                  href="https://www.linkedin.com/in/lucky-okoedion-28b7286a/"
                >
                  Lucky Okoedion
                </a>
              </span>
            </p>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
