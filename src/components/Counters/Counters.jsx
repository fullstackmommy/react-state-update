import React, {Component} from "react";
import Counter from "../Counter/Counter";
import produce, {setAutoFreeze} from "immer";

export class Counters extends Component {
  constructor(props) {
    super(props);
    setAutoFreeze(false);
  }
  state = {
    data: [
      {
        id: 1,
        value: 0
      }, {
        id: 2,
        value: 0
      }
    ]
  };

  settingState = (counterId, operator) => {
    const copy = [...this.state.data]
    copy
      .find(element => element.id === counterId)
      .value += operator;
    this.setState({data: copy});
  }

  handleIncrement = (counterId) => {
    // TODO: To check article on async update of counter try using cloneDeep from
    // lodash console.log("Before", JSON.stringify(this.state.data));

    const updater = (state) => {
      return produce(state, draft => {
        draft
          .data
          .find(element => element.id === counterId)
          .value += 1;
      })
    };

    this.setState(updater);
    //this.setState({data: updated}); this.settingState(counterId, 1)
  };

  handleReset = () => {

    const copy = [...this.state.data]

    const updated = copy.map(counter => {
      counter.value = 0;
      return counter;
    })
    this.setState({data: updated});
  }

  render() {
    const {data} = this.state;

    return (
      <div>
        <button onClick={this.handleReset} className="btn btn-secondary m-2">Reset</button>
        {data.map(counter => (<Counter
          key={counter.id}
          id={counter.id}
          value={counter.value}
          handleIncrement={this.handleIncrement}/>))}
      </div>
    );
  }
}

export default Counters;
