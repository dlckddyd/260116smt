import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { faqData as initialFaqs, reviewsData as initialReviews, FAQItem, ReviewItem } from '../data/content';
import { db } from '../firebase'; // Import Firebase DB
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query, orderBy } from 'firebase/firestore';

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
  addFaq: (faq: Omit<FAQItem, 'id'>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => Promise<void>;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('growth_lab_is_admin') === 'true';
  });

  // --- Firebase Realtime Listeners ---

  // 1. FAQs Listener
  useEffect(() => {
    const q = query(collection(db, 'faqs')); // You can add orderBy here if needed
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FAQItem[];
      setFaqs(data);
    });
    return () => unsubscribe();
  }, []);

  // 2. Reviews Listener
  useEffect(() => {
    const q = query(collection(db, 'reviews'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ReviewItem[];
      setReviews(data);
    });
    return () => unsubscribe();
  }, []);

  // 3. Inquiries Listener
  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InquiryItem[];
      setInquiries(data);
    });
    return () => unsubscribe();
  }, []);

  // Admin Auth Persistence
  useEffect(() => {
    localStorage.setItem('growth_lab_is_admin', String(isAdmin));
  }, [isAdmin]);

  // --- Actions (Now returning Promises for async DB ops) ---

  const addFaq = async (faq: Omit<FAQItem, 'id'>) => {
    await addDoc(collection(db, 'faqs'), faq);
  };

  const deleteFaq = async (id: string) => {
    await deleteDoc(doc(db, 'faqs', id));
  };

  const addReview = async (review: Omit<ReviewItem, 'id' | 'date'>) => {
    await addDoc(collection(db, 'reviews'), {
      ...review,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteReview = async (id: string) => {
    await deleteDoc(doc(db, 'reviews', id));
  };

  const addInquiry = async (inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>) => {
    await addDoc(collection(db, 'inquiries'), {
      ...inquiry,
      date: new Date().toLocaleString(),
      status: 'new'
    });
  };

  const updateInquiryStatus = async (id: string, status: InquiryItem['status']) => {
    await updateDoc(doc(db, 'inquiries', id), { status });
  };

  const login = (password: string) => {
    if (password === 'admin1234') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <DataContext.Provider value={{
      faqs, reviews, inquiries, 
      addFaq, deleteFaq, 
      addReview, deleteReview, 
      addInquiry, updateInquiryStatus,
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