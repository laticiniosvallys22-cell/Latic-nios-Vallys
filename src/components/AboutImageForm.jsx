"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutImageSchema } from "@/lib/validations";
import { uploadToCloudinary } from "@/services/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyImage = {
  title: "",
  image: "",
};

export default function AboutImageForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(aboutImageSchema),
    defaultValues: initialValues || emptyImage,
  });

  useEffect(() => {
    reset(initialValues || emptyImage);
  }, [initialValues, reset]);

  async function submit(values) {
    const imageFile = values.imageFile?.[0];
    const payload = { ...values };
    delete payload.imageFile;

    if (imageFile) {
      const upload = await uploadToCloudinary(imageFile, "laticinio-vallys/sobre");
      payload.image = upload.secure_url;
    }

    await onSubmit(payload);
    reset(emptyImage);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Título ou Legenda (Opcional)</Label>
        <Input id="title" {...register("title")} placeholder="Ex: Fachada da fábrica" />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="image">URL da Imagem</Label>
          <Input id="image" {...register("image")} placeholder="https://..." />
          {errors.image && (
            <p className="text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="imageFile">Upload Cloudinary</Label>
          <Input id="imageFile" type="file" accept="image/*" {...register("imageFile")} />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row mt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Imagem"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar Edição
          </Button>
        )}
      </div>
    </form>
  );
}
