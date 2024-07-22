"use client"

import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 2; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const cloudinary = {
  name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
  folder: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
}
console.log(cloudinary)

const FormSchema = z.object({
  files: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, "Gambar wajib diisi")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      );
    }, `Maksimum size image ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "File type is not supported"),
});

interface Profile {
  id: number,
  photo: string,
  name: string,
  summary: string,
  no_wa: string,
  email: string,
  address: string,
  linkedin: string,
  github: string,
  portofolio: string,
  updatedAt: Date,
}

export default function Dashboard() {
  const [photo, setPhoto] = useState<string>("")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleOnUpload = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.name}/image/upload`, {
        method: 'POST',
        body: data,
        redirect: 'follow'
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    },
    onSuccess: (res) => {
      console.log(res.secure_url)
      setPhoto(res.secure_url)
    },
    onError: (err) => {
      console.log(err);
    }
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("click")
    const formData = new FormData()

    formData.append("file", values.files[0])
    formData.append("upload_preset", cloudinary.folder)
    formData.append("api_key", cloudinary.key)

    handleOnUpload.mutate(formData)
  }

  const { data: dataProfile, error, isLoading, isSuccess } = useQuery<Profile[]>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch("/api/profile")
      const { data } = await res.json()
      return data
    }
  })

  const profile = dataProfile && dataProfile.length > 0 ? dataProfile[0] : null;

  return (
    <div className='w-4/5 p-5 mx-auto bg-white'>
      <Avatar>
        <AvatarImage src={profile?.photo} />
        <AvatarFallback>PP</AvatarFallback>
      </Avatar>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="files"
            render={({
              field: { value, onChange, ...fieldProps },
            }) => (
              <FormItem>
                <FormLabel htmlFor="picture" className="mb-2">
                  Upload
                </FormLabel>
                <FormControl>
                  <Input
                    id="picture"
                    type="file"
                    placeholder="Gambar coba"
                    onChange={(event) =>
                      onChange(event.target.files)
                    }
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}