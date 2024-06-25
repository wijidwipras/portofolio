import { NextResponse } from "next/server";

import prisma from "../../../prisma/client";

export async function GET() {
  //get all posts
  const experiences = await prisma.experience.findMany();
  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data experience",
      data: experiences,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: any) {
  const { name, desc, start, end, present } = await request.json();

  const experience = await prisma.experience.create({
    data: {
      name: name,
      desc: desc,
      start: start,
      end: end,
      present: present,
    },
  });

  return NextResponse.json(
    {
      sucess: true,
      message: "data experience created",
      data: experience,
    },
    {
      status: 201,
    }
  );
}
