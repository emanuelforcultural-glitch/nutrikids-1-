import React, { useState, useMemo } from 'react';
import { 
  Plus, Trash2, Heart, Check, Calendar, ShoppingCart, Users, Sparkles, 
  ChevronRight, Compass, Shield, User, Apple, Star, X, Edit2, Download, RefreshCw, BookOpen
} from 'lucide-react';
import { COMPREHENSIVE_RECIPES } from './recipesData';
import StrategyHub from './components/StrategyHub';
import { 
  Receta, Nino, Familiar, MenuSemanal, MenuDia, CommunitySubmission, UserState, CategoriaReceta, DificultadReceta 
} from './types';

export default function App() {
  // Navigation: APP vs STRATEGY & METRICS HUB
  const [currentView, setCurrentView] = useState<'app' | 'strategy'>('app');

  // Interactive user state
  const [userState, setUserState] = useState<UserState>({
    isAuthenticated: true,
    email: 'mama.thiago@gmail.com',
    name: 'Camila',
    isPremium: false, // customizable dynamically via UI
    familiar: {
      name: 'Camila',
      lastname: 'Espinoza',
      email: 'mama.thiago@gmail.com'
    },
    ninos: [
      {
        id: 'nino_1',
        name: 'Thiago',
        birthdate: '2024-11-05',
        age: 1.5,
        weight: 11.2,
        height: 81.3,
        gender: 'M',
        restrictions: ['Evitar sal excesiva'],
        allergies: ['Intolerancia leve a la lactosa'],
        medicalInfo: 'Hemoglobina en evaluación pediátrica para anemia.',
        observations: 'Le encanta la sangrecita servida con papa amarilla aplastada.'
      }
    ],
    favorites: ['rec_1', 'rec_3'],
    weeklyMenu: {
      Lunes: { Almuerzo: 'rec_1' },
      Martes: { Almuerzo: 'rec_8' },
      Miercoles: {},
      Jueves: { Almuerzo: 'rec_2' },
      Viernes: {},
      Sabado: {},
      Domingo: {}
    },
    purchasedIngredients: [],
    communitySubmissions: [
      {
        id: 'sub_1',
        userEmail: 'mama.thiago@gmail.com',
        userName: 'Camila Espinoza',
        name: 'Crema andina de quinua con poro y leche',
        description: 'Una crema cremosa y muy suave que le encanta a Thiago y tiene todos los nutrientes del grano andino libre de gluten.',
        category: 'Cena',
        prepTime: '15 min',
        difficulty: 'Fácil',
        ingredients: 'Quinua lavada: 100g, Poro picado: 50g, Leche de fórmula templada: 50ml, Mantequilla sin sal: 5g',
        steps: '1. Sancochar la quinua con el poro. 2. Licuar todo junto con la leche hasta lograr una crema homogénea. 3. Servir tibio.',
        status: 'pending',
        createdAt: '2026-06-05'
      }
    ]
  });

  // Current active role simulator for review purposes
  // 'free_user' (Camila Espinoza) | 'premium_user' (Camila with multiple kids) | 'admin_user' (Can audit community recipes)
  const [activeRole, setActiveRole] = useState<'free' | 'premium' | 'admin'>('free');

  // Community recipes submitted and approved during current browser session
  const [customApprovedRecipes, setCustomApprovedRecipes] = useState<Receta[]>([]);

  // Consolidating all active recipes
  const allApprovedRecipes = useMemo(() => {
    return [...COMPREHENSIVE_RECIPES, ...customApprovedRecipes];
  }, [customApprovedRecipes]);

  // Catalog Filters
  const [selectedCategory, setSelectedCategory] = useState<CategoriaReceta | 'Todos'>('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DificultadReceta | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Receta | null>(null);

  // Forms states
  const [isAddingNino, setIsAddingNino] = useState(false);
  const [showPremiumUpsell, setShowPremiumUpsell] = useState(false);
  const [newNino, setNewNino] = useState({
    name: '',
    birthdate: '2023-01-01',
    weight: '',
    height: '',
    gender: 'M' as 'M' | 'F',
    restrictions: '',
    allergies: '',
    medicalInfo: '',
    observations: ''
  });

  // Block selected for adding a menu item
  const [activeMenuSelectBlock, setActiveMenuSelectBlock] = useState<{ day: string; meal: string } | null>(null);

  // Community recipe submission form
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [newCommunityRecipe, setNewCommunityRecipe] = useState({
    name: '',
    description: '',
    category: 'Almuerzo' as CategoriaReceta,
    prepTime: '20 min',
    difficulty: 'Fácil' as DificultadReceta,
    ingredientsText: '',
    stepsText: ''
  });

  // Rejection state for admin flow
  const [adminRejectionBlockId, setAdminRejectionBlockId] = useState<string | null>(null);
  const [adminRejectionReason, setAdminRejectionReason] = useState('');

  // States for custom shopping list items
  const [customShoppingItems, setCustomShoppingItems] = useState<{ id: string; name: string; quantity: number; unit: string; isCustom: boolean }[]>([]);
  const [isAddingCustomItem, setIsAddingCustomItem] = useState(false);
  const [newCustomItem, setNewCustomItem] = useState({
    name: '',
    quantity: '',
    unit: 'unidades'
  });

  // Action to remove a custom shopping item by name
  const removeCustomShoppingItemName = (name: string) => {
    setCustomShoppingItems(prev => prev.filter(item => item.name.toLowerCase().trim() !== name.toLowerCase().trim()));
  };

  const handleAddCustomItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomItem.name.trim() || !newCustomItem.quantity) return;

    const newItem = {
      id: 'custom_' + Date.now(),
      name: newCustomItem.name.trim(),
      quantity: parseFloat(newCustomItem.quantity) || 1,
      unit: newCustomItem.unit,
      isCustom: true
    };

    setCustomShoppingItems(prev => [...prev, newItem]);
    setIsAddingCustomItem(false);
    setNewCustomItem({
      name: '',
      quantity: '',
      unit: 'unidades'
    });
  };

  // 1. Calculate lists based on menu planning
  const shoppingList = useMemo(() => {
    const list: { id?: string; name: string; quantity: number; unit: string; isCustom?: boolean }[] = [];
    
    Object.keys(userState.weeklyMenu).forEach((dayKey) => {
      const dayMenu = userState.weeklyMenu[dayKey as keyof MenuSemanal];
      if (!dayMenu) return;

      ['Desayuno', 'Almuerzo', 'Cena'].forEach((mealType) => {
        const recipeId = dayMenu[mealType as keyof MenuDia];
        if (!recipeId) return;

        const recipe = allApprovedRecipes.find(r => r.id === recipeId);
        if (!recipe) return;

        recipe.ingredients.forEach((ing) => {
          const match = list.find(
            item => item.name.toLowerCase().trim() === ing.name.toLowerCase().trim() && 
                    item.unit.toLowerCase().trim() === ing.unit.toLowerCase().trim() &&
                    !item.isCustom
          );
          if (match) {
            match.quantity += ing.quantity;
          } else {
            list.push({ ...ing, isCustom: false });
          }
        });
      });
    });

    // Add custom shopping items
    customShoppingItems.forEach((custom) => {
      const match = list.find(
        item => item.name.toLowerCase().trim() === custom.name.toLowerCase().trim() &&
                item.unit.toLowerCase().trim() === custom.unit.toLowerCase().trim()
      );
      if (match) {
        match.quantity += custom.quantity;
        match.isCustom = true;
      } else {
        list.push({ ...custom });
      }
    });

    return list;
  }, [userState.weeklyMenu, allApprovedRecipes, customShoppingItems]);

  // Filter recipes for catalog display
  const filteredRecipes = useMemo(() => {
    return allApprovedRecipes.filter((r) => {
      if (selectedCategory !== 'Todos' && r.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'Todos' && r.difficulty !== selectedDifficulty) return false;
      if (showOnlyFavorites && !userState.favorites.includes(r.id)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(query);
        const matchesDesc = r.description.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [allApprovedRecipes, selectedCategory, selectedDifficulty, showOnlyFavorites, searchQuery, userState.favorites]);

  // Actions
  const toggleFavorite = (recipeId: string) => {
    setUserState((prev) => {
      const isFav = prev.favorites.includes(recipeId);
      const newFavs = isFav 
        ? prev.favorites.filter(id => id !== recipeId)
        : [...prev.favorites, recipeId];
      return { ...prev, favorites: newFavs };
    });
  };

  const handleCreateNino = (e: React.FormEvent) => {
    e.preventDefault();

    // Check freemium constraints: limit of 1 child for Free Tier
    const canRegister = activeRole === 'premium' || userState.ninos.length < 1;
    if (!canRegister) {
      setShowPremiumUpsell(true);
      return;
    }

    const calculatedAge = Math.max(1, Math.round(((new Date().getTime() - new Date(newNino.birthdate).getTime()) / (1000 * 60 * 60 * 24 * 365)) * 10) / 10);

    const childObj: Nino = {
      id: 'nino_' + Date.now(),
      name: newNino.name || 'Bebé',
      birthdate: newNino.birthdate,
      age: calculatedAge,
      weight: parseFloat(newNino.weight) || 12.0,
      height: parseFloat(newNino.height) || 85.0,
      gender: newNino.gender,
      restrictions: newNino.restrictions ? newNino.restrictions.split(',').map(s => s.trim()) : [],
      allergies: newNino.allergies ? newNino.allergies.split(',').map(s => s.trim()) : [],
      medicalInfo: newNino.medicalInfo,
      observations: newNino.observations
    };

    setUserState((prev) => ({
      ...prev,
      ninos: [...prev.ninos, childObj]
    }));

    setIsAddingNino(false);
    setNewNino({
      name: '',
      birthdate: '2023-01-01',
      weight: '',
      height: '',
      gender: 'M',
      restrictions: '',
      allergies: '',
      medicalInfo: '',
      observations: ''
    });
  };

  const removeNino = (id: string) => {
    setUserState(prev => ({
      ...prev,
      ninos: prev.ninos.filter(n => n.id !== id)
    }));
  };

  const assignRecipeToMenu = (recipeId: string) => {
    if (!activeMenuSelectBlock) return;
    const { day, meal } = activeMenuSelectBlock;

    setUserState((prev) => {
      const updatedMenu = { ...prev.weeklyMenu };
      const currentDayMenu = { ...(updatedMenu[day as keyof MenuSemanal] || {}) };
      currentDayMenu[meal as keyof MenuDia] = recipeId;
      updatedMenu[day as keyof MenuSemanal] = currentDayMenu;

      return {
        ...prev,
        weeklyMenu: updatedMenu
      };
    });
    setActiveMenuSelectBlock(null);
  };

  const clearMenuBlock = (day: string, meal: string) => {
    setUserState((prev) => {
      const updatedMenu = { ...prev.weeklyMenu };
      const currentDayMenu = { ...(updatedMenu[day as keyof MenuSemanal] || {}) };
      delete currentDayMenu[meal as keyof MenuDia];
      updatedMenu[day as keyof MenuSemanal] = currentDayMenu;

      return {
        ...prev,
        weeklyMenu: updatedMenu
      };
    });
  };

  const togglePurchaseIngredient = (name: string) => {
    setUserState((prev) => {
      const isPurchased = prev.purchasedIngredients.includes(name.toLowerCase());
      const newPurchased = isPurchased
        ? prev.purchasedIngredients.filter(n => n !== name.toLowerCase())
        : [...prev.purchasedIngredients, name.toLowerCase()];
      return { ...prev, purchasedIngredients: newPurchased };
    });
  };

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommunityRecipe.name || !newCommunityRecipe.ingredientsText || !newCommunityRecipe.stepsText) return;

    const submission: CommunitySubmission = {
      id: 'sub_' + Date.now(),
      userEmail: userState.email,
      userName: userState.name + ' ' + userState.familiar.lastname,
      name: newCommunityRecipe.name,
      description: newCommunityRecipe.description,
      category: newCommunityRecipe.category,
      prepTime: newCommunityRecipe.prepTime,
      difficulty: newCommunityRecipe.difficulty,
      ingredients: newCommunityRecipe.ingredientsText,
      steps: newCommunityRecipe.stepsText,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUserState(prev => ({
      ...prev,
      communitySubmissions: [...prev.communitySubmissions, submission]
    }));

    setShowCommunityForm(false);
    setNewCommunityRecipe({
      name: '',
      description: '',
      category: 'Almuerzo',
      prepTime: '20 min',
      difficulty: 'Fácil',
      ingredientsText: '',
      stepsText: ''
    });
  };

  // Administrator tools
  const adminApproveRecipe = (subId: string) => {
    const submission = userState.communitySubmissions.find(s => s.id === subId);
    if (!submission) return;

    // Convert raw ingredients into structured object array for the recipe model parser
    const ingredientLines = submission.ingredients.split('\n').filter(l => l.trim().length > 0);
    const structuredIngs = ingredientLines.map((line, i) => {
      // Basic split trying to get numbers
      const parts = line.split(':');
      const ingName = parts[0] ? parts[0].trim() : 'Insumo local';
      const detail = parts[1] ? parts[1].trim() : '50g';
      
      // Parse basic quant
      const numericMatch = detail.match(/(\d+(\.\d+)?)/);
      const quant = numericMatch ? parseFloat(numericMatch[0]) : 50;
      const unit = detail.replace(/(\d+(\.\d+)?)/, '').trim() || 'g';

      return { name: ingName, quantity: quant, unit };
    });

    const parsedRecipe: Receta = {
      id: 'rec_comm_' + Date.now(),
      name: submission.name,
      description: submission.description || 'Sugerido por un padre de comida sana.',
      category: submission.category,
      prepTime: submission.prepTime,
      difficulty: submission.difficulty,
      ingredients: structuredIngs,
      steps: submission.steps.split('\n').filter(s => s.trim().length > 0),
      nutrition: { calories: 140, protein: '6g', carbs: '15g', fat: '3g', iron: '1.5mg' },
      edadRecomendada: '1-6 años',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
      isVerified: true
    };

    // Update submission status
    setUserState(prev => ({
      ...prev,
      communitySubmissions: prev.communitySubmissions.map(s => 
        s.id === subId ? { ...s, status: 'approved' } : s
      )
    }));

    // Add to approved catalog list in active memory
    setCustomApprovedRecipes(prev => [...prev, parsedRecipe]);
  };

  const adminRejectRecipe = (subId: string) => {
    if (!adminRejectionReason.trim()) return;

    setUserState(prev => ({
      ...prev,
      communitySubmissions: prev.communitySubmissions.map(s => 
        s.id === subId ? { ...s, status: 'rejected', rejectionReason: adminRejectionReason } : s
      )
    }));

    setAdminRejectionBlockId(null);
    setAdminRejectionReason('');
  };

  return (
    <div className="min-h-screen bg-brand-cream text-[#2D2926] flex flex-col antialiased">
      {/* SaaS Mode Switch and Quick Roles Bar */}
      <div className="bg-[#5A7D5A] text-white text-xs px-4 py-2.5 flex flex-wrap justify-between items-center gap-3 border-b border-brand-green/20 font-sans">
        <div className="flex items-center gap-3">
          <span className="font-sans font-bold flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-brand-yellow animate-pulse" />
            NutriKids Startup Sandbox
          </span>
          <span className="text-[10px] bg-white/10 text-white/95 px-2 py-0.5 rounded-full font-mono">
            Mercado: Perú 🇵🇪
          </span>
        </div>

        {/* Roles Simulator Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/80">Probar perfil del MVP:</span>
          <div className="flex bg-white/15 rounded-full p-0.5 border border-white/20">
            <button
              onClick={() => {
                setActiveRole('free');
                setUserState(prev => ({ ...prev, isPremium: false }));
              }}
              className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold cursor-pointer transition-all ${
                activeRole === 'free' ? 'bg-[#E89B6A] text-white shadow-sm' : 'hover:bg-white/5 text-white/85'
              }`}
            >
              Gratuito (1 Bebé)
            </button>
            <button
              onClick={() => {
                setActiveRole('premium');
                setUserState(prev => ({ ...prev, isPremium: true }));
              }}
              className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold cursor-pointer transition-all ${
                activeRole === 'premium' ? 'bg-[#E89B6A] text-white shadow-sm' : 'hover:bg-white/5 text-white/85'
              }`}
            >
              👑 Premium (Multi-hijo)
            </button>
            <button
              onClick={() => {
                setActiveRole('admin');
              }}
              className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold cursor-pointer transition-all ${
                activeRole === 'admin' ? 'bg-purple-600 text-white shadow-sm' : 'hover:bg-white/5 text-white/85'
              }`}
            >
              🛠️ Administrador
            </button>
          </div>
        </div>
      </div>

      {/* Main SaaS Brand Header */}
      <header className="bg-white border-b border-[#F0EDE5] py-4 px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#7DA67D] rounded-xl flex items-center justify-center text-white font-bold text-xl font-serif italic">
              NK
            </div>
            <div>
              <h1 className="font-serif font-bold italic text-2xl text-[#5A7D5A] leading-tight">
                NutriKids
              </h1>
              <span className="text-[10px] uppercase tracking-widest text-[#E89B6A] font-bold font-sans block leading-none mt-0.5">
                Alimentación Infantil Inteligente
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('app')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans font-bold text-xs border transition-all cursor-pointer ${
                currentView === 'app'
                  ? 'bg-[#7DA67D] text-white border-[#7DA67D] shadow-sm'
                  : 'bg-white text-[#7DA67D] border-[#E5E1D8] hover:bg-[#F9F7F2]'
              }`}
            >
              <Compass className="h-4 w-4" />
              Ver Prototipo App
            </button>
            <button
              onClick={() => setCurrentView('strategy')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans font-bold text-xs border transition-all cursor-pointer ${
                currentView === 'strategy'
                  ? 'bg-[#E89B6A] text-white border-[#E89B6A] shadow-sm'
                  : 'bg-white text-[#E89B6A] border-[#E5E1D8] hover:bg-[#F9F7F2]'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Estrategia & Scrum Hub (17 Entregables)
            </button>
          </div>
        </div>
      </header>

      {/* Primary view content orchestrator */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {currentView === 'strategy' ? (
          <StrategyHub />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Profiles, Family and Interactive Custom Community Submission (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile card of parent */}
              <div className="bg-white rounded-[32px] p-5 border border-[#F0EDE5] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-[#F5F2EB]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#A09B8E] mb-0.5 font-bold">Perfil Familiar</p>
                    <h3 className="text-xl font-serif italic text-[#5A7D5A]">Familia {userState.familiar.lastname}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                    userState.isPremium ? 'bg-[#7DA67D]/10 text-[#5A7D5A]' : 'bg-[#F5F2EB] text-[#7C776D]'
                  }`}>
                    {userState.isPremium ? 'Plan Premium' : 'Plan Gratuito'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#F5F2EB] pb-1">
                    <span className="text-[#7C776D]">Madre / Tutor</span>
                    <span className="font-semibold text-gray-800">{userState.familiar.name} {userState.familiar.lastname}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F5F2EB] pb-1">
                    <span className="text-[#7C776D]">Email Principal</span>
                    <span className="font-semibold text-gray-800 truncate max-w-[150px]" title={userState.familiar.email}>{userState.familiar.email}</span>
                  </div>
                </div>

                {!userState.isPremium && (
                  <div className="bg-[#E89B6A]/10 border border-[#E89B6A]/20 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[10px] text-gray-650 leading-relaxed font-sans">
                      Estás en plan gratuito. Solo puedes planificar para 1 niño peruano. Actualiza a premium para múltiples perfiles.
                    </p>
                    <button 
                      onClick={() => {
                        setUserState(p => ({ ...p, isPremium: true }));
                        setActiveRole('premium');
                      }}
                      className="bg-[#E89B6A] hover:bg-[#d48956] text-white text-[9px] px-3 py-2 rounded-full font-bold cursor-pointer transition-colors shrink-0"
                    >
                      Actualizar
                    </button>
                  </div>
                )}
              </div>

              {/* Niño / Baby lists */}
              <div className="bg-white rounded-[32px] p-5 border border-[#F0EDE5] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-[#F5F2EB]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#A09B8E] mb-0.5 font-bold">Pacientes del Hogar</p>
                    <h3 className="text-xl font-serif italic text-[#5A7D5A]">Mis Niños (1-6 años)</h3>
                  </div>
                  <span className="bg-[#7DA67D]/15 text-[#5A7D5A] px-3 py-1 rounded-full text-[10px] font-mono font-bold">
                    Reg: {userState.ninos.length}
                  </span>
                </div>

                {/* Display kids */}
                {userState.ninos.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center font-sans">No tienes niños registrados. Agrega uno abajo.</p>
                ) : (
                  <div className="space-y-3">
                    {userState.ninos.map((nino) => (
                      <div key={nino.id} className="bg-[#F9F7F2] p-4 rounded-[24px] border border-[#F0EDE5] relative space-y-2">
                        <button
                          onClick={() => removeNino(nino.id)}
                          className="absolute top-4 right-4 text-red-400 hover:text-red-600 cursor-pointer transition-colors"
                          title="Eliminar perfil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E89B6A]"></span>
                          <span className="font-serif italic font-bold text-base text-[#2D2926]">{nino.name}</span>
                          <span className="text-[10px] bg-[#7DA67D]/10 text-[#5A7D5A] px-2 py-0.5 rounded font-semibold capitalize">
                            {nino.gender === 'M' ? 'Bebé' : 'Bebita'} • {nino.age} años
                          </span>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between border-b border-[#E5E1D8]/40 pb-0.5">
                            <span className="text-[#7C776D] text-[11px]">Peso</span>
                            <span className="font-semibold text-gray-800">{nino.weight} kg</span>
                          </div>
                          <div className="flex justify-between border-b border-[#E5E1D8]/40 pb-0.5">
                            <span className="text-[#7C776D] text-[11px]">Talla</span>
                            <span className="font-semibold text-gray-800">{nino.height} cm</span>
                          </div>
                          {nino.allergies.length > 0 && (
                            <div className="flex justify-between border-b border-[#E5E1D8]/40 pb-0.5">
                              <span className="text-[#7C776D] text-[11px]">Alergias</span>
                              <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{nino.allergies.join(', ')}</span>
                            </div>
                          )}
                          {nino.restrictions.length > 0 && (
                            <div className="flex justify-between border-b border-[#E5E1D8]/40 pb-0.5">
                              <span className="text-[#7C776D] text-[11px]">Restricciones</span>
                              <span className="bg-[#E89B6A]/10 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{nino.restrictions.join(', ')}</span>
                            </div>
                          )}
                        </div>

                        {nino.observations && (
                          <p className="text-[10px] italic text-[#7C776D] font-sans border-t border-[#E5E1D8]/40 pt-1.5 mt-2">
                            "{nino.observations}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Form trigger / fields */}
                {isAddingNino ? (
                  <form onSubmit={handleCreateNino} className="bg-brand-clay/30 p-4 rounded-2xl border-2 border-brand-teal/10 space-y-3">
                    <h4 className="text-xs font-display font-extrabold text-brand-teal">Registrar Nuevo Bebé</h4>
                    
                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block mb-1 font-semibold">Nombre:</label>
                        <input
                          type="text"
                          required
                          placeholder="Nombre del niño/a"
                          value={newNino.name}
                          onChange={e => setNewNino(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full p-2 bg-white rounded-xl border border-brand-teal/15 focus:outline-none focus:ring-1 focus:ring-brand-orange"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block mb-1 font-semibold">Edad aprox (Nacimiento):</label>
                          <input
                            type="date"
                            required
                            value={newNino.birthdate}
                            onChange={e => setNewNino(prev => ({ ...prev, birthdate: e.target.value }))}
                            className="w-full p-2 bg-white rounded-xl border border-brand-teal/15 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-semibold">Sexo:</label>
                          <select
                            value={newNino.gender}
                            onChange={e => setNewNino(prev => ({ ...prev, gender: e.target.value as any }))}
                            className="w-full p-2 bg-white rounded-xl border border-brand-teal/15 focus:outline-none"
                          >
                            <option value="M">Masculino (M)</option>
                            <option value="F">Femenino (F)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block mb-1 font-semibold">Peso (kg):</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            placeholder="Ej: 14.5"
                            value={newNino.weight}
                            onChange={e => setNewNino(prev => ({ ...prev, weight: e.target.value }))}
                            className="w-full p-2 bg-white rounded-xl border border-brand-teal/15 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-semibold">Talla (cm):</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            placeholder="Ej: 92.5"
                            value={newNino.height}
                            onChange={e => setNewNino(prev => ({ ...prev, height: e.target.value }))}
                            className="w-full p-2 bg-white rounded-xl border border-brand-teal/15 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1 font-semibold">Alergias (separadas por comas o vacío):</label>
                        <input
                          type="text"
                          placeholder="Ej: Lactosa, Maní"
                          value={newNino.allergies}
                          onChange={e => setNewNino(prev => ({ ...prev, allergies: e.target.value }))}
                          className="w-full p-2 bg-white rounded-xl border border-brand-teal/15 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 font-semibold">Observaciones / Datos médicos:</label>
                        <textarea
                          placeholder="Alguna preferencia o indicación del pediatra peruano..."
                          value={newNino.observations}
                          onChange={e => setNewNino(prev => ({ ...prev, observations: e.target.value }))}
                          className="w-full p-2 bg-white rounded-xl border border-brand-teal/15 focus:outline-none h-14"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setIsAddingNino(false)}
                        className="px-3 py-1.5 border rounded-xl hover:bg-brand-clay cursor-pointer font-bold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl font-bold cursor-pointer"
                      >
                        Guardar Perfil
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      if (!userState.isPremium && userState.ninos.length >= 1) {
                        setShowPremiumUpsell(true);
                      } else {
                        setIsAddingNino(true);
                      }
                    }}
                    className="w-full py-2 bg-brand-teal/5 hover:bg-brand-teal/10 text-brand-teal rounded-2xl border-2 border-dashed border-brand-teal/20 text-xs font-display font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    Registrar Niño / Bebé
                  </button>
                )}
              </div>

              {/* Upselling warning overlay fallback card */}
              {showPremiumUpsell && (
                <div className="bg-brand-orange/10 border-2 border-brand-orange rounded-3xl p-4 text-xs space-y-3">
                  <div className="flex items-center gap-2 text-brand-orange font-bold font-display">
                    <Star className="fill-brand-orange h-5 w-5" />
                    <span>Límite de Plan Gratuito Superado</span>
                  </div>
                  <p className="font-sans leading-relaxed">
                    El Plan Gratuito solo autoriza la persistencia de 1 perfil infantil. Para monitorear una familia multi-niño, registrar peso, talla e índices específicos, accede a **NutriKids Premium** (S/. 19.90 mensual).
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setUserState(p => ({ ...p, isPremium: true }));
                        setActiveRole('premium');
                        setShowPremiumUpsell(false);
                      }}
                      className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold p-2 px-3 rounded-xl cursor-pointer"
                    >
                      👑 Activar Beneficio Premium
                    </button>
                    <button
                      onClick={() => setShowPremiumUpsell(false)}
                      className="border border-brand-orange text-brand-orange font-bold p-2 px-3 rounded-xl cursor-pointer bg-white"
                    >
                      Luego
                    </button>
                  </div>
                </div>
              )}

              {/* Auto Shopping List (Consolidated values) */}
              <div className="bg-[#E89B6A] rounded-[32px] p-5 shadow-sm text-white flex flex-col space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/80 mb-0.5 font-bold">Carrito Automático</p>
                    <h3 className="text-xl font-serif italic text-white">Lista de Compras</h3>
                  </div>
                  <span className="bg-white/25 text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                    {shoppingList.length} Items
                  </span>
                </div>

                <p className="text-[10px] text-white/90 font-sans leading-tight">
                  Suma cuantitativa y unificación automática en base al Menú Semanal y agregados manuales. Listo para el mercado.
                </p>

                {shoppingList.length === 0 ? (
                  <div className="py-6 text-center text-xs text-white/70 italic font-sans">
                    Planifica recetas o presiona el botón de abajo para agregar alimentos manualmente.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
                    {/* Sort pending items at the top and checked at the bottom */}
                    {shoppingList
                      .sort((a, b) => {
                        const aChecked = userState.purchasedIngredients.includes(a.name.toLowerCase()) ? 1 : 0;
                        const bChecked = userState.purchasedIngredients.includes(b.name.toLowerCase()) ? 1 : 0;
                        return aChecked - bChecked;
                      })
                      .map((ing, i) => {
                        const isChecked = userState.purchasedIngredients.includes(ing.name.toLowerCase());
                        return (
                          <div
                            key={i}
                            onClick={() => togglePurchaseIngredient(ing.name)}
                            className={`flex items-center justify-between p-2.5 rounded-2xl text-xs transition-all cursor-pointer border ${
                              isChecked
                                ? 'bg-black/10 text-white/50 border-transparent line-through'
                                : 'bg-white/10 text-white border-white/10 hover:bg-white/15'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                              <span className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                                isChecked ? 'bg-white border-white text-[#E89B6A]' : 'border-white/40 bg-transparent'
                              }`}>
                                {isChecked ? (
                                  <Check className="h-3 w-3 inline text-[#E89B6A]" />
                                ) : (
                                  <div className="w-1.5 h-1.5 bg-transparent rounded-sm"></div>
                                )}
                              </span>
                              <span className="font-semibold font-sans truncate">{ing.name}</span>
                              {ing.isCustom && (
                                <span className="text-[8px] bg-white/20 text-white/90 px-1 rounded uppercase tracking-wider font-bold text-center shrink-0">
                                  Manual
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`font-mono font-bold bg-white/20 px-2 py-0.5 rounded border border-white/10 text-[10px] text-right ${isChecked ? 'text-white/55' : 'text-white'}`}>
                                {ing.quantity} {ing.unit}
                              </span>
                              {ing.isCustom && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeCustomShoppingItemName(ing.name);
                                  }}
                                  className="text-white/60 hover:text-white hover:bg-black/20 p-1 rounded transition-all cursor-pointer"
                                  title="Eliminar este alimento agregado manualmente"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Inline form to add generic food products manually */}
                <div className="border-t border-white/10 pt-3 mt-1">
                  {isAddingCustomItem ? (
                    <form onSubmit={handleAddCustomItemSubmit} className="space-y-2 bg-black/10 p-3 rounded-2xl border border-white/10">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-white/80">Nuevo Item de Compra</p>
                      <div className="space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Nombre del alimento (ej: Huevos cordilleranos)"
                          value={newCustomItem.name}
                          onChange={e => setNewCustomItem(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full text-xs bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/60 p-2 rounded-xl border border-white/15 focus:outline-none focus:border-white/30"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            step="any"
                            required
                            placeholder="Cantidad (ej: 12)"
                            value={newCustomItem.quantity}
                            onChange={e => setNewCustomItem(prev => ({ ...prev, quantity: e.target.value }))}
                            className="text-xs bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/60 p-2 rounded-xl border border-white/15 focus:outline-none focus:border-white/30"
                          />
                          <select
                            value={newCustomItem.unit}
                            onChange={e => setNewCustomItem(prev => ({ ...prev, unit: e.target.value }))}
                            className="text-xs bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white p-2 rounded-xl border border-white/15 focus:outline-none"
                          >
                            <option value="unidades" className="text-gray-800">unidades</option>
                            <option value="g" className="text-gray-800">g (Gramos)</option>
                            <option value="kg" className="text-gray-800">kg (Kilos)</option>
                            <option value="tazas" className="text-gray-800">tazas</option>
                            <option value="cucharadas" className="text-gray-800">cucharadas</option>
                            <option value="ml" className="text-gray-800">ml</option>
                            <option value="litros" className="text-gray-800">litros</option>
                            <option value="paquetes" className="text-gray-800">paquetes</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-grow py-1.5 bg-white text-[#E89B6A] font-sans font-bold text-xs rounded-xl hover:bg-white/95 transition-all text-center cursor-pointer"
                        >
                          Agregar Insumo
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingCustomItem(false)}
                          className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white transition-all rounded-xl cursor-pointer text-xs font-medium"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsAddingCustomItem(true)}
                      className="w-full py-2 bg-white/15 hover:bg-white/20 active:bg-white/25 text-white font-sans font-bold text-xs rounded-full flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar Alimento / Cantidad
                    </button>
                  )}
                </div>
              </div>

              {/* Submit to community flow Card */}
              <div className="bg-white rounded-[32px] border border-[#F0EDE5] p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-[#F5F2EB]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#A09B8E] mb-0.5 font-bold">Comunidad Activa</p>
                    <h3 className="text-xl font-serif italic text-brand-purple">Compartir Receta</h3>
                  </div>
                  <span className="text-[9px] font-bold text-brand-purple uppercase bg-[#8B5CF6]/10 text-brand-purple px-2.5 py-1 rounded-full">
                    Sugerir
                  </span>
                </div>

                <p className="text-[11px] text-[#7C776D] font-sans leading-relaxed">
                  ¿Tienes una receta andina favorita de tu familia? Envíala para que el nutricionista principal la evalúe administrativamente y la publique.
                </p>

                {showCommunityForm ? (
                  <form onSubmit={handleCommunitySubmit} className="bg-white p-4 rounded-2xl border border-brand-purple/15 space-y-3">
                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block mb-0.5 font-semibold text-gray-700">Nombre de Receta sugerida:</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Mazamorra de sémola y manzana"
                          value={newCommunityRecipe.name}
                          onChange={e => setNewCommunityRecipe(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full p-2 bg-brand-cream/30 rounded-xl border border-brand-purple/10 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block mb-0.5 font-semibold text-gray-700">Descripción breve:</label>
                        <input
                          type="text"
                          placeholder="Ej: Una copla suave para el resfrío dulce."
                          value={newCommunityRecipe.description}
                          onChange={e => setNewCommunityRecipe(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full p-2 bg-brand-cream/30 rounded-xl border border-brand-purple/10 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block mb-0.5 font-semibold text-gray-700">Categoría:</label>
                          <select
                            value={newCommunityRecipe.category}
                            onChange={e => setNewCommunityRecipe(prev => ({ ...prev, category: e.target.value as any }))}
                            className="w-full p-2 bg-brand-cream/30 rounded-xl border border-brand-purple/10 focus:outline-none"
                          >
                            <option value="Desayuno">Desayuno</option>
                            <option value="Almuerzo">Almuerzo</option>
                            <option value="Cena">Cena</option>
                            <option value="Snacks">Snacks</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-0.5 font-semibold text-gray-700">Tiempo Prep:</label>
                          <input
                            type="text"
                            value={newCommunityRecipe.prepTime}
                            onChange={e => setNewCommunityRecipe(prev => ({ ...prev, prepTime: e.target.value }))}
                            className="w-full p-2 bg-brand-cream/30 rounded-xl border border-brand-purple/10 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-0.5 font-semibold text-gray-700">Ingredientes de mercado (un formato por línea):</label>
                        <textarea
                          required
                          placeholder="Ej:&#10;Sangrecita de pollo: 100g&#10;Papa blanca: 1 unid"
                          value={newCommunityRecipe.ingredientsText}
                          onChange={e => setNewCommunityRecipe(prev => ({ ...prev, ingredientsText: e.target.value }))}
                          className="w-full p-2 bg-brand-cream/30 rounded-xl border border-brand-purple/10 focus:outline-none font-mono h-20"
                        />
                      </div>
                      <div>
                        <label className="block mb-0.5 font-semibold text-gray-700">Instrucciones de Cocción:</label>
                        <textarea
                          required
                          placeholder="Procedimiento de preparación..."
                          value={newCommunityRecipe.stepsText}
                          onChange={e => setNewCommunityRecipe(prev => ({ ...prev, stepsText: e.target.value }))}
                          className="w-full p-2 bg-brand-cream/30 rounded-xl border border-brand-purple/10 focus:outline-none h-16"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end text-xs pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCommunityForm(false)}
                        className="px-3 py-1.5 border hover:bg-brand-clay rounded-xl font-bold cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-brand-purple text-white hover:bg-brand-purple/90 rounded-xl font-bold cursor-pointer"
                      >
                        Enviar Receta
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowCommunityForm(true)}
                    className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-[#8B5CF6] font-sans font-bold text-xs rounded-full flex items-center justify-center gap-1.5 border border-[#8B5CF6]/20 cursor-pointer transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Compartir una Receta Familiar
                  </button>
                )}

                {/* Submissions tracking feedback list */}
                {userState.communitySubmissions.length > 0 && (
                  <div className="space-y-2 border-t pt-3 mt-2">
                    <span className="text-[10px] font-bold text-gray-500 block">Mis sugerencias enviadas:</span>
                    {userState.communitySubmissions.map((sub) => (
                      <div key={sub.id} className="bg-white p-2.5 rounded-xl border text-[10px] space-y-1">
                        <div className="flex items-center justify-between">
                          <b className="truncate max-w-[150px] text-brand-teal">{sub.name}</b>
                          <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[8px] ${
                            sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                            sub.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {sub.status === 'approved' ? 'Aprobada' : sub.status === 'rejected' ? 'Declinada' : 'Pendiente'}
                          </span>
                        </div>
                        {sub.rejectionReason && (
                          <p className="text-red-700 bg-red-50 p-1.5 rounded text-[9px] font-sans">
                            <b>Motivo del rechazo administrativo:</b> {sub.rejectionReason}
                          </p>
                        )}
                        <span className="text-gray-400 text-[8px] block font-mono">{sub.createdAt} • Categoría: {sub.category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Interactive 3-Meal Planner Grid AND verified catalog (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Special Admin Review Row displayed ONLY if active role is admin */}
              {activeRole === 'admin' && (
                <div className="bg-brand-purple/10 border-3 border-brand-purple rounded-3xl p-5 space-y-4 shadow-sm animate-fade-in animate-duration-300">
                  <div className="flex items-center gap-2">
                    <Shield className="text-brand-purple h-6 w-6" />
                    <div>
                      <h3 className="font-display font-extrabold text-brand-teal text-base">Panel de Auditoría Administrativa</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Eres administrador temporal de NutriKids. Modera las recetas de la comunidad.</p>
                    </div>
                  </div>

                  {userState.communitySubmissions.filter(s => s.status === 'pending').length === 0 ? (
                    <div className="bg-white p-4 rounded-2xl text-center text-xs text-gray-500 border border-brand-purple/20">
                      🎉 Cero solicitudes de recetas pendientes en cola administrativa. ¡Excelente trabajo de revisión!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userState.communitySubmissions
                        .filter(s => s.status === 'pending')
                        .map((sub) => (
                          <div key={sub.id} className="bg-white p-4 rounded-2xl border border-brand-purple/20 space-y-2 text-xs shadow-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-display font-bold text-brand-teal text-[13px]">{sub.name}</h4>
                                <span className="text-[10px] text-brand-purple font-mono">Enviador: {sub.userName} ({sub.userEmail})</span>
                              </div>
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Pendiente</span>
                            </div>
                            <p className="text-gray-600 italic">"{sub.description}"</p>
                            
                            <div className="bg-brand-clay/35 p-3 rounded-xl space-y-1.5 font-mono text-[10px] text-gray-700">
                              <p><b>Categoría priorizada:</b> {sub.category} | <b>Tiempo:</b> {sub.prepTime} | <b>Habilidad:</b> {sub.difficulty}</p>
                              <div>
                                <b>Ingredientes:</b>
                                <pre className="whitespace-pre-wrap mt-0.5 text-gray-600 font-sans">{sub.ingredients}</pre>
                              </div>
                              <div>
                                <b>Pasos:</b>
                                <pre className="whitespace-pre-wrap mt-0.5 text-gray-600 font-sans">{sub.steps}</pre>
                              </div>
                            </div>

                            {/* Action controllers */}
                            {adminRejectionBlockId === sub.id ? (
                              <div className="bg-red-50 p-3 rounded-xl border border-red-200 mt-2 space-y-2">
                                <label className="block text-[10px] font-bold text-red-800 uppercase">Motivo del rechazo pediátrico:</label>
                                <input
                                  type="text"
                                  placeholder="Ej: Contiene demasiada azúcar/sal añadida no apta para menores."
                                  value={adminRejectionReason}
                                  onChange={e => setAdminRejectionReason(e.target.value)}
                                  className="w-full bg-white p-2 rounded-lg border border-red-300 focus:outline-none text-xs"
                                />
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => setAdminRejectionBlockId(null)}
                                    className="p-1 px-3 border rounded-lg bg-white hover:bg-gray-100 text-[10px] font-bold cursor-pointer"
                                  >
                                    Volver
                                  </button>
                                  <button
                                    onClick={() => adminRejectRecipe(sub.id)}
                                    className="p-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                                  >
                                    Denegar publicación
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex gap-2 justify-end pt-2 border-t">
                                <button
                                  onClick={() => setAdminRejectionBlockId(sub.id)}
                                  className="p-1 px-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-[10px] font-bold cursor-pointer transition-colors"
                                >
                                  Rechazar
                                </button>
                                <button
                                  onClick={() => adminApproveRecipe(sub.id)}
                                  className="p-1 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                                >
                                  <Check className="h-3 w-3" />
                                  Aprobar & Publicar Pediátrico
                                </button>
                              </div>
                            )}
                          </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Weekly Menu Interactive GRID */}
              <div className="bg-white rounded-[32px] border border-[#F0EDE5] p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-[#F5F2EB]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#A09B8E] mb-0.5 font-bold">Distribución Dietaria</p>
                    <h3 className="text-xl font-serif italic text-[#5A7D5A]">Menú Planificado de la Semana</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setUserState(p => ({
                          ...p,
                          weeklyMenu: { Lunes: {}, Martes: {}, Miercoles: {}, Jueves: {}, Viernes: {}, Sabado: {}, Domingo: {} },
                          purchasedIngredients: []
                        }));
                      }}
                      className="text-xs bg-[#F5F2EB] hover:bg-[#E5E1D8] text-[#5A7D5A] px-4 py-2 rounded-full font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Limpiar Todo
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#7C776D] font-sans leading-tight mt-1">
                  Distribuye desayunos, almuerzos cocinados y cenas suaves de forma interactiva para ordenar las compras del fin de semana.
                </p>

                {/* Mobile horizontal layout scroll or responsive grid */}
                <div className="overflow-x-auto pb-2">
                  <div className="min-w-[800px] grid grid-cols-7 gap-3">
                    {/* Columns headers: Lunes to Domingo */}
                    {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map((day) => {
                      const dayMenu = userState.weeklyMenu[day as keyof MenuSemanal] || {};
                      
                      return (
                        <div key={day} className="bg-[#F9F7F2] rounded-[24px] p-2.5 border border-[#F0EDE5] flex flex-col space-y-3 min-h-[300px]">
                          <span className="text-center text-[10px] uppercase tracking-wider font-bold text-[#A09B8E] py-1 bg-white rounded-lg shadow-sm border border-[#E5E1D8]/40 block leading-none">
                            {day}
                          </span>

                          {/* 3 Blocks of Meals */}
                          {['Desayuno', 'Almuerzo', 'Cena'].map((meal) => {
                            const recipeId = dayMenu[meal as keyof MenuDia];
                            const assignedRecipe = allApprovedRecipes.find(r => r.id === recipeId);

                            return (
                              <div key={meal} className="flex-1 bg-white rounded-xl p-2.5 border border-[#F5F2EB] shadow-sm flex flex-col justify-between space-y-2 min-h-[90px]">
                                <div className="flex justify-between items-center border-b pb-1 border-[#F5F2EB]">
                                  <span className="text-[8px] font-bold text-[#A09B8E] uppercase tracking-wider">{meal}</span>
                                  {assignedRecipe && (
                                    <button
                                      onClick={() => clearMenuBlock(day, meal)}
                                      className="text-gray-350 hover:text-red-600 transition-colors cursor-pointer"
                                      title="Descartar"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>

                                {assignedRecipe ? (
                                  <div className="space-y-1">
                                    <h4 
                                      onClick={() => setSelectedRecipeDetail(assignedRecipe)}
                                      className="font-serif italic font-bold text-[11px] text-[#2D2926] hover:text-[#5A7D5A] cursor-pointer line-clamp-2 leading-tight"
                                      title="Click para ver ingredientes"
                                    >
                                      {assignedRecipe.name}
                                    </h4>
                                    <div className="text-[8px] text-[#7C776D] font-mono flex flex-wrap justify-between">
                                      <span>⏱️ {assignedRecipe.prepTime}</span>
                                      <span className="text-[#E89B6A] font-bold">Fe: {assignedRecipe.nutrition.iron.split(' ')[0]}</span>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setActiveMenuSelectBlock({ day, meal })}
                                    className="w-full flex-1 flex flex-col items-center justify-center gap-1 border border-dashed border-[#DEDACF] hover:bg-[#7DA67D]/10 bg-[#F9F7F2] hover:border-[#7DA67D] rounded-xl text-[#7C776D] hover:text-[#5A7D5A] transition-all py-3 cursor-pointer"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span className="text-[9px] font-sans font-bold">Sumar</span>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Inline Meal Selection Dialog opened only if block is active */}
                {activeMenuSelectBlock && (
                  <div className="bg-brand-orange/5 border-2 border-brand-orange/30 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <b className="text-xs text-brand-teal font-display block">
                        Selecciona un alimento para {activeMenuSelectBlock.meal} - {activeMenuSelectBlock.day}:
                      </b>
                      <button
                        onClick={() => setActiveMenuSelectBlock(null)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer text-xs flex items-center gap-1 font-bold"
                      >
                        <X className="h-4 w-4" />
                        Cerrar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[160px] overflow-y-auto pr-1">
                      {allApprovedRecipes
                        .filter(r => r.category === activeMenuSelectBlock.meal)
                        .map(r => (
                          <button
                            key={r.id}
                            onClick={() => assignRecipeToMenu(r.id)}
                            className="text-left p-2 rounded-xl text-[11px] font-sans border bg-white hover:border-brand-orange hover:shadow-sm cursor-pointer transition-all flex items-center gap-2"
                          >
                            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                            <div className="truncate flex-1">
                              <p className="font-bold truncate text-brand-teal">{r.name}</p>
                              <p className="text-[9px] text-gray-500 font-mono">Dificultad: {r.difficulty}</p>
                            </div>
                          </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 18 Verified Recipes & Submissions catalog */}
              <div className="bg-white rounded-[32px] border border-[#F0EDE5] p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-[#F5F2EB]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#A09B8E] mb-0.5 font-bold">Guía Gastronómica Peruana</p>
                    <h3 className="text-xl font-serif italic text-[#5A7D5A]">Recetas Pediátricas Verificadas</h3>
                    <p className="text-xs text-[#7C776D] font-sans mt-0.5">Catálogo con raciones y texturas calculadas para menores de 6 años.</p>
                  </div>

                  <span className="bg-[#7DA67D]/15 text-[#5A7D5A] px-3 py-1 rounded-full text-xs font-mono font-bold self-start uppercase">
                    Mostrando: {filteredRecipes.length} de {allApprovedRecipes.length}
                  </span>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3 bg-[#F9F7F2] border border-[#F0EDE5] p-3 rounded-[24px]">
                  
                  {/* Category Pill select */}
                  <div className="flex flex-wrap gap-1.5">
                    {['Todos', 'Desayuno', 'Almuerzo', 'Cena', 'Snacks'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#5A7D5A] text-white shadow-sm'
                            : 'bg-white text-[#7C776D] hover:bg-[#F5F2EB] border border-[#E5E1D8]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Difficulty Filter */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-gray-500 font-medium">Habilidad:</span>
                    <select
                      value={selectedDifficulty}
                      onChange={e => setSelectedDifficulty(e.target.value as any)}
                      className="p-1 px-2 rounded-xl bg-white border border-brand-teal/10 focus:outline-none"
                    >
                      <option value="Todos">Todos</option>
                      <option value="Fácil">Fácil</option>
                      <option value="Medio">Medio</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>

                  {/* Favorites Toggle */}
                  <button
                    onClick={() => setShowOnlyFavorites(p => !p)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all ${
                      showOnlyFavorites 
                        ? 'bg-red-500 text-white shadow-sm' 
                        : 'bg-white text-gray-600 border border-brand-teal/10 hover:bg-brand-clay'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${showOnlyFavorites ? 'fill-white' : 'text-red-500'}`} />
                    Favoritos ({userState.favorites.length})
                  </button>

                  {/* Search input bar */}
                  <div className="flex-1 min-w-[150px]">
                    <input
                      type="text"
                      placeholder="🔎 Buscar ingrediente o plato (sangrecita, quinua...)"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-white p-1.5 px-3 rounded-xl border border-brand-teal/10 text-xs focus:ring-1 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                </div>

                {/* Grid catalogue items */}
                {filteredRecipes.length === 0 ? (
                  <div className="py-12 bg-brand-clay/10 rounded-2xl text-center text-xs text-gray-500 flex flex-col items-center justify-center gap-2">
                    <span>No encontramos recetas que coincidan con tus filtros.</span>
                    <button
                      onClick={() => {
                        setSelectedCategory('Todos');
                        setSelectedDifficulty('Todos');
                        setSearchQuery('');
                        setShowOnlyFavorites(false);
                      }}
                      className="text-brand-orange hover:underline font-bold cursor-pointer"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredRecipes.map((recipe) => {
                      const isFavorited = userState.favorites.includes(recipe.id);
                      return (
                        <div key={recipe.id} className="bg-white rounded-[24px] border border-[#F0EDE5] overflow-hidden hover:border-[#7DA67D]/40 hover:shadow-md transition-all flex flex-col justify-between">
                          
                          {/* Image and categories pill */}
                          <div className="relative h-28 w-full bg-[#F5F2EB]">
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Category Badge tag */}
                            <span className="absolute top-2 left-2 bg-[#5A7D5A] text-white font-sans text-[9px] font-bold px-2 py-0.5 rounded shadow">
                              {recipe.category}
                            </span>
 
                            {/* Fav icon button */}
                            <button
                              onClick={() => toggleFavorite(recipe.id)}
                              className="absolute top-2 right-2 bg-white/95 hover:bg-white p-1.5 rounded-full shadow hover:scale-105 transition-all text-red-500 cursor-pointer"
                              title="Favorito"
                            >
                              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500' : ''}`} />
                            </button>
                          </div>
 
                          {/* Body detail */}
                          <div className="p-3.5 space-y-2 flex-grow">
                            <div className="flex flex-col">
                              <h4 className="font-serif italic font-bold text-sm text-[#2D2926] leading-snug line-clamp-1">{recipe.name}</h4>
                              <p className="text-[10px] text-[#7C776D] font-mono mt-0.5">⏱️ {recipe.prepTime} • edad: {recipe.edadRecomendada}</p>
                            </div>
                            
                            <p className="text-[11px] text-[#767167] font-sans leading-relaxed line-clamp-2" title={recipe.description}>
                              {recipe.description}
                            </p>
 
                            {/* Anemia / Iron badge focus highlighting the value */}
                            <div className="bg-[#E89B6A]/10 border border-[#E89B6A]/20 p-2.5 rounded-2xl text-[10px] text-[#C2733E] font-sans flex items-center justify-between">
                              <b>Hierro Pediátrico:</b>
                              <span className="font-mono font-bold uppercase">{recipe.nutrition.iron}</span>
                            </div>
                          </div>
 
                          {/* Button footer action */}
                          <div className="p-3 pt-0">
                            <button
                              onClick={() => setSelectedRecipeDetail(recipe)}
                              className="w-full bg-[#5A7D5A] hover:bg-[#466146] text-white text-[11px] font-sans font-bold py-2 rounded-full text-center cursor-pointer transition-colors shadow-sm"
                            >
                              Ver Receta Completa
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer credits and information */}
      <footer className="bg-[#5A7D5A] text-[#F9F7F2] mt-12 py-10 px-6 border-t border-[#F0EDE5]/10 rounded-[32px] mb-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E89B6A] rounded-xl flex items-center justify-center font-serif font-bold text-white shadow italic">
                NK
              </div>
              <span className="font-serif italic font-bold text-base">NutriKids Inc.</span>
            </div>
            <p className="text-[#F9F7F2]/80 leading-relaxed">
              Trabajo final estratégico de startup construida meticulosamente para mejorar el bienestar infantil, consolidando raciones de alimentos, dietas escolares y anemia preventivo-activa en Lima-Peru.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-sans font-extrabold text-xs tracking-wider uppercase block border-b border-[#F9F7F2]/10 pb-1 text-[#FFD460]">
              Integrantes
            </span>
            <ul className="space-y-1 text-[#F9F7F2]/80">
              <li>Katty Pariacuri</li>
              <li>Cesar Arellano</li>
              <li>Fabrizzio Tipto</li>
              <li>Geraldine Huidobro</li>
              <li>Maryorit Espinoza</li>
              <li>Emanuel Checalla </li>
            </ul>
          </div>
          
                

          <div className="space-y-2">
            <span className="font-sans font-extrabold text-xs tracking-wider uppercase block border-b border-[#F9F7F2]/10 pb-1 text-[#FFD460]">
              Informacion
            </span>
            <p className="text-[#F9F7F2]/80 leading-relaxed">
              Desplegado como prototipo para el curso Desing Thinking 2610-3937.<br />
              <b>Localizado:</b> Lima, Perú
            </p>
          </div>
        </div>
      </footer>

      {/* Recipe Detail Full Interactive Step-by-Step Modal */}
      {selectedRecipeDetail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] border border-[#F0EDE5] w-full max-w-2xl overflow-hidden shadow-2xl relative">
            
            {/* Header image background */}
            <div className="h-44 w-full bg-[#F5F2EB] relative">
              <img
                src={selectedRecipeDetail.image}
                alt={selectedRecipeDetail.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedRecipeDetail(null)}
                className="absolute top-4 right-4 bg-white/95 hover:bg-white p-1.5 rounded-full shadow-lg text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-[#5A7D5A] text-white font-sans text-xs font-bold px-3 py-1 rounded-full shadow">
                {selectedRecipeDetail.category}
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto animate-scale-up">
              <div>
                <h3 className="font-serif italic font-bold text-2xl text-[#2D2926] leading-snug">{selectedRecipeDetail.name}</h3>
                <p className="text-xs text-[#7C776D] font-mono mt-1">Dificultad: {selectedRecipeDetail.difficulty} | Preparación: {selectedRecipeDetail.prepTime} | Edad: {selectedRecipeDetail.edadRecomendada}</p>
              </div>

              <p className="text-xs text-[#767167] font-sans leading-relaxed">
                {selectedRecipeDetail.description}
              </p>

              {/* Nutrition row info */}
              <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#F0EDE5]">
                <span className="font-sans font-bold text-xs text-[#5A7D5A] uppercase block mb-2">Información Nutricional por Porción infantil:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-sans">
                  <div className="bg-white p-2 rounded-xl border border-[#F0EDE5]">
                    <span className="text-[10px] text-[#A09B8E] block font-semibold uppercase">Calorías</span>
                    <b className="text-[#E89B6A]">{selectedRecipeDetail.nutrition.calories} kcal</b>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#F0EDE5]">
                    <span className="text-[10px] text-[#A09B8E] block font-semibold uppercase">Proteínas</span>
                    <b className="text-[#5A7D5A]">{selectedRecipeDetail.nutrition.protein}</b>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#F0EDE5]">
                    <span className="text-[10px] text-[#A09B8E] block font-semibold uppercase">Sodio/Carb</span>
                    <b className="text-[#5A7D5A]">{selectedRecipeDetail.nutrition.carbs}</b>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#F0EDE5]">
                    <span className="text-[10px] text-[#A09B8E] block font-semibold uppercase">Grasas</span>
                    <b className="text-[#5A7D5A]">{selectedRecipeDetail.nutrition.fat}</b>
                  </div>
                  <div className="bg-white p-2 rounded-xl border col-span-2 sm:col-span-1 bg-[#E89B6A]/5 border-[#E89B6A]/20">
                    <span className="text-[10px] text-[#C2733E] block font-bold uppercase">Hierro</span>
                    <b className="text-[#C2733E] font-mono uppercase">{selectedRecipeDetail.nutrition.iron}</b>
                  </div>
                </div>
              </div>

              {/* Ingredients list with quantities */}
              <div className="space-y-2">
                <span className="font-sans font-bold text-xs text-[#5A7D5A] uppercase block">Ingredientes de canasta recomendados:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedRecipeDetail.ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#F9F7F2] p-2 rounded-xl border border-[#F0EDE5]">
                      <span className="font-sans text-gray-700">{ing.name}</span>
                      <span className="font-mono font-bold bg-white text-[#5A7D5A] px-2 py-0.5 rounded border border-[#F0EDE5] text-[10px]">
                        {ing.quantity} {ing.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Steps */}
              <div className="space-y-2.5">
                <span className="font-sans font-bold text-xs text-[#5A7D5A] uppercase block">Pasos de Elaboración paso-a-paso:</span>
                <div className="space-y-2">
                  {selectedRecipeDetail.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className="w-5 h-5 bg-[#E89B6A] text-white rounded-full flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-sans text-gray-700 leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Print or Quick action footer */}
            <div className="bg-[#F9F7F2] p-4 border-t border-[#F0EDE5] flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedRecipeDetail(null)}
                className="bg-[#5A7D5A] hover:bg-[#466146] text-white font-sans font-bold p-2 px-6 rounded-full cursor-pointer transition-colors shadow-sm"
              >
                Listo, volver al recetario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
