import React, { useState } from 'react';
import { 
  FileText, Award, Users, Map, Cpu, Database, ClipboardList, Briefcase, 
  MapPin, Milestone, Folder, CheckSquare, Sparkles, Code, BookOpen, Clock, Heart
} from 'lucide-react';
import { 
  USER_PERSONAS, USER_JOURNEY, CASOS_USO, USER_STORIES, PRODUCT_BACKLOG, 
  ESQUEMA_SQL, LEAN_CANVAS, BUSINESS_MODEL_CANVAS, INSTANT_API_DESIGN, 
  UserPersona 
} from '../deliverablesData';

export default function StrategyHub() {
  const [activeTab, setActiveTab] = useState<'business' | 'ux' | 'tech' | 'agile'>('business');
  const [activeSubTab, setActiveSubTab] = useState<string>('lean');
  const [copiedSql, setCopiedSql] = useState(false);

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(ESQUEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-brand-teal/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      {/* Tab bar header */}
      <div className="bg-brand-clay p-4 border-b-3 border-brand-teal/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-brand-teal flex items-center gap-2">
              <Award className="text-brand-orange h-6 w-6" />
              SaaS & Strategy Studio
            </h2>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Plan de negocio, arquitectura y scrum deliverables de NutriKids para inversores.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'business', label: '1. Modelo de Negocio', icon: FileText, sub: 'lean' },
              { id: 'ux', label: '2. UX & Customer Value', icon: Users, sub: 'personas' },
              { id: 'tech', label: '3. Arquitectura & DB', icon: Cpu, sub: 'arch' },
              { id: 'agile', label: '4. Plan Ágil & Scrum', icon: ClipboardList, sub: 'stories' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setActiveSubTab(tab.sub);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display font-semibold text-xs border-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-teal text-white border-brand-teal shadow-md'
                    : 'bg-white text-brand-teal border-brand-teal/20 hover:bg-brand-teal/5'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid containing Sub-tabs Sidebar and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 bg-brand-cream border-r-3 border-brand-teal/10 p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
          {activeTab === 'business' && (
            <>
              <button
                onClick={() => setActiveSubTab('lean')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'lean'
                    ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Lean Canvas
              </button>
              <button
                onClick={() => setActiveSubTab('bmc')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'bmc'
                    ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Business Model Canvas
              </button>
              <button
                onClick={() => setActiveSubTab('value')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'value'
                    ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Propuesta de Valor
              </button>
            </>
          )}

          {activeTab === 'ux' && (
            <>
              <button
                onClick={() => setActiveSubTab('personas')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'personas'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-600/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                User Personas
              </button>
              <button
                onClick={() => setActiveSubTab('journey')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'journey'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-600/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                User Journey Map
              </button>
              <button
                onClick={() => setActiveSubTab('wireframes')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'wireframes'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-600/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Mapeo de Wireframes
              </button>
            </>
          )}

          {activeTab === 'tech' && (
            <>
              <button
                onClick={() => setActiveSubTab('arch')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'arch'
                    ? 'bg-brand-green/10 text-brand-teal border-brand-green/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Arquitectura del Sistema
              </button>
              <button
                onClick={() => setActiveSubTab('folders')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'folders'
                    ? 'bg-brand-green/10 text-brand-teal border-brand-green/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Estructura de Carpetas
              </button>
              <button
                onClick={() => setActiveSubTab('database')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'database'
                    ? 'bg-brand-green/10 text-brand-teal border-brand-green/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Esquema de BD e Indexación
              </button>
              <button
                onClick={() => setActiveSubTab('sql')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'sql'
                    ? 'bg-brand-green/10 text-brand-teal border-brand-green/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Script SQL Completo
              </button>
              <button
                onClick={() => setActiveSubTab('api')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'api'
                    ? 'bg-brand-green/10 text-brand-teal border-brand-green/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Diseño de API REST
              </button>
            </>
          )}

          {activeTab === 'agile' && (
            <>
              <button
                onClick={() => setActiveSubTab('cases')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'cases'
                    ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Casos de Uso (UML)
              </button>
              <button
                onClick={() => setActiveSubTab('stories')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'stories'
                    ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                User Stories (Scrum)
              </button>
              <button
                onClick={() => setActiveSubTab('backlog')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'backlog'
                    ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Product Backlog
              </button>
              <button
                onClick={() => setActiveSubTab('roadmap')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  activeSubTab === 'roadmap'
                    ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/30'
                    : 'text-gray-600 border-transparent hover:bg-brand-clay'
                }`}
              >
                Roadmap del MVP
              </button>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-4 p-6 bg-white min-h-[500px]">
          {/* LEAN CANVAS */}
          {activeSubTab === 'lean' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-extrabold text-xl text-brand-teal">Lean Canvas - NutriKids</h3>
                <span className="bg-brand-orange/15 px-3 py-1 rounded-full text-[10px] uppercase font-display font-bold text-brand-orange">
                  Validación del Mercado Peruano
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-2 border-brand-teal/15 p-4 rounded-2xl bg-brand-clay/35">
                <div className="bg-white p-4 rounded-xl border border-brand-teal/10 shadow-sm">
                  <h4 className="font-display font-bold text-xs uppercase text-brand-orange mb-2">1. Problemas Clave</h4>
                  <ul className="list-disc pl-4 text-xs space-y-1.5 text-gray-700">
                    {LEAN_CANVAS.problemas.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-brand-teal/10 shadow-sm">
                  <h4 className="font-display font-bold text-xs uppercase text-brand-orange mb-2">4. Canales</h4>
                  <ul className="list-disc pl-4 text-xs space-y-1.5 text-gray-700">
                    {LEAN_CANVAS.canales.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-brand-teal/10 shadow-sm">
                  <h4 className="font-display font-bold text-xs uppercase text-brand-orange mb-2">9. Ventaja Injusta</h4>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">{LEAN_CANVAS.ventajaInjusta[0]}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-brand-teal/10 shadow-sm col-span-1 md:col-span-2">
                  <h4 className="font-display font-bold text-xs uppercase text-brand-teal mb-2">3. Propuesta Única de Valor (UVP)</h4>
                  <p className="text-xs font-semibold text-brand-teal bg-brand-clay p-2.5 rounded-lg border-l-3 border-brand-orange">
                    {LEAN_CANVAS.propuestaValor[0]}
                  </p>
                  <p className="text-xs text-gray-700 mt-2 font-sans">{LEAN_CANVAS.propuestaValor[1]}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-brand-teal/10 shadow-sm">
                  <h4 className="font-display font-bold text-xs uppercase text-brand-orange mb-2">2. Segmento de Clientes</h4>
                  <p className="text-xs text-gray-700 mb-2 font-semibold">Mercado Inicial: Perú</p>
                  <ul className="list-disc pl-4 text-xs space-y-1.5 text-gray-700">
                    {LEAN_CANVAS.segmentos.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-brand-teal/10 shadow-sm lg:col-span-3">
                  <h4 className="font-display font-bold text-xs uppercase text-brand-teal mb-2">Estructura de Costes & Flujos de Ingresos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-brand-cream p-3 rounded-lg border border-brand-teal/10">
                      <p className="text-[11px] font-bold text-brand-teal uppercase mb-1">Costos Operativos:</p>
                      <ul className="list-disc pl-4 text-xs space-y-1 text-gray-700">
                        {LEAN_CANVAS.estructuraCostos.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                    <div className="bg-brand-cream p-3 rounded-lg border border-brand-teal/10">
                      <p className="text-[11px] font-bold text-brand-teal uppercase mb-1">Ventas & Monetización:</p>
                      <ul className="list-disc pl-4 text-xs space-y-1 text-gray-700">
                        {LEAN_CANVAS.flujosIngreso.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BUSINESS MODEL CANVAS */}
          {activeSubTab === 'bmc' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Business Model Canvas (Generación de Valor SaaS)</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 border-2 border-brand-teal/15 p-4 rounded-2xl bg-brand-clay/10 text-xs">
                
                {/* Socios Clave */}
                <div className="md:col-span-1 bg-white p-3 rounded-xl border border-brand-teal/10 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-[11px] uppercase text-brand-orange mb-2">Socios Clave</h4>
                    <ul className="list-none space-y-1.5 text-gray-700">
                      {BUSINESS_MODEL_CANVAS.sociosClave.map((item, idx) => (
                        <li key={idx} className="bg-brand-clay/30 p-1 rounded">✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actividades & Recursos Clave */}
                <div className="md:col-span-1 flex flex-col gap-3">
                  <div className="bg-white p-3 rounded-xl border border-brand-teal/10 flex-1">
                    <h4 className="font-display font-bold text-[11px] uppercase text-brand-teal mb-1.5">Actividades</h4>
                    <ul className="space-y-1 text-gray-600">
                      {BUSINESS_MODEL_CANVAS.actividadesClave.map((item, idx) => <li key={idx}>• {item}</li>)}
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-brand-teal/10 flex-1">
                    <h4 className="font-display font-bold text-[11px] uppercase text-brand-teal mb-1.5">Recursos</h4>
                    <ul className="space-y-1 text-gray-600">
                      {BUSINESS_MODEL_CANVAS.recursosClave.map((item, idx) => <li key={idx}>• {item}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Propuesta de Valor */}
                <div className="md:col-span-1 bg-white p-3 rounded-xl border-2 border-brand-orange/40 flex flex-col justify-center">
                  <h4 className="font-display font-bold text-[11px] uppercase text-brand-orange mb-2">Propuestas de Valor</h4>
                  <p className="font-medium text-brand-teal leading-relaxed bg-brand-orange/5 p-2 rounded border border-brand-orange/15 text-center">
                    {BUSINESS_MODEL_CANVAS.propuestaValor[0]}
                  </p>
                </div>

                {/* Relaciones & Canales */}
                <div className="md:col-span-1 flex flex-col gap-3">
                  <div className="bg-white p-3 rounded-xl border border-brand-teal/10 flex-1">
                    <h4 className="font-display font-bold text-[11px] uppercase text-brand-teal mb-1.5">Relaciones</h4>
                    <p className="text-gray-600 text-[10px] leading-snug">{BUSINESS_MODEL_CANVAS.relacionesClientes[0]}</p>
                    <p className="text-gray-600 text-[10px] mt-1 leading-snug">{BUSINESS_MODEL_CANVAS.relacionesClientes[1]}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-brand-teal/10 flex-1">
                    <h4 className="font-display font-bold text-[11px] uppercase text-brand-teal mb-1.5">Canales</h4>
                    <ul className="space-y-1 text-gray-600">
                      {BUSINESS_MODEL_CANVAS.canales.map((item, idx) => <li key={idx}>▸ {item}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Segmentos de Mercado */}
                <div className="md:col-span-1 bg-white p-3 rounded-xl border border-brand-teal/10">
                  <h4 className="font-display font-bold text-[11px] uppercase text-brand-orange mb-2">Segmento</h4>
                  <p className="text-gray-700 leading-relaxed bg-brand-clay p-2 rounded">
                    {BUSINESS_MODEL_CANVAS.segmentoClientes[0]}
                  </p>
                </div>

                {/* Costes e Ingresos Footer */}
                <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                  <div className="bg-brand-teal/5 p-3 rounded-xl border border-brand-teal/10">
                    <span className="font-bold text-[10px] uppercase text-brand-teal">Estructura Costos</span>
                    <ul className="grid grid-cols-2 gap-1 mt-1 text-[11px] text-gray-600">
                      {BUSINESS_MODEL_CANVAS.estructuraCostos.map((item, i) => <li key={i}>• {item}</li>)}
                    </ul>
                  </div>
                  <div className="bg-brand-orange/5 p-3 rounded-xl border border-brand-orange/10">
                    <span className="font-bold text-[10px] uppercase text-brand-orange">Estructura de Flujos de Ingresos</span>
                    <ul className="grid grid-cols-1 gap-1 mt-1 text-[11px] text-gray-600">
                      {BUSINESS_MODEL_CANVAS.fuentesIngresos.map((item, i) => <li key={i}>💵 {item}</li>)}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PROPUESTA DE VALOR DETAIL */}
          {activeSubTab === 'value' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Value Proposition Canvas</h3>
              <p className="text-xs text-gray-500 font-sans mt-1">
                La intersección perfecta entre el Perfil de Necesidad del Padre y los Aliviadores de Esfuerzo de NutriKids.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Profile */}
                <div className="bg-blue-50/50 p-5 rounded-2xl border-2 border-blue-100">
                  <div className="flex items-center gap-2 text-blue-800 font-display font-bold mb-3">
                    <Users className="h-5 w-5" />
                    <h4>Perfil del Padre Peruano</h4>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <b className="text-blue-900 block mb-1">Trabajos del Cliente (Customer Jobs)</b>
                      <p className="text-gray-600">Alimentar balanceadamente a sus niños (1-6 años), preparar loncheras saludables, dosificar raciones y evitar anemia.</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <b className="text-red-900 block mb-1">Frustraciones (Pains)</b>
                      <p className="text-gray-600">Falta de tiempo, rechazo infantil a las verduras duras, desperdicio de insumos en el refrigerador, pánico por el índice de hemoglobina.</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <b className="text-emerald-900 block mb-1">Alegrías Esperadas (Gains)</b>
                      <p className="text-gray-600">Planificar rápido la semana, hacer compras expeditas en el mercado barrial peruano sin derrochar presupuesto y ver a su hijo sano.</p>
                    </div>
                  </div>
                </div>

                {/* Value Map */}
                <div className="bg-orange-50/50 p-5 rounded-2xl border-2 border-orange-100">
                  <div className="flex items-center gap-2 text-brand-orange font-display font-bold mb-3">
                    <Sparkles className="h-5 w-5" />
                    <h4>Mapa de Valor de NutriKids</h4>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-orange-100">
                      <b className="text-brand-orange block mb-1">Productos y Servicios</b>
                      <p className="text-gray-600">Aplicación web móvil offline-first con recetario criollo pediátrico verificado por nutricionistas andinos, y planificador interactivo.</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-orange-100">
                      <b className="text-brand-orange block mb-1">Aliviadores de Frustración (Pain Relievers)</b>
                      <p className="text-gray-600">Suministro de 18 recetas peruanas ultra-baratadas ricas en hierro (sangrecita, bazo), lista de mercado unificada que consolida pesos automáticamente.</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-orange-100">
                      <b className="text-brand-orange block mb-1">Creadores de Alegrías (Gain Creators)</b>
                      <p className="text-gray-600">Un niño bien nutrido sin estresar financieramente al hogar, recetas divididas por raciones y textura de deglución según la edad de 1 a 6 años.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USER PERSONAS */}
          {activeSubTab === 'personas' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">User Personas (Arquetipos de Usuarios)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {USER_PERSONAS.map((p, index) => (
                  <div key={index} className="bg-brand-clay/10 rounded-2xl border-2 border-brand-teal/10 p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white ${
                        p.avatarColor === 'indigo' ? 'bg-indigo-600' : 'bg-teal-600'
                      }`}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-brand-teal text-base">{p.name} ({p.age} años)</h4>
                        <span className="text-xs text-brand-orange font-semibold">{p.role}</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-2 text-gray-700">
                      <p><b>Ubicación:</b> {p.location} | <b>Ocupación:</b> {p.occupation}</p>
                      <p className="bg-white p-2 rounded border border-brand-teal/5 italic">"{p.familyContext}"</p>
                      <div>
                        <b className="text-brand-teal text-[11px] block uppercase mb-1">Objetivos:</b>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {p.goals.map((g, i) => <li key={i}>{g}</li>)}
                        </ul>
                      </div>
                      <div>
                        <b className="text-brand-orange text-[11px] block uppercase mb-1">Familiar Pains:</b>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {p.painPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* USER JOURNEY MAP */}
          {activeSubTab === 'journey' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">User Journey Map de Camila & Thiago</h3>
              <div className="relative border-l-2 border-brand-orange/30 pl-6 ml-4 space-y-6">
                {USER_JOURNEY.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-brand-orange bg-white flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                    </span>
                    
                    <div className="bg-brand-clay/10 p-4 rounded-xl border border-brand-teal/5 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-brand-orange uppercase">{step.phase}</span>
                        <span className="text-xs font-sans px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full font-semibold">
                          Estado: {step.emotions === 'frustrado' ? '🙁 Frustrada' : step.emotions === 'neutral' ? '😐 Expectante' : '😊 Aliviada/Feliz'}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-brand-teal">{step.action}</h4>
                      <p className="text-xs text-gray-500"><b>Punto de Contacto:</b> {step.touchpoint}</p>
                      <p className="text-xs italic text-gray-600 font-sans bg-white p-2 rounded">Pensamiento: "{step.thoughts}"</p>
                      <div className="bg-brand-green/10 p-2 rounded text-xs text-brand-teal border border-brand-green/20">
                        <b>Solución del MVP:</b> {step.painPointSolved}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WIREFRAMES */}
          {activeSubTab === 'wireframes' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Estructura de Wireframes de NutriKids</h3>
              <p className="text-xs text-gray-500 font-sans">
                Mapa estructural de pantallas mobile-first de NutriKids centrándose en el minimalismo responsivo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border bg-brand-clay/10 p-4 rounded-xl font-mono text-[10px]">
                  <b className="border-b block pb-1 border-brand-teal/15 text-brand-teal mb-2">[PANTALLA 1: CATÁLOGO DE RECETAS]</b>
                  <div>+------------------------------------------+</div>
                  <div>| [Buscador de alimentos] [X] Filtrar |</div>
                  <div>+------------------------------------------+</div>
                  <div>| (Desayuno) (Almuerzo) (Cena) (Snacks)   |</div>
                  <div>+------------------------------------------+</div>
                  <div>|                                          |</div>
                  <div>|  [Imagen] Sangrecita de Pollo            |</div>
                  <div>|  Prep: 25 min | Dif: Fácil              |</div>
                  <div>|  [⭐ Fav] [Ver Preparación]              |</div>
                  <div>|                                          |</div>
                  <div>|  [Imagen] Puré de Espinaca                |</div>
                  <div>|  Prep: 20 min | Dif: Fácil              |</div>
                  <div>|  [⭐ Fav] [Ver Preparación]              |</div>
                  <div>+------------------------------------------+</div>
                </div>

                <div className="border bg-brand-clay/10 p-4 rounded-xl font-mono text-[10px]">
                  <b className="border-b block pb-1 border-brand-teal/15 text-brand-teal mb-2">[PANTALLA 2: MENÚ SEMANAL]</b>
                  <div>+------------------------------------------+</div>
                  <div>| LUNES | MARTES | MIERCOLES | JUEVES...   |</div>
                  <div>+------------------------------------------+</div>
                  <div>| DESAYUNO                                 |</div>
                  <div>| [ + Añadir receta o Papilla de plátano ] |</div>
                  <div>+------------------------------------------+</div>
                  <div>| ALMUERZO                                 |</div>
                  <div>| [ Sangrecita de Pollo Tradicional ] - (X) |</div>
                  <div>+------------------------------------------+</div>
                  <div>| CENA                                     |</div>
                  <div>| [ + Añadir sopa de sémola o crema]      |</div>
                  <div>+------------------------------------------+</div>
                </div>

                <div className="border bg-brand-clay/10 p-4 rounded-xl font-mono text-[10px]">
                  <b className="border-b block pb-1 border-brand-teal/15 text-brand-teal mb-2">[PANTALLA 3: LISTA DE COMPRAS]</b>
                  <div>+------------------------------------------+</div>
                  <div>| Consolidación de Menú de Thiago          |</div>
                  <div>+------------------------------------------+</div>
                  <div>| [_] Papa amarilla ------- 2 Unidades     |</div>
                  <div>| [_] Espinaca ------------ 150 gramos     |</div>
                  <div>| [x] Sangrecita --------- 200 gramos (Tach)|</div>
                  <div>| [_] Hojas de hierbabuena - 3 ramas       |</div>
                  <div>+------------------------------------------+</div>
                  <div>|  [ Limpiar Todos ]  [ Exportar en PDF ] |</div>
                  <div>+------------------------------------------+</div>
                </div>
              </div>
            </div>
          )}

          {/* ARQUITECTURA DEL SISTEMA */}
          {activeSubTab === 'arch' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Arquitectura del Sistema (Clean Architecture y SaaS stack)</h3>
              <p className="text-xs text-gray-500 font-sans mt-1">
                La startup sigue patrones SOLID, desacoplando la capa de visualización (Vite/Next.js) de la lógica de procesamiento (Controllers/Repositorios) y la base de datos PostgreSQL de Supabase.
              </p>
              
              <div className="border-3 border-brand-teal/10 rounded-2xl p-6 bg-brand-clay/10 space-y-4 text-xs">
                <div className="flex items-center gap-2 font-bold text-brand-teal">
                  <Briefcase className="text-brand-orange h-4 w-4" />
                  <h4>Stack de Tecnología Seleccionado</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border">
                    <b className="text-brand-orange block mb-0.5">Vite + React</b>
                    <span className="text-[10px] text-gray-500">Frontend SPA</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <b className="text-brand-orange block mb-0.5">PostgreSQL</b>
                    <span className="text-[10px] text-gray-500">Durable SQL storage</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <b className="text-brand-orange block mb-0.5">Supabase Auth</b>
                    <span className="text-[10px] text-gray-500">Gestión de Perfiles</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <b className="text-brand-orange block mb-0.5">Tailwind CSS</b>
                    <span className="text-[10px] text-gray-500">Design System</span>
                  </div>
                </div>

                <div className="mt-4">
                  <b className="text-brand-teal block mb-1.5 uppercase font-display text-[11px]">Capas de la Ingeniería Limpia:</b>
                  <div className="space-y-2 font-sans">
                    <p className="bg-white p-2 rounded border-l-3 border-brand-teal/50">
                      <b>1. Capa de Entidades (Domain Entities):</b> Define los modelos constitutivos como Niños, Recetas, Usuarios, encapsulando reglas primitivas de negocio.
                    </p>
                    <p className="bg-white p-2 rounded border-l-3 border-brand-orange/50">
                      <b>2. Capa de Casos de Uso (Core Business Logic):</b> Controla la adición/remoción de comidas en el calendario y el cálculo matemático que fusiona ingredientes para la lista de compras.
                    </p>
                    <p className="bg-white p-2 rounded border-l-3 border-brand-green/50">
                      <b>3. Capa de Controladores y Repositorios (Interface Adapters):</b> Expone APIs mediante Express o Supabase Functions y persiste los datos de forma robusta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ESTRUCTURA CARPETAS */}
          {activeSubTab === 'folders' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Estructura de Carpetas (Clean Architecture en Monorrepo)</h3>
              <p className="text-xs text-gray-500">Planificación estructural de archivos recomendada para producción para independizar lógica del framework:</p>
              
              <div className="bg-gray-900 text-green-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                <div>nutrikids-root/</div>
                <div>├── apps/</div>
                <div>│   └── web-saas/               # App de React (Vite / Next.js)</div>
                <div>│       ├── src/</div>
                <div>│       │   ├── domain_entities/    # Modelos del Dominio (Niño, Receta, Menú)</div>
                <div>│       │   ├── use_cases/          # Lógica pura (Suma de porciones, Validaciones Freemium)</div>
                <div>│       │   ├── adapters/           # Servicios API y Supabase Client</div>
                <div>│       │   ├── components/         # UI Components (Catalogo, Planificador, ShoppingList)</div>
                <div>│       │   ├── index.css           # Tailwind Global Config</div>
                <div>│       │   └── App.tsx             # Bootstrap Component</div>
                <div>│       └── package.json</div>
                <div>├── supabase/                      # Configuración del Backend serverless</div>
                <div>│   ├── migrations/             # Migraciones SQL persistentes</div>
                <div>│   ├── functions/              # Edge Functions para generación PDF de menús</div>
                <div>│   └── config.toml</div>
                <div>└── README.md                       # Documentación inicial</div>
              </div>
            </div>
          )}

          {/* DATABASE DIAGRAM */}
          {activeSubTab === 'database' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Diagrama Relacional de Base de Datos (PostgreSQL)</h3>
              
              <div className="border border-brand-teal/15 rounded-xl overflow-hidden text-xs">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-brand-clay/30 font-display">
                    <tr>
                      <th className="px-4 py-2 text-left text-[11px] font-bold uppercase text-brand-teal">Tabla origen</th>
                      <th className="px-4 py-2 text-left text-[11px] font-bold uppercase text-brand-teal">Llave de unión (FK)</th>
                      <th className="px-4 py-2 text-left text-[11px] font-bold uppercase text-brand-teal">Destino (FK)</th>
                      <th className="px-4 py-2 text-left text-[11px] font-bold uppercase text-brand-teal">Cardinalidad / Propósito</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-brand-teal">usuarios</td>
                      <td className="px-4 py-3">id (PK)</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">Perfil base del padre tutor. Rastro de membresía premium.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-brand-teal">ninos</td>
                      <td className="px-4 py-3">usuario_id (FK)</td>
                      <td className="px-4 py-3">usuarios(id)</td>
                      <td className="px-4 py-3">1 a N. Un padre puede registrar múltiples hijos (premium).</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-brand-teal">favoritos</td>
                      <td className="px-4 py-3">usuario_id, receta_id</td>
                      <td className="px-4 py-3">usuarios, recetas</td>
                      <td className="px-4 py-3">N a M. Relación puente para acelerar las recetas preferidas.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-brand-teal">menus_semanales</td>
                      <td className="px-4 py-3">desayuno_receta_id ...</td>
                      <td className="px-4 py-3">recetas(id)</td>
                      <td className="px-4 py-3">Calendario por días. Referencia directa a receta andina.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-brand-teal">recetas_comunidad</td>
                      <td className="px-4 py-3">usuario_id (FK)</td>
                      <td className="px-4 py-3">usuarios(id)</td>
                      <td className="px-4 py-3">1 a N. Control temporal de revisiones de recetas caseras peruanas.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-brand-clay/10 p-4 rounded-xl border border-brand-teal/5">
                <b className="text-brand-orange block text-xs uppercase font-display mb-1">Estrategia de Indexación de Alto Rendimiento:</b>
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  Para startups SaaS, el tiempo de respuesta es vital. NutriKids define índices compuestos en <code className="bg-brand-clay px-1.5 py-0.5 rounded text-brand-teal font-mono">usuarios(email)</code> para inicios de sesión en milisegundos, e índices de llave externa sobre <code className="bg-brand-clay px-1.5 py-0.5 rounded text-brand-teal font-mono">ninos(usuario_id)</code> y <code className="bg-brand-clay px-1.5 py-0.5 rounded text-brand-teal font-mono">favoritos(usuario_id)</code> para optimizar consultas de inicio rápido del dashboard principal en celulares.
                </p>
              </div>
            </div>
          )}

          {/* SCRIPT SQL COMPLETO */}
          {activeSubTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-extrabold text-xl text-brand-teal">PostgreSQL DDL Schema Script</h3>
                <button
                  onClick={copySqlToClipboard}
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white text-xs font-display font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Code className="h-4 w-4" />
                  {copiedSql ? '¡Copiado!' : 'Copiar DDL completo'}
                </button>
              </div>
              <p className="text-xs text-gray-500 font-sans">
                Código SQL nativo compatible con Supabase, Neon o PostgreSQL autónomo. Incluye llaves foráneas y enumeradores.
              </p>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-y-auto max-h-[350px] shadow-inner text-xs font-mono text-gray-300">
                <pre>{ESQUEMA_SQL}</pre>
              </div>
            </div>
          )}

          {/* DISEÑO DE API */}
          {activeSubTab === 'api' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Endpoints de Navegación del API REST</h3>
              
              <div className="border border-brand-teal/15 rounded-xl overflow-hidden text-[11px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-brand-clay/30 font-display">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold text-brand-teal">Método</th>
                      <th className="px-3 py-2 text-left font-bold text-brand-teal">Ruta (Path)</th>
                      <th className="px-3 py-2 text-left font-bold text-brand-teal">Input Params</th>
                      <th className="px-3 py-2 text-left font-bold text-brand-teal">Output Response</th>
                      <th className="px-3 py-2 text-left font-bold text-brand-teal">Descripción funcional</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                    {INSTANT_API_DESIGN.map((api, i) => (
                      <tr key={i} className="hover:bg-brand-clay/10">
                        <td className="px-3 py-2.5 font-bold">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            api.method === 'GET' ? 'bg-sky-100 text-sky-800' :
                            api.method === 'POST' ? 'bg-emerald-100 text-emerald-800' :
                            api.method === 'PUT' ? 'bg-amber-100 text-amber-800' : 'bg-red-1050 text-red-800'
                          }`}>
                            {api.method}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-brand-teal text-[10px] sm:text-xs">{api.path}</td>
                        <td className="px-3 py-2.5 max-w-[120px] truncate text-[10px]" title={api.request}>{api.request}</td>
                        <td className="px-3 py-2.5 text-[10px] truncate max-w-[120px]" title={api.response}>{api.response}</td>
                        <td className="px-3 py-2.5 text-gray-600 font-sans">{api.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CASOS DE USO */}
          {activeSubTab === 'cases' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Casos de Uso Principales de NutriKids</h3>
              <div className="space-y-4">
                {CASOS_USO.map((cu) => (
                  <div key={cu.id} className="bg-brand-clay/20 p-4 rounded-xl border border-brand-teal/5 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-brand-purple text-white px-2 py-0.5 rounded font-bold">{cu.id}</span>
                      <h4 className="font-display font-extrabold text-sm text-brand-teal">{cu.title}</h4>
                    </div>
                    <div className="space-y-1 text-gray-700 font-sans">
                      <p><b>Actor Principal:</b> {cu.actor}</p>
                      <p><b>Precondición:</b> {cu.precondition}</p>
                      <div className="mt-1 bg-white p-2.5 rounded border">
                        <p className="font-semibold text-brand-teal mb-1">Flujo Principal de Eventos:</p>
                        <ol className="list-decimal pl-4 space-y-1">
                          {cu.mainFlow.map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                      </div>
                      <p className="mt-1"><b>Postcondición:</b> {cu.postcondition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HISTORIAS DE USUARIO */}
          {activeSubTab === 'stories' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Historias de Usuario (Scrum / Agile Framework)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {USER_STORIES.map((us) => (
                  <div key={us.id} className="bg-white p-4 rounded-xl border-2 border-brand-purple/20 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-brand-purple font-mono font-bold">{us.id}</span>
                      <span className="bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">Ready</span>
                    </div>
                    <h4 className="font-display font-extrabold text-brand-teal text-sm">{us.title}</h4>
                    
                    <div className="bg-brand-clay/35 p-2 rounded text-gray-700 space-y-1 font-sans">
                      <p><b>COMO</b> {us.asA}</p>
                      <p><b>QUIERO</b> {us.iWantTo}</p>
                      <p><b>PARA</b> {us.soThat}</p>
                    </div>

                    <div className="space-y-1 mt-2">
                      <span className="font-semibold text-brand-teal text-[11px] block">Criterios de Aceptación (Gherkin):</span>
                      <ul className="list-disc pl-4 space-y-1 text-gray-600 font-sans">
                        {us.acceptanceCriteria.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCT BACKLOG */}
          {activeSubTab === 'backlog' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Product Backlog de NutriKids</h3>
              
              <div className="border border-brand-teal/15 rounded-xl overflow-hidden text-xs">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-brand-clay/30 font-display">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold text-brand-teal">ID</th>
                      <th className="px-4 py-2 text-left font-bold text-brand-teal">Item de Backlog / Requisito</th>
                      <th className="px-4 py-2 text-left font-bold text-brand-teal">Módulo</th>
                      <th className="px-4 py-2 text-left font-bold text-brand-teal">Prioridad MoSCoW</th>
                      <th className="px-4 py-2 text-left font-bold text-brand-teal">Agile Story Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans text-gray-700">
                    {PRODUCT_BACKLOG.map((item) => (
                      <tr key={item.id} className="hover:bg-brand-clay/10">
                        <td className="px-4 py-2.5 font-mono font-bold text-brand-purple">{item.id}</td>
                        <td className="px-4 py-2.5 font-medium">{item.title}</td>
                        <td className="px-4 py-2.5">{item.category}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.priority === 'Must Have' ? 'bg-red-100 text-red-800' :
                            item.priority === 'Should Have' ? 'bg-amber-100 text-amber-800' :
                            item.priority === 'Could Have' ? 'bg-sky-100 text-sky-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 font-mono font-semibold text-center">{item.estimate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ROADMAP MVP */}
          {activeSubTab === 'roadmap' && (
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-brand-teal">Roadmap Estratégico de NutriKids</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
                <div className="border bg-white rounded-xl p-4 border-l-4 border-brand-orange space-y-2 shadow-sm">
                  <span className="font-mono text-brand-orange uppercase font-bold text-[10px] block">Fase 1: Preparación (Semanas 1-4)</span>
                  <h4 className="font-display font-bold text-brand-teal text-sm">Validación & Seed</h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li>Validación de las 18 recetas piloto con pediatras de Lima Metropolitana.</li>
                    <li>Maquetación responsiva móvil con diseño centrado en el usuario.</li>
                    <li>Implementación del motor local de compras sumatorias.</li>
                  </ul>
                </div>

                <div className="border bg-white rounded-xl p-4 border-l-4 border-brand-teal space-y-2 shadow-sm">
                  <span className="font-mono text-brand-teal uppercase font-bold text-[10px] block">Fase 2: Lanzamiento MVP (Semanas 5-8)</span>
                  <h4 className="font-display font-bold text-brand-teal text-sm">Go-To-Market Criollo</h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li>Integración del Supabase auth real y cobro recurrente con pasarela Culqi/Niubiz.</li>
                    <li>Cierre de convenios con médicos de familia peruanos independientes.</li>
                    <li>Habilitación del upload de recetas de la comunidad con moderación admin.</li>
                  </ul>
                </div>

                <div className="border bg-white rounded-xl p-4 border-l-4 border-brand-purple space-y-2 shadow-sm">
                  <span className="font-mono text-brand-purple uppercase font-bold text-[10px] block">Fase 3: Escalamiento (Semanas 9+)</span>
                  <h4 className="font-display font-bold text-brand-teal text-sm">Crecimiento & B2B</h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li>Activación de informes de progreso de talla/peso según MINSA peruano.</li>
                    <li>Sponsor estratégico comercial de insumos (ej: marcas de avena o quinua).</li>
                    <li>Pre-cálculo inteligente de menús nutritivos.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
