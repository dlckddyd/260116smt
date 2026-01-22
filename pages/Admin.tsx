import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Lock, LogOut, CheckCircle, Clock, Trash2, Plus, X, MessageSquare, HelpCircle, Star, Camera, FileText, Image as ImageIcon, ArrowDown, ArrowUp, Upload, Loader2, Layout, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { faqCategories, ContentBlock } from '../data/content';
import { storage, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';

const Admin: React.FC = () => {
  const { 
    isAdmin, login, logout, 
    inquiries, updateInquiryStatus,
    faqs, addFaq, deleteFaq,
    reviews, addReview, deleteReview,
    serviceImages, updateServiceImage
  } = useData();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'faq' | 'reviews' | 'main'>('inquiries');
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // FAQ Form State
  const [newFaqCategory, setNewFaqCategory] = useState(faqCategories[0]);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqBlocks, setNewFaqBlocks] = useState<ContentBlock[]>([]);
  
  // Review Form State
  const [newReview, setNewReview] = useState({ name: '', company: '', content: '', rating: 5, type: 'text', imageUrl: '' });

  // Upload State
  const [activeServiceIdForUpload, setActiveServiceIdForUpload] = useState<string | null>(null);
  const [activeBlockIdForUpload, setActiveBlockIdForUpload] = useState<string | null>(null);

  // Refs
  const faqFileInputRef = useRef<HTMLInputElement>(null);
  const reviewFileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  // Safety Valve: Force stop loading if stuck for more than 15 seconds
  useEffect(() => {
    let safetyTimer: ReturnType<typeof setTimeout>;
    if (isUploading) {
        safetyTimer = setTimeout(() => {
            if (isUploading) {
                setIsUploading(false);
                alert("작업 시간이 너무 오래 걸려 중단되었습니다. 인터넷 연결을 확인하거나 다시 시도해주세요.");
            }
        }, 15000);
    }
    return () => clearTimeout(safetyTimer);
  }, [isUploading]);

  // Check Connection on Mount
  useEffect(() => {
    if (isAdmin) {
        const checkConnection = async () => {
            try {
                if (!auth.currentUser) await signInAnonymously(auth);
                setIsConnected(true);
            } catch (e) {
                console.warn("Connection check failed:", e);
                setIsConnected(false);
            }
        };
        checkConnection();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const success = await login(password);
    setIsLoggingIn(false);
    
    if (!success) {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // Helper: Try auth with short timeout
  const ensureAuth = async () => {
    if (!auth.currentUser) {
        try {
            // Give it 3 seconds to auth, otherwise proceed (might be public mode)
            await Promise.race([
                signInAnonymously(auth),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Auth Timeout")), 3000))
            ]);
            setIsConnected(true);
        } catch (e) {
            console.warn("Auth attempt skipped or failed.", e);
            // Don't set isConnected to false here, as it might work in public mode
        }
    }
  };

  // --- Robust File Upload ---
  const handleFileUpload = async (file: File): Promise<string> => {
    if (!file) return "";
    
    setIsUploading(true);

    try {
      await ensureAuth();

      const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const fileName = `uploads/${Date.now()}_${safeName}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;

    } catch (error: any) {
      console.error("Upload failed", error);
      let msg = "이미지 업로드에 실패했습니다.";
      
      if (error.code === 'storage/unauthorized') {
          msg = "업로드 권한이 없습니다. Firebase Console 설정을 확인해주세요.";
      } else if (error.code === 'storage/retry-limit-exceeded') {
          msg = "연결이 불안정합니다.";
      }
      
      alert(msg);
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  // --- Main Image Management ---
  const triggerMainImageUpload = (serviceId: string) => {
    setActiveServiceIdForUpload(serviceId);
    setTimeout(() => {
        mainImageInputRef.current?.click();
    }, 50);
  };

  const onMainImageFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeServiceIdForUpload) return;

    if (mainImageInputRef.current) mainImageInputRef.current.value = '';

    const url = await handleFileUpload(file);
    if (url) {
        try {
            setIsUploading(true);
            await updateServiceImage(activeServiceIdForUpload, url);
            alert("이미지가 변경되었습니다.");
        } catch(e) {
            alert("이미지는 업로드되었으나 데이터베이스 저장에 실패했습니다.");
        } finally {
            setIsUploading(false);
            setActiveServiceIdForUpload(null);
        }
    } else {
        setActiveServiceIdForUpload(null);
    }
  };

  // --- FAQ Management ---
  const triggerFaqImageUpload = (blockId: string) => {
    setActiveBlockIdForUpload(blockId);
    setTimeout(() => {
        faqFileInputRef.current?.click();
    }, 50);
  };

  const onFaqFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeBlockIdForUpload) return;

    if (faqFileInputRef.current) faqFileInputRef.current.value = '';

    const url = await handleFileUpload(file);
    if (url) {
        setNewFaqBlocks(prev => prev.map(b => b.id === activeBlockIdForUpload ? { ...b, content: url } : b));
    }
    setActiveBlockIdForUpload(null);
  };

  const handleAddFaq = async () => {
    if (!newFaqQuestion.trim()) return alert("질문을 입력해주세요.");
    if (newFaqBlocks.length === 0) return alert("내용을 입력해주세요.");
    
    setIsUploading(true); 
    try {
        await ensureAuth();
        await addFaq({
            category: newFaqCategory,
            question: newFaqQuestion,
            blocks: newFaqBlocks
        });
        
        setShowFaqModal(false);
        setNewFaqQuestion('');
        setNewFaqBlocks([]);
        alert("FAQ가 등록되었습니다.");
    } catch (e: any) {
        console.error(e);
        alert(`등록 실패: ${e.message || "오류가 발생했습니다."}`);
    } finally {
        setIsUploading(false);
    }
  };

  const addBlock = (type: 'text' | 'image') => {
    setNewFaqBlocks([...newFaqBlocks, { id: Date.now().toString(), type, content: '' }]);
  };
  
  const removeBlock = (id: string) => {
    setNewFaqBlocks(newFaqBlocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: string, content: string) => {
    setNewFaqBlocks(newFaqBlocks.map(b => b.id === id ? { ...b, content } : b));
  };
  
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...newFaqBlocks];
    if (direction === 'up' && index > 0) {
        [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setNewFaqBlocks(newBlocks);
  };

  // --- Review Management ---
  const triggerReviewImageUpload = () => {
    reviewFileInputRef.current?.click();
  };

  const onReviewFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (reviewFileInputRef.current) reviewFileInputRef.current.value = '';

    const url = await handleFileUpload(file);
    if (url) {
        setNewReview(prev => ({ ...prev, imageUrl: url, type: 'image' }));
    }
  };

  const handleAddReview = async () => {
    if (!newReview.name || !newReview.company) return alert("이름과 업체명을 입력해주세요.");
    
    setIsUploading(true);
    try {
        await ensureAuth();
        await addReview({
            ...newReview,
            type: newReview.type as 'text' | 'image'
        });
        
        setShowReviewModal(false);
        setNewReview({ name: '', company: '', content: '', rating: 5, type: 'text', imageUrl: '' });
        alert("후기가 등록되었습니다.");
    } catch (e: any) {
        console.error(e);
        alert(`등록 실패: ${e.message || "오류가 발생했습니다."}`);
    } finally {
        setIsUploading(false);
    }
  };

  // --- Services List ---
  const servicesList = [
      { id: 'place', name: '플레이스 마케팅', defaultImg: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop" },
      { id: 'clip', name: '네이버 클립', defaultImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
      { id: 'experience', name: '체험단 마케팅', defaultImg: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop" },
      { id: 'youtube', name: '유튜브 관리', defaultImg: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=800&auto=format&fit=crop" },
      { id: 'instagram', name: '인스타그램', defaultImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
           <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center text-white">
                 <Lock className="w-8 h-8" />
              </div>
           </div>
           <h2 className="text-2xl font-bold text-center mb-2">관리자 로그인</h2>
           <p className="text-center text-gray-500 mb-8 text-sm">콘텐츠 관리를 위해 비밀번호를 입력하세요.</p>
           
           <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button disabled={isLoggingIn} className="w-full py-3 bg-brand-accent text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                 {isLoggingIn && <Loader2 className="w-4 h-4 animate-spin"/>}
                 {isLoggingIn ? '로그인 중...' : '로그인'}
              </button>
           </form>
           <p className="mt-4 text-center text-xs text-gray-400">초기 비밀번호: admin1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Loading Overlay with Cancel Button */}
      {isUploading && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <div className="bg-white/10 p-8 rounded-2xl flex flex-col items-center max-w-sm w-full mx-4">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-accent" />
                  <p className="text-lg font-bold">처리 중입니다...</p>
                  <p className="text-sm opacity-70 mt-2 text-center text-gray-300">잠시만 기다려주세요.<br/>(최대 15초 소요)</p>
                  
                  <button 
                    onClick={() => setIsUploading(false)}
                    className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold border border-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" /> 닫기 (강제 취소)
                  </button>
              </div>
          </div>
      )}

      <div className="bg-brand-black text-white px-6 py-4 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <div className="font-bold text-xl flex items-center gap-3">
              <Lock className="w-5 h-5 text-green-400" />
              Smart Place Admin
              {/* Connection Status Indicator */}
              <div className="flex items-center gap-1.5 ml-4 bg-white/10 px-3 py-1 rounded-full">
                  {isConnected === true ? (
                      <>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-green-400">연결됨</span>
                      </>
                  ) : isConnected === false ? (
                      <>
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-xs font-medium text-red-400">연결 끊김</span>
                      </>
                  ) : (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-400">연결 확인 중...</span>
                      </>
                  )}
              </div>
           </div>
           
           <div className="flex items-center gap-3">
               <button 
                onClick={() => window.location.reload()}
                className="text-sm bg-white/10 px-3 py-2 rounded-full hover:bg-white/20 flex items-center gap-2"
                title="새로고침"
               >
                  <RefreshCw className="w-4 h-4" />
               </button>
               <button onClick={logout} className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> 로그아웃
               </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
         {/* Tabs */}
         <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
            <button onClick={() => setActiveTab('inquiries')} className={`pb-4 px-4 font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'inquiries' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}>
               <MessageSquare className="w-5 h-5" /> 문의 내역
            </button>
            <button onClick={() => setActiveTab('main')} className={`pb-4 px-4 font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'main' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}>
               <Layout className="w-5 h-5" /> 메인 관리
            </button>
            <button onClick={() => setActiveTab('faq')} className={`pb-4 px-4 font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'faq' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}>
               <HelpCircle className="w-5 h-5" /> 자주 묻는 질문
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`pb-4 px-4 font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'reviews' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400 hover:text-gray-600'}`}>
               <Star className="w-5 h-5" /> 고객 후기
            </button>
         </div>

         {/* 1. Inquiries Tab */}
         {activeTab === 'inquiries' && (
            <div className="space-y-4">
               {inquiries.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-xl text-gray-400">접수된 문의가 없습니다.</div>
               ) : (
                  inquiries.slice().reverse().map(item => (
                     <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                 {item.status === 'new' ? '신규' : '확인됨'}
                              </span>
                              <span className="text-sm text-gray-400">{item.date}</span>
                              <span className="text-sm font-bold text-gray-800">{item.type}</span>
                           </div>
                           <h3 className="text-xl font-bold mb-1">{item.name} <span className="text-base font-normal text-gray-500">({item.company})</span></h3>
                           <p className="text-brand-accent font-medium mb-3">{item.phone}</p>
                           <p className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">{item.message}</p>
                        </div>
                        <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                           <button onClick={() => updateInquiryStatus(item.id, 'contacted')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-bold flex items-center gap-2 whitespace-nowrap">
                              <CheckCircle className="w-4 h-4" /> 완료 처리
                           </button>
                           <button onClick={() => updateInquiryStatus(item.id, 'read')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-bold flex items-center gap-2 whitespace-nowrap">
                              <Clock className="w-4 h-4" /> 보류
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>
         )}

         {/* 2. Main Management Tab */}
         {activeTab === 'main' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {servicesList.map(service => (
                     <div key={service.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
                         <h4 className="font-bold text-lg">{service.name}</h4>
                         <div className="aspect-[4/5] rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative group">
                             <img 
                                src={serviceImages[service.id] || service.defaultImg} 
                                alt={service.name} 
                                className="w-full h-full object-cover"
                             />
                             {/* Overlay for indication */}
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                         </div>
                         <button 
                            onClick={() => triggerMainImageUpload(service.id)}
                            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-black font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                            disabled={isUploading}
                         >
                            <Upload className="w-4 h-4"/> 이미지 교체
                         </button>
                     </div>
                 ))}
             </div>
         )}

         {/* 3. FAQ Tab */}
         {activeTab === 'faq' && (
            <div>
               <div className="flex justify-end mb-6">
                  <button onClick={() => setShowFaqModal(true)} className="px-6 py-3 bg-brand-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800">
                     <Plus className="w-5 h-5" /> 질문 등록하기
                  </button>
               </div>
               <div className="grid gap-4">
                  {faqs.map(faq => (
                     <div key={faq.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start group">
                        <div className="flex-1">
                           <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-2 font-bold">{faq.category}</span>
                           <h4 className="font-bold text-lg mb-2">Q. {faq.question}</h4>
                           <div className="text-gray-500 text-sm space-y-1">
                               {faq.blocks?.map((b, i) => (
                                   <div key={i} className="flex items-center gap-2">
                                       {b.type === 'text' ? <FileText className="w-3 h-3 text-blue-500"/> : <ImageIcon className="w-3 h-3 text-green-500"/>}
                                       <span className="line-clamp-1">{b.content.startsWith('http') ? '이미지 파일' : b.content}</span>
                                   </div>
                               ))}
                           </div>
                        </div>
                        <button onClick={() => deleteFaq(faq.id)} className="text-gray-300 hover:text-red-500 p-2">
                           <Trash2 className="w-5 h-5" />
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* 4. Reviews Tab */}
         {activeTab === 'reviews' && (
            <div>
               <div className="flex justify-end mb-6">
                  <button onClick={() => setShowReviewModal(true)} className="px-6 py-3 bg-brand-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800">
                     <Plus className="w-5 h-5" /> 후기 등록하기
                  </button>
               </div>
               <div className="grid gap-4">
                  {reviews.map(review => (
                     <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-lg">{review.name}</span>
                              <span className="text-sm text-gray-500">{review.company}</span>
                              <span className="text-yellow-400 flex text-xs">{'★'.repeat(review.rating)}</span>
                           </div>
                           {review.type === 'text' ? (
                              <p className="text-gray-600 text-sm">"{review.content}"</p>
                           ) : (
                              <div className="flex items-center gap-2 text-blue-500 text-sm">
                                 <Camera className="w-4 h-4" /> 
                                 {review.imageUrl ? (
                                     <div className="flex items-center gap-2">
                                         <img src={review.imageUrl} className="w-8 h-8 rounded object-cover border" alt="thumbnail" />
                                         <span>인증샷 후기</span>
                                     </div>
                                 ) : '이미지 없음'}
                              </div>
                           )}
                           <p className="text-xs text-gray-300 mt-2">{review.date}</p>
                        </div>
                        <button onClick={() => deleteReview(review.id)} className="text-gray-300 hover:text-red-500 p-2">
                           <Trash2 className="w-5 h-5" />
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>

      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={faqFileInputRef} 
        onChange={onFaqFileSelected} 
        className="hidden" 
        accept="image/*"
      />
      <input 
        type="file" 
        ref={reviewFileInputRef} 
        onChange={onReviewFileSelected} 
        className="hidden" 
        accept="image/*"
      />
      <input 
        type="file" 
        ref={mainImageInputRef} 
        onChange={onMainImageFileSelected} 
        className="hidden" 
        accept="image/*"
      />

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold">질문 등록</h3>
                 <button onClick={() => setShowFaqModal(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold mb-1">카테고리</label>
                    <select 
                       className="w-full border p-3 rounded-lg outline-none focus:border-brand-accent"
                       value={newFaqCategory}
                       onChange={e => setNewFaqCategory(e.target.value)}
                    >
                       {faqCategories.map(c => <option key={c}>{c}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-1">질문 (Q)</label>
                    <input 
                       className="w-full border p-3 rounded-lg outline-none focus:border-brand-accent"
                       placeholder="질문을 입력하세요"
                       value={newFaqQuestion}
                       onChange={e => setNewFaqQuestion(e.target.value)}
                    />
                 </div>

                 {/* Block Builder Area */}
                 <div className="border-t border-b border-gray-100 py-4 my-4">
                    <label className="block text-sm font-bold mb-3">답변 구성</label>
                    
                    {newFaqBlocks.length === 0 && (
                        <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            텍스트 또는 이미지를 추가하세요.
                        </div>
                    )}

                    <div className="space-y-3">
                        {newFaqBlocks.map((block, index) => (
                            <div key={block.id} className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="mt-2 flex flex-col gap-1">
                                    <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                                    <button onClick={() => moveBlock(index, 'down')} disabled={index === newFaqBlocks.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        {block.type === 'text' ? (
                                            <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded flex items-center gap-1"><FileText className="w-3 h-3"/> 텍스트</span>
                                        ) : (
                                            <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded flex items-center gap-1"><ImageIcon className="w-3 h-3"/> 이미지</span>
                                        )}
                                    </div>
                                    {block.type === 'text' ? (
                                        <textarea 
                                            className="w-full p-2 border rounded text-sm min-h-[80px]" 
                                            placeholder="내용을 입력하세요..."
                                            value={block.content}
                                            onChange={(e) => updateBlock(block.id, e.target.value)}
                                        />
                                    ) : (
                                        <div className="flex gap-2">
                                            <input 
                                                className="w-full p-2 border rounded text-sm bg-gray-100" 
                                                placeholder="이미지 파일"
                                                value={block.content}
                                                readOnly
                                            />
                                            <button 
                                                onClick={() => triggerFaqImageUpload(block.id)}
                                                className="px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-black whitespace-nowrap flex items-center gap-1"
                                            >
                                                <Upload className="w-3 h-3"/> {block.content ? '변경' : '업로드'}
                                            </button>
                                        </div>
                                    )}
                                    {block.type === 'image' && block.content && (
                                        <img src={block.content} alt="Preview" className="mt-2 h-20 w-auto rounded border" />
                                    )}
                                </div>
                                <button onClick={() => removeBlock(block.id)} className="text-gray-400 hover:text-red-500 p-1"><X className="w-5 h-5"/></button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button onClick={() => addBlock('text')} className="flex-1 py-2 border border-blue-200 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 font-bold text-sm">
                            <Plus className="w-4 h-4" /> 텍스트 추가
                        </button>
                        <button onClick={() => addBlock('image')} className="flex-1 py-2 border border-green-200 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center justify-center gap-2 font-bold text-sm">
                            <Plus className="w-4 h-4" /> 이미지 추가
                        </button>
                    </div>
                 </div>

                 <button onClick={handleAddFaq} className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600">
                    등록 완료
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold">새로운 후기 등록</h3>
                 <button onClick={() => setShowReviewModal(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                 <div className="flex gap-4">
                    <div className="flex-1">
                       <label className="block text-sm font-bold mb-1">이름</label>
                       <input 
                          className="w-full border p-3 rounded-lg outline-none focus:border-brand-accent"
                          value={newReview.name}
                          onChange={e => setNewReview({...newReview, name: e.target.value})}
                       />
                    </div>
                    <div className="flex-1">
                       <label className="block text-sm font-bold mb-1">업체명</label>
                       <input 
                          className="w-full border p-3 rounded-lg outline-none focus:border-brand-accent"
                          value={newReview.company}
                          onChange={e => setNewReview({...newReview, company: e.target.value})}
                       />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-1">유형</label>
                    <div className="flex gap-4">
                       <label className="flex items-center gap-2">
                          <input type="radio" name="rType" checked={newReview.type === 'text'} onChange={() => setNewReview({...newReview, type: 'text'})} /> 텍스트
                       </label>
                       <label className="flex items-center gap-2">
                          <input type="radio" name="rType" checked={newReview.type === 'image'} onChange={() => setNewReview({...newReview, type: 'image'})} /> 이미지
                       </label>
                    </div>
                 </div>
                 {newReview.type === 'text' ? (
                    <div>
                       <label className="block text-sm font-bold mb-1">후기 내용</label>
                       <textarea 
                          className="w-full border p-3 rounded-lg outline-none focus:border-brand-accent h-24"
                          value={newReview.content}
                          onChange={e => setNewReview({...newReview, content: e.target.value})}
                       />
                    </div>
                 ) : (
                    <div>
                       <label className="block text-sm font-bold mb-1">인증샷 이미지</label>
                       <div className="flex gap-2">
                           <input 
                              className="w-full border p-3 rounded-lg outline-none focus:border-brand-accent bg-gray-100"
                              placeholder="이미지 파일 첨부"
                              value={newReview.imageUrl}
                              readOnly
                           />
                           <button 
                                onClick={triggerReviewImageUpload}
                                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black whitespace-nowrap flex items-center gap-1"
                           >
                                <Upload className="w-4 h-4"/> 업로드
                           </button>
                       </div>
                       {newReview.imageUrl && (
                           <img src={newReview.imageUrl} alt="Review" className="mt-2 w-full h-40 object-cover rounded-lg border" />
                       )}
                    </div>
                 )}
                 <div>
                    <label className="block text-sm font-bold mb-1">평점 (1~5)</label>
                    <input 
                       type="number" min="1" max="5"
                       className="w-full border p-3 rounded-lg outline-none focus:border-brand-accent"
                       value={newReview.rating}
                       onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                    />
                 </div>
                 <button onClick={handleAddReview} className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600">
                    등록 완료
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Admin;