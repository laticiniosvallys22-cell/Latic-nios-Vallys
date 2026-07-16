"use client";

import { useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { useSettings } from "@/contexts/SettingsContext";
import { saveSettings } from "@/services/firebase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { demoHighlights } from "@/interfaces/catalog";

export default function ConfiguracoesPage() {
  const { settings, setSettings, loading } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);

  // Sync form data with context when loaded
  useState(() => {
    if (!loading) {
      setFormData(settings);
    }
  }, [loading, settings]);

  const handleChange = (key, value) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);
    setSettings(newData); // Live update global context for preview
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings(formData);
      setSettings(formData); // Update global context immediately
      toast.success("Configurações atualizadas com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar configurações.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="p-8 text-center text-muted">Carregando configurações...</div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft size={24} />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Configurações do Site</h1>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Estilo do Hero (Página Inicial)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["style1", "style2", "style3"].map((style, index) => (
                  <label
                    key={style}
                    className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                      formData.heroStyle === style
                        ? "border-[#00b1f4] bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="heroStyle"
                      value={style}
                      checked={formData.heroStyle === style}
                      onChange={(e) => handleChange("heroStyle", e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-lg">Opção {index + 1}</div>
                    <div className="text-sm text-muted mt-2">
                      {index === 0 && "Padrão atual com gradiente moderno"}
                      {index === 1 && "Foco na imagem com textos laterais em blocos"}
                      {index === 2 && "Centralizado com estilo clássico"}
                    </div>
                  </label>
                ))}
              </div>

              {/* Preview do Hero */}
              <div className="mt-8 border-4 border-dashed border-gray-200 rounded-2xl overflow-hidden relative">
                <div className="absolute top-2 left-2 z-50 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">PRÉ-VISUALIZAÇÃO AO VIVO</div>
                <div className="scale-[0.7] md:scale-100 origin-top w-[142%] md:w-full -ml-[21%] md:ml-0 h-[400px] md:h-auto pointer-events-none">
                  <Hero slides={demoHighlights} heroStyle={formData.heroStyle} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Estilo dos Produtos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["style1", "style2", "style3"].map((style, index) => (
                  <label
                    key={style}
                    className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                      formData.productsStyle === style
                        ? "border-[#00b1f4] bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="productsStyle"
                      value={style}
                      checked={formData.productsStyle === style}
                      onChange={(e) => handleChange("productsStyle", e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-lg">Layout {index + 1}</div>
                    <div className="text-sm text-muted mt-2">
                      {index === 0 && "Cards padrão com fundo branco"}
                      {index === 1 && "Cards arredondados com cores pastel"}
                      {index === 2 && "Lista minimalista sem bordas"}
                    </div>
                  </label>
                ))}
              </div>

              {/* Preview dos Produtos */}
              <div className="mt-8 p-6 bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl relative overflow-hidden flex justify-center">
                 <div className="absolute top-2 left-2 z-50 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">PRÉ-VISUALIZAÇÃO AO VIVO</div>
                 <div className="w-full max-w-[320px] pointer-events-none mt-8">
                   <ProductCard product={{ name: "Queijo Minas Frescal", category: "Queijos", price: "R$ 25,00", image: "/logo.png" }} />
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Estilo da Página Sobre</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["style1", "style2", "style3"].map((style, index) => (
                  <label
                    key={style}
                    className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                      formData.aboutStyle === style
                        ? "border-[#00b1f4] bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="aboutStyle"
                      value={style}
                      checked={formData.aboutStyle === style}
                      onChange={(e) => handleChange("aboutStyle", e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-lg">Visão {index + 1}</div>
                    <div className="text-sm text-muted mt-2">
                      {index === 0 && "Layout limpo focado no texto"}
                      {index === 1 && "Layout com timeline e ícones"}
                      {index === 2 && "Layout em grid criativo com imagens alternadas"}
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Tipografia (Fonte Principal)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["inter", "roboto", "playfair"].map((font) => (
                  <label
                    key={font}
                    className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                      formData.fontFamily === font
                        ? "border-[#00b1f4] bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="fontFamily"
                      value={font}
                      checked={formData.fontFamily === font}
                      onChange={(e) => handleChange("fontFamily", e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-lg capitalize">{font}</div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" size="lg" onClick={() => window.location.reload()} disabled={saving}>
              Cancelar / Descartar
            </Button>
            <Button size="lg" onClick={handleSave} disabled={saving} className="bg-[#00b1f4] hover:bg-[#009bd6] text-white">
              {saving ? "Salvando..." : (
                <>
                  <Save className="mr-2" size={20} />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}
