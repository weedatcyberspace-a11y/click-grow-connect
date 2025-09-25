import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "investment";
  amount: number;
  date: string;
  description: string;
  status: "completed" | "pending";
}

interface UserProfileProps {
  user: { email: string; name: string };
  onLogout: () => void;
}

export const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  const [balance] = useState(25000); // Mock balance
  const [amount, setAmount] = useState("");
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "deposit",
      amount: 10000,
      date: "2024-01-15",
      description: "Initial deposit",
      status: "completed"
    },
    {
      id: "2",
      type: "investment",
      amount: -5000,
      date: "2024-01-16",
      description: "Solar Panel Investment",
      status: "completed"
    },
    {
      id: "3",
      type: "deposit",
      amount: 20000,
      date: "2024-01-18",
      description: "Bank transfer",
      status: "completed"
    }
  ]);

  const { toast } = useToast();

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Deposit Initiated",
      description: `KES ${parseFloat(amount).toLocaleString()} deposit request submitted`,
    });
    setAmount("");
  };

  const handleWithdrawal = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount", 
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > balance) {
      toast({
        title: "Insufficient Balance",
        description: "Withdrawal amount exceeds available balance",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Withdrawal Initiated",
      description: `KES ${parseFloat(amount).toLocaleString()} withdrawal request submitted`,
    });
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Investment Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Your available investment balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-investment-primary mb-4">
              KES {balance.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Deposit/Withdrawal */}
          <Card>
            <CardHeader>
              <CardTitle>Deposit & Withdrawal</CardTitle>
              <CardDescription>Manage your account funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (KES)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleDeposit}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Deposit
                </Button>
                <Button 
                  onClick={handleWithdrawal}
                  variant="outline"
                  className="flex-1"
                >
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}KES {Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};