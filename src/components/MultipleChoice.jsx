import React from 'react';

export default class MultipleChoice extends React.Component {

  renderOptions() {
    const { choices } = this.props;
    return (choices || []).map(v =>
      <div key={v.value}>
        <input
          key={v.value}
          type='radio'
          value={v.value}
          checked={v.selected}
          onChange={this.props.handleChangeOptions}
        />
        <span htmlFor={v.label}>{v.label}</span>
      </div>
    )
  }

  render() {
    return this.renderOptions();
  }
}