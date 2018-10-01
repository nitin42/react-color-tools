import React from 'react'
import { render } from 'react-dom'
import { css } from 'emotion'
import { BasicPicker } from 'react-color-tools'

const shadow = css`
  -webkit-box-shadow: 10px 10px 9px -11px rgba(122, 121, 122, 1);
  -moz-box-shadow: 10px 10px 9px -11px rgba(122, 121, 122, 1);
  box-shadow: 10px 10px 9px -11px rgba(122, 121, 122, 1);
`

const Heading = props => (
  <h1
    className={css`
      font-size: 5em;
      color: ${props.color};
    `}
  >
    {props.children}
  </h1>
)

const Container = props => (
  <div
    className={css`
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      flex-direction: ${props.direction};
    `}
  >
    {props.children}
  </div>
)

const Link = props => (
  <a
    className={css`
      font-size: 1.5em;
      text-decoration: none;
      color: #4f4f4f;
      ${props.underline ? 'border-bottom: 2px solid #4f4f4f;' : null};
    `}
    href={props.url}
    target="_blank"
  >
    {props.children}
  </a>
)

Link.defaultProps = {
  underline: true
}

const Footer = props => (
  <footer style={{ marginTop: 5 }}>
    <p style={{ fontSize: 18 }}>
      Made with ❤️ by{' '}
      <Link url="https://nitin-tulswani.surge.sh/" underline={false}>
        Nitin Tulswani
      </Link>
    </p>
  </footer>
)

class App extends React.Component {
  state = {
    color: 'pink',
    pickers: ['Basic Color Picker', 'Gradient Picker', 'Color Scheme Picker'],
    currentPicker: 'Basic Color Picker',
    gradient: ''
  }

  render() {
    return (
      <div>
        <Container direction={'column'}>
          <Heading color={this.state.color}>React Color Tools</Heading>
          <div className={shadow}>
            <BasicPicker
              triangle={false}
              color={this.state.color}
              onChange={color => this.setState({ color })}
              showTools
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <select>
              <option>Basic Color Picker</option>
              <option>Gradient Picker</option>
              <option>Color Scheme Picker</option>
            </select>
          </div>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <Link url="https://github.com/nitin42/react-color-tools/tree/master/docs">
              Read the detailed documentation
            </Link>
          </div>
          <Footer />
        </Container>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
