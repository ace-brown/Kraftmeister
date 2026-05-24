"use client";

import { useJob } from "../../hooks/useJob";

// { id: "cmph7jzv8000001qwn3laltv1",
//   title: "fjsfj kjfds ",
//   description: "jfs f skfj sfj s sdfjdsf ds ksfjdslf s fkdsjf",
//   status: "open",
//   address: "jdsjfkdsf",
//   createdAt: "2026-05-22T17:43:03.764Z"
// }

export default function JobDetails({ id }: { id: string }) {
  const { data, error, isLoading } = useJob(id);
  return <div>JobDetails</div>;
}
