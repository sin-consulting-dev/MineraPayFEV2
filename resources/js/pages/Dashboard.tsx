import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import Authenticated from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";

export default function Dashboard() {
  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
  }

  return (
    <Authenticated>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Merchant Active Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Merchant Pending Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Merchant Total Withdrawal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Total Today Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-green-500">Deposit</span>
                  <span className="text-2xl font-black">23,789</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs  text-red-500">Withdraw</span>
                  <span className="text-2xl font-black">23,789</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Total Today Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Total Today Withdrawal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="flex-grow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 text-sm text-foreground/75">
            <CardTitle className="text-2xl font-black">
              Transaction Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="border border-border">
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: '27.5%' }}>Transaction ID</TableHead>
                  <TableHead style={{ width: '18.25%' }}>Reference ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead style={{ width: 64 }}>Status</TableHead>
                  <TableHead style={{ width: 64 }}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5).keys()].map((index) => (
                  <TableRow key={index}>
                    <TableCell>{crypto.randomUUID()}</TableCell>
                    <TableCell>MNP-{generateRandomString(16)}</TableCell>
                    <TableCell>{dayjs().format('DD/MM/YYYY HH:mm')}</TableCell>
                    <TableCell>Deposit</TableCell>
                    <TableCell>Rp1,000,000</TableCell>
                    <TableCell>Rp1,110</TableCell>
                    <TableCell>SUCCESS</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Authenticated>
  );
}
