
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Building } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex.johnson@example.com',
    phone: '+234 801 234 5678',
    address: '123 Main Street, Lagos',
    company: 'TechCorp Nigeria Ltd',
    department: 'Engineering',
    position: 'Senior Developer'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically save the data to the database
    setIsEditing(false);
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-2xl">{getInitials(formData.name)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{formData.name}</h3>
            <p className="text-muted-foreground">{formData.position}</p>
            <div className="mt-4 space-y-2 w-full">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.address}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.company}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Profile' : 'Account Details'}</CardTitle>
            <CardDescription>
              {isEditing 
                ? 'Update your personal information' 
                : 'View and manage your account information'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      name="department" 
                      value={formData.department} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input 
                      id="position" 
                      name="position" 
                      value={formData.position} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{formData.address}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Employment Information</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{formData.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{formData.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-medium">{formData.position}</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
