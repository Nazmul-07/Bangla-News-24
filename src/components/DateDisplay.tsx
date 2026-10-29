
"use client";

import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setDate(formattedDate);
  }, []);

  return (
    <p className="w-full min-w-0 text-xs leading-relaxed text-gray-500">
      {date || "তারিখ লোড হচ্ছে..."}
    </p>
  );
}
