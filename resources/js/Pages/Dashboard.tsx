import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Authenticated from "@/layouts/AuthenticatedLayout";

export default function Page() {
  return (
    <Authenticated>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Active Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Pending Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Total Disbursement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm text-foreground/75">
              <CardTitle>Total Withdrawal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">Rp1,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Authenticated>
  );
}
