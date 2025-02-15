import Paginator from "@/components/fragments/paginator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Authenticated from "@/layouts/AuthenticatedLayout";
import { PageProps, PaginationProps } from "@/types";
import { MerchantDomain } from "@/types/entity/domain";
import { Head, router, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { Loader2Icon, Plus } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DialogFormContext = createContext({
  selected: null as MerchantDomain | null,
  open: false,
  setOpen: (_open: boolean) => {},
});

const createFormSchema = z.object({
  domain: z.string(),
});

const filterFormSchema = z.object({
  domain: z.string().optional(),
});

const DialogForm = () => {
  const { open, setOpen, selected } = useContext(DialogFormContext);
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof createFormSchema>>({
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    router.visit(
      route(`merchant.domain.${selected ? "update" : "store"}`, selected?.id),
      {
        method: selected ? "patch" : "post",
        data: values,
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

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
            {selected ? "Edit Domain" : "Add New Domain"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Domain Name"
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

type DomainIndexPageProps = PageProps<PaginationProps<MerchantDomain[]>>;

export default function MerchantDomainIndex() {
  const { data, last_page, current_page, per_page, path } =
    usePage<DomainIndexPageProps>().props;

  const [selected, setSelected] = useState<MerchantDomain | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof filterFormSchema>>({
    defaultValues: { domain: '' },
  });

  const onSubmit = (values: z.infer<typeof filterFormSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    if (!open) {
      setSelected(null);
    }
  }, [open]);

  return (
    <Authenticated>
      <Head>
        <title>Your Domains</title>
      </Head>
      <DialogFormContext.Provider value={{ selected, open, setOpen }}>
        <DialogForm />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h1 className="text-xl font-semibold">Your Domains</h1>
          <div className="flex justify-between items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="items-center gap-4 flex"
              >
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Input placeholder="Filter by domain name..." {...field} />
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
              <span>Register Domain</span>
            </Button>
          </div>
          <Card className="flex">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead style={{ width: 128 }}>Registered At</TableHead>
                  <TableHead
                    style={{ width: 180 }}
                    className="text-right"
                  ></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data ?? []).map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell>{domain.domain}</TableCell>
                    <TableCell style={{ width: 128 }}>
                      {dayjs(domain.created_at).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell className="flex justify-end gap-1">
                      <Button
                        size="sm"
                        onClick={() => {
                          setOpen(true);
                          setSelected(domain);
                        }}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <Paginator
            current={current_page ?? 1}
            total={last_page ?? 0}
            onChange={(page) =>
              router.get(`${path}?page=${page}&per_page=${per_page}`)
            }
          />
        </div>
      </DialogFormContext.Provider>
    </Authenticated>
  );
}
