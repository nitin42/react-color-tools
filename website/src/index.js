import React from 'react'
import { render } from 'react-dom'
import { css, injectGlobal } from 'emotion'
import { BasicPicker, SchemePicker, GradientPicker } from 'react-color-tools'
import coolhue from 'coolhue'

const BASIC_PICKER = 'Basic Color Picker'
const SCHEME_PICKER = 'Color Scheme Picker'
const GRADIENT_PICKER = 'Gradient Picker'

injectGlobal`
body {
  font-family: 'Source Sans Pro', sans-serif;
  color: #2f2f2f;
}
`

const shadow = css`
  -webkit-box-shadow: 10px 10px 9px -11px rgba(122, 121, 122, 1);
  -moz-box-shadow: 10px 10px 9px -11px rgba(122, 121, 122, 1);
  box-shadow: 10px 10px 9px -11px rgba(122, 121, 122, 1);
`

const Heading = props => (
  <h1
    className={css`
      font-size: 4em;
      ${props.gradientPicker
        ? `background-image: ${props.color};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        `
        : `color: ${props.color};
        `};
      @media only screen and (max-width: 480px) {
        font-size: 2.3em;
      }
    `}
  >
    {props.children}
  </h1>
)

Heading.defaultProps = {
  gradientPicker: false
}

const Description = props => (
  <p
    className={css`
      font-family: 'Satisfy', cursive;
      font-size: 1.5em;
      margin-top: -20px;
      color: #4f4f4f;
      @media only screen and (max-width: 480px) {
        font-size: 0.85em;
      }
    `}
  >
    A set of tools as React components for working with{' '}
    <span
      onClick={props.updateGradient}
      className={css`
        background-image: ${props.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        user-select: none;
        cursor: pointer;
      `}
    >
      colors
    </span>
  </p>
)

const GitHubLink = props => (
  <div style={{ marginTop: 20 }}>
    <a
      className="github-button"
      href="https://github.com/nitin42/react-color-tools"
      data-size="large"
      data-show-count="true"
      aria-label="Star nitin42/react-color-tools on GitHub"
    >
      Star
    </a>
  </div>
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

const Link = ({ underline, url, children, ...rest }) => (
  <a
    className={css`
      font-size: 1.5em;
      text-decoration: none;
      color: #4f4f4f;
      border-bottom: 2px solid #4f4f4f;
      @media only screen and (max-width: 480px) {
        font-size: 1.2em;
      }
    `}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  >
    {children}
  </a>
)

const Footer = props => (
  <footer style={{ marginTop: 5, bottom: 0 }}>
    <p
      style={{
        fontSize: 18,
        color: '#4f4f4f'
      }}
    >
      Made with{' '}
      <span role="img" aria-label="heart">
        ❤️
      </span>
      ️ by{' '}
      <Link url="https://nitin-tulswani.surge.sh/" style={{ fontSize: 18 }}>
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
    gradient: '',
    descGrad: coolhue.getGradientStyle(5)
  }

  changeFormat = e => this.setState({ currentPicker: e.target.value })

  renderPickerOptions = () => {
    const { pickers } = this.state

    return pickers.map(picker => (
      <option value={picker} key={picker}>
        {picker}
      </option>
    ))
  }

  getRandomValue = (min, max) => Math.random() * (max - min) + min

  updateGradient = e => {
    const number = Math.floor(this.getRandomValue(1, 60))

    this.setState({ descGrad: coolhue.getGradientStyle(number) })
  }

  render() {
    return (
      <div>
        <Container direction={'column'}>
          <Heading
            gradientPicker={this.state.currentPicker === GRADIENT_PICKER}
            color={
              this.state.currentPicker !== GRADIENT_PICKER
                ? this.state.color
                : this.state.gradient
            }
          >
            React Color Tools
          </Heading>
          <Description
            gradient={this.state.descGrad}
            updateGradient={this.updateGradient}
          />
          <div className={shadow}>
            {this.state.currentPicker === BASIC_PICKER && (
              <BasicPicker
                triangle={false}
                color={this.state.color}
                onChange={color => this.setState({ color })}
                showTools
              />
            )}
            {this.state.currentPicker === SCHEME_PICKER && (
              <SchemePicker
                scheme="analogous"
                color={this.state.color}
                onChange={color => this.setState({ color })}
              />
            )}
            {this.state.currentPicker === GRADIENT_PICKER && (
              <GradientPicker
                getGradient={gradient => this.setState({ gradient })}
              />
            )}
          </div>
          <div style={{ marginTop: 20 }}>
            <select onChange={this.changeFormat}>
              {this.renderPickerOptions()}
            </select>
          </div>
          <GitHubLink />
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
