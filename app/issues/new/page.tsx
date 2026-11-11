"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import z from "zod";

const SimpleMde = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError("An unexpected error occured.");
      }
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && <Text color="red">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMde placeholder="Description" {...field} />}
        />
        {errors.description && (
          <Text className="block" color="red">
            {errors.description.message}
          </Text>
        )}
        <Button type="submit">Submit new Issue</Button>
      </form>
    </div>
  );
}
