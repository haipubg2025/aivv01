import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  theme: 'light' | 'dark';
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${this.props.theme === 'dark' ? 'bg-black text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
          <div className={`max-w-md w-full p-8 rounded-2xl border shadow-2xl ${this.props.theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <h2 className="text-2xl font-bold mb-4 text-red-500">Đã xảy ra lỗi hệ thống</h2>
            <p className="text-sm mb-6 opacity-80">
              Ứng dụng gặp sự cố bất ngờ. Đừng lo lắng, dữ liệu của bạn thường được tự động lưu lại.
            </p>
            <div className={`p-4 rounded-lg mb-6 text-xs font-mono overflow-auto max-h-40 ${this.props.theme === 'dark' ? 'bg-black/50' : 'bg-zinc-100'}`}>
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors"
            >
              Tải lại ứng dụng
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
