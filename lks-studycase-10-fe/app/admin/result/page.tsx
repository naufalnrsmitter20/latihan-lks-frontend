"use client";
import React from "react";
import Table from "./Table";

export default function resultVote() {
  return (
    <div className="max-w-screen-2xl w-full">
      <div>
        <div className="my-3 mx-2">
          <h4 className="text-2xl font-semibold">Result</h4>
        </div>
        <Table />
      </div>
    </div>
  );
}
