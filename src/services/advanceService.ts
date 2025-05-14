
import { WalletService } from "./walletService";

export interface AdvanceRequest {
  id: number;
  userId: string;
  amount: number;
  fee: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  requestDate: string;
  approvalDate?: string;
  repaymentDate: string;
}

export class AdvanceService {
  private static requests: AdvanceRequest[] = [];
  private static lastId = 0;
  
  // Get all advance requests for a user
  static getUserRequests(userId: string): AdvanceRequest[] {
    return this.requests.filter(req => req.userId === userId);
  }
  
  // Create a new advance request
  static requestAdvance(userId: string, amount: number, fee: number, repaymentDate: string): AdvanceRequest {
    const newRequest: AdvanceRequest = {
      id: ++this.lastId,
      userId,
      amount,
      fee,
      status: 'pending',
      requestDate: new Date().toISOString(),
      repaymentDate
    };
    
    this.requests.push(newRequest);
    return newRequest;
  }
  
  // Approve an advance request and deposit to wallet
  static approveRequest(requestId: number): boolean {
    const request = this.requests.find(req => req.id === requestId);
    
    if (!request || request.status !== 'pending') {
      return false;
    }
    
    // Update request status
    request.status = 'approved';
    request.approvalDate = new Date().toISOString();
    
    // Deposit the advance amount to user's wallet
    WalletService.deposit(
      request.userId, 
      request.amount, 
      'Salary Advance'
    );
    
    return true;
  }
  
  // Get all pending requests (for employer dashboard)
  static getPendingRequests(): AdvanceRequest[] {
    return this.requests.filter(req => req.status === 'pending');
  }
}
