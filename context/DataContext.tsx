import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { faqData as initialFaqs, reviewsData as initialReviews, FAQItem, ReviewItem } from '../data/content';
import { db, auth } from '../firebase'; // Import auth
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query, orderBy, setDoc } from 'firebase/firestore';
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

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user && isAdmin) {
            // If supposed to be admin but not logged in, try login
            signInAnonymously(auth).catch(console.error);
        }
    });
    return () => unsubscribe();
  }, [isAdmin]);

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

  // 4. Service Images Listener
  useEffect(() => {
    try {
      const q = collection(db, 'service_images');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const imgs: Record<string, string> = {};
        snapshot.forEach(doc => {
           imgs[doc.id] = doc.data().url;
        });
        setServiceImages(imgs);
      }, (error) => {
         console.warn("Firestore access restricted (Service Images).", error);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Error setting up Service Images listener:", e);
    }
  }, []);

  // Admin Auth Persistence
  useEffect(() => {
    localStorage.setItem('growth_lab_is_admin', String(isAdmin));
  }, [isAdmin]);

  // --- Actions ---

  const addFaq = async (faq: Omit<FAQItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'faqs'), faq);
    } catch (e) {
      console.error("Error adding FAQ:", e);
      throw e; // Throw to let component handle
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
      throw e;
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

  const updateServiceImage = async (id: string, url: string) => {
    try {
      await setDoc(doc(db, 'service_images', id), { url }, { merge: true });
    } catch (e) {
      console.error("Error updating Service Image:", e);
      throw e;
    }
  };

  const login = async (password: string) => {
    if (password === 'admin1234') {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Firebase Login Error:", error);
      }
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    auth.signOut().catch(console.error);
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