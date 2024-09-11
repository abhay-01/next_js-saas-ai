"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions";
import Empty from "@/components/Empty";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Loader } from "@/components/loader";

export default function ConversationsPage() {
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

      const response = await axios.post("/api/conversation", {
        prompt: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (err) {
      //TODO : INTEGRATE PRO MODEL
      console.log("ERROR WHILE POST-->", err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <Heading
          title="Conversation"
          description="AI"
          icon={MessageCircle}
          iconColor="text-orange-500"
          bgColor="bg-orange-100"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border border-orange-300 shadow-md p-6 space-y-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    id="prompt"
                    type="text"
                    placeholder="What is the radius of the earth?"
                    className="border border-orange-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-orange-500"
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />

            <Button
              className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md w-full ${
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
              <p className="text-sm">
                {Array.isArray(message.content)
                  ? message.content.map((part, index) => (
                      <span key={index}>{JSON.stringify(part)}</span>
                    ))
                  : message.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
