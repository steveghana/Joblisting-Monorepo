import { Card } from "@mui/material";
import { DevDetails } from "./crypto_order";
import RecentOrdersTable from "./RecentOrdersTable";
import { subDays } from "date-fns";

function RecentOrders() {
  const cryptoOrders: DevDetails[] = [
    {
      id: "1",
      devDetails: "Fiat Deposit",
      date: new Date().getTime(),
      status: "Active",
      interviewStatus: "pending",
      skills: ["React.js", "Nextjs", "Python", "Typescript"],
      experience: 56787,
    },
    {
      id: "2",
      devDetails: "Fiat Deposit",
      date: subDays(new Date(), 1).getTime(),
      interviewStatus: "completed",
      status: "Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 8734587,
    },
    {
      id: "3",
      devDetails: "Fiat Deposit",
      date: subDays(new Date(), 5).getTime(),
      interviewStatus: "failed",
      status: "Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 8734587,
    },
    {
      id: "4",
      devDetails: "Fiat Deposit",
      date: subDays(new Date(), 55).getTime(),
      interviewStatus: "completed",
      status: "Not Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 8734587,
    },
    {
      id: "5",
      devDetails: "Fiat Deposit",
      date: subDays(new Date(), 56).getTime(),
      interviewStatus: "pending",
      status: "Not Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 8734587,
    },
    {
      id: "6",
      devDetails: "Fiat Deposit",
      date: subDays(new Date(), 33).getTime(),
      interviewStatus: "completed",
      status: "Not Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 8734587,
    },
    {
      id: "7",
      devDetails: "Fiat Deposit",
      date: new Date().getTime(),
      interviewStatus: "pending",
      status: "Not Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 234234,
    },
    {
      id: "8",
      devDetails: "Paypal Withdraw",
      date: subDays(new Date(), 22).getTime(),
      interviewStatus: "completed",
      status: "Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 34544,
    },
    {
      id: "9",
      devDetails: "Fiat Deposit",
      date: subDays(new Date(), 11).getTime(),
      interviewStatus: "completed",
      status: "Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 123843,
    },
    {
      id: "10",
      devDetails: "Wallet Transfer",
      date: subDays(new Date(), 123).getTime(),
      interviewStatus: "failed",
      status: "Not Active",
      skills: ["React.js", "Nextjs", "Python"],
      experience: 7567,
    },
  ];

  return (
    <Card>
      <RecentOrdersTable devDetails={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
