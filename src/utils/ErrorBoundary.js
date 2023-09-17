import React, { Component } from 'react';

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {

    if (error.message.includes('ResizeObserver loop completed with undelivered notifications.')) {
        return;
      }
    
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
