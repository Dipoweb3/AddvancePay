
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Compare</h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            AdvancePay offers competitive advantages over traditional financial solutions and other DeFi platforms.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                <TableHead className="text-center bg-primary/5">AdvancePay</TableHead>
                <TableHead className="text-center">Traditional Payday Loans</TableHead>
                <TableHead className="text-center">Bank Loans</TableHead>
                <TableHead className="text-center">Other DeFi Platforms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Interest Rate</TableCell>
                <TableCell className="text-center bg-primary/5">
                  <span className="font-bold text-primary">2-5%</span>
                </TableCell>
                <TableCell className="text-center">10-15%</TableCell>
                <TableCell className="text-center">18-24% APR</TableCell>
                <TableCell className="text-center">Variable (3-8%)</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Approval Time</TableCell>
                <TableCell className="text-center bg-primary/5">
                  <span className="font-bold text-primary">Instant</span>
                </TableCell>
                <TableCell className="text-center">1-24 hours</TableCell>
                <TableCell className="text-center">Days to weeks</TableCell>
                <TableCell className="text-center">Instant</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Repayment</TableCell>
                <TableCell className="text-center bg-primary/5">
                  <span className="font-bold text-primary">Automatic via payroll</span>
                </TableCell>
                <TableCell className="text-center">Manual (high risk)</TableCell>
                <TableCell className="text-center">Manual schedules</TableCell>
                <TableCell className="text-center">Smart contracts</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Hidden Fees</TableCell>
                <TableCell className="text-center bg-primary/5">
                  <div className="flex justify-center">
                    <X className="text-destructive h-5 w-5" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Check className="text-neutral h-5 w-5" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Check className="text-neutral h-5 w-5" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <X className="text-destructive h-5 w-5" />
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Web3 Integration</TableCell>
                <TableCell className="text-center bg-primary/5">
                  <div className="flex justify-center">
                    <Check className="text-primary h-5 w-5" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <X className="text-neutral h-5 w-5" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <X className="text-neutral h-5 w-5" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Check className="text-neutral h-5 w-5" />
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Savings Options</TableCell>
                <TableCell className="text-center bg-primary/5">
                  <span className="font-bold text-primary">Fixed & High-Yield</span>
                </TableCell>
                <TableCell className="text-center">None</TableCell>
                <TableCell className="text-center">Low-interest savings</TableCell>
                <TableCell className="text-center">Yield farming</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
