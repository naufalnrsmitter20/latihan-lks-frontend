"use client";
import { KandidatProps, KotaProps, PartaiProps, ProvinsiProps, VoteProps, VoteTypeProps } from "@/lib/interfaces";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import animated from "react-select/animated";

const makeAnimated = animated();

export const DefaultModal = ({ setIsOpenModal, action }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; action: string }) => {
  const [error, setError] = useState("");
  const [kota, setKota] = useState<KotaProps[]>([]);
  const [voteType, setvoteType] = useState<VoteTypeProps[]>([]);
  const [provinsi, setProvinsi] = useState<ProvinsiProps[]>([]);

  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/kota", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setKota(payload.data);
    };
    FecthUserData();
  }, []);
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/provinsi", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setProvinsi(payload.data);
    };
    FecthUserData();
  }, []);
  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/vote/type", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setvoteType(payload.data);
    };
    FecthUserData();
  }, []);

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/v1/vote/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.message);
      toast.error(payload.message);
      return;
    }
    toast.success(payload.message);
    window.location.reload();
    setIsOpenModal(false);
  };

  return (
    <div className="z-50 fixed flex top-0 left-0 w-screen h-screen bg-black/30 justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md shadow-slate-300 p-5">
        <h1 className="text-2xl font-semibold">{action} </h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <div className="flex flex-col my-3">
            <label htmlFor="start_date" className="text-lg font-medium">
              Start Date
            </label>
            <input required placeholder="masukkan start_date" type="date" name="start_date" id="start_date" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="end_date" className="text-lg font-medium">
              End Date
            </label>
            <input required placeholder="masukkan end_date" type="date" name="end_date" id="end_date" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300" />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="votetype_id" className="text-lg font-medium">
              Vote Type
            </label>
            <select required name="votetype_id" id="votetype_id" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300">
              <option value="">select</option>
              {voteType.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="kota" className="text-lg font-medium">
              kota
            </label>
            <select name="kota_id" id="kota" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300">
              <option value="">select</option>
              {kota &&
                kota.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.nama_kota}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="provinsi" className="text-lg font-medium">
              provinsi
            </label>
            <select name="provinsi_id" id="provinsi" className="px-4 py-2 border-slate-500 rounded-lg border-2 hover:ring-2 hover:ring-slate-300">
              <option value="">select</option>
              {provinsi &&
                provinsi.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.nama_provinsi}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="mt-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black">
              Submit
            </button>
            <button onClick={() => setIsOpenModal(false)} type="button" className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black">
              close
            </button>
          </div>
          <p className="text-red-500 text-base my-2">{error && error}</p>
        </form>
      </div>
    </div>
  );
};

