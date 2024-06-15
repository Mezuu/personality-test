import { useState } from "react";
import { useCookies } from "react-cookie";
import data from "./assets/data.json";
import { useNavigate } from "react-router-dom";

export function Test() {
  const [page, setPage] = useState<number>(0);
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  const [cookie, setCookie] = useCookies(["answers"]);
  const navigate = useNavigate();

  const answer = parseInt(cookie.answers[page ?? 0]);
  const finished = cookie.answers.filter((a: number) => a !== 0).length === data.length;

  if (!cookie.answers) {
    setCookie(
      "answers",
      Array.from({ length: data.length }, () => 0)
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-8">
      <div className="flex flex-col items-center gap-2 w-full">
        <p className="mb-4 text-lg">
          {page + 1}. {data[page].question_id}
        </p>
        {["Sangat Setuju", "Setuju", "Netral", "Tidak Setuju", "Sangat Tidak Setuju"].map((o, i) => (
          <button
            key={i}
            onClick={() => {
              let tempAnswers = cookie.answers;
              tempAnswers[page] = 5 - i;
              setCookie("answers", tempAnswers);
              if (page === data.length - 1) {
              } else {
                setPage(page + 1);
              }
            }}
            className={`w-full p-2 px-4 rounded-md text-xl bg-surface-1 hover:bg-surface-12 ease-in-out transition-all ${
              5 - i === answer ? "bg-green-500 text-gray-900 hover:text-text-primary" : ""
            }`}
          >
            {o}
          </button>
        ))}

        <div className="grid grid-cols-10 gap-2 rounded-md mt-8 w-max">
          {Array.from({ length: data.length }, (_, i) => (
            <button
              onClick={() => setPage(i)}
              className={`w-8 h-8 rounded-md transition-all ease-in-out ${
                parseInt(cookie.answers[i]) !== 0
                  ? page === i
                    ? "bg-green-600"
                    : "bg-green-400 hover:bg-green-600"
                  : page === i
                  ? "bg-surface-12 hover:bg-surface-12"
                  : "bg-surface-1 hover:bg-surface-12"
              }`}
              key={i}
            ></button>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate("/result")}
        disabled={!finished}
        className={`p-2 transition-all ease-in-out rounded-md mt-8 text-lg w-full ${
          !finished ? "cursor-not-allowed text-text-muted" : "bg-green-400 text-gray-900 hover:bg-green-600"
        }`}
      >
        Hasil
      </button>
      <button
        onClick={() => setResetModalOpen(true)}
        className={`bg-surface-1 hover:bg-red-500 p-2 transition-all ease-in-out rounded-md mt-2 text-lg w-full`}
      >
        Hapus Semua Jawaban
      </button>

      {resetModalOpen && <div className="fixed bg-black bg-opacity-50 backdrop-blur-md w-screen h-screen top-0 flex justify-center items-center">
        <div className="bg-surface mx-4 rounded-md">
          <div className=" p-4 rounded-md bg-surface-1 text-text-primary">
            <span>Apakah kamu yakin akan menghapus semua jawaban?</span>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => {
                  setCookie(
                    "answers",
                    Array.from({ length: data.length }, () => 0)
                  );
                  setResetModalOpen(false);
                }}
                className="p-2 rounded-md bg-red-500 hover:bg-red-600 ease-in-out transition-all"
              >
                Hapus
              </button>
              <button onClick={() => setResetModalOpen(false)} className="p-2 rounded-md bg-surface-1 hover:bg-surface-12 ease-in-out transition-all">
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
