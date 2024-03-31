"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema } from "./constants";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Empty from "@/components/Empty";
import { Loader } from "@/components/loader";

export default function MusicPage() {
  const router = useRouter();

  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof promptSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", data);

      console.log("RESPONSE-->", response.data);

      setMusic(response.data.audio);

      form.reset();
    } catch (err) {
      console.log("ERROR WHILE POST-->", err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <Heading
          title="Music"
          description="AI"
          icon={Music}
          iconColor="text-blue-500"
          bgColor="bg-blue-500/10"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border border-blue-300 shadow-md p-6 space-y-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    id="prompt"
                    type="text"
                    placeholder="What is the rhythm of the music?"
                    className="border border-blue-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            <Button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full ${
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
        {!music && !isLoading && <Empty label="No Music yet" />}
        <div className="w-full flex items-center justify-center">
          {music && (
            <audio controls className="w-full">
              <source src={music} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}

<p>
  {music}
</p>
          </div>

      </div>
    </div>
  );
}
