"use client";

import Image from "next/image";
import { 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  Handshake, 
  Heart, 
  HeartHandshake, 
  Leaf, 
  Award, 
  Target, 
  Eye 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/contexts/SettingsContext";
import { useState, useEffect } from "react";
import { useAboutImages } from "@/hooks/useAboutImages";
import { cn } from "@/lib/utils";
import AboutImageCarousel from "@/components/AboutImageCarousel";
import PageHero from "@/components/PageHero";

const valuesList = [
  { icon: ShieldCheck, title: "Qualidade e Segurança", text: "Garantimos produtos lácteos que atendem aos mais altos padrões de qualidade, segurança alimentar e excelência." },
  { icon: Sparkles, title: "Inovação e Melhoria Contínua", text: "Investimos constantemente em tecnologia, processos e desenvolvimento para evoluir nossos produtos e serviços." },
  { icon: Scale, title: "Ética e Transparência", text: "Conduzimos nossas relações com honestidade, respeito e responsabilidade em todas as etapas do nosso trabalho." },
  { icon: Handshake, title: "Parceria com Produtores", text: "Valorizamos nossos produtores rurais, construindo relações sólidas, justas e de confiança, baseadas no crescimento mútuo." },
  { icon: Heart, title: "Foco no Cliente e no Consumidor", text: "Buscamos proporcionar a melhor experiência, oferecendo produtos que conquistam pela qualidade, sabor e confiança." },
  { icon: HeartHandshake, title: "Valorização das Pessoas", text: "Incentivamos o desenvolvimento profissional e pessoal dos nossos colaboradores, promovendo um ambiente de respeito, aprendizado e oportunidades." },
  { icon: Leaf, title: "Compromisso com a Sustentabilidade", text: "Trabalhamos de forma responsável, contribuindo para o desenvolvimento da empresa, da comunidade e do meio ambiente." },
  { icon: Award, title: "Excelência nos Resultados", text: "Buscamos eficiência, organização e melhoria contínua para gerar valor aos nossos clientes, parceiros e colaboradores." },
];

export default function AboutPage() {
  const { settings } = useSettings();
  const style = settings?.aboutStyle || "style1";

  const { images } = useAboutImages();
  const [currentAboutIdx, setCurrentAboutIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentAboutIdx((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const activeAboutImage = images && images.length > 0 
    ? images[currentAboutIdx].image 
    : "https://images.unsplash.com/photo-1596562095874-56b0932c028e?q=80&w=1200&auto=format&fit=crop";

  const renderStyle1 = () => (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-none border border-gray-200/80 shadow-xl aspect-[4/3] group -mx-6 sm:mx-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeAboutImage} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
              <Image src={activeAboutImage} alt="Equipe e Fábrica Laticínios Vallys" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 600px" priority />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-6">
          <div className="space-y-2">
            <Badge className="rounded-none bg-[#1a2a6c]/10 text-[#1a2a6c] hover:bg-[#1a2a6c]/20 px-3 py-1 font-bold text-xs uppercase tracking-wider">Nossa História</Badge>
            <h2 className="text-4xl font-extrabold text-[#1a2a6c] uppercase tracking-tight">Laticínios Vallys</h2>
            <div className="h-[4px] w-[80px] bg-[#1a2a6c]"></div>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-muted font-medium">
            <p>{settings?.aboutHistoryText1 || "Fundado em 2007, o Laticínios Vallys vem, desde então, investindo continuamente na modernização de sua estrutura, na inovação de seus processos e na utilização de equipamentos de alta tecnologia. Nosso compromisso é oferecer produtos de excelência, levando aos consumidores qualidade, sabor e confiança em cada produto."}</p>
            <p>{settings?.aboutHistoryText2 || "Temos orgulho de fazer parte da história de Lajinha (MG), contribuindo para o desenvolvimento da região e consolidando nossa marca como referência no setor de laticínios."}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center"><span className="block text-2xl font-extrabold text-[#154687]">2007</span><span className="text-xs text-muted font-bold uppercase tracking-wider font-semibold">Fundação</span></div>
            <div className="text-center"><span className="block text-2xl font-extrabold text-[#154687]">Lajinha</span><span className="text-xs text-muted font-bold uppercase tracking-wider font-semibold">Origem (MG)</span></div>
            <div className="text-center"><span className="block text-2xl font-extrabold text-[#154687]">100%</span><span className="text-xs text-muted font-bold uppercase tracking-wider font-semibold">Qualidade</span></div>
          </div>
        </motion.div>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-none border-l-4 border-l-amber-500 border-y border-r border-gray-150 bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
          <div className="flex items-center gap-3"><div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-none text-amber-500"><Target size={24} /></div><h2 className="text-2xl font-bold text-foreground">Missão</h2></div>
          <p className="text-muted leading-relaxed font-medium">{settings?.aboutMission || "Produzir alimentos lácteos com excelência, segurança e qualidade, proporcionando aos nossos consumidores uma experiência única de sabor e confiança. Atuamos de forma ética e responsável, fortalecendo parcerias duradouras com nossos produtores e valorizando nossos colaboradores por meio do desenvolvimento profissional, pessoal e humano, contribuindo para o crescimento de todos que fazem parte da nossa história."}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="rounded-none border-l-4 border-l-[#1a2a6c] border-y border-r border-gray-150 bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
          <div className="flex items-center gap-3"><div className="inline-flex items-center justify-center p-3 bg-[#1a2a6c]/10 rounded-none text-[#1a2a6c]"><Eye size={24} /></div><h2 className="text-2xl font-bold text-foreground">Visão</h2></div>
          <p className="text-muted leading-relaxed font-medium">{settings?.aboutVision || "Ser referência como uma das principais indústrias de laticínios de Minas Gerais e região, destacando-se pela qualidade dos nossos produtos, inovação, eficiência na gestão e compromisso com a satisfação dos clientes. Buscamos também valorizar nossos colaboradores e manter relações sólidas, justas e confiáveis com os produtores rurais da nossa região."}</p>
        </motion.div>
      </div>

      <AboutImageCarousel />

      <div className="mt-24 border-t border-gray-100 pt-16">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge className="rounded-none bg-[#1a2a6c]/10 text-[#1a2a6c] hover:bg-[#1a2a6c]/20 px-3 py-1 font-bold text-xs uppercase tracking-wider">Nossos Valores</Badge>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground uppercase tracking-tight">Valores</h2>
          <p className="mt-2 text-muted font-bold tracking-wide">Princípios que orientam o nosso trabalho</p>
          <div className="mt-3 flex h-[4px] w-[100px] overflow-hidden"><div className="w-1/2 bg-sky-400"></div><div className="w-1/2 bg-[#1a2a6c]"></div></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {valuesList.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.article key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 4) * 0.1 }} className="rounded-none border border-gray-200/80 border-t-4 border-t-[#1a2a6c]/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center justify-center p-3 bg-[#1a2a6c]/5 rounded-none text-[#1a2a6c] mb-4"><Icon size={22} /></div>
                  <h3 className="text-lg font-bold text-foreground leading-snug">{val.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted font-medium">{val.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderStyle2 = () => (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Vallys Laticínio</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Tradição, qualidade e dedicação em cada produto que chega à sua mesa desde 2007.</p>
      </div>

      <div className="relative mb-24">
        <div className="absolute inset-0 bg-amber-50 rounded-[3rem] -z-10 transform -rotate-1"></div>
        <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeAboutImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
              <Image src={activeAboutImage} alt="Laticínios Vallys" fill className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-24">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-amber-500/10"><Target size={120} /></div>
          <h2 className="text-3xl font-bold mb-6 text-amber-600 relative z-10">Missão</h2>
          <p className="text-gray-600 leading-relaxed text-lg relative z-10">{settings?.aboutMission || "Produzir alimentos lácteos com excelência, segurança e qualidade, proporcionando aos nossos consumidores uma experiência única de sabor e confiança. Atuamos de forma ética e responsável, fortalecendo parcerias duradouras com nossos produtores e valorizando nossos colaboradores por meio do desenvolvimento profissional, pessoal e humano, contribuindo para o crescimento de todos que fazem parte da nossa história."}</p>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute -left-6 -bottom-6 text-[#00b1f4]/10"><Eye size={120} /></div>
          <h2 className="text-3xl font-bold mb-6 text-[#00b1f4] relative z-10">Visão</h2>
          <p className="text-gray-600 leading-relaxed text-lg relative z-10">{settings?.aboutVision || "Ser referência como uma das principais indústrias de laticínios de Minas Gerais e região, destacando-se pela qualidade dos nossos produtos, inovação, eficiência na gestão e compromisso com a satisfação dos clientes. Buscamos também valorizar nossos colaboradores e manter relações sólidas, justas e confiáveis com os produtores rurais da nossa região."}</p>
        </div>
      </div>

      <AboutImageCarousel />

      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
        <div className="space-y-6">
          {valuesList.map((val, i) => {
            const Icon = val.icon;
            return (
              <div key={i} className="flex items-start gap-6 bg-gray-50 p-6 rounded-2xl">
                <div className="bg-white p-4 rounded-full shadow-sm text-gray-800"><Icon size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-gray-600">{val.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderStyle3 = () => (
    <section className="min-h-screen bg-gray-900 text-white">
      <div className="w-full h-[60vh] relative flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={activeAboutImage} initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <Image src={activeAboutImage} alt="Hero Sobre" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        <div className="relative z-10 text-center space-y-6 max-w-3xl px-6">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-amber-500">História</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">Uma jornada de dedicação, iniciada em Lajinha - MG, com o propósito de levar o verdadeiro sabor do campo até a sua mesa.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-amber-500 border-b border-gray-700 pb-4">Nossa Missão</h2>
            <p className="text-xl text-gray-400 leading-relaxed font-light">{settings?.aboutMission || "Produzir alimentos lácteos com excelência, segurança e qualidade, proporcionando aos nossos consumidores uma experiência única de sabor e confiança. Atuamos de forma ética e responsável, fortalecendo parcerias duradouras com nossos produtores e valorizando nossos colaboradores por meio do desenvolvimento profissional, pessoal e humano, contribuindo para o crescimento de todos que fazem parte da nossa história."}</p>
          </div>
          <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center p-12">
             <Target size={120} className="text-amber-500/20" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center p-12 order-2 md:order-1">
             <Eye size={120} className="text-[#00b1f4]/20" />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-bold text-[#00b1f4] border-b border-gray-700 pb-4">Nossa Visão</h2>
            <p className="text-xl text-gray-400 leading-relaxed font-light">{settings?.aboutVision || "Ser referência como uma das principais indústrias de laticínios de Minas Gerais e região, destacando-se pela qualidade dos nossos produtos, inovação, eficiência na gestão e compromisso com a satisfação dos clientes. Buscamos também valorizar nossos colaboradores e manter relações sólidas, justas e confiáveis com os produtores rurais da nossa região."}</p>
          </div>
        </div>
        
        <AboutImageCarousel />

        <div className="space-y-12">
           <h2 className="text-4xl font-bold text-center text-amber-500">Valores Essenciais</h2>
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {valuesList.map((val, i) => {
               const Icon = val.icon;
               return (
                 <div key={i} className="bg-gray-800 border border-gray-700 p-8 rounded-xl hover:bg-gray-750 transition-colors">
                    <Icon size={32} className="text-amber-500 mb-6" />
                    <h3 className="text-xl font-bold mb-4">{val.title}</h3>
                    <p className="text-gray-400 text-sm">{val.text}</p>
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <PageHero 
        title="Sobre Nós" 
        subtitle="Conheça a história, missão e valores do Laticínios Vallys."
        bgImage="/hero.png"
        bgColor="#1a2a6c"
      />
      {style === "style1" && renderStyle1()}
      {style === "style2" && renderStyle2()}
      {style === "style3" && renderStyle3()}
    </>
  );
}
