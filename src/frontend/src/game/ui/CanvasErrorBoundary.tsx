import { Component, ReactNode } from 'react';
import SceneRenderFallback from './SceneRenderFallback';

interface Props {
  children: ReactNode;
  onRetry: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Canvas rendering error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onRetry();
  };

  render() {
    if (this.state.hasError) {
      return <SceneRenderFallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
