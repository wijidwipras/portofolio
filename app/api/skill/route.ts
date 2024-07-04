import { NextResponse } from "next/server";

import prisma from "../../../prisma/client";

export async function GET() {
  //get all posts
  const skills = await prisma.skill.findMany();
  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data skill",
      data: skills,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: any) {
    const { name, category } = await request.json();

    const skill = await prisma.skill.create({
      data: {
        name: name,
        category: category,
      },
    });

    return NextResponse.json(
      {
        sucess: true,
        message: "data skill created",
        data: skill,
      },
      {
        status: 201,
      }
    );
  }