import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Authenticated from "@/layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";

const filterFormSchema = z.object({
  id: z.string().optional(),
  reference: z.string().optional(),
  transaction_date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  paid_date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

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
  const form = useForm<z.infer<typeof filterFormSchema>>({
    defaultValues: {
      id: "",
      reference: "",
      transaction_date: {
        from: dayjs().toDate(),
        to: dayjs().toDate(),
      },
      paid_date: {
        from: dayjs().toDate(),
        to: dayjs().toDate(),
      },
    },
  });

  const onSubmit = (values: z.infer<typeof filterFormSchema>) => {
    console.log(values);
  };

  return (
    <Authenticated>
      <Head>
        <title>Deposit List</title>
      </Head>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-xl font-semibold">Deposit</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="items-center gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
                <FormItem className="flex flex-col">
                  <FormLabel>Merchant Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="Merchant Reference" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transaction_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Transaction Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value   && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value?.from ? (
                            field.value?.to ? (
                              <>
                                {dayjs(field.value?.from).format("DD/MM/YYYY")} -{" "}
                                {dayjs(field.value?.to).format("DD/MM/YYYY")}
                              </>
                            ) : (
                              dayjs(field.value?.from).format("DD/MM/YYYY")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paid_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Paid Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value?.from ? (
                            field.value?.to ? (
                              <>
                                {dayjs(field.value?.from).format("DD/MM/YYYY")} -{" "}
                                {dayjs(field.value?.to).format("DD/MM/YYYY")}
                              </>
                            ) : (
                              dayjs(field.value?.from).format("DD/MM/YYYY")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUCCESS">Success</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="EXPIRED">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <Label>&nbsp;</Label>
              <div className="flex items-center gap-2">
                <Button>Apply Filter</Button>
              </div>
            </div>
          </form>
        </Form>
        <Card className="max-h-full flex-grow overflow-hidden">
          <Table className="overflow-auto">
            <TableHeader className="sticky">
              <TableRow>
                <TableHead style={{ width: "27.5%" }}>Transaction ID</TableHead>
                <TableHead style={{ width: "12.5%" }}>Reference ID</TableHead>
                <TableHead>Transaction Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead style={{ width: 64 }}>Status</TableHead>
                <TableHead style={{ width: 64 }}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...new Array(10)].map((d, i) => (
                <TableRow key={i}>
                  <TableCell>{crypto.randomUUID()}</TableCell>
                  <TableCell>MNP-12345</TableCell>
                  <TableCell>{dayjs().format("DD/MM/YYYY HH:mm")}</TableCell>
                  <TableCell>{dayjs().format("DD/MM/YYYY HH:mm")}</TableCell>
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
