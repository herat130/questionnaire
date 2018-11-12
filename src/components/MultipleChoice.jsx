import React from 'react';

export default class MultipleChoice extends React.Component {

  renderOptions() {
    const { choices } = this.props;
    return (choices || []).map(v =>
      <div key={v.value}>
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
    )
  }

  render() {
    return (
      <div>
        {this.renderOptions()}
      </div>
    );
  }
}