export const ModalPartai = ({ setIsOpenModal, action, data }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; action: string; data?: VoteProps }) => {
  const [error, setError] = useState("");
  const [partaiData, setPartaiData] = useState<PartaiProps[]>([]);
  const [partaiGroup, setPartaiGroup] = useState<{ label: string; value: string }[]>(data?.partais?.map((x) => ({ label: x.nama_partai, value: x.id })) || []);

  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/partai", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setPartaiData(payload.data);
    };
    FecthUserData();
  }, []);

  const partaiOptions = partaiData.map((x) => ({ label: x.nama_partai, value: x.id }));

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      partai_id: partaiGroup.map((x) => x.value),
    };
    const token = localStorage.getItem("token");
    console.log(formData);

    const response = await fetch(`http://localhost:8000/api/v1/vote/upsert_partai/${data?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(formData),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.message);
      toast.error(payload.message);
      return;
    }
    toast.success(payload.message);
    window.location.reload();
    setIsOpenModal(false);
  };

  const HandleChange = (selectedData: { label: string; value: string }[]) => {
    setPartaiGroup(selectedData);
  };

  return (
    <section className="z-50 fixed flex top-0 left-0 w-screen h-screen bg-black/30 justify-center items-center ">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md shadow-slate-300 p-5 h-[600px] overflow-y-scroll">
        <h1 className="text-2xl font-semibold">{action} </h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <Select components={makeAnimated} onChange={HandleChange as any} value={partaiGroup} isMulti options={partaiOptions} />
          <div className="py-6">
            <h1 className="text-xl font-medium">Data {data?.tipe_pemilihan}</h1>
            {data?.partais ? (
              data?.partais.map((x, i) => (
                <div key={i} className="my-6">
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Nama Partai :</span> {x.nama_partai}
                  </p>
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Nomor Urut :</span> {x.no_urut}
                  </p>
                  <Image width={300} height={200} className="object-cover" src={`http://localhost:8000/${x.logo.replace(" ", "%20")}`} alt={`gambar ${x.nama_partai}`} />
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Created At :</span> {x.created_at}
                  </p>
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Updated At :</span> {x.updated_at}
                  </p>
                </div>
              ))
            ) : (
              <>Bekum ada Partai</>
            )}
          </div>
          <div className="flex gap-4">
            <button type="submit" className="mt-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black">
              Submit
            </button>
            <button onClick={() => setIsOpenModal(false)} type="button" className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black">
              close
            </button>
          </div>
          <p className="text-red-500 text-base my-2">{error && error}</p>
        </form>
      </div>
    </section>
  );
};
export const ModalKandidat = ({ setIsOpenModal, action, data }: { setIsOpenModal: Dispatch<SetStateAction<boolean>>; action: string; data?: VoteProps }) => {
  const [error, setError] = useState("");
  const [kandidatData, setKandidatData] = useState<KandidatProps[]>([]);
  const [kandidatGroup, setKandidatGroup] = useState<{ label: string; value: string }[]>(data?.kandidats?.map((x) => ({ label: x.nama_kandidat, value: x.id })) || []);

  useEffect(() => {
    const FecthUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/candidates", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const payload = await response.json();
      setKandidatData(payload.data);
    };
    FecthUserData();
  }, []);

  const partaiOptions = kandidatData.map((x) => ({ label: x.nama_kandidat, value: x.id }));

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      kandidat_id: kandidatGroup.map((x) => x.value),
    };
    const token = localStorage.getItem("token");
    console.log(formData);

    const response = await fetch(`http://localhost:8000/api/v1/vote/upsert_candidates/${data?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(formData),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.message);
      toast.error(payload.message);
      return;
    }
    toast.success(payload.message);
    window.location.reload();
    setIsOpenModal(false);
  };

  const HandleChange = (selectedData: { label: string; value: string }[]) => {
    setKandidatGroup(selectedData);
  };

  return (
    <section className="z-50 fixed flex top-0 left-0 w-screen h-screen bg-black/30 justify-center items-center ">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md shadow-slate-300 p-5 h-[600px] overflow-y-scroll">
        <h1 className="text-2xl font-semibold">{action} </h1>
        <form onSubmit={HandleSubmit} className="space-y-2">
          <Select components={makeAnimated} onChange={HandleChange as any} value={kandidatGroup} isMulti options={partaiOptions} />
          <div className="py-6">
            <h1 className="text-xl font-medium">Data {data?.tipe_pemilihan}</h1>
            {data?.kandidats ? (
              data?.kandidats.map((x, i) => (
                <div key={i} className="my-6">
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Nama Kandidat :</span> {x.nama_kandidat}
                  </p>
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Nomor Urut :</span> {x.no_urut}
                  </p>
                  <Image width={300} height={200} className="object-cover" src={`http://localhost:8000/${x.image.replace(" ", "%20")}`} alt={`gambar ${x.nama_kandidat}`} />
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Created At :</span> {x.created_at}
                  </p>
                  <p className="text-lg font-medium line-clamp-1">
                    <span className="font-semibold">Updated At :</span> {x.updated_at}
                  </p>
                </div>
              ))
            ) : (
              <>Bekum ada Kandidat</>
            )}
          </div>
          <div className="flex gap-4">
            <button type="submit" className="mt-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-yellow-300 hover:ring-2 hover:ring-yellow-100 px-4 py-2 font-semibold text-black">
              Submit
            </button>
            <button onClick={() => setIsOpenModal(false)} type="button" className="mt-4 bg-red-400 hover:bg-red-500 rounded-lg border-2 border-red-300 hover:ring-2 hover:ring-red-100 px-4 py-2 font-semibold text-black">
              close
            </button>
          </div>
          <p className="text-red-500 text-base my-2">{error && error}</p>
        </form>
      </div>
    </section>
  );
};
