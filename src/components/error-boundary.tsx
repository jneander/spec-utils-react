import {Component, ErrorInfo, ReactNode} from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = {error: null}
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({error, errorInfo})
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          {this.state.error.toString() ?? null}

          <br />

          {this.state.errorInfo.componentStack}
        </div>
      )
    }

    return this.props.children
  }
}
