export type CategoriaReceta = 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snacks';
export type DificultadReceta = 'Fácil' | 'Medio' | 'Difícil';

export interface Receta {
  id: string;
  name: string;
  description: string;
  category: CategoriaReceta;
  prepTime: string;
  difficulty: DificultadReceta;
  ingredients: { name: string; quantity: number; unit: string }[];
  steps: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    iron: string; // anemia prevention tracking is key for kids
  };
  edadRecomendada: string;
  image: string;
  isVerified?: boolean;
}

export interface Nino {
  id: string;
  name: string;
  birthdate: string;
  age: number; // in years or months
  weight: number; // kg
  height: number; // cm
  gender: 'M' | 'F';
  restrictions: string[]; // alergias/restricciones
  allergies: string[];
  medicalInfo: string;
  observations: string;
}

export interface Familiar {
  name: string;
  lastname: string;
  email: string;
}

export interface MenuDia {
  Desayuno?: string; // Receta ID
  Almuerzo?: string; // Receta ID
  Cena?: string; // Receta ID
}

export interface MenuSemanal {
  Lunes: MenuDia;
  Martes: MenuDia;
  Miercoles: MenuDia; // No accent in keys for JS safety
  Jueves: MenuDia;
  Viernes: MenuDia;
  Sabado: MenuDia;
  Domingo: MenuDia;
}

export interface CommunitySubmission {
  id: string;
  userEmail: string;
  userName: string;
  name: string;
  description: string;
  category: CategoriaReceta;
  prepTime: string;
  difficulty: DificultadReceta;
  ingredients: string; // text representation
  steps: string; // text representation
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
}

export interface UserState {
  isAuthenticated: boolean;
  email: string;
  name: string;
  isPremium: boolean;
  familiar: Familiar;
  ninos: Nino[];
  favorites: string[]; // IDs of recipes
  weeklyMenu: MenuSemanal;
  purchasedIngredients: string[]; // tracking checked shopping list items
  communitySubmissions: CommunitySubmission[];
}
