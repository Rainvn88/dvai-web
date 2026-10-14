"use client";

import { useSearchParams } from "next/navigation";
import { site } from "@/content/site";

export function ThankYouMessage() {
  const query = useSearchParams();
  const consult = query.get("loai") === "tu-van";
  return (
    <>
      <h1 className="display-1">{consult ? "Đã nhận yêu cầu đặt lịch tư vấn" : "Đã nhận yêu cầu báo giá"}</h1>
      <p className="lede mt-5">
        {consult
          ? `Chúng tôi sẽ liên hệ trong ${site.responseTime} để thống nhất thời gian trao đổi qua Teams.`
          : `Chúng tôi sẽ liên hệ trong ${site.responseTime} để gửi báo giá.`}
      </p>
    </>
  );
}
