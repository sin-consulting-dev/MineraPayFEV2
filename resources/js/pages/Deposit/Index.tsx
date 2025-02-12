import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Authenticated from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { FilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const filterFormSchema = z.object({
  id: z.string().optional(),
  reference: z.string().optional(),
});

const DialogFilter = () => {
  const form = useForm<z.infer<typeof filterFormSchema>>({
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof filterFormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <FilterIcon />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Transaction ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merchant Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="Merchant Reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Filter</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type DepositIndexPageProps = PageProps<{
  data: {
    id: number;
    transaction_id: string;
    reference_id: string;
    date: string;
    type: string;
    amount: string;
    fee: string;
    status: string;
  }[];
}>;

export default function DepositIndex() {
  const { data } = usePage<DepositIndexPageProps>().props;

  return (
    <Authenticated>
      <Head>
        <title>Deposit List</title>
      </Head>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-xl font-semibold">Deposit</h1>
          <div className="flex items-center gap-2">
            <DatePicker />
            <DialogFilter />
            <Button>Export</Button>
          </div>
        </div>
        <Card className="max-h-full flex-grow overflow-hidden">
          <Table className="overflow-auto">
            <TableHeader className="sticky">
              <TableRow>
                <TableHead style={{ width: "27.5%" }}>Transaction ID</TableHead>
                <TableHead style={{ width: "18.25%" }}>Reference ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead style={{ width: 64 }}>Status</TableHead>
                <TableHead style={{ width: 64 }}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((index) => (
                <TableRow key={index}>
                  <TableCell>{crypto.randomUUID()}</TableCell>
                  <TableCell>MNP-12345</TableCell>
                  <TableCell>{dayjs().format("DD/MM/YYYY HH:mm")}</TableCell>
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
        </Card>
      </div>
    </Authenticated>
  );
}
