
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, PlusCircle, Search, User, XCircle } from 'lucide-react';

// Employee mock data
const employeesMockData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Software Engineer',
    department: 'Engineering',
    salary: 120000,
    status: 'active',
    joined: '2022-05-12'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Product Manager',
    department: 'Product',
    salary: 130000,
    status: 'active',
    joined: '2021-11-03'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    role: 'UX Designer',
    department: 'Design',
    salary: 110000,
    status: 'active',
    joined: '2023-01-17'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
    salary: 90000,
    status: 'inactive',
    joined: '2022-08-05'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'HR Manager',
    department: 'Human Resources',
    salary: 95000,
    status: 'active',
    joined: '2022-03-28'
  }
];

const Employees = () => {
  const [employees, setEmployees] = useState(employeesMockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const { user } = useAuth();

  // Filter employees based on search term and status
  const filteredEmployees = employees.filter(employee => {
    // Status filter
    if (statusFilter !== 'all' && employee.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm && !employee.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !employee.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !employee.role.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !employee.department.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Handle adding new employee
  const handleAddEmployee = (formData: FormData) => {
    const newEmployee = {
      id: (employees.length + 1).toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      department: formData.get('department') as string,
      salary: parseInt(formData.get('salary') as string, 10),
      status: 'active',
      joined: new Date().toISOString().split('T')[0]
    };
    
    setEmployees([...employees, newEmployee]);
    setIsAddEmployeeOpen(false);
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleAddEmployee(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage your company's employees and their information
          </p>
        </div>
        <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleFormSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the details for the new employee.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="role">
                    Role
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="department">
                    Department
                  </Label>
                  <Input
                    id="department"
                    name="department"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="salary">
                    Salary
                  </Label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Employee</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>
            View and manage all employees in your company
          </CardDescription>
          <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of employees in your company.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No employees found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(employee.salary)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={employee.status === 'active' ? "default" : "secondary"}>
                        {employee.status === 'active' ? (
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                        )}
                        {employee.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Employees;
