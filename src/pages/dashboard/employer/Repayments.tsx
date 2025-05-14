
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";

// Mock data for repayments
const mockRepayments = [
  { 
    id: 1, 
    employee: "John Doe", 
    advanceAmount: "₦25,000", 
    repaymentAmount: "₦27,500", 
    dateTaken: "2025-05-01", 
    dueDate: "2025-05-30", 
    status: "Pending" 
  },
  { 
    id: 2, 
    employee: "Jane Smith", 
    advanceAmount: "₦15,000", 
    repaymentAmount: "₦16,500", 
    dateTaken: "2025-04-15", 
    dueDate: "2025-05-15", 
    status: "Paid" 
  },
  { 
    id: 3, 
    employee: "Mike Johnson", 
    advanceAmount: "₦30,000", 
    repaymentAmount: "₦33,000", 
    dateTaken: "2025-05-05", 
    dueDate: "2025-06-05", 
    status: "Pending" 
  },
  { 
    id: 4, 
    employee: "Sarah Williams", 
    advanceAmount: "₦12,000", 
    repaymentAmount: "₦13,200", 
    dateTaken: "2025-04-10", 
    dueDate: "2025-05-10", 
    status: "Overdue" 
  },
  { 
    id: 5, 
    employee: "David Brown", 
    advanceAmount: "₦20,000", 
    repaymentAmount: "₦22,000", 
    dateTaken: "2025-04-20", 
    dueDate: "2025-05-20", 
    status: "Paid" 
  },
];

const Repayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  // Fix: Using the DateRange type from react-day-picker
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [repayments, setRepayments] = useState(mockRepayments);
  
  // Filter repayments based on search query, status and date range
  const filteredRepayments = repayments.filter(repayment => {
    // Search filter
    const matchesSearch = repayment.employee.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = !statusFilter || repayment.status === statusFilter;
    
    // Date filter
    let matchesDate = true;
    if (dateRange && dateRange.from) {
      const repaymentDate = new Date(repayment.dateTaken);
      matchesDate = repaymentDate >= dateRange.from;
      
      if (dateRange.to) {
        matchesDate = matchesDate && repaymentDate <= dateRange.to;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter(undefined);
    setDateRange(undefined);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Repayment Logs</h1>
        <p className="text-muted-foreground">Track employee advance repayments</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Repayment History</CardTitle>
          <CardDescription>
            Track all advance repayments across your organization
          </CardDescription>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
            <div className="relative w-full sm:w-auto flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full sm:w-auto justify-start text-left font-normal ${
                    dateRange?.from ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="h-10"
            >
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Advance Amount</TableHead>
                <TableHead>Repayment Amount</TableHead>
                <TableHead>Date Taken</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepayments.length > 0 ? (
                filteredRepayments.map((repayment) => (
                  <TableRow key={repayment.id}>
                    <TableCell className="font-medium">{repayment.employee}</TableCell>
                    <TableCell>{repayment.advanceAmount}</TableCell>
                    <TableCell>{repayment.repaymentAmount}</TableCell>
                    <TableCell>{format(new Date(repayment.dateTaken), "MMM d, yyyy")}</TableCell>
                    <TableCell>{format(new Date(repayment.dueDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        repayment.status === "Paid" 
                          ? "bg-green-100 text-green-800" 
                          : repayment.status === "Pending" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-red-100 text-red-800"
                      }`}>
                        {repayment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No repayments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Pending Repayments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₦60,500</div>
            <p className="text-sm text-muted-foreground mt-1">Across 2 employees</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Overdue Repayments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">₦13,200</div>
            <p className="text-sm text-muted-foreground mt-1">Across 1 employee</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Repaid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₦38,500</div>
            <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Repayments;
