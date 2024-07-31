import HomeButton from "@/components/HomeButton";
import RevalidateButton from "@/components/RevalidateButton";
import { getForecast } from "@/utils/getForecast";
import { getTime } from "@/utils/getTime";
import Image from "next/image";

type Props = {
  params: {
    location: string;
  };
  searchParams: {
    name: string;
  };
};

function kphToMps(kph: number) {
  const Mps = (kph * 5) / 18;
  const roundedMps = Math.round(Mps * 10) / 10;
  return roundedMps;
}

export function generateMetadata({ searchParams }: Props) {
  return {
    title: `날씨 앱 - ${searchParams.name}`,
    description: `${searchParams.name} 날씨를 알려드립니다`,
  };
}

export default async function Detail({ params, searchParams }: Props) {
  const time = await getTime("asia/seoul");
  const dateTime = new Date(time.dateTime);
  const formattedDateTime = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateTime);

  const name = searchParams.name;

  const res = await getForecast(params.location);

  return (
    <>
      <HomeButton /> <RevalidateButton tag={"forecast"} />
      <h1>{name}의 4일 예보</h1>
      <h5>{formattedDateTime} 기준</h5>
      <ul>
        {res.forecast.forecastday.map((day) => (
          <li key={day.date}>
            {day.date}{" "}
            <Image
              src={`https:${day.day.condition.icon}`}
              alt="날씨"
              width={32}
              height={32}
            />{" "}
            최고{day.day.maxtemp_c}° 최저{day.day.mintemp_c}° 평균
            {day.day.avgtemp_c}° 습도{day.day.avghumidity}% 비올확률
            {day.day.daily_chance_of_rain}% uv
            {day.day.uv}
          </li>
        ))}
      </ul>
      <hr />
      <h2>시간별 예보</h2>
      <ul>
        {res.forecast.forecastday.map((day) => (
          <li key={day.date}>
            <strong>{day.date}</strong>
            <ul>
              {day.hour.map((hour) => (
                <li key={hour.time_epoch}>
                  {hour.time.split(" ")[1]}{" "}
                  <Image
                    src={`https:${hour.condition.icon}`}
                    alt=""
                    width={24}
                    height={24}
                  />
                  {hour.temp_c}° {hour.humidity}% {kphToMps(hour.wind_kph)}m/s
                  체감{hour.feelslike_c}° 비올확률
                  {hour.chance_of_rain}% uv{hour.uv}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <HomeButton />
    </>
  );
}
