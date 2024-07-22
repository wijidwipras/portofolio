import cloudinary from "@/utils/cloudinary";
import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";

const image = "./public/images/sample.png";

cloudinary.uploader.upload(image).then((result) => {
  console.log(result);
});