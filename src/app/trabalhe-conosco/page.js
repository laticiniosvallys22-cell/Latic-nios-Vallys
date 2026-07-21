"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  Users, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  Mail, 
  Phone,
  Link2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { candidateSchema } from "@/lib/validations";
import { saveCandidate } from "@/services/firebase";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";

const areasList = [
  { value: "producao", label: "Produção e Indústria" },
  { value: "logistica", label: "Logística e Distribuição" },
  { value: "comercial", label: "Comercial e Vendas" },
  { value: "administrativo", label: "Administrativo e Financeiro" },
  { value: "qualidade", label: "Garantia da Qualidade / Laboratório" },
  { value: "outro", label: "Outras Áreas" },
];

const pillars = [
  {
    icon: Users,
    title: "Trabalho em Equipe",
    description: "Valorizamos o espírito colaborativo, onde a troca de experiências e o respeito mútuo guiam o nosso dia a dia.",
  },
  {
    icon: HeartHandshake,
    title: "Valorização das Pessoas",
    description: "Acreditamos que o crescimento do Laticínio Vallys é o reflexo do desenvolvimento e dedicação de nossos colaboradores.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e Qualidade",
    description: "Cuidamos rigorosamente da segurança de nossos processos e ambiente, garantindo integridade e excelência em tudo o que fazemos.",
  },
];

export default function TrabalheConoscoPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      area: "",
      resumeLink: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    try {
      await saveCandidate(data);
      toast.success("Candidatura registrada! Redirecionando para o WhatsApp...");
      
      const selectedArea = areasList.find((a) => a.value === data.area)?.label || data.area;

      const messageText = `Olá! Gostaria de enviar meu currículo para trabalhar no Laticínio Vallys.

*Nome Completo:* ${data.name}
*E-mail:* ${data.email}
*Telefone/WhatsApp:* ${data.phone}
*Área de Interesse:* ${selectedArea}
${data.resumeLink ? `*Link do Currículo:* ${data.resumeLink}` : ""}

*Mensagem/Apresentação:*
${data.message}`;

      const encodedText = encodeURIComponent(messageText);
      window.open(`https://wa.me/5533999838182?text=${encodedText}`, "_blank");
      
      reset();
    } catch (error) {
      console.error("Erro ao enviar candidatura:", error);
      toast.error(
        error.message || "Erro ao enviar a candidatura. Tente novamente ou use os canais alternativos."
      );
    }
  }

  return (
    <>
      <PageHero 
        title="Trabalhe Conosco" 
        subtitle="Venha fazer parte de uma equipe dedicada a levar o verdadeiro sabor da fazenda para milhares de famílias."
        bgImage="/hero.png"
        bgColor="#0e4a3a"
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        {/* Lado Esquerdo: Pilares e Informações */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0e4a3a] mb-6">Por que trabalhar no Laticínio Vallys?</h2>
            <div className="grid gap-6">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-2xl border border-emerald-50/50 bg-emerald-50/10 hover:bg-emerald-50/30 transition-colors"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0e4a3a] text-lg">{pillar.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed font-medium">{pillar.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Alternativas de Contato */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-[#0e4a3a] text-base mb-4">Canais Alternativos</h3>
            <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
              Caso prefira, você também pode enviar o seu currículo diretamente para o nosso e-mail ou tirar dúvidas através de nossa equipe comercial.
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:laticiniosvallys08@hotmail.com" 
                className="flex items-center gap-3 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-gray-500">
                  <Mail size={16} />
                </div>
                laticiniosvallys08@hotmail.com
              </a>
              <a 
                href="https://wa.me/5533999838182" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-sm font-semibold text-gray-600 hover:text-emerald-500 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-gray-500">
                  <Phone size={16} />
                </div>
                (33) 99983-8182 (Falar Conosco)
              </a>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário de Candidatura */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border border-emerald-100 bg-emerald-50/10 p-4 sm:p-6 rounded-[24px]">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-[#0e4a3a]">Formulário de Candidatura</CardTitle>
              <CardDescription className="text-sm font-medium text-gray-500">
                Preencha os campos abaixo com suas informações profissionais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                {/* Nome */}
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-[#0e4a3a] font-semibold text-sm">Nome Completo</Label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome" 
                    className="border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white rounded-xl"
                    {...register("name")} 
                  />
                  {errors.name && <p className="text-xs font-bold text-red-500">{errors.name.message}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* E-mail */}
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[#0e4a3a] font-semibold text-sm">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="exemplo@email.com" 
                      className="border-sky-100 focus:border-[#00b1f4] focus:ring-1 focus:ring-[#00b1f4] bg-white rounded-xl"
                      {...register("email")} 
                    />
                    {errors.email && <p className="text-xs font-bold text-red-500">{errors.email.message}</p>}
                  </div>

                  {/* Telefone */}
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-[#0e4a3a] font-semibold text-sm">Telefone / WhatsApp</Label>
                    <Input 
                      id="phone" 
                      placeholder="(33) 99999-9999" 
                      className="border-sky-100 focus:border-[#00b1f4] focus:ring-1 focus:ring-[#00b1f4] bg-white rounded-xl"
                      {...register("phone")} 
                    />
                    {errors.phone && <p className="text-xs font-bold text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Área de Interesse */}
                  <div className="grid gap-2">
                    <Label htmlFor="area" className="text-[#0e4a3a] font-semibold text-sm">Área de Interesse</Label>
                    <select
                      id="area"
                      className="flex h-10 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-700"
                      {...register("area")}
                    >
                      <option value="">Selecione uma área...</option>
                      {areasList.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.area && <p className="text-xs font-bold text-red-500">{errors.area.message}</p>}
                  </div>

                  {/* Link do Currículo */}
                  <div className="grid gap-2">
                    <Label htmlFor="resumeLink" className="text-[#0e4a3a] font-semibold text-sm flex items-center gap-1.5">
                      Link do Currículo
                      <span className="text-xs font-normal text-gray-400">(Opcional)</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="resumeLink" 
                        placeholder="Link do PDF ou LinkedIn" 
                        className="border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white rounded-xl pl-8"
                        {...register("resumeLink")} 
                      />
                      <Link2 className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.resumeLink && <p className="text-xs font-bold text-red-500">{errors.resumeLink.message}</p>}
                  </div>
                </div>

                {/* Mensagem / Apresentação */}
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-[#0e4a3a] font-semibold text-sm">Apresentação / Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Fale um pouco sobre você, sua experiência e por que deseja trabalhar no Laticínio Vallys..." 
                    className="border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white rounded-xl min-h-[120px] resize-y"
                    {...register("message")} 
                  />
                  {errors.message && <p className="text-xs font-bold text-red-500">{errors.message.message}</p>}
                </div>

                {/* Botão Enviar */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-5 rounded-xl text-base shadow-md transition-all hover:scale-[1.01] active:scale-95 duration-200 cursor-pointer mt-2"
                >
                  {isSubmitting ? "Enviando candidatura..." : "Enviar Candidatura"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
    </>
  );
}
