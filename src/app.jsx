import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      due: 0,
      rec: 0,
      result: '',
      changeDue: ''
    }
  }

  updateInput(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  calculateChange() {
    let handleCalculation = (num, div) => {
      var result = 0;
      while (num - ((result + 1) * div) >= 0) {
        result++;
      }
      var remainder = num - (result * div);
      return [result, remainder];
    }

    let result;
    let changeDue = Math.round((this.state.rec - this.state.due) * 100);
    let [twdol, twdolC] = handleCalculation(changeDue, 2000);
    let [tdol, tdolC] = handleCalculation(twdolC, 1000);
    let [fdol, fdolC] = handleCalculation(tdolC, 500);
    let [dol, dolC] = handleCalculation(fdolC, 100);
    let [qrt, qrtC] = handleCalculation(dolC, 25);
    let [dim, dimC] = handleCalculation(qrtC, 10);
    let [nic, nicC] = handleCalculation(dimC, 5);
    let [pen,] = handleCalculation(nicC, 1);
    result = [['Twenties', twdol], ['Tens', tdol], ['Fives', fdol], ['Ones', dol], ['Quarters', qrt], ['Dimes', dim], ['Nickels', nic], ['Pennies', pen]];
    this.setState({
      result: result,
      changeDue: (changeDue / 100).toFixed(2)
    });
  }

  buildOutput() {
    //All of the code in this function is more or less ripped untouched from my first change calculator
    const changeDue = this.state.changeDue;
    const result = this.state.result;
    if (result == '' || changeDue === '') return (<div className='col-sm-8'><div className='panel panel-default' style={{ visibility: 'hidden' }}></div></div>);
    return (
      <div className='col-sm-8'>
        <div className='panel panel-default'>
          <div className='panel-body text-center' style={{ paddingBottom: '0' }}>
            {(changeDue >= 0) ?
              <div className='col-sm-12 alert alert-success text-success'>The total change due is ${changeDue}</div>
              :
              <div className='col-sm-12 alert alert-danger text-danger'>Error: The customer didn't give you enough money!</div>
            }
            <div className='row'>
              {(changeDue >= 0) ? result.map((element, index) => (index < 4 ?
                <div className='col-sm-3'>
                  <div className='well well-lg' key={element[0]}>
                    <h4>{element[0]}</h4>
                    <p className='lead change' name={element[0]}>{element[1]}</p>
                  </div>
                </div>
                : '')) : ''}
            </div>
            <div className='row'>
              {(changeDue >= 0) ? result.map((element, index) => (index > 3 ?
                <div className='col-sm-3'>
                  <div className='well well-lg' key={element[0]}>
                    <h4>{element[0]}</h4>
                    <p className='lead change' name={element[0]}>{element[1]}</p>
                  </div>
                </div>
                : '')) : ''}
            </div>
          </div>
        </div>
      </div>);
  }

  render() {
    return (
      <div className='container'>
        <h1 style={{ color: '#e0e0e0' }}>Change Calculator</h1>
        <div className='row panel panel-default'></div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Enter Information</div>
              <div className='panel-body'>
                <div className='form-group'>
                  <label htmlFor='due-input'>How much is due?</label>
                  <input id='due-input' name='amountDue' className='form-control' type='number' step='0.01' value={this.state.due} onChange={(e) => this.updateInput('due', e)}></input>
                </div>
                <div className='form-group'>
                  <label htmlFor='rec-input'>How much was received?</label>
                  <input id='rec-input' name='amountReceived' className='form-control' type='number' step='0.01' value={this.state.rec} onChange={(e) => this.updateInput('rec', e)}></input>
                </div>
              </div>
              <div className='panel-footer'>
                <button className='btn btn-primary btn-block' onClick={() => this.calculateChange()}>Calculate</button>
              </div>
            </div>
          </div>
          {this.buildOutput()}
        </div>
      </div>
    );
  }
}

export default App;

//Wireframe used to build the layout
/*- Header
- Tagline
- Bootstrap Row
  - Bootstrap Column (4 columns wide)
    - Bootstrap Panel
      - How much is due?
      - How much was received?
      - Calculate button
  - Bootstrap Column (8 columns wide)
    - Outcome alerts.
      - Success: Total change due.
      - Danger: Additional money owed.
    - Grid for denominations
      - Twenties
      - Tens
      - Fives
      - Ones
      - Quarters
      - Dimes
      - Nickels
      - Pennies*/