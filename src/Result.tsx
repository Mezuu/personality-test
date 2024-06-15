import quesdata from "./assets/data.json";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Result() {
  const [cookie] = useCookies(["answers"]);
  const navigate = useNavigate();
  const finished = cookie.answers.filter((a: number) => a !== 0).length === quesdata.length;

  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

  const data = {
    labels: ["Extraversion", "Agreeableness", "Conscientiousness", "Emotional Stability", "Intellect/Imagination"],
    datasets: [
      {
        label: "Scale",
        data: calculateResult(cookie.answers),
        backgroundColor: "rgb(74, 222, 128, 0.2)",
        borderColor: "#16a34a",
        borderWidth: 1,
      },
    ],
  } satisfies ChartData<"radar", number[], string>;

  function calculateResult(ansvers: string) {
    let temp = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    quesdata.forEach((o, i) => {
      if (o.key === "+") {
        temp[o.trait as 1 | 2 | 3 | 4 | 5] += parseInt(ansvers[i]);
      } else {
        temp[o.trait as 1 | 2 | 3 | 4 | 5] += 6 - parseInt(ansvers[i]);
      }
    });

    return [temp[1] / 10, temp[2] / 10, temp[3] / 10, temp[4] / 10, temp[5] / 10];
  }

  return (
    <div className="w-full flex flex-col items-center">

      {finished ? <>
      
      <strong className="text-lg mt-4 text-text-primary">Hasil tes kamu</strong>
      <a className="text-green-400 hover:underline" href="https://ipqi.org/teori-kepribadian-model-lima-besar-big-five-personality/">Penjelasan</a>
      
      <div className="grid grid-cols-2 mt-4">
        {calculateResult(cookie.answers).map((o, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-full">
            <p className="mb-4 text-lg text-center">
              {data.labels[i]}
              <br />
              <span className="text-xl font-bold text-green-400">{o}</span><span className="text-text-secondary">/5</span>
            </p>
          </div>
        ))}
      </div>

      <Radar
        className="-mt-24"
        data={data}
        options={{
          scales: {
            r: {
              pointLabels: {
                font: {
                  size: 18,
                },
                color: "rgba(255,255,255,0.87)",
              },
              min: 0,
              max: 5,
              grid: {
                color: "rgba(255,255,255,0.2)",
              },
              ticks: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      </> : <span className="mb-8">Kamu belum menjawab semua pertanyaan pada kuesioner</span> }

      <button
        onClick={() => navigate("/")}
        className="w-full p-2 xl:-mt-24 rounded-md mb-8 bg-surface-1 hover:bg-surface-12 text-lg ease-in-out transition-all"
      >
        Beranda
      </button>
    </div>
  );
}
