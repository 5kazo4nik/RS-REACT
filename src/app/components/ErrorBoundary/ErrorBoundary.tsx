import React, { Component } from 'react';
import styles from './ErrorBoundary.module.css';

interface IErrorBoundaryProps {
  children: React.ReactElement;
}

interface IErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<IErrorBoundaryProps> {
  state: IErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    console.log(error.message);
    return { error };
  }

  goBackHandler = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div className={styles.wrapper}>
          <p className={styles.message}>Seems like an error occured!</p>
          <p className={styles.message}>{error.message}</p>
          <button className={styles.btn_back} onClick={this.goBackHandler}>
            Go back
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
