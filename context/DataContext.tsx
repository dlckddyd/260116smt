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
    try {
      const q = query(collection(db, 'faqs')); 
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FAQItem[];
        setFaqs(data);
      }, (error) => {
        console.warn("Firestore access restricted (FAQs). Using default data if needed.", error);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Error setting up FAQ listener:", e);
    }
  }, []);

  // 2. Reviews Listener
  useEffect(() => {
    try {
      const q = query(collection(db, 'reviews'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ReviewItem[];
        setReviews(data);
      }, (error) => {
        console.warn("Firestore access restricted (Reviews).", error);
      });
      return () => unsubscribe();
    } catch (e) {
       console.error("Error setting up Reviews listener:", e);
    }
  }, []);

  // 3. Inquiries Listener
  useEffect(() => {
    try {
      const q = query(collection(db, 'inquiries'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as InquiryItem[];
        setInquiries(data);
      }, (error) => {
         console.warn("Firestore access restricted (Inquiries).", error);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Error setting up Inquiries listener:", e);
    }
  }, []);

  // Admin Auth Persistence
  useEffect(() => {
    localStorage.setItem('growth_lab_is_admin', String(isAdmin));
  }, [isAdmin]);

  // --- Actions (Now returning Promises for async DB ops) ---

  const addFaq = async (faq: Omit<FAQItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'faqs'), faq);
    } catch (e) {
      console.error("Error adding FAQ:", e);
      alert("데이터베이스 권한 문제로 저장에 실패했습니다.");
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'faqs', id));
    } catch (e) {
      console.error("Error deleting FAQ:", e);
    }
  };

  const addReview = async (review: Omit<ReviewItem, 'id' | 'date'>) => {
    try {
      await addDoc(collection(db, 'reviews'), {
        ...review,
        date: new Date().toISOString().split('T')[0]
      });
    } catch (e) {
      console.error("Error adding Review:", e);
      alert("데이터베이스 권한 문제로 저장에 실패했습니다.");
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (e) {
       console.error("Error deleting Review:", e);
    }
  };

  const addInquiry = async (inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>) => {
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...inquiry,
        date: new Date().toLocaleString(),
        status: 'new'
      });
    } catch (e) {
      console.error("Error adding Inquiry:", e);
      // Fallback for demo purposes if DB fails
      console.log("Fallback: Inquiry would be saved:", inquiry);
    }
  };

  const updateInquiryStatus = async (id: string, status: InquiryItem['status']) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (e) {
      console.error("Error updating Inquiry:", e);
    }
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