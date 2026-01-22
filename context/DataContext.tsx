import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { faqData as initialFaqs, reviewsData as initialReviews, FAQItem, ReviewItem } from '../data/content';
import { auth } from '../firebase'; 
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

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

interface DataContextType {
  faqs: FAQItem[];
  reviews: ReviewItem[];
  inquiries: InquiryItem[];
  serviceImages: Record<string, string>;
  addFaq: (faq: Omit<FAQItem, 'id'>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => Promise<void>;
  updateServiceImage: (id: string, url: string) => Promise<void>;
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>; 
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [serviceImages, setServiceImages] = useState<Record<string, string>>({});

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('growth_lab_is_admin') === 'true';
  });

  const ADMIN_PASSWORD = 'admin1234'; // Simple check

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        // Just listening
    });
    return () => unsubscribe();
  }, []);

  // --- API Helpers ---
  const fetchPublicData = async () => {
      try {
          const [resFaqs, resReviews, resImgs] = await Promise.all([
              fetch('/api/faqs'),
              fetch('/api/reviews'),
              fetch('/api/service-images')
          ]);
          
          if(resFaqs.ok) setFaqs(await resFaqs.json());
          if(resReviews.ok) setReviews(await resReviews.json());
          if(resImgs.ok) setServiceImages(await resImgs.json());
      } catch (e) {
          console.error("Failed to fetch public data:", e);
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

  // Initial Fetch
  useEffect(() => {
      fetchPublicData();
  }, []);

  // Admin Data Fetch
  useEffect(() => {
      if (isAdmin) {
          fetchAdminData();
          // Optional: Poll every 30s
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
    else throw new Error("Server Error");
  };

  const deleteFaq = async (id: string) => {
    await fetch(`/api/admin/faqs/${id}`, {
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
    else throw new Error("Server Error");
  };

  const deleteReview = async (id: string) => {
    await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': ADMIN_PASSWORD }
    });
    fetchPublicData();
  };

  const addInquiry = async (inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>) => {
    // Public Endpoint
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
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.warn("Client Auth Warning", error);
      }
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    auth.signOut().catch(console.error);
    setInquiries([]);
  };

  return (
    <DataContext.Provider value={{
      faqs, reviews, inquiries, serviceImages,
      addFaq, deleteFaq, 
      addReview, deleteReview, 
      addInquiry, updateInquiryStatus,
      updateServiceImage,
      isAdmin, login, logout
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