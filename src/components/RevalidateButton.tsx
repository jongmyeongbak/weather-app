"use client";

import { useRouter } from "next/navigation";

type Props = {
  tag: string;
};

export default function RevalidateButton({ tag }: Props) {
  const router = useRouter();
  const handleClick = async () => {
    fetch("/api/revalidate?tag=time", {
      method: "POST",
    });
    const res = await fetch("/api/revalidate?tag=" + tag, {
      method: "POST",
    });

    // console.log(await res.json());
    router.refresh();
  };

  return (
    <button type="button" onClick={handleClick}>
      새 정보 받아오기
    </button>
  );
}
