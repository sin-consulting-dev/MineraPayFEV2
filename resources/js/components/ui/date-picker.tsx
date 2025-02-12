import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerProps {
  value?: Dayjs;
  format?: string;
  onChange?: (date?: Dayjs) => void;
}

export function DatePicker({ value, onChange, format = 'DD MMM YYYY' }: DatePickerProps) {
  const [_value, _setValue] = React.useState<Dayjs | undefined>(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !_value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {_value ? _value.format(format) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={_value?.toDate()}
          onSelect={(date) => {
            _setValue(dayjs(date));
            onChange?.(dayjs(date));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
