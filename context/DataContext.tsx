import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultFaqCategories, FAQItem, ReviewItem } from '../data/content';

// Inquiry Type Definition
export interface InquiryItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  type: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'contacted';
}

export interface CategoryItem {
    id: string;
    name: string;
}

interface DataContextType {
  faqs: FAQItem[];
  reviews: ReviewItem[];
  inquiries: InquiryItem[];
  serviceImages: Record<string, string>;
  categories: string[];
  addFaq: (faq: Omit<FAQItem, 'id'>) => Promise<void>;
  addMultipleFaqs: (faqs: Omit<FAQItem, 'id'>[]) => Promise<void>;
  updateFaq: (id: string, faq: Partial<FAQItem>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => Promise<void>;
  updateServiceImage: (id: string, url: string) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (name: string) => Promise<void>;
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>; 
  logout: () => void;
  checkServerHealth: () => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [serviceImages, setServiceImages] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryDocs, setCategoryDocs] = useState<CategoryItem[]>([]);

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('growth_lab_is_admin') === 'true';
  });

  const ADMIN_PASSWORD = 'admin1234'; // Matches server.js check

  // --- API Helpers ---
  const fetchPublicData = async () => {
      try {
          // Use allSettled to prevent one failure from blocking others
          const results = await Promise.allSettled([
              fetch('/api/faqs'),
              fetch('/api/reviews'),
              fetch('/api/service-images'),
              fetch('/api/categories')
          ]);

          const [resFaqs, resReviews, resImgs, resCats] = results;

          // FAQs
          if (resFaqs.status === 'fulfilled' && resFaqs.value.ok) {
              const rawFaqs = await resFaqs.value.json();
              const mappedFaqs = rawFaqs.map((f: any) => ({
                  ...f,
                  categories: f.categories || (f.category ? [f.category] : [])
              }));
              setFaqs(mappedFaqs);
          }

          // Reviews
          if (resReviews.status === 'fulfilled' && resReviews.value.ok) {
              setReviews(await resReviews.value.json());
          }

          // Service Images
          if (resImgs.status === 'fulfilled' && resImgs.value.ok) {
              setServiceImages(await resImgs.value.json());
          }

          // Categories with robust fallback
          let catsLoaded = false;
          if (resCats.status === 'fulfilled' && resCats.value.ok) {
              try {
                  const cats = await resCats.value.json();
                  if (cats && cats.length > 0) {
                      setCategoryDocs(cats);
                      setCategories(cats.map((c: any) => c.name));
                      catsLoaded = true;
                  }
              } catch (e) {
                  console.error("Failed to parse categories", e);
              }
          }
          
          if (!catsLoaded) {
              console.warn("Using default categories fallback");
              setCategories(defaultFaqCategories);
          }

      } catch (e) {
          console.error("Failed to fetch public data:", e);
          // Safety fallback
          if (categories.length === 0) setCategories(defaultFaqCategories);
      }
  };

  const fetchAdminData = async () => {
      if (!isAdmin) return;
      try {
          const res = await fetch('/api/admin/inquiries', {
              headers: { 'x-admin-password': ADMIN_PASSWORD }
          });
          if(res.ok) setInquiries(await res.json());
      } catch (e) {
          console.error("Failed to fetch inquiries:", e);
      }
  };

  const checkServerHealth = async () => {
      try {
          const res = await fetch('/healthz', { method: 'GET', cache: 'no-store' });
          return res.ok;
      } catch (e) {
          return false;
      }
  };

  // Initial Fetch
  useEffect(() => {
      fetchPublicData();
  }, []);

  // Admin Data Fetch
  useEffect(() => {
      if (isAdmin) {
          fetchAdminData();
          // Poll every 30s to keep data fresh
          const interval = setInterval(fetchAdminData, 30000);
          return () => clearInterval(interval);
      }
  }, [isAdmin]);

  // Admin Auth Persistence
  useEffect(() => {
    localStorage.setItem('growth_lab_is_admin', String(isAdmin));
  }, [isAdmin]);

  // --- Actions (Using Server API) ---

  const addFaq = async (faq: Omit<FAQItem, 'id'>) => {
    const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(faq)
    });
    if (res.ok) fetchPublicData();
    else throw new Error("Server communication failed");
  };

  const addMultipleFaqs = async (faqs: Omit<FAQItem, 'id'>[]) => {
    const res = await fetch('/api/admin/faqs/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify({ faqs })
    });
    if (res.ok) fetchPublicData();
    else throw new Error("Batch upload failed");
  };

  const updateFaq = async (id: string, faq: Partial<FAQItem>) => {
    const res = await fetch(`/api/admin/faqs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(faq)
    });
    if (res.ok) fetchPublicData();
    else throw new Error("Server communication failed");
  };

  const deleteFaq = async (id: string) => {
    await fetch(`/api/admin/faqs/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': ADMIN_PASSWORD }
    });
    fetchPublicData();
  };

  const addCategory = async (name: string) => {
      // Check duplicate locally first
      if (categories.includes(name)) return;
      const res = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
          body: JSON.stringify({ name })
      });
      if (res.ok) fetchPublicData();
  };

  const deleteCategory = async (name: string) => {
      const docToDelete = categoryDocs.find(c => c.name === name);
      if (!docToDelete) return; // Can't delete default non-db categories or if not found

      await fetch(`/api/admin/categories/${docToDelete.id}`, {
          method: 'DELETE',
          headers: { 'x-admin-password': ADMIN_PASSWORD }
      });
      fetchPublicData();
  };

  const addReview = async (review: Omit<ReviewItem, 'id' | 'date'>) => {
    const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(review)
    });
    if (res.ok) fetchPublicData();
    else throw new Error("Server communication failed");
  };

  const deleteReview = async (id: string) => {
    await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': ADMIN_PASSWORD }
    });
    fetchPublicData();
  };

  const addInquiry = async (inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>) => {
    await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
    });
  };

  const updateInquiryStatus = async (id: string, status: InquiryItem['status']) => {
    await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify({ status })
    });
    fetchAdminData();
  };

  const updateServiceImage = async (id: string, url: string) => {
    await fetch('/api/admin/service-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify({ id, url })
    });
    fetchPublicData();
  };

  const login = async (password: string) => {
    if (password === ADMIN_PASSWORD) {
      // Pure client-side state update. 
      // Security is handled by the server checking the password header on API calls.
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setInquiries([]);
  };

  return (
    <DataContext.Provider value={{
      faqs, reviews, inquiries, serviceImages, categories,
      addFaq, addMultipleFaqs, updateFaq, deleteFaq, 
      addCategory, deleteCategory,
      addReview, deleteReview, 
      addInquiry, updateInquiryStatus,
      updateServiceImage,
      isAdmin, login, logout, checkServerHealth
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};