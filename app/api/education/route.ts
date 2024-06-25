import { NextResponse } from "next/server";

import prisma from "../../../prisma/client";

export async function GET() {
  //get all educations
  const educations = await prisma.education.findMany();

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data education",
      data: educations,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: any) {
  const { name, desc, start, end } = await request.json();

  const education = await prisma.education.create({
    data: {
      name: name,
      desc: desc,
      start: start,
      end: end,
    },
  });

  return NextResponse.json(
    {
      sucess: true,
      message: "Education created",
      data: education,
    },
    {
      status: 201,
    }
  );
}
