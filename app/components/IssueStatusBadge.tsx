import React from "react";
import { Status } from "../generated/prisma/enums";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<Status, { label: string; color: "red" | "green" | "violet" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

interface Props {
  status: Status;
}

function IssueStatusBadge({ status }: Props) {
  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
}

export default IssueStatusBadge;
