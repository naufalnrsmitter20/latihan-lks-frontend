"use client";
import { PlaceDataProps } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function Modal({ action, setIsOpenModal, DataPlace }: { action: string; setIsOpenModal: Dispatch<SetStateAction<boolean>>; DataPlace?: PlaceDataProps }) {
  const [name, setName] = useState<string>(DataPlace?.name as string);
  const [latitude, setLatitude] = useState<string>(DataPlace?.latitude as string);
  const [longitude, setLongitude] = useState<string>(DataPlace?.longitude as string);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(`http://localhost:8000/${DataPlace?.image_path as string}`);
  const [description, setDescription] = useState<string>(DataPlace?.description as string);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const HandleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePath(URL.createObjectURL(file));
    }
  };
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image_path", imageFile);
      }
      console.log(...formData.entries());

      const res = await fetch("http://localhost:8000/api/v1/place", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const payload = await res.json();
      if (!payload.status) {
        setError(payload.message);
        console.log(payload.message);
        console.log(formData);
        return;
      }
      console.log(payload.message);
      alert("Success");
      router.refresh();
      setIsOpenModal(false);
      window.location.reload();

      return payload;
    } catch (error) {
      console.log(error);
      throw error as Error;
    }
  };
  const HandleUpdate = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image_path", imageFile);
      }
      const res = await fetch(`http://localhost:8000/api/v1/place/${DataPlace?.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const payload = await res.json();
      if (payload.status !== true) {
        // alert(payload.message);
        setError(payload.message);
        console.log(payload.message);
        console.log(formData);
        return;
      }
      setIsOpenModal(false);
      alert(payload.message);
      window.location.reload();
      return payload;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <>
      <div className="w-screen h-screen z-10 fixed top-0 left-0 bg-black/20"></div>
      <div className="bg-white fixed rounded-lg top-[15%] overflow-scroll max-h-[600px] left-[25%] border p-4 z-20 border-black ring-2 mx-auto ring-slate-400 max-w-3xl h-auto w-full">
        <form encType="multipart/formdata" onSubmit={DataPlace ? HandleUpdate : HandleSubmit}>
          <h1 className="text-black font-semibold text-lg">Modal {action} User</h1>
          <div className="space-y-3 my-2">
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="name">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                placeholder="Input name of place"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="latitude">
                Latitude
              </label>
              <input
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                placeholder="Input latitude of place"
                type="text"
                name="latitude"
                id="latitude"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="longitude">
                Longitude
              </label>
              <input
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                placeholder="Input longitude of place"
                type="text"
                name="longitude"
                id="longitude"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="image_path">
                Image
              </label>
              <input
                onChange={HandleImageChange}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                placeholder="Input name of place"
                type="file"
                name="image_path"
                id="image_path"
                accept="image/*"
              />
            </div>
            {imagePath && (
              <div className="my-2">
                <div>
                  <p>Preview Image</p>
                </div>
                <Image width={300} height={120} className="object-cover" src={imagePath} alt={DataPlace ? imagePath : "select image"} />
              </div>
            )}
            <div className="space-y-2 mb-2">
              <label className="text-base font-semibold text-slate-700" htmlFor="description">
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-slate-500 outline-none rounded-md hover:border-black focus:ring-4 focus:ring-slate-300 px-3 w-full py-2"
                placeholder="Input description of place"
                type="text"
                name="description"
                id="description"
              />
            </div>
            <p className="my-3 text-red-500">{error && error}</p>
            <div className="flex justify-start items-center gap-x-4">
              <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200 rounded-md border-2 mt-2 text-white font-semibold border-blue-600">
                Submit
              </button>
              <button onClick={() => setIsOpenModal(false)} type="button" className="px-4 py-2 bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-200 rounded-md border-2 mt-2 text-white font-semibold border-red-600">
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
