import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  /** Current active page number */
  current?: number;
  /** Total number of pages */
  total?: number;
  /** Callback function when page changes */
  onChange?: (page: number) => void;
}

const DOTS = '...' as const;
type PaginatorItem = number | typeof DOTS;

const Paginator: React.FC<PaginationProps> = ({
  current = 1,
  total = 1,
  onChange,
}) => {
  const range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getPaginationItems = (): PaginatorItem[] => {
    const totalPageNumbers = 7;

    if (totalPageNumbers >= total) {
      return range(1, total);
    }

    const leftSiblingIndex = Math.max(current - 1, 1);
    const rightSiblingIndex = Math.min(current + 1, total);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < total - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 5;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, total];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 5;
      const rightRange = range(total - rightItemCount + 1, total);
      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, total];
    }

    // TypeScript requires this explicit return
    return range(1, total);
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= total && page !== current) {
      onChange && onChange(page);
    }
  };

  const items = getPaginationItems();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={current === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            onClick={() => handlePageChange(current - 1)}
          />
        </PaginationItem>

        {items.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={`dots-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className={`cursor-pointer ${pageNumber === current ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            className={current === total ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            onClick={() => handlePageChange(current + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
