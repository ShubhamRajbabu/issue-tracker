"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Callout, CalloutIcon, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillInfoCircle } from "react-icons/ai";
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from "@/app/createIssueSchema";
import { z } from 'zod'
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      await axios.post("/api/issues", data);
      setSubmitting(false)
      router.push("/");
    } catch (error) {
      setSubmitting(false)
      setError("An unexpected error occurred.");
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red"  className="mb-4">
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={onSubmit}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {<ErrorMessage> {errors.title?.message} </ErrorMessage>}
        <Controller
          name="desc"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {<ErrorMessage> {errors.desc?.message} </ErrorMessage>}

        <Button disabled={submitting} className="hover: p-2 bg-purple-900 shadow md:shadow-lg">
          Submit New Issue
          {submitting && <LoadingSpinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
