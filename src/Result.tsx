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

    return [temp[1] / 5, temp[2] / 5, temp[3] / 5, temp[4] / 5, temp[5] / 5];
  }

  return (
    <div className="w-full flex flex-col items-center">
      {finished ? (
        <>
          <strong className="text-lg mt-4 text-text-primary">Hasil tes kamu</strong>
          <a
            target="_blank"
            className="text-green-400 hover:underline"
            href="https://talent-alpha.com/blog/understanding-talent-analytics/understanding-your-big-5-personality-results/"
          >
            Penjelasan
          </a>

          <div className="grid grid-cols-2 mt-4">
            {calculateResult(cookie.answers).map((o, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full">
                <p className="mb-4 text-lg text-center">
                  {data.labels[i]}
                  <br />
                  <span className="text-2xl font-bold text-green-400">{o}</span>
                  <span className="text-text-secondary">/10</span>
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
                  max: 10,
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
        </>
      ) : (
        <span className="mb-8">Kamu belum menjawab semua pertanyaan pada kuesioner</span>
      )}

      <div className="w-full">
        <p className={`${finished ?? "xl:-mt-24"} mb-4`}>Referensi:</p>
      </div>
      <ul className="text-sm text-text-secondary flex flex-col gap-2">
        <li className="-indent-8 px-8">
          Goldberg, L. R. (1992).{" "}
          <i>The development of markers for the Big-Five factor structure. Psychological Assessment</i>. 4, 26-42.
        </li>
        <li className="-indent-8 px-8">
          Kalinowska, J. (2021, January 18). <i>Understanding your big 5 personality results</i>. Talent Alpha.
          <a
            className="hover:underline"
            href="https://talent-alpha.com/blog/understanding-talent-analytics/understanding-your-big-5-personality-results/"
          >
            https://talent-alpha.com/blog/understanding-talent-analytics/understanding-your-big-5-personality-results/
          </a>
        </li>
        <li className="-indent-8 px-8">
          Sari, Dian A. (2010).{" "}
          <i>
            Uji Validitas Alat Ukur Big Five Personality (Adaptasi dari IPIP) Pada Mahasiswa Universitas Islam Negeri
            Syarif Hidayatullah Jakarta
          </i>
          . UIN Syarif Hidayatullah Jakarta.
        </li>
      </ul>

      <button
        onClick={() => navigate("/")}
        className={`w-full p-2 mt-8 rounded-md mb-8 bg-surface-1 hover:bg-surface-12 text-lg ease-in-out transition-all`}
      >
        Beranda
      </button>
    </div>
  );
}
