import { ReactProps } from '@/types';
import { QueryClient, QueryClientProvider as QCProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function QueryClientProvider({ children }: ReactProps) {
  return <QCProvider client={queryClient}>{children}</QCProvider>;
}
