import Link from "next/link";
import style from "./page.module.css";
import { getCurrentWeather } from "@/utils/getCurrentWeather";
import { getTime } from "@/utils/getTime";
import RevalidateButton from "@/components/RevalidateButton";
import Image from "next/image";

export default async function Home() {
  const res = await getCurrentWeather("seoul");
  const res2 = await getCurrentWeather("37.701,127.456");
  const time = await getTime(res.location.tz_id);

  const windSpeed = (res.current.wind_kph * 5) / 18;
  const roundedWindSpeed = Math.round(windSpeed * 10) / 10;

  const windSpeed2 = (res2.current.wind_kph * 5) / 18;
  const roundedWindSpeed2 = Math.round(windSpeed2 * 10) / 10;

  const dateTime = new Date(time.dateTime);
  const formattedDateTime = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateTime);

  return (
    <>
      <h1>서울과 가평 날씨</h1>
      <h3>{formattedDateTime} 현재 날씨</h3>
      <ul className={style.list}>
        <li>
          <Image
            src={`https:${res.current.condition.icon}`}
            alt="서울 날씨"
            width={48}
            height={48}
          />
          <Link href="/seoul?name=서울">서울</Link>
          <span>
            {" "}
            {res.current.temp_c}° {res.current.humidity}% 체감
            {res.current.feelslike_c}° {roundedWindSpeed}m/s uv{res.current.uv}
          </span>
        </li>
        <li>
          <Image
            src={`https:${res2.current.condition.icon}`}
            alt="설악 날씨"
            width={48}
            height={48}
          />
          <Link href="/37.701,127.456?name=가평군설악면">가평군설악면</Link>
          <span>
            {" "}
            {res2.current.temp_c}° {res2.current.humidity}% 체감
            {res2.current.feelslike_c}° {roundedWindSpeed2}m/s uv
            {res2.current.uv}
          </span>
        </li>
      </ul>
      <RevalidateButton tag={"current"} />
    </>
  );
}
