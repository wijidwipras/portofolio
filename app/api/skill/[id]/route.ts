import { NextResponse } from "next/server";

import prisma from "../../../../prisma/client";

export async function PATCH(request: any, { params }: any) {
  const id = parseInt(params.id);

  // get request data
  const { name, category } = await request.json();

  // update profile
  const skill = await prisma.skill.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      category: category,
    },
  });

  return NextResponse.json(
    {
      sucess: true,
      message: "skill updated",
      data: skill,
    },
    { status: 200 }
  );
}

export async function DELETE(request: any, { params }: any) {
  const id = parseInt(params.id);

  await prisma.skill.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(
    {
      sucess: true,
      message: "skill deleted",
    },
    { status: 200 }
  );
}
