import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[];
  showGraph: boolean; // Add new state to track graph visibility
}

class App extends Component<{}, IState> {
  private interval: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false, // Initialize graph visibility state to false
    };
  }

  renderGraph() {
    return this.state.showGraph ? <Graph data={this.state.data} /> : null; // Render Graph conditionally
  }

  toggleStreaming() {
    if (this.state.showGraph) {
      this.stopStreaming();
    } else {
      this.startStreaming();
    }
  }

  startStreaming() {
    this.setState({ showGraph: true }); // Show the graph
    this.interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState((prevState) => ({
          data: [...prevState.data, ...serverResponds],
        }));
      });
    }, 100);
  }

  stopStreaming() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.setState({ showGraph: false }); // Hide the graph
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Bank & Merge Co Task 2</header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => this.toggleStreaming()}
          >
            {this.state.showGraph ? 'Stop Streaming Data' : 'Start Streaming Data'}
          </button>
          <div className="Graph">{this.renderGraph()}</div>
        </div>
      </div>
    );
  }
}

export default App;
