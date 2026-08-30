import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-10 text-center max-w-lg w-full" style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}>
            <h1 className="font-display font-black text-xl text-ink">Something went wrong</h1>
            <p className="text-sm font-medium text-ink/60 mt-2">An unexpected error occurred. Try refreshing the page.</p>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="px-5 py-2.5 rounded-xl bg-ink text-white border-2 border-black font-black text-sm">Refresh</button>
              <Link to="/" className="px-5 py-2.5 rounded-xl bg-white text-ink border-2 border-black font-black text-sm">Home</Link>
            </div>
            {this.state.error && <pre className="mt-4 text-xs font-mono text-ink/40 break-all text-left bg-canvas p-3 rounded-xl border border-black/10">{String(this.state.error.message || this.state.error)}</pre>}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
