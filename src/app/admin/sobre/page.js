"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, ChevronUp, ChevronDown, ImageIcon, ArrowLeft } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import AboutImageForm from "@/components/AboutImageForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAboutImages } from "@/hooks/useAboutImages";
import {
  createAboutImage,
  deleteAboutImage,
  updateAboutImage,
  swapOrder,
  reindexOrders,
  ensurePersisted,
} from "@/services/firebase";
import Image from "next/image";
import Link from "next/link";

export default function AdminSobrePage() {
  const { images, loading, error, reload } = useAboutImages();
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [reordering, setReordering] = useState(false);
  const formRef = useRef(null);

  const handleEdit = (item) => {
    setEditing(item);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = formRef.current?.querySelector("input, select, textarea");
      firstInput?.focus();
    }, 100);
  };

  async function saveImage(values) {
    setSubmitting(true);

    try {
      if (editing?.id) {
        await updateAboutImage(editing.id, values);
        toast.success("Imagem atualizada.");
      } else {
        await createAboutImage(values);
        toast.success("Imagem cadastrada.");
      }

      setEditing(null);
      await reload();
    } catch (requestError) {
      toast.error(requestError.message || "Erro ao salvar imagem.");
    } finally {
      setSubmitting(false);
    }
  }

  async function removeImage(id) {
    if (!window.confirm("Excluir esta imagem do carrossel?")) {
      return;
    }

    try {
      await deleteAboutImage(id);
      const remaining = images.filter((i) => i.id !== id);
      const firestoreIds = remaining.filter((i) => i.createdAt || typeof i.order === "number").map((i) => i.id);
      if (firestoreIds.length > 0) {
        await reindexOrders("aboutImages", firestoreIds);
      }
      toast.success("Imagem excluída.");
      await reload();
    } catch (requestError) {
      toast.error(requestError.message || "Erro ao excluir imagem.");
    }
  }

  async function moveItem(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const itemA = images[index];
    const itemB = images[targetIndex];

    setReordering(true);
    try {
      const orderA = typeof itemA.order === "number" ? itemA.order : index;
      const orderB = typeof itemB.order === "number" ? itemB.order : targetIndex;

      const isFirestoreA = itemA.createdAt || typeof itemA.order === "number";
      const isFirestoreB = itemB.createdAt || typeof itemB.order === "number";

      if (!isFirestoreA) {
        await ensurePersisted("aboutImages", itemA, orderA);
      }
      if (!isFirestoreB) {
        await ensurePersisted("aboutImages", itemB, orderB);
      }

      await swapOrder("aboutImages", itemA.id, orderA, itemB.id, orderB);
      toast.success("Ordem atualizada!");
      await reload();
    } catch (err) {
      toast.error(err.message || "Erro ao reordenar.");
    } finally {
      setReordering(false);
    }
  }

  if (loading) {
    return (
      <AdminGuard>
        <div className="p-8 text-center text-muted">Carregando imagens...</div>
      </AdminGuard>
    );
  }

  if (error) {
    return (
      <AdminGuard>
        <div className="p-8 text-center text-red-500">Erro ao carregar imagens: {error.message}</div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <section className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft size={24} />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Imagens da Página Sobre</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xl font-semibold">Imagens Publicadas ({images.length})</h2>

            {images.length === 0 ? (
              <p className="text-muted">Nenhuma imagem cadastrada no momento.</p>
            ) : (
              <div className="grid gap-4">
                {images.map((item, index) => (
                  <Card key={item.id || index} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-32 sm:h-auto bg-gray-100 flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title || "Imagem"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted">
                            <ImageIcon size={32} />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <h3 className="font-semibold text-lg">{item.title || "Sem título"}</h3>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => moveItem(index, -1)}
                              disabled={index === 0 || reordering}
                              title="Mover para cima"
                            >
                              <ChevronUp size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => moveItem(index, 1)}
                              disabled={index === images.length - 1 || reordering}
                              title="Mover para baixo"
                            >
                              <ChevronDown size={16} />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleEdit(item)}
                              disabled={submitting || reordering}
                            >
                              <Pencil size={16} className="mr-2" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeImage(item.id)}
                              disabled={submitting || reordering}
                            >
                              <Trash2 size={16} className="mr-2" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-8" ref={formRef}>
              <Card>
                <CardHeader>
                  <CardTitle>{editing ? "Editar Imagem" : "Nova Imagem"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <AboutImageForm
                    initialValues={editing}
                    onSubmit={saveImage}
                    onCancel={editing ? () => setEditing(null) : null}
                    isSubmitting={submitting}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}
