"use client"

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import ReactMarkDown from "react-markdown";

export default function CodePage() {

    const router = useRouter();

  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof promptSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: data.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        prompt: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (err) {
      console.log("ERROR WHILE POST-->", err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="bg-green-100 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <Heading
          title="Code"
          description="AI"
          icon={Code}
          iconColor="text-green-500"
          bgColor="bg-green-500/10"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border border-green-300 shadow-md p-6 space-y-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    id="prompt"
                    type="text"
                    placeholder="How to center div in css?"
                    className="border border-green-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-green-500"
                    disabled={isLoading}
                  />
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
        {messages.length == 0 && !isLoading && (
          <Empty label="No Conversation yet" />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={typeof message.content === 'string' ? message.content : JSON.stringify(message.content)}
              
              className={cn(
                "p-8 w-full flex flex-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <ReactMarkDown 
              components={{
              pre: ({node, ...props}) => (
                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                  <pre {...props} />

                </div>
              ),

              code: ({node, ...props}) => (
                <code {...props} className="bg-black/10 rounded-lg p-1" />
              )
              }}
              className="text-sm overflow-hidden leading-7"
              >{Array.isArray(message.content) ? message.content.map(part => {
                if (typeof part === 'string') {
                  return part;
                } else if ('text' in part) {
                  return part.text;
                } else {
                  return '';
                }
              }).join('') : message.content || ""}
              </ReactMarkDown>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
}