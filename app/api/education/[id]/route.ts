import { NextResponse } from "next/server";

import prisma from "../../../../prisma/client";

export async function GET(request: any, props: any) {
  const params = await props.params;
  const id = parseInt(params.id);

  const education = await prisma.education.findUnique({
    where: {
      id: id,
    },
  });

  if (!education) {
    return NextResponse.json(
      {
        sucess: false,
        message: "Education not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      sucess: true,
      message: "Data education",
      data: education,
    },
    {
      status: 201,
    }
  );
}

export async function PATCH(request: any, props: any) {
  const params = await props.params;
  const id = parseInt(params.id);

  // get request data
  const { name, desc, start, end } = await request.json();

  // update profile
  const education = await prisma.education.update({
    where: {
      id: id,
    },
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
      message: "education updated",
      data: education,
    },
    { status: 200 }
  );
}

export async function DELETE(request: any, props: any) {
  const params = await props.params;
  const id = parseInt(params.id);

  await prisma.education.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(
    {
      sucess: true,
      message: "education deleted",
    },
    { status: 200 }
  );
}
