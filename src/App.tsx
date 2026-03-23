import { motion } from 'motion/react';
import { 
  MessageCircle, 
  CheckCircle2, 
  Truck, 
  Award, 
  Clock, 
  MapPin, 
  Phone,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  HelpCircle,
  Plus,
  Quote,
  Star
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const WHATSAPP_LINK = "https://wa.me/5531984231605?text=Olá! Vi o anúncio no Google e gostaria de receber a tabela de preços para atacado.";
const WHATSAPP_ICON_URL = "https://files.catbox.moe/ttyh4q.png";
const LOGO_URL = "https://files.catbox.moe/zksqs4.png";
const GOOGLE_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-100 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-stone-900 group-hover:text-brand-600 transition-colors">{question}</span>
        <Plus className={`w-5 h-5 text-brand-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-stone-500 font-light leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    
    window.addEventListener('resize', () => map.invalidateSize());
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', () => map.invalidateSize());
    };
  }, [map]);
  return null;
};

export default function App() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 font-body font-light selection:bg-brand-100 overflow-x-hidden">
      {/* Floating WhatsApp Button - High Conversion */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
      >
        <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-6 h-6 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
        <span className="font-bold tracking-wide text-sm uppercase">
          Receber Tabela via WhatsApp
        </span>
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-stone-100/50">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="Empadas Caseiras Logo" 
              className="h-8 lg:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
            <a href="#beneficios" className="hover:text-brand-600 transition-colors">Benefícios</a>
            <a href="#como-funciona" className="hover:text-brand-600 transition-colors">Como Funciona</a>
            <a href="#sabores" className="hover:text-brand-600 transition-colors">Cardápio</a>
            <a href="#depoimentos" className="hover:text-brand-600 transition-colors">Depoimentos</a>
            <a href="#faq" className="hover:text-brand-600 transition-colors">Dúvidas</a>
          </div>

          <a 
            href={WHATSAPP_LINK}
            className="bg-stone-900 text-white px-4 lg:px-8 py-2 lg:py-3 rounded-full text-[9px] lg:text-[11px] font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-stone-200 flex items-center gap-2"
          >
            <span className="hidden sm:inline">Falar com Consultor</span>
            <span className="sm:hidden">Consultor</span>
            <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-3 h-3 lg:w-3.5 lg:h-3.5 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
          </a>
        </div>
      </nav>

      <main className="overflow-x-hidden">
        {/* Hero Section - Optimized for Google Ads Search Intent */}
        <section className="relative pt-24 lg:pt-40 pb-12 lg:pb-24 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="hidden lg:inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                    <PackageCheck className="w-3 h-3" />
                    Fornecedor de Salgados em BH e Região
                  </div>
                  <h1 className="text-4xl md:text-7xl font-heading font-medium leading-[1.05] text-stone-900 mb-6 lg:mb-8 tracking-tight">
                    Fornecedor de Empadas para <span className="italic text-brand-600 font-normal">Revenda em BH</span> | Atacado B2B.
                  </h1>
                  <p className="text-lg lg:text-xl text-stone-500 mb-8 lg:mb-10 leading-relaxed max-w-xl font-light">
                    Abasteça seu estabelecimento com a melhor empada de BH. Massa super fina, recheios premium e 14 anos de tradição no atacado.
                  </p>
                  
                  {/* Trust Badges for Ads */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
                    <div className="flex items-center gap-2 text-stone-600">
                      <CheckCircle2 className="w-5 h-5 text-brand-500" />
                      <span className="text-xs font-bold uppercase tracking-wider">Entrega em BH</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <CheckCircle2 className="w-5 h-5 text-brand-500" />
                      <span className="text-xs font-bold uppercase tracking-wider">Tabela Atacado</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <CheckCircle2 className="w-5 h-5 text-brand-500" />
                      <span className="text-xs font-bold uppercase tracking-wider">25+ Sabores</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={WHATSAPP_LINK}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-600 text-white px-12 py-6 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-700 transition-all shadow-2xl shadow-brand-200"
                    >
                      Solicitar Tabela de Preços
                      <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-5 h-5 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                    </motion.a>
                    <div className="flex items-center gap-4 px-2">
                      <div className="text-xs uppercase tracking-widest font-bold text-stone-400">
                        Atendimento <span className="text-stone-900">Imediato</span> via WhatsApp
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 relative mt-16 lg:mt-0 px-4 lg:px-0">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="relative z-10 mx-auto max-w-[400px] lg:max-w-none"
                >
                  <div className="aspect-[4/5] rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl border-4 lg:border-8 border-white">
                    <img 
                      src="https://files.catbox.moe/fe8pi7.jpg" 
                      alt="Empadas Caseiras Atacado" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-2 lg:-bottom-8 lg:-left-8 bg-white p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] shadow-2xl border border-stone-50">
                    <p className="text-brand-600 font-heading text-4xl lg:text-5xl font-bold mb-1">
                      14+
                    </p>
                    <p className="text-stone-400 text-[8px] lg:text-[10px] font-bold uppercase tracking-widest">Anos no Mercado</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Benefits Bar */}
        <section className="bg-stone-900 py-12 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <Truck className="w-6 h-6" />, title: "Logística Própria", desc: "Entregas diárias em toda BH e região metropolitana." },
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Padrão de Qualidade", desc: "Higiene rigorosa e padronização em todos os lotes." },
                { icon: <Clock className="w-6 h-6" />, title: "Pronta Entrega", desc: "Agilidade no atendimento para seu estoque nunca parar." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <div className="text-brand-500 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">{item.title}</h4>
                    <p className="text-stone-400 text-sm font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works - Conversion Step by Step */}
        <section id="como-funciona" className="py-32 bg-white overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-stone-900 mb-6">Como funciona o fornecimento de empadas</h2>
            <p className="text-stone-500 max-w-2xl mx-auto font-light">Três passos simples para ter a melhor empada de BH no seu estabelecimento com nossa distribuição programada.</p>
          </div>

          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connector Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-stone-100 -z-10" />
              
              {[
                { step: "01", title: "Contato Inicial", desc: "Clique no botão e solicite nossa tabela de preços atualizada via WhatsApp." },
                { step: "02", title: "Degustação e Orçamento", desc: "Nossos consultores agendam uma visita ou envio de amostras para sua avaliação." },
                { step: "03", title: "Entrega Programada", desc: "Definimos os dias de entrega para que seu estoque esteja sempre fresco." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  className="bg-[#FDFCFB] p-10 rounded-[40px] border border-stone-100 text-center hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 font-heading text-2xl font-bold shadow-lg shadow-brand-200">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-stone-500 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions - Targeted for Ads */}
        <section id="beneficios" className="py-32 bg-[#FDFCFB] overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl font-heading font-medium text-stone-900 mb-10 leading-tight">
                  Fornecimento especializado para <span className="italic text-brand-600">grandes operações</span>.
                </h2>
                <div className="space-y-8">
                  {[
                    { title: "Hospitais e Clínicas", desc: "Atendemos rigorosos padrões de segurança alimentar e pontualidade." },
                    { title: "Lanchonetes e Cafeterias", desc: "Aumente seu faturamento com um produto de alta aceitação e giro rápido." },
                    { title: "Eventos e Buffets", desc: "Empadas finas com padronização visual e sabor artesanal para seus convidados." },
                    { title: "Cantinas Escolares", desc: "Opção nutritiva e saborosa que agrada o público jovem e exigente." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6 p-6 rounded-3xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-stone-100"
                    >
                      <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 mb-1">{item.title}</h4>
                        <p className="text-stone-500 text-sm font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <a 
                    href={WHATSAPP_LINK}
                    className="inline-flex items-center gap-3 bg-stone-900 text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl"
                  >
                    Quero ser um parceiro
                    <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-4 h-4 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                  </a>
                </motion.div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://files.catbox.moe/nnygyo.webp" 
                    alt="Fornecimento Especializado" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-2 lg:-bottom-10 lg:-right-10 bg-brand-600 text-white p-6 lg:p-12 rounded-[24px] lg:rounded-[40px] shadow-2xl max-w-[200px] lg:max-w-xs">
                  <p className="text-white/80 text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.3em] mb-2 lg:mb-4">Diferencial</p>
                  <p className="text-sm lg:text-xl font-heading italic font-light leading-relaxed">
                    "Nossa massa super fina é o que garante a recompra no seu estabelecimento."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flavors Section - Redesigned for Perfect Alignment */}
        <section id="sabores" className="py-32 bg-stone-50/50 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <motion.div {...fadeIn}>
                <h2 className="text-4xl md:text-5xl font-heading font-medium text-stone-900 mb-6 tracking-tight">Nosso Cardápio Completo</h2>
                <p className="text-stone-500 max-w-2xl mx-auto font-body font-light text-lg leading-relaxed">
                  Variedade e sabor artesanal em cada detalhe. Conheça nossa linha completa de salgados para o seu negócio.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {/* Column 1: Empadas de Frango */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-stone-100 flex flex-col hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-stone-50">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-stone-900 uppercase tracking-widest">Empadas de Frango</h3>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">11 Sabores Disponíveis</p>
                  </div>
                </div>
                <ul className="space-y-5">
                  {[
                    "Frango",
                    "Frango com Azeitona",
                    "Frango com Bacon",
                    "Frango com Catupiry",
                    "Frango com Palmito",
                    "Frango com 4 Queijos",
                    "Frango com Cheddar",
                    "Goianinha",
                    "Strogonof de Frango",
                    "Frango com Pimenta Biquinho",
                    "Frango com Alho Poró"
                  ].map((sabor, i) => (
                    <li key={i} className="flex items-center gap-4 text-stone-600 font-body font-light group">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-200 group-hover:bg-brand-600 transition-all group-hover:scale-150" />
                      <span className="group-hover:text-stone-900 transition-colors">{sabor}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-6 border-t border-stone-50 flex justify-center md:justify-start">
                  <a 
                    href={WHATSAPP_LINK} 
                    className="flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
                  >
                    Pedir agora 
                    <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-4 h-4 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                  </a>
                </div>
              </motion.div>

              {/* Column 2: Empadas Diferenciadas */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-stone-100 flex flex-col hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-stone-50">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-stone-900 uppercase tracking-widest">Diferenciadas</h3>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">11 Sabores Disponíveis</p>
                  </div>
                </div>
                <ul className="space-y-5">
                  {[
                    "Alho Poró",
                    "Palmito com Molho Branco",
                    "Napolitano",
                    "4 Queijos",
                    "Mexicana",
                    "Mineirinha",
                    "Calabresa with Creme De Milho",
                    "Carne Seca Com Creme De Mandioca",
                    "Carne Seca com catupiri",
                    "Palmito com Alho Poro",
                    "Costelinha Defumada"
                  ].map((sabor, i) => (
                    <li key={i} className="flex items-center gap-4 text-stone-600 font-body font-light group">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-200 group-hover:bg-brand-600 transition-all group-hover:scale-150" />
                      <span className="group-hover:text-stone-900 transition-colors">{sabor}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-6 border-t border-stone-50 flex justify-center md:justify-start">
                  <a 
                    href={WHATSAPP_LINK} 
                    className="flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
                  >
                    Pedir agora 
                    <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-4 h-4 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                  </a>
                </div>
              </motion.div>

              {/* Column 3: Especiais, Tortinhas, Pastel e Esfirra */}
              <div className="flex flex-col gap-8">
                {/* Especiais & Tortinhas Card */}
                <motion.div 
                  {...fadeIn}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-10 rounded-[40px] shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-stone-50">
                      <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                        <Plus className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-stone-900 uppercase tracking-widest">Especiais</h3>
                    </div>
                    <ul className="space-y-4">
                      {["Bacalhau com Azeitona", "Camarão com Catupiry"].map((sabor, i) => (
                        <li key={i} className="flex items-center gap-4 text-stone-600 font-body font-light group">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-200 group-hover:bg-brand-600 transition-all" />
                          <span className="group-hover:text-stone-900 transition-colors">{sabor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-stone-50">
                      <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                        <PackageCheck className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-stone-900 uppercase tracking-widest">Tortinhas</h3>
                    </div>
                    <ul className="space-y-4">
                      {["Frango", "Frango Com Catupiry", "Frango Com Azeitona", "Frango Com Bacon"].map((sabor, i) => (
                        <li key={i} className="flex items-center gap-4 text-stone-600 font-body font-light group">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-200 group-hover:bg-brand-600 transition-all" />
                          <span className="group-hover:text-stone-900 transition-colors">{sabor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10 pt-6 border-t border-stone-50 flex justify-center md:justify-start">
                    <a 
                      href={WHATSAPP_LINK} 
                      className="flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
                    >
                      Pedir agora 
                      <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-4 h-4 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                    </a>
                  </div>
                </motion.div>

                {/* Pastel & Esfirra Card */}
                <motion.div 
                  {...fadeIn}
                  transition={{ delay: 0.3 }}
                  className="bg-brand-600 p-10 rounded-[40px] shadow-xl shadow-brand-100 text-white hover:bg-brand-700 transition-colors"
                >
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-heading font-bold uppercase tracking-widest">Pastel Assado</h3>
                    </div>
                    <ul className="space-y-4">
                      {["Frango", "Frango com Catupiry"].map((sabor, i) => (
                        <li key={i} className="flex items-center gap-4 text-white/80 font-body font-light group">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-all" />
                          <span className="group-hover:text-white transition-colors">{sabor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                        <Plus className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-heading font-bold uppercase tracking-widest">Esfirras</h3>
                    </div>
                    <ul className="space-y-4">
                      {["Carne"].map((sabor, i) => (
                        <li key={i} className="flex items-center gap-4 text-white/80 font-body font-light group">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-all" />
                          <span className="group-hover:text-white transition-colors">{sabor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10 pt-6 border-t border-white/10 flex justify-center md:justify-start">
                    <a 
                      href={WHATSAPP_LINK} 
                      className="flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-3 bg-white text-brand-600 px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-all shadow-lg shadow-black/5"
                    >
                      Pedir agora 
                      <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase Section */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12 lg:mb-16">
              <h3 className="text-3xl md:text-5xl font-heading font-medium text-stone-900 mb-6 leading-tight tracking-tight">
                Produção diária com <span className="italic text-brand-600">ingredientes selecionados</span>.
              </h3>
              <p className="text-stone-500 text-lg font-light max-w-2xl mx-auto">
                Cada empada é produzida seguindo nossa receita tradicional de 14 anos, garantindo a mesma qualidade em cada entrega.
              </p>
            </div>
            <div className="relative rounded-[32px] lg:rounded-[60px] overflow-hidden h-[300px] lg:h-[600px] shadow-2xl">
              <img 
                src="https://files.catbox.moe/fe8pi7.jpg" 
                alt="Variedade de Empadas Caseiras" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="py-32 bg-stone-50/50 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <motion.div {...fadeIn}>
                <h2 className="text-4xl md:text-5xl font-heading font-medium text-stone-900 mb-6 tracking-tight">O que nossos parceiros dizem</h2>
                <p className="text-stone-500 max-w-2xl mx-auto font-body font-light text-lg leading-relaxed">
                  A confiança de quem já transformou seu negócio com nossas empadas.
                </p>
              </motion.div>
            </div>

            <div 
              className="relative overflow-hidden py-10"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className={`flex gap-8 w-max animate-marquee ${isPaused ? 'pause-animation' : ''}`}>
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-8">
                    {[
                      {
                        name: "Mariana Silva",
                        text: "As empadas são o carro-chefe da minha cafeteria há 3 anos. A massa é realmente diferenciada e o recheio é muito bem temperado. Meus clientes adoram!",
                      },
                      {
                        name: "Ricardo Oliveira",
                        text: "Fornecedor extremamente pontual e profissional. A padronização das empadas ajuda muito no controle de estoque do meu buffet e a qualidade é impecável.",
                      },
                      {
                        name: "André Santos",
                        text: "Nossos pacientes e acompanhantes adoram as opções. É um produto que transmite cuidado e qualidade artesanal, essencial para nosso padrão de atendimento.",
                      },
                      {
                        name: "Cláudia Lima",
                        text: "A entrega é sempre no horário e as empadas chegam quentinhas. O custo-benefício para revenda é o melhor da região.",
                      },
                      {
                        name: "Marcos Vinícius",
                        text: "Colocamos na nossa conveniência e a aceitação foi imediata. Produto de alta qualidade que fideliza o cliente.",
                      },
                      {
                        name: "Fernanda Costa",
                        text: "Sempre encomendo para os eventos que organizo. A variedade de sabores atende a todos os gostos e a apresentação é linda.",
                      }
                    ].map((testimonial, idx) => {
                      const colors = [
                        'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 
                        'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
                        'bg-orange-500', 'bg-cyan-500'
                      ];
                      const randomColor = colors[Math.floor((testimonial.name.charCodeAt(0) + idx) % colors.length)];
                      
                      return (
                        <div
                          key={`${i}-${idx}`}
                          className="bg-white p-10 rounded-[40px] shadow-sm border border-stone-100 flex flex-col w-[300px] md:w-[400px] h-full hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <img src={GOOGLE_ICON_URL} alt="Google" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                          </div>
                          <p className="text-stone-600 font-body font-light text-lg leading-relaxed mb-10 flex-grow italic">
                            "{testimonial.text}"
                          </p>
                          <div className="flex items-center gap-4 pt-6 border-t border-stone-50">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${randomColor} shadow-inner`}>
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-stone-900 text-sm uppercase tracking-widest">{testimonial.name}</h4>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Answering Objections for Ads */}
        <section id="faq" className="py-32 bg-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-50 rounded-full mb-6">
                <HelpCircle className="w-8 h-8 text-brand-600" />
              </div>
              <h2 className="text-4xl font-heading font-medium text-stone-900 mb-4">Dúvidas Frequentes</h2>
              <p className="text-stone-500 font-light">Tudo o que você precisa saber para se tornar um parceiro.</p>
            </div>
            
            <div className="space-y-2">
              <FAQItem 
                question="Qual o pedido mínimo para atacado?" 
                answer="Trabalhamos com quantidades mínimas flexíveis dependendo da região de entrega. Entre em contato para consultar a política específica para o seu bairro." 
              />
              <FAQItem 
                question="Vocês entregam em toda a Grande BH?" 
                answer="Sim, possuímos logística própria que atende Belo Horizonte, Contagem, Betim, Nova Lima e Santa Luzia em dias programados." 
              />
              <FAQItem 
                question="As empadas são entregues prontas para consumo?" 
                answer="Fornecemos tanto empadas prontas (frescas do dia) quanto opções para finalização no local, dependendo da necessidade da sua operação." 
              />
              <FAQItem 
                question="Como funciona o faturamento para empresas?" 
                answer="Oferecemos condições de faturamento quinzenal ou mensal para parceiros cadastrados e com recorrência de pedidos." 
              />
            </div>
          </div>
        </section>

        {/* Map Section - Delivery Coverage */}
        <section className="py-32 bg-stone-50/30 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div {...fadeIn}>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  <MapPin className="w-3 h-3" />
                  Área de Atendimento
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-medium text-stone-900 mb-8 tracking-tight">
                  Onde <span className="italic text-brand-600 font-normal">entregamos</span>.
                </h2>
                <p className="text-lg text-stone-500 mb-10 leading-relaxed font-light">
                  Nossa logística própria atende toda a região metropolitana de Belo Horizonte com entregas programadas de segunda a sábado.
                </p>
                
                <div className="flex flex-wrap justify-center gap-8 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm border border-stone-100">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-widest">Belo Horizonte</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm border border-stone-100">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-widest">Região Metropolitana</h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-5xl mx-auto"
            >
              <div className="h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white relative z-0">
                <MapContainer 
                  center={[-19.9167, -43.9333]} 
                  zoom={11} 
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                    <MapResizer />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <Circle 
                      center={[-19.9167, -43.9333]} 
                      radius={15000} 
                      pathOptions={{ 
                        fillColor: '#F27D26', 
                        color: '#F27D26', 
                        fillOpacity: 0.1,
                        weight: 2,
                        dashArray: '5, 10'
                      }} 
                    />
                    <Marker position={[-19.9345, -43.9355]}>
                      <Popup>
                        <div className="p-2">
                          <h4 className="font-bold text-stone-900 mb-1">Escritório Central</h4>
                          <p className="text-stone-500 text-xs">Rua dos Inconfidentes, Savassi - BH</p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </motion.div>
            </div>
          </section>

        {/* Final CTA - High Contrast Conversion */}
        <section className="py-32 bg-[#FDFCFB]">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="bg-brand-600 rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-brand-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-heading font-medium text-white mb-10 leading-[1.1]">
                  Receba nossa tabela de preços <span className="italic text-stone-900">agora</span>.
                </h2>
                <p className="text-brand-50 text-xl mb-12 font-light leading-relaxed">
                  Não perca tempo com fornecedores amadores. Garanta a melhor empada de BH no seu estabelecimento com condições exclusivas de atacado.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href={WHATSAPP_LINK}
                    className="w-full sm:w-auto bg-stone-900 text-white px-12 py-6 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-all shadow-2xl flex items-center justify-center gap-3"
                  >
                    <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-6 h-6 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                    Solicitar via WhatsApp
                  </a>
                  <p className="text-white text-sm font-bold uppercase tracking-widest">
                    Resposta em poucos minutos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-stone-100 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <img 
                src={LOGO_URL} 
                alt="Empadas Caseiras - Fornecedor de Salgados B2B" 
                className="h-10 w-auto object-contain mb-8"
                referrerPolicy="no-referrer"
              />
              <p className="text-stone-500 text-sm font-light leading-relaxed max-w-md">
                Somos especializados na fabricação e distribuição de empadas artesanais para o mercado B2B. Atendemos cafeterias, lanchonetes, hospitais e eventos em toda a Grande BH com produtos de alta qualidade e pontualidade britânica.
              </p>
            </div>
            
            <div>
              <h4 className="text-stone-900 font-bold text-xs uppercase tracking-widest mb-6">Navegação</h4>
              <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                <a href="#beneficios" className="hover:text-brand-600 transition-colors">Benefícios</a>
                <a href="#como-funciona" className="hover:text-brand-600 transition-colors">Processo</a>
                <a href="#faq" className="hover:text-brand-600 transition-colors">Dúvidas Frequentes</a>
                <a href="#sabores" className="hover:text-brand-600 transition-colors">Cardápio Atacado</a>
              </div>
            </div>

            <div className="text-right">
              <h4 className="text-stone-900 font-bold text-xs uppercase tracking-widest mb-6">Contato</h4>
              <p className="text-stone-900 font-bold text-sm tracking-tight mb-1">(31) 98423-1605</p>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Belo Horizonte - MG</p>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-2">contato@empadascaseiras.com.br</p>
            </div>
          </div>
          <div className="pt-12 border-t border-stone-50 text-center text-stone-300 text-[10px] font-bold uppercase tracking-widest">
            © 2024 Empadas Caseiras | Especialista em Empadas para Revenda e Atacado de Salgados.
          </div>
        </div>
      </footer>
    </div>
  );
}
