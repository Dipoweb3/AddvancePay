export {};

declare global {
  interface EthereumProvider {
    isOKExWallet?: boolean;
    request<T = unknown>(args: { method: string; params?: unknown[] }): Promise<T>;
    on?(event: string, listener: (...params: unknown[]) => void): void;
  }

  interface Window {
    ethereum?: EthereumProvider;
  }
}
