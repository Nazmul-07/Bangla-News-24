
"use client";

import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setDate(formattedDate);
  }, []);

  return (
    <p
      className="
        w-full min-w-0
        text-xs leading-relaxed text-gray-500
        wrap-break-word
        sm:text-[13px]
        md:text-sm
        lg:text-base
      "
      aria-label="আজকের তারিখ"
    >
      {date || "তারিখ লোড হচ্ছে..."}
    </p>
  );
}
