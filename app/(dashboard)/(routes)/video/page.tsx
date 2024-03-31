"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChatCompletion,
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions";
import Image from "next/image";
import Empty from "@/components/Empty";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Loader } from "@/components/loader";

export default function VideoPage() {
  const router = useRouter();

  const [videos, setVideos] = useState<string>();
  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof promptSchema>) => {
    try {
      setVideos(undefined);

      const response = await axios.post("/api/video", data);

      setVideos(response.data[0].video);

      form.reset();
    } catch (err) {
      console.log("ERROR WHILE POST-->", err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <Heading
          title="Video"
          description="AI"
          icon={Video}
          iconColor="text-pink-500"
          bgColor="bg-pink-500/10"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border border-pink-300 shadow-md p-6 space-y-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    id="prompt"
                    type="text"
                    placeholder="What is the resolution of the video?"
                    className="border border-pink-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-pink-500"
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            <Button
              className={`bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md w-full ${
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
        {!videos && !isLoading && <Empty label="No Video yet" />}
        <div className="w-full flex items-center justify-center">
          {videos && (
            <video src={videos} controls className="w-full rounded-lg" />
          )}

          <p>{videos}</p>
        </div>
      </div>
    </div>
  );
}
