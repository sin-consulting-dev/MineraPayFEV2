import Paginator from "@/components/fragments/paginator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
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
import { PaginationProps } from "@/types";
import { Bank } from "@/types/entity/bank";
import { MerchantBankAccount } from "@/types/entity/merchant";
import { Head, router } from "@inertiajs/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import {
  BanIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  Loader2Icon,
  Plus,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const DialogFormContext = createContext({
  selected: null as MerchantBankAccount | null,
  open: false,
  setOpen: (_open: boolean) => {},
});

const createFormSchema = z.object({
  name: z.string(),
  number: z.string(),
  bank_id: z.number(),
});

const filterFormSchema = z.object({
  search: z.string().optional(),
});

const DialogForm = () => {
  const { open, setOpen, selected } = useContext(DialogFormContext);

  const queryClient = useQueryClient();
  const [isSubmitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 100,
    search: null,
  });

  const { data } = useQuery<PaginationProps<Bank[]>>({
    queryKey: ["bank", filter],
    queryFn: async () => {
      const response = await axios.get<PaginationProps<Bank[]>>(
        route("bank.index"),
        {
          params: filter,
        }
      );

      return response.data;
    },
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof createFormSchema>) => {
      setSubmitting(true);
      const response = await axios(
        route(
          `merchant.bank-account.${selected ? "update" : "store"}`,
          selected?.id
        ),
        {
          method: selected ? "patch" : "post",
          data: values,
        }
      );

      return response.data;
    },
    onError: (error) => {
      toast.error(error?.message ?? "An error occurred.");
    },
    onSettled: () => {
      setSubmitting(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant.bank_account'] })
      form.reset();
      setOpen(false);
    },
  })

  const form = useForm<z.infer<typeof createFormSchema>>({
    defaultValues: {},
  });

  useEffect(() => {
    if (selected) {
      form.reset(selected);
    } else {
      form.reset();
    }
  }, [selected]);

  return (
    <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selected ? "Edit Bank Account" : "Add New Bank Account"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="bank_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Bank</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? (data?.data ?? []).find(
                                  (bank) => bank.id === field.value
                                )?.name
                              : "Select bank"}
                            <ChevronsUpDownIcon className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search bank..."
                            className="h-8"
                          />
                          <CommandList>
                            <CommandEmpty>No banks found.</CommandEmpty>
                            <CommandGroup>
                              {(data?.data ?? []).map((bank) => (
                                <CommandItem
                                  value={bank.name}
                                  key={bank.id}
                                  onSelect={() => {
                                    form.setValue("bank_id", bank.id);
                                  }}
                                >
                                  {bank.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      bank.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Bank Account Name"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Enter Account Number"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    form.reset();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2Icon size="sm" />
                      <span>Saving</span>
                    </span>
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type TableFilter = {
  page: number;
  per_page: number;
  search: string | null;
};

export default function Page() {
  const [selected, setSelected] = useState<MerchantBankAccount | null>(null);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<TableFilter>({
    page: 1,
    per_page: 10,
    search: null,
  });

  const { data, isError, error, isLoading } = useQuery<
    PaginationProps<MerchantBankAccount[]>
  >({
    queryKey: ["merchant.bank_account", filter],
    queryFn: async () => {
      const response = await axios<PaginationProps<MerchantBankAccount[]>>(
        route("merchant.bank-account.index"),
        {
          params: filter,
        }
      );

      return response.data;
    },
  });

  const form = useForm<z.infer<typeof filterFormSchema>>({
    defaultValues: { search: "" },
  });

  if (isError) {
    toast.error(error.message ?? "An error occurred");
  }

  useEffect(() => {
    if (!open) {
      setSelected(null);
    }
  }, [open]);

  return (
    <Authenticated>
      <Head>
        <title>Bank Account</title>
      </Head>
      <DialogFormContext.Provider value={{ selected, open, setOpen }}>
        <DialogForm />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h1 className="text-xl font-semibold">Your Bank Accounts</h1>
          <div className="flex justify-between items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  setFilter({ ...filter, ...values })
                )}
                className="items-center gap-4 flex"
              >
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Input
                          placeholder="Filter bank accounts..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Button>Apply Filter</Button>
                  </div>
                </div>
              </form>
            </Form>
            <Button
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Plus className="size-4" />
              <span>Add New Bank Account</span>
            </Button>
          </div>
          <Card className="flex">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Account Holder Name</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead style={{ width: 128 }}>Registered At</TableHead>
                  <TableHead
                    style={{ width: 180 }}
                    className="text-right"
                  ></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(10).keys()].map((index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (data?.data ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex flex-col items-center justify-center p-4 gap-2">
                        <BanIcon size={32} />
                        <span>No data available</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  (data?.data ?? []).map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.number}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.bank.name}</TableCell>
                      <TableCell style={{ width: 128 }}>
                        {dayjs(account.created_at).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          onClick={() => {
                            setOpen(true);
                            setSelected(account);
                          }}
                        >
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
          <Paginator
            current={filter.page}
            total={(total ?? 1) / filter.per_page}
            onChange={(page) => setFilter({ ...filter, page })}
          />
        </div>
      </DialogFormContext.Provider>
    </Authenticated>
  );
}
