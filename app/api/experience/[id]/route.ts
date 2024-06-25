import { NextResponse } from "next/server";

import prisma from "../../../../prisma/client";

export async function GET(request: any, { params }: any) {
  const id = parseInt(params.id);

  const experience = await prisma.experience.findUnique({
    where: {
      id: id,
    },
  });

  if (!experience) {
    return NextResponse.json(
      {
        sucess: false,
        message: "experience not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      sucess: true,
      message: "Data experience",
      data: experience,
    },
    {
      status: 201,
    }
  );
}

export async function PATCH(request: any, { params }: any) {
  const id = parseInt(params.id);

  // get request data
  const { name, desc, start, end, present } = await request.json();

  // update profile
  const experience = await prisma.experience.update({
    where: {
      id: id,
    },
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
      message: "experience updated",
      data: experience,
    },
    { status: 200 }
  );
}

export async function DELETE(request: any, { params }: any) {
  const id = parseInt(params.id);

  await prisma.experience.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(
    {
      sucess: true,
      message: "experience deleted",
    },
    { status: 200 }
  );
}
