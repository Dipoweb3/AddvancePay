
// This service would normally interact with a database through an API
// For now, we'll implement it with mock functionality

export interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  userId: string;
}

export class WalletService {
  private static transactions: Transaction[] = [
    { id: 1, title: 'Salary Advance', date: 'May 10, 2025', amount: 25000, type: 'credit', userId: 'user1' },
    { id: 2, title: 'Withdrawal', date: 'May 8, 2025', amount: 10000, type: 'debit', userId: 'user1' },
    { id: 3, title: 'Transfer to James', date: 'May 5, 2025', amount: 5000, type: 'debit', userId: 'user1' },
  ];

  private static walletBalances: Record<string, number> = {
    'user1': 45000,
  };

  // Get wallet balance for a user
  static getBalance(userId: string): number {
    return this.walletBalances[userId] || 0;
  }

  // Get transaction history for a user
  static getTransactions(userId: string): Transaction[] {
    return this.transactions.filter(t => t.userId === userId);
  }

  // Process a withdrawal
  static withdraw(userId: string, amount: number): boolean {
    const currentBalance = this.getBalance(userId);
    
    if (amount <= 0 || amount > currentBalance) {
      return false;
    }
    
    // Update balance
    this.walletBalances[userId] = currentBalance - amount;
    
    // Record transaction
    this.transactions.push({
      id: this.transactions.length + 1,
      title: 'Withdrawal',
      date: new Date().toLocaleDateString(),
      amount,
      type: 'debit',
      userId
    });
    
    return true;
  }

  // Process a transfer
  static transfer(fromUserId: string, toUserId: string, amount: number, recipientName: string): boolean {
    const fromBalance = this.getBalance(fromUserId);
    
    if (amount <= 0 || amount > fromBalance) {
      return false;
    }
    
    // Ensure recipient exists
    if (!this.walletBalances[toUserId]) {
      this.walletBalances[toUserId] = 0;
    }
    
    // Update balances
    this.walletBalances[fromUserId] = fromBalance - amount;
    this.walletBalances[toUserId] += amount;
    
    // Record transactions
    this.transactions.push({
      id: this.transactions.length + 1,
      title: `Transfer to ${recipientName}`,
      date: new Date().toLocaleDateString(),
      amount,
      type: 'debit',
      userId: fromUserId
    });
    
    this.transactions.push({
      id: this.transactions.length + 1,
      title: `Transfer from ${fromUserId}`,
      date: new Date().toLocaleDateString(),
      amount,
      type: 'credit',
      userId: toUserId
    });
    
    return true;
  }

  // Process a deposit (e.g., salary advance)
  static deposit(userId: string, amount: number, title: string): boolean {
    if (amount <= 0) {
      return false;
    }
    
    // Ensure user exists
    if (!this.walletBalances[userId]) {
      this.walletBalances[userId] = 0;
    }
    
    // Update balance
    this.walletBalances[userId] += amount;
    
    // Record transaction
    this.transactions.push({
      id: this.transactions.length + 1,
      title,
      date: new Date().toLocaleDateString(),
      amount,
      type: 'credit',
      userId
    });
    
    return true;
  }
}
