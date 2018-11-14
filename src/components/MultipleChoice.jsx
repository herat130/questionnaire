import React from 'react';

export default class MultipleChoice extends React.Component {

  renderOptions() {
    const { choices } = this.props;
    return (choices || []).map(v =>
      <React.Fragment>
        <div key={v.value} className="option-container">
          <input
            key={v.value}
            id={v.label}
            type='radio'
            value={v.value}
            checked={v.selected}
            onChange={this.props.handleChangeOptions}
          />
          <label className="options" htmlFor={v.label}>{v.label}</label>
        </div>
        <div className='blank-space-10' />
      </React.Fragment>
    )
  }

  render() {
    return (
      <div>
        {this.renderOptions()}
        <div className='blank-space-10' />
        <div className='blank-space-10' />
      </div>
    );
  }
}