import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Lock, LogOut, CheckCircle, Clock, Trash2, Plus, X, MessageSquare, HelpCircle, Star, Camera, Layout, RefreshCw, Upload, Loader2, ArrowUp, ArrowDown, WifiOff, Wifi, Edit3, Image as ImageIcon, Type, Settings } from 'lucide-react';
import { ContentBlock, FAQItem } from '../data/content';

const Admin: React.FC = () => {
  const { 
    isAdmin, login, logout, 
    inquiries, updateInquiryStatus,
    faqs, addFaq, updateFaq, deleteFaq,
    categories, addCategory, deleteCategory,
    reviews, addReview, deleteReview,
    serviceImages, updateServiceImage,
    checkServerHealth
  } = useData();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'faq' | 'reviews' | 'main'>('inquiries');
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Server Status State
  const [isServerConnected, setIsServerConnected] = useState<boolean | null>(null);

  // FAQ Form State
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqCategoriesSelection, setFaqCategoriesSelection] = useState<string[]>([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqBlocks, setNewFaqBlocks] = useState<ContentBlock[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  
  // Review Form State
  const [newReview, setNewReview] = useState({ name: '', company: '', content: '', rating: 5, type: 'text', imageUrl: '' });

  // Upload State
  const [activeServiceIdForUpload, setActiveServiceIdForUpload] = useState<string | null>(null);
  const [activeBlockIdForUpload, setActiveBlockIdForUpload] = useState<string | null>(null);

  // Refs
  const faqFileInputRef = useRef<HTMLInputElement>(null);
  const reviewFileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  // Check Server Health on Mount
  useEffect(() => {
    if (isAdmin) {
        const verifyConnection = async () => {
            const isHealthy = await checkServerHealth();
            setIsServerConnected(isHealthy);
        };
        verifyConnection();
        // Check every 10 seconds
        const timer = setInterval(verifyConnection, 10000);
        return () => clearInterval(timer);
    }
  }, [isAdmin, checkServerHealth]);

  // Safety Valve for Uploads
  useEffect(() => {
    let safetyTimer: ReturnType<typeof setTimeout>;
    if (isUploading) {
        safetyTimer = setTimeout(() => {
            if (isUploading) {
                setIsUploading(false);
                alert("작업 시간이 너무 오래 걸려 중단되었습니다.");
            }
        }, 45000); // 45s timeout for large uploads
    }
    return () => clearTimeout(safetyTimer);
  }, [isUploading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    const success = await login(password);
    setIsLoggingIn(false);
    if (!success) alert('비밀번호가 틀렸습니다.');
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    if (!file) return "";
    
    // Check server connection before upload
    if (isServerConnected === false) {
        alert("서버와 연결이 끊겨있어 업로드할 수 없습니다. 페이지를 새로고침하거나 관리자에게 문의하세요.");
        return "";
    }

    setIsUploading(true);

    try {
       const reader = new FileReader();
       return new Promise((resolve, reject) => {
           reader.onload = async () => {
               try {
                   const base64String = reader.result as string;
                   const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                   
                   const response = await fetch('/api/admin/upload-image', {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json',
                           'x-admin-password': 'admin1234'
                       },
                       body: JSON.stringify({
                           image: base64String,
                           filename: safeName
                       })
                   });
                   
                   const data = await response.json();
                   if (!response.ok) throw new Error(data.error || "Server upload failed");
                   
                   resolve(data.url);
               } catch (e) {
                   reject(e);
               }
           };
           reader.onerror = (e) => reject(e);
           reader.readAsDataURL(file);
       });
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`이미지 업로드 실패: ${error.message}\n(파일 크기는 50MB 이하여야 합니다)`);
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
    if (!file || !activeServiceIdForUpload) {
        setActiveServiceIdForUpload(null);
        return;
    }
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';

    const url = await handleFileUpload(file);
    if (url) {
        try {
            setIsUploading(true);
            await updateServiceImage(activeServiceIdForUpload, url);
            alert("이미지가 성공적으로 변경되었습니다.");
        } catch(e) {
            console.error(e);
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
  const resetFaqForm = () => {
      setEditingFaqId(null);
      setNewFaqQuestion('');
      setNewFaqBlocks([]);
      setFaqCategoriesSelection([]);
      setShowFaqModal(false);
  };

  const openFaqModalForEdit = (faq: FAQItem) => {
      setEditingFaqId(faq.id);
      setNewFaqQuestion(faq.question);
      setNewFaqBlocks(faq.blocks || []);
      setFaqCategoriesSelection(faq.categories || []);
      setShowFaqModal(true);
  };

  const triggerFaqImageUpload = (blockId: string) => {
    setActiveBlockIdForUpload(blockId);
    setTimeout(() => faqFileInputRef.current?.click(), 50);
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

  const handleSaveFaq = async () => {
    if (!newFaqQuestion.trim()) return alert("제목을 입력해주세요.");
    if (newFaqBlocks.length === 0) return alert("내용을 입력해주세요.");
    if (faqCategoriesSelection.length === 0) return alert("최소 1개의 카테고리를 선택해주세요.");

    setIsUploading(true); 
    try {
        const faqData = { categories: faqCategoriesSelection, question: newFaqQuestion, blocks: newFaqBlocks };
        
        if (editingFaqId) {
            await updateFaq(editingFaqId, faqData);
            alert("수정되었습니다.");
        } else {
            await addFaq(faqData);
            alert("등록되었습니다.");
        }
        resetFaqForm();
    } catch (e: any) {
        alert(`저장 실패: ${e.message}`);
    } finally {
        setIsUploading(false);
    }
  };

  const addBlock = (type: 'text' | 'image') => {
    setNewFaqBlocks([...newFaqBlocks, { id: Date.now().toString(), type, content: '' }]);
  };
  const removeBlock = (id: string) => setNewFaqBlocks(newFaqBlocks.filter(b => b.id !== id));
  const updateBlock = (id: string, content: string) => setNewFaqBlocks(newFaqBlocks.map(b => b.id === id ? { ...b, content } : b));
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...newFaqBlocks];
    if (direction === 'up' && index > 0) [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    else if (direction === 'down' && index < newBlocks.length - 1) [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setNewFaqBlocks(newBlocks);
  };

  const toggleCategorySelection = (cat: string) => {
      if (faqCategoriesSelection.includes(cat)) {
          setFaqCategoriesSelection(prev => prev.filter(c => c !== cat));
      } else {
          setFaqCategoriesSelection(prev => [...prev, cat]);
      }
  };

  const handleAddCategory = async () => {
      if (!newCategoryName.trim()) return;
      await addCategory(newCategoryName);
      setNewCategoryName('');
  };

  // --- Review Management ---
  const triggerReviewImageUpload = () => reviewFileInputRef.current?.click();
  const onReviewFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (reviewFileInputRef.current) reviewFileInputRef.current.value = '';
    const url = await handleFileUpload(file);
    if (url) setNewReview(prev => ({ ...prev, imageUrl: url, type: 'image' }));
  };

  const handleAddReview = async () => {
    if (!newReview.name || !newReview.company) return alert("이름과 업체명을 입력해주세요.");
    setIsUploading(true);
    try {
        await addReview({ ...newReview, type: newReview.type as 'text' | 'image' });
        setShowReviewModal(false);
        setNewReview({ name: '', company: '', content: '', rating: 5, type: 'text', imageUrl: '' });
        alert("후기가 등록되었습니다.");
    } catch (e: any) {
        alert(`등록 실패: ${e.message}`);
    } finally {
        setIsUploading(false);
    }
  };

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
           <form onSubmit={handleLogin} className="space-y-4">
              <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button disabled={isLoggingIn} className="w-full py-3 bg-brand-accent text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                 {isLoggingIn && <Loader2 className="w-4 h-4 animate-spin"/>} {isLoggingIn ? '로그인 중...' : '로그인'}
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {isUploading && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <div className="bg-white/10 p-8 rounded-2xl flex flex-col items-center max-w-sm w-full mx-4">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-accent" />
                  <p className="text-lg font-bold">처리 중입니다...</p>
                  <p className="text-sm opacity-70 mt-2 text-center text-gray-300">잠시만 기다려주세요.<br/>(대용량 파일은 최대 1분)</p>
              </div>
          </div>
      )}

      <div className="bg-brand-black text-white px-6 py-4 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <div className="font-bold text-xl flex items-center gap-3">
              <Lock className="w-5 h-5 text-green-400" /> Smart Place Admin
              
              {/* Server Connection Status Badge */}
              {isServerConnected === null ? (
                 <div className="flex items-center gap-1.5 ml-4 bg-white/10 px-3 py-1 rounded-full">
                    <Loader2 className="w-3 h-3 animate-spin text-gray-400"/>
                    <span className="text-xs font-medium text-gray-400">연결 확인 중...</span>
                 </div>
              ) : isServerConnected ? (
                 <div className="flex items-center gap-1.5 ml-4 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                    <Wifi className="w-3 h-3 text-green-400" />
                    <span className="text-xs font-bold text-green-400">서버 정상</span>
                 </div>
              ) : (
                 <div className="flex items-center gap-1.5 ml-4 bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full animate-pulse">
                    <WifiOff className="w-3 h-3 text-red-400" />
                    <span className="text-xs font-bold text-red-400">서버 연결 끊김</span>
                 </div>
              )}
           </div>
           <div className="flex items-center gap-3">
               <button onClick={() => window.location.reload()} className="text-sm bg-white/10 px-3 py-2 rounded-full hover:bg-white/20" title="새로고침"><RefreshCw className="w-4 h-4" /></button>
               <button onClick={logout} className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2"><LogOut className="w-4 h-4" /> 로그아웃</button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
         {/* Warning Banner if Disconnected */}
         {!isServerConnected && isServerConnected !== null && (
             <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                 <WifiOff className="w-6 h-6" />
                 <div>
                     <p className="font-bold">서버와 연결할 수 없습니다.</p>
                     <p className="text-sm">데이터를 불러오거나 저장할 수 없습니다. 잠시 후 새로고침하거나 관리자에게 문의하세요.</p>
                 </div>
             </div>
         )}

         <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
            {['inquiries', 'main', 'faq', 'reviews'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-4 px-4 font-bold flex items-center gap-2 whitespace-nowrap uppercase ${activeTab === tab ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400'}`}>
                    {tab === 'inquiries' && <MessageSquare className="w-5 h-5" />}
                    {tab === 'main' && <Layout className="w-5 h-5" />}
                    {tab === 'faq' && <HelpCircle className="w-5 h-5" />}
                    {tab === 'reviews' && <Star className="w-5 h-5" />}
                    {tab}
                </button>
            ))}
         </div>

         {activeTab === 'inquiries' && (
            <div className="space-y-4">
               {inquiries.length === 0 ? <div className="text-center py-20 bg-white rounded-xl text-gray-400">접수된 문의가 없습니다.</div> : inquiries.slice().reverse().map(item => (
                     <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{item.status === 'new' ? '신규' : '확인됨'}</span>
                              <span className="text-sm text-gray-400">{item.date}</span>
                              <span className="text-sm font-bold text-gray-800">{item.type}</span>
                           </div>
                           <h3 className="text-xl font-bold mb-1">{item.name} <span className="text-base font-normal text-gray-500">({item.company})</span></h3>
                           <p className="text-brand-accent font-medium mb-3">{item.phone}</p>
                           <p className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">{item.message}</p>
                        </div>
                        <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                           <button onClick={() => updateInquiryStatus(item.id, 'contacted')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-bold flex items-center gap-2"><CheckCircle className="w-4 h-4" /> 완료</button>
                           <button onClick={() => updateInquiryStatus(item.id, 'read')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-bold flex items-center gap-2"><Clock className="w-4 h-4" /> 보류</button>
                        </div>
                     </div>
                  ))}
            </div>
         )}
         
         {activeTab === 'main' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {servicesList.map(service => (
                     <div key={service.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
                         <h4 className="font-bold text-lg">{service.name}</h4>
                         <div className="aspect-[4/5] rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative group">
                             <img src={serviceImages[service.id] || service.defaultImg} alt={service.name} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                         </div>
                         <button onClick={() => triggerMainImageUpload(service.id)} className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-black font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-colors" disabled={isUploading || !isServerConnected}>
                            <Upload className="w-4 h-4"/> 이미지 교체
                         </button>
                     </div>
                 ))}
             </div>
         )}

         {activeTab === 'faq' && (
            <div>
                {/* Category Manager Toggle */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button onClick={() => setShowCategoryManager(!showCategoryManager)} className="text-gray-500 hover:text-gray-800 flex items-center gap-2 font-medium">
                        <Settings className="w-4 h-4" /> 카테고리 관리 {showCategoryManager ? '접기' : '펼치기'}
                    </button>
                    <button onClick={() => { resetFaqForm(); setShowFaqModal(true); }} disabled={!isServerConnected} className="px-6 py-3 bg-brand-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50">
                        <Plus className="w-5 h-5" /> 새 글 작성
                    </button>
                </div>

                {/* Category Manager */}
                {showCategoryManager && (
                    <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold mb-4">카테고리 편집</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map(cat => (
                                <div key={cat} className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                                    {cat}
                                    <button onClick={() => { if(confirm(`${cat} 카테고리를 삭제하시겠습니까?`)) deleteCategory(cat) }} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 max-w-sm">
                            <input 
                                type="text" 
                                placeholder="새 카테고리명" 
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-brand-accent"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                            />
                            <button onClick={handleAddCategory} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold">추가</button>
                        </div>
                    </div>
                )}

               <div className="grid gap-4">
                  {faqs.map(faq => (
                     <div key={faq.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start group hover:border-brand-accent/30 transition-all">
                        <div className="flex-1">
                           <div className="flex flex-wrap gap-2 mb-2">
                                {(faq.categories || []).map(cat => (
                                    <span key={cat} className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-bold border border-blue-100">{cat}</span>
                                ))}
                           </div>
                           <h4 className="font-bold text-lg mb-2 text-gray-800">{faq.question}</h4>
                           <p className="text-sm text-gray-400 truncate max-w-md">
                                {faq.blocks && faq.blocks.length > 0 ? (faq.blocks.find(b => b.type === 'text')?.content || '이미지 콘텐츠') : '내용 없음'}
                           </p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openFaqModalForEdit(faq)} className="text-gray-400 hover:text-blue-500 p-2 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => { if(confirm('정말 삭제하시겠습니까?')) deleteFaq(faq.id) }} className="text-gray-400 hover:text-red-500 p-2 border border-gray-100 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {activeTab === 'reviews' && (
            <div>
               <div className="flex justify-end mb-6">
                  <button onClick={() => setShowReviewModal(true)} disabled={!isServerConnected} className="px-6 py-3 bg-brand-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"><Plus className="w-5 h-5" /> 후기 등록하기</button>
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
                           {review.type === 'text' ? <p className="text-gray-600 text-sm">"{review.content}"</p> : <div className="flex items-center gap-2 text-blue-500 text-sm"><Camera className="w-4 h-4" /> 인증샷 후기</div>}
                        </div>
                        <button onClick={() => deleteReview(review.id)} className="text-gray-300 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>

      <input type="file" ref={faqFileInputRef} onChange={onFaqFileSelected} className="hidden" accept="image/*" />
      <input type="file" ref={reviewFileInputRef} onChange={onReviewFileSelected} className="hidden" accept="image/*" />
      <input type="file" ref={mainImageInputRef} onChange={onMainImageFileSelected} className="hidden" accept="image/*" />

      {/* FAQ Modal - Improved UI (Blog Style) */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
           <div className="max-w-4xl mx-auto px-6 py-10">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/90 backdrop-blur-md py-4 border-b border-gray-100 z-10">
                 <h3 className="text-2xl font-bold text-gray-900">{editingFaqId ? '글 수정하기' : '새 글 작성하기'}</h3>
                 <div className="flex gap-3">
                     <button onClick={resetFaqForm} className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-500 font-bold hover:bg-gray-50">취소</button>
                     <button onClick={handleSaveFaq} className="px-8 py-2.5 rounded-full bg-brand-accent text-white font-bold hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30 transition-all">
                        {editingFaqId ? '수정 완료' : '발행하기'}
                     </button>
                 </div>
              </div>

              <div className="space-y-8 pb-32">
                 {/* Category Selector */}
                 <div>
                    <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">카테고리 선택 (중복 가능)</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => toggleCategorySelection(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${faqCategoriesSelection.includes(cat) ? 'bg-brand-black text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                {cat}
                                {faqCategoriesSelection.includes(cat) && <CheckCircle className="inline-block w-3 h-3 ml-2 text-green-400"/>}
                            </button>
                        ))}
                    </div>
                 </div>

                 {/* Title Input */}
                 <div>
                     <input 
                        className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none py-4 bg-transparent" 
                        placeholder="제목을 입력하세요" 
                        value={newFaqQuestion} 
                        onChange={e => setNewFaqQuestion(e.target.value)} 
                     />
                     <div className="h-px w-20 bg-gray-200 mt-2"></div>
                 </div>

                 {/* Content Editor */}
                 <div className="space-y-6 min-h-[400px]">
                    {newFaqBlocks.map((block, index) => (
                        <div key={block.id} className="group relative transition-all">
                            {/* Hover Controls */}
                            <div className="absolute -right-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 p-2">
                                <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-brand-accent disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                                <button onClick={() => moveBlock(index, 'down')} disabled={index === newFaqBlocks.length - 1} className="p-1.5 text-gray-400 hover:text-brand-accent disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                                <button onClick={() => removeBlock(block.id)} className="p-1.5 text-gray-400 hover:text-red-500"><X className="w-4 h-4"/></button>
                            </div>

                            {/* Block Content */}
                            {block.type === 'text' ? (
                                <textarea 
                                    className="w-full p-4 text-lg text-gray-700 leading-relaxed outline-none resize-none border-l-2 border-transparent focus:border-gray-200 bg-transparent"
                                    placeholder="내용을 입력하세요..." 
                                    rows={Math.max(2, block.content.split('\n').length)}
                                    value={block.content} 
                                    onChange={(e) => {
                                        updateBlock(block.id, e.target.value);
                                        // Auto-grow height
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                    style={{ height: 'auto', minHeight: '80px' }}
                                />
                            ) : (
                                <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-blue-200 transition-colors">
                                    {block.content ? (
                                        <img src={block.content} alt="Content" className="w-full h-auto max-h-[600px] object-contain mx-auto" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                            <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                                            <p className="text-sm">이미지를 업로드해주세요</p>
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => triggerFaqImageUpload(block.id)} 
                                        className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                                    >
                                        {block.content ? '이미지 변경' : '이미지 업로드'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {newFaqBlocks.length === 0 && (
                        <div className="py-20 text-center text-gray-300">
                            작성된 내용이 없습니다. 아래 버튼을 눌러 내용을 추가하세요.
                        </div>
                    )}
                 </div>

                 {/* Sticky Add Buttons */}
                 <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-2xl border border-gray-100 z-20">
                    <button onClick={() => addBlock('text')} className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-100 text-gray-700 font-bold transition-colors">
                        <Type className="w-5 h-5" /> 텍스트 추가
                    </button>
                    <div className="w-px bg-gray-200 my-2"></div>
                    <button onClick={() => addBlock('image')} className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-100 text-gray-700 font-bold transition-colors">
                        <ImageIcon className="w-5 h-5" /> 이미지 추가
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold">후기 등록</h3>
                 <button onClick={() => setShowReviewModal(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                 <input className="w-full border p-3 rounded-lg" placeholder="이름" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} />
                 <input className="w-full border p-3 rounded-lg" placeholder="업체명" value={newReview.company} onChange={e => setNewReview({...newReview, company: e.target.value})} />
                 <div className="flex gap-4"><label><input type="radio" checked={newReview.type === 'text'} onChange={() => setNewReview({...newReview, type: 'text'})} /> 텍스트</label><label><input type="radio" checked={newReview.type === 'image'} onChange={() => setNewReview({...newReview, type: 'image'})} /> 이미지</label></div>
                 {newReview.type === 'text' ? <textarea className="w-full border p-3 rounded-lg h-24" value={newReview.content} onChange={e => setNewReview({...newReview, content: e.target.value})} /> : 
                 <div className="flex gap-2"><input className="w-full border p-3 rounded-lg bg-gray-100" value={newReview.imageUrl} readOnly /><button onClick={triggerReviewImageUpload} className="px-4 py-2 bg-gray-800 text-white rounded"><Upload className="w-4 h-4"/> 업로드</button></div>}
                 <input type="number" min="1" max="5" className="w-full border p-3 rounded-lg" value={newReview.rating} onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})} />
                 <button onClick={handleAddReview} className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl">등록 완료</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Admin;