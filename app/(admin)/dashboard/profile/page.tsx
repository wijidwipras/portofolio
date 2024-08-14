"use client"

import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Box, Copy, Github, Linkedin, Pencil } from 'lucide-react';
import useFetchProfile from './hook/useFetchProfile'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from "sonner"
import { queryClient } from '@/utils/react-query-provider'
import HashLoader from "react-spinners/HashLoader"
import { Textarea } from '@/components/ui/textarea'

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

const FormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  summary: z.string().min(5, { message: "Sumary must be 5 or more characters long" }),
  address: z.string().min(5, { message: "Address must be 5 or more characters long" }),
  no_wa: z.string().min(8, {message: "Invalid WA number"}),
  github: z.string().url({ message: "Invalid url" }),
  linkedin: z.string().url({ message: "Invalid url" }),
  portofolio: z.string().url({ message: "Invalid url" }),
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

export default function Profile() {
  const [openDrawerEdit, setOpenDrawerEdit] = useState<boolean>(false)
  const [buttonOnsubmit, setButtonOnsubmit] = useState<boolean>(false)
  const { data: dataProfile, isLoading } = useFetchProfile()
  const profile = dataProfile && dataProfile.length > 0 ? dataProfile[0] : null;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleOnEditData = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/profile`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
      });

      if (!response.ok) {
        // Tangani respon error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
        toast(errorData.message || 'Something went wrong');
      }

      return response.json();
    },
    onSuccess: () => {
      setOpenDrawerEdit(false)
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast('Profile updated successfully', {
        action: {
          label: "OK",
          onClick: () => console.log("OK")
        },
        // actionButtonStyle: ""
      });
      form.reset();
      setButtonOnsubmit(false)
    },
    onError: (err) => {
      console.log(err)
      toast(err.message);
    }
  })

  const handleOnUploadImage = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.name}/image/upload`, {
        method: 'POST',
        body: data,
        redirect: 'follow'
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
        toast('Network response was not ok');
      }
      const result = await response.json();
      return result;
    },
    onSuccess: (res) => {
      const dataPayload = {
        name: form.getValues("name"),
        summary: form.getValues("summary"),
        no_wa: form.getValues("no_wa"),
        email: form.getValues("email"),
        address: form.getValues("address"),
        linkedin: form.getValues("linkedin"),
        github: form.getValues("github"),
        portofolio: form.getValues("portofolio"),
        photo: res.secure_url
      }
      handleOnEditData.mutate(dataPayload)
    },
    onError: (err) => {
      console.log(err);
    }
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    setButtonOnsubmit(true)
    const formData = new FormData()

    formData.append("file", values.files[0])
    formData.append("upload_preset", cloudinary.folder)
    formData.append("api_key", cloudinary.key)

    handleOnUploadImage.mutate(formData)
  }

  const handleDrawerEdit = () => {
    setOpenDrawerEdit(!openDrawerEdit)
    form.setValue("name", profile?.name ?? "")
    form.setValue("email", profile?.email ?? "")
    form.setValue("summary", profile?.summary ?? "")
    form.setValue("address", profile?.address ?? "")
    form.setValue("no_wa", profile?.no_wa ?? "")
    form.setValue("github", profile?.github ?? "")
    form.setValue("portofolio", profile?.portofolio ?? "")
    form.setValue("linkedin", profile?.linkedin ?? "")
  }

  async function copyContent(data: string) {
    try {
      await navigator.clipboard.writeText(data);
      toast('Content copied to clipboard', {
        action: {
          label: "OK",
          onClick: () => console.log("OK")
        },
      });
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      toast('Failed to copy: ', {
        description: `${err}`
      });
      /* Rejected - text failed to copy to the clipboard */
    }
  }

  return (
    <div className='w-4/5 p-5 mx-auto bg-white'>
      <div className='flex justify-center'>
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile?.photo}/>
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </div>
      <div className='flex justify-between mb-2 items-center'>
        <span className='italic text-sm'>
          Update at {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
        </span>
        <Button className='flex gap-2' onClick={() => handleDrawerEdit()}>
          <Pencil size={16} />
          Edit
        </Button>
      </div>

      {
        isLoading ?
          <div className='flex flex-col gap-2'>
            <Skeleton className="w-full h-[40px] rounded-md" />
            <Skeleton className="w-full h-[40px] rounded-md" />
          </div>
        :
          <div className='flex flex-col gap-2'>
            <h3 className='font-semibold'>Nama</h3>
            <Card className='flex justify-between py-3 px-4'>
              {profile?.name}
              <div className='cursor-pointer' onClick={() => copyContent(profile?.name ?? "Loading..")}>
                <Copy />
              </div>
            </Card>

            <h3 className='font-semibold'>Email</h3>
            <Card className='flex justify-between py-3 px-4'>
              {profile?.email}
              <div className='cursor-pointer' onClick={() => copyContent(profile?.email ?? "Loading..")}>
                <Copy />
              </div>
            </Card>

            <h3 className='font-semibold'>Ringkasan</h3>
            <Card className='flex justify-between py-3 px-4'>
              {profile?.summary}
              <div className='cursor-pointer' onClick={() => copyContent(profile?.summary ?? "Loading..")}>
                <Copy />
              </div>
            </Card>

            <h3 className='font-semibold'>Alamat</h3>
            <Card className='flex justify-between py-3 px-4'>
              {profile?.address}
              <div className='cursor-pointer' onClick={() => copyContent(profile?.address ?? "Loading..")}>
                <Copy />
              </div>
            </Card>

            <h3 className='font-semibold'>No Utama</h3>
            <Card className='flex justify-between py-3 px-4'>
              {profile?.no_wa}
              <div className='cursor-pointer' onClick={() => copyContent(profile?.no_wa ?? "Loading..")}>
                <Copy />
              </div>
            </Card>

            <h3 className='font-semibold'>Github</h3>
            <div className='flex gap-2 w-full items-center'>
              <Github />
              <Card className='flex justify-between py-3 px-4 w-full'>
                {profile?.github}
                <div className='cursor-pointer' onClick={() => copyContent(profile?.github ?? "Loading..")}>
                  <Copy />
                </div>
              </Card>
            </div>

            <h3 className='font-semibold'>Linkedin</h3>
            <div className='flex gap-2 w-full items-center'>
              <Linkedin />
              <Card className='flex justify-between py-3 px-4 w-full'>
                {profile?.linkedin}
                <div className='cursor-pointer' onClick={() => copyContent(profile?.linkedin ?? "Loading..")}>
                  <Copy />
                </div>
              </Card>
            </div>

            <h3 className='font-semibold'>Portofolio</h3>
            <div className='flex gap-2 w-full items-center'>
              <Box />
              <Card className='flex justify-between py-3 px-4 w-full'>
                {profile?.portofolio}
                <div className='cursor-pointer' onClick={() => copyContent(profile?.portofolio ?? "Loading..")}>
                  <Copy />
                </div>
              </Card>
            </div>
          </div>
      }

      <Drawer open={openDrawerEdit} onOpenChange={setOpenDrawerEdit}>
        <DrawerContent >
          <div className="mx-auto w-full h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>Edit Data Pribadi</DrawerTitle>
            </DrawerHeader>
            <div className='overflow-y-auto'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-4 p-5 pt-0'>
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({field}) => (
                          <FormItem className="mt-3">
                            <FormLabel htmlFor="summary" className="mb-2">
                              Ringkasan
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                id="summary"
                                placeholder="Masukkan ringkasan kamu" {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />
                      <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="mt-3">
                          <FormLabel htmlFor="name" className="mb-2">
                            Nama
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              type="text"
                              placeholder="Masukkan nama kamu" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                        <FormItem className="mt-3">
                          <FormLabel htmlFor="email" className="mb-2">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Masukkan email kamu" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({field}) => (
                        <FormItem className="mt-3">
                          <FormLabel htmlFor="address" className="mb-2">
                            Alamat
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              id="address"
                              placeholder="Masukkan alamat kamu" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="no_wa"
                      render={({field}) => (
                        <FormItem className="mt-3">
                          <FormLabel htmlFor="no_wa" className="mb-2">
                            Nomor WA
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="no_wa"
                              type="number"
                              // value={field.value}
                              placeholder="Masukkan nomor WA kamu" {...field}
                              // onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="github"
                      render={({field}) => (
                        <FormItem className="mt-3">
                          <FormLabel htmlFor="github" className="mb-2">
                            Github
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="github"
                              type="text"
                              placeholder="Masukkan github kamu" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({field}) => (
                        <FormItem className="mt-3">
                          <FormLabel htmlFor="linkedin" className="mb-2">
                            Linkedin
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="linkedin"
                              type="text"
                              placeholder="Masukkan linkedin kamu" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="portofolio"
                      render={({field}) => (
                        <FormItem className="mt-3">
                          <FormLabel htmlFor="portofolio" className="mb-2">
                            Portofolio
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="portofolio"
                              type="text"
                              placeholder="Masukkan portofolio kamu" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="files"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem className="mt-3">
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
                  </div>
                    <div className='p-5'>
                    {
                      buttonOnsubmit ?
                        <Button className='w-full flex gap-1' disabled>
                          <HashLoader
                            color="#ffffff"
                            size={16}
                          />
                          Submiting
                        </Button>
                        :
                        <Button type='submit' className='w-full'>
                          Submit
                        </Button>
                    }
                    </div>
                </form>
              </Form>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}