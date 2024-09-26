import React from 'react';
import { Text } from 'react-native';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log('Error:', error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <Text>Something went wrong.</Text>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;