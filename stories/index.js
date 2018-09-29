import React from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'

import { BasicPicker, GradientPicker, SchemePicker } from '../src'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20
}

const Container = props => <div style={styles}>{props.children}</div>

class TestBasicPicker extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    const { color } = this.state

    return (
      <div>
        <BasicPicker
          color={color}
          onChange={c => this.setState({ color: c })}
          showTools
          theme="dark"
        />
        <h1 style={{ color }}>Basic Color Picker</h1>
      </div>
    )
  }
}

class TestGradientPicker extends React.Component {
  state = {
    gradient: ''
  }

  render() {
    const { gradient } = this.state

    return (
      <div>
        <GradientPicker
          mode={this.props.mode}
          direction={this.props.direction}
          reverse={this.props.reverse}
          getGradient={grad => this.setState({ gradient: grad })}
        />
        <h1
          className={css`
            background-image: ${gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          React Gradient Tools
        </h1>
      </div>
    )
  }
}

class TestSchemePicker extends React.Component {
  state = { color: 'hotpink' }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h1 style={{ color: this.state.color }}>React Color Tools</h1>
        <SchemePicker
          scheme="analogous"
          color={this.state.color}
          onChange={color => this.setState({ color })}
        />
      </div>
    )
  }
}

storiesOf('Basic Color Picker', module)
  .add('with basic tools', () => (
    <Container>
      <BasicPicker />
    </Container>
  ))
  .add('with advance tools', () => (
    <Container>
      <BasicPicker showTools />
    </Container>
  ))
  .add('with dark theme', () => (
    <Container>
      <BasicPicker showTools theme="dark" />
    </Container>
  ))
  .add('with parent component and keeping the state in sync', () => (
    <Container>
      <TestBasicPicker />
    </Container>
  ))

storiesOf('Gradient Picker', module)
  .add('with default props', () => (
    <Container>
      <GradientPicker />
    </Container>
  ))
  .add('with dark theme', () => (
    <Container>
      <GradientPicker theme="dark" />
    </Container>
  ))
  .add('with parent component and keeping the state in sync', () => (
    <Container>
      <TestGradientPicker />
    </Container>
  ))
  .add('with gradient mode and direction', () => (
    <Container>
      <TestGradientPicker mode="radial" />
    </Container>
  ))
  .add('with reverse mode', () => (
    <Container>
      <TestGradientPicker mode="linear" direction="to right" reverse />
    </Container>
  ))

storiesOf('Scheme Picker', module)
  .add('with default props', () => (
    <Container>
      <SchemePicker />
    </Container>
  ))
  .add('with different color scheme', () => (
    <Container>
      <SchemePicker scheme="analogous" />
    </Container>
  ))
  .add('with dark theme', () => (
    <Container>
      <SchemePicker theme="dark" />
    </Container>
  ))
  .add('with parent component and keeping the state in sync', () => (
    <Container>
      <TestSchemePicker />
    </Container>
  ))
