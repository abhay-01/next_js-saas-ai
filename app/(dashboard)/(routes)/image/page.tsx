"use client"
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Download, Image as ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { amountOptions, promptSchema, sizeOptions } from "./constant";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Empty from "@/components/Empty";
import { Loader } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";

export default function ImagePage() {
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof promptSchema>) => {
    try {
      setImages([]); // Clear images

      const response = await axios.post("/api/image", data);

      const urls = response.data.map((image: { url: string }) => image.url); // Extract image urls from response data

      setImages(urls);
      form.reset();
    } catch (err) {
      console.log("ERROR WHILE POST-->", err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col justify-start items-center p-4">
      <div className="max-w-md w-full">
        <Heading
          title="Image"
          description="AI"
          icon={ImageIcon}
          iconColor="text-yellow-500"
          bgColor="bg-yellow-500/10"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border border-yellow-300 shadow-md p-6 space-y-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    id="prompt"
                    type="text"
                    placeholder="A rabbit swimming in the Nile River"
                    className="border border-yellow-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-yellow-500"
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            {/* Add amount field */}

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Add resolution field */}

            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button
              className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {images.length === 0 && !isLoading && <Empty label="No Images yet" />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((url) => (
            <Card key={url} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={url}
                  alt="Generated Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(url)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
