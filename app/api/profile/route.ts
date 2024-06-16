//import next request and response
import { NextResponse } from "next/server";

//import prisma client
import prisma from "../../../prisma/client";

export async function GET() {
  //get all posts
  const profile = await prisma.profile.findMany();

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data profile",
      data: profile,
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(request: any) {
  const id = 1;

  // get request data
  const { name, summary, no_wa, email, address, linkedin, github, portofolio } =
    await request.json();

  // update profile
  const profile = await prisma.profile.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      summary: summary,
      no_wa: no_wa,
      email: email,
      address: address,
      linkedin: linkedin,
      github: github,
      portofolio: portofolio,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(
    {
      sucess: true,
      message: "Profile updated",
      data: profile,
    },
    { status: 200 }
  );
}